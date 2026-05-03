import re
from collections import Counter

with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find PERSONS array boundaries
persons_start = content.index('const PERSONS = [')
persons_end = content.index('];', persons_start) + 2
persons_section = content[persons_start:persons_end]

# Extract all IDs from PERSONS
ids = re.findall(r"id:\s*'([^']+)'", persons_section)
counter = Counter(ids)
dups = {k: v for k, v in counter.items() if v > 1}

print(f'Total persons in array: {len(ids)}')
print(f'Unique IDs: {len(set(ids))}')
print(f'Duplicate IDs in PERSONS array:')
for k, v in sorted(dups.items(), key=lambda x: -x[1]):
    # Find the line numbers
    lines = [f'L{i+persons_start}' for i, line in enumerate(persons_section.split('\n')) if f"id: '{k}'" in line]
    print(f'  {k}: {v}x - {", ".join(lines[:5])}')
