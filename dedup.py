import re

with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到明朝区域
# 找到新的 // ========== 明（续）起始位置
ming_start = content.index('// ========== 明（续）新增人物')
# 找到 // 清 起始位置
qing_start = content.index('  // 清')

ming_section = content[ming_start:qing_start]

# 提取所有ID
ids = re.findall(r"id:\s*'([^']+)'", ming_section)
print(f'Ming section IDs: {len(ids)}, unique: {len(set(ids))}')

# 找重复
from collections import Counter
counter = Counter(ids)
dups = {k: v for k, v in counter.items() if v > 1}
if dups:
    print(f'Duplicate Ming IDs: {dups}')
else:
    print('No duplicates in Ming section!')

# 检查总体括号
opens = content.count('{')
closes = content.count('}')
print(f'Overall: opens={opens}, closes={closes}')
