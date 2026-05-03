#!/usr/bin/env python3
"""精确插入数据：按数组边界定位，不动用 rfind"""
import re

DATA_JS = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'
NEW_TXT = r'C:\Users\Admin\WorkBuddy\history-timeline\new_data.txt'

# 解析 new_data.txt
with open(NEW_TXT, 'r', encoding='utf-8') as f:
    raw = f.read()

sections = {}
current = None
content_lines = []
for line in raw.split('\n'):
    if line.startswith('### '):
        if current:
            # 清理内容：去掉开头空行
            content = '\n'.join(content_lines).strip()
            sections[current] = content
        current = line[4:].strip()
        content_lines = []
    elif line.strip().startswith('//'):
        continue
    else:
        content_lines.append(line)
if current:
    sections[current] = '\n'.join(content_lines).strip()

# 读 data.js
with open(DATA_JS, 'r', encoding='utf-8') as f:
    text = f.read()

def insert_before_closing(text, section_start_marker, next_section_marker, data, label):
    """在 section_start_marker 对应的数组 `];` 之前插入 data"""
    start = text.find(section_start_marker)
    if start < 0:
        print(f'  ERROR: 找不到 {section_start_marker}')
        return text

    # 找到数组结束位置 `];` —— 在下一个 const 之前
    end_search = text.find(next_section_marker, start + 1)
    if end_search < 0:
        end_search = len(text)

    # 在 [start, end_search) 范围内找最后的 `];`
    snippet = text[start:end_search]
    closing_pos = snippet.rfind('];')
    if closing_pos < 0:
        print(f'  ERROR: 找不到关闭括号: {label}')
        return text

    insert_at = start + closing_pos
    result = text[:insert_at] + '\n' + data + '\n' + text[insert_at:]
    print(f'  {label} 插入成功')
    return result

# 按正确顺序执行（从后往前，避免位置偏移）
# 1. 日本事件 - 最后
text = insert_before_closing(text,
    'const JAPAN_EVENTS = [',
    'ZZZ_END',
    sections.get('日本新增事件 (8条)', ''),
    '日本事件 +8')

# 2. 日本人物
text = insert_before_closing(text,
    'const JAPAN_PERSONS = [',
    'const JAPAN_EVENTS',
    sections.get('日本新增人物 (14人)', ''),
    '日本人物 +14')

# 3. 世界事件
text = insert_before_closing(text,
    'const WORLD_EVENTS = [',
    'const JAPAN_PERSONS',
    sections.get('世界新增事件 (9条)', ''),
    '世界事件 +9')

# 4. 世界人物
text = insert_before_closing(text,
    'const WORLD_PERSONS = [',
    'const WORLD_EVENTS',
    sections.get('世界新增人物 (15人)', ''),
    '世界人物 +15')

# 写回
with open(DATA_JS, 'w', encoding='utf-8') as f:
    f.write(text)

print(f'\n文件大小: {len(text)} 字符')

# 验证
world_p_start = text.find('const WORLD_PERSONS')
world_e_start = text.find('const WORLD_EVENTS')
jp_start = text.find('const JAPAN_PERSONS')
jp_e_start = text.find('const JAPAN_EVENTS')
end = len(text)

def count_entries(sec):
    return len(re.findall(r"\bid:\s*'", sec))

print(f'世界人物 id: {count_entries(text[world_p_start:world_e_start])}')
print(f'世界事件 id: {count_entries(text[world_e_start:jp_start])}')
print(f'日本人物 id: {count_entries(text[jp_start:jp_e_start])}')
print(f'日本事件 id: {count_entries(text[jp_e_start:end])}')
