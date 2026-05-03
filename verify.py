import re
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

ming_persons = len(re.findall(r"dynasty:\s*'明'", content))
print(f'明朝人物总数: {ming_persons}')
print(f'文件总行数: {content.count(chr(10))}')
print(f'文件大小: {len(content)//1024} KB')

# 检查是否有语法错误（括号匹配）
opens = content.count('{')
closes = content.count('}')
print(f'括号匹配: {{ = {opens}, }} = {closes}, diff = {opens-closes}')

# 检查是否有重复ID
ids = re.findall(r"id:\s*'([^']+)'", content)
print(f'总ID数: {len(ids)}, 唯一ID数: {len(set(ids))}')
dups = [i for i in ids if ids.count(i) > 1]
if dups:
    print(f'重复ID: {set(dups)}')
