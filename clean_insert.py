import re

with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Read new Ming data
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\ming_data_new.js', 'r', encoding='utf-8') as f:
    new_ming = f.read()

# Find PERSONS array boundaries
persons_start = content.index('const PERSONS = [')
# Find where PERSONS array ends (first ]; after the start)
first_close = content.index('];', persons_start)

# Extract PERSONS content
persons_content = content[persons_start:first_close]

# Find the last Ming entry in the original PERSONS array
# The last Ming entry ends before the Qing (// 清) comment
qing_comment = content.index('  // 清', first_close)
mingsection_old_start = persons_content.index('  // 明') + len('  // 明')
mingsection_old_end = persons_content.index('  // 清')

old_ming = persons_content[mingsection_old_start:mingsection_old_end]
print(f'Old Ming section length: {len(old_ming)} chars')

# Replace in persons_content
new_persons_content = persons_content[:mingsection_old_start] + new_ming + persons_content[mingsection_old_end:]

# Reconstruct
before_persons = content[:persons_start]
after_persons = content[first_close:]

# But after_persons starts with ]; and then EVENTS...
# We need to keep EVENTS, ERA_GROUPS etc.
# Find the EVENTS definition
events_idx = content.index('const EVENTS = [')
events_section = content[events_idx:]

# PERSONS array should end right before EVENTS
# after_persons from first_close to events_idx = "];\n\n// 重要事件\nconst EVENTS..."
rest_after_persons = content[first_close:events_idx]
print(f'rest_after_persons: {repr(rest_after_persons[:100])}')

# Build new content
new_content = before_persons + 'const PERSONS = [\n' + new_persons_content + '];\n\n' + events_section

# Verify no duplicate IDs
persons_match = re.search(r'const PERSONS = \[(.*?)\];', new_content, re.DOTALL)
if persons_match:
    pdata = persons_match.group(1)
    ids = re.findall(r"id:\s*'([^']+)'", pdata)
    from collections import Counter
    c = Counter(ids)
    dups = {k: v for k, v in c.items() if v > 1}
    print(f'Total persons: {len(ids)}, unique: {len(set(ids))}, dups: {len(dups)}')
    if dups:
        print(f'Dup IDs: {list(dups.items())[:10]}')
    # Only keep last occurrence of each duplicate ID
    seen = {}
    id_to_entry = {}
    # Split into entries
    entries = re.findall(r'\{[^}]*(?:\{[^}]*\}[^}]*)*[^}]*\}', pdata, re.DOTALL)
    print(f'Person entries count: {len(entries)}')
else:
    print('Could not find PERSONS array!')

# Write
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Written successfully')
