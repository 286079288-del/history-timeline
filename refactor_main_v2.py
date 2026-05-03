import re

with open('main.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

content = ''.join(lines)

# ============================================================
# 1. 替换 renderWorldTimeline 中的人物渲染部分
#    找到 "  // 人物" 到下一个 "  }" (函数结束)
# ============================================================
# 用正则找到人物渲染块的开始和结束
pattern_world = r'(  // 人物\n  if \(typeof WORLD_PERSONS !== \'undefined\'\) \{).*?(?=\n\})'

# 更实际的做法：找到 "  // 人物" 的行号，然后找到对应的结束 "  }"
# 在 Python 中处理
lines = content.split('\n')
in_world_person = False
world_start = -1
world_end = -1
brace_count = 0

for i, line in enumerate(lines):
    if '  // 人物' in line and i > 300 and i < 500:  # renderWorldTimeline 在 317-451 行
        # 检查上一行是否是事件渲染的结束
        in_world_person = True
        world_start = i
        brace_count = 0
    
    if in_world_person:
        brace_count += line.count('{') - line.count('}')
        if brace_count <= 0 and i > world_start + 5:
            world_end = i
            break

print(f'World person block: start={world_start}, end={world_end}')
if world_start >= 0 and world_end >= 0:
    # 构造新的代码
    new_world_person = '''  // 人物 - 使用与中国史相同的横条风格
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
  }'''
    
    # 替换
    lines[world_start:world_end+1] = [new_world_person]
    content = '\n'.join(lines)
    print('  replaced world person block')
else:
    print('  ERROR: could not find world person block')

# ============================================================
# 2. 通用化 renderDynastyBands / renderAxisLine / renderTicks
#    让它们支持传入容器 ID（不传则使用默认）
# ============================================================
# 先恢复成字符串处理
if True:
    # 通用化 renderDynastyBands
    old = "function renderDynastyBands(axisTop, totalW) {\n  const container = document.getElementById('dynastyBands');\n  container.innerHTML = '';\n  const h = document.getElementById('mainContainer').clientHeight;"
    new = "function renderDynastyBandsGeneric(containerId, dynastiesData, totalW) {\n  const container = document.getElementById(containerId);\n  if (!container) return;\n  container.innerHTML = '';\n  const data = dynastiesData || DYNASTIES;"
    if old in content:
        content = content.replace(old, new, 1)
        print('  generic renderDynastyBands')
    else:
        print('  WARN: renderDynastyBands pattern not found')
    
    # 通用化 renderAxisLine
    old = "function renderAxisLine(axisTop, totalW) {\n  const el = document.getElementById('axisLine');\n  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px`;"
    new = "function renderAxisLineGeneric(axisLineId, axisTop, totalW) {\n  const el = document.getElementById(axisLineId);\n  if (!el) return;\n  el.style.cssText = `top:${axisTop}px;left:0;width:${totalW}px`;"
    if old in content:
        content = content.replace(old, new, 1)
        print('  generic renderAxisLine')
    else:
        print('  WARN: renderAxisLine pattern not found')
    
    # 通用化 renderTicks
    old = "function renderTicks(axisTop, totalW) {\n  const container = document.getElementById('axisTicks');\n  container.innerHTML = '';"
    new = "function renderTicksGeneric(ticksContainerId, axisTop, totalW) {\n  const container = document.getElementById(ticksContainerId);\n  if (!container) return;\n  container.innerHTML = '';"
    if old in content:
        content = content.replace(old, new, 1)
        print('  generic renderTicks')
    else:
        print('  WARN: renderTicks pattern not found')

# ============================================================
# 3. 通用化 renderEvents
# ============================================================
old = "function renderEvents(axisTop) {\n  const above = document.getElementById('eventsAbove');\n  const below = document.getElementById('eventsBelow');\n  above.innerHTML = '';\n  below.innerHTML = '';\n  above.style.top = '0';\n  below.style.top = axisTop + 'px';"
new = "function renderEventsGeneric(eventsData, axisTop, aboveId, belowId, tooltipFn) {\n  const above = document.getElementById(aboveId);\n  const below = document.getElementById(belowId);\n  if (!above || !below) return;\n  above.innerHTML = '';\n  below.innerHTML = '';\n  above.style.top = '0';\n  below.style.top = axisTop + 'px';\n  const data = eventsData || EVENTS;\n  const tipFn = tooltipFn || showEventTooltip;"
if old in content:
    content = content.replace(old, new, 1)
    print('  generic renderEvents')
    # 还需要把函数内的 EVENTS 替换成 data, showEventTooltip 替换成 tipFn
    # 先写文件，然后再处理
else:
    print('  WARN: renderEvents pattern not found')

# 写回文件
with open('main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('refactor step 1 done, now fix references...')

# 第二步：修复 renderEventsGeneric 内部的引用
with open('main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 在 renderEventsGeneric 内部，把 EVENTS 替换成 data
# 用正则替换函数体内的 EVENTS（只在函数内）
# 简单做法：找到 renderEventsGeneric 的位置，然后替换其后的 EVENTS
import re
# 只替换第一个 EVENTS.forEach（在 renderEventsGeneric 内）
content = re.sub(
    r'(function renderEventsGeneric[^{]*\{)(.*?)EVENTS\.forEach',
    r'\1\2data.forEach',
    content,
    flags=re.DOTALL
)
# 替换 showEventTooltip 调用
content = re.sub(
    r'(function renderEventsGeneric[^{]*\{)(.*?)showEventTooltip\(',
    r'\1\2tipFn(',
    content,
    flags=re.DOTALL
)

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('refactor step 2 done')
