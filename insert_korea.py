import re
DATA_JS = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'
KOREA = r'C:\Users\Admin\WorkBuddy\history-timeline\korea_data.txt'

with open(KOREA, 'r', encoding='utf-8') as f: raw = f.read()

# 解析
sections = {}
cur = None
lines = []
for line in raw.split('\n'):
    if line.startswith('### '):
        if cur:
            sections[cur] = '\n'.join(lines).strip()
        cur = line[4:].strip()
        lines = []
    else:
        lines.append(line)
if cur:
    sections[cur] = '\n'.join(lines).strip()

persons = sections.get('朝鲜人物 (80人)', '')
events = sections.get('朝鲜事件 (40条)', '')

# 组装
korea_block = f'''const KOREA_PERSONS = [
{persons}
];

const KOREA_EVENTS = [
{events}
];
'''

with open(DATA_JS, 'r', encoding='utf-8') as f:
    text = f.read()

# 追加到文件末尾
if 'const KOREA_PERSONS' not in text:
    text = text.rstrip() + '\n\n' + korea_block
    with open(DATA_JS, 'w', encoding='utf-8') as f:
        f.write(text)
    # verify
    n_p = len(re.findall(r"name:\s*'([^']+)'", persons))
    n_e = len(re.findall(r"name:\s*'([^']+)'", events))
    print(f'朝鲜人物: {n_p}人  朝鲜事件: {n_e}条')
    print(f'文件大小: {len(text):,} 字符')
else:
    print('KOREA_PERSONS 已存在，已跳过')
