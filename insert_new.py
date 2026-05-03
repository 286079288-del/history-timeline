#!/usr/bin/env python3
"""从 new_data.txt 解析数据并插入 data.js"""
import re, os

DATA_JS = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'
NEW_TXT = r'C:\Users\Admin\WorkBuddy\history-timeline\new_data.txt'

# 备份
os.system(f'copy "{DATA_JS}" "{DATA_JS}.bak3" >nul')
print('备份完成')

with open(NEW_TXT, 'r', encoding='utf-8') as f:
    raw = f.read()

# 解析各段
sections = {}
current_section = None
current_content = []
in_comment = False

for line in raw.split('\n'):
    if line.startswith('### '):
        if current_section:
            sections[current_section] = '\n'.join(current_content).strip()
        current_section = line[4:].strip()
        current_content = []
        in_comment = False
    elif line.strip().startswith('//'):
        # 注释行，跳过
        continue
    else:
        if current_section is not None:
            current_content.append(line)

if current_section:
    sections[current_section] = '\n'.join(current_content).strip()

for k, v in sections.items():
    print(f'  {k}: {len(v)} 字符, {v.count("id:")} 条')

# 读 data.js
with open(DATA_JS, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. 世界人物插入
world_insert = sections.get('世界新增人物 (15人)', '')
if world_insert:
    pos = text.find('const WORLD_EVENTS')
    before = text[:pos]
    last = before.rfind('  },')
    text = text[:last + 5] + '\n' + world_insert + text[last + 5:]
    print('世界 +15人 插入')

# 2. 世界事件插入
world_ev_insert = sections.get('世界新增事件 (9条)', '')
if world_ev_insert:
    pos = text.find('const JAPAN_PERSONS')
    before = text[:pos]
    last = before.rfind('  },')
    text = text[:last + 5] + '\n' + world_ev_insert + text[last + 5:]
    print('世界 +9事件 插入')

# 3. 日本人物插入
jp_insert = sections.get('日本新增人物 (14人)', '')
if jp_insert:
    pos = text.find('const JAPAN_EVENTS')
    before = text[:pos]
    last = before.rfind('  },')
    text = text[:last + 5] + '\n' + jp_insert + text[last + 5:]
    print('日本 +14人 插入')

# 4. 日本事件插入
jp_ev_insert = sections.get('日本新增事件 (8条)', '')
if jp_ev_insert:
    # 日本事件是最后一个数组，在文件末尾的 ]; 前插入
    last = text.rfind('  },')
    text = text[:last + 5] + '\n' + jp_ev_insert + text[last + 5:]
    print('日本 +8事件 插入')

# 写回
with open(DATA_JS, 'w', encoding='utf-8') as f:
    f.write(text)

print(f'\n完成! 文件大小: {len(text)} 字符')
