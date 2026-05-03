// =============================================
// 中华历史人物图谱 - 主程序逻辑（优化版）
// =============================================

// ---- 配置 ----
const YEAR_START = -2697;
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
function getAxisTopFor(blockId) {
  const block = document.getElementById(blockId || 'chinaBlock');
  const h = block ? block.clientHeight - 36 : 400;
  return Math.round(h * AXIS_TOP_RATIO);
}
// 通过 spacer 元素驱动wrapper垂直滚动
function adjustWrapperHeight(wrapperId, personsData, axisTop) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper || !personsData) return;
  const rowH = 32;
  const padding = 40;
  const maxRows = Math.ceil(personsData.length / 2) + 2;
  const needed = axisTop + maxRows * rowH + padding + 'px';

  let spacer = wrapper.querySelector('.scroll-spacer');
  if (!spacer) {
    spacer = document.createElement('div');
    spacer.className = 'scroll-spacer';
    spacer.style.cssText = 'position:relative;width:1px;pointer-events:none;margin:0;padding:0;';
    wrapper.appendChild(spacer);
  }
  spacer.style.height = needed;
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

function bindEvents() {
  // 缩放按钮
  document.getElementById('zoomReset').addEventListener('click', () => {
    pxPerYear = PX_PER_YEAR_DEFAULT;
    renderTimeline();
    renderWorldTimeline();
  renderKoreaTimeline();
    renderJapanTimeline();
    updateStats();
  });

  // 鼠标滚轮缩放 - 以鼠标位置为中心
  const scrollTarget = document.getElementById('mainContainer');

  function zoomAtPoint(e) {
    const rect = scrollTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const newPx = Math.min(Math.max(pxPerYear * factor, 0.2), 5);
    if (newPx === pxPerYear) return;

    const targetYear = (scrollTarget.scrollLeft + mouseX) / pxPerYear + YEAR_START;
    pxPerYear = newPx;

    renderTimeline();
    renderWorldTimeline();
  renderKoreaTimeline();
    renderJapanTimeline();
    updateStats();

    scrollTarget.scrollLeft = (targetYear - YEAR_START) * pxPerYear - mouseX;
    fixBlockHeaders();
  }

  const container = document.getElementById('dualTimelineContainer');
  if (container) {
    container.addEventListener('wheel', (e) => { e.preventDefault(); zoomAtPoint(e); }, { passive: false });
    document.getElementById('timelineWrapper').addEventListener('wheel', (e) => { e.preventDefault(); zoomAtPoint(e); }, { passive: false });
    document.getElementById('worldTimelineWrapper').addEventListener('wheel', (e) => { e.preventDefault(); zoomAtPoint(e); }, { passive: false });
    document.getElementById('japanTimelineWrapper').addEventListener('wheel', (e) => { e.preventDefault(); zoomAtPoint(e); }, { passive: false });

    // 拖拽滚动 - 绑在 mainContainer（实际可滚动容器）
    scrollTarget.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - scrollTarget.offsetLeft;
      scrollLeft = scrollTarget.scrollLeft;
      scrollTarget.style.cursor = 'grabbing';
    });

    scrollTarget.addEventListener('mouseleave', () => {
      isDragging = false;
      scrollTarget.style.cursor = 'default';
    });

    scrollTarget.addEventListener('mouseup', () => {
      isDragging = false;
      scrollTarget.style.cursor = 'default';
    });

    scrollTarget.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollTarget.offsetLeft;
      const walk = (x - startX) * 2;
      scrollTarget.scrollLeft = scrollLeft - walk;
    fixBlockHeaders();
  });
  }
}

// ---- 标题栏固定 ----
function fixBlockHeaders() {
  const scrollX = document.getElementById('mainContainer').scrollLeft;
  document.querySelectorAll('.block-header').forEach(h => {
    h.style.transform = 'translateX(' + scrollX + 'px)';
  });
}

// ---- 拉宽手柄 ----
function initResizeHandles() {
  const handles = document.querySelectorAll('.resize-handle');
  handles.forEach(handle => {
    let startY, startHeight, aboveBlock;
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const aboveId = handle.dataset.above;
      aboveBlock = document.getElementById(aboveId);
      if (!aboveBlock || aboveBlock.classList.contains('collapsed')) return;
      startY = e.clientY;
      startHeight = aboveBlock.getBoundingClientRect().height;
      handle.classList.add('active');
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    });
  });
  document.addEventListener('mousemove', (e) => {
    const active = document.querySelector('.resize-handle.active');
    if (!active) return;
    const aboveId = active.dataset.above;
    const aboveBlock = document.getElementById(aboveId);
    if (!aboveBlock || aboveBlock.classList.contains('collapsed')) return;
    const delta = e.clientY - window._resizeStartY;
    const newH = Math.max(100, (window._resizeStartHeight || 300) + delta);
    aboveBlock.style.flex = 'none';
    aboveBlock.style.height = newH + 'px';
  });
  document.addEventListener('mouseup', () => {
    const active = document.querySelector('.resize-handle.active');
    if (active) active.classList.remove('active');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
  // 存储起始值用全局
  document.addEventListener('mousedown', (e) => {
    if (e.target.closest('.resize-handle')) {
      window._resizeStartY = e.clientY;
      const aboveId = e.target.closest('.resize-handle').dataset.above;
      const aboveBlock = document.getElementById(aboveId);
      window._resizeStartHeight = aboveBlock ? aboveBlock.getBoundingClientRect().height : 300;
    }
  }, true);
}

// ---- 折叠按钮 ----
function initCollapseButtons() {
  document.querySelectorAll('.btn-collapse').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const block = btn.closest('.timeline-block');
      block.classList.toggle('collapsed');
      // 刷新三轴渲染
      setTimeout(() => {
        renderTimeline();
        renderWorldTimeline();
  renderKoreaTimeline();
        renderJapanTimeline();
      }, 300);
    });
  });
}

// ---- 点击空白处关闭详情面板 ----
function initClickOutsideClose() {
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('detailPanel');
    if (!panel || panel.classList.contains('hidden')) return;
    // 检查是否点击在面板内
    if (panel.contains(e.target)) return;
    // 检查是否点击在人物行上（会触发 open）
    if (e.target.closest('.person-row')) return;
    // 检查是否点击在 button/input 等交互元素
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) return;
    panel.classList.add('hidden');
    selectedPersonId = null;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildEraTabs();
  buildFilterBtns();
  renderTimeline();
  renderWorldTimeline();
  renderKoreaTimeline();
  renderJapanTimeline();
  bindEvents();
  updateStats();
  initAddPersonModal();
  initResizeHandles();
  initCollapseButtons();
  initClickOutsideClose();
  fixBlockHeaders();
});
// 监听主容器滚动以固定标题栏
document.getElementById('mainContainer').addEventListener('scroll', fixBlockHeaders, { passive: true });

const debouncedResize = debounce(() => {
  renderTimeline();
  renderWorldTimeline();
  renderKoreaTimeline();
  renderJapanTimeline();
  // renderGraph disabled
// DISABLED:   // map disabled(); }
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
  const view = document.getElementById('dualTimelineContainer');
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
      renderTimeline();
      renderWorldTimeline();
  renderKoreaTimeline();
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
  const axisTop = getAxisTopFor('chinaBlock');
  const w = totalWidth();
  wrapper.style.width = w + 'px';

  renderDynastyBands(axisTop, w);
  renderAxisLine(axisTop, w);
  renderTicks(axisTop, w);
  renderEvents(axisTop);
  renderPersons(axisTop);
}



// ---- 世界史时间轴 ----
function renderWorldTimeline() {
  if (typeof WORLD_EVENTS === 'undefined') return;
  const wrapper = document.getElementById('worldTimelineWrapper');
  if (!wrapper) return;
  const w = totalWidth();
  wrapper.style.width = w + 'px';
  const axisTop = getAxisTopFor('worldBlock');

  // 时代色带
  const bandsEl = document.getElementById('worldDynastyBands');
  bandsEl.innerHTML = '';
  const eras = [
    { name: '上古文明', start: -2697, end: -500, color: '#8B4513' },
    { name: '古典时代', start: -500, end: 476, color: '#4a6741' },
    { name: '中世纪', start: 476, end: 1400, color: '#5a4a6e' },
    { name: '文艺复兴', start: 1400, end: 1600, color: '#6e4a5a' },
    { name: '近代', start: 1600, end: 1900, color: '#4a5a6e' },
    { name: '现代', start: 1900, end: 2025, color: '#2c3e50' },
  ];
  eras.forEach(era => {
    const x1 = yearToX(era.start);
    const x2 = yearToX(era.end);
    const band = document.createElement('div');
    band.className = 'dynasty-band';
    band.style.cssText = 'left:' + x1 + 'px;width:' + Math.max(x2-x1,2) + 'px;background:' + era.color + ';';
    bandsEl.appendChild(band);
    if (x2 - x1 > 40) {
      const label = document.createElement('div');
      label.className = 'dynasty-label';
      label.style.cssText = 'left:' + (x1+(x2-x1)/2) + 'px;transform:translateX(-50%);';
      label.textContent = era.name;
      bandsEl.appendChild(label);
    }
  });

  // 主轴线
  const axisEl = document.getElementById('worldAxisLine');
  if (axisEl) axisEl.style.cssText = 'top:' + axisTop + 'px;left:0;width:' + w + 'px;';

  // 刻度
  const ticksEl = document.getElementById('worldAxisTicks');
  if (ticksEl) {
    ticksEl.innerHTML = '';
    const majorStep = pxPerYear < 0.3 ? 500 : pxPerYear < 0.8 ? 100 : 50;
    const minorStep = majorStep / 5;
    const frag = document.createDocumentFragment();
    for (let y = Math.ceil(YEAR_START / minorStep) * minorStep; y <= YEAR_END; y += minorStep) {
      const isMajor = y % majorStep === 0;
      const x = yearToX(y);
      const tick = document.createElement('div');
      tick.className = 'tick-mark' + (isMajor ? ' tick-major' : '');
      tick.style.cssText = 'left:' + x + 'px;top:' + (axisTop - (isMajor?10:5)) + 'px;';
      const ln = document.createElement('div');
      ln.className = 'tick-line';
      ln.style.height = (isMajor?20:10) + 'px';
      tick.appendChild(ln);
      if (isMajor) {
        const lbl = document.createElement('div');
        lbl.className = 'tick-label';
        lbl.textContent = y < 0 ? '前' + (-y) : '' + y;
        tick.appendChild(lbl);
      }
      frag.appendChild(tick);
    }
    ticksEl.appendChild(frag);
  }

  // 事件（上下交替）
  const aboveEl = document.getElementById('worldEventsAbove');
  const belowEl = document.getElementById('worldEventsBelow');
  if (aboveEl) { aboveEl.innerHTML = ''; aboveEl.style.top = '0'; }
  if (belowEl) { belowEl.innerHTML = ''; belowEl.style.top = axisTop + 'px'; }

  WORLD_EVENTS.forEach((evt, i) => {
    const x = yearToX(evt.year);
    const isAbove = i % 2 === 0;
    const container = isAbove ? aboveEl : belowEl;
    if (!container) return;
    const color = evtColor(evt.type);
    const node = document.createElement('div');
    node.className = 'event-node ' + (isAbove ? 'above' : 'below');
    node.style.cssText = 'left:' + x + 'px;' + (isAbove ? 'bottom:0;' : 'top:0;');
    const dot = document.createElement('div');
    dot.className = 'event-dot';
    dot.style.cssText = 'border-color:' + color + ';';
    const line = document.createElement('div');
    line.className = 'event-line';
    line.style.cssText = 'height:' + (30 + (i%5)*15) + 'px;background:' + color + ';';
    const label = document.createElement('div');
    label.className = 'event-label';
    label.textContent = evt.name;
    node.appendChild(dot);
    node.appendChild(line);
    node.appendChild(label);
    node.addEventListener('mouseenter', (e) => showWorldEventTooltip(evt, e));
    node.addEventListener('mouseleave', hideEventTooltip);
    node.addEventListener('mousemove', throttle(moveTooltip, 16));
    container.appendChild(node);
  });

  // 人物 - 使用与中国史相同的横条风格
  if (typeof WORLD_PERSONS !== 'undefined') {
    const pAbove = document.getElementById('worldPersonsAbove');
    const pBelow = document.getElementById('worldPersonsBelow');
    if (pAbove) { pAbove.innerHTML = ''; pAbove.style.top = '0'; }
    if (pBelow) { pBelow.innerHTML = ''; pBelow.style.top = axisTop + 'px'; }

    const sorted = [...WORLD_PERSONS].sort((a, b) => a.birth - b.birth);
    const abovePersons = sorted.filter((_, i) => i % 2 === 0);
    const belowPersons = sorted.filter((_, i) => i % 2 !== 0);

    layoutPersonRows(abovePersons, pAbove, axisTop, true, 'world');
    layoutPersonRows(belowPersons, pBelow, axisTop, false, 'world');
    adjustWrapperHeight('worldTimelineWrapper', WORLD_PERSONS, axisTop);
  }
}
// ---- 日本史时间轴 ----
function renderJapanTimeline() {
  if (typeof JAPAN_EVENTS === 'undefined') return;
  const wrapper = document.getElementById('japanTimelineWrapper');
  if (!wrapper) return;
  const w = totalWidth();
  wrapper.style.width = w + 'px';
  const axisTop = getAxisTopFor('japanBlock');

  // 时代色带
  const bandsEl = document.getElementById('japanDynastyBands');
  bandsEl.innerHTML = '';
  const eras = [
    { name: '飞鸟时代', start: -2697, end: 710, color: '#8B0000' },
    { name: '奈良时代', start: 710, end: 794, color: '#6a0dad' },
    { name: '平安时代', start: 794, end: 1185, color: '#4a0080' },
    { name: '镰仓幕府', start: 1185, end: 1336, color: '#4a4a4a' },
    { name: '室町幕府', start: 1336, end: 1573, color: '#3a5a3a' },
    { name: '战国时代', start: 1467, end: 1603, color: '#5a3a3a' },
    { name: '江户幕府', start: 1603, end: 1868, color: '#2a2a5a' },
    { name: '明治以后', start: 1868, end: 2025, color: '#c0392b' },
  ];
  eras.forEach(era => {
    const x1 = yearToX(era.start);
    const x2 = yearToX(era.end);
    const band = document.createElement('div');
    band.className = 'dynasty-band';
    band.style.cssText = 'left:' + x1 + 'px;width:' + Math.max(x2-x1,2) + 'px;background:' + era.color + ';';
    bandsEl.appendChild(band);
    if (x2 - x1 > 40) {
      const label = document.createElement('div');
      label.className = 'dynasty-label';
      label.style.cssText = 'left:' + (x1+(x2-x1)/2) + 'px;transform:translateX(-50%);';
      label.textContent = era.name;
      bandsEl.appendChild(label);
    }
  });

  // 主轴线
  const axisEl = document.getElementById('japanAxisLine');
  if (axisEl) axisEl.style.cssText = 'top:' + axisTop + 'px;left:0;width:' + w + 'px;';

  // 刻度
  const ticksEl = document.getElementById('japanAxisTicks');
  if (ticksEl) {
    ticksEl.innerHTML = '';
    const majorStep = pxPerYear < 0.3 ? 500 : pxPerYear < 0.8 ? 100 : 50;
    const minorStep = majorStep / 5;
    const frag = document.createDocumentFragment();
    for (let y = Math.ceil(YEAR_START / minorStep) * minorStep; y <= YEAR_END; y += minorStep) {
      const isMajor = y % majorStep === 0;
      const x = yearToX(y);
      const tick = document.createElement('div');
      tick.className = 'tick-mark' + (isMajor ? ' tick-major' : '');
      tick.style.cssText = 'left:' + x + 'px;top:' + (axisTop - (isMajor?10:5)) + 'px;';
      const ln = document.createElement('div');
      ln.className = 'tick-line';
      ln.style.height = (isMajor?20:10) + 'px';
      tick.appendChild(ln);
      if (isMajor) {
        const lbl = document.createElement('div');
        lbl.className = 'tick-label';
        lbl.textContent = y < 0 ? '前' + (-y) : '' + y;
        tick.appendChild(lbl);
      }
      frag.appendChild(tick);
    }
    ticksEl.appendChild(frag);
  }

  // 事件
  const aboveEl = document.getElementById('japanEventsAbove');
  const belowEl = document.getElementById('japanEventsBelow');
  if (aboveEl) { aboveEl.innerHTML = ''; aboveEl.style.top = '0'; }
  if (belowEl) { belowEl.innerHTML = ''; belowEl.style.top = axisTop + 'px'; }

  JAPAN_EVENTS.forEach((evt, i) => {
    const x = yearToX(evt.year);
    const isAbove = i % 2 === 0;
    const container = isAbove ? aboveEl : belowEl;
    if (!container) return;
    const color = evtColor(evt.type);
    const node = document.createElement('div');
    node.className = 'event-node ' + (isAbove ? 'above' : 'below');
    node.style.cssText = 'left:' + x + 'px;' + (isAbove ? 'bottom:0;' : 'top:0;');
    const dot = document.createElement('div');
    dot.className = 'event-dot';
    dot.style.cssText = 'border-color:' + color + ';';
    const line = document.createElement('div');
    line.className = 'event-line';
    line.style.cssText = 'height:' + (30 + (i%5)*15) + 'px;background:' + color + ';';
    const label = document.createElement('div');
    label.className = 'event-label';
    label.textContent = evt.name;
    node.appendChild(dot);
    node.appendChild(line);
    node.appendChild(label);
    node.addEventListener('mouseenter', (e) => showWorldEventTooltip(evt, e));
    node.addEventListener('mouseleave', hideEventTooltip);
    node.addEventListener('mousemove', throttle(moveTooltip, 16));
    container.appendChild(node);
  });

  // 人物 - 使用与中国史相同的横条风格
  if (typeof JAPAN_PERSONS !== 'undefined') {
    const pAbove = document.getElementById('japanPersonsAbove');
    const pBelow = document.getElementById('japanPersonsBelow');
    if (pAbove) { pAbove.innerHTML = ''; pAbove.style.top = '0'; }
    if (pBelow) { pBelow.innerHTML = ''; pBelow.style.top = axisTop + 'px'; }

    const sorted = [...JAPAN_PERSONS].sort((a, b) => a.birth - b.birth);
    const abovePersons = sorted.filter((_, i) => i % 2 === 0);
    const belowPersons = sorted.filter((_, i) => i % 2 !== 0);

    layoutPersonRows(abovePersons, pAbove, axisTop, true, 'japan');
    layoutPersonRows(belowPersons, pBelow, axisTop, false, 'japan');
    adjustWrapperHeight('japanTimelineWrapper', JAPAN_PERSONS, axisTop);
  }
}
// ---- 朝鲜史时间轴 ----
function renderKoreaTimeline() {
  if (typeof KOREA_EVENTS === 'undefined') return;
  const wrapper = document.getElementById('koreaTimelineWrapper');
  if (!wrapper) return;
  const w = totalWidth();
  wrapper.style.width = w + 'px';
  const axisTop = getAxisTopFor('koreaBlock');

  const bandsEl = document.getElementById('koreaDynastyBands');
  bandsEl.innerHTML = '';
  const eras = [
    { name: '古朝鲜', start: -2697, end: -108, color: '#8B4513' },
    { name: '三国时代', start: -57, end: 668, color: '#6a0dad' },
    { name: '统一新罗', start: 668, end: 935, color: '#4a0080' },
    { name: '高丽王朝', start: 918, end: 1392, color: '#c0392b' },
    { name: '朝鲜王朝', start: 1392, end: 1910, color: '#2980b9' },
    { name: '近现代', start: 1910, end: 2025, color: '#27ae60' },
  ];
  eras.forEach(era => {
    const x1 = yearToX(era.start), x2 = yearToX(era.end);
    const band = document.createElement('div');
    band.className = 'dynasty-band';
    band.style.cssText = 'left:' + x1 + 'px;width:' + Math.max(x2-x1,2) + 'px;background:' + era.color + ';';
    bandsEl.appendChild(band);
    if (x2 - x1 > 40) {
      const label = document.createElement('div');
      label.className = 'dynasty-label';
      label.style.cssText = 'left:' + (x1+(x2-x1)/2) + 'px;transform:translateX(-50%);';
      label.textContent = era.name;
      bandsEl.appendChild(label);
    }
  });

  const axisEl = document.getElementById('koreaAxisLine');
  if (axisEl) axisEl.style.cssText = 'top:' + axisTop + 'px;left:0;width:' + w + 'px;';

  const ticksEl = document.getElementById('koreaAxisTicks');
  if (ticksEl) {
    ticksEl.innerHTML = '';
    const majorStep = pxPerYear < 0.3 ? 500 : pxPerYear < 0.8 ? 100 : 50;
    const minorStep = majorStep / 5;
    const frag = document.createDocumentFragment();
    for (let y = Math.ceil(YEAR_START / minorStep) * minorStep; y <= YEAR_END; y += minorStep) {
      const isMajor = y % majorStep === 0;
      const x = yearToX(y);
      const tick = document.createElement('div');
      tick.className = 'tick-mark' + (isMajor ? ' tick-major' : '');
      tick.style.cssText = 'left:' + x + 'px;top:' + (axisTop - (isMajor?10:5)) + 'px;';
      const ln = document.createElement('div');
      ln.className = 'tick-line'; ln.style.height = (isMajor?20:10) + 'px';
      tick.appendChild(ln);
      if (isMajor) {
        const lbl = document.createElement('div');
        lbl.className = 'tick-label';
        lbl.textContent = y < 0 ? '前' + (-y) : '' + y;
        tick.appendChild(lbl);
      }
      frag.appendChild(tick);
    }
    ticksEl.appendChild(frag);
  }

  // events
  const aboveEl = document.getElementById('koreaEventsAbove');
  const belowEl = document.getElementById('koreaEventsBelow');
  if (aboveEl) { aboveEl.innerHTML = ''; aboveEl.style.top = '0'; }
  if (belowEl) { belowEl.innerHTML = ''; belowEl.style.top = axisTop + 'px'; }
  KOREA_EVENTS.forEach((evt, i) => {
    const x = yearToX(evt.year), isAbove = i % 2 === 0;
    const container = isAbove ? aboveEl : belowEl;
    if (!container) return;
    const color = evtColor(evt.type);
    const node = document.createElement('div');
    node.className = 'event-node ' + (isAbove ? 'above' : 'below');
    node.style.cssText = 'left:' + x + 'px;' + (isAbove ? 'bottom:0;' : 'top:0;');
    const dot = document.createElement('div'); dot.className = 'event-dot'; dot.style.cssText = 'border-color:' + color + ';';
    const line = document.createElement('div'); line.className = 'event-line'; line.style.cssText = 'height:' + (30 + (i%5)*15) + 'px;background:' + color + ';';
    const label = document.createElement('div'); label.className = 'event-label'; label.textContent = evt.name;
    node.appendChild(dot); node.appendChild(line); node.appendChild(label);
    node.addEventListener('mouseenter', (e) => showWorldEventTooltip(evt, e));
    node.addEventListener('mouseleave', hideEventTooltip);
    node.addEventListener('mousemove', throttle(moveTooltip, 16));
    container.appendChild(node);
  });

  // persons
  if (typeof KOREA_PERSONS !== 'undefined') {
    const pAbove = document.getElementById('koreaPersonsAbove');
    const pBelow = document.getElementById('koreaPersonsBelow');
    if (pAbove) { pAbove.innerHTML = ''; pAbove.style.top = '0'; }
    if (pBelow) { pBelow.innerHTML = ''; pBelow.style.top = axisTop + 'px'; }
    const sorted = [...KOREA_PERSONS].sort((a, b) => a.birth - b.birth);
    layoutPersonRows(sorted.filter((_, i) => i % 2 === 0), pAbove, axisTop, true, 'korea');
    layoutPersonRows(sorted.filter((_, i) => i % 2 !== 0), pBelow, axisTop, false, 'korea');
    adjustWrapperHeight('koreaTimelineWrapper', KOREA_PERSONS, axisTop);
  }
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
  adjustWrapperHeight('timelineWrapper', PERSONS, axisTop);
}

function layoutPersonRows(persons, container, axisTop, isAbove, timelineType) {
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
    row.dataset.timeline = timelineType || 'china';
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
    row.addEventListener('click', () => showPersonDetail(p.id, timelineType || 'china'));

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
function showPersonDetail(personId, timelineType) {
  let dataSource;
  if (timelineType === 'japan') dataSource = JAPAN_PERSONS;
  else if (timelineType === 'world') dataSource = WORLD_PERSONS;
  else if (timelineType === 'korea') dataSource = KOREA_PERSONS;
  else dataSource = PERSONS;
  const p = dataSource.find(x => x.id === personId);
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
  renderTimeline();
  renderWorldTimeline();
  renderKoreaTimeline();
  renderJapanTimeline();
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
  renderTimeline();
  renderWorldTimeline();
  renderKoreaTimeline();
  renderJapanTimeline();
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

  // 重新渲染时间轴
  renderTimeline();
  renderWorldTimeline();
  renderKoreaTimeline();
  renderJapanTimeline();
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

// DISABLED: function renderGraph() {
// DISABLED:   const canvas = document.getElementById('graphCanvas');
// DISABLED:   const ctx = canvas.getContext('2d');
// DISABLED:   const w = canvas.parentElement.clientWidth;
// DISABLED:   const h = canvas.parentElement.clientHeight;
// DISABLED:   const dpr = window.devicePixelRatio || 1;
// DISABLED:   canvas.width = w * dpr;
// DISABLED:   canvas.height = h * dpr;
// DISABLED:   canvas.style.width = w + 'px';
// DISABLED:   canvas.style.height = h + 'px';
// DISABLED:   ctx.scale(dpr, dpr);
// DISABLED: 
// DISABLED:   // 初始化筛选控件
// DISABLED:   initGraphControls();
// DISABLED: 
// DISABLED:   // 获取筛选后的人物
// DISABLED:   let persons = [...PERSONS];
// DISABLED:   if (activeCat !== 'all') persons = persons.filter(p => p.cat === activeCat);
// DISABLED:   if (graphDynastyFilter !== 'all') persons = persons.filter(p => p.dynasty === graphDynastyFilter);
// DISABLED:   if (searchQuery) persons = persons.filter(p => p.name.includes(searchQuery) || (p.desc && p.desc.includes(searchQuery)));
// DISABLED: 
// DISABLED:   // 只保留有关系的人物（或独立节点也保留但较小）
// DISABLED:   const personIds = new Set(persons.map(p => p.id));
// DISABLED: 
// DISABLED:   // 按朝代分组
// DISABLED:   const dynastyGroups = {};
// DISABLED:   persons.forEach(p => {
// DISABLED:     const dynasty = p.dynasty || '未知';
// DISABLED:     if (!dynastyGroups[dynasty]) dynastyGroups[dynasty] = [];
// DISABLED:     dynastyGroups[dynasty].push(p);
// DISABLED:   });

  // 按朝代在 DYNASTIES 中的顺序排列
  // DISABLED: const dynastyOrder = DYNASTIES.map(d => d.name);
  // DISABLED: const orderedGroups = Object.keys(dynastyGroups).sort((a, b) => {
    // DISABLED: const ia = dynastyOrder.indexOf(a);
    // DISABLED: const ib = dynastyOrder.indexOf(b);
    // DISABLED: return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  // DISABLED: });

  // 计算每个朝代的布局区域
  // DISABLED: const groupCount = orderedGroups.length;
  // DISABLED: const cols = Math.ceil(Math.sqrt(groupCount * 1.5));
  // DISABLED: const rows = Math.ceil(groupCount / cols);
  // DISABLED: const cellW = (w - 80) / cols;
  // DISABLED: const cellH = (h - 80) / rows;

  // 初始化节点位置 - 按朝代分区
  // DISABLED: graphNodes = [];
  // DISABLED: const dynastyCenters = {};
  
  // DISABLED: orderedGroups.forEach((dynasty, gi) => {
    // DISABLED: const col = gi % cols;
    // DISABLED: const row = Math.floor(gi / cols);
    // DISABLED: const cx = 40 + col * cellW + cellW / 2;
    // DISABLED: const cy = 40 + row * cellH + cellH / 2;
    // DISABLED: dynastyCenters[dynasty] = { cx, cy };

    // DISABLED: const groupPersons = dynastyGroups[dynasty];
    // DISABLED: const perRow = Math.ceil(Math.sqrt(groupPersons.length * 1.5));
    
    // DISABLED: groupPersons.forEach((p, pi) => {
      // DISABLED: const pCol = pi % perRow;
      // DISABLED: const pRow = Math.floor(pi / perRow);
      // DISABLED: const spacing = Math.min(65, (cellW - 40) / perRow);
      // DISABLED: const vSpacing = Math.min(65, (cellH - 40) / Math.ceil(groupPersons.length / perRow));
      
      // DISABLED: graphNodes.push({
        // DISABLED: id: p.id,
        // DISABLED: x: cx + (pCol - perRow / 2) * spacing + (Math.random() - 0.5) * 10,
        // DISABLED: y: cy + (pRow - Math.ceil(groupPersons.length / perRow) / 2) * vSpacing + (Math.random() - 0.5) * 10,
        // DISABLED: vx: 0, vy: 0,
        // DISABLED: person: p,
        // DISABLED: dynasty: dynasty,
      // DISABLED: });
    // DISABLED: });
  // DISABLED: });

  // 构建边
  // DISABLED: graphEdges = [];
  // DISABLED: persons.forEach(p => {
    // DISABLED: (p.relations || []).forEach(r => {
      // DISABLED: const srcIdx = graphNodes.findIndex(n => n.id === p.id);
      // DISABLED: const tgtIdx = graphNodes.findIndex(n => n.id === r.id);
      // DISABLED: if (srcIdx !== -1 && tgtIdx !== -1) {
        // DISABLED: graphEdges.push({
          // DISABLED: src: srcIdx,
          // DISABLED: tgt: tgtIdx,
          // DISABLED: type: r.type,
          // DISABLED: label: r.label,
          // DISABLED: category: getRelCategory(r.type),
        // DISABLED: });
      // DISABLED: }
    // DISABLED: });
  // DISABLED: });

  // 关系类型筛选
  // DISABLED: if (graphRelTypeFilter !== 'all') {
    // DISABLED: graphEdges = graphEdges.filter(e => e.category === graphRelTypeFilter);
  // DISABLED: }

  // 力导向模拟（轻量级，从分区初始位置出发）
  // DISABLED: if (graphAnim) cancelAnimationFrame(graphAnim);
  // DISABLED: let tick = 0;

  // DISABLED: function step() {
    // DISABLED: const k = 80;
    // DISABLED: const repulsion = 2000;
    // DISABLED: const damping = 0.85;
    // DISABLED: const intraGroupGravity = 0.01; // 同组引力
    // DISABLED: const interGroupRepulsion = 5000; // 跨组斥力

    // DISABLED: graphNodes.forEach(n => { n.vx = 0; n.vy = 0; });

    // 斥力 - 同组节点间
    // DISABLED: for (let i = 0; i < graphNodes.length; i++) {
      // DISABLED: for (let j = i + 1; j < graphNodes.length; j++) {
        // DISABLED: const ni = graphNodes[i], nj = graphNodes[j];
        // DISABLED: let dx = ni.x - nj.x, dy = ni.y - nj.y;
        // DISABLED: const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        
        // 跨朝代的斥力更大
        // DISABLED: const force = ni.dynasty !== nj.dynasty ? interGroupRepulsion : repulsion;
        // DISABLED: const f = force / (dist * dist);
        // DISABLED: ni.vx += (dx / dist) * f;
        // DISABLED: ni.vy += (dy / dist) * f;
        // DISABLED: nj.vx -= (dx / dist) * f;
        // DISABLED: nj.vy -= (dy / dist) * f;
      // DISABLED: }
    // DISABLED: }

    // 引力（边）- 同朝代内的边引力更强
    // DISABLED: graphEdges.forEach(e => {
      // DISABLED: const a = graphNodes[e.src], b = graphNodes[e.tgt];
      // DISABLED: if (!a || !b) return;
      // DISABLED: let dx = b.x - a.x, dy = b.y - a.y;
      // DISABLED: const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      // DISABLED: const strength = a.dynasty === b.dynasty ? 0.08 : 0.02; // 同组更强引力
      // DISABLED: const force = (dist - k) * strength;
      // DISABLED: a.vx += (dx / dist) * force;
      // DISABLED: a.vy += (dy / dist) * force;
      // DISABLED: b.vx -= (dx / dist) * force;
      // DISABLED: b.vy -= (dy / dist) * force;
    // DISABLED: });

    // 朝代中心引力 - 保持节点在分区附近
    // DISABLED: graphNodes.forEach(n => {
      // DISABLED: const center = dynastyCenters[n.dynasty];
      // DISABLED: if (center) {
        // DISABLED: n.vx += (center.cx - n.x) * intraGroupGravity;
        // DISABLED: n.vy += (center.cy - n.y) * intraGroupGravity;
      // DISABLED: }
    // DISABLED: });

    // 全局中心引力（弱）
    // DISABLED: graphNodes.forEach(n => {
      // DISABLED: n.vx += (w / 2 - n.x) * 0.0005;
      // DISABLED: n.vy += (h / 2 - n.y) * 0.0005;
      // DISABLED: n.vx *= damping;
      // DISABLED: n.vy *= damping;
      // DISABLED: n.x = Math.max(40, Math.min(w - 40, n.x + n.vx));
      // DISABLED: n.y = Math.max(40, Math.min(h - 40, n.y + n.vy));
    // DISABLED: });

    // DISABLED: drawGraphFrame(ctx, w, h);

    // DISABLED: tick++;
    // DISABLED: if (tick < 120) graphAnim = requestAnimationFrame(step);
    // DISABLED: else graphAnim = requestAnimationFrame(() => drawGraphFrame(ctx, w, h));
  // DISABLED: }

  // DISABLED: step();
  // DISABLED: initGraphInteraction();

// 绘制关系图单帧

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
// ---- 板块切换 ----
function switchSection(sectionId) {
  document.querySelectorAll('.main-section').forEach(s => s.style.display = 'none');
  document.getElementById(sectionId).style.display = '';
  document.querySelectorAll('.btn-section').forEach(b => b.classList.remove('active'));
  document.querySelector(`.btn-section[data-section="${sectionId}"]`).classList.add('active');

  if (sectionId === 'timelineSection') { renderTimeline(); }
  if (sectionId === 'worldSection') { renderWorldTimeline(); }
  if (sectionId === 'eventSection') { /* 事件详情由点击触发 */ }
  if (sectionId === 'relationSection') { renderPersonRelations(); }
}

// 标签页已移除，无需绑定

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
  const view = document.getElementById('dualTimelineContainer');
  const rect = view.getBoundingClientRect();
  const mouseX = e.clientX - rect.left + view.scrollLeft;
  const yearAtMouse = YEAR_START + mouseX / pxPerYear;
  pxPerYear = Math.min(Math.max(pxPerYear * factor, 0.1), 8);
  renderTimeline();
  const newX = (yearAtMouse - YEAR_START) * pxPerYear - (e.clientX - rect.left);
  view.scrollLeft = Math.max(0, newX);
  updateStats();
}, 50);

document.getElementById('dualTimelineContainer').addEventListener('wheel', (e) => {
  e.preventDefault();
  throttledWheel(e);
}, { passive: false });

// ---- 拖拽滚动 ----
const container = document.getElementById('dualTimelineContainer');
container.addEventListener('mousedown', (e) => {
  if (e.target.closest('.person-row, .event-node, .zoom-controls')) return;
  isDragging = true;
  dragStartX = e.clientX;
  dragScrollX = container.scrollLeft;
  container.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  container.scrollLeft = dragScrollX - (e.clientX - dragStartX);
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
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
  if (document.activeElement === document.getElementById('searchInput')) {
    if (e.key === 'Escape') {
      document.getElementById('searchInput').blur();
      document.getElementById('searchInput').value = '';
      searchQuery = '';
      clearHighlight();
    }
    return;
  }
  if (e.key === '/') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});

function showWorldEventTooltip(evt, e) {
  const tip = document.getElementById('eventTooltip');
  if (!tip) return;
  const yearStr = evt.year < 0 ? '前' + (-evt.year) + '年' : '' + evt.year + '年';
  tip.innerHTML =
    '<div class="tooltip-title">🌍 ' + evt.name + '</div>' +
    '<div class="tooltip-year" style="color:' + evtColor(evt.type) + '">' + yearStr + '</div>' +
    '<div class="tooltip-desc">' + evt.desc + '</div>';
  tip.classList.remove('hidden');
  moveTooltip(e);
}


// =============================================
// 板块3：事件详情
// =============================================
function initTimelineClick() {
  // 给时间轴上的中国史事件添加点击，用 tooltip 显示详情
  document.querySelectorAll('.event-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      const eventId = dot.dataset.eventId;
      if (!eventId) return;
      const ev = EVENTS.find(e => e.id === eventId);
      if (!ev) return;
      showEventDetailTooltip(ev, e);
    });
  });
}

function showEventDetailTooltip(ev, e) {
  const tip = document.getElementById('eventTooltip');
  if (!tip) return;
  const yearStr = ev.year < 0 ? `前${-ev.year}年` : `${ev.year}年`;
  const worldSame = (typeof WORLD_EVENTS !== 'undefined') ? WORLD_EVENTS.filter(w => Math.abs(w.year - ev.year) < 50) : [];
  tip.innerHTML = `
    <div class="tooltip-title">📅 ${ev.name}</div>
    <div class="tooltip-year">${yearStr}</div>
    <div class="tooltip-desc">${ev.desc}</div>
    ${worldSame.length > 0 ? `<div style="margin-top:8px;color:#2ecc71;font-weight:600;">🌍 同期世界史</div>` + worldSame.map(w => `<div style="font-size:12px;color:#aaf;margin:2px 0;">${w.year < 0 ? '前'+(-w.year) : w.year}年 · ${w.name}</div>`).join('') : ''}
  `;
  tip.classList.remove('hidden');
  moveTooltip(e);
  // 5秒后自动隐藏
  clearTimeout(showEventDetailTooltip._timer);
  showEventDetailTooltip._timer = setTimeout(() => tip.classList.add('hidden'), 8000);
}

// =============================================
// 板块4：人物关系横向标注
// =============================================
function renderPersonRelations() {
  const container = document.getElementById('relationContentView');
  if (!container) return;

  // 取当前筛选下的人物
  const filtered = PERSONS.filter(p => {
    if (activeCat !== 'all' && p.cat !== activeCat) return false;
    return p.relations && p.relations.length > 0;
  }).slice(0, 50);

  let html = '<div style="padding:16px;">';
  filtered.forEach(p => {
    if (!p.relations || p.relations.length === 0) return;
    p.relations.forEach(rel => {
      const target = PERSONS.find(o => o.id === rel.id);
      if (!target) return;
      html += `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #2a2a3e;">
          <span style="font-size:20px;">${p.emoji || '👤'}</span>
          <span style="color:#f39c12;font-weight:600;">${p.name}</span>
          <span style="color:#7f8c8d;font-size:13px;">${rel.type}</span>
          <span style="color:#2ecc71;">→</span>
          <span style="font-size:20px;">${target.emoji || '👤'}</span>
          <span style="color:#ddd;">${target.name}</span>
          <span style="color:#7f8c8d;font-size:12px;">${rel.label || ''}</span>
        </div>`;
    });
  });
  html += '</div>';
  if (filtered.length === 0) {
    html = '<p style="color:#666;padding:40px;text-align:center;">暂无人物关系数据，请在筛选中选择类别</p>';
  }
  container.innerHTML = html;
}

// 在 renderTimeline 后调用 initTimelineClick
const _origRenderTimeline = renderTimeline;
renderTimeline = function() {
  _origRenderTimeline();
  setTimeout(initTimelineClick, 200);
};
