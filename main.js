// =============================================
// 中华历史人物图谱 - 主程序逻辑（优化版）
// =============================================

// ---- 配置 ----
const YEAR_START = -4500;
const YEAR_END   = 2025;
const PX_PER_YEAR_DEFAULT = 0.6;
let pxPerYear = PX_PER_YEAR_DEFAULT;
const AXIS_TOP_RATIO = 0.5;

// 颜色映射（扩展更多分类）
const CAT_COLOR = {
  emperor: '#e74c3c',
  military: '#9b59b6',
  scholar: '#3498db',
  philosopher: '#1abc9c',
  scientist: '#2ecc71',
  artist: '#e67e22',
  politician: '#7f8c8d',
  sage: '#d4a843',
  general: '#9b59b6',
  diplomat: '#00bcd4',
  inventor: '#2ecc71',
};
const EVT_COLOR = {
  war: '#e74c3c',
  culture: '#9b59b6',
  politics: '#3498db',
  economy: '#27ae60',
  science: '#1abc9c',
  default: '#d4a843',
};

// ---- 状态 ----
let currentView = 'timeline';
let selectedPersonId = null;
let activeCat = 'all';
let searchQuery = '';
let graphNodes = [];
let graphEdges = [];
let graphAnim = null;
let isDragging = false;
let dragStartX = 0;
let dragScrollX = 0;
let renderPending = false;
let isEditMode = false;

// ---- 工具函数 ----
function yearToX(year) {
  return (year - YEAR_START) * pxPerYear;
}
function totalWidth() {
  return (YEAR_END - YEAR_START) * pxPerYear + 200;
}
function getAxisTop() {
  const h = document.getElementById('mainContainer').clientHeight;
  return Math.round(h * AXIS_TOP_RATIO);
}
function catClass(cat) { return 'cat-' + (cat || 'politician'); }
function evtClass(type) { return 'evt-' + (type || 'default'); }
function evtColor(type) { return EVT_COLOR[type] || EVT_COLOR.default; }

// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流函数
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 请求渲染（合并多次调用）
function requestRender() {
  if (!renderPending) {
    renderPending = true;
    requestAnimationFrame(() => {
      renderTimeline();
      renderPending = false;
    });
  }
}

// 格式化年份
function formatYear(year) {
  if (year < 0) return `公元前${-year}年`;
  if (year === 0) return '公元元年';
  return `公元${year}年`;
}

// ---- 初始化 ----
document.addEventListener('DOMContentLoaded', () => {
  buildEraTabs();
  buildFilterBtns();
  renderTimeline();
  bindEvents();
  updateStats();
  showKeyboardHint();
  initAddPersonModal();
});

const debouncedResize = debounce(() => {
  if (currentView === 'timeline') renderTimeline();
  if (currentView === 'graph') renderGraph();
  if (currentView === 'map') { if (leafletMap) leafletMap.invalidateSize(); }
}, 150);
window.addEventListener('resize', debouncedResize);

// ---- 统计信息 ----
function updateStats() {
  let statsEl = document.getElementById('statsBar');
  if (!statsEl) {
    statsEl = document.createElement('div');
    statsEl.id = 'statsBar';
    statsEl.className = 'stats-bar';
    document.getElementById('app').appendChild(statsEl);
  }
  const filtered = activeCat === 'all' ? PERSONS.length : PERSONS.filter(p => p.cat === activeCat).length;
  const dynasties = new Set(PERSONS.map(p => p.dynasty)).size;
  const events = EVENTS.length;
  statsEl.innerHTML = `
    <div class="stat-item">👤 人物 <span class="stat-value">${filtered}</span></div>
    <div class="stat-item">🏛️ 朝代 <span class="stat-value">${dynasties}</span></div>
    <div class="stat-item">📜 事件 <span class="stat-value">${events}</span></div>
    <div class="stat-item">🔍 缩放 <span class="stat-value">${(pxPerYear / PX_PER_YEAR_DEFAULT * 100).toFixed(0)}%</span></div>
  `;
}

// ---- 快捷键提示 ----
function showKeyboardHint() {
  const hint = document.createElement('div');
  hint.className = 'keyboard-hint';
  hint.innerHTML = '<kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> 切换视图 · <kbd>+</kbd><kbd>-</kbd> 缩放 · <kbd>/</kbd> 搜索 · <kbd>Esc</kbd> 关闭面板';
  document.getElementById('app').appendChild(hint);
  // 5秒后淡出
  setTimeout(() => hint.style.opacity = '0.3', 5000);
}

// ---- Era Tabs ----
function buildEraTabs() {
  const container = document.getElementById('eraTabs');
  container.innerHTML = '';
  ERA_GROUPS.forEach(era => {
    const btn = document.createElement('button');
    btn.className = 'era-tab';
    btn.textContent = era.name;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.era-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      scrollToYear((era.start + era.end) / 2);
    });
    container.appendChild(btn);
  });
}

function scrollToYear(year) {
  const view = document.getElementById('timelineView');
  const x = yearToX(year) - view.clientWidth / 2;
  view.scrollTo({ left: Math.max(0, x), behavior: 'smooth' });
}

// ---- 筛选 ----
function buildFilterBtns() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      applyFilter();
      updateStats();
      if (currentView === 'graph') { graphNodes = []; renderGraph(); }
      if (currentView === 'map') updateMapMarkers();
    });
  });
}

function applyFilter() {
  document.querySelectorAll('.person-row').forEach(row => {
    const cat = row.dataset.cat;
    const visible = activeCat === 'all' || cat === activeCat;
    row.style.display = visible ? '' : 'none';
  });
}

// ---- 渲染时间轴 ----
function renderTimeline() {
  const wrapper = document.getElementById('timelineWrapper');
  const axisTop = getAxisTop();
  const w = totalWidth();
  wrapper.style.width = w + 'px';

  renderDynastyBands(axisTop, w);
  renderAxisLine(axisTop, w);
  renderTicks(axisTop, w);
  renderEvents(axisTop);
  renderPersons(axisTop);
}

// ---- 朝代色带 ----
function renderDynastyBands(axisTop, totalW) {
  const container = document.getElementById('dynastyBands');
  container.innerHTML = '';
  const h = document.getElementById('mainContainer').clientHeight;

  DYNASTIES.forEach(d => {
    const x1 = yearToX(d.start);
    const x2 = yearToX(d.end);
    const band = document.createElement('div');
    band.className = 'dynasty-band';
    band.style.cssText = `left:${x1}px;width:${Math.max(x2-x1, 2)}px;background:${d.color};`;
    container.appendChild(band);

    // 标签 - 仅在宽度足够时显示
    const bandWidth = x2 - x1;
    if (bandWidth > 40) {
      const label = document.createElement('div');
      label.className = 'dynasty-label';
      const lx = x1 + bandWidth / 2;
      label.style.cssText = `left:${lx}px;transform:translateX(-50%);`;
      label.textContent = d.name;
      container.appendChild(label);
    }
  });
}

// ---- 主轴 ----
function renderAxisLine(axisTop, totalW) {
  const el = document.getElementById('axisLine');
  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px;`;
}

// ---- 刻度 ----
function renderTicks(axisTop, totalW) {
  const container = document.getElementById('axisTicks');
  container.innerHTML = '';

  const majorStep = pxPerYear < 0.3 ? 500 : pxPerYear < 0.8 ? 100 : 50;
  const minorStep = majorStep / 5;

  // 使用 DocumentFragment 提高性能
  const fragment = document.createDocumentFragment();

  for (let y = Math.ceil(YEAR_START / minorStep) * minorStep; y <= YEAR_END; y += minorStep) {
    const isMajor = y % majorStep === 0;
    const x = yearToX(y);
    const tick = document.createElement('div');
    tick.className = 'tick-mark' + (isMajor ? ' tick-major' : '');
    tick.style.cssText = `left:${x}px;top:${axisTop - (isMajor ? 10 : 5)}px;`;

    const line = document.createElement('div');
    line.className = 'tick-line';
    line.style.height = (isMajor ? 20 : 10) + 'px';
    tick.appendChild(line);

    if (isMajor) {
      const lbl = document.createElement('div');
      lbl.className = 'tick-label';
      lbl.textContent = y < 0 ? `前${-y}` : `${y}`;
      tick.appendChild(lbl);
    }
    fragment.appendChild(tick);
  }
  container.appendChild(fragment);
}

// ---- 事件节点 ----
function renderEvents(axisTop) {
  const above = document.getElementById('eventsAbove');
  const below = document.getElementById('eventsBelow');
  above.innerHTML = '';
  below.innerHTML = '';
  above.style.top = '0';
  below.style.top = axisTop + 'px';

  const totalH = document.getElementById('mainContainer').clientHeight;
  const aboveSpace = axisTop;
  const belowSpace = totalH - axisTop;

  const aboveEvents = EVENTS.filter((_, i) => i % 2 === 0);
  const belowEvents = EVENTS.filter((_, i) => i % 2 !== 0);

  const aboveStep = aboveSpace / (aboveEvents.length + 1);
  const belowStep = belowSpace / (belowEvents.length + 1);

  const fragment = document.createDocumentFragment();

  EVENTS.forEach((evt, i) => {
    const x = yearToX(evt.year);
    const isAbove = i % 2 === 0;
    const idx = isAbove ? Math.floor(i / 2) : Math.floor(i / 2);
    const lineH = (idx + 1) * (isAbove ? aboveStep * 0.65 : belowStep * 0.65);
    const color = evtColor(evt.type);

    const node = document.createElement('div');
    node.className = 'event-node ' + (isAbove ? 'above' : 'below') + ' evt-' + (evt.type || 'default');
    node.dataset.evtId = evt.id;
    node.style.cssText = isAbove
      ? `left:${x}px;bottom:0;`
      : `left:${x}px;top:0;`;

    const dot = document.createElement('div');
    dot.className = 'event-dot';
    dot.style.cssText = `border-color:${color};`;

    const line = document.createElement('div');
    line.className = 'event-line';
    line.style.cssText = `height:${lineH}px;background:${color};`;

    const label = document.createElement('div');
    label.className = 'event-label';
    label.textContent = evt.name;

    node.appendChild(dot);
    node.appendChild(line);
    node.appendChild(label);

    // 悬浮提示
    node.addEventListener('mouseenter', (e) => showEventTooltip(evt, e));
    node.addEventListener('mouseleave', hideEventTooltip);
    node.addEventListener('mousemove', throttle(moveTooltip, 16));

    fragment.appendChild(node);
  });

  // 分配到上下容器
  const aboveFragment = document.createDocumentFragment();
  const belowFragment = document.createDocumentFragment();
  let childIdx = 0;
  fragment.childNodes.forEach(node => {
    if (EVENTS[childIdx] && childIdx % 2 === 0) {
      aboveFragment.appendChild(node.cloneNode(true));
    } else {
      belowFragment.appendChild(node.cloneNode(true));
    }
    childIdx++;
  });

  // 重新构建（简化，直接循环）
  above.innerHTML = '';
  below.innerHTML = '';
  EVENTS.forEach((evt, i) => {
    const x = yearToX(evt.year);
    const isAbove = i % 2 === 0;
    const idx = Math.floor(i / 2);
    const lineH = (idx + 1) * (isAbove ? aboveStep * 0.65 : belowStep * 0.65);
    const color = evtColor(evt.type);
    const container = isAbove ? above : below;

    const node = document.createElement('div');
    node.className = 'event-node ' + (isAbove ? 'above' : 'below') + ' evt-' + (evt.type || 'default');
    node.dataset.evtId = evt.id;
    node.style.cssText = isAbove
      ? `left:${x}px;bottom:0;`
      : `left:${x}px;top:0;`;

    const dot = document.createElement('div');
    dot.className = 'event-dot';
    dot.style.cssText = `border-color:${color};`;

    const line = document.createElement('div');
    line.className = 'event-line';
    line.style.cssText = `height:${lineH}px;background:${color};`;

    const label = document.createElement('div');
    label.className = 'event-label';
    label.textContent = evt.name;

    node.appendChild(dot);
    node.appendChild(line);
    node.appendChild(label);

    node.addEventListener('mouseenter', (e) => showEventTooltip(evt, e));
    node.addEventListener('mouseleave', hideEventTooltip);
    node.addEventListener('mousemove', throttle(moveTooltip, 16));

    container.appendChild(node);
  });
}

// ---- 人物条 ----
function renderPersons(axisTop) {
  const above = document.getElementById('personsAbove');
  const below = document.getElementById('personsBelow');
  above.innerHTML = '';
  below.innerHTML = '';
  above.style.top = '0';
  below.style.top = axisTop + 'px';

  const sortedPersons = [...PERSONS].sort((a, b) => a.birth - b.birth);
  const abovePersons = sortedPersons.filter((_, i) => i % 2 === 0);
  const belowPersons = sortedPersons.filter((_, i) => i % 2 !== 0);

  layoutPersonRows(abovePersons, above, axisTop, true);
  layoutPersonRows(belowPersons, below, axisTop, false);
}

function layoutPersonRows(persons, container, axisTop, isAbove) {
  const rows = [];
  const rowHeight = 26;
  const padding = 4;
  const fragment = document.createDocumentFragment();

  persons.forEach(p => {
    if (!p.birth || !p.death) return;
    const x1 = yearToX(p.birth);
    const barW = Math.max(yearToX(p.death) - x1, 20);

    let rowIdx = rows.findIndex(endX => endX < x1 - padding);
    if (rowIdx === -1) { rows.push(0); rowIdx = rows.length - 1; }
    rows[rowIdx] = x1 + barW + padding;

    let topOffset;
    if (isAbove) {
      topOffset = axisTop - (rowIdx + 1) * rowHeight - 6;
    } else {
      topOffset = (rowIdx) * rowHeight + 6;
    }

    const row = document.createElement('div');
    row.className = 'person-row';
    row.dataset.personId = p.id;
    row.dataset.cat = p.cat;
    row.style.cssText = `left:${x1}px;top:${topOffset}px;width:${barW}px;`;

    // 搜索匹配高亮
    if (searchQuery && (p.name.includes(searchQuery) || (p.desc && p.desc.includes(searchQuery)))) {
      row.classList.add('search-match');
    }

    const bar = document.createElement('div');
    bar.className = 'person-bar ' + catClass(p.cat);
    bar.style.width = barW + 'px';

    if (barW > 40) {
      const nameEl = document.createElement('span');
      nameEl.className = 'person-name';
      nameEl.textContent = p.name;
      bar.appendChild(nameEl);
    } else {
      const nameEl = document.createElement('span');
      nameEl.className = 'person-name-outside';
      nameEl.textContent = p.name;
      row.appendChild(nameEl);
    }

    row.appendChild(bar);
    row.addEventListener('click', () => showPersonDetail(p.id));

    fragment.appendChild(row);
  });

  container.appendChild(fragment);
}

// ---- 事件气泡 ----
function showEventTooltip(evt, e) {
  const tip = document.getElementById('eventTooltip');
  const yearStr = formatYear(evt.year);
  tip.innerHTML = `
    <div class="tooltip-title">${evt.name}</div>
    <div class="tooltip-year" style="color:${evtColor(evt.type)}">${yearStr}</div>
    <div class="tooltip-desc">${evt.desc}</div>
  `;
  tip.classList.remove('hidden');
  moveTooltip(e);
}
function hideEventTooltip() {
  document.getElementById('eventTooltip').classList.add('hidden');
}
function moveTooltip(e) {
  const tip = document.getElementById('eventTooltip');
  let x = e.clientX + 16, y = e.clientY + 16;
  if (x + 260 > window.innerWidth) x = e.clientX - 260;
  if (y + 120 > window.innerHeight) y = e.clientY - 120;
  tip.style.left = x + 'px';
  tip.style.top = y + 'px';
}

// ---- 人物详情面板 ----
function showPersonDetail(personId) {
  const p = PERSONS.find(x => x.id === personId);
  if (!p) return;
  selectedPersonId = personId;

  // 头像
  const avatarEl = document.getElementById('panelAvatar');
  const color = CAT_COLOR[p.cat] || '#888';
  avatarEl.textContent = p.emoji || '👤';
  avatarEl.style.borderColor = color;
  avatarEl.style.background = color + '20';

  // 名字
  document.getElementById('panelName').textContent = p.name;

  // 元信息
  const birthStr = formatYear(p.birth);
  const deathStr = formatYear(p.death);
  const lifespan = p.death - p.birth;
  const lifespanStr = `享年 ${lifespan} 岁`;
  document.getElementById('panelMeta').innerHTML = `
    <span class="tag dynasty-tag" data-dynasty="${p.dynasty || ''}" style="cursor:pointer">${p.dynasty || ''}</span>
    <span class="tag">${catName(p.cat)}</span><br>
    ${birthStr} — ${deathStr}<br>
    <span class="lifespan-tag">${lifespanStr}</span>
  `;

  // 朝代标签点击跳转到地图
  const dynastyTag = document.querySelector('.dynasty-tag');
  if (dynastyTag && p.dynasty) {
    dynastyTag.addEventListener('click', () => {
      mapDynastyFilter = p.dynasty;
      const select = document.getElementById('mapDynastySelect');
      if (select) select.value = p.dynasty;
      switchView('map');
    });
    dynastyTag.title = `点击在地图上查看${p.dynasty}时期的人物`;
  }

  // 简介
  document.getElementById('panelDesc').textContent = p.desc || '';

  // 成就
  const achEl = document.getElementById('panelAchievements');
  achEl.innerHTML = (p.achievements || []).map(a => `<span class="achievement-tag">${a}</span>`).join('');

  // 关联人物
  const relEl = document.getElementById('panelRelations');
  relEl.innerHTML = '';
  if (p.relations && p.relations.length > 0) {
    p.relations.forEach(r => {
      const related = PERSONS.find(x => x.id === r.id);
      if (!related) return;
      const item = document.createElement('div');
      item.className = 'relation-item';
      item.innerHTML = `
        <div class="relation-avatar" style="background:${CAT_COLOR[related.cat] || '#888'}20;border:1px solid ${CAT_COLOR[related.cat] || '#888'}">
          ${related.emoji || '👤'}
        </div>
        <div class="relation-info">
          <div class="relation-name">${related.name}</div>
          <div class="relation-type">${r.type} · ${r.label}</div>
        </div>
      `;
      item.addEventListener('click', () => showPersonDetail(r.id));
      relEl.appendChild(item);
    });
  } else {
    relEl.innerHTML = '<span style="color:var(--text3);font-size:12px">暂无关联数据</span>';
  }

  // 相关事件
  const evtEl = document.getElementById('panelEvents');
  evtEl.innerHTML = '';
  if (p.events && p.events.length > 0) {
    p.events.forEach(evtId => {
      const evt = EVENTS.find(e => e.id === evtId);
      if (!evt) return;
      const yearStr = formatYear(evt.year);
      const item = document.createElement('div');
      item.className = 'event-item';
      item.style.borderLeftColor = evtColor(evt.type);
      item.innerHTML = `
        <div class="event-year" style="color:${evtColor(evt.type)}">${yearStr}</div>
        <div class="event-text"><strong>${evt.name}</strong><br>${evt.desc}</div>
      `;
      evtEl.appendChild(item);
    });
  } else {
    evtEl.innerHTML = '<span style="color:var(--text3);font-size:12px">暂无相关事件</span>';
  }

  // 高亮相关人物
  highlightRelated(p);

  // 显示面板
  document.getElementById('detailPanel').classList.remove('hidden');

  // 退出编辑模式
  if (isEditMode) exitEditMode();
}

function highlightRelated(p) {
  const relatedIds = new Set((p.relations || []).map(r => r.id));
  relatedIds.add(p.id);
  document.querySelectorAll('.person-row').forEach(row => {
    const id = row.dataset.personId;
    if (relatedIds.has(id)) {
      row.classList.add('highlighted');
      row.classList.remove('dimmed');
    } else {
      row.classList.remove('highlighted');
      row.classList.add('dimmed');
    }
  });
}

// ---- 编辑模式 ----
function enterEditMode() {
  if (!selectedPersonId) return;
  isEditMode = true;
  const p = PERSONS.find(x => x.id === selectedPersonId);
  if (!p) return;

  const editBtn = document.getElementById('panelEditBtn');
  editBtn.textContent = '✏️ 编辑中';
  editBtn.classList.add('editing');
  document.getElementById('panelEditActions').classList.remove('hidden');

  // 名字 → 输入框
  const nameEl = document.getElementById('panelName');
  nameEl.innerHTML = `<input type="text" class="edit-input edit-name" value="${p.name}" />`;

  // 简介 → textarea
  const descEl = document.getElementById('panelDesc');
  descEl.innerHTML = `<textarea class="edit-textarea" rows="4">${p.desc || ''}</textarea>`;

  // 生卒年 → 输入框
  const metaEl = document.getElementById('panelMeta');
  metaEl.innerHTML = `
    <span class="tag dynasty-tag" data-dynasty="${p.dynasty || ''}" style="cursor:pointer">${p.dynasty || ''}</span>
    <span class="tag">${catName(p.cat)}</span><br>
    <div class="edit-dates">
      <label>生年：<input type="number" class="edit-input edit-birth" value="${p.birth}" /></label>
      <label>卒年：<input type="number" class="edit-input edit-death" value="${p.death}" /></label>
    </div>
    <span class="lifespan-tag" id="editLifespan">享年 ${p.death - p.birth} 岁</span>
  `;

  // 实时更新享年
  const birthInput = metaEl.querySelector('.edit-birth');
  const deathInput = metaEl.querySelector('.edit-death');
  function updateLifespan() {
    const b = parseInt(birthInput.value) || 0;
    const d = parseInt(deathInput.value) || 0;
    const lifespanEl = document.getElementById('editLifespan');
    if (lifespanEl) lifespanEl.textContent = `享年 ${d - b} 岁`;
  }
  birthInput.addEventListener('input', updateLifespan);
  deathInput.addEventListener('input', updateLifespan);

  // 朝代标签 → 下拉
  const dynastyTag = metaEl.querySelector('.dynasty-tag');
  if (dynastyTag) {
    dynastyTag.addEventListener('click', () => {
      const current = p.dynasty || '';
      const dynastyOrder = DYNASTIES.map(d => d.name);
      const options = dynastyOrder.map(d =>
        `<option value="${d}" ${d === current ? 'selected' : ''}>${d}</option>`
      ).join('');
      dynastyTag.outerHTML = `<select class="edit-dynasty-select">${options}</select>`;
    });
  }

  // 成就 → 可编辑标签
  const achEl = document.getElementById('panelAchievements');
  const achievements = p.achievements || [];
  achEl.innerHTML = achievements.map((a, i) =>
    `<div class="edit-achievement-item">
      <input type="text" class="edit-input edit-achievement" data-index="${i}" value="${a}" />
      <button class="edit-remove-btn" data-index="${i}" title="删除">✕</button>
    </div>`
  ).join('') + `<button class="edit-add-btn" id="addAchievementBtn">+ 添加成就</button>`;

  // 删除成就
  achEl.querySelectorAll('.edit-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();
      reindexAchievements();
    });
  });

  // 添加成就
  document.getElementById('addAchievementBtn').addEventListener('click', () => {
    const item = document.createElement('div');
    item.className = 'edit-achievement-item';
    const idx = achEl.querySelectorAll('.edit-achievement').length;
    item.innerHTML = `<input type="text" class="edit-input edit-achievement" data-index="${idx}" value="" placeholder="输入成就…" /><button class="edit-remove-btn" data-index="${idx}" title="删除">✕</button>`;
    item.querySelector('.edit-remove-btn').addEventListener('click', () => {
      item.remove();
      reindexAchievements();
    });
    achEl.insertBefore(item, document.getElementById('addAchievementBtn'));
    item.querySelector('input').focus();
  });
}

function reindexAchievements() {
  document.querySelectorAll('.edit-achievement').forEach((el, i) => {
    el.dataset.index = i;
  });
  document.querySelectorAll('.edit-remove-btn').forEach((el, i) => {
    el.dataset.index = i;
  });
}

function saveEdit() {
  if (!selectedPersonId) return;
  const p = PERSONS.find(x => x.id === selectedPersonId);
  if (!p) return;

  // 保存名字
  const nameInput = document.querySelector('.edit-name');
  if (nameInput) p.name = nameInput.value.trim() || p.name;

  // 保存简介
  const descTextarea = document.querySelector('.edit-textarea');
  if (descTextarea) p.desc = descTextarea.value.trim();

  // 保存生卒年
  const birthInput = document.querySelector('.edit-birth');
  const deathInput = document.querySelector('.edit-death');
  if (birthInput) p.birth = parseInt(birthInput.value) || p.birth;
  if (deathInput) p.death = parseInt(deathInput.value) || p.death;

  // 保存朝代
  const dynastySelect = document.querySelector('.edit-dynasty-select');
  if (dynastySelect) p.dynasty = dynastySelect.value;

  // 保存成就
  const achievementInputs = document.querySelectorAll('.edit-achievement');
  p.achievements = [];
  achievementInputs.forEach(input => {
    const val = input.value.trim();
    if (val) p.achievements.push(val);
  });

  exitEditMode();
  // 重新渲染面板
  showPersonDetail(p.id);
  // 重新渲染时间轴
  if (currentView === 'timeline') renderTimeline();
  if (currentView === 'map') updateMapMarkers();
  if (currentView === 'graph') { graphNodes = []; renderGraph(); }
  updateStats();
}

function cancelEdit() {
  exitEditMode();
  if (selectedPersonId) showPersonDetail(selectedPersonId);
}

function exitEditMode() {
  isEditMode = false;
  const editBtn = document.getElementById('panelEditBtn');
  editBtn.textContent = '✏️ 编辑';
  editBtn.classList.remove('editing');
  document.getElementById('panelEditActions').classList.add('hidden');
}

// 绑定编辑按钮事件
document.getElementById('panelEditBtn').addEventListener('click', () => {
  if (isEditMode) return;
  enterEditMode();
});
document.getElementById('editSaveBtn').addEventListener('click', saveEdit);
document.getElementById('editCancelBtn').addEventListener('click', cancelEdit);

// ---- 删除人物功能 ----
document.getElementById('panelDeleteBtn').addEventListener('click', () => {
  if (!selectedPersonId || isEditMode) return;
  const p = PERSONS.find(x => x.id === selectedPersonId);
  if (!p) return;
  document.getElementById('deletePersonName').textContent = p.name;
  document.getElementById('deletePersonModal').classList.remove('hidden');
});

document.getElementById('deletePersonClose').addEventListener('click', closeDeleteModal);
document.getElementById('deletePersonCancel').addEventListener('click', closeDeleteModal);
document.getElementById('deletePersonModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeDeleteModal();
});

function closeDeleteModal() {
  document.getElementById('deletePersonModal').classList.add('hidden');
}

document.getElementById('deletePersonConfirm').addEventListener('click', () => {
  if (!selectedPersonId) return;
  const p = PERSONS.find(x => x.id === selectedPersonId);
  const name = p ? p.name : '';

  // 1. 从所有其他人物的关联中移除该人物
  PERSONS.forEach(person => {
    if (person.relations) {
      person.relations = person.relations.filter(r => r.id !== selectedPersonId);
    }
  });

  // 2. 从 PERSONS 数组中删除
  const idx = PERSONS.findIndex(x => x.id === selectedPersonId);
  if (idx !== -1) PERSONS.splice(idx, 1);

  // 3. 关闭确认弹窗和详情面板
  closeDeleteModal();
  document.getElementById('detailPanel').classList.add('hidden');
  selectedPersonId = null;

  // 4. 重新渲染所有视图
  if (currentView === 'timeline') renderTimeline();
  if (currentView === 'map') updateMapMarkers();
  if (currentView === 'graph') { graphNodes = []; renderGraph(); }
  updateStats();

  // 5. 提示
  showToast(`🗑️ 已删除人物「${name}」`);
});

// ---- 添加人物功能 ----
let addPersonModalInited = false;

function initAddPersonModal() {
  if (addPersonModalInited) return;
  addPersonModalInited = true;

  // 填充朝代下拉
  const dynastySelect = document.getElementById('addDynasty');
  DYNASTIES.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.name;
    opt.textContent = d.name;
    dynastySelect.appendChild(opt);
  });

  // 填充关联人物下拉
  refreshRelationSelects();

  // 实时计算享年 + 智能推断朝代
  const birthInput = document.getElementById('addBirth');
  const deathInput = document.getElementById('addDeath');
  function updateLifespan() {
    const b = parseInt(birthInput.value);
    const d = parseInt(deathInput.value);
    const el = document.getElementById('addLifespan');
    if (!isNaN(b) && !isNaN(d)) {
      el.textContent = `${d - b} 岁`;
    } else {
      el.textContent = '—';
    }
  }
  // 智能推断朝代
  function autoInferDynasty() {
    const b = parseInt(birthInput.value);
    const d = parseInt(deathInput.value);
    const mid = !isNaN(b) && !isNaN(d) ? Math.round((b + d) / 2) : (!isNaN(b) ? b : null);
    if (mid === null) return;
    const hint = document.getElementById('dynastyAutoHint');
    // 找到人物中间年份所在的朝代
    for (const dyn of DYNASTIES) {
      if (mid >= dyn.start && mid <= dyn.end) {
        const sel = document.getElementById('addDynasty');
        if (sel.value !== dyn.name) {
          sel.value = dyn.name;
          hint.style.display = 'inline';
          setTimeout(() => { hint.style.display = 'none'; }, 3000);
        }
        return;
      }
    }
  }
  birthInput.addEventListener('input', () => { updateLifespan(); autoInferDynasty(); });
  deathInput.addEventListener('input', () => { updateLifespan(); autoInferDynasty(); });

  // 智能推断 Emoji
  document.getElementById('addCat').addEventListener('change', () => {
    const catEmoji = {
      emperor: '👑', general: '⚔️', scholar: '📖', philosopher: '💡',
      scientist: '🔬', artist: '🎨', politician: '🏛️', sage: '🌟',
      diplomat: '🤝', inventor: '🔧'
    };
    const sel = document.getElementById('addCat');
    const emoji = catEmoji[sel.value] || '👤';
    // 仅当 emoji 还是默认值时自动更新
    const emojiInput = document.getElementById('addEmoji');
    if (!emojiInput) return; // emoji已移至类别联动，无需单独input
  });

  // 删除成就
  document.getElementById('addAchievements').addEventListener('click', (e) => {
    if (e.target.classList.contains('form-achievement-remove')) {
      e.target.parentElement.remove();
    }
  });

  // 添加成就
  document.getElementById('addMoreAchievement').addEventListener('click', () => {
    const container = document.getElementById('addAchievements');
    const item = document.createElement('div');
    item.className = 'form-achievement-item';
    item.innerHTML = `<input type="text" class="form-input add-achievement-input" placeholder="输入成就…" /><button class="form-achievement-remove" title="删除">✕</button>`;
    container.appendChild(item);
    item.querySelector('input').focus();
  });

  // 删除关联
  document.getElementById('addRelations').addEventListener('click', (e) => {
    if (e.target.classList.contains('form-achievement-remove')) {
      e.target.parentElement.remove();
    }
  });

  // 添加关联
  document.getElementById('addMoreRelation').addEventListener('click', () => {
    addRelationRow();
  });

  // 打开弹窗
  document.getElementById('btnAddPerson').addEventListener('click', openAddPersonModal);

  // 关闭弹窗
  document.getElementById('addPersonClose').addEventListener('click', closeAddPersonModal);
  document.getElementById('addPersonCancel').addEventListener('click', closeAddPersonModal);
  document.getElementById('addPersonModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddPersonModal();
  });

  // 分步向导
  document.getElementById('stepNext').addEventListener('click', () => goToStep(currentStep + 1));
  document.getElementById('stepPrev').addEventListener('click', () => goToStep(currentStep - 1));

  // 保存
  document.getElementById('addPersonSave').addEventListener('click', saveNewPerson);
}

// 分步向导状态
let currentStep = 1;
const totalSteps = 3;

function goToStep(step) {
  if (step < 1 || step > totalSteps) return;

  // 步骤1→2 验证必填
  if (step > currentStep && currentStep === 1) {
    const name = document.getElementById('addName').value.trim();
    const birth = document.getElementById('addBirth').value;
    const death = document.getElementById('addDeath').value;
    const dynasty = document.getElementById('addDynasty').value;
    if (!name) { showToast('⚠️ 请输入人物名字'); document.getElementById('addName').focus(); return; }
    if (!birth) { showToast('⚠️ 请输入生年'); document.getElementById('addBirth').focus(); return; }
    if (!death) { showToast('⚠️ 请输入卒年'); document.getElementById('addDeath').focus(); return; }
    if (!dynasty) { showToast('⚠️ 请选择朝代'); return; }
  }

  currentStep = step;

  // 更新步骤指示器
  document.querySelectorAll('.step-dot').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.toggle('active', s <= currentStep);
    dot.classList.toggle('current', s === currentStep);
  });

  // 切换面板
  document.querySelectorAll('.step-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const activePanel = document.getElementById(`step${currentStep}`);
  if (activePanel) activePanel.classList.add('active');

  // 切换按钮
  const prevBtn = document.getElementById('stepPrev');
  const nextBtn = document.getElementById('stepNext');
  const saveBtn = document.getElementById('addPersonSave');

  prevBtn.style.display = currentStep > 1 ? '' : 'none';
  nextBtn.style.display = currentStep < totalSteps ? '' : 'none';
  saveBtn.style.display = currentStep === totalSteps ? '' : 'none';

  // 步骤3时刷新关联人物列表
  if (currentStep === 3) {
    refreshRelationSelects();
  }
}

function refreshRelationSelects() {
  const selects = document.querySelectorAll('.add-relation-id');
  selects.forEach(sel => {
    const current = sel.value;
    sel.innerHTML = '<option value="">选择人物…</option>';
    PERSONS.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.emoji || '👤'} ${p.name}（${p.dynasty || ''}）`;
      sel.appendChild(opt);
    });
    if (current) sel.value = current;
  });
}

function addRelationRow() {
  const container = document.getElementById('addRelations');
  const item = document.createElement('div');
  item.className = 'form-relation-item';
  item.innerHTML = `
    <select class="form-select add-relation-id"><option value="">选择人物…</option></select>
    <select class="form-select add-relation-type">
      <option value="">关系类型</option>
      <option value="父子">父子</option>
      <option value="母子">母子</option>
      <option value="兄弟">兄弟</option>
      <option value="夫妻">夫妻</option>
      <option value="师承">师承</option>
      <option value="君臣">君臣</option>
      <option value="交游">交游</option>
      <option value="同盟">同盟</option>
      <option value="对立">对立</option>
      <option value="禅让">禅让</option>
      <option value="传承">传承</option>
    </select>
    <input type="text" class="form-input add-relation-label" placeholder="关系描述（可选）" style="flex:1" />
    <button class="form-achievement-remove" title="删除">✕</button>
  `;
  container.appendChild(item);
  // 填充人物列表
  const sel = item.querySelector('.add-relation-id');
  PERSONS.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.emoji || '👤'} ${p.name}（${p.dynasty || ''}）`;
    sel.appendChild(opt);
  });
}

function openAddPersonModal() {
  initAddPersonModal();
  refreshRelationSelects();
  // 重置表单
  document.getElementById('addName').value = '';
  document.getElementById('addBirth').value = '';
  document.getElementById('addDeath').value = '';
  document.getElementById('addLifespan').textContent = '—';
  document.getElementById('addDynasty').selectedIndex = 0;
  document.getElementById('addCat').selectedIndex = 0;
  document.getElementById('addLat').value = '';
  document.getElementById('addLng').value = '';
  document.getElementById('addPlace').value = '';
  document.getElementById('addDesc').value = '';
  document.getElementById('dynastyAutoHint').style.display = 'none';
  // 重置成就
  const achContainer = document.getElementById('addAchievements');
  achContainer.innerHTML = `<div class="form-achievement-item"><input type="text" class="form-input add-achievement-input" placeholder="输入成就…" /><button class="form-achievement-remove" title="删除">✕</button></div>`;
  // 重置关联
  const relContainer = document.getElementById('addRelations');
  relContainer.innerHTML = '';
  // 重置到第1步
  currentStep = 1;
  goToStep(1);
  // 显示弹窗
  document.getElementById('addPersonModal').classList.remove('hidden');
  setTimeout(() => document.getElementById('addName').focus(), 100);
}

function closeAddPersonModal() {
  document.getElementById('addPersonModal').classList.add('hidden');
  // 重置步骤
  currentStep = 1;
}

function saveNewPerson() {
  const name = document.getElementById('addName').value.trim();
  const birth = parseInt(document.getElementById('addBirth').value);
  const death = parseInt(document.getElementById('addDeath').value);
  const dynasty = document.getElementById('addDynasty').value;
  const cat = document.getElementById('addCat').value;
  const lat = parseFloat(document.getElementById('addLat').value);
  const lng = parseFloat(document.getElementById('addLng').value);
  const place = document.getElementById('addPlace').value.trim();
  const desc = document.getElementById('addDesc').value.trim();

  // 验证必填字段
  if (!name) { showToast('⚠️ 请输入人物名字'); return; }
  if (isNaN(birth)) { showToast('⚠️ 请输入生年'); return; }
  if (isNaN(death)) { showToast('⚠️ 请输入卒年'); return; }
  if (!dynasty) { showToast('⚠️ 请选择朝代'); return; }

  // 智能推断 Emoji
  const catEmoji = {
    emperor: '👑', general: '⚔️', scholar: '📖', philosopher: '💡',
    scientist: '🔬', artist: '🎨', politician: '🏛️', sage: '🌟',
    diplomat: '🤝', inventor: '🔧'
  };
  const emoji = catEmoji[cat] || '👤';

  // 生成唯一 ID
  const id = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

  // 收集成就
  const achievements = [];
  document.querySelectorAll('#addAchievements .add-achievement-input').forEach(input => {
    const val = input.value.trim();
    if (val) achievements.push(val);
  });

  // 收集关联人物
  const relations = [];
  const relItems = document.querySelectorAll('#addRelations .form-relation-item');
  relItems.forEach(item => {
    const relId = item.querySelector('.add-relation-id').value;
    const relType = item.querySelector('.add-relation-type').value;
    const relLabel = item.querySelector('.add-relation-label').value.trim();
    if (relId && relType) {
      relations.push({ id: relId, type: relType, label: relLabel || relType });
      // 同时在对方人物中添加反向关联
      const target = PERSONS.find(p => p.id === relId);
      if (target) {
        if (!target.relations) target.relations = [];
        // 检查是否已存在关联
        if (!target.relations.some(r => r.id === id)) {
          target.relations.push({ id: id, type: relType, label: name });
        }
      }
    }
  });

  // 构建人物对象
  const newPerson = {
    id,
    name,
    birth,
    death,
    cat,
    dynasty,
    emoji,
    desc: desc || `${name}，${dynasty}时期${catName(cat)}。`,
    achievements,
    relations,
    events: []
  };

  // 添加位置信息
  if (!isNaN(lat) && !isNaN(lng)) {
    newPerson.location = { lat, lng, place: place || '' };
  } else if (place) {
    newPerson.location = { lat: 35.0, lng: 114.0, place };
  }

  // 添加到数据
  PERSONS.push(newPerson);

  // 关闭弹窗
  closeAddPersonModal();

  // 重新渲染所有视图
  if (currentView === 'timeline') renderTimeline();
  if (currentView === 'map') updateMapMarkers();
  if (currentView === 'graph') { graphNodes = []; renderGraph(); }
  updateStats();

  // 自动打开详情面板
  showPersonDetail(id);

  // 提示
  showToast(`✅ 已添加人物「${name}」`);
}

// Toast 提示
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function clearHighlight() {
  document.querySelectorAll('.person-row').forEach(row => {
    row.classList.remove('highlighted', 'dimmed', 'search-match');
  });
}

function catName(cat) {
  const map = {
    emperor:'帝王', military:'将领', scholar:'文人',
    philosopher:'思想家', scientist:'科学家', artist:'艺术家',
    politician:'政治家', sage:'圣贤', general:'将领',
    diplomat:'外交家', inventor:'发明家'
  };
  return map[cat] || cat;
}

// ---- 关系图视图 ----
let graphDynastyFilter = 'all';
let graphRelTypeFilter = 'all';
let graphHoveredNode = null;
let graphScale = 1;
let graphOffset = { x: 0, y: 0 };
let graphDragStart = { x: 0, y: 0 };
let graphDragOffset = { x: 0, y: 0 };
let isDraggingGraph = false;
let graphInteractionInited = false;

// 关系类型颜色映射
const REL_TYPE_COLOR = {
  '父子': '#e74c3c',
  '母子': '#e74c3c',
  '兄弟': '#ff7675',
  '祖孙': '#d63031',
  '叔侄': '#fd79a8',
  '兄妹': '#fd79a8',
  '夫妻': '#e84393',
  '同盟': '#00b894',
  '同盟对立': '#fdcb6e',
  '对立': '#d63031',
  '对手': '#e17055',
  '君臣': '#6c5ce7',
  '臣属': '#a29bfe',
  '师徒': '#0984e3',
  '师生': '#74b9ff',
  '继承': '#f39c12',
  '禅让': '#f1c40f',
  '推荐': '#00cec9',
  '朋友': '#55efc4',
  '同僚': '#81ecec',
};
const REL_TYPE_DEFAULT_COLOR = '#5a6a7e';

function getRelColor(type) {
  if (!type) return REL_TYPE_DEFAULT_COLOR;
  // 模糊匹配：查找包含关键词的类型
  for (const [key, color] of Object.entries(REL_TYPE_COLOR)) {
    if (type.includes(key) || key.includes(type)) return color;
  }
  return REL_TYPE_DEFAULT_COLOR;
}

// 提取关系类型大类
function getRelCategory(type) {
  if (!type) return '其他';
  if (type.includes('父') || type.includes('母') || type.includes('祖') || type.includes('孙') || type.includes('兄') || type.includes('弟') || type.includes('侄') || type.includes('妹')) return '血缘';
  if (type.includes('夫') || type.includes('妻') || type.includes('夫妻')) return '婚姻';
  if (type.includes('君') || type.includes('臣') || type.includes('属')) return '君臣';
  if (type.includes('师') || type.includes('徒') || type.includes('生')) return '师承';
  if (type.includes('友') || type.includes('同僚') || type.includes('推荐')) return '交游';
  if (type.includes('对') || type.includes('敌')) return '对立';
  if (type.includes('盟')) return '同盟';
  if (type.includes('继承') || type.includes('禅让')) return '传承';
  return '其他';
}

const REL_CATEGORY_COLORS = {
  '血缘': '#e74c3c',
  '婚姻': '#e84393',
  '君臣': '#6c5ce7',
  '师承': '#0984e3',
  '交游': '#55efc4',
  '对立': '#e17055',
  '同盟': '#00b894',
  '传承': '#f39c12',
  '其他': '#5a6a7e',
};

function renderGraph() {
  const canvas = document.getElementById('graphCanvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.parentElement.clientWidth;
  const h = canvas.parentElement.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  // 初始化筛选控件
  initGraphControls();

  // 获取筛选后的人物
  let persons = [...PERSONS];
  if (activeCat !== 'all') persons = persons.filter(p => p.cat === activeCat);
  if (graphDynastyFilter !== 'all') persons = persons.filter(p => p.dynasty === graphDynastyFilter);
  if (searchQuery) persons = persons.filter(p => p.name.includes(searchQuery) || (p.desc && p.desc.includes(searchQuery)));

  // 只保留有关系的人物（或独立节点也保留但较小）
  const personIds = new Set(persons.map(p => p.id));

  // 按朝代分组
  const dynastyGroups = {};
  persons.forEach(p => {
    const dynasty = p.dynasty || '未知';
    if (!dynastyGroups[dynasty]) dynastyGroups[dynasty] = [];
    dynastyGroups[dynasty].push(p);
  });

  // 按朝代在 DYNASTIES 中的顺序排列
  const dynastyOrder = DYNASTIES.map(d => d.name);
  const orderedGroups = Object.keys(dynastyGroups).sort((a, b) => {
    const ia = dynastyOrder.indexOf(a);
    const ib = dynastyOrder.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  // 计算每个朝代的布局区域
  const groupCount = orderedGroups.length;
  const cols = Math.ceil(Math.sqrt(groupCount * 1.5));
  const rows = Math.ceil(groupCount / cols);
  const cellW = (w - 80) / cols;
  const cellH = (h - 80) / rows;

  // 初始化节点位置 - 按朝代分区
  graphNodes = [];
  const dynastyCenters = {};
  
  orderedGroups.forEach((dynasty, gi) => {
    const col = gi % cols;
    const row = Math.floor(gi / cols);
    const cx = 40 + col * cellW + cellW / 2;
    const cy = 40 + row * cellH + cellH / 2;
    dynastyCenters[dynasty] = { cx, cy };

    const groupPersons = dynastyGroups[dynasty];
    const perRow = Math.ceil(Math.sqrt(groupPersons.length * 1.5));
    
    groupPersons.forEach((p, pi) => {
      const pCol = pi % perRow;
      const pRow = Math.floor(pi / perRow);
      const spacing = Math.min(65, (cellW - 40) / perRow);
      const vSpacing = Math.min(65, (cellH - 40) / Math.ceil(groupPersons.length / perRow));
      
      graphNodes.push({
        id: p.id,
        x: cx + (pCol - perRow / 2) * spacing + (Math.random() - 0.5) * 10,
        y: cy + (pRow - Math.ceil(groupPersons.length / perRow) / 2) * vSpacing + (Math.random() - 0.5) * 10,
        vx: 0, vy: 0,
        person: p,
        dynasty: dynasty,
      });
    });
  });

  // 构建边
  graphEdges = [];
  persons.forEach(p => {
    (p.relations || []).forEach(r => {
      const srcIdx = graphNodes.findIndex(n => n.id === p.id);
      const tgtIdx = graphNodes.findIndex(n => n.id === r.id);
      if (srcIdx !== -1 && tgtIdx !== -1) {
        graphEdges.push({
          src: srcIdx,
          tgt: tgtIdx,
          type: r.type,
          label: r.label,
          category: getRelCategory(r.type),
        });
      }
    });
  });

  // 关系类型筛选
  if (graphRelTypeFilter !== 'all') {
    graphEdges = graphEdges.filter(e => e.category === graphRelTypeFilter);
  }

  // 力导向模拟（轻量级，从分区初始位置出发）
  if (graphAnim) cancelAnimationFrame(graphAnim);
  let tick = 0;

  function step() {
    const k = 80;
    const repulsion = 2000;
    const damping = 0.85;
    const intraGroupGravity = 0.01; // 同组引力
    const interGroupRepulsion = 5000; // 跨组斥力

    graphNodes.forEach(n => { n.vx = 0; n.vy = 0; });

    // 斥力 - 同组节点间
    for (let i = 0; i < graphNodes.length; i++) {
      for (let j = i + 1; j < graphNodes.length; j++) {
        const ni = graphNodes[i], nj = graphNodes[j];
        let dx = ni.x - nj.x, dy = ni.y - nj.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        
        // 跨朝代的斥力更大
        const force = ni.dynasty !== nj.dynasty ? interGroupRepulsion : repulsion;
        const f = force / (dist * dist);
        ni.vx += (dx / dist) * f;
        ni.vy += (dy / dist) * f;
        nj.vx -= (dx / dist) * f;
        nj.vy -= (dy / dist) * f;
      }
    }

    // 引力（边）- 同朝代内的边引力更强
    graphEdges.forEach(e => {
      const a = graphNodes[e.src], b = graphNodes[e.tgt];
      if (!a || !b) return;
      let dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const strength = a.dynasty === b.dynasty ? 0.08 : 0.02; // 同组更强引力
      const force = (dist - k) * strength;
      a.vx += (dx / dist) * force;
      a.vy += (dy / dist) * force;
      b.vx -= (dx / dist) * force;
      b.vy -= (dy / dist) * force;
    });

    // 朝代中心引力 - 保持节点在分区附近
    graphNodes.forEach(n => {
      const center = dynastyCenters[n.dynasty];
      if (center) {
        n.vx += (center.cx - n.x) * intraGroupGravity;
        n.vy += (center.cy - n.y) * intraGroupGravity;
      }
    });

    // 全局中心引力（弱）
    graphNodes.forEach(n => {
      n.vx += (w / 2 - n.x) * 0.0005;
      n.vy += (h / 2 - n.y) * 0.0005;
      n.vx *= damping;
      n.vy *= damping;
      n.x = Math.max(40, Math.min(w - 40, n.x + n.vx));
      n.y = Math.max(40, Math.min(h - 40, n.y + n.vy));
    });

    drawGraphFrame(ctx, w, h);

    tick++;
    if (tick < 120) graphAnim = requestAnimationFrame(step);
    else graphAnim = requestAnimationFrame(() => drawGraphFrame(ctx, w, h));
  }

  step();
  initGraphInteraction();
}

// 绘制关系图单帧
function drawGraphFrame(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);

  // 绘制朝代分区标签
  const dynastySet = new Set(graphNodes.map(n => n.dynasty));
  const drawnLabels = new Set();
  graphNodes.forEach(n => {
    if (drawnLabels.has(n.dynasty)) return;
    drawnLabels.add(n.dynasty);
    // 计算该朝代所有节点的中心
    const nodes = graphNodes.filter(gn => gn.dynasty === n.dynasty);
    if (nodes.length === 0) return;
    let cx = 0, cy = 0, minY = Infinity;
    nodes.forEach(nd => { cx += nd.x; cy += nd.y; if (nd.y < minY) minY = nd.y; });
    cx /= nodes.length; cy /= nodes.length;

    const dynasty = DYNASTIES.find(d => d.name === n.dynasty);
    const color = dynasty ? dynasty.color : '#5a6a7e';

    ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = color + 'aa';
    ctx.fillText(n.dynasty, cx, Math.min(minY - 25, cy - 40));
    
    // 朝代节点数
    ctx.font = '10px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillText(`${nodes.length}人`, cx, Math.min(minY - 10, cy - 25));
  });

  // 绘制边 - 使用贝塞尔曲线
  graphEdges.forEach(e => {
    const a = graphNodes[e.src], b = graphNodes[e.tgt];
    if (!a || !b) return;
    
    const color = REL_CATEGORY_COLORS[e.category] || REL_TYPE_DEFAULT_COLOR;
    const isHighlighted = graphHoveredNode && 
      (graphNodes[e.src].id === graphHoveredNode || graphNodes[e.tgt].id === graphHoveredNode);
    const isDimmed = graphHoveredNode && !isHighlighted;

    // 计算贝塞尔控制点
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // 垂直偏移量，根据距离调整曲线弧度
    const curvature = 0.15;
    const cpX = midX - dy * curvature;
    const cpY = midY + dx * curvature;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(cpX, cpY, b.x, b.y);
    
    if (isHighlighted) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
    } else if (isDimmed) {
      ctx.strokeStyle = color + '10';
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = color + '40';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 高亮时显示关系标签
    if (isHighlighted && e.label) {
      const labelX = cpX;
      const labelY = cpY - 8;
      ctx.font = '10px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = color;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(e.label, labelX, labelY);
      ctx.shadowBlur = 0;
    }
  });

  // 绘制节点
  graphNodes.forEach(n => {
    const color = CAT_COLOR[n.person.cat] || '#888';
    const isHovered = graphHoveredNode === n.id;
    const isConnected = graphHoveredNode && graphEdges.some(e => 
      (graphNodes[e.src].id === graphHoveredNode && graphNodes[e.tgt].id === n.id) ||
      (graphNodes[e.tgt].id === graphHoveredNode && graphNodes[e.src].id === n.id)
    );
    const isDimmed = graphHoveredNode && !isHovered && !isConnected;
    const r = isHovered ? 24 : isConnected ? 22 : 18;

    // 光晕
    const glowRadius = isHovered ? r * 3 : isConnected ? r * 2.5 : r * 1.8;
    const grad = ctx.createRadialGradient(n.x, n.y, 2, n.x, n.y, glowRadius);
    grad.addColorStop(0, isDimmed ? color + '08' : isHovered ? color + '50' : color + '25');
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // 圆
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isDimmed ? color + '30' : color + 'bb';
    ctx.fill();
    ctx.strokeStyle = isDimmed ? color + '20' : isHovered ? '#fff' : color;
    ctx.lineWidth = isHovered ? 2.5 : 1.5;
    ctx.stroke();

    // emoji
    ctx.font = `${isHovered ? 16 : 13}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = isDimmed ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.95)';
    ctx.fillText(n.person.emoji || '👤', n.x, n.y);

    // 名字
    ctx.font = `${isHovered ? 12 : 10}px "PingFang SC","Microsoft YaHei",sans-serif`;
    ctx.fillStyle = isDimmed ? 'rgba(255,255,255,0.15)' : isHovered ? '#fff' : 'rgba(255,255,255,0.75)';
    ctx.textBaseline = 'top';
    ctx.fillText(n.person.name, n.x, n.y + r + 4);
  });

  // 绘制统计
  const visibleEdges = graphHoveredNode 
    ? graphEdges.filter(e => graphNodes[e.src].id === graphHoveredNode || graphNodes[e.tgt].id === graphHoveredNode)
    : graphEdges;
  ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.textBaseline = 'top';
  ctx.fillText(`${graphNodes.length}人物 · ${visibleEdges.length}关系`, w - 20, 12);
}

// 初始化关系图筛选控件
function initGraphControls() {
  // 朝代选择器
  const dynastySelect = document.getElementById('graphDynastySelect');
  if (dynastySelect && !dynastySelect.dataset.inited) {
    dynastySelect.dataset.inited = 'true';
    const dynastyOrder = DYNASTIES.map(d => d.name);
    const usedDynasties = new Set(PERSONS.map(p => p.dynasty).filter(Boolean));
    const orderedDynasties = dynastyOrder.filter(d => usedDynasties.has(d));
    usedDynasties.forEach(d => {
      if (!orderedDynasties.includes(d)) orderedDynasties.push(d);
    });
    orderedDynasties.forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      dynastySelect.appendChild(opt);
    });
    dynastySelect.addEventListener('change', (e) => {
      graphDynastyFilter = e.target.value;
      graphNodes = [];
      renderGraph();
    });
  }

  // 关系类型选择器
  const relSelect = document.getElementById('graphRelType');
  if (relSelect && !relSelect.dataset.inited) {
    relSelect.dataset.inited = 'true';
    // 从数据中提取所有关系类型大类
    const categories = new Set();
    PERSONS.forEach(p => {
      (p.relations || []).forEach(r => {
        categories.add(getRelCategory(r.type));
      });
    });
    const sortedCats = [...categories].sort();
    sortedCats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      relSelect.appendChild(opt);
    });
    relSelect.addEventListener('change', (e) => {
      graphRelTypeFilter = e.target.value;
      graphNodes = [];
      renderGraph();
    });
  }

  // 关系类型图例
  const legend = document.getElementById('graphRelLegend');
  if (legend && !legend.dataset.inited) {
    legend.dataset.inited = 'true';
    const categories = new Set();
    PERSONS.forEach(p => {
      (p.relations || []).forEach(r => {
        categories.add(getRelCategory(r.type));
      });
    });
    [...categories].sort().forEach(cat => {
      const item = document.createElement('span');
      item.className = 'graph-rel-legend-item';
      const color = REL_CATEGORY_COLORS[cat] || REL_TYPE_DEFAULT_COLOR;
      item.innerHTML = `<span class="graph-rel-legend-line" style="background:${color}"></span>${cat}`;
      legend.appendChild(item);
    });
  }
}

// 关系图交互
function initGraphInteraction() {
  if (graphInteractionInited) return;
  graphInteractionInited = true;

  const canvas = document.getElementById('graphCanvas');

  // 鼠标移动 - hover 高亮
  canvas.addEventListener('mousemove', throttle((e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDraggingGraph) {
      graphOffset.x = graphDragOffset.x + (e.clientX - graphDragStart.x);
      graphOffset.y = graphDragOffset.y + (e.clientY - graphDragStart.y);
      return;
    }

    let found = null;
    for (const n of graphNodes) {
      const dx = mx - n.x, dy = my - n.y;
      if (dx * dx + dy * dy < 24 * 24) {
        found = n.id;
        break;
      }
    }

    if (found !== graphHoveredNode) {
      graphHoveredNode = found;
      canvas.style.cursor = found ? 'pointer' : 'grab';
      // 重绘
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGraphFrame(ctx, canvas.clientWidth, canvas.clientHeight);
      ctx.restore();
    }
  }, 16));

  canvas.addEventListener('mouseleave', () => {
    graphHoveredNode = null;
    isDraggingGraph = false;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGraphFrame(ctx, canvas.clientWidth, canvas.clientHeight);
    ctx.restore();
  });

  // 拖拽
  canvas.addEventListener('mousedown', (e) => {
    isDraggingGraph = true;
    graphDragStart = { x: e.clientX, y: e.clientY };
    graphDragOffset = { ...graphOffset };
    canvas.style.cursor = 'grabbing';
  });

  // 点击
  canvas.addEventListener('mouseup', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (Math.abs(e.clientX - graphDragStart.x) < 5 && Math.abs(e.clientY - graphDragStart.y) < 5) {
      for (const n of graphNodes) {
        const dx = mx - n.x, dy = my - n.y;
        if (dx * dx + dy * dy < 24 * 24) {
          showPersonDetail(n.id);
          break;
        }
      }
    }
    isDraggingGraph = false;
    canvas.style.cursor = 'grab';
  });

  // 滚轮缩放
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    graphScale = Math.min(Math.max(graphScale * factor, 0.3), 3);
    // 简单缩放：重新渲染
    graphNodes = [];
    renderGraph();
  }, { passive: false });
}

// ---- 视图切换 ----
function switchView(view) {
  currentView = view;
  document.getElementById('timelineView').style.display = view === 'timeline' ? '' : 'none';
  document.getElementById('graphView').style.display = view === 'graph' ? '' : 'none';
  document.getElementById('mapView').style.display = view === 'map' ? '' : 'none';

  document.querySelectorAll('.btn-view').forEach(b => b.classList.remove('active'));
  document.getElementById(view === 'timeline' ? 'btnTimeline' : view === 'graph' ? 'btnGraph' : 'btnMap').classList.add('active');

  if (view === 'timeline') renderTimeline();
  if (view === 'graph') { graphNodes = []; graphHoveredNode = null; renderGraph(); }
  if (view === 'map') {
    const select = document.getElementById('mapDynastySelect');
    if (select) { select.value = mapDynastyFilter; }
    initMapInteraction(); renderMap();
  }
}

document.getElementById('btnTimeline').addEventListener('click', () => switchView('timeline'));
document.getElementById('btnGraph').addEventListener('click', () => switchView('graph'));
document.getElementById('btnMap').addEventListener('click', () => switchView('map'));

// ---- 面板关闭 ----
document.getElementById('panelClose').addEventListener('click', () => {
  document.getElementById('detailPanel').classList.add('hidden');
  selectedPersonId = null;
  clearHighlight();
  if (isEditMode) exitEditMode();
});

// ---- 缩放 ----
function zoomIn() {
  pxPerYear = Math.min(pxPerYear * 1.5, 8);
  renderTimeline();
  updateStats();
}
function zoomOut() {
  pxPerYear = Math.max(pxPerYear / 1.5, 0.1);
  renderTimeline();
  updateStats();
}
function zoomReset() {
  pxPerYear = PX_PER_YEAR_DEFAULT;
  renderTimeline();
  updateStats();
}

document.getElementById('zoomIn').addEventListener('click', zoomIn);
document.getElementById('zoomOut').addEventListener('click', zoomOut);
document.getElementById('zoomReset').addEventListener('click', zoomReset);

// 鼠标滚轮缩放（以鼠标位置为中心）
const throttledWheel = throttle((e) => {
  const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
  const view = document.getElementById('timelineView');
  const rect = view.getBoundingClientRect();
  const mouseX = e.clientX - rect.left + view.scrollLeft;
  const yearAtMouse = YEAR_START + mouseX / pxPerYear;
  pxPerYear = Math.min(Math.max(pxPerYear * factor, 0.1), 8);
  renderTimeline();
  const newX = (yearAtMouse - YEAR_START) * pxPerYear - (e.clientX - rect.left);
  view.scrollLeft = Math.max(0, newX);
  updateStats();
}, 50);

document.getElementById('timelineView').addEventListener('wheel', (e) => {
  e.preventDefault();
  throttledWheel(e);
}, { passive: false });

// ---- 拖拽滚动 ----
const tlView = document.getElementById('timelineView');
tlView.addEventListener('mousedown', (e) => {
  if (e.target.closest('.person-row, .event-node, .zoom-controls')) return;
  isDragging = true;
  dragStartX = e.clientX;
  dragScrollX = tlView.scrollLeft;
  tlView.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  tlView.scrollLeft = dragScrollX - (e.clientX - dragStartX);
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  tlView.style.cursor = 'grab';
});

// ---- 搜索（防抖优化） ----
const debouncedSearch = debounce((q) => {
  if (!q) {
    clearHighlight();
    return;
  }
  const matchIds = new Set(PERSONS.filter(p =>
    p.name.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q)) ||
    (p.achievements && p.achievements.some(a => a.toLowerCase().includes(q)))
  ).map(p => p.id));

  document.querySelectorAll('.person-row').forEach(row => {
    if (matchIds.has(row.dataset.personId)) {
      row.classList.add('highlighted');
      row.classList.remove('dimmed');
    } else {
      row.classList.remove('highlighted');
      row.classList.add('dimmed');
    }
  });

  if (matchIds.size > 0) {
    const first = PERSONS.find(p => matchIds.has(p.id));
    if (first) scrollToYear((first.birth + first.death) / 2);
  }
}, 200);

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  debouncedSearch(searchQuery);
});

// ---- 键盘快捷键 ----
document.addEventListener('keydown', (e) => {
  // 搜索框获得焦点时不处理快捷键
  if (document.activeElement === document.getElementById('searchInput')) {
    if (e.key === 'Escape') {
      document.getElementById('searchInput').blur();
      document.getElementById('searchInput').value = '';
      searchQuery = '';
      clearHighlight();
    }
    return;
  }

  switch(e.key) {
    case '1':
      switchView('timeline');
      break;
    case '2':
      switchView('graph');
      break;
    case '3':
      switchView('map');
      break;
    case '+':
    case '=':
      zoomIn();
      break;
    case '-':
      zoomOut();
      break;
    case '0':
      zoomReset();
      break;
    case '/':
      e.preventDefault();
      document.getElementById('searchInput').focus();
      break;
    case 'Escape':
      document.getElementById('detailPanel').classList.add('hidden');
      selectedPersonId = null;
      clearHighlight();
      if (isEditMode) exitEditMode();
      break;
  }
});

// ---- 事件绑定 ----
function bindEvents() {
  // 筛选按钮已经在 buildFilterBtns 里绑定
}

// ---- 页面初始滚动到前500年 ----
setTimeout(() => {
  scrollToYear(-500);
}, 100);

// =============================================
// 地图视图（Leaflet 真实地图）
// =============================================
let leafletMap = null;
let mapMarkerLayer = null;
let mapDynastyFilter = 'all';
let mapYearFilter = -4500;
let mapInteractionInited = false;

function initLeafletMap() {
  if (leafletMap) return;

  leafletMap = L.map('leafletMap', {
    center: [35, 104],
    zoom: 4,
    minZoom: 3,
    maxZoom: 12,
    zoomControl: false,
    attributionControl: false,
  });

  // 深色主题地图瓦片（CartoDB Dark Matter）
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(leafletMap);

  // 缩放控件放右上角
  L.control.zoom({ position: 'topright' }).addTo(leafletMap);

  // 版权信息
  L.control.attribution({ position: 'bottomright', prefix: '' })
    .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>')
    .addTo(leafletMap);

  // Marker 图层组
  mapMarkerLayer = L.layerGroup().addTo(leafletMap);
}

// 自定义 Marker 图标
function createMarkerIcon(person, clusterSize) {
  let color;
  if (mapDynastyFilter !== 'all') {
    const dynasty = DYNASTIES.find(d => d.name === mapDynastyFilter);
    color = dynasty ? dynasty.color : getCatColorForMap(person.cat);
  } else {
    color = getCatColorForMap(person.cat);
  }

  const size = clusterSize > 1 ? 40 : 32;
  const fontSize = clusterSize > 1 ? 14 : 16;
  const countBadge = clusterSize > 1
    ? `<div style="position:absolute;top:-4px;right:-4px;background:${color};color:#fff;font-size:10px;font-weight:bold;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #0b0f19;box-shadow:0 0 6px ${color}80;">${clusterSize}</div>`
    : '';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;">
        <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color}cc;border:2px solid rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;box-shadow:0 0 12px ${color}60,0 2px 8px rgba(0,0,0,0.4);cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;">
          ${person.emoji || '👤'}
        </div>
        ${countBadge}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

function updateMapMarkers() {
  if (!leafletMap || !mapMarkerLayer) return;
  mapMarkerLayer.clearLayers();

  const filtered = PERSONS.filter(p => {
    if (!p.location) return false;
    if (activeCat !== 'all' && p.cat !== activeCat) return false;
    if (mapDynastyFilter !== 'all' && p.dynasty !== mapDynastyFilter) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return false;
    const personMid = (p.birth + p.death) / 2;
    if (mapYearFilter > -4500 && personMid > mapYearFilter) return false;
    return true;
  });

  // 按位置聚合近距离标记
  const clusters = [];
  const clusterDist = 0.8; // 经纬度距离阈值，随缩放级别可调

  filtered.forEach(person => {
    const lat = person.location.lat;
    const lng = person.location.lng;
    let addedToCluster = false;

    for (const cluster of clusters) {
      const dLat = lat - cluster.lat;
      const dLng = lng - cluster.lng;
      if (Math.sqrt(dLat * dLat + dLng * dLng) < clusterDist) {
        cluster.persons.push(person);
        addedToCluster = true;
        break;
      }
    }

    if (!addedToCluster) {
      clusters.push({ lat, lng, persons: [person] });
    }
  });

  clusters.forEach(cluster => {
    const mainPerson = cluster.persons[0];
    const clusterSize = cluster.persons.length;

    // 计算聚合中心
    let avgLat = 0, avgLng = 0;
    cluster.persons.forEach(p => { avgLat += p.location.lat; avgLng += p.location.lng; });
    avgLat /= clusterSize;
    avgLng /= clusterSize;

    const icon = createMarkerIcon(mainPerson, clusterSize);

    const nameList = clusterSize === 1
      ? mainPerson.name
      : cluster.persons.slice(0, 5).map(p => p.name).join('、') + (clusterSize > 5 ? ` 等${clusterSize}人` : '');

    const popupContent = clusterSize === 1
      ? `<div class="map-popup">
           <div class="map-popup-name">${mainPerson.emoji} ${mainPerson.name}</div>
           <div class="map-popup-meta">${mainPerson.dynasty} · ${mainPerson.location.place}</div>
           <div class="map-popup-meta">${formatYear(mainPerson.birth)} — ${formatYear(mainPerson.death)} · 享年${mainPerson.death - mainPerson.birth}岁</div>
         </div>`
      : `<div class="map-popup">
           <div class="map-popup-name">${mainPerson.emoji} ${nameList}</div>
           <div class="map-popup-meta">${clusterSize}人位于${mainPerson.location.place}附近</div>
         </div>`;

    const marker = L.marker([avgLat, avgLng], { icon })
      .bindPopup(popupContent, {
        className: 'custom-popup',
        maxWidth: 260,
        closeButton: true,
      });

    // 点击显示详情面板
    marker.on('click', () => {
      showPersonDetail(mainPerson.id);
    });

    // hover 弹出 popup
    marker.on('mouseover', function() {
      this.openPopup();
    });
    marker.on('mouseout', function() {
      // 不自动关闭，让用户可以点击 popup
    });

    mapMarkerLayer.addLayer(marker);
  });

  // 更新朝代筛选信息
  updateMapDynastyInfo();
}

function renderMap() {
  initLeafletMap();
  initDynastySelect();
  initMapControls();
  updateMapMarkers();

  // 延迟 invalidateSize，确保容器已显示
  setTimeout(() => {
    if (leafletMap) leafletMap.invalidateSize();
  }, 100);
}

function initMapControls() {
  const slider = document.getElementById('mapYearSlider');
  if (slider && !slider.dataset.bound) {
    slider.dataset.bound = 'true';
    slider.addEventListener('input', (e) => {
      mapYearFilter = parseInt(e.target.value);
      const label = document.getElementById('mapYearLabel');
      if (mapYearFilter === -4500) {
        label.textContent = '显示全部时期';
      } else if (mapYearFilter < 0) {
        label.textContent = `公元前${-mapYearFilter}年以前`;
      } else {
        label.textContent = `公元${mapYearFilter}年以前`;
      }
      updateMapMarkers();
    });
  }
}

// 初始化朝代选择器
function initDynastySelect() {
  const select = document.getElementById('mapDynastySelect');
  if (!select || select.dataset.inited) return;
  select.dataset.inited = 'true';

  const dynastyOrder = DYNASTIES.map(d => d.name);
  const usedDynasties = new Set(PERSONS.map(p => p.dynasty).filter(Boolean));
  const orderedDynasties = dynastyOrder.filter(d => usedDynasties.has(d));
  usedDynasties.forEach(d => {
    if (!orderedDynasties.includes(d)) orderedDynasties.push(d);
  });

  orderedDynasties.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    mapDynastyFilter = e.target.value;
    if (mapDynastyFilter !== 'all') {
      const dynasty = DYNASTIES.find(d => d.name === mapDynastyFilter);
      if (dynasty) {
        const slider = document.getElementById('mapYearSlider');
        slider.value = dynasty.end;
        mapYearFilter = dynasty.end;
        const label = document.getElementById('mapYearLabel');
        if (dynasty.end < 0) {
          label.textContent = `公元前${-dynasty.end}年以前`;
        } else {
          label.textContent = `公元${dynasty.end}年以前`;
        }
      }
    }
    updateMapMarkers();
  });
}

function initMapInteraction() {
  // Leaflet 自带交互，无需额外初始化
  mapInteractionInited = true;
}

// 更新地图朝代信息提示
function updateMapDynastyInfo() {
  // 移除旧的朝代信息控件
  const oldInfo = document.getElementById('mapDynastyInfo');
  if (oldInfo) leafletMap.removeControl(oldInfo);

  if (mapDynastyFilter !== 'all') {
    const dynasty = DYNASTIES.find(d => d.name === mapDynastyFilter);
    const dynastyColor = dynasty ? dynasty.color : '#d4a843';
    const filteredCount = PERSONS.filter(p => p.location && p.dynasty === mapDynastyFilter).length;

    const info = L.control({ position: 'topleft' });
    info.onAdd = function() {
      const div = L.DomUtil.create('div', 'map-dynasty-info');
      div.id = 'mapDynastyInfo';
      div.innerHTML = `
        <div style="font-weight:bold;font-size:15px;color:${dynastyColor};">🏛️ ${mapDynastyFilter} · ${filteredCount}人</div>
        ${dynasty ? `<div style="font-size:12px;color:rgba(255,255,255,0.45);margin-top:4px;">${formatYear(dynasty.start)} — ${formatYear(dynasty.end)}</div>` : ''}
      `;
      return div;
    };
    info.addTo(leafletMap);
  }
}

function renderMapFrame() {
  updateMapMarkers();
}
