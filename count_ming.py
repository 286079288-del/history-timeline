import re
with open(r'C:\Users\Admin\WorkBuddy\history-timeline\data.js','r',encoding='utf-8') as f:
    content = f.read()
# Count dynasty:"明" and dynasty:'明'
ming1 = content.count('dynasty: "明"')
ming2 = content.count("dynasty: '明'")
print(f'明朝条目(dynasty: "明"): {ming1}')
print(f"明朝条目(dynasty: '明'): {ming2}")
print(f'合计: {ming1+ming2}')
print(f'文件总行数: {content.count(chr(10))}')
print(f'括号: 开{content.count("{")} 闭{content.count("}")} 差{content.count("{")-content.count("}")}')
# Check ming section
if '// === 明 ===' in content:
    print('找到新格式: // === 明 ===')
elif '// 明' in content:
    idx = content.find('// 明')
    print(f'旧格式位置: 行{content[:idx].count(chr(10))+1}')
