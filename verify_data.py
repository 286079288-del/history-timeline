import re
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js','r',encoding='utf-8') as f:
    c = f.read()

def count_section(start_marker, end_marker=None):
    s = c.find(start_marker)
    if s < 0: return 0, []
    e = c.find(end_marker, s+1) if end_marker else len(c)
    if e < 0: e = len(c)
    sec = c[s:e]
    # 统计 name 字段（带单引号）
    names = re.findall(r"name:\s*'([^']+)'", sec)
    return len(names), names

n, names = count_section('const WORLD_PERSONS', 'const WORLD_EVENTS')
print(f'世界人物: {n}人')
for name in names[-10:]: print(f'  ... {name}')

n, names = count_section('const WORLD_EVENTS', 'const JAPAN_PERSONS')
print(f'\n世界事件: {n}条')
for name in names[-10:]: print(f'  ... {name}')

n, names = count_section('const JAPAN_PERSONS', 'const JAPAN_EVENTS')
print(f'\n日本人物: {n}人')
for name in names[-10:]: print(f'  ... {name}')

n, names = count_section('const JAPAN_EVENTS')
print(f'\n日本事件: {n}条')
for name in names[-10:]: print(f'  ... {name}')
