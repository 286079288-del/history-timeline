import re

with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Count Ming Dynasty persons
ming_persons = len(re.findall(r"dynasty:\s*['\"]明['\"]", content))
print(f'Regular lines (approx): {content.count(chr(10))}')
print(f'Ming Dynasty persons: {ming_persons}')

# Find Ming Dynasty section in DYNASTIES
ming_dynasty = re.search(r"\{[^}]*name:\s*'明'[^}]*\}", content)
if ming_dynasty:
    print(f'Ming Dynasty entry: {ming_dynasty.group()}')

# Find all distinct categories for Ming persons
ming_people = re.findall(r"(dynasty:\s*['\"]明['\"'][^}]+\})", content)
print(f'Ming entries found: {len(ming_people)}')

# Show all unique categories
cats = set()
for m in re.finditer(r"dynasty:\s*['\"]明['\"'][^}]*cat:\s*['\"]([^'\"]+)['\"]", content):
    cats.add(m.group(1))
print(f'Ming categories: {cats}')
