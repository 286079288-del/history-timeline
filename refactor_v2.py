import sys

with open('main.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# ---- 1. 替换 renderWorldTimeline 的人物部分（行 417-450，索引 416-449） ----
# 新代码（注意缩进：每行前面有 2 个空格，因为函数在函数体内）
new_world_person = """  // 人物 - 使用与中国史相同的横条风格
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
  }
"""

# 替换行 416 到 449（含）
lines[416:450] = [new_world_person]

print(f'Replaced world person block (lines 417-450)')

# ---- 2. 找到 renderJapanTimeline 的人物部分 ----
# 先找到函数起始行
japan_start = -1
for i, line in enumerate(lines):
    if 'function renderJapanTimeline()' in line:
        japan_start = i
        break

if japan_start < 0:
    print('ERROR: renderJapanTimeline not found!')
    sys.exit(1)

# 在 japan_start 之后找到 '  // 人物' 的行
person_start = -1
brace_balance = 0
for i in range(japan_start, len(lines)):
    if '  // 人物' in lines[i]:
        # 确认这是人物渲染部分的开始（后面有 JAPAN_PERSONS.forEach）
        # 找到对应的结束大括号
        person_start = i
        # 从这一行开始找匹配的右大括号
        temp_balance = 0
        for j in range(i, min(i+100, len(lines))):
            temp_balance += lines[j].count('{') - lines[j].count('}')
            if temp_balance <= 0 and j > i + 5:
                person_end = j  # 这一行是 '  }'
                break
        break

print(f'Japan person block: start={person_start+1}, end={person_end+1}')
if person_start >= 0:
    new_japan_person = """  // 人物 - 使用与中国史相同的横条风格
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
  }
"""
    lines[person_start:person_end+1] = [new_japan_person]
    print(f'Replaced japan person block (lines {person_start+1}-{person_end+1})')
else:
    print('WARN: japan person block not found, trying fallback...')
    # 回退：直接搜索 'JAPAN_PERSONS.forEach' 并替换整块

# ---- 3. 通用化 renderDynastyBands / renderAxisLine / renderTicks / renderEvents ----
# 把这些函数改成支持参数的通用版本
content = ''.join(lines)

# 3.1 renderDynastyBands -> renderDynastyBandsGeneric
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
    print('  generic renderDynastyBands')
else:
    print('  WARN: renderDynastyBands pattern not found')

# 3.2 renderAxisLine -> renderAxisLineGeneric
old = '''function renderAxisLine(axisTop, totalW) {
  const el = document.getElementById('axisLine');
  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px`;
}'''
new = '''function renderAxisLineGeneric(axisLineId, axisTop, totalW) {
  const el = document.getElementById(axisLineId);
  if (!el) return;
  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px`;
}'''
if old in content:
    content = content.replace(old, new, 1)
    print('  generic renderAxisLine')
else:
    print('  WARN: renderAxisLine pattern not found')

# 3.3 renderTicks -> renderTicksGeneric
old = '''function renderTicks(axisTop, totalW) {
  const container = document.getElementById('axisTicks');
  container.innerHTML = '';'''
new = '''function renderTicksGeneric(ticksContainerId, axisTop, totalW) {
  const container = document.getElementById(ticksContainerId);
  if (!container) return;
  container.innerHTML = '';'''
if old in content:
    content = content.replace(old, new, 1)
    print('  generic renderTicks')
else:
    print('  WARN: renderTicks pattern not found')

# 3.4 renderEvents -> renderEventsGeneric
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
    print('  generic renderEvents')
    # 替换函数体内的 EVENTS 引用
    # 只替换第一个 forEach 块内的 EVENTS
    content = content.replace('  EVENTS.forEach((evt, i) => {', '  data.forEach((evt, i) => {', 1)
    content = content.replace('    if (EVENTS[childIdx] && childIdx % 2 === 0) {', '    if (data[childIdx] && childIdx % 2 === 0) {', 1)
    content = content.replace('  EVENTS.forEach((evt, i) => {', '  data.forEach((evt, i) => {', 1)
    content = content.replace('(e) => showEventTooltip(evt, e)', '(e) => tipFn(evt, e)')
    print('  fixed EVENTS refs in renderEventsGeneric')
else:
    print('  WARN: renderEvents pattern not found')

# 3.5 renderPersons -> renderPersonsGeneric
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

  layoutPersonRows(abovePersons, above, axisTop, true, timelineType || 'china');
  layoutPersonRows(belowPersons, below, axisTop, false, timelineType || 'china');
}'''
if old in content:
    content = content.replace(old, new, 1)
    print('  generic renderPersons')
else:
    print('  WARN: renderPersons pattern not found')

# 3.6 更新 renderTimeline 调用通用函数
old = '''function renderTimeline() {
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
new = '''function renderTimeline() {
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
if old in content:
    content = content.replace(old, new, 1)
    print('  updated renderTimeline')
else:
    print('  WARN: renderTimeline pattern not found, trying to find it...')
    # 可能已经有部分修改，用正则
    import re
    # 匹配 renderTimeline 函数体
    pat = r'function renderTimeline\(\) \{[^]*?renderPersons\(axisTop\);\s*\}'
    repl = '''function renderTimeline() {
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
    new_content = re.sub(pat, repl, content, flags=re.DOTALL)
    if new_content != content:
        content = new_content
        print('  updated renderTimeline via regex')
    else:
        print('  ERROR: could not update renderTimeline')

# 写回文件
with open('main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('All refactor done, checking syntax...')

# 简单检查：统计大括号平衡
open_c = content.count('{')
close_c = content.count('}')
print(f'Brace check: open={open_c}, close={close_c}, diff={open_c-close_c}')
