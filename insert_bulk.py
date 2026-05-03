#!/usr/bin/env python3
"""批量插入扩充数据到 data.js - 安全版"""
import re, shutil

DATA_JS = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'
BULK = r'C:\Users\Admin\WorkBuddy\history-timeline\bulk_data.txt'
shutil.copy(DATA_JS, DATA_JS + '.bak4')
print('备份完成')

with open(BULK, 'r', encoding='utf-8') as f:
    raw = f.read()

with open(DATA_JS, 'r', encoding='utf-8') as f:
    text = f.read()

# 解析各段
sections = {}
current = None
lines = []
for line in raw.split('\n'):
    if line.startswith('### '):
        if current:
            content = '\n'.join(lines).strip()
            # 过滤掉已删除的占位条目
            content = re.sub(r'\s*\{[^}]*已删除[^}]*\},?', '', content)
            sections[current] = content
        current = line[4:].strip()
        lines = []
    else:
        lines.append(line)
if current:
    content = '\n'.join(lines).strip()
    content = re.sub(r'\s*\{[^}]*已删除[^}]*\},?', '', content)
    sections[current] = content

for k, v in sections.items():
    # count id
    n = v.count("id: '")
    print(f'  {k}: {n} 条目')

def insert_before_closing(text, start_marker, end_marker, data, label):
    s = text.find(start_marker)
    if s < 0: print(f'  ERROR: {start_marker}'); return text
    e = text.find(end_marker, s+1)
    if e < 0: e = len(text)
    snippet = text[s:e]
    pos = snippet.rfind('];')
    if pos < 0: print(f'  ERROR: ]; not found'); return text
    insert_at = s + pos
    result = text[:insert_at] + '\n' + data + '\n' + text[insert_at:]
    print(f'  {label} 插入成功')
    return result

# 从后往前插（使用正确的键名）
text = insert_before_closing(text, 'const JAPAN_EVENTS = [', 'ZZZ', 
    sections.get('日本新增事件 (56条) - 按时代排列', ''), '日本事件')
text = insert_before_closing(text, 'const JAPAN_PERSONS = [', 'const JAPAN_EVENTS', 
    sections.get('日本新增人物 (70人) - 按时代排列', ''), '日本人物')
text = insert_before_closing(text, 'const WORLD_EVENTS = [', 'const JAPAN_PERSONS', 
    sections.get('世界新增事件 (56条) - 按时代排列', ''), '世界事件')
text = insert_before_closing(text, 'const WORLD_PERSONS = [', 'const WORLD_EVENTS', 
    sections.get('世界新增人物 (98人) - 按时代排列', ''), '世界人物')

with open(DATA_JS, 'w', encoding='utf-8') as f:
    f.write(text)

print(f'\n文件大小: {len(text):,} 字符')

# 验证
def count_section(start, end=None):
    s = text.find(start)
    if s < 0: return 0
    e = text.find(end, s+1) if end else len(text)
    if e < 0: e = len(text)
    return len(re.findall(r"name:\s*'([^']+)'", text[s:e]))

wp = count_section('const WORLD_PERSONS = [', 'const WORLD_EVENTS')
we = count_section('const WORLD_EVENTS = [', 'const JAPAN_PERSONS')
jp = count_section('const JAPAN_PERSONS = [', 'const JAPAN_EVENTS')
je = count_section('const JAPAN_EVENTS = [')
print(f'\n最终数据量:')
print(f'  世界人物: {wp}人  世界事件: {we}条')
print(f'  日本人物: {jp}人  日本事件: {je}条')
