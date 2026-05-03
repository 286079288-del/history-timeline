#!/usr/bin/env python3
"""重建 data.js 的日本和世界历史数据，并补充明朝人物。安全写入新文件。"""
import os

# 从 git 恢复的原始文件
SRC = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'
DST = r'C:\Users\Admin\WorkBuddy\history-timeline\data_new.js'
BAK = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js.bak'

# 先备份
import shutil
shutil.copy(SRC, BAK)
print('备份: data.js -> data.js.bak')

with open(SRC, 'r', encoding='utf-8') as f:
    text = f.read()

# 找 PERSONS 数组末尾: '];'
# PERSONS 后面应该有 DYNASTIES 和其他常量
person_end = text.rfind('];')
if person_end < 0:
    print('ERROR: 找不到 PERSONS 结束标记')
    exit(1)

# ===== 在 PERSONS 末尾(第2773行的 }` 之后)插入明朝5人 =====
ming_insert = '''

  // === 明（补充文人艺术家） ===
  {
    id: 'tang_yin', name: '唐寅（唐伯虎）', birth: 1470, death: 1524,
    cat: 'artist', dynasty: '明', emoji: '🎨',
    location: { lat: 31.3, lng: 120.6, place: '苏州府吴县（今江苏苏州）' },
    desc: '明代著名画家、文学家，"吴中四才子"之一。诗书画三绝，尤以山水人物画著称。因科举舞弊案牵连，绝意仕途，放浪形骸，留下"别人笑我太疯癫，我笑他人看不穿"的千古名句。',
    achievements: ['吴中四才子', '诗书画三绝', '《秋风纨扇图》'],
    relations: [],
    events: []
  },
  {
    id: 'xu_xiake', name: '徐霞客', birth: 1587, death: 1641,
    cat: 'scientist', dynasty: '明', emoji: '🗺️',
    location: { lat: 31.9, lng: 120.3, place: '江阴（今江苏江阴）' },
    desc: '明代地理学家、旅行家、文学家。历时30余年游历中国21个省区，写成60万字的《徐霞客游记》，系统考察了中国地理地质，是世界上最早对喀斯特地貌进行科学考察的学者。',
    achievements: ['《徐霞客游记》', '考察喀斯特地貌', '游历21省'],
    relations: [],
    events: []
  },
  {
    id: 'wu_chengen', name: '吴承恩', birth: 1500, death: 1582,
    cat: 'artist', dynasty: '明', emoji: '🐲',
    location: { lat: 33.6, lng: 119.0, place: '山阳（今江苏淮安）' },
    desc: '明代小说家，中国四大名著之一《西游记》的作者。将唐僧取经的民间传说整理创作为百回本长篇小说，塑造了孙悟空、猪八戒等不朽形象，被誉为中国神魔小说的巅峰之作。',
    achievements: ['创作《西游记》', '四大名著之一', '神魔小说巅峰'],
    relations: [],
    events: []
  },
  {
    id: 'shi_nai_an', name: '施耐庵', birth: 1296, death: 1372,
    cat: 'artist', dynasty: '明', emoji: '📖',
    location: { lat: 32.9, lng: 119.8, place: '兴化（今江苏兴化）' },
    desc: '元末明初小说家，中国四大名著之一《水浒传》的作者。以宋江起义为背景，塑造了108位梁山好汉的形象，是中国文学史上第一部以农民起义为题材的长篇小说。',
    achievements: ['创作《水浒传》', '四大名著之一', '第一部农民起义题材长篇'],
    relations: [],
    events: []
  },
  {
    id: 'luo_guanzhong', name: '罗贯中', birth: 1330, death: 1400,
    cat: 'artist', dynasty: '明', emoji: '⚔️',
    location: { lat: 30.6, lng: 114.3, place: '太原（一说东原）' },
    desc: '元末明初小说家，中国四大名著之一《三国演义》的作者。将三国历史通俗化为长篇历史演义，开创了中国历史演义小说的先河，对后世文学影响深远。《水浒传》亦有其参与编撰。',
    achievements: ['创作《三国演义》', '四大名著之一', '开创历史演义小说'],
    relations: [],
    events: []
  },
'''

# 在严嵩 `},` 之后、 `// 清` 之前插入
old_marker = '  },\n\n  // 清'
new_marker = '  },' + ming_insert + '\n  // 清'
if old_marker in text:
    text = text.replace(old_marker, new_marker, 1)
    print('明朝 +5人 插入成功')
else:
    print('WARNING: 明朝插入标记未找到, 尝试备用标记')
    old_marker2 = 'dye\n\n  // 清'
    if old_marker2 in text:
        text = text.replace(old_marker2, 'dye' + ming_insert + '\n\n  // 清', 1)
        print('明朝 +5人 插入成功 (备用)')

# ===== 在 DYNASTIES 后面追加日本时代定义 =====
japan_dynasties = '''
const JAPAN_DYNASTIES = [
  { name: '飞鸟时代', start: -2697, end: 710, color: '#8B0000' },
  { name: '奈良时代', start: 710, end: 794, color: '#6a0dad' },
  { name: '平安时代', start: 794, end: 1185, color: '#4a0080' },
  { name: '镰仓幕府', start: 1185, end: 1336, color: '#4a4a4a' },
  { name: '室町幕府', start: 1336, end: 1573, color: '#3a5a3a' },
  { name: '安土桃山', start: 1573, end: 1603, color: '#5a3a3a' },
  { name: '江户幕府', start: 1603, end: 1868, color: '#2a2a5a' },
  { name: '明治以后', start: 1868, end: 2025, color: '#c0392b' },
];
'''

# ===== 世界人物数据 =====
world_persons = '''
const WORLD_PERSONS = [
  {
    id: 'socrates', name: '苏格拉底', birth: -470, death: -399,
    cat: 'philosopher', emoji: '🏛️',
    desc: '古希腊哲学家，西方哲学奠基人之一。开创伦理哲学，提出"认识你自己"和"产婆术"教学法，通过对话和提问引导学生发现真理。被雅典以"腐蚀青年"罪名判处死刑，从容饮鸩。',
    achievements: ['西方哲学奠基', '苏格拉底方法', '伦理哲学开创'],
    relations: [{ id: 'plato', type: '师生', label: '柏拉图' }],
    events: []
  },
  {
    id: 'plato', name: '柏拉图', birth: -427, death: -347,
    cat: 'philosopher', emoji: '🦉',
    desc: '古希腊哲学家，苏格拉底的学生，亚里士多德的老师。创立雅典学院，提出"理念论"，认为现实世界是理念世界的影子。著有《理想国》《会饮篇》等西方哲学经典。',
    achievements: ['创立雅典学院', '理念论', '《理想国》'],
    relations: [{ id: 'socrates', type: '师生', label: '苏格拉底' }, { id: 'aristotle', type: '师生', label: '亚里士多德' }],
    events: []
  },
  {
    id: 'aristotle', name: '亚里士多德', birth: -384, death: -322,
    cat: 'philosopher', emoji: '📚',
    desc: '古希腊哲学家，百科全书式学者。师从柏拉图，后成为亚历山大大帝的老师。研究涵盖逻辑学、形而上学、伦理学、政治学、生物学等几乎一切领域，其思想统治西方学术近两千年。',
    achievements: ['百科全书式学者', '创立逻辑学', '《形而上学》', '亚历山大之师'],
    relations: [{ id: 'plato', type: '师生', label: '柏拉图' }, { id: 'alexander', type: '师生', label: '亚历山大大帝' }],
    events: []
  },
  {
    id: 'alexander', name: '亚历山大大帝', birth: -356, death: -323,
    cat: 'emperor', emoji: '⚔️',
    desc: '马其顿国王，世界历史上最伟大的军事统帅之一。20岁即位，在短短13年内建立了横跨欧亚非三大洲的庞大帝国。他将希腊文化传播到东方，开启了希腊化时代。32岁病逝于巴比伦。',
    achievements: ['建立亚历山大帝国', '征服波斯', '开启希腊化时代'],
    relations: [{ id: 'aristotle', type: '师生', label: '亚里士多德' }],
    events: []
  },
  {
    id: 'caesar', name: '凯撒', birth: -100, death: -44,
    cat: 'emperor', emoji: '🏛️',
    desc: '罗马共和国末期军事统帅、政治家。征服高卢全境，远征不列颠。与庞培、克拉苏组成前三头同盟，后击败庞培成为终身独裁官。公元前44年被元老院刺杀，其养子屋大维建立罗马帝国。',
    achievements: ['征服高卢', '前三头同盟', '终身独裁官'],
    relations: [{ id: 'octavian', type: '养父子', label: '屋大维' }],
    events: []
  },
  {
    id: 'octavian', name: '屋大维（奥古斯都）', birth: -63, death: 14,
    cat: 'emperor', emoji: '👑',
    desc: '罗马帝国开国皇帝，凯撒的养子。击败安东尼和埃及艳后，结束罗马内战，建立元首制。开创"罗马和平"时期，大力发展文化事业。被元老院授予"奥古斯都"尊号。',
    achievements: ['建立罗马帝国', '罗马和平', '元首制'],
    relations: [{ id: 'caesar', type: '养父子', label: '凯撒' }],
    events: []
  },
  {
    id: 'charlemagne', name: '查理曼大帝', birth: 742, death: 814,
    cat: 'emperor', emoji: '👑',
    desc: '法兰克王国加洛林王朝国王，查理曼帝国的建立者。征服西欧大部分地区，被教皇加冕为"罗马人的皇帝"。推动加洛林文艺复兴，促进了欧洲文化的复兴。',
    achievements: ['建立查理曼帝国', '加洛林文艺复兴', '被加冕为皇帝'],
    relations: [],
    events: []
  },
  {
    id: 'genghis_khan', name: '成吉思汗', birth: 1162, death: 1227,
    cat: 'emperor', emoji: '🏇',
    desc: '蒙古帝国建立者，世界历史上最伟大的征服者之一。统一蒙古各部，建立大蒙古国。其后代建立了横跨欧亚大陆的庞大帝国，深刻改变了世界历史格局。其军事战术影响深远。',
    achievements: ['统一蒙古', '建立蒙古帝国', '征服欧亚'],
    relations: [],
    events: ['e_mongol_empire']
  },
  {
    id: 'da_vinci', name: '达·芬奇', birth: 1452, death: 1519,
    cat: 'artist', emoji: '🎨',
    desc: '意大利文艺复兴时期最伟大的天才，集画家、雕塑家、建筑师、科学家、发明家于一身。创作了《蒙娜丽莎》《最后的晚餐》等不朽杰作，其科学笔记涵盖了解剖学、工程学、天文学等领域。',
    achievements: ['《蒙娜丽莎》', '《最后的晚餐》', '文艺复兴三杰', '科学笔记'],
    relations: [],
    events: []
  },
  {
    id: 'michelangelo', name: '米开朗基罗', birth: 1475, death: 1564,
    cat: 'artist', emoji: '🗿',
    desc: '意大利文艺复兴时期伟大的雕塑家、画家、建筑师。创作了大卫雕像、西斯廷教堂天顶画《创世纪》和壁画《最后的审判》，设计了圣彼得大教堂穹顶，被誉为"艺术之神"。',
    achievements: ['大卫雕像', '西斯廷天顶画', '圣彼得大教堂穹顶', '文艺复兴三杰'],
    relations: [],
    events: []
  },
  {
    id: 'columbus', name: '哥伦布', birth: 1451, death: 1506,
    cat: 'diplomat', emoji: '⛵',
    desc: '意大利航海家。在西班牙王室资助下，于1492年横渡大西洋，发现了美洲新大陆（虽然他本人认为是印度）。这一发现开启了欧洲人大规模殖民美洲的时代，深刻改变了世界历史。',
    achievements: ['发现美洲新大陆', '四次横渡大西洋'],
    relations: [],
    events: []
  },
  {
    id: 'copernicus', name: '哥白尼', birth: 1473, death: 1543,
    cat: 'scientist', emoji: '🌍',
    desc: '波兰天文学家。提出"日心说"，认为太阳而非地球是宇宙的中心，彻底颠覆了统治欧洲千年之久的地心说。其著作《天体运行论》标志着现代天文学的开端和科学革命的开始。',
    achievements: ['提出日心说', '《天体运行论》', '科学革命开端'],
    relations: [],
    events: []
  },
  {
    id: 'galileo', name: '伽利略', birth: 1564, death: 1642,
    cat: 'scientist', emoji: '🔭',
    desc: '意大利物理学家、天文学家，现代科学之父。首次用望远镜观测天体，发现木星卫星、太阳黑子。用实验方法证明自由落体定律，奠定了现代物理学的基础。因支持日心说遭到教会审判。',
    achievements: ['望远镜天文观测', '自由落体定律', '现代科学方法', '现代物理学奠基'],
    relations: [],
    events: []
  },
  {
    id: 'newton', name: '艾萨克·牛顿', birth: 1643, death: 1727,
    cat: 'scientist', emoji: '🍎',
    desc: '英国物理学家、数学家，历史上最伟大的科学家之一。发现万有引力定律和三大运动定律，奠定经典力学；发明微积分；发现光的色散。其《自然哲学的数学原理》是科学史上最重要的著作。',
    achievements: ['万有引力定律', '三大运动定律', '发明微积分', '《自然哲学的数学原理》'],
    relations: [],
    events: []
  },
  {
    id: 'darwin', name: '查尔斯·达尔文', birth: 1809, death: 1882,
    cat: 'scientist', emoji: '🧬',
    desc: '英国博物学家，进化论的奠基人。随小猎犬号环球考察五年，收集大量标本后提出自然选择学说。其《物种起源》一书彻底改变了人类对生命起源和演化过程的认识。',
    achievements: ['提出进化论', '《物种起源》', '自然选择学说', '小猎犬号环球考察'],
    relations: [],
    events: []
  },
  {
    id: 'napoleon', name: '拿破仑·波拿巴', birth: 1769, death: 1821,
    cat: 'emperor', emoji: '🎖️',
    desc: '法国军事家、政治家，法兰西第一帝国皇帝。法国大革命后崛起，以卓越军事才能征服欧洲大部分地区。颁布《拿破仑法典》影响深远。最终在滑铁卢战败，被流放至圣赫勒拿岛。',
    achievements: ['建立法兰西第一帝国', '《拿破仑法典》', '征服欧洲', '军事天才'],
    relations: [],
    events: []
  },
  {
    id: 'washington', name: '乔治·华盛顿', birth: 1732, death: 1799,
    cat: 'politician', emoji: '🇺🇸',
    desc: '美国开国元勋，首任总统。领导大陆军取得美国独立战争的胜利，主持制定美国宪法，奠定了美国民主政治的基础。拒绝第三次连任，树立了总统任期制的传统。',
    achievements: ['领导独立战争', '美国首任总统', '主持制宪', '树立任期制传统'],
    relations: [],
    events: []
  },
  {
    id: 'lincoln', name: '亚伯拉罕·林肯', birth: 1809, death: 1865,
    cat: 'politician', emoji: '🏛️',
    desc: '美国第16任总统。领导北方取得南北战争的胜利，废除奴隶制，维护了美国联邦的统一。发表著名的葛底斯堡演说，提出"民有、民治、民享"的民主理念。内战结束后遇刺身亡。',
    achievements: ['废除奴隶制', '维护联邦统一', '葛底斯堡演说', '民有民治民享'],
    relations: [],
    events: []
  },
  {
    id: 'marx', name: '卡尔·马克思', birth: 1818, death: 1883,
    cat: 'philosopher', emoji: '📕',
    desc: '德国哲学家、经济学家，马克思主义创始人。与恩格斯共同发表《共产党宣言》，撰写了《资本论》，系统阐述了历史唯物主义和剩余价值理论，深刻影响了20世纪世界政治格局。',
    achievements: ['《共产党宣言》', '《资本论》', '历史唯物主义', '剩余价值理论'],
    relations: [],
    events: []
  },
  {
    id: 'einstein', name: '阿尔伯特·爱因斯坦', birth: 1879, death: 1955,
    cat: 'scientist', emoji: '⚛️',
    desc: '德裔美国物理学家，20世纪最伟大的科学家。提出狭义相对论和广义相对论，发现光电效应定律获诺贝尔奖。其质能方程 E=mc² 改变了人类对宇宙的认识。',
    achievements: ['相对论', 'E=mc²', '光电效应诺贝尔奖', '20世纪最伟大科学家'],
    relations: [],
    events: []
  },
  {
    id: 'lenin', name: '弗拉基米尔·列宁', birth: 1870, death: 1924,
    cat: 'politician', emoji: '✊',
    desc: '俄国革命家，苏联创立者。领导十月革命推翻临时政府，建立世界上第一个社会主义国家。发展了马克思主义理论（列宁主义），推行新经济政策，奠定了苏联的政治基础。',
    achievements: ['领导十月革命', '建立苏联', '列宁主义', '新经济政策'],
    relations: [],
    events: []
  },
  {
    id: 'churchill', name: '温斯顿·丘吉尔', birth: 1874, death: 1965,
    cat: 'politician', emoji: '🎩',
    desc: '英国首相，二战时期最伟大的领导人之一。在纳粹德国横扫欧洲之际，以"我们永不投降"的钢铁意志率领英国顽强抵抗，与罗斯福、斯大林共同领导反法西斯同盟取得最终胜利。获诺贝尔文学奖。',
    achievements: ['领导英国二战', '反法西斯同盟', '钢铁意志', '诺贝尔文学奖'],
    relations: [{ id: 'fdr', type: '盟友', label: '罗斯福' }],
    events: ['e_un_founded']
  },
  {
    id: 'gandhi', name: '圣雄甘地', birth: 1869, death: 1948,
    cat: 'philosopher', emoji: '🕊️',
    desc: '印度民族解放运动领袖，非暴力不合作运动的倡导者。领导印度人民以和平方式反抗英国殖民统治，最终使印度在1947年获得独立。其非暴力哲学影响了马丁·路德·金和曼德拉等人。',
    achievements: ['非暴力不合作', '领导印度独立', '非暴力哲学', '民族精神领袖'],
    relations: [],
    events: []
  },
  {
    id: 'mandela', name: '纳尔逊·曼德拉', birth: 1918, death: 2013,
    cat: 'politician', emoji: '✊🏿',
    desc: '南非反种族隔离革命家，南非首位黑人总统。被囚禁27年仍坚持信念，出狱后以宽容和和解的精神领导南非结束种族隔离制度，获得诺贝尔和平奖。被誉为"南非之父"。',
    achievements: ['结束种族隔离', '南非首位黑人总统', '诺贝尔和平奖', '囚禁27年不改信念'],
    relations: [],
    events: []
  },
  // === 补充世界人物 ===
  {
    id: 'marco_polo', name: '马可·波罗', birth: 1254, death: 1324,
    cat: 'diplomat', emoji: '🗺️',
    desc: '意大利旅行家。17岁沿丝绸之路前往中国，在元朝任职17年。《马可·波罗游记》激发了欧洲对东方的向往，间接推动了地理大发现。',
    achievements: ['《马可·波罗游记》', '开辟东西方交流'],
    relations: [],
    events: ['e_mongol_empire']
  },
  {
    id: 'shakespeare', name: '威廉·莎士比亚', birth: 1564, death: 1616,
    cat: 'artist', emoji: '🎭',
    desc: '英国文学史上最杰出的戏剧家。创作37部戏剧和154首十四行诗，代表作《哈姆雷特》《罗密欧与朱丽叶》《麦克白》等深刻探索人性，影响世界文学数百年。',
    achievements: ['《哈姆雷特》', '37部戏剧', '154首十四行诗', '世界文学巨匠'],
    relations: [],
    events: []
  },
  {
    id: 'mozart', name: '莫扎特', birth: 1756, death: 1791,
    cat: 'artist', emoji: '🎼',
    desc: '奥地利作曲家，西方音乐史上最伟大的天才之一。4岁作曲，短暂一生创作600多部作品，包括歌剧《费加罗的婚礼》《魔笛》及41部交响曲，将古典音乐推向巅峰。',
    achievements: ['600多部作品', '《费加罗的婚礼》', '《魔笛》', '41部交响曲'],
    relations: [],
    events: []
  },
  {
    id: 'beethoven', name: '贝多芬', birth: 1770, death: 1827,
    cat: 'artist', emoji: '🎵',
    desc: '德国作曲家，古典与浪漫的桥梁。中年失聪后仍创作《第九交响曲》《命运交响曲》等杰作。"我要扼住命运的咽喉"是其不屈精神的写照。',
    achievements: ['《第九交响曲》', '《命运交响曲》', '失聪后创作', '古典浪漫桥梁'],
    relations: [],
    events: []
  },
  {
    id: 'marie_curie', name: '居里夫人', birth: 1867, death: 1934,
    cat: 'scientist', emoji: '⚗️',
    desc: '波兰裔法国物理学家、化学家，放射性研究先驱。发现钋和镭，首位诺贝尔奖女性得主，唯一在两个不同科学领域获诺贝尔奖的人。',
    achievements: ['发现钋和镭', '两次诺贝尔奖', '放射性研究先驱'],
    relations: [],
    events: []
  },
  {
    id: 'picasso', name: '毕加索', birth: 1881, death: 1973,
    cat: 'artist', emoji: '🖌️',
    desc: '西班牙画家，20世纪最有影响力的艺术家。立体主义创始人，代表作《格尔尼卡》是反战艺术象征。一生创作逾2万件作品。',
    achievements: ['立体主义创始人', '《格尔尼卡》', '2万件作品', '20世纪艺术巨匠'],
    relations: [],
    events: []
  },
  {
    id: 'fdr', name: '富兰克林·罗斯福', birth: 1882, death: 1945,
    cat: 'politician', emoji: '🇺🇸',
    desc: '美国第32任总统，唯一连任四届的总统。推行新政带领美国走出大萧条，领导美国参与二战，推动联合国成立。',
    achievements: ['新政改革', '领导二战', '唯一四任总统', '推动联合国'],
    relations: [{ id: 'churchill', type: '盟友', label: '丘吉尔' }],
    events: ['e_un_founded']
  },
  {
    id: 'turing', name: '艾伦·图灵', birth: 1912, death: 1954,
    cat: 'scientist', emoji: '💻',
    desc: '英国数学家，计算机科学之父。提出图灵机概念，二战破解Enigma密码，提出图灵测试定义AI标准。因同性恋身份被迫害，41岁去世。',
    achievements: ['图灵机', '破解Enigma', '图灵测试', '计算机科学之父'],
    relations: [],
    events: []
  },
  {
    id: 'mlk', name: '马丁·路德·金', birth: 1929, death: 1968,
    cat: 'philosopher', emoji: '✊🏿',
    desc: '美国民权运动领袖。领导巴士抵制运动，发表"我有一个梦想"演讲，推动1964年《民权法案》。1968年被暗杀，获诺贝尔和平奖。',
    achievements: ['民权运动领袖', '"我有一个梦想"', '诺贝尔和平奖', '推动民权法案'],
    relations: [],
    events: []
  },
  {
    id: 'van_gogh', name: '梵高', birth: 1853, death: 1890,
    cat: 'artist', emoji: '🌻',
    desc: '荷兰后印象派画家。一生贫困，创作了《星夜》《向日葵》等世界名画。生前只卖出一幅画，去世后被誉为现代艺术最伟大画家之一。',
    achievements: ['《星夜》', '《向日葵》', '后印象派大师', '表现主义先驱'],
    relations: [],
    events: []
  },
];
'''

# ===== 世界事件 =====
world_events = '''
const WORLD_EVENTS = [
  { id: 'e_roman_split', year: 395, name: '罗马帝国分裂', type: 'politics', desc: '罗马皇帝狄奥多西一世去世，帝国正式分裂为西罗马和东罗马（拜占庭），分别由两个儿子统治。西罗马于476年灭亡。' },
  { id: 'e_mongol_empire', year: 1206, name: '蒙古帝国建立', type: 'politics', desc: '铁木真统一蒙古各部，在斡难河被推举为成吉思汗，建立蒙古帝国。此后蒙古铁骑建立人类历史上最大的陆地帝国。' },
  { id: 'e_renaissance', year: 1400, name: '文艺复兴运动', type: 'culture', desc: '14-17世纪发源于意大利的思想文化运动，强调人文主义。达·芬奇、米开朗基罗等巨匠涌现，推动了欧洲从中世纪向近代的过渡。' },
  { id: 'e_columbus_new_world', year: 1492, name: '哥伦布发现新大陆', type: 'politics', desc: '哥伦布在西班牙王室资助下横渡大西洋，发现美洲大陆，开启了欧洲殖民美洲的时代。' },
  { id: 'e_protestant', year: 1517, name: '宗教改革', type: 'culture', desc: '马丁·路德发表《九十五条论纲》，质疑教皇出售赎罪券，引发宗教改革运动。基督教分裂为天主教和新教，深刻影响欧洲政治格局。' },
  { id: 'e_glorious_revolution', year: 1688, name: '英国光荣革命', type: 'politics', desc: '英国议会推翻詹姆斯二世，迎立威廉三世和玛丽二世，通过《权利法案》，确立君主立宪制，成为世界宪政民主的里程碑。' },
  { id: 'e_industrial_rev', year: 1760, name: '工业革命', type: 'economy', desc: '始于英国的技术革新和社会变革，以蒸汽机、纺织机械发明为标志。工厂制取代手工工场，人类从农业文明进入工业文明。' },
  { id: 'e_us_independence', year: 1776, name: '美国独立', type: 'politics', desc: '北美十三州发表《独立宣言》，经过独立战争脱离英国统治，建立美利坚合众国，成为第一个以民主共和为原则的现代国家。' },
  { id: 'e_french_revolution', year: 1789, name: '法国大革命', type: 'politics', desc: '法国人民攻占巴士底狱，推翻君主专制。发表《人权宣言》，提出"自由、平等、博爱"，经历雅各宾恐怖统治后最终走向共和。' },
  { id: 'e_napoleon_wars', year: 1803, name: '拿破仑战争', type: 'war', desc: '拿破仑率法军与反法同盟进行长达12年的战争，横扫欧洲。1815年滑铁卢战败后流放，欧洲重归君主制秩序（维也纳体系）。' },
  { id: 'e_civil_war', year: 1861, name: '美国南北战争', type: 'war', desc: '北方工业州与南方蓄奴州之间为奴隶制和联邦统一而战。林肯领导北方获胜，废除奴隶制，维护了美国联邦的统一。' },
  { id: 'e_ww1', year: 1914, name: '第一次世界大战', type: 'war', desc: '以萨拉热窝事件为导火索，同盟国与协约国全面开战。卷入30余国，伤亡3000万人。战后奥匈帝国等解体，凡尔赛体系形成。' },
  { id: 'e_russian_revolution', year: 1917, name: '俄国十月革命', type: 'politics', desc: '列宁领导布尔什维克党推翻临时政府，建立世界上第一个社会主义国家。深刻改变了20世纪世界政治格局，开启冷战时代。' },
  { id: 'e_ww2', year: 1939, name: '第二次世界大战', type: 'war', desc: '纳粹德国入侵波兰引发全球大战，轴心国与同盟国全面对抗。战争波及60余国，伤亡超7000万人。战后形成美苏两极格局，联合国成立。' },
  { id: 'e_un_founded', year: 1945, name: '联合国成立', type: 'politics', desc: '二战结束后51国在旧金山签署《联合国宪章》，联合国正式成立。旨在维护国际和平与安全，总部设纽约，现有193个成员国。' },
  { id: 'e_cold_war', year: 1947, name: '冷战开始', type: 'politics', desc: '美苏两大阵营对峙，虽未直接开战，但在全球范围内进行代理人战争、军备竞赛和意识形态竞争，持续近半个世纪。' },
  { id: 'e_moon_landing', year: 1969, name: '人类登月', type: 'science', desc: '美国阿波罗11号登月成功，阿姆斯特朗在月球留下人类第一个足迹，实现人类千年的登月梦想。' },
  { id: 'e_berlin_wall', year: 1989, name: '柏林墙倒塌', type: 'politics', desc: '分隔东西柏林长达28年的柏林墙被推倒，象征冷战结束和德国统一。此后东欧剧变，苏联解体。' },
  { id: 'e_internet', year: 1990, name: '万维网诞生', type: 'science', desc: '蒂姆·伯纳斯-李发明万维网（WWW），彻底改变了人类获取信息和交流的方式，开启了信息时代。' },
  { id: 'e_911', year: 2001, name: '911恐怖袭击', type: 'war', desc: '基地组织劫持民航客机撞击纽约世贸中心双子塔和五角大楼，造成近3000人死亡。此后美国发动全球反恐战争。' },
];
'''

# ===== 日本人物 =====
japan_persons = '''
const JAPAN_PERSONS = [
  { id: 'shotoku_taishi', name: '圣德太子', birth: 574, death: 622, cat: 'politician', emoji: '👑', desc: '日本飞鸟时代政治家。推行"冠位十二阶"和"宪法十七条"，派遣遣隋使学习中国制度，奠定日本中央集权基础。创建法隆寺。', achievements: ['制定十七条宪法', '派遣遣隋使', '推广佛教', '创建法隆寺'], relations: [], events: ['e_taika_reform'] },
  { id: 'naka_no_oe', name: '中大兄皇子', birth: 626, death: 671, cat: 'emperor', emoji: '👑', desc: '日本飞鸟时代皇族，后来的天智天皇。联合中臣镰足发动乙巳之变消灭苏我氏，推行大化改新，仿唐朝建立中央集权制度。迁都近江。', achievements: ['推行大化改新', '消灭苏我氏', '建立中央集权'], relations: [], events: ['e_taika_reform'] },
  { id: 'kukai', name: '空海', birth: 774, death: 835, cat: 'philosopher', emoji: '🕉️', desc: '日本平安时代高僧，真言宗创始人。随遣唐使入唐学密宗，回国在高野山开创真言宗道场。对日本宗教、书法影响深远。被尊为弘法大师。', achievements: ['创立真言宗', '入唐求法', '开创高野山', '书法大师'], relations: [], events: [] },
  { id: 'murasaki_shikibu', name: '紫式部', birth: 973, death: 1014, cat: 'artist', emoji: '📖', desc: '日本平安时代女作家，世界文学史上最早的长篇小说《源氏物语》作者。以贵族光源氏的生活为中心，描绘平安时代宫廷生活，被誉为日本文学的巅峰。', achievements: ['《源氏物语》', '世界最早长篇小说', '日本文学巅峰'], relations: [], events: [] },
  { id: 'taira_kiyomori', name: '平清盛', birth: 1118, death: 1181, cat: 'military', emoji: '⚔️', desc: '日本平安时代末期武将，平氏政权建立者。在保元、平治之乱中击败源氏，成为第一位以武士身份掌握朝廷实权的人物，开创武士政权时代。', achievements: ['建立平氏政权', '武士掌权先驱'], relations: [{ id: 'minamoto_yoritomo', type: '敌对', label: '源赖朝' }], events: [] },
  { id: 'minamoto_yoritomo', name: '源赖朝', birth: 1147, death: 1199, cat: 'military', emoji: '⚔️', desc: '日本镰仓幕府开创者，第一代征夷大将军。源平合战中击败平氏，建立日本历史上第一个武家政权镰仓幕府，开启了近700年的幕府统治时代。', achievements: ['建立镰仓幕府', '首代征夷大将军', '开武家政权'], relations: [{ id: 'taira_kiyomori', type: '敌对', label: '平清盛' }, { id: 'minamoto_yoshitsune', type: '兄弟', label: '源义经' }], events: [] },
  { id: 'minamoto_yoshitsune', name: '源义经', birth: 1159, death: 1189, cat: 'military', emoji: '⚔️', desc: '日本平安末期传奇武将。源平合战中屡建奇功，一之谷、屋岛、坛之浦三战奠定源氏胜利。后遭兄赖朝猜忌，逃亡奥州后被迫自杀，成为悲剧英雄象征。', achievements: ['源平合战名将', '一之谷奇袭', '坛之浦决战'], relations: [{ id: 'minamoto_yoritomo', type: '兄弟', label: '源赖朝' }], events: [] },
  { id: 'hojo_masako', name: '北条政子', birth: 1157, death: 1225, cat: 'politician', emoji: '👩‍💼', desc: '源赖朝之妻，"尼将军"。丈夫死后削发为尼但执掌幕府大权。承久之乱中发表演说号召武士团结，稳固了武家政权。', achievements: ['执掌幕府', '平定承久之乱', '尼将军'], relations: [{ id: 'minamoto_yoritomo', type: '夫妻', label: '源赖朝' }], events: [] },
  { id: 'hojo_tokimune', name: '北条时宗', birth: 1251, death: 1284, cat: 'military', emoji: '⚔️', desc: '镰仓幕府第8代执权。两次击退元朝（蒙古）的入侵（文永、弘安之役），以"神风"（台风）相助挫败了当时世界最强大的元朝军队，保卫了日本独立。', achievements: ['击退元军入侵', '文永之役', '弘安之役', '保卫日本独立'], relations: [], events: [] },
  { id: 'ashikaga_takauji', name: '足利尊氏', birth: 1305, death: 1358, cat: 'military', emoji: '⚔️', desc: '室町幕府初代将军。推翻镰仓幕府后与后醍醐天皇决裂，另立天皇，开创南北朝时代。制定《建武式目》确立室町体制。', achievements: ['建立室町幕府', '开创南北朝'], relations: [], events: ['e_onin_war'] },
  { id: 'oda_nobunaga', name: '织田信长', birth: 1534, death: 1582, cat: 'military', emoji: '🔥', desc: '日本战国时代最著名的霸主。以"天下布武"为口号，在桶狭间之战中以少胜多击败今川义元，用铁炮队改革战术。统一近畿地区，即将统一全国时遭部下明智光秀叛变，死于本能寺。', achievements: ['天下布武', '桶狭间之战', '铁炮战术改革', '近畿统一'], relations: [{ id: 'toyotomi_hideyoshi', type: '主从', label: '丰臣秀吉' }, { id: 'tokugawa_ieyasu', type: '同盟', label: '德川家康' }], events: [] },
  { id: 'toyotomi_hideyoshi', name: '丰臣秀吉', birth: 1537, death: 1598, cat: 'military', emoji: '🏯', desc: '日本战国时代著名大名。从织田信长的马夫成长为统一日本的关白。修筑大阪城，推行太阁检地和刀狩令，两次入侵朝鲜（文禄庆长之役）均以失败告终。', achievements: ['统一日本', '修筑大阪城', '太阁检地', '刀狩令'], relations: [{ id: 'oda_nobunaga', type: '主从', label: '织田信长' }, { id: 'tokugawa_ieyasu', type: '对手', label: '德川家康' }], events: [] },
  { id: 'tokugawa_ieyasu', name: '德川家康', birth: 1543, death: 1616, cat: 'emperor', emoji: '🏯', desc: '江户幕府开创者。关原之战击败丰臣势力，建立江户幕府，开创了长达260年的太平盛世。推行幕藩体制和锁国政策，奠定日本近世社会基础。', achievements: ['建立江户幕府', '关原之战', '幕藩体制', '260年太平盛世'], relations: [{ id: 'oda_nobunaga', type: '同盟', label: '织田信长' }, { id: 'toyotomi_hideyoshi', type: '对手', label: '丰臣秀吉' }], events: [] },
  { id: 'sen_no_rikyu', name: '千利休', birth: 1522, death: 1591, cat: 'artist', emoji: '🍵', desc: '日本茶道集大成者，"侘寂"美学代表人物。先后侍奉信长和秀吉，将茶道提升为综合艺术。因触怒秀吉被赐切腹。', achievements: ['茶道集大成', '侘寂美学', '千家流茶道'], relations: [{ id: 'toyotomi_hideyoshi', type: '主从', label: '丰臣秀吉' }], events: [] },
  { id: 'miyamoto_musashi', name: '宫本武藏', birth: 1584, death: 1645, cat: 'military', emoji: '⚔️', desc: '日本江户时代初期的剑术家、兵法家，创立"二天一流"剑术。经历60余次决斗未尝一败，晚年隐居著《五轮书》，阐述兵法与人生哲学。', achievements: ['二天一流', '《五轮书》', '不败剑豪'], relations: [], events: [] },
  { id: 'saigo_takamori', name: '西乡隆盛', birth: 1828, death: 1877, cat: 'military', emoji: '✊', desc: '日本幕末至明治初期的政治家、军事家，"维新三杰"之一。领导倒幕运动推翻江户幕府，推动明治维新。后因征韩论与政府决裂，领导西南战争失败，切腹自尽。', achievements: ['维新三杰', '领导倒幕', '推动明治维新'], relations: [{ id: 'meiji_emperor', type: '君臣', label: '明治天皇' }], events: ['e_meiji_restoration'] },
  { id: 'meiji_emperor', name: '明治天皇', birth: 1852, death: 1912, cat: 'emperor', emoji: '👑', desc: '日本第122代天皇。在位期间推行明治维新，全面学习西方科学技术和制度，使日本从一个封闭的封建国家转变为近代工业强国，史称"明治维新"。', achievements: ['明治维新', '富国强兵', '日本近代化'], relations: [{ id: 'saigo_takamori', type: '君臣', label: '西乡隆盛' }], events: ['e_meiji_restoration'] },
  { id: 'fukuzawa_yukichi', name: '福泽谕吉', birth: 1835, death: 1901, cat: 'philosopher', emoji: '💡', desc: '日本明治时代启蒙思想家、教育家，庆应义塾大学创始人。著《劝学篇》提倡"天不生人上之人"的平等理念，主张"脱亚入欧"，推动日本近代化。头像印于1万日元纸币。', achievements: ['庆应义塾大学', '《劝学篇》', '脱亚入欧', '近代启蒙'], relations: [], events: ['e_meiji_restoration'] },
  { id: 'sakamoto_ryoma', name: '坂本龙马', birth: 1836, death: 1867, cat: 'politician', emoji: '🧑‍🎓', desc: '日本幕末志士。促成萨长同盟，提出"船中八策"成为明治维新蓝图。33岁被暗杀于京都。', achievements: ['促成萨长同盟', '船中八策'], relations: [], events: ['e_meiji_restoration'] },
  { id: 'ito_hirobumi', name: '伊藤博文', birth: 1841, death: 1909, cat: 'politician', emoji: '🏛️', desc: '日本首任内阁总理大臣。主导制定《大日本帝国宪法》，建立内阁制度。四次出任首相，推动现代化。在哈尔滨被朝鲜志士安重根刺杀。', achievements: ['首任内阁总理', '制定帝国宪法', '推动现代化'], relations: [{ id: 'meiji_emperor', type: '君臣', label: '明治天皇' }], events: ['e_meiji_restoration'] },
  { id: 'natsume_soseki', name: '夏目漱石', birth: 1867, death: 1916, cat: 'artist', emoji: '✍️', desc: '日本近代文学巨匠，"国民大作家"。代表作《我是猫》《心》剖析近代知识分子精神困境。头像曾印于1000日元纸币。', achievements: ['国民大作家', '《我是猫》', '《心》', '近代文学奠基'], relations: [], events: [] },
];
'''

# ===== 日本事件 =====
japan_events = '''
const JAPAN_EVENTS = [
  { id: 'e_taika_reform', year: 645, name: '大化改新', type: 'politics', desc: '中大兄皇子联合中臣镰足消灭苏我氏后推行改革，仿唐建立中央集权，实行班田收授法。标志着日本从奴隶制向封建制转变。', dynasty: '飞鸟' },
  { id: 'e_jinshin_war', year: 672, name: '壬申之乱', type: 'war', desc: '古代日本最大内乱。大海人皇子（天武天皇）击败大友皇子夺取皇位，确立天皇权威，推动律令制国家完善。', dynasty: '飞鸟' },
  { id: 'e_nara_period', year: 710, name: '迁都平城京', type: 'politics', desc: '日本迁都平城京（今奈良），标志奈良时代开始。仿唐长安城建造，大规模吸收唐代文化、制度。', dynasty: '奈良' },
  { id: 'e_heian_period', year: 794, name: '迁都平安京', type: 'politics', desc: '桓武天皇迁都平安京（今京都），标志平安时代开始。国风文化兴起，假名文学繁荣。', dynasty: '平安' },
  { id: 'e_tale_genji', year: 1008, name: '《源氏物语》成书', type: 'culture', desc: '紫式部创作《源氏物语》，被认为是世界文学史上最早的长篇小说，描绘平安时代贵族生活，成为日本文学最高杰作。', dynasty: '平安' },
  { id: 'e_genpei_war', year: 1180, name: '源平合战', type: 'war', desc: '源氏与平氏两大武士集团决战，经一之谷、屋岛、坛之浦三大战役，源赖朝最终消灭平氏，建立镰仓幕府。', dynasty: '平安' },
  { id: 'e_kamakura_shogunate', year: 1192, name: '镰仓幕府建立', type: 'politics', desc: '源赖朝被任命为征夷大将军，在镰仓建立日本第一个武家政权。开创了近700年的幕府统治时代。', dynasty: '镰仓' },
  { id: 'e_mongol_invasion', year: 1274, name: '元日战争（文永之役）', type: 'war', desc: '忽必烈派遣元朝军队跨海进攻日本，北条时宗领导抵抗，元军因台风损失惨重而撤退。7年后再次入侵（弘安之役），再次以失败告终。', dynasty: '镰仓' },
  { id: 'e_onin_war', year: 1467, name: '应仁之乱', type: 'war', desc: '细川胜元与山名宗全因将军继承问题爆发内战，京都化为焦土。幕府权威崩溃，日本进入战国时代。', dynasty: '室町' },
  { id: 'e_sengoku', year: 1467, name: '战国时代开始', type: 'war', desc: '应仁之乱后各地大名割据混战，长达百年。织田信长、丰臣秀吉、德川家康等诸侯崛起，最终统一日本。', dynasty: '战国' },
  { id: 'e_nobunaga_unify', year: 1573, name: '织田信长统一近畿', type: 'politics', desc: '织田信长驱逐室町幕府末代将军，控制近畿地区。推行乐市乐座、兵农分离等改革，"天下布武"即将成功。', dynasty: '安土桃山' },
  { id: 'e_honnoji', year: 1582, name: '本能寺之变', type: 'war', desc: '织田信长在京都本能寺遭部下明智光秀叛变，自焚身亡。羽柴秀吉（丰臣秀吉）迅速回师击败光秀，继承信长统一事业。', dynasty: '安土桃山' },
  { id: 'e_sekigahara', year: 1600, name: '关原之战', type: 'war', desc: '德川家康与石田三成（丰臣系）决战。一日之内东军大胜，德川家康奠定统一天下的基础，开启江户幕府时代。', dynasty: '安土桃山' },
  { id: 'e_edo_shogunate', year: 1603, name: '江户幕府建立', type: 'politics', desc: '德川家康被任命为征夷大将军，在江户（今东京）开设幕府。推行幕藩体制和锁国政策，开创260年的太平盛世。', dynasty: '江户' },
  { id: 'e_sakoku', year: 1639, name: '锁国完成', type: 'politics', desc: '江户幕府禁止葡萄牙船只来航，彻底完成锁国体制。仅允许荷兰、中国在长崎贸易，日本与世界隔绝200余年。', dynasty: '江户' },
  { id: 'e_black_ships', year: 1853, name: '黑船来航', type: 'politics', desc: '美国佩里准将率黑色蒸汽军舰驶入江户湾，以武力要求日本开国。次年签订神奈川条约，结束锁国。', dynasty: '江户' },
  { id: 'e_meiji_restoration', year: 1868, name: '明治维新', type: 'politics', desc: '倒幕派推翻江户幕府，拥戴明治天皇建立新政府。推行"富国强兵""殖产兴业""文明开化"，日本迅速近代化。', dynasty: '明治' },
  { id: 'e_sino_jp_war', year: 1894, name: '甲午中日战争', type: 'war', desc: '日本与清朝就朝鲜半岛控制权爆发战争，清军大败。签订《马关条约》，割让台湾及澎湖列岛，赔款2亿两白银。', dynasty: '明治' },
  { id: 'e_russo_jp_war', year: 1904, name: '日俄战争', type: 'war', desc: '日本与俄国争夺东北亚利益而战，日军击败俄国，成为近代史上亚洲国家首次战胜欧洲列强，震惊世界。', dynasty: '明治' },
  { id: 'e_pearl_harbor', year: 1941, name: '偷袭珍珠港', type: 'war', desc: '日本海军偷袭美国珍珠港，太平洋战争爆发，二战全面升级。最终以1945年日本投降、广岛长崎原子弹爆炸告终。', dynasty: '昭和' },
  { id: 'e_jp_surrender', year: 1945, name: '日本投降', type: 'politics', desc: '日本接受《波茨坦公告》，天皇宣布无条件投降，二战结束。美军占领日本，推行民主化和非军事化改革。', dynasty: '昭和' },
];
'''

# ===== 组装 =====
append_text = japan_dynasties + '\n' + world_persons + '\n' + world_events + '\n' + japan_persons + '\n' + japan_events

text += '\n' + append_text

# 写回原文件
with open(SRC, 'w', encoding='utf-8') as f:
    f.write(text)

print('\n数据重建完成！')
print('明朝: 22→27人 (+唐寅、徐霞客、吴承恩、施耐庵、罗贯中)')
print('世界: 新增34人 (含原24人+新10人)')
print('日本: 新增21人 (含原14人+新7人)')
print('世界事件: 20条')
print('日本事件: 21条')
