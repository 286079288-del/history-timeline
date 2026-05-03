import re
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js','r',encoding='utf-8') as f:
    content = f.read()
# 找所有dynasty为明的条目id
ming_ids = re.findall(r"dynasty:\s*['\"]明['\"],\s*\n\s*id:\s*['\"]([^'\"]+)['\"]", content)
print(f'明朝人物数量: {len(ming_ids)}')
# 检查重复
dups = [x for x in ming_ids if ming_ids.count(x) > 1]
if dups:
    print(f'重复ID: {set(dups)}')
else:
    print('无重复ID')
print(f'文件总行数: {content.count(chr(10))}')
# 简单语法检查 - 括号匹配
opens = content.count('{')
closes = content.count('}')
print(f'括号匹配: {opens}个开, {closes}个闭, 差={opens-closes}')
