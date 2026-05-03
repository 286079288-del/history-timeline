import re

with open('main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 替换 getAxisTop 函数定义
old_fn = '''function getAxisTop() {
  const h = document.getElementById('mainContainer').clientHeight;
  return Math.round(h * AXIS_TOP_RATIO);
}'''

new_fn = '''function getAxisTopFor(blockId) {
  const block = document.getElementById(blockId || 'chinaBlock');
  const h = block ? block.clientHeight - 36 : 400;
  return Math.round(h * AXIS_TOP_RATIO);
}'''

if old_fn in content:
    content = content.replace(old_fn, new_fn, 1)
    print('  replaced getAxisTop definition')
else:
    print('  WARNING: getAxisTop definition not found')

# 2. renderTimeline 里调用 getAxisTopFor('chinaBlock')
content = content.replace(
    "const axisTop = getAxisTop();",
    "const axisTop = getAxisTopFor('chinaBlock');",
    1
)
print('  fixed renderTimeline axisTop')

# 3. renderJapanTimeline 里替换 axisTop 计算
old_japan = '''  const block = document.getElementById('japanBlock');
  const blockH = block ? block.clientHeight - 36 : 200;
  const axisTop = Math.floor(blockH * 0.5);'''
new_japan = '''  const axisTop = getAxisTopFor('japanBlock');'''
if old_japan in content:
    content = content.replace(old_japan, new_japan, 1)
    print('  fixed renderJapanTimeline axisTop')
else:
    print('  WARNING: renderJapanTimeline axisTop block not found')

# 4. renderWorldTimeline 里替换 axisTop 计算
old_world = '''  const block = document.getElementById('worldBlock');
  const blockH = block ? block.clientHeight - 36 : 200;
  const axisTop = Math.floor(blockH * 0.5);'''
new_world = '''  const axisTop = getAxisTopFor('worldBlock');'''
if old_world in content:
    content = content.replace(old_world, new_world, 1)
    print('  fixed renderWorldTimeline axisTop')
else:
    print('  WARNING: renderWorldTimeline axisTop block not found')

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('fix_axistop done')
