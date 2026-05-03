import re

with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
for i, line in enumerate(lines):
    if '// 明' in line:
        print(f'Line {i+1}: {repr(line[:60])}')
    if '// 清' in line:
        print(f'Line {i+1} [QING]: {repr(line[:60])}')

print()
# Find EVENTS position
events_pos = content.index('const EVENTS = [')
print(f'EVENTS starts at line: {content[:events_pos].count(chr(10)) + 1}')

# Find first // 明 in PERSONS section (before EVENTS)
persons_start = content.index('const PERSONS = [')
persons_section_before_events = content[persons_start:events_pos]
first_ming = persons_section_before_events.find('// 明')
print(f'First // 明 in PERSONS section at line: {content[:persons_start + first_ming].count(chr(10)) + 1}')
first_qing = persons_section_before_events.find('// 清')
print(f'First // 清 in PERSONS section at line: {content[:persons_start + first_qing].count(chr(10)) + 1}')
