import re

with open('main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# 1. 通用化 renderDynastyBands
#    原来：function renderDynastyBands(axisTop, totalW) -> 只用 totalW，没用 axisTop
#    改成：支持可选参数 dynestyData / containerId
# ============================================================
old = '''function renderDynastyBands(axisTop, totalW) {
  const container = document.getElementById('dynastyBands');
  container.innerHTML = '';
  const h = document.getElementById('mainContainer').clientHeight;'''

new = '''function renderDynastyBandsGeneric(containerId, dynastiesData, totalW) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const data = dynastiesData || DYNASTIES;'''

if old in content:
    content = content.replace(old, new, 1)
    print('  replaced renderDynastyBands -> renderDynastyBandsGeneric')
else:
    print('  WARNING: renderDynastyBands pattern not found')

# ============================================================
# 2. 通用化 renderAxisLine
# ============================================================
old = '''function renderAxisLine(axisTop, totalW) {
  const el = document.getElementById('axisLine');
  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px;`;
}'''

new = '''function renderAxisLineGeneric(axisLineId, axisTop, totalW) {
  const el = document.getElementById(axisLineId);
  if (!el) return;
  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px;`;
}'''

if old in content:
    content = content.replace(old, new, 1)
    print('  replaced renderAxisLine -> renderAxisLineGeneric')
else:
    print('  WARNING: renderAxisLine pattern not found')

# ============================================================
# 3. 通用化 renderTicks
# ============================================================
old = '''function renderTicks(axisTop, totalW) {
  const container = document.getElementById('axisTicks');
  container.innerHTML = '';'''

new = '''function renderTicksGeneric(ticksContainerId, axisTop, totalW) {
  const container = document.getElementById(ticksContainerId);
  if (!container) return;
  container.innerHTML = '';'''

if old in content:
    content = content.replace(old, new, 1)
    print('  replaced renderTicks -> renderTicksGeneric')
else:
    print('  WARNING: renderTicks pattern not found')

# ============================================================
# 4. 通用化 renderEvents
# ============================================================
old = '''function renderEvents(axisTop) {
  const above = document.getElementById('eventsAbove');
  const below = document.getElementById('eventsBelow');
  above.innerHTML = '';
  below.innerHTML = '';
  above.style.top = '0';
  below.style.top = axisTop + 'px';'''

new = '''function renderEventsGeneric(eventsData, axisTop, aboveId, belowId, tooltipFn) {
  const above = document.getElementById(aboveId);
  const below = document.getElementById(belowId);
  if (!above || !below) return;
  above.innerHTML = '';
  below.innerHTML = '';
  above.style.top = '0';
  below.style.top = axisTop + 'px';
  const data = eventsData || EVENTS;
  const tipFn = tooltipFn || showEventTooltip;'''

if old in content:
    content = content.replace(old, new, 1)
    print('  replaced renderEvents -> renderEventsGeneric')
else:
    print('  WARNING: renderEvents pattern not found')

# ============================================================
# 5. 在 renderEventsGeneric 里，把 EVENTS 引用替换成 data
# ============================================================
# 替换 forEach 里的 EVENTS 引用
content = content.replace(
    '  EVENTS.forEach((evt, i) => {',
    '  data.forEach((evt, i) => {',
)
content = content.replace(
    '    if (EVENTS[childIdx] && childIdx % 2 === 0) {',
    '    if (data[childIdx] && childIdx % 2 === 0) {',
)
content = content.replace(
    '  EVENTS.forEach((evt, i) => {',
    '  data.forEach((evt, i) => {',
)
# 替换 showEventTooltip 调用
content = content.replace(
    '(e) => showEventTooltip(evt, e)',
    '(e) => tipFn(evt, e)',
)

# ============================================================
# 6. 通用化 renderPersons / layoutPersonRows
# ============================================================
old = '''function renderPersons(axisTop) {
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
}'''

new = '''function renderPersonsGeneric(personsData, axisTop, aboveId, belowId, timelineType) {
  const above = document.getElementById(aboveId);
  const below = document.getElementById(belowId);
  if (!above || !below) return;
  above.innerHTML = '';
  below.innerHTML = '';
  above.style.top = '0';
  below.style.top = axisTop + 'px';

  const data = personsData || PERSONS;
  const sortedPersons = [...data].sort((a, b) => a.birth - b.birth);
  const abovePersons = sortedPersons.filter((_, i) => i % 2 === 0);
  const belowPersons = sortedPersons.filter((_, i) => i % 2 !== 0);

  layoutPersonRows(abovePersons, above, axisTop, true, timelineType);
  layoutPersonRows(belowPersons, below, axisTop, false, timelineType);
}'''

if old in content:
    content = content.replace(old, new, 1)
    print('  replaced renderPersons -> renderPersonsGeneric')
else:
    print('  WARNING: renderPersons pattern not found')

# ============================================================
# 7. 修改 layoutPersonRows 支持 timelineType 参数
# ============================================================
old = '''function layoutPersonRows(persons, container, axisTop, isAbove) {'''
new = '''function layoutPersonRows(persons, container, axisTop, isAbove, timelineType) {'''

if old in content:
    content = content.replace(old, new, 1)
    print('  updated layoutPersonRows signature')
else:
    print('  WARNING: layoutPersonRows signature not found')

# 在 layoutPersonRows 里，给 row 加上 data-timeline 属性
# 找到 row.dataset.personId = p.id; 这一行，在后面加一行
old_row = '    row.dataset.personId = p.id;'
new_row = '    row.dataset.personId = p.id;\n    row.dataset.timeline = timelineType || "china";'
content = content.replace(old_row, new_row, 1)

# 修改点击事件，传 timelineType
old_click = '''    row.addEventListener('click', () => showPersonDetail(p.id));'''
new_click = '''    row.addEventListener('click', () => showPersonDetail(p.id, timelineType || "china"));'''
content = content.replace(old_click, new_click)

# ============================================================
# 8. 修改 showPersonDetail 支持 timelineType
# ============================================================
old_show = '''function showPersonDetail(personId) {
  const p = PERSONS.find(x => x.id === personId);
  if (!p) return;
  selectedPersonId = personId;'''
new_show = '''function showPersonDetail(personId, timelineType) {
  let personsData;
  if (timelineType === "japan") personsData = JAPAN_PERSONS;
  else if (timelineType === "world") personsData = WORLD_PERSONS;
  else personsData = PERSONS;
  const p = personsData.find(x => x.id === personId);
  if (!p) return;
  selectedPersonId = personId;'''
content = content.replace(old_show, new_show, 1)
print('  updated showPersonDetail signature')

# 在 showPersonDetail 里，查找关联人物时也要用对应的数据源
# 找到 const related = PERSONS.find(...) 这行，替换成跨数据源查找
old_rel = '      const related = PERSONS.find(x => x.id === r.id);'
new_rel = '''      const related = (personsData || PERSONS).find(x => x.id === r.id) ||
                       PERSONS.find(x => x.id === r.id) ||
                       (typeof JAPAN_PERSONS !== "undefined" && JAPAN_PERSONS.find(x => x.id === r.id)) ||
                       (typeof WORLD_PERSONS !== "undefined" && WORLD_PERSONS.find(x => x.id === r.id));'''
content = content.replace(old_rel, new_rel)

# ============================================================
# 9. 修改 renderTimeline 调用通用函数（保持向后兼容）
# ============================================================
# renderTimeline 里现在调用的是旧函数名，需要改成调用通用函数
# 先读取 renderTimeline 的内容，然后替换

old_rt = '''function renderTimeline() {
  const wrapper = document.getElementById('timelineWrapper');
  const axisTop = getAxisTopFor('chinaBlock');
  const w = totalWidth();
  wrapper.style.width = w + 'px';

  renderDynastyBands(axisTop, w);
  renderAxisLine(axisTop, w);
  renderTicks(axisTop, w);
  renderEvents(axisTop);
  renderPersons(axisTop);
}'''

new_rt = '''function renderTimeline() {
  const wrapper = document.getElementById('timelineWrapper');
  const axisTop = getAxisTopFor('chinaBlock');
  const w = totalWidth();
  wrapper.style.width = w + 'px';

  renderDynastyBandsGeneric('dynastyBands', DYNASTIES, w);
  renderAxisLineGeneric('axisLine', axisTop, w);
  renderTicksGeneric('axisTicks', axisTop, w);
  renderEventsGeneric(EVENTS, axisTop, 'eventsAbove', 'eventsBelow', showEventTooltip);
  renderPersonsGeneric(PERSONS, axisTop, 'personsAbove', 'personsBelow', 'china');
}'''

if old_rt in content:
    content = content.replace(old_rt, new_rt, 1)
    print('  updated renderTimeline to use generic functions')
else:
    print('  WARNING: renderTimeline pattern not found, trying fallback')
    # 可能已经有修改，尝试直接替换函数调用
    content = content.replace('  renderDynastyBands(axisTop, w);', '  renderDynastyBandsGeneric("dynastyBands", DYNASTIES, w);')
    content = content.replace('  renderAxisLine(axisTop, w);', '  renderAxisLineGeneric("axisLine", axisTop, w);')
    content = content.replace('  renderTicks(axisTop, w);', '  renderTicksGeneric("axisTicks", axisTop, w);')
    content = content.replace('  renderEvents(axisTop);', '  renderEventsGeneric(EVENTS, axisTop, "eventsAbove", "eventsBelow", showEventTooltip);')
    content = content.replace('  renderPersons(axisTop);', '  renderPersonsGeneric(PERSONS, axisTop, "personsAbove", "personsBelow", "china");')
    print('  fallback: replaced individual calls in renderTimeline')

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('main.js generic refactor done')
