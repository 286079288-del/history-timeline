#!/usr/bin/env python3
"""向 data.js 添加明朝、日本、世界历史数据"""
import re

DATA_PATH = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'

# ========== 明朝新增人物（插入到严嵩之后、清之前）==========
MING_ADDITIONS = '''
  // 文人学者
  {
    id: 'tang_yin', name: '唐寅（唐伯虎）', birth: 1470, death: 1524,
    cat: 'artist', dynasty: '明', emoji: '\uD83C\uDFA8',
    location: { lat: 31.3, lng: 120.6, place: '苏州府吴县（今江苏苏州）' },
    desc: '明代著名画家、文学家，"吴中四才子"之一。诗书画三绝，尤以山水人物画著称。因科举舞弊案牵连，绝意仕途，放浪形骸，留下"别人笑我太疯癫，我笑他人看不穿"的千古名句。',
    achievements: ['吴中四才子', '诗书画三绝', '《秋风纨扇图》'],
    relations: [],
    events: []
  },
  {
    id: 'xu_xiake', name: '徐霞客', birth: 1587, death: 1641,
    cat: 'scientist', dynasty: '明', emoji: '\uD83D\uDDFA\uFE0F',
    location: { lat: 31.9, lng: 120.3, place: '江阴（今江苏江阴）' },
    desc: '明代地理学家、旅行家、文学家。历时30余年游历中国21个省区，写成60万字的《徐霞客游记》，系统考察了中国地理地质，是世界上最早对喀斯特地貌进行科学考察的学者。',
    achievements: ['《徐霞客游记》', '考察喀斯特地貌', '游历21省'],
    relations: [],
    events: []
  },
  {
    id: 'wu_chengen', name: '吴承恩', birth: 1500, death: 1582,
    cat: 'artist', dynasty: '明', emoji: '\uD83D\uDC32',
    location: { lat: 33.6, lng: 119.0, place: '山阳（今江苏淮安）' },
    desc: '明代小说家，中国四大名著之一《西游记》的作者。将唐僧取经的民间传说整理创作为百回本长篇小说，塑造了孙悟空、猪八戒等不朽形象，被誉为中国神魔小说的巅峰之作。',
    achievements: ['创作《西游记》', '四大名著之一', '神魔小说巅峰'],
    relations: [],
    events: []
  },
  {
    id: 'shi_nai_an', name: '施耐庵', birth: 1296, death: 1372,
    cat: 'artist', dynasty: '明', emoji: '\uD83D\uDCD6',
    location: { lat: 32.9, lng: 119.8, place: '兴化（今江苏兴化）' },
    desc: '元末明初小说家，中国四大名著之一《水浒传》的作者。以宋江起义为背景，塑造了108位梁山好汉的形象，是中国文学史上第一部以农民起义为题材的长篇小说。',
    achievements: ['创作《水浒传》', '四大名著之一', '第一部农民起义题材长篇'],
    relations: [],
    events: []
  },
  {
    id: 'luo_guanzhong', name: '罗贯中', birth: 1330, death: 1400,
    cat: 'artist', dynasty: '明', emoji: '\u2694\uFE0F',
    location: { lat: 30.6, lng: 114.3, place: '太原（一说东原）' },
    desc: '元末明初小说家，中国四大名著之一《三国演义》的作者。将三国历史通俗化为长篇历史演义，开创了中国历史演义小说的先河，对后世文学影响深远。《水浒传》亦有其参与编撰。',
    achievements: ['创作《三国演义》', '四大名著之一', '开创历史演义小说'],
    relations: [],
    events: []
  },
'''

# ========== 日本新增人物 ==========
JAPAN_ADDITIONS = '''
  // 飞鸟·奈良时代
  {
    id: 'shotoku_taishi', name: '圣德太子', birth: 574, death: 622,
    cat: 'politician', dynasty: '飞鸟', emoji: '\uD83D\uDC51',
    location: { lat: 34.5, lng: 135.7, place: '斑鸠宫（今奈良县）' },
    desc: '日本飞鸟时代政治家、改革家。推行"冠位十二阶"和"宪法十七条"，派遣遣隋使学习中国制度，奠定了日本中央集权国家的基础。笃信佛教，创建法隆寺等众多寺院。',
    achievements: ['制定十七条宪法', '派遣遣隋使', '推广佛教', '创建法隆寺'],
    relations: [],
    events: ['e_taika_reform']
  },
  {
    id: 'kukai', name: '空海', birth: 774, death: 835,
    cat: 'philosopher', dynasty: '平安', emoji: '\uD83D\uDD49\uFE0F',
    location: { lat: 34.2, lng: 133.8, place: '讃岐国（今香川县）' },
    desc: '日本平安时代高僧，真言宗创始人。随遣唐使入唐，师从长安青龙寺惠果，学得密宗大法。回国后在高野山开创真言宗道场，对日本宗教、文化、书法影响深远。被尊为弘法大师。',
    achievements: ['创立真言宗', '入唐求法', '开创高野山', '书法大师'],
    relations: [],
    events: []
  },
  // 镰仓·战国时代
  {
    id: 'hojo_masako', name: '北条政子', birth: 1157, death: 1225,
    cat: 'politician', dynasty: '镰仓', emoji: '\uD83D\uDC78',
    location: { lat: 35.3, lng: 139.5, place: '镰仓' },
    desc: '日本镰仓幕府开创者源赖朝之妻，日本历史上著名的"尼将军"。丈夫死后削发为尼，但实际执掌幕府大权。承久之乱中发表著名演说号召东国武士团结，击退朝廷反攻，稳固了武家政权。',
    achievements: ['执掌幕府', '平定承久之乱', '尼将军'],
    relations: [{ id: 'yoritomo', type: '夫妻', label: '源赖朝' }],
    events: []
  },
  {
    id: 'ashikaga_takauji', name: '足利尊氏', birth: 1305, death: 1358,
    cat: 'military', dynasty: '室町', emoji: '\u2694\uFE0F',
    location: { lat: 35.0, lng: 135.8, place: '京都' },
    desc: '日本室町幕府初代将军。推翻镰仓幕府后与后醍醐天皇决裂，另立天皇建立北朝，开创日本南北朝时代。制定《建武式目》，确立室町幕府体制。',
    achievements: ['建立室町幕府', '开创南北朝'],
    relations: [],
    events: ['e_onin_war']
  },
  // 安土桃山·江户
  {
    id: 'sen_no_rikyu', name: '千利休', birth: 1522, death: 1591,
    cat: 'artist', dynasty: '安土桃山', emoji: '\uD83C\uDF75',
    location: { lat: 34.7, lng: 135.5, place: '堺（今大阪府）' },
    desc: '日本茶道集大成者，"侘寂"美学的代表人物。先后侍奉织田信长和丰臣秀吉，将茶道从单纯的饮茶提升为综合艺术和精神修养。因触怒秀吉被赐切腹，但其美学理念影响日本至今。',
    achievements: ['茶道集大成', '侘寂美学', '千家流茶道'],
    relations: [{ id: 'oda_nobunaga', type: '主从', label: '织田信长' }, { id: 'toyotomi_hideyoshi', type: '主从', label: '丰臣秀吉' }],
    events: []
  },
  // 幕末·明治
  {
    id: 'sakamoto_ryoma', name: '坂本龙马', birth: 1836, death: 1867,
    cat: 'politician', dynasty: '幕末', emoji: '\uD83E\uDDD1\u200D\uD83C\uDF93',
    location: { lat: 33.54, lng: 133.53, place: '土佐藩（今高知县）' },
    desc: '日本幕末志士，明治维新的关键人物。促成萨摩藩与长州藩的"萨长同盟"，提出"船中八策"成为明治维新蓝图。组建日本最早的近代企业"龟山社中"。33岁被暗杀于京都近江屋。',
    achievements: ['促成萨长同盟', '船中八策', '组建龟山社中'],
    relations: [],
    events: ['e_meiji_restoration']
  },
  // 近现代
  {
    id: 'ito_hirobumi', name: '伊藤博文', birth: 1841, death: 1909,
    cat: 'politician', dynasty: '明治', emoji: '\uD83C\uDFDB\uFE0F',
    location: { lat: 34.2, lng: 131.5, place: '长州藩（今山口县）' },
    desc: '日本明治时代政治家，日本第一任内阁总理大臣。主导制定《大日本帝国宪法》，建立日本内阁制度。四次出任首相，推动日本现代化。1909年在哈尔滨被朝鲜志士安重根刺杀。',
    achievements: ['首任内阁总理', '制定帝国宪法', '推动现代化'],
    relations: [{ id: 'meiji_emperor', type: '君臣', label: '明治天皇' }],
    events: ['e_meiji_restoration']
  },
  {
    id: 'natsume_soseki', name: '夏目漱石', birth: 1867, death: 1916,
    cat: 'artist', dynasty: '明治', emoji: '\u270D\uFE0F',
    location: { lat: 35.7, lng: 139.7, place: '东京' },
    desc: '日本近代文学巨匠，被誉为"国民大作家"。代表作《我是猫》《心》《三四郎》等深刻剖析了日本近代知识分子的精神困境。其头像曾被印在1000日元纸币上。',
    achievements: ['国民大作家', '《我是猫》', '《心》', '近代文学奠基'],
    relations: [],
    events: []
  },
'''

# ========== 世界新增人物 ==========
WORLD_ADDITIONS = '''
  {
    id: 'marco_polo', name: '马可·波罗', birth: 1254, death: 1324,
    cat: 'diplomat', emoji: '\uD83D\uDDFA\uFE0F',
    desc: '意大利旅行家、商人。17岁随父亲和叔叔沿丝绸之路前往中国，在元朝任职17年，游历中国各地。回国后在狱中口述《马可·波罗游记》，激发了欧洲人对东方的向往，间接推动了地理大发现。',
    achievements: ['《马可·波罗游记》', '开辟东西方交流通道'],
    relations: [{ id: 'kublai', type: '君臣', label: '元世祖忽必烈' }],
    events: []
  },
  {
    id: 'shakespeare', name: '威廉·莎士比亚', birth: 1564, death: 1616,
    cat: 'artist', emoji: '\uD83C\uDFAD',
    desc: '英国文学史上最杰出的戏剧家，世界文学巨匠。创作了37部戏剧和154首十四行诗，代表作包括《哈姆雷特》《罗密欧与朱丽叶》《麦克白》《李尔王》等，深刻探索人性，影响世界文学数百年。',
    achievements: ['《哈姆雷特》', '37部戏剧', '154首十四行诗', '世界文学巨匠'],
    relations: [],
    events: []
  },
  {
    id: 'mozart', name: '沃尔夫冈·莫扎特', birth: 1756, death: 1791,
    cat: 'artist', emoji: '\uD83C\uDFBC',
    desc: '奥地利古典主义作曲家，西方音乐史上最伟大的天才之一。4岁作曲、6岁巡回演出，短暂的一生创作了600多部作品，包括歌剧《费加罗的婚礼》《魔笛》及41部交响曲，将古典音乐推向巅峰。',
    achievements: ['600多部作品', '《费加罗的婚礼》', '《魔笛》', '41部交响曲'],
    relations: [],
    events: []
  },
  {
    id: 'beethoven', name: '路德维希·凡·贝多芬', birth: 1770, death: 1827,
    cat: 'artist', emoji: '\uD83C\uDFB5',
    desc: '德国作曲家，古典主义与浪漫主义的桥梁。中年失聪后仍创作出《第九交响曲》《命运交响曲》《月光奏鸣曲》等不朽杰作。"我要扼住命运的咽喉"是其不屈精神的写照。',
    achievements: ['《第九交响曲》', '《命运交响曲》', '失聪后创作', '古典浪漫桥梁'],
    relations: [],
    events: []
  },
  {
    id: 'marie_curie', name: '玛丽·居里', birth: 1867, death: 1934,
    cat: 'scientist', emoji: '\u2697\uFE0F',
    desc: '波兰裔法国物理学家、化学家，放射性研究的先驱。发现元素钋和镭，是首位获得诺贝尔奖的女性，也是唯一在两个不同科学领域获得诺贝尔奖的人（物理奖和化学奖）。',
    achievements: ['发现钋和镭', '两次诺贝尔奖', '放射性研究先驱'],
    relations: [],
    events: []
  },
  {
    id: 'picasso', name: '巴勃罗·毕加索', birth: 1881, death: 1973,
    cat: 'artist', emoji: '\uD83D\uDD8C\uFE0F',
    desc: '西班牙画家、雕塑家，20世纪最有影响力的艺术家之一。立体主义的创始人，代表作《格尔尼卡》是反战艺术的象征。一生创作逾2万件作品，风格多变，不断突破艺术边界。',
    achievements: ['立体主义创始人', '《格尔尼卡》', '2万件作品', '20世纪艺术巨匠'],
    relations: [],
    events: []
  },
  {
    id: 'fdr', name: '富兰克林·罗斯福', birth: 1882, death: 1945,
    cat: 'politician', emoji: '\uD83C\uDDFA\uD83C\uDDF8',
    desc: '美国第32任总统，唯一连任四届的总统。推行"新政"带领美国走出大萧条，领导美国参与二战，与丘吉尔、斯大林共同制定战后世界秩序。提出"四大自由"和联合国的构想。',
    achievements: ['新政改革', '领导二战', '唯一四任总统', '推动联合国成立'],
    relations: [{ id: 'churchill', type: '盟友', label: '丘吉尔' }],
    events: ['e_un_founded']
  },
  {
    id: 'turing', name: '艾伦·图灵', birth: 1912, death: 1954,
    cat: 'scientist', emoji: '\uD83D\uDCBB',
    desc: '英国数学家、计算机科学之父、人工智能先驱。提出"图灵机"概念奠定现代计算机理论基础，二战中破解德国Enigma密码拯救无数生命。提出"图灵测试"定义人工智能标准。因同性恋身份被迫害，41岁去世。',
    achievements: ['图灵机', '破解Enigma密码', '图灵测试', '计算机科学之父'],
    relations: [],
    events: []
  },
  {
    id: 'mlk', name: '马丁·路德·金', birth: 1929, death: 1968,
    cat: 'philosopher', emoji: '\u270A\uD83C\uDFFF',
    desc: '美国民权运动领袖，非暴力抗争的象征。领导蒙哥马利巴士抵制运动，发表"我有一个梦想"的著名演讲，推动1964年《民权法案》通过。1968年被暗杀，年仅39岁。获诺贝尔和平奖。',
    achievements: ['民权运动领袖', '"我有一个梦想"', '诺贝尔和平奖', '推动《民权法案》'],
    relations: [],
    events: []
  },
  {
    id: 'van_gogh', name: '文森特·梵高', birth: 1853, death: 1890,
    cat: 'artist', emoji: '\uD83C\uDF3B',
    desc: '荷兰后印象派画家，表现主义的先驱。一生贫困潦倒，但创作了《星夜》《向日葵》《麦田群鸦》等世界名画。生前只卖出一幅画，去世后被誉为现代艺术最伟大的画家之一。',
    achievements: ['《星夜》', '《向日葵》', '后印象派大师', '表现主义先驱'],
    relations: [],
    events: []
  },
'''

# ========== 日本新增事件 ==========
JAPAN_EVENTS_ADDITIONS = '''
  {
    id: 'e_taika_reform', year: 645,
    name: '大化改新', type: 'politics',
    desc: '中大兄皇子联合中臣镰足发动乙巳之变，消灭苏我氏后推行改革：仿唐朝制度建立中央集权国家，实行班田收授法，废除贵族私地，定年号"大化"。标志着日本从奴隶制向封建制转变。',
    dynasty: '飞鸟',
  },
  {
    id: 'e_jinshin_war', year: 672,
    name: '壬申之乱', type: 'war',
    desc: '日本古代最大规模的内乱。天智天皇死后，其弟大海人皇子（后来的天武天皇）与天智之子大友皇子争夺皇位，经一个月激战后大海人获胜。此战确立了天皇的绝对权威，推动了律令制国家的完善。',
    dynasty: '飞鸟',
  },
  {
    id: 'e_onin_war', year: 1467,
    name: '应仁之乱', type: 'war',
    desc: '室町幕府管领细川胜元与山名宗全因将军继承人问题爆发的大规模内战，波及全国。京都化为焦土，幕府权威崩溃，日本由此进入战国时代，各地大名割据混战达百年之久。',
    dynasty: '室町',
  },
  {
    id: 'e_black_ships', year: 1853,
    name: '黑船来航', type: 'politics',
    desc: '美国海军准将佩里率四艘黑色蒸汽军舰驶入江户湾，以武力逼迫日本开国。次年签订《神奈川条约》，结束了日本200多年的锁国政策，加速了幕府体制的崩溃。',
    dynasty: '江户',
  },
  {
    id: 'e_meiji_restoration', year: 1868,
    name: '明治维新', type: 'politics',
    desc: '以萨摩、长州等藩为主的倒幕派推翻江户幕府，拥戴明治天皇建立新政府。推行"富国强兵""殖产兴业""文明开化"三大政策，废除封建制度，建立近代化国家体制，奠定了日本成为世界强国的基础。',
    dynasty: '明治',
  },
'''

# ========== 世界新增事件 ==========
WORLD_EVENTS_ADDITIONS = '''
  {
    id: 'e_roman_split', year: 395,
    name: '罗马帝国分裂', type: 'politics',
    desc: '罗马皇帝狄奥多西一世去世，帝国正式分裂为西罗马帝国和东罗马帝国（拜占庭帝国），分别由其两个儿子统治。西罗马于476年灭亡，东罗马则延续至1453年。',
  },
  {
    id: 'e_mongol_empire', year: 1206,
    name: '蒙古帝国建立', type: 'politics',
    desc: '铁木真统一蒙古各部，在斡难河畔召开忽里勒台大会，被推举为成吉思汗，建立蒙古帝国。此后蒙古铁骑横扫欧亚大陆，建立了人类历史上最大的陆地帝国。',
  },
  {
    id: 'e_renaissance', year: 1400,
    name: '文艺复兴运动', type: 'culture',
    desc: '14至17世纪发源于意大利佛罗伦萨的思想文化运动，以复兴古希腊罗马文化为旗号，强调人文主义精神。达·芬奇、米开朗基罗、拉斐尔等巨匠涌现，推动了欧洲从中世纪向近代的过渡。',
  },
  {
    id: 'e_industrial_rev', year: 1760,
    name: '工业革命', type: 'economy',
    desc: '始于英国的大规模技术革新和社会变革，以蒸汽机、纺织机械的发明为标志。工厂制取代手工工场，铁路和轮船彻底改变了交通，人类社会从农业文明进入工业文明。',
  },
  {
    id: 'e_un_founded', year: 1945,
    name: '联合国成立', type: 'politics',
    desc: '第二次世界大战结束后，51个国家在旧金山签署《联合国宪章》，联合国正式成立。旨在维护国际和平与安全，发展各国友好关系，促进国际合作。总部设在纽约，现有193个成员国。',
  },
'''

# ========== 执行插入 ==========
with open(DATA_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 明朝人物插入（在严嵩 }` 之后、`// 清` 之前）
old = '  },\n\n  // 清'
new = '  },\n' + MING_ADDITIONS + '\n  // 清'
if old in content:
    content = content.replace(old, new, 1)
    print('✓ 明朝 +5人 插入成功')
else:
    print('✗ 明朝插入点未找到')

# 2. 日本人物追加（在 JAPAN_PERSONS 数组末尾的 ]; 之前）
japan_persons_end = content.find('const JAPAN_EVENTS')
if japan_persons_end > 0:
    # 找 ]; 前面的最后一个 }, 
    before = content[:japan_persons_end]
    last_bracket = before.rfind('  },')
    if last_bracket > 0:
        # 在最后一个 }, 后面插入新数据
        content = content[:last_bracket + 5] + '\n' + JAPAN_ADDITIONS + content[last_bracket + 5:]
        print('✓ 日本 +8人 插入成功')
    else:
        print('✗ 日本人物插入点未找到')

# 3. 世界人物追加（在 WORLD_PERSONS 数组末尾的 ]; 之前）
world_persons_end = content.find('const WORLD_EVENTS')
if world_persons_end > 0:
    before = content[:world_persons_end]
    last_bracket = before.rfind('  },')
    if last_bracket > 0:
        content = content[:last_bracket + 5] + '\n' + WORLD_ADDITIONS + content[last_bracket + 5:]
        print('✓ 世界 +10人 插入成功')
    else:
        print('✗ 世界人物插入点未找到')

# 4. 日本事件追加
japan_events_end = content.find('const JAPAN_EVENTS')
japan_events_end2 = content.find('];', japan_events_end + 50)
if japan_events_end2 > 0:
    # 找 ]; 前面的最后一个 },
    before = content[japan_events_end:japan_events_end2]
    last_bracket = before.rfind('  },')
    if last_bracket > 0:
        insert_pos = japan_events_end + last_bracket + 5
        content = content[:insert_pos] + '\n' + JAPAN_EVENTS_ADDITIONS + content[insert_pos:]
        print('✓ 日本 +5事件 插入成功')

# 5. 世界事件追加
world_events_start = content.find('const WORLD_EVENTS')
world_events_end = content.find('];', world_events_start + 50)
if world_events_end > 0:
    before = content[world_events_start:world_events_end]
    last_bracket = before.rfind('  },')
    if last_bracket > 0:
        insert_pos = world_events_start + last_bracket + 5
        content = content[:insert_pos] + '\n' + WORLD_EVENTS_ADDITIONS + content[insert_pos:]
        print('✓ 世界 +5事件 插入成功')

# 写回
with open(DATA_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print('\n数据添加完成！')
print('明朝: 22→27人 (+唐寅、徐霞客、吴承恩、施耐庵、罗贯中)')
print('日本: 14→22人 (+圣德太子、空海、北条政子、足利尊氏、千利休、坂本龙马、伊藤博文、夏目漱石)')
print('世界: 24→34人 (+马可波罗、莎士比亚、莫扎特、贝多芬、居里夫人、毕加索、罗斯福、图灵、马丁路德金、梵高)')
print('日本事件: 29→34 (+大化改新、壬申之乱、应仁之乱、黑船来航、明治维新)')
print('世界事件: 36→41 (+罗马分裂、蒙古帝国、文艺复兴、工业革命、联合国)')
