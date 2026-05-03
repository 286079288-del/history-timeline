import re
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    c = f.read()

ws = c.find("const WORLD_PERSONS")
we = c.find("const WORLD_EVENTS")
names = re.findall(r"name:\s*'([^']+)'", c[ws:we])
print(f"世界人物({len(names)}人):")
for n in names: print(f"  {n}")

print()

# 找日本人物
js = c.find("const JAPAN_PERSONS")
je2 = c.find("const JAPAN_EVENTS")
jp_names = re.findall(r"name:\s*'([^']+)'", c[js:je2])
print(f"日本人物({len(jp_names)}人):")
for n in jp_names: print(f"  {n}")

print()

# 世界事件
we_end = c.find("];", we)
we_sec = c[we:we_end] if we_end > 0 else c[we:we+3000]
ev_names = re.findall(r"name:\s*'([^']+)'", we_sec)
print(f"世界事件({len(ev_names)}条):")
for n in ev_names: print(f"  {n}")

print()

# 日本事件
jp_ev_start = c.find("const JAPAN_EVENTS")
jp_ev_end = c.find("];", jp_ev_start)
if jp_ev_end < 0:
    jp_ev_end = c.find("const", jp_ev_start + 100) or len(c)
jp_sec = c[jp_ev_start:jp_ev_end]
jp_ev_names = re.findall(r"name:\s*'([^']+)'", jp_sec)
print(f"日本事件({len(jp_ev_names)}条):")
for n in jp_ev_names: print(f"  {n}")
