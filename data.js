// =============================================
// 历史数据：朝代、人物、事件
// =============================================

const DYNASTIES = [
  { name: '三皇', start: -4500, end: -2700, color: '#9b59b6' },
  { name: '五帝', start: -2700, end: -2120, color: '#8e44ad' },
  { name: '夏', start: -2120, end: -1600, color: '#c0392b' },
  { name: '商', start: -1600, end: -1046, color: '#d35400' },
  { name: '西周', start: -1046, end: -771, color: '#d4a843' },
  { name: '东周', start: -770, end: -256, color: '#c19a6b' },
  { name: '春秋', start: -770, end: -476, color: '#c19a6b' },
  { name: '战国', start: -475, end: -221, color: '#b8860b' },
  { name: '秦', start: -221, end: -206, color: '#16a085' },
  { name: '汉', start: -206, end: 220, color: '#2980b9' },
  { name: '三国', start: 220, end: 280, color: '#c0392b' },
  { name: '晋', start: 280, end: 420, color: '#8e44ad' },
  { name: '南北朝', start: 420, end: 589, color: '#7f8c8d' },
  { name: '隋', start: 581, end: 618, color: '#27ae60' },
  { name: '唐', start: 618, end: 907, color: '#f39c12' },
  { name: '五代', start: 907, end: 960, color: '#95a5a6' },
  { name: '北宋', start: 960, end: 1127, color: '#1abc9c' },
  { name: '南宋', start: 1127, end: 1279, color: '#16a085' },
  { name: '元', start: 1271, end: 1368, color: '#7f8c8d' },
  { name: '明', start: 1368, end: 1644, color: '#e74c3c' },
  { name: '清', start: 1644, end: 1912, color: '#2c3e50' },
  { name: '民国', start: 1912, end: 1949, color: '#3498db' },
];

const ERA_GROUPS = [
  { name: '先秦', start: -4500, end: -221 },
  { name: '秦汉', start: -221, end: 220 },
  { name: '魏晋南北朝', start: 220, end: 589 },
  { name: '隋唐', start: 581, end: 907 },
  { name: '五代十国', start: 907, end: 960 },
  { name: '宋元', start: 960, end: 1368 },
  { name: '明清', start: 1368, end: 1912 },
  { name: '近现代', start: 1912, end: 1949 },
];

// 人物数据（含地理位置）
const PERSONS = [
  // ==================== 三皇时期 ====================
  {
    id: 'suiren', name: '燧人氏', birth: -4464, death: -4354,
    cat: 'sage', dynasty: '三皇', emoji: '🔥',
    location: { lat: 35.0, lng: 114.0, place: '商丘（今河南商丘）' },
    desc: '传说中有巢氏五氏之一，发明钻木取火，结束人类茹毛饮血的时代，是人类用火历史的开创者。有史可考的第一位个体部落首领。',
    achievements: ['钻木取火', '教民熟食'],
    relations: [],
    events: []
  },
  {
    id: 'fuxi', name: '伏羲氏', birth: -4354, death: -4239,
    cat: 'sage', dynasty: '三皇', emoji: '☯️',
    location: { lat: 35.5, lng: 112.5, place: '宛丘（今河南淮阳）' },
    desc: '中华民族的人文始祖之一，三皇之首。相传发明八卦、结绳记事、创造文字雏形，制定嫁娶制度，定都宛丘，开创中华文明的曙光。',
    achievements: ['创造八卦', '结绳记事', '制定嫁娶', '发明渔猎'],
    relations: [{ id: 'nüwa', type: '兄妹/夫妻', label: '女娲氏' }],
    events: []
  },
  {
    id: 'nüwa', name: '女娲氏', birth: -4239, death: -4109,
    cat: 'sage', dynasty: '三皇', emoji: '🌙',
    location: { lat: 35.5, lng: 111.2, place: '中皇山（今山西平定）' },
    desc: '中华民族始祖母神，相传用黄土造人，炼石补天，斩巨鳌四足支撑天地，结束洪水灾难，是人类和万物的创造者。伏羲之妹兼妻。',
    achievements: ['抟土造人', '炼石补天', '斩鳌立极', '创设婚姻'],
    relations: [{ id: 'fuxi', type: '兄妹/夫妻', label: '伏羲氏' }],
    events: ['e_nüwa_butian']
  },
  {
    id: 'shennong', name: '炎帝（神农氏）', birth: -2700, death: -2600,
    cat: 'sage', dynasty: '三皇', emoji: '🌿',
    location: { lat: 27.5, lng: 111.6, place: '姜水流域（今陕西宝鸡）' },
    desc: '农业和医药之神，9代神农氏之首。相传遍尝百草，教民耕种，发明医药和耒耜，建立中药学基础。与黄帝并称"炎黄"，是中华民族共同祖先。',
    achievements: ['尝百草', '教民耕种', '发明医药', '发明耒耜', '日中为市'],
    relations: [{ id: 'huangdi', type: '后代/融合', label: '黄帝（炎帝）' }],
    events: ['e_shennong_yao']
  },

  // ==================== 五帝时期 ====================
  {
    id: 'huangdi', name: '黄帝', birth: -2697, death: -2599,
    cat: 'emperor', dynasty: '五帝', emoji: '👑',
    location: { lat: 35.5, lng: 109.5, place: '有熊氏部落（今河南新郑）' },
    desc: '中华民族的人文始祖，五帝之首。统一华夏部落，发明指南车、历法、音律、医学，涿鹿之战大败蚩尤，开创华夏文明，被尊为"人文初祖"。享年约117岁（史料记载）。',
    achievements: ['统一华夏', '涿鹿之战', '发明指南车', '创制历法', '奠定礼制'],
    relations: [
      { id: 'yandi', type: '同盟对立', label: '炎帝（阪泉之战后结盟）' },
      { id: 'cangjie', type: '臣属', label: '仓颉（史官）' },
      { id: 'zhuanyu', type: '祖孙', label: '颛顼（孙子）' },
    ],
    events: ['e_zhuoluzhan', 'e_banquanzhan', 'e_huangdi_jiwei']
  },
  {
    id: 'shaohao', name: '少昊', birth: -2598, death: -2515,
    cat: 'emperor', dynasty: '五帝', emoji: '👑',
    location: { lat: 35.8, lng: 116.5, place: '穷桑（今山东曲阜）' },
    desc: '黄帝长子，五帝之一。定都穷桑，创建太昊文化，以金德王，故称白帝。凤凰来朝，百官有序。',
    achievements: ['定都穷桑', '创太昊文化', '凤凰来朝'],
    relations: [
      { id: 'huangdi', type: '父子', label: '黄帝（父亲）' },
      { id: 'zhuanyu', type: '叔侄', label: '颛顼' },
    ],
    events: []
  },
  {
    id: 'zhuanyu', name: '颛顼', birth: -2514, death: -2437,
    cat: 'emperor', dynasty: '五帝', emoji: '👑',
    location: { lat: 35.3, lng: 112.9, place: '昌意（今河南濮阳一带）' },
    desc: '黄帝之孙，少昊之侄，五帝之一。继承黄帝之位，改革宗教，命重黎绝地天通，禁止民神杂糅，建立政治秩序。',
    achievements: ['绝地天通', '改革宗教', '制定历法'],
    relations: [
      { id: 'huangdi', type: '祖孙', label: '黄帝（祖父）' },
      { id: 'shaohao', type: '叔侄', label: '少昊' },
      { id: 'gonggong', type: '对立', label: '共工（争位）' },
    ],
    events: ['e_zhudi_tongtian']
  },
  {
    id: 'diku', name: '帝喾', birth: -2436, death: -2357,
    cat: 'emperor', dynasty: '五帝', emoji: '👑',
    location: { lat: 35.7, lng: 115.5, place: '亳（今河南商丘）' },
    desc: '黄帝的曾孙，五帝之一。以仁德治国，取民之子为己之子，天下大服。传说他生而神明，洞察幽明，订立节气，制定历法。',
    achievements: ['仁德治国', '推行德教', '制定节气', '制定历法'],
    relations: [
      { id: 'zhuanyu', type: '继承', label: '颛顼' },
      { id: 'yao', type: '父子', label: '帝尧（儿子）' },
    ],
    events: []
  },
  {
    id: 'yao', name: '帝尧', birth: -2436, death: -2259,
    cat: 'emperor', dynasty: '五帝', emoji: '☀️',
    location: { lat: 36.0, lng: 112.5, place: '平阳（今山西临汾）' },
    desc: '五帝之一，以仁德著称。制定历法，设官分职，治理水患。首创禅让制，将帝位传给德才兼备的舜，是理想君主的典范。迁都平阳。',
    achievements: ['制定历法', '禅让美政', '治理水患', '建立诽谤木'],
    relations: [
      { id: 'diku', type: '父子', label: '帝喾（父亲）' },
      { id: 'shun', type: '禅让', label: '舜（接受禅让）' },
      { id: 'danzhu', type: '父子', label: '帝挚（兄长）' },
    ],
    events: ['e_shanrang_yao', 'e_yao_zhiyu', 'e_fenghuang']
  },
  {
    id: 'danzhu', name: '帝挚', birth: -2360, death: -2352,
    cat: 'emperor', dynasty: '五帝', emoji: '👑',
    location: { lat: 36.0, lng: 112.5, place: '平阳（今山西临汾）' },
    desc: '帝喾之子，尧之兄长。在位8年，因不善治国禅让给尧。',
    achievements: [],
    relations: [
      { id: 'diku', type: '父子', label: '帝喾（父亲）' },
      { id: 'yao', type: '兄弟', label: '帝尧（弟弟）' },
    ],
    events: []
  },
  {
    id: 'shun', name: '帝舜', birth: -2258, death: -2206,
    cat: 'emperor', dynasty: '五帝', emoji: '🌸',
    location: { lat: 35.3, lng: 112.6, place: '姚墟（今山东菏泽）' },
    desc: '五帝之一，以孝德闻名。父顽母嚣弟傲而能孝感动天。受尧禅让即位，在位50年，又禅让给禹，是禅让制的最高典范。',
    achievements: ['德政治国', '巡视四方', '制定五刑', '流放四凶'],
    relations: [
      { id: 'yao', type: '被禅让', label: '帝尧' },
      { id: 'dayu', type: '禅让', label: '大禹' },
      { id: 'ehuang', type: '夫妻', label: '娥皇（妻子）' },
      { id: 'nüying', type: '夫妻', label: '女英（妻子）' },
    ],
    events: ['e_shanrang_shun', 'e_mantiyao', 'e_liufang']
  },
  {
    id: 'dayu', name: '大禹', birth: -2120, death: -2070,
    cat: 'emperor', dynasty: '夏', emoji: '🌊',
    location: { lat: 35.5, lng: 111.2, place: '安邑（今山西夏县）' },
    desc: '夏朝开国之君，因治水有功而受舜禅让。三过家门而不入，历时十三年终于制服洪水。建立中国历史上第一个王朝，结束禅让制。',
    achievements: ['治理洪水', '划分九州', '建立夏朝', '铸九鼎', '征三苗'],
    relations: [
      { id: 'shun', type: '被禅让', label: '舜' },
      { id: 'qi', type: '父子', label: '夏启（儿子）' },
    ],
    events: ['e_zhishui', 'e_xia_founded', 'e_shanrang_dayu']
  },

  // ==================== 夏朝君主 ====================
  {
    id: 'qi', name: '夏启', birth: -2100, death: -2050,
    cat: 'emperor', dynasty: '夏', emoji: '👑',
    location: { lat: 34.8, lng: 112.6, place: '阳城（今河南登封）' },
    desc: '夏朝第二位君主，大禹之子。打破禅让制确立世袭制，建立夏王朝的家天下传统。甘之战平定有扈氏叛乱。',
    achievements: ['确立世袭制', '甘之战平叛', '建立家天下', '大享诸侯'],
    relations: [
      { id: 'dayu', type: '父子', label: '大禹' },
      { id: 'taikang', type: '父子', label: '太康（儿子）' },
    ],
    events: ['e_gan_zhanyi', 'e_xia_jingying']
  },
  {
    id: 'taikang', name: '太康', birth: -2070, death: -2030,
    cat: 'emperor', dynasty: '夏', emoji: '👑',
    location: { lat: 34.0, lng: 112.6, place: '斟鄩（今河南偃师）' },
    desc: '夏朝第三位君主，启之子。沉湎酒色，不理朝政，迷恋狩猎，被有穷氏部落首领后羿趁机夺取政权，史称"太康失国"。',
    achievements: [],
    relations: [
      { id: 'qi', type: '父子', label: '夏启' },
      { id: 'houyi', type: '对立', label: '后羿（篡位）' },
    ],
    events: ['e_taikang_luoguo', 'e_taikang_shiguo']
  },
  {
    id: 'zhongkang', name: '仲康', birth: -2050, death: -2010,
    cat: 'emperor', dynasty: '夏', emoji: '👑',
    location: { lat: 34.0, lng: 112.6, place: '斟鄩（今河南偃师）' },
    desc: '太康之弟，后羿所立的傀儡君主。名义上复位为王，实际上仍受后羿控制，天文官羲和因酒醉误报节气被处死，最终忧愤而死。',
    achievements: [],
    relations: [
      { id: 'taikang', type: '兄弟', label: '太康' },
      { id: 'houyi', type: '控制', label: '后羿' },
      { id: 'xiang', type: '父子', label: '夏相' },
    ],
    events: []
  },
  {
    id: 'xiang', name: '夏相', birth: -2040, death: -2000,
    cat: 'emperor', dynasty: '夏', emoji: '👑',
    location: { lat: 33.5, lng: 116.5, place: '帝丘（今河南濮阳）' },
    desc: '仲康之子，出生时母亲后缗从窦中逃出。少康的父亲，后被寒浞派兵杀死，夏朝王统一度中断约40年。',
    achievements: [],
    relations: [
      { id: 'zhongkang', type: '父子', label: '仲康' },
      { id: 'huan', type: '杀', label: '寒浞' },
      { id: 'shaokang', type: '父子', label: '少康' },
    ],
    events: []
  },
  {
    id: 'shaokang', name: '少康', birth: -2010, death: -1960,
    cat: 'emperor', dynasty: '夏', emoji: '👑',
    location: { lat: 33.0, lng: 120.5, place: '纶邑（今河南虞城）' },
    desc: '夏朝第六位君主，夏相之子。在有虞氏部落成长，积蓄力量，最终灭掉寒浞，恢复夏朝，史称"少康中兴"，夏朝进入鼎盛期。',
    achievements: ['少康中兴', '恢复夏朝', '灭寒浞'],
    relations: [
      { id: 'xiang', type: '父子', label: '夏相' },
      { id: 'huan', type: '灭', label: '寒浞' },
    ],
    events: ['e_shaokang_zhongxing']
  },
  {
    id: 'houyi', name: '后羿', birth: -2060, death: -2020,
    cat: 'general', dynasty: '夏', emoji: '🏹',
    location: { lat: 35.5, lng: 116.0, place: '有穷国（今山东德州）' },
    desc: '有穷氏部落首领，善射。见太康失德，趁太康外出游猎时夺取夏朝政权，史称"后羿代夏"。后被寒浞所杀。嫦娥奔月传说与其相关。',
    achievements: ['后羿代夏', '善射'],
    relations: [
      { id: 'taikang', type: '对立', label: '太康' },
      { id: 'huan', type: '杀', label: '寒浞' },
    ],
    events: ['e_houyi_daixia', 'e_taikang_shiguo']
  },
  {
    id: 'huan', name: '寒浞', birth: -2040, death: -1980,
    cat: 'politician', dynasty: '夏', emoji: '⚔️',
    location: { lat: 36.5, lng: 118.0, place: '寒国（今山东潍坊）' },
    desc: '寒国君主，杀死后羿及其子，篡夺夏朝政权。建立新朝，历时约40年，后被少康所灭。是夏朝前期的重要转折人物。',
    achievements: ['杀后羿', '灭夏朝正统'],
    relations: [
      { id: 'houyi', type: '杀', label: '后羿' },
      { id: 'shaokang', type: '被灭', label: '少康' },
    ],
    events: []
  },

  {
    id: 'jie', name: '夏桀', birth: -1709, death: -1600,
    cat: 'emperor', dynasty: '夏', emoji: '💀',
    location: { lat: 34.8, lng: 112.6, place: '斟鄩（今河南偃师）' },
    desc: '夏朝末代君主，暴君典型，宠爱妹喜，建酒池肉林，滥用民力。商汤起兵讨伐，夏朝灭亡。成语"桀骜不驯"、"助纣为虐"中的"桀"即指此。',
    achievements: ['无（暴君）'],
    relations: [{ id: 'tang', type: '对立', label: '商汤（灭夏）' }],
    events: ['e_xia_miewang']
  },

  // 商朝
  {
    id: 'tang', name: '商汤', birth: -1600, death: -1589,
    cat: 'emperor', dynasty: '商', emoji: '⚔️',
    location: { lat: 34.7, lng: 111.3, place: '亳都（今河南商丘）' },
    desc: '商朝开国君主，仁德之君。讨伐夏桀，建立商朝。重用伊尹为相，励精图治，创"商汤革命"，开以臣伐君先例。',
    achievements: ['灭夏建商', '商汤革命', '重用伊尹'],
    relations: [
      { id: 'jie', type: '对立', label: '夏桀（讨伐灭夏）' },
      { id: 'yiyin', type: '君臣', label: '伊尹（宰相）' }
    ],
    events: ['e_xia_miewang', 'e_shang_founded']
  },
  {
    id: 'yiyin', name: '伊尹', birth: -1650, death: -1549,
    cat: 'politician', dynasty: '商', emoji: '📜',
    location: { lat: 34.0, lng: 112.5, place: '有莘国（今河南开封杞县）' },
    desc: '商朝名相，辅助商汤建国立业。被后世尊为"元圣"，是儒、墨、法等家共同推崇的贤相。创"割烹"（以烹饪比喻治国）典故。',
    achievements: ['辅佐商汤', '建国辅政', '制汤药治百病'],
    relations: [{ id: 'tang', type: '君臣', label: '商汤（君主）' }],
    events: ['e_shang_founded']
  },
  {
    id: 'pangeng', name: '盘庚', birth: -1300, death: -1272,
    cat: 'emperor', dynasty: '商', emoji: '🏛️',
    location: { lat: 35.0, lng: 114.5, place: '殷（今河南安阳）' },
    desc: '商朝第十九位君主，迁都于殷，摆脱旧贵族势力，推行新政，使商朝复兴，史称"盘庚迁殷"，殷墟即其都城遗址。',
    achievements: ['盘庚迁殷', '复兴商朝', '推行新政'],
    relations: [],
    events: ['e_pangeng_qianyin']
  },
  {
    id: 'wuding', name: '武丁', birth: -1250, death: -1192,
    cat: 'emperor', dynasty: '商', emoji: '👑',
    location: { lat: 35.0, lng: 114.5, place: '殷（今河南安阳）' },
    desc: '商朝第二十二位君主，在位59年，商朝最繁荣时期。少年流落民间，知民间疾苦。重用傅说为相，对西北羌方、鬼方、南荆等用兵，开创"武丁中兴"。',
    achievements: ['武丁中兴', '重用傅说', '征伐四方'],
    relations: [{ id: 'fushuo', type: '君臣', label: '傅说（宰相）' }],
    events: ['e_wuding_zhongxing']
  },
  {
    id: 'fushuo', name: '傅说', birth: -1320, death: -1246,
    cat: 'politician', dynasty: '商', emoji: '📋',
    location: { lat: 35.8, lng: 111.2, place: '傅岩（今山西平陆）' },
    desc: '商朝名相，原为筑墙劳役的囚徒，武丁夜梦得之，举以为相，辅佐武丁中兴。是中国历史上"寒士为相"的典范，与伊尹并称。',
    achievements: ['辅佐武丁', '中兴商朝'],
    relations: [{ id: 'wuding', type: '君臣', label: '武丁（君主）' }],
    events: ['e_wuding_zhongxing']
  },
  {
    id: 'taibaijia', name: '太甲', birth: -1572, death: -1547,
    cat: 'emperor', dynasty: '商', emoji: '👑',
    location: { lat: 34.7, lng: 111.3, place: '亳都（今河南商丘）' },
    desc: '商朝第三位君主，商汤之孙。继位后不理朝政，被伊尹放逐于桐宫。三年后悔过自责，伊尹迎回复位，励精图治，史称"太甲反正"。',
    achievements: ['太甲反正', '励精图治'],
    relations: [
      { id: 'tang', type: '祖孙', label: '商汤（祖父）' },
      { id: 'yiyin', type: '被放逐', label: '伊尹' },
    ],
    events: ['e_shang_founded']
  },
  {
    id: 'zhou_wang', name: '商纣王', birth: -1105, death: -1046,
    cat: 'emperor', dynasty: '商', emoji: '👿',
    location: { lat: 35.5, lng: 114.5, place: '朝歌（今河南淇县）' },
    desc: '商朝末代君主，与夏桀并称"桀纣"，暴君代名词。宠幸妲己，造鹿台酒池，挖比干心，囚周文王，终被周武王伐灭。成语"助纣为虐"、"纨绔子弟"均与其相关。',
    achievements: ['无（暴君）'],
    relations: [
      { id: 'bigan', type: '迫害', label: '比干（被剖心）' },
      { id: 'jizi', type: '流放', label: '箕子（被流放）' },
      { id: 'wuwang', type: '对立', label: '周武王（灭商）' }
    ],
    events: ['e_muye']
  },
  {
    id: 'bigan', name: '比干', birth: -1110, death: -1047,
    cat: 'politician', dynasty: '商', emoji: '❤️',
    location: { lat: 35.5, lng: 114.5, place: '朝歌（今河南淇县）' },
    desc: '商朝忠臣，纣王叔父，以忠直著称。因劝谏纣王被剖心而死，被孔子尊为"殷三仁"之首，后世奉为文财神。',
    achievements: ['忠直敢谏', '被奉为文财神'],
    relations: [{ id: 'zhou_wang', type: '忠臣', label: '商纣王（叔父）' }],
    events: ['e_muye']
  },
  {
    id: 'jizi', name: '箕子', birth: -1120, death: -1040,
    cat: 'politician', dynasty: '商', emoji: '📿',
    location: { lat: 35.5, lng: 114.5, place: '朝歌（今河南淇县）' },
    desc: '商朝忠臣，纣王叔父。因劝谏纣王不听，披发佯狂为奴，被纣王囚禁。周武王灭商后，箕子率众东渡朝鲜，被推为王，建立箕子朝鲜。',
    achievements: ['箕子朝鲜', '洪范九畴'],
    relations: [{ id: 'zhou_wang', type: '忠臣', label: '商纣王（叔父）' }],
    events: ['e_muye']
  },
  {
    id: 'weiziji', name: '微子启', birth: -1135, death: -1055,
    cat: 'politician', dynasty: '商', emoji: '🙏',
    location: { lat: 35.5, lng: 114.5, place: '微子国（今河南商丘）' },
    desc: '商纣王庶兄，见纣王无道，数次劝谏不听，遂离开商朝。周武王灭商后，被封于宋国，成为宋国始祖。孔子"殷三仁"之一。',
    achievements: ['建立宋国', '殷三仁之一'],
    relations: [{ id: 'zhou_wang', type: '对立', label: '商纣王（异母兄）' }],
    events: ['e_muye']
  },

  // 西周
  {
    id: 'cheng_wang', name: '周成王', birth: -1055, death: -1021,
    cat: 'emperor', dynasty: '周', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周第二位君主，武王之子。幼年即位，由周公旦摄政，平定管蔡之乱，亲政后继续推行礼乐之治，开创"成康之治"。',
    achievements: ['成康之治', '稳定周朝'],
    relations: [
      { id: 'wuwang', type: '父子', label: '武王（父亲）' },
      { id: 'zhougong', type: '摄政', label: '周公旦（摄政）' }
    ],
    events: ['e_zhougongshezheng']
  },
  {
    id: 'kang_wang', name: '周康王', birth: -1020, death: -996,
    cat: 'emperor', dynasty: '周', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周第三位君主，成王之子。在位期间继承父亲政策，与成王共创"成康之治"，是西周最繁盛时期，四十年不用刑罚。',
    achievements: ['成康之治', '四十年不用刑'],
    relations: [{ id: 'cheng_wang', type: '父子', label: '成王（父亲）' }],
    events: []
  },
  {
    id: 'zhaowang', name: '周昭王', birth: -995, death: -977,
    cat: 'emperor', dynasty: '周', emoji: '⚔️',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周第四位君主，康王之子。喜好游猎，南征荆楚，因贪婪索取当地玉石，被楚人设计沉船而死，周朝开始由盛转衰。',
    achievements: ['南征荆楚'],
    relations: [{ id: 'kang_wang', type: '父子', label: '康王（父亲）' }],
    events: ['e_zhaowang_nansheng']
  },
  {
    id: 'muwang', name: '周穆王', birth: -976, death: -922,
    cat: 'emperor', dynasty: '周', emoji: '🐴',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周第五位君主，昭王之子。在位55年，是周朝在位最长的君主。喜好游历，曾西巡见西王母，东征徐偃王，传说《穆天子传》即记其事。',
    achievements: ['西巡见西王母', '东征徐偃王', '制定吕刑'],
    relations: [{ id: 'zhaowang', type: '父子', label: '昭王（父亲）' }],
    events: ['e_muwang_xiyun']
  },
  {
    id: 'li_wang', name: '周厉王', birth: -905, death: -829,
    cat: 'emperor', dynasty: '周', emoji: '😠',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周第十位君主，实行"专利"政策垄断山林川泽，又派人监视百姓言论，导致"道路以目"。公元前841年，国人暴动，厉王出逃，共伯和摄政，史称"共和行政"。',
    achievements: ['共和行政（结束）'],
    relations: [],
    events: ['e_guo_baodong', 'e_gonghe']
  },
  {
    id: 'you_wang', name: '周幽王', birth: -795, death: -771,
    cat: 'emperor', dynasty: '周', emoji: '🔥',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周末代君主，昏庸无道。为博褒姒一笑，烽火戏诸侯，导致犬戎攻破镐京被杀，西周灭亡。典故"烽火戏诸侯"、"一笑倾城"即出于此。',
    achievements: ['无（亡国之君）'],
    relations: [{ id: 'pingwang', type: '父子', label: '平王（继承人）' }],
    events: ['e_fenghuo_xizhhou', 'e_xizhou_miewang']
  },

  // 东周
  {
    id: 'pingwang', name: '周平王', birth: -781, death: -720,
    cat: 'emperor', dynasty: '周', emoji: '🏯',
    location: { lat: 34.7, lng: 112.4, place: '洛邑（今河南洛阳）' },
    desc: '东周开国之君，幽王之子。镐京被犬戎攻破后，在郑、秦、晋等国护送下东迁洛邑，建立东周。周天子权威日衰，诸侯开始争霸。',
    achievements: ['建立东周', '东迁洛邑'],
    relations: [
      { id: 'you_wang', type: '父子', label: '幽王（父亲）' },
      { id: 'huangong', type: '护送', label: '郑桓公（护送继位）' }
    ],
    events: ['e_xizhou_miewang', 'e_dongzhou_licheng']
  },

  // 商周
  {
    id: 'wenwang', name: '周文王', birth: -1152, death: -1056,
    cat: 'emperor', dynasty: '周', emoji: '📜',
    location: { lat: 34.7, lng: 108.5, place: '西岐（今陕西岐山一带）' },
    desc: '西周奠基者，被拘禁于羑里时演推《周易》。广纳贤才，任用姜尚，为武王灭商奠定基础，被后世尊为圣王。',
    achievements: ['演周易', '广纳贤才', '奠定西周基础'],
    relations: [
      { id: 'wuwang', type: '父子', label: '武王（儿子）' },
      { id: 'jiang_ziya', type: '君臣', label: '姜子牙（军师）' },
      { id: 'zhou_wang', type: '对立', label: '商纣王（被其拘禁）' }
    ],
    events: ['e_yuligu']
  },
  {
    id: 'wuwang', name: '周武王', birth: -1087, death: -1043,
    cat: 'emperor', dynasty: '周', emoji: '⚔️',
    location: { lat: 34.3, lng: 108.9, place: '镐京（今陕西西安）' },
    desc: '西周开国之君，继承父志，联合诸侯，在牧野之战中大败商纣王，建立周朝，分封诸侯，确立封建制度。',
    achievements: ['牧野之战', '建立周朝', '分封诸侯'],
    relations: [
      { id: 'wenwang', type: '父子', label: '文王（父亲）' },
      { id: 'jiang_ziya', type: '君臣', label: '姜子牙（军师）' },
      { id: 'zhougong', type: '兄弟', label: '周公旦（弟弟）' },
      { id: 'zhou_wang', type: '对立', label: '商纣王（灭商）' }
    ],
    events: ['e_muye', 'e_zhoushi_fenfeng']
  },
  {
    id: 'jiang_ziya', name: '姜子牙', birth: -1128, death: -1015,
    cat: 'military', dynasty: '周', emoji: '🎣',
    location: { lat: 36.8, lng: 118.3, place: '营丘（今山东潍坊临朐县）' },
    desc: '周朝开国元勋，军事家、政治家。年过七旬方遇文王，辅佐文武两代君主灭商建周，封于齐地，开创齐国。',
    achievements: ['灭商建周', '封神演义原型', '兵法始祖'],
    relations: [
      { id: 'wenwang', type: '君臣', label: '文王（君主）' },
      { id: 'wuwang', type: '君臣', label: '武王（君主）' }
    ],
    events: ['e_muye']
  },
  {
    id: 'zhougong', name: '周公旦', birth: -1100, death: -1043,
    cat: 'politician', dynasty: '周', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '洛邑（今河南洛阳）' },
    desc: '周武王之弟，辅佐成王摄政，制礼作乐，建立周朝典章制度，是儒家推崇的圣人，孔子的精神偶像。',
    achievements: ['制礼作乐', '摄政辅成王', '平定叛乱'],
    relations: [
      { id: 'wuwang', type: '兄弟', label: '武王（兄长）' },
      { id: 'cheng_wang', type: '摄政', label: '周成王（辅佐）' },
      { id: 'kongzi', type: '偶像', label: '孔子（崇拜者）' }
    ],
    events: ['e_zhougongshezheng']
  },

  // ==================== 春秋时期 ====================
  {
    id: 'laozi', name: '老子', birth: -571, death: -471,
    cat: 'philosopher', dynasty: '周', emoji: '☯️',
    location: { lat: 34.6, lng: 112.4, place: '陈国苦县（今河南鹿邑）' },
    desc: '道家学派创始人，著有《道德经》（《老子》），提出"道"为宇宙本原，主张无为而治，对中华文化影响深远。',
    achievements: ['创立道家', '著《道德经》', '影响道教'],
    relations: [
      { id: 'kongzi', type: '同时代', label: '孔子（曾向其请教）' },
    ],
    events: ['e_laozi_chujian']
  },
  {
    id: 'kongzi', name: '孔子', birth: -551, death: -479,
    cat: 'philosopher', dynasty: '周', emoji: '🎓',
    location: { lat: 35.5, lng: 116.9, place: '鲁国陬邑（今山东曲阜）' },
    desc: '儒家学派创始人，中国古代伟大的思想家、教育家。提出"仁"的核心思想，整理六经，开创私人讲学之风，被后世尊称"至圣先师"。',
    achievements: ['创立儒学', '整理六经', '开创私学', '提出仁义礼智'],
    relations: [
      { id: 'laozi', type: '请教', label: '老子（曾问礼）' },
      { id: 'mengzi', type: '继承', label: '孟子（儒学传人）' },
      { id: 'zhougong', type: '崇拜', label: '周公（精神偶像）' }
    ],
    events: ['e_kongzi_zhongyou', 'e_kongzi_bianwen']
  },
  {
    id: 'sunzi', name: '孙子', birth: -544, death: -496,
    cat: 'military', dynasty: '周', emoji: '⚔️',
    location: { lat: 33.0, lng: 119.8, place: '齐国乐安（今山东惠民）' },
    desc: '春秋末期军事家，著有《孙子兵法》，是世界上最早最完整的兵书，被誉为"兵圣"，其思想影响延续至今。',
    achievements: ['著《孙子兵法》', '辅佐吴王阖闾', '攻破楚都'],
    relations: [{ id: 'wuqi', type: '同领域', label: '吴起（后继兵法家）' }],
    events: ['e_sunzi_bingfa']
  },
  {
    id: 'mengzi', name: '孟子', birth: -372, death: -289,
    cat: 'philosopher', dynasty: '周', emoji: '📚',
    location: { lat: 36.2, lng: 117.0, place: '邹国（今山东邹城）' },
    desc: '战国时期儒家代表人物，继承发展孔子学说，提出"仁政"和"性善论"，被尊为"亚圣"。',
    achievements: ['性善论', '仁政思想', '著《孟子》'],
    relations: [{ id: 'kongzi', type: '继承', label: '孔子（思想宗师）' }],
    events: []
  },
  {
    id: 'zhuangzi', name: '庄子', birth: -369, death: -286,
    cat: 'philosopher', dynasty: '周', emoji: '🦋',
    location: { lat: 32.3, lng: 112.2, place: '宋国蒙县（今河南商丘）' },
    desc: '道家学派代表人物，继承老子思想并加以发展，著有《庄子》，文学想象奇特，影响了中国文化艺术。',
    achievements: ['发展道家哲学', '著《庄子》', '文学成就'],
    relations: [{ id: 'laozi', type: '继承', label: '老子（道家始祖）' }],
    events: []
  },
  {
    id: 'hanfeizi', name: '韩非子', birth: -281, death: -233,
    cat: 'philosopher', dynasty: '周', emoji: '⚖️',
    location: { lat: 33.6, lng: 115.6, place: '韩国新郑（今河南新郑）' },
    desc: '战国末期法家思想集大成者，著有《韩非子》，提出法、术、势三者结合，影响秦统一和后世专制政治。',
    achievements: ['法家集大成', '著《韩非子》', '影响秦制'],
    relations: [
      { id: 'xunzi', type: '师从', label: '荀子（老师）' },
      { id: 'qinshihuang', type: '影响', label: '秦始皇（实践其思想）' }
    ],
    events: []
  },
  {
    id: 'xunzi', name: '荀子', birth: -313, death: -238,
    cat: 'philosopher', dynasty: '周', emoji: '📜',
    location: { lat: 36.5, lng: 116.5, place: '赵国（今山西南部）' },
    desc: '战国末期儒家代表人物，提出"性恶论"，重视礼法教化，弟子有韩非子、李斯，对后世影响深远。',
    achievements: ['性恶论', '礼法并重', '培养韩非、李斯'],
    relations: [
      { id: 'hanfeizi', type: '师徒', label: '韩非子（学生）' },
    ],
    events: []
  },
  {
    id: 'quyuan', name: '屈原', birth: -340, death: -278,
    cat: 'scholar', dynasty: '周', emoji: '🎭',
    location: { lat: 29.0, lng: 111.5, place: '楚国郢都（今湖北荆州）' },
    desc: '战国时期楚国诗人、政治家，创作《离骚》《九歌》等，开创楚辞文学形式，被誉为"中国诗歌之父"。投江殉国，后世以端午节纪念。',
    achievements: ['创作《离骚》', '开创楚辞', '端午节起源'],
    relations: [],
    events: ['e_quyuan_tujian']
  },
  {
    id: 'lisi', name: '李斯', birth: -284, death: -208,
    cat: 'politician', dynasty: '秦', emoji: '📋',
    location: { lat: 34.2, lng: 108.9, place: '上蔡（今河南上蔡），后居咸阳' },
    desc: '秦朝丞相，协助秦始皇统一六国，统一文字、度量衡、货币，是法家思想的实践者。后因赵高陷害被腰斩。',
    achievements: ['统一文字', '统一度量衡', '辅助统一六国'],
    relations: [
      { id: 'xunzi', type: '师从', label: '荀子（老师）' },
      { id: 'qinshihuang', type: '君臣', label: '秦始皇（君主）' }
    ],
    events: ['e_liuguotongyi']
  },

  // ==================== 春秋战国重要人物（续） ====================
  {
    id: 'guojia', name: '管仲', birth: -723, death: -645,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 36.8, lng: 118.3, place: '齐国颖上（今安徽颖上）' },
    desc: '春秋时期齐国名相，辅佐齐桓公成为春秋五霸之首。实行改革，富国强兵，提出"尊王攘夷"策略，是法家先驱。',
    achievements: ['辅佐齐桓公称霸', '管仲改革', '尊王攘夷'],
    relations: [{ id: 'baogong', type: '好友', label: '鲍叔牙（知己）' }, { id: 'qihuangong', type: '君臣', label: '齐桓公' }],
    events: ['e_chunqiu_wuxia']
  },
  {
    id: 'baogong', name: '鲍叔牙', birth: -720, death: -644,
    cat: 'politician', dynasty: '春秋', emoji: '🤝',
    location: { lat: 36.8, lng: 118.3, place: '齐国（今山东济南）' },
    desc: '春秋时期齐国大夫，与管仲为至交好友。推荐管仲给齐桓公，自己甘居其下，是知人善任的典范。成语"管鲍之交"出自二人。',
    achievements: ['推荐管仲', '管鲍之交'],
    relations: [{ id: 'guojia', type: '知己', label: '管仲' }],
    events: []
  },
  {
    id: 'qihuangong', name: '齐桓公', birth: -716, death: -643,
    cat: 'emperor', dynasty: '春秋', emoji: '👑',
    location: { lat: 36.8, lng: 118.3, place: '临淄（今山东淄博）' },
    desc: '春秋五霸之首，齐国第十五位国君，名小白。前685年即位，重用管仲为相，实行改革，九合诸侯，成为春秋时期第一位霸主。晚年昏庸，饿死宫中。',
    achievements: ['春秋首霸', '九合诸侯', '重用管仲'],
    relations: [
      { id: 'guojia', type: '君臣', label: '管仲（相国）' },
      { id: 'baogong', type: '君臣', label: '鲍叔牙' },
    ],
    events: ['e_chunqiu_wuxia']
  },
  {
    id: 'wencheng', name: '晋文公', birth: -697, death: -628,
    cat: 'emperor', dynasty: '春秋', emoji: '👑',
    location: { lat: 35.5, lng: 112.5, place: '晋国绛都（今山西翼城）' },
    desc: '春秋五霸之一，晋献公之子，名重耳。因骊姬之乱流亡十九年，前636年回国即位，励精图治，城濮之战大败楚国，成为第二位春秋霸主。',
    achievements: ['春秋五霸之一', '城濮之战', '流亡十九年'],
    relations: [
      { id: 'xunyan', type: '君臣', label: '狐偃（股肱之臣）' },
      { id: 'wuzhen', type: '君臣', label: '赵衰（谋士）' },
    ],
    events: ['e_chunqiu_wuxia', 'e_chengpu_battle']
  },
  {
    id: 'xunyan', name: '狐偃', birth: -715, death: -629,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 35.5, lng: 112.5, place: '晋国（今山西南部）' },
    desc: '晋文公的舅舅，跟随重耳流亡十九年，是文公复国的主要功臣之一。城濮之战前力劝文公退避三舍，后大败楚军。',
    achievements: ['辅佐文公复国', '城濮之战献策'],
    relations: [{ id: 'wencheng', type: '君臣', label: '晋文公（外甥）' }],
    events: ['e_chengpu_battle']
  },
  {
    id: 'mu_gong', name: '秦穆公', birth: -682, death: -621,
    cat: 'emperor', dynasty: '春秋', emoji: '👑',
    location: { lat: 34.3, lng: 108.7, place: '雍城（今陕西凤翔）' },
    desc: '春秋五霸之一，秦国第九位国君，名任好。前659年即位，重用百里奚、蹇叔为相，灭西戎十二国，向东扩展，奠定秦国的霸主地位。',
    achievements: ['称霸西戎', '重用贤臣', '秦晋之好'],
    relations: [
      { id: 'bailixi', type: '君臣', label: '百里奚' },
      { id: 'wencheng', type: '联姻', label: '晋文公' },
    ],
    events: ['e_chunqiu_wuxia', 'e_qin_zhou']
  },
  {
    id: 'bailixi', name: '百里奚', birth: -725, death: -621,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 34.5, lng: 112.5, place: '虞国（今山西平陆）' },
    desc: '春秋时期虞国大夫，后为秦穆公用五张羊皮换得，授以国政，成为秦国名相。与蹇叔、由余等共同辅佐穆公成就霸业。',
    achievements: ['五羖大夫', '辅佐穆公'],
    relations: [{ id: 'mu_gong', type: '君臣', label: '秦穆公' }],
    events: []
  },
  {
    id: 'chu_zhuangwang', name: '楚庄王', birth: -613, death: -591,
    cat: 'emperor', dynasty: '春秋', emoji: '👑',
    location: { lat: 30.6, lng: 112.2, place: '郢都（今湖北荆州）' },
    desc: '春秋五霸之一，楚国国君。"一鸣惊人"典故的主人公。不鸣则已，一鸣惊人，最终问鼎中原，成为春秋霸主之一。',
    achievements: ['问鼎中原', '一鸣惊人', '春秋霸主'],
    relations: [{ id: 'sunshuao', type: '君臣', label: '孙叔敖（相国）' }],
    events: ['e_chunqiu_wuxia', 'e_chu_wendou']
  },
  {
    id: 'sunshuao', name: '孙叔敖', birth: -630, death: -593,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 30.6, lng: 112.2, place: '楚国期思（今河南淮滨）' },
    desc: '春秋时期楚国名相，孙武之祖。辅佐楚庄王成就霸业，主持修建芍陂水利工程，是中国最早的大型陂塘灌溉工程。',
    achievements: ['辅佐庄王', '修建芍陂', '为相清廉'],
    relations: [{ id: 'chu_zhuangwang', type: '君臣', label: '楚庄王' }],
    events: []
  },
  {
    id: 'wuzixuxu', name: '伍子胥', birth: -559, death: -484,
    cat: 'military', dynasty: '春秋', emoji: '⚔️',
    location: { lat: 31.5, lng: 121.0, place: '吴国都城（今江苏苏州）' },
    desc: '春秋时期吴国大夫，名将。父兄被楚平王所杀，逃吴后辅佐吴王阖闾，率军攻破楚国郢都，鞭尸楚平王。后被吴王夫差赐死。',
    achievements: ['破楚鞭尸', '辅吴称霸', '吴王夫差之死'],
    relations: [
      { id: 'bo_pei', type: '仇人', label: '伯嚭（奸臣）' },
      { id: 'gong_zige', type: '荐', label: '专诸（刺客）' },
    ],
    events: ['e_wu_qubo', 'e_wu_fukui']
  },
  {
    id: 'bo_pei', name: '伯嚭', birth: -560, death: -473,
    cat: 'politician', dynasty: '春秋', emoji: '😈',
    location: { lat: 31.5, lng: 121.0, place: '吴国都城（今江苏苏州）' },
    desc: '春秋时期吴国太宰，奸臣。收受越王勾践贿赂，陷害伍子胥，导致其被赐死。吴国灭亡后降越。',
    achievements: [],
    relations: [
      { id: 'wuzixuxu', type: '陷害', label: '伍子胥' },
      { id: 'goujian', type: '勾结', label: '勾践' },
    ],
    events: ['e_wu_fukui']
  },
  {
    id: 'bo_le', name: '伯乐', birth: -680, death: -610,
    cat: 'scholar', dynasty: '春秋', emoji: '🐴',
    location: { lat: 34.5, lng: 112.5, place: '秦国（今陕西一带）' },
    desc: '春秋时期相马名师，以善相马闻名于世。"伯乐相马"典故出自此，与千里马一起比喻发现和推荐人才。',
    achievements: ['相马之术', '伯乐相马'],
    relations: [],
    events: []
  },
  {
    id: 'yangshebo', name: '羊舌肸', birth: -560, death: -524,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 35.5, lng: 112.5, place: '晋国（今山西南部）' },
    desc: '春秋时期晋国大夫，又称叔向。与郑国的子产并称，是当时著名的贤大夫。主张维护旧礼制，但也不反对适度改革。',
    achievements: ['晋国贤大夫'],
    relations: [],
    events: []
  },
  {
    id: 'zichan', name: '子产', birth: -580, death: -522,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 34.7, lng: 113.6, place: '郑国都城（今河南新郑）' },
    desc: '春秋时期郑国名相，推行政治改革，不毁乡校听取民意，铸刑书于鼎，是法家先驱。孔子称赞其为"古之遗爱"。',
    achievements: ['郑国改革', '铸刑书', '不毁乡校'],
    relations: [{ id: 'kongzi', type: '同时代', label: '孔子（同时代人）' }],
    events: []
  },
  {
    id: 'yanping', name: '晏婴', birth: -578, death: -500,
    cat: 'politician', dynasty: '春秋', emoji: '📋',
    location: { lat: 36.6, lng: 116.0, place: '齐国晏城（今山东齐河）' },
    desc: '春秋时期齐国名相，历仕齐灵公、庄公、景公三世。以机智善辩著称，出使楚国时"晏子使楚"典故流传千古。身高不足五尺。',
    achievements: ['晏子使楚', '二桃杀三士', '节俭奉公'],
    relations: [{ id: 'qijinggong', type: '君臣', label: '齐景公' }],
    events: ['e_yanzi_chu']
  },
  {
    id: 'qijinggong', name: '齐景公', birth: -578, death: -490,
    cat: 'emperor', dynasty: '春秋', emoji: '👑',
    location: { lat: 36.8, lng: 118.3, place: '临淄（今山东淄博）' },
    desc: '春秋时期齐国国君，在位58年。前期励精图治，后期奢侈无度。晏婴是其主要辅臣，"二桃杀三士"即出于此时。',
    achievements: ['二桃杀三士'],
    relations: [{ id: 'yanping', type: '君臣', label: '晏婴' }],
    events: ['e_yanzi_chu', 'e_ertao_shasi']
  },
  {
    id: 'linxiangru', name: '蔺相如', birth: -329, death: -283,
    cat: 'diplomat', dynasty: '战国', emoji: '💎',
    location: { lat: 36.8, lng: 114.5, place: '赵国邯郸（今河北邯郸）' },
    desc: '战国时期赵国名相，完璧归赵、渑池之会的主角。与廉颇"将相和"传为千古美谈，体现顾全大局的精神。',
    achievements: ['完璧归赵', '渑池之会', '将相和'],
    relations: [
      { id: 'lianpo', type: '将相和', label: '廉颇（将相和睦）' },
      { id: 'zhaohuiwenwang', type: '君臣', label: '赵惠文王' },
    ],
    events: ['e_wanbi_guishi', 'e_mianchi_huihui']
  },
  {
    id: 'lianpo', name: '廉颇', birth: -327, death: -243,
    cat: 'military', dynasty: '战国', emoji: '⚔️',
    location: { lat: 36.8, lng: 114.5, place: '赵国都城（今河北邯郸）' },
    desc: '战国时期赵国名将，与蔺相如"将相和"传为美谈。老年仍想为国效力，但赵王已不再信任，是英雄末路的典型。',
    achievements: ['大破齐国', '守卫赵国', '将相和'],
    relations: [
      { id: 'linxiangru', type: '将相和', label: '蔺相如' },
    ],
    events: ['e_jiangxianghe']
  },
  {
    id: 'zhaohuiwenwang', name: '赵惠文王', birth: -308, death: -266,
    cat: 'emperor', dynasty: '战国', emoji: '👑',
    location: { lat: 36.8, lng: 114.5, place: '邯郸（今河北邯郸）' },
    desc: '战国时期赵国国君，在位33年。赵国在他统治时期最为强盛，拥有蔺相如、廉颇、平原君等贤臣良将。',
    achievements: ['赵国鼎盛时期'],
    relations: [
      { id: 'linxiangru', type: '君臣', label: '蔺相如' },
      { id: 'lianpo', type: '君臣', label: '廉颇' },
      { id: 'pingyuanjun', type: '君臣', label: '平原君' },
    ],
    events: ['e_wanbi_guishi']
  },
  {
    id: 'pingyuanjun', name: '平原君', birth: -308, death: -251,
    cat: 'politician', dynasty: '战国', emoji: '📋',
    location: { lat: 36.8, lng: 114.5, place: '赵国邯郸（今河北邯郸）' },
    desc: '战国四公子之一，赵国相国。门下食客数千，毛遂自荐的故事即出自其门下。"窃符救赵"的重要参与者。',
    achievements: ['窃符救赵', '毛遂自荐', '门下食客三千'],
    relations: [{ id: 'zhaohuiwenwang', type: '君臣', label: '赵惠文王' }],
    events: ['e_qiebuxiu_zhao']
  },
  {
    id: 'maosui', name: '毛遂', birth: -320, death: -264,
    cat: 'politician', dynasty: '战国', emoji: '📋',
    location: { lat: 36.8, lng: 114.5, place: '赵国（今河北一带）' },
    desc: '战国时期赵国平原君门下食客。三年不鸣，一鸣惊人。公元前260年自荐出使楚国，说服楚王合纵抗秦，"毛遂自荐"典故出自此处。',
    achievements: ['毛遂自荐', '说服楚王'],
    relations: [{ id: 'pingyuanjun', type: '门客', label: '平原君' }],
    events: ['e_maosui_zijian']
  },
  {
    id: 'lübuwei', name: '吕不韦', birth: -292, death: -235,
    cat: 'politician', dynasty: '战国', emoji: '💰',
    location: { lat: 34.3, lng: 113.5, place: '阳翟（今河南禹州）' },
    desc: '战国末期秦國丞相，商人出身。"奇货可居"的典故出自其经历，扶持异人（秦庄襄王）为王，后为秦始皇仲父。组织编写《吕氏春秋》。',
    achievements: ['奇货可居', '编写《吕氏春秋》', '扶持异人'],
    relations: [
      { id: 'qinshihuang', type: '仲父', label: '秦始皇' },
    ],
    events: ['e_qihuo_keju']
  },
  {
    id: 'baiqi', name: '白起', birth: -332, death: -257,
    cat: 'military', dynasty: '战国', emoji: '⚔️',
    location: { lat: 34.3, lng: 108.9, place: '眉县（今陕西眉县）' },
    desc: '战国时期秦国名将，与王翦、李牧、廉颇并称"战国四大名将"。伊阙之战大破韩魏联军，长平之战坑杀赵军四十万，绰号"人屠"。',
    achievements: ['伊阙之战', '长平之战', '人屠'],
    relations: [{ id: 'qinshihuang', type: '君臣', label: '秦始皇' }],
    events: ['e_changping_battle']
  },
  {
    id: 'lianpo2', name: '廉颇', birth: -327, death: -243,
    cat: 'military', dynasty: '战国', emoji: '⚔️',
    location: { lat: 36.8, lng: 114.5, place: '赵国都城（今河北邯郸）' },
    desc: '战国时期赵国名将，与白起、王翦、李牧并称"战国四大名将"。守护赵国，抵御秦军进攻。晚年不被重用，郁郁而终。',
    achievements: ['赵国名将', '抵御秦军'],
    relations: [
      { id: 'linxiangru', type: '将相和', label: '蔺相如' },
    ],
    events: ['e_zhao_qin']
  },
  {
    id: 'liangxiangzi', name: '樗里疾', birth: -300, death: -260,
    cat: 'military', dynasty: '战国', emoji: '⚔️',
    location: { lat: 34.3, lng: 108.9, place: '秦国咸阳（今陕西咸阳）' },
    desc: '战国时期秦国名将，秦惠文王之子。因封地在樗里，称樗里疾，绰号"智囊"。多次率军攻打韩、赵、魏等国，功勋卓著。',
    achievements: ['连横破合纵', '攻打六国'],
    relations: [{ id: 'qinshihuang', type: '宗室', label: '秦始皇（族祖）' }],
    events: []
  },
  {
    id: 'zhaoshe', name: '赵奢', birth: -305, death: -266,
    cat: 'military', dynasty: '战国', emoji: '⚔️',
    location: { lat: 36.8, lng: 114.5, place: '赵国都城（今河北邯郸）' },
    desc: '战国时期赵国名将。阏与之战大败秦军，打破秦军不可战胜的神话，是赵国抗秦的著名将领。其子赵括纸上谈兵，导致长平之败。',
    achievements: ['阏与之战', '大破秦军'],
    relations: [
      { id: 'zhaokuo', type: '父子', label: '赵括（儿子）' },
    ],
    events: ['e_eyue_battle']
  },
  {
    id: 'zhaokuo', name: '赵括', birth: -280, death: -260,
    cat: 'military', dynasty: '战国', emoji: '📋',
    location: { lat: 36.8, lng: 114.5, place: '赵国都城（今河北邯郸）' },
    desc: '战国时期赵国将领，赵奢之子。熟读兵书但缺乏实战经验，长平之战取代廉颇为将，因轻敌冒进被白起大败，四十万赵军被坑杀，"纸上谈兵"典故出自此处。',
    achievements: ['纸上谈兵（负面）'],
    relations: [
      { id: 'zhaoshe', type: '父子', label: '赵奢（父亲）' },
    ],
    events: ['e_changping_battle']
  },
  {
    id: 'weilian', name: '魏冉', birth: -290, death: -264,
    cat: 'politician', dynasty: '战国', emoji: '📋',
    location: { lat: 34.8, lng: 112.5, place: '魏国都城（今河南开封）' },
    desc: '战国时期秦昭襄王之舅，封为穰侯。多次担任秦相，推荐白起为将，四次出任丞相，权倾一时。后被范雎设计免职。',
    achievements: ['推荐白起', '四次为相'],
    relations: [
      { id: 'baiqi', type: '举荐', label: '白起' },
      { id: 'fanju', type: '对立', label: '范雎' },
    ],
    events: []
  },
  {
    id: 'fanju', name: '范雎', birth: -290, death: -255,
    cat: 'politician', dynasty: '战国', emoji: '📋',
    location: { lat: 34.8, lng: 112.5, place: '魏国都城（今河南开封）' },
    desc: '战国时期著名政治家、谋士，原为魏国中大夫，后入秦为相。提出"远交近攻"策略，辅佐秦昭襄王成为秦国实际统治者。',
    achievements: ['远交近攻', '取代魏冉为相'],
    relations: [
      { id: 'weilian', type: '取代', label: '魏冉' },
      { id: 'qinzhaoxiang', type: '君臣', label: '秦昭襄王' },
    ],
    events: []
  },
  {
    id: 'qinzhaoxiang', name: '秦昭襄王', birth: -325, death: -251,
    cat: 'emperor', dynasty: '战国', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '咸阳（今陕西咸阳）' },
    desc: '战国时期秦国国君，在位56年，秦国在位最长的国君之一。重用白起、范雎等文臣武将，大破六国，为秦始皇统一六国奠定基础。',
    achievements: ['长平之战', '奠定统一基础'],
    relations: [
      { id: 'baiqi', type: '君臣', label: '白起' },
      { id: 'fanju', type: '君臣', label: '范雎' },
      { id: 'qinshihuang', type: '曾孙', label: '秦始皇' },
    ],
    events: ['e_changping_battle']
  },
  {
    id: 'piankui', name: '扁鹊', birth: -407, death: -310,
    cat: 'scholar', dynasty: '春秋', emoji: '🏥',
    location: { lat: 36.8, lng: 114.5, place: '渤海郡（今河北任丘）' },
    desc: '春秋战国时期名医，齐国卢医。精通望闻问切四诊法，相传著有《难经》。被后世尊为"脉学之宗"和"中国医学鼻祖"。',
    achievements: ['四诊法', '中医奠基人', '著《难经》'],
    relations: [],
    events: []
  },
  {
    id: 'lubian', name: '鲁班', birth: -507, death: -440,
    cat: 'scholar', dynasty: '春秋', emoji: '🔧',
    location: { lat: 35.5, lng: 116.9, place: '鲁国（今山东滕州）' },
    desc: '春秋时期著名工匠、公输般。被后世尊为"工匠祖师"，发明锯子、曲尺、墨斗等工具，相传云梯、钩强等攻城器械也为其所造。',
    achievements: ['土木工匠祖师', '发明工具'],
    relations: [{ id: 'mozi', type: '对立', label: '墨子（论战）' }],
    events: []
  },
  {
    id: 'mozi', name: '墨子', birth: -470, death: -391,
    cat: 'philosopher', dynasty: '战国', emoji: '⚒️',
    location: { lat: 30.5, lng: 116.5, place: '宋国（一说鲁国）' },
    desc: '墨家学派创始人，提倡"兼爱""非攻""尚贤"等思想，与儒家并称"显学"。精通机械制造，曾为楚攻宋设计防御器械。',
    achievements: ['创立墨家', '兼爱非攻', '机械制造'],
    relations: [
      { id: 'lubian', type: '论战', label: '鲁班（曾与之斗械）' },
      { id: 'kongzi', type: '对立', label: '孔子（学派对立）' },
    ],
    events: []
  },
  {
    id: 'gongshuban', name: '公输般', birth: -507, death: -440,
    cat: 'scholar', dynasty: '春秋', emoji: '🔧',
    location: { lat: 35.5, lng: 116.9, place: '鲁国（今山东滕州）' },
    desc: '即鲁班，古代著名工匠。发明多种工具器械，与墨子论战的故事广为流传，是古代工匠智慧的象征。',
    achievements: ['发明锯子', '工匠祖师'],
    relations: [{ id: 'mozi', type: '论战', label: '墨子' }],
    events: []
  },

  // 秦汉
  {
    id: 'qinshihuang', name: '秦始皇', birth: -259, death: -210,
    cat: 'emperor', dynasty: '秦', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '咸阳（今陕西咸阳）' },
    desc: '中国历史上第一个统一的中央集权国家秦朝的开国皇帝。统一六国，建立皇帝制度，统一文字、度量衡，修建长城，功过争议至今。',
    achievements: ['统一六国', '建立皇帝制度', '统一文字度量衡', '修长城'],
    relations: [
      { id: 'lisi', type: '君臣', label: '李斯（丞相）' },
      { id: 'hanfeizi', type: '影响', label: '韩非子（思想来源）' },
      { id: 'liubang', type: '对立', label: '刘邦（灭秦者）' }
    ],
    events: ['e_liuguotongyi', 'e_changcheng']
  },
  {
    id: 'liubang', name: '刘邦', birth: -256, death: -195,
    cat: 'emperor', dynasty: '汉', emoji: '👑',
    location: { lat: 33.4, lng: 115.6, place: '沛县（今江苏沛县）' },
    desc: '汉朝开国皇帝（汉高祖），出身平民，灭秦后在楚汉之争中战胜项羽，建立汉朝，采用休养生息政策，奠定汉朝基础。',
    achievements: ['建立汉朝', '楚汉之争获胜', '约法三章'],
    relations: [
      { id: 'xiangyu', type: '对立', label: '项羽（楚汉争雄）' },
      { id: 'hanxin', type: '君臣', label: '韩信（大将军）' },
      { id: 'zhanglianghanzu', type: '君臣', label: '张良（谋士）' }
    ],
    events: ['e_chuhanzhanzheng', 'e_han_founded']
  },
  {
    id: 'xiangyu', name: '项羽', birth: -232, death: -202,
    cat: 'military', dynasty: '秦末', emoji: '⚔️',
    location: { lat: 33.4, lng: 118.3, place: '下相（今江苏宿迁）' },
    desc: '秦末起义领袖，西楚霸王。破釜沉舟，巨鹿之战大败秦军；鸿门宴放走刘邦，最终乌江自刎，留下"霸王别姬"千古悲剧。',
    achievements: ['巨鹿之战大破秦军', '推翻秦朝', '西楚霸王'],
    relations: [
      { id: 'liubang', type: '对立', label: '刘邦（楚汉争霸）' },
    ],
    events: ['e_julu', 'e_chuhanzhanzheng', 'e_wujiang']
  },
  {
    id: 'hanxin', name: '韩信', birth: -231, death: -196,
    cat: 'military', dynasty: '汉', emoji: '⚔️',
    location: { lat: 33.8, lng: 117.3, place: '淮阴（今江苏淮安）' },
    desc: '汉初三杰之一，军事天才。胯下之辱、背水一战等典故皆出其身。为汉朝建立立下不世之功，后被吕后杀害。',
    achievements: ['背水一战', '明修栈道暗度陈仓', '辅助汉朝统一'],
    relations: [
      { id: 'liubang', type: '君臣', label: '刘邦（君主）' },
    ],
    events: ['e_chuhanzhanzheng']
  },
  {
    id: 'zhanglianghanzu', name: '张良', birth: -250, death: -186,
    cat: 'politician', dynasty: '汉', emoji: '🧠',
    location: { lat: 33.9, lng: 116.9, place: '颍川城父（今河南郏县）' },
    desc: '汉初三杰之一，足智多谋，被称为"谋圣"。协助刘邦建立汉朝后功成身退，修道养生，是知进退的典范。',
    achievements: ['鸿门宴脱险计', '奠定汉朝基础', '功成身退'],
    relations: [{ id: 'liubang', type: '君臣', label: '刘邦（君主）' }],
    events: ['e_chuhanzhanzheng']
  },
  {
    id: 'wudi_han', name: '汉武帝', birth: -156, death: -87,
    cat: 'emperor', dynasty: '汉', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '西汉第七位皇帝，在位54年。独尊儒术，推恩令削藩，北击匈奴，开辟丝绸之路，设立太学，是汉朝最强盛时期的君主。',
    achievements: ['独尊儒术', '北击匈奴', '开辟丝绸之路', '推恩令'],
    relations: [
      { id: 'weiqing', type: '君臣', label: '卫青（大将军）' },
      { id: 'sima_qian', type: '君臣', label: '司马迁（史官，受腐刑）' },
      { id: 'zhang_qian', type: '君臣', label: '张骞（出使西域）' }
    ],
    events: ['e_xiongnu_war', 'e_silkroad']
  },
  {
    id: 'weiqing', name: '卫青', birth: -140, death: -106,
    cat: 'military', dynasty: '汉', emoji: '⚔️',
    location: { lat: 36.8, lng: 106.2, place: '河东平阳（今山西临汾）' },
    desc: '西汉名将，七次出击匈奴，屡建奇功，收复河套地区，是汉武帝北击匈奴的主要将领，与霍去病并称"帝国双璧"。',
    achievements: ['七击匈奴', '收复河套', '漠北大战'],
    relations: [
      { id: 'wudi_han', type: '君臣', label: '汉武帝（君主）' },
      { id: 'huoqubing', type: '亲属', label: '霍去病（外甥）' }
    ],
    events: ['e_xiongnu_war']
  },
  {
    id: 'huoqubing', name: '霍去病', birth: -140, death: -117,
    cat: 'military', dynasty: '汉', emoji: '🏇',
    location: { lat: 36.8, lng: 106.2, place: '河东平阳（今山西临汾）' },
    desc: '西汉名将，卫青外甥。17岁初上战场便立大功，封冠军侯。"匈奴未灭，何以家为"是其名言，24岁英年早逝。',
    achievements: ['封狼居胥', '六击匈奴', '漠北大战'],
    relations: [
      { id: 'wudi_han', type: '君臣', label: '汉武帝（君主）' },
      { id: 'weiqing', type: '亲属', label: '卫青（舅父）' }
    ],
    events: ['e_xiongnu_war']
  },
  {
    id: 'sima_qian', name: '司马迁', birth: -145, death: -86,
    cat: 'scholar', dynasty: '汉', emoji: '📚',
    location: { lat: 34.3, lng: 108.9, place: '龙门（今陕西韩城）' },
    desc: '西汉史学家，著有《史记》，中国第一部纪传体通史。因为李陵辩护而遭汉武帝腐刑，忍辱负重完成史学巨著，被后世尊为"史圣"。',
    achievements: ['著《史记》', '开创纪传体', '史圣'],
    relations: [{ id: 'wudi_han', type: '君臣/受刑', label: '汉武帝（处以腐刑）' }],
    events: ['e_shiji']
  },
  {
    id: 'zhang_qian', name: '张骞', birth: -164, death: -114,
    cat: 'politician', dynasty: '汉', emoji: '🗺️',
    location: { lat: 34.3, lng: 108.9, place: '汉中城固（今陕西城固）' },
    desc: '西汉外交家、探险家，两次出使西域，打通了联结东西方的丝绸之路，为东西方文化交流做出了不可磨灭的贡献。',
    achievements: ['出使西域', '开辟丝绸之路', '凿空西域'],
    relations: [{ id: 'wudi_han', type: '君臣', label: '汉武帝（遣派使者）' }],
    events: ['e_silkroad']
  },
  {
    id: 'lvhou', name: '吕后', birth: -241, death: -180,
    cat: 'politician', dynasty: '汉', emoji: '👸',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '刘邦皇后，汉朝第一位皇后和皇太后。临朝称制16年，实行休养生息政策，为文景之治奠定基础；但也大开杀戒，诛杀刘氏诸王。',
    achievements: ['临朝称制', '休养生息', '稳定汉初政局'],
    relations: [
      { id: 'liubang', type: '夫妻', label: '刘邦（丈夫）' },
      { id: 'hanxin', type: '仇敌', label: '韩信（被其杀害）' }
    ],
    events: ['e_lvhouzheng']
  },
  {
    id: 'hanwendi', name: '汉文帝', birth: -203, death: -157,
    cat: 'emperor', dynasty: '汉', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '西汉第五位皇帝，励精图治，实行轻徭薄赋、与民休息的政策，开启"文景之治"。废除连坐法，取消肉刑，是中国历史上著名的仁德之君。',
    achievements: ['文景之治', '废除连坐法', '轻徭薄赋', '仁德治国'],
    relations: [
      { id: 'liubang', type: '父子', label: '刘邦（父亲）' },
      { id: 'hanjingdi', type: '父子', label: '汉景帝（儿子）' }
    ],
    events: ['e_wenjing_zhi']
  },
  {
    id: 'hanjingdi', name: '汉景帝', birth: -188, death: -141,
    cat: 'emperor', dynasty: '汉', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '西汉第六位皇帝，继续父亲汉文帝的治国方针，削藩平定七国之乱，开创"文景之治"。为汉武帝的大一统奠定了坚实基础。',
    achievements: ['文景之治', '削藩平叛', '七国之乱'],
    relations: [
      { id: 'hanwendi', type: '父子', label: '汉文帝（父亲）' },
      { id: 'wudi_han', type: '父子', label: '汉武帝（儿子）' }
    ],
    events: ['e_wenjing_zhi', 'e_qiguo_zhibian']
  },
  {
    id: 'dongzhongshu', name: '董仲舒', birth: -179, death: -104,
    cat: 'philosopher', dynasty: '汉', emoji: '📚',
    location: { lat: 34.3, lng: 108.9, place: '广川（今河北景县）' },
    desc: '西汉哲学家、思想家。提出"罢黜百家，独尊儒术"建议，创建今文经学体系，以儒学为正统，对中国后世思想文化影响深远。',
    achievements: ['罢黜百家独尊儒术', '创立今文经学', '天人三策'],
    relations: [{ id: 'wudi_han', type: '君臣', label: '汉武帝（献策）' }],
    events: []
  },
  {
    id: 'simaxiangru', name: '司马相如', birth: -179, death: -117,
    cat: 'scholar', dynasty: '汉', emoji: '✍️',
    location: { lat: 30.6, lng: 103.0, place: '蜀郡成都（今四川成都）' },
    desc: '西汉著名辞赋家，被誉为"辞宗"和"赋圣"。代表作《子虚赋》《上林赋》被汉武帝赏识，与卓文君的爱情故事广为流传。',
    achievements: ['《子虚赋》', '《上林赋》', '与卓文君的爱情'],
    relations: [{ id: 'wudi_han', type: '君臣', label: '汉武帝' }],
    events: []
  },
  {
    id: 'suwu', name: '苏武', birth: -140, death: -60,
    cat: 'diplomat', dynasty: '汉', emoji: '🏳️',
    location: { lat: 36.6, lng: 114.5, place: '杜陵（今陕西西安）' },
    desc: '西汉著名外交家，出使匈奴被扣押十九年，牧羊北海（今贝加尔湖），持节不屈。"苏武牧羊"成为中华民族忠贞不屈的象征。',
    achievements: ['持节牧羊十九年', '苏武牧羊', '忠贞不屈'],
    relations: [{ id: 'wudi_han', type: '君臣', label: '汉武帝' }],
    events: []
  },
  {
    id: 'liguang', name: '李广', birth: -184, death: -119,
    cat: 'military', dynasty: '汉', emoji: '🏹',
    location: { lat: 36.8, lng: 106.2, place: '陇西成纪（今甘肃静宁）' },
    desc: '西汉名将，人称"飞将军"。与匈奴大小七十余战，未逢封侯之机，悲愤自刎。"冯唐易老，李广难封"成为千古遗憾。',
    achievements: ['飞将军', '大小七十余战', '镇守边关'],
    relations: [
      { id: 'wudi_han', type: '君臣', label: '汉武帝' },
      { id: 'weiqing', type: '同僚', label: '卫青' }
    ],
    events: ['e_xiongnu_war']
  },
  {
    id: 'wangmang', name: '王莽', birth: -45, death: 23,
    cat: 'politician', dynasty: '新', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '魏郡元城（今河北大名）' },
    desc: '西汉外戚王氏家族成员，以外戚专权，后篡汉建立新朝。推行托古改制，改革币制，最终引发绿林赤眉起义，被杀身亡。',
    achievements: ['篡汉建新', '托古改制'],
    relations: [
      { id: 'liuxuan', type: '篡位', label: '汉平帝' },
      { id: 'liuxiu', type: '对立', label: '刘秀（推翻新朝）' }
    ],
    events: ['e_wangmang_gaizhi', 'e_huanyang_zhiyi']
  },

  // 三国
  {
    id: 'caocao', name: '曹操', birth: 155, death: 220,
    cat: 'emperor', dynasty: '三国', emoji: '⚔️',
    location: { lat: 34.6, lng: 112.4, place: '沛国谯县（今安徽亳州）' },
    desc: '三国时期曹魏的奠基者，杰出的政治家、军事家、文学家。挟天子以令诸侯，统一北方，赤壁之战失败后与刘备孙权三分天下。',
    achievements: ['统一北方', '文学成就', '屯田制', '挟天子以令诸侯'],
    relations: [
      { id: 'liubei', type: '对立', label: '刘备（主要对手）' },
      { id: 'sunquan', type: '对立', label: '孙权（赤壁对手）' },
      { id: 'zhuge_liang', type: '对立', label: '诸葛亮（主要对手）' }
    ],
    events: ['e_chibi', 'e_guandu']
  },
  {
    id: 'liubei', name: '刘备', birth: 161, death: 223,
    cat: 'emperor', dynasty: '三国', emoji: '👑',
    location: { lat: 30.7, lng: 104.0, place: '涿郡（今河北涿州）' },
    desc: '蜀汉开国皇帝，汉室宗亲。三顾茅庐得诸葛亮，联孙抗曹，赤壁之战后建立蜀汉，仁义之名广为人知。',
    achievements: ['建立蜀汉', '三顾茅庐', '联吴抗曹'],
    relations: [
      { id: 'zhuge_liang', type: '君臣', label: '诸葛亮（军师）' },
      { id: 'caocao', type: '对立', label: '曹操（主要对手）' },
      { id: 'guanyu', type: '结义', label: '关羽（义兄弟）' },
      { id: 'zhangfei', type: '结义', label: '张飞（义兄弟）' }
    ],
    events: ['e_chibi', 'e_shu_founded']
  },
  {
    id: 'zhuge_liang', name: '诸葛亮', birth: 181, death: 234,
    cat: 'politician', dynasty: '三国', emoji: '🪁',
    location: { lat: 32.0, lng: 112.2, place: '琅琊阳都（今山东临沂沂南）' },
    desc: '三国时期蜀汉丞相，杰出的政治家、军事家、发明家。隆中对三分天下之策，六出祁山北伐，"鞠躬尽瘁死而后已"是其一生写照。',
    achievements: ['隆中对', '赤壁之战', '六出祁山', '发明木牛流马', '八阵图'],
    relations: [
      { id: 'liubei', type: '君臣', label: '刘备（君主）' },
      { id: 'caocao', type: '对立', label: '曹操（对手）' },
      { id: 'zhouyu', type: '对立/同盟', label: '周瑜（联合赤壁）' }
    ],
    events: ['e_chibi', 'e_beifa']
  },
  {
    id: 'guanyu', name: '关羽', birth: 162, death: 220,
    cat: 'military', dynasty: '三国', emoji: '🔴',
    location: { lat: 30.7, lng: 104.0, place: '河东解良（今山西运城）' },
    desc: '三国时期蜀汉名将，与刘备张飞桃园三结义。忠义之名天下皆知，被后世尊为"武圣"、"关帝"，是中国民间信仰中的重要神祇。',
    achievements: ['过五关斩六将', '水淹七军', '斩颜良文丑'],
    relations: [
      { id: 'liubei', type: '结义', label: '刘备（大哥）' },
      { id: 'zhangfei', type: '结义', label: '张飞（结义兄弟）' }
    ],
    events: []
  },
  {
    id: 'zhangfei', name: '张飞', birth: 167, death: 221,
    cat: 'military', dynasty: '三国', emoji: '⚔️',
    location: { lat: 32.4, lng: 105.7, place: '涿郡（今河北涿州）' },
    desc: '三国时期蜀汉名将，桃园三结义之一。勇猛彪悍，当阳桥头一声怒吼退曹兵，是威猛武将的代表。',
    achievements: ['长坂坡独退曹军', '义释严颜'],
    relations: [
      { id: 'liubei', type: '结义', label: '刘备（大哥）' },
      { id: 'guanyu', type: '结义', label: '关羽（结义兄弟）' }
    ],
    events: []
  },
  {
    id: 'zhouyu', name: '周瑜', birth: 175, death: 210,
    cat: 'military', dynasty: '三国', emoji: '🎵',
    location: { lat: 31.9, lng: 119.5, place: '庐江舒城（今安徽舒城）' },
    desc: '东吴名将，赤壁之战主要指挥者，以少胜多击败曹操。"既生瑜，何生亮"表达了他与诸葛亮之间的恩怨情仇，英年早逝。',
    achievements: ['赤壁之战', '统领东吴水军'],
    relations: [
      { id: 'zhuge_liang', type: '对立/同盟', label: '诸葛亮（赤壁合作又相争）' },
      { id: 'sunquan', type: '君臣', label: '孙权（君主）' }
    ],
    events: ['e_chibi']
  },
  {
    id: 'sunquan', name: '孙权', birth: 182, death: 252,
    cat: 'emperor', dynasty: '三国', emoji: '👑',
    location: { lat: 32.0, lng: 118.8, place: '吴郡富春（今浙江富阳）' },
    desc: '东吴开国皇帝，继承父兄基业，联蜀抗曹，赤壁之战大败曹操。在位期间开发江东，遣使出海，促进航海事业。',
    achievements: ['建立东吴', '联蜀抗曹', '开发江东'],
    relations: [
      { id: 'caocao', type: '对立', label: '曹操（赤壁对手）' },
      { id: 'zhouyu', type: '君臣', label: '周瑜（大将）' }
    ],
    events: ['e_chibi']
  },

  // ==================== 东汉 ====================
  {
    id: 'liuxiu', name: '汉光武帝', birth: -5, death: 57,
    cat: 'emperor', dynasty: '汉', emoji: '👑',
    location: { lat: 33.0, lng: 112.5, place: '南阳蔡阳（今湖北枣阳）' },
    desc: '东汉开国皇帝，汉高祖刘邦九世孙。在绿林起义中起兵，推翻王莽政权，统一天下，重建汉朝，史称"光武中兴"。',
    achievements: ['建立东汉', '光武中兴', '统一天下'],
    relations: [
      { id: 'wangmang', type: '对立', label: '王莽（推翻其统治）' }
    ],
    events: ['e_guangwu_zhongxing']
  },
  {
    id: 'banchao', name: '班超', birth: 32, death: 102,
    cat: 'military', dynasty: '汉', emoji: '⚔️',
    location: { lat: 39.9, lng: 116.4, place: '扶风平陵（今陕西咸阳）' },
    desc: '东汉著名军事家、外交家，班固之弟。投笔从戎，出使西域三十一年，平定西域五十余国，维护了东汉对西域的统治。',
    achievements: ['投笔从戎', '平定西域', '经营西域三十一年'],
    relations: [
      { id: 'banguda', type: '兄弟', label: '班固（兄长）' }
    ],
    events: ['e_xinjiang_peace']
  },
  {
    id: 'banguda', name: '班固', birth: 32, death: 92,
    cat: 'scholar', dynasty: '汉', emoji: '📚',
    location: { lat: 39.9, lng: 116.4, place: '扶风平陵（今陕西咸阳）' },
    desc: '东汉史学家，继承父志撰写《汉书》，是中国第一部纪传体断代史。与司马迁《史记》并称"史汉"。',
    achievements: ['著《汉书》', '中国第一部断代史'],
    relations: [
      { id: 'banchao', type: '兄弟', label: '班超（弟弟）' }
    ],
    events: []
  },
  {
    id: 'canglun', name: '蔡伦', birth: 63, death: 121,
    cat: 'inventor', dynasty: '汉', emoji: '🔧',
    location: { lat: 26.9, lng: 111.3, place: '桂阳耒阳（今湖南耒阳）' },
    desc: '东汉宦官，发明改进造纸术，用树皮、麻头、破布、旧鱼网为原料造纸，被称为"蔡侯纸"，对世界文明做出巨大贡献。',
    achievements: ['改进造纸术', '蔡侯纸', '四大发明之一'],
    relations: [],
    events: []
  },
  {
    id: 'zhangheng', name: '张衡', birth: 78, death: 139,
    cat: 'scholar', dynasty: '汉', emoji: '🔭',
    location: { lat: 33.0, lng: 112.5, place: '南阳西鄂（今河南南阳）' },
    desc: '东汉著名科学家、文学家，发明浑天仪和地动仪，绘制《灵宪图》，在天文、历法、数学、机械制造等方面都有杰出贡献。',
    achievements: ['发明地动仪', '发明浑天仪', '绘制星图', '科学家'],
    relations: [],
    events: []
  },
  {
    id: 'huatuo', name: '华佗', birth: 145, death: 208,
    cat: 'scholar', dynasty: '汉', emoji: '🏥',
    location: { lat: 33.8, lng: 115.8, place: '沛国谯县（今安徽亳州）' },
    desc: '东汉末年著名医学家，被称为"外科鼻祖"和"神医"。发明麻沸散（麻醉药），开创外科手术；创编五禽戏健身法。',
    achievements: ['麻沸散', '五禽戏', '外科手术', '神医'],
    relations: [{ id: 'caocao', type: '就医', label: '曹操（为其治头风）' }],
    events: []
  },
  {
    id: 'zhangzhongjing', name: '张仲景', birth: 150, death: 219,
    cat: 'scholar', dynasty: '汉', emoji: '🏥',
    location: { lat: 33.0, lng: 112.5, place: '南阳涅阳（今河南邓州）' },
    desc: '东汉著名医学家，被尊为"医圣"。著《伤寒杂病论》，确立中医辨证论治原则，是中医四大经典之一。',
    achievements: ['著《伤寒杂病论》', '医圣', '确立辨证论治'],
    relations: [],
    events: []
  },
  {
    id: 'simayimin', name: '司马懿', birth: 179, death: 251,
    cat: 'politician', dynasty: '三国', emoji: '🧠',
    location: { lat: 34.6, lng: 112.4, place: '河内温县（今河南温县）' },
    desc: '三国时期曹魏权臣，政治家、军事家。辅佐曹丕、曹睿、曹芳三代，装病骗过诸葛亮，“高平陵之变”后掌控曹魏大权。',
    achievements: ['高平陵之变', '抵御蜀汉', '子孙建立西晋'],
    relations: [
      { id: 'caocao', type: '君臣', label: '曹操' },
      { id: 'zhuge_liang', type: '对立', label: '诸葛亮（老对手）' }
    ],
    events: ['e_gaopingling']
  },
  {
    id: 'zhouyu2', name: '周瑜', birth: 175, death: 210,
    cat: 'military', dynasty: '三国', emoji: '⚔️',
    location: { lat: 33.0, lng: 119.8, place: '庐江舒县（今安徽舒城）' },
    desc: '东吴名将，与孙权之妹孙小妹成婚。赤壁之战主战派，力劝孙权联合刘备，大败曹操。"谈笑间，樯橹灰飞烟灭"正是其风采。',
    achievements: ['赤壁之战主将', '火烧曹营', '年少有为'],
    relations: [
      { id: 'sunquan', type: '君臣', label: '孙权' },
      { id: 'caocao', type: '对立', label: '曹操' }
    ],
    events: ['e_chibi']
  },
  {
    id: 'zhaoyun', name: '赵云', birth: 161, death: 229,
    cat: 'military', dynasty: '三国', emoji: '⚔️',
    location: { lat: 38.1, lng: 114.6, place: '常山真定（今河北正定）' },
    desc: '赵云（？—229年），字子龙，常山真定（今河北正定）人。三国时期蜀汉名将，与关羽、张飞并称"燕南三士"。初从公孙瓒，后归刘备，追随刘备近三十年。长坂坡之战中单骑冲入曹军重围，救出幼主刘禅，威震天下。汉水之战以寡敌众，大破曹军，刘备赞其"一身都是胆"。赵云不仅是勇将，更有政治远见，曾劝谏刘备不要伐吴、不要分田宅于功臣，展现了儒将风范。诸葛亮北伐时，赵云以年迈之身力战退敌，229年病逝，追谥顺平侯。',
    achievements: ['长坂坡单骑救主', '截江夺阿斗', '汉水之战大破曹军', '一身都是胆', '劝谏刘备勿伐吴'],
    relations: [
      { id: 'liubei', type: '君臣', label: '刘备' }
    ],
    events: []
  },
  {
    id: 'zhangliao', name: '张辽', birth: 169, death: 222,
    cat: 'military', dynasty: '三国', emoji: '⚔️',
    location: { lat: 31.8, lng: 117.2, place: '雁门马邑（今山西朔州）' },
    desc: '三国时期曹魏名将，威震逍遥津。以八百精兵大破孙权十万大军，吓得小儿不敢夜啼，是曹操麾下最勇猛的将领之一。',
    achievements: ['威震逍遥津', '大破孙权', '五子良将之首'],
    relations: [
      { id: 'caocao', type: '君臣', label: '曹操' }
    ],
    events: []
  },
  {
    id: 'lvbu', name: '吕布', birth: 151, death: 198,
    cat: 'military', dynasty: '三国', emoji: '⚔️',
    location: { lat: 37.4, lng: 121.4, place: '五原郡九原（今内蒙古包头）' },
    desc: '三国时期猛将，骑射无双，号为"飞将"。先后背叛丁原、董卓，后割据徐州，曹操在下邳将其擒杀。',
    achievements: ['辕门射戟', '虎牢关三英战吕布'],
    relations: [
      { id: 'caocao', type: '对立', label: '曹操' }
    ],
    events: []
  },
  {
    id: 'jiangwei', name: '姜维', birth: 202, death: 264,
    cat: 'military', dynasty: '三国', emoji: '⚔️',
    location: { lat: 32.0, lng: 105.6, place: '天水冀县（今甘肃甘谷）' },
    desc: '三国时期蜀汉名将，诸葛亮继承人。继承诸葛亮北伐遗志，九伐中原，忠于蜀汉至死，是蜀汉最后的守护者。',
    achievements: ['九伐中原', '继承诸葛亮北伐', '蜀汉最后的忠臣'],
    relations: [
      { id: 'zhuge_liang', type: '师承', label: '诸葛亮' },
      { id: 'liushan', type: '君臣', label: '刘禅' }
    ],
    events: []
  },

  // ==================== 两晋 ====================
  {
    id: 'sima_yan', name: '晋武帝', birth: 236, death: 290,
    cat: 'emperor', dynasty: '晋', emoji: '👑',
    location: { lat: 34.6, lng: 112.4, place: '河内温县（今河南温县）' },
    desc: '司马昭之子，晋朝开国皇帝。逼迫魏元帝禅让，建立晋朝，后统一三国（280年）。晚年昏聩，引发八王之乱。',
    achievements: ['建立晋朝', '统一三国', '太康之治'],
    relations: [
      { id: 'simayimin', type: '祖孙', label: '司马懿（祖父）' }
    ],
    events: ['e_jin_unified', 'e_bawang_zhiluan']
  },
  {
    id: 'wangxizhi', name: '王羲之', birth: 303, death: 361,
    cat: 'artist', dynasty: '晋', emoji: '✍️',
    location: { lat: 30.3, lng: 120.2, place: '琅琊临沂（今山东临沂）' },
    desc: '东晋著名书法家，被誉为"书圣"。其书法《兰亭集序》被誉为"天下第一行书"，对后世书法影响极其深远。',
    achievements: ['书圣', '《兰亭集序》', '天下第一行书'],
    relations: [],
    events: []
  },
  {
    id: 'xie_an', name: '谢安', birth: 320, death: 385,
    cat: 'politician', dynasty: '晋', emoji: '🧠',
    location: { lat: 31.6, lng: 120.3, place: '陈郡阳夏（今河南太康）' },
    desc: '东晋著名政治家、军事家。淝水之战的总指挥，以八万北府兵大破苻坚八十七万大军，是东晋的救星。',
    achievements: ['淝水之战', '东山再起', '稳住东晋'],
    relations: [
      { id: 'xiexuan', type: '兄弟', label: '谢玄（弟弟）' }
    ],
    events: ['e_feishui']
  },
  {
    id: 'xiexuan', name: '谢玄', birth: 343, death: 388,
    cat: 'military', dynasty: '晋', emoji: '⚔️',
    location: { lat: 31.6, lng: 120.3, place: '陈郡阳夏（今河南太康）' },
    desc: '东晋名将，谢安之侄。组建北府兵，在淝水之战中担任先锋，与叔父谢安一起大破前秦苻坚。',
    achievements: ['组建北府兵', '淝水之战先锋'],
    relations: [
      { id: 'xie_an', type: '叔侄', label: '谢安' }
    ],
    events: ['e_feishui']
  },
  {
    id: 'taoyuanming', name: '陶渊明', birth: 365, death: 427,
    cat: 'scholar', dynasty: '晋', emoji: '🍶',
    location: { lat: 29.6, lng: 115.9, place: '江州寻阳（今江西九江）' },
    desc: '东晋著名诗人、辞赋家，中国田园诗的开创者。不愿为五斗米折腰，辞官归隐，写下《桃花源记》《归去来兮辞》等名作。',
    achievements: ['田园诗之祖', '《桃花源记》', '《归去来兮辞》', '不为五斗米折腰'],
    relations: [],
    events: []
  },
  {
    id: 'zuti', name: '祖逖', birth: 266, death: 321,
    cat: 'military', dynasty: '晋', emoji: '⚔️',
    location: { lat: 37.8, lng: 112.7, place: '范阳遒县（今河北涞水）' },
    desc: '东晋名将，"闻鸡起舞"的主人公之一。率部北伐，收复黄河以南地区，但因东晋朝廷不信任，忧愤而死。',
    achievements: ['闻鸡起舞', '北伐中原', '收复失地'],
    relations: [],
    events: []
  },
  {
    id: 'liukun', name: '刘琨', birth: 271, death: 318,
    cat: 'military', dynasty: '晋', emoji: '⚔️',
    location: { lat: 37.8, lng: 112.5, place: '中山魏昌（今河北无极）' },
    desc: '东晋名将，"闻鸡起舞"的另一位主人公。与祖逖是好朋友，并称"祖逖刘琨"，一同立志北伐。',
    achievements: ['闻鸡起舞', '坚守晋阳'],
    relations: [{ id: 'zuti', type: '好友', label: '祖逖' }],
    events: []
  },

  // ==================== 南北朝 ====================
  {
    id: 'liuyu', name: '宋武帝', birth: 363, death: 422,
    cat: 'emperor', dynasty: '南北朝', emoji: '👑',
    location: { lat: 31.3, lng: 120.6, place: '彭城绥舆里（今江苏徐州）' },
    desc: '南朝宋开国皇帝，南北朝时期南朝第一帝。从奴隶到皇帝，灭桓玄、恢复晋朝，后代晋建国，北伐收复黄河以南地区。',
    achievements: ['建立南朝宋', '北伐中原', '从奴隶到皇帝'],
    relations: [],
    events: ['e_southern_dynasty']
  },
  {
    id: 'xiaoyans', name: '梁武帝', birth: 464, death: 549,
    cat: 'emperor', dynasty: '南北朝', emoji: '👑',
    location: { lat: 32.0, lng: 118.8, place: '南兰陵中都里（今江苏丹徒）' },
    desc: '南朝梁开国皇帝，在位48年，前半期政治清明，后半期佞佛误国，导致侯景之乱，最终饿死台城。',
    achievements: ['建立南朝梁', '编《昭明文选》', '大力提倡佛教'],
    relations: [],
    events: ['e_houjing_zhibian']
  },
  {
    id: 'zuchongzhi', name: '祖冲之', birth: 429, death: 500,
    cat: 'scholar', dynasty: '南北朝', emoji: '🔢',
    location: { lat: 32.0, lng: 118.8, place: '范阳遒县（今河北涞水）' },
    desc: '南北朝时期著名科学家，在数学、天文历法和机械制造方面都有杰出贡献。将圆周率精确到小数点后七位，编制《大明历》，发明千里船、水碓磨等。',
    achievements: ['精确圆周率', '编制《大明历》', '发明千里船'],
    relations: [],
    events: []
  },
  {
    id: 'lidaoyuan', name: '郦道元', birth: 472, death: 527,
    cat: 'scholar', dynasty: '南北朝', emoji: '📜',
    location: { lat: 36.6, lng: 114.5, place: '范阳涿县（今河北涿州）' },
    desc: '北魏著名地理学家，著《水经注》，是中国古代最全面、最系统的综合性地理著作，对后世地理学和文学都有深远影响。',
    achievements: ['著《水经注》', '地理学巨著'],
    relations: [],
    events: []
  },

  // ==================== 隋 ====================
  {
    id: 'suiyangdi', name: '隋文帝', birth: 541, death: 604,
    cat: 'emperor', dynasty: '隋', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '大兴城（今陕西西安）' },
    desc: '隋朝开国皇帝，统一南北朝，结束近三百年的分裂局面。创立科举制度，推行三省六部制，修建大运河，为后世留下宝贵遗产。',
    achievements: ['统一南北朝', '创立科举', '修建大运河', '三省六部制'],
    relations: [
      { id: 'suizhou', type: '父子', label: '隋炀帝（儿子）' }
    ],
    events: ['e_sui_founded', 'e_dayunhe']
  },
  {
    id: 'suijiangdi', name: '隋炀帝', birth: 569, death: 618,
    cat: 'emperor', dynasty: '隋', emoji: '💀',
    location: { lat: 34.3, lng: 108.9, place: '大兴城（今陕西西安）' },
    desc: '隋朝第二位皇帝，开凿大运河，三征高句丽，修建东都洛阳。因暴政导致农民起义，隋朝灭亡，被宇文化及缢杀。',
    achievements: ['开凿大运河', '三征高句丽', '修建东都洛阳'],
    relations: [
      { id: 'suiyangdi', type: '父子', label: '隋文帝（父亲）' }
    ],
    events: ['e_dayunhe', 'e_sui_mie']
  },
  {
    id: 'yanzhi', name: '宇文化及', birth: 585, death: 619,
    cat: 'politician', dynasty: '隋', emoji: '😈',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '宇文化及（585年—619年），隋末权臣、叛将。宇文述之子，出身鲜卑贵族。隋炀帝时任右屯卫将军，深得信任。隋末天下大乱，炀帝滞留江都（今江苏扬州），618年宇文化及发动江都之变，缢杀隋炀帝，立秦王杨浩为傀儡皇帝，自任大丞相。随后率军西归，沿途被李密所败，遂弑杨浩自立为帝，国号"许"，年号天寿。619年被窦建德擒获，以弑君之罪斩于襄国（今河北邢台），传首长安。',
    achievements: ['发动江都之变', '缢杀隋炀帝', '建立许国（短暂）'],
    relations: [
      { id: 'suijiangdi', type: '弑', label: '隋炀帝' }
    ],
    events: ['e_sui_mie']
  },

  // 隋唐
  {
    id: 'liyuan', name: '唐高祖李渊', birth: 566, death: 635,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 37.8, lng: 112.5, place: '太原（今山西太原）' },
    desc: '唐朝开国皇帝，趁隋末天下大乱起兵太原，建立唐朝。后被儿子李世民发动玄武门之变夺权，被迫退位为太上皇。',
    achievements: ['建立唐朝', '统一全国'],
    relations: [{ id: 'li_shimin', type: '父子', label: '李世民（儿子/篡位者）' }],
    events: ['e_tang_founded', 'e_xuanwumen']
  },
  {
    id: 'li_shimin', name: '唐太宗', birth: 599, death: 649,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐朝第二位皇帝（唐太宗李世民），发动玄武门之变夺得皇位。开创"贞观之治"，虚心纳谏，国泰民安，是中国历史上最杰出的帝王之一。',
    achievements: ['贞观之治', '虚心纳谏', '平定东突厥', '天可汗'],
    relations: [
      { id: 'liyuan', type: '父子', label: '高祖（父亲）' },
      { id: 'wei_zheng', type: '君臣', label: '魏征（谏臣）' },
      { id: 'wu_zetian', type: '君臣', label: '武则天（侍妾/后继者）' }
    ],
    events: ['e_xuanwumen', 'e_zhenguan']
  },
  {
    id: 'wei_zheng', name: '魏征', birth: 580, death: 643,
    cat: 'politician', dynasty: '唐', emoji: '📜',
    location: { lat: 34.5, lng: 113.0, place: '魏州曲城（今河北大名）' },
    desc: '唐太宗时期著名谏臣，敢于直言进谏二百余次，是"贞观之治"的重要功臣。以铜为镜可正衣冠，以人为镜可知得失，是太宗的一面镜子。',
    achievements: ['直言进谏', '参与修史', '贞观之治重要辅臣'],
    relations: [{ id: 'li_shimin', type: '君臣', label: '太宗（君主）' }],
    events: ['e_zhenguan']
  },
  {
    id: 'wu_zetian', name: '武则天', birth: 624, death: 705,
    cat: 'emperor', dynasty: '唐', emoji: '👸',
    location: { lat: 34.7, lng: 112.4, place: '利州（今四川广元）' },
    desc: '中国历史上唯一正式登基的女皇帝，改唐为周，在位15年。重视科举，广开言路，其统治期间国力持续增强，史称"武周之治"。',
    achievements: ['中国唯一女皇', '发展科举', '武周之治'],
    relations: [
      { id: 'li_shimin', type: '君臣/情', label: '太宗（最初侍妾）' },
      { id: 'xuanzong', type: '祖孙', label: '玄宗（孙子）' }
    ],
    events: ['e_wu_jidi']
  },
  {
    id: 'xuanzong', name: '唐玄宗', birth: 685, death: 762,
    cat: 'emperor', dynasty: '唐', emoji: '🎭',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐朝第六位皇帝，前期励精图治，开创"开元盛世"，使唐朝达到鼎盛；后期宠爱杨贵妃，重用安禄山，酿成安史之乱，盛唐走向衰落。',
    achievements: ['开元盛世', '重视文艺音乐', '唐朝鼎盛期'],
    relations: [
      { id: 'yang_guifei', type: '情', label: '杨贵妃（宠妃）' },
      { id: 'li_bai', type: '赏识', label: '李白（供奉翰林）' }
    ],
    events: ['e_kaiyuan', 'e_anshi']
  },
  {
    id: 'yang_guifei', name: '杨贵妃', birth: 719, death: 756,
    cat: 'artist', dynasty: '唐', emoji: '💃',
    location: { lat: 34.1, lng: 107.0, place: '蒲州永乐（今山西永济）' },
    desc: '唐玄宗宠妃，中国古代四大美女之一。安史之乱中在马嵬驿被迫自缢，留下了"汉皇重色思倾国"的千古传奇。',
    achievements: ['四大美女之一', '安史之乱导火索'],
    relations: [{ id: 'xuanzong', type: '情', label: '玄宗（宠爱她的皇帝）' }],
    events: ['e_anshi']
  },
  {
    id: 'li_bai', name: '李白', birth: 701, death: 762,
    cat: 'scholar', dynasty: '唐', emoji: '🍷',
    location: { lat: 31.2, lng: 121.4, place: '碎叶城（今吉尔吉斯斯坦托克马克），后寓居四川江油' },
    desc: '唐代著名诗人，字太白，号青莲居士，被誉为"诗仙"。一生豪放不羁，留下大量脍炙人口的诗歌，如《静夜思》《将进酒》等。',
    achievements: ['诗仙', '《将进酒》', '《静夜思》', '翰林供奉'],
    relations: [
      { id: 'du_fu', type: '友情', label: '杜甫（诗坛挚友）' },
      { id: 'xuanzong', type: '君臣', label: '玄宗（供奉翰林）' }
    ],
    events: []
  },
  {
    id: 'du_fu', name: '杜甫', birth: 712, death: 770,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 30.9, lng: 103.8, place: '河南巩县（今河南巩义）' },
    desc: '唐代著名诗人，字子美，被誉为"诗圣"。一生颠沛流离，其诗忧国忧民，被称为"诗史"，代表作有《春望》《三吏》《三别》等。',
    achievements: ['诗圣', '诗史', '《春望》', '《茅屋为秋风所破歌》'],
    relations: [{ id: 'li_bai', type: '友情', label: '李白（诗坛挚友）' }],
    events: []
  },
  {
    id: 'fang_xuanling', name: '房玄龄', birth: 579, death: 648,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 37.8, lng: 112.5, place: '齐州临淄（今山东临淄）' },
    desc: '唐太宗时期宰相，善于谋略，与杜如晦并称"房杜"，是贞观之治的主要辅臣。辅佐李世民夺取帝位，为相二十四年。',
    achievements: ['贞观之治', '房谋杜断', '辅佐李世民登基'],
    relations: [
      { id: 'li_shimin', type: '君臣', label: '唐太宗' },
      { id: 'du_ruhu', type: '同僚', label: '杜如晦（并称房杜）' }
    ],
    events: ['e_zhenguan']
  },
  {
    id: 'du_ruhu', name: '杜如晦', birth: 585, death: 630,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '京兆杜陵（今陕西西安）' },
    desc: '唐太宗时期宰相，善于决断，与房玄龄并称"房杜"。参与玄武门之变，帮助李世民夺取帝位，英年早逝。',
    achievements: ['玄武门之变', '房谋杜断'],
    relations: [
      { id: 'li_shimin', type: '君臣', label: '唐太宗' }
    ],
    events: ['e_xuanwumen', 'e_zhenguan']
  },
  {
    id: 'lichengxiang', name: '长孙无忌', birth: 594, death: 659,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '河南洛阳' },
    desc: '唐太宗皇后长孙氏之兄，唐朝开国功臣。参与玄武门之变，后辅佐唐高宗，被武则天迫害而死。',
    achievements: ['玄武门之变', '辅佐三朝'],
    relations: [
      { id: 'li_shimin', type: '舅兄', label: '唐太宗' }
    ],
    events: ['e_xuanwumen']
  },
  {
    id: 'lijing', name: '李靖', birth: 571, death: 649,
    cat: 'military', dynasty: '唐', emoji: '⚔️',
    location: { lat: 34.3, lng: 108.9, place: '京兆三原（今陕西三原）' },
    desc: '唐朝著名军事家，屡立战功。平定东突厥、讨伐吐谷浑，被李渊赞为"韩、白、王、卫不及也"。',
    achievements: ['平定东突厥', '讨伐吐谷浑', '军神'],
    relations: [
      { id: 'li_shimin', type: '君臣', label: '唐太宗' }
    ],
    events: ['e_zhenguan']
  },
  {
    id: 'lishimin', name: '李世勣', birth: 594, death: 669,
    cat: 'military', dynasty: '唐', emoji: '⚔️',
    location: { lat: 37.8, lng: 112.5, place: '离狐（今山东鄄城）' },
    desc: '唐朝开国功臣，原名徐世勣，李渊赐姓李。随李世民平定四方，破东突厥、薛延陀、高句丽，是贞观年间主要将领。',
    achievements: ['破东突厥', '平薛延陀', '三朝元老'],
    relations: [
      { id: 'li_shimin', type: '君臣', label: '唐太宗' }
    ],
    events: ['e_zhenguan']
  },
  {
    id: 'qinqiong', name: '秦琼', birth: 598, death: 638,
    cat: 'military', dynasty: '唐', emoji: '⚔️',
    location: { lat: 36.7, lng: 119.4, place: '齐州历城（今山东济南）' },
    desc: '唐朝开国功臣，凌烟阁二十四功臣之一。勇猛善战，为秦王李世民夺取帝位立下汗马功劳。与尉迟恭一起被供奉为门神。',
    achievements: ['凌烟阁二十四功臣', '门神之一'],
    relations: [
      { id: 'li_shimin', type: '君臣', label: '秦王李世民' }
    ],
    events: ['e_tang_founded']
  },
  {
    id: 'yuchigong', name: '尉迟恭', birth: 585, death: 658,
    cat: 'military', dynasty: '唐', emoji: '⚔️',
    location: { lat: 39.9, lng: 114.5, place: '朔州善阳（今山西朔州）' },
    desc: '唐朝开国功臣，凌烟阁二十四功臣之一。本为刘武周部将，后归顺李世民。勇冠三军，在玄武门之变中发挥重要作用。',
    achievements: ['凌烟阁二十四功臣', '门神之一'],
    relations: [
      { id: 'li_shimin', type: '君臣', label: '秦王李世民' }
    ],
    events: ['e_xuanwumen']
  },
  {
    id: 'xuanzang', name: '玄奘', birth: 602, death: 664,
    cat: 'scholar', dynasty: '唐', emoji: '🙏',
    location: { lat: 34.3, lng: 108.9, place: '洛州缑氏（今河南偃师）' },
    desc: '唐代著名高僧，佛经翻译家。贞观年间西行取经，历经十七年，带回佛经六百余部，是中国佛教史上的传奇人物。《西游记》中唐僧的原型。',
    achievements: ['西天取经', '翻译佛经', '《大唐西域记》'],
    relations: [
      { id: 'li_shimin', type: '受到', label: '唐太宗（支持取经）' }
    ],
    events: ['e_xuanzang_trip']
  },
  {
    id: 'liuyizhou', name: '刘禹锡', birth: 772, death: 842,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 34.3, lng: 108.9, place: '洛阳（含籍贯浙江嘉兴）' },
    desc: '唐代著名诗人、文学家、哲学家，有"诗豪"之称。参与王叔文政治革新（永贞革新），失败后被贬谪二十余年。与白居易并称"刘白"，与柳宗元并称"刘柳"。代表作《陋室铭》《竹枝词》《乌衣巷》等。',
    achievements: ['诗豪', '《陋室铭》', '永贞革新', '刘白齐名'],
    relations: [
      { id: 'baijuyi', type: '友情', label: '白居易' }
    ],
    events: []
  },
  {
    id: 'baijuyi', name: '白居易', birth: 772, death: 846,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 34.7, lng: 113.6, place: '下邽（今陕西渭南）' },
    desc: '唐代著名诗人，字乐天，号香山居士。倡导新乐府运动，诗作通俗易懂，代表作《长恨歌》《琵琶行》等。',
    achievements: ['新乐府运动', '《长恨歌》', '《琵琶行》', '诗魔'],
    relations: [
      { id: 'liuyizhou', type: '友情', label: '刘禹锡' }
    ],
    events: []
  },
  {
    id: 'hansan', name: '韩愈', birth: 768, death: 824,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 23.4, lng: 116.6, place: '昌黎（今河南孟州）' },
    desc: '唐代文学家、思想家，唐宋八大家之首。倡导古文运动，反对六朝骈文，主张文以载道。代表作《师说》《祭十二郎文》等。',
    achievements: ['古文运动', '唐宋八大家之首', '《师说》'],
    relations: [],
    events: []
  },
  {
    id: 'liushangyin', name: '李商隐', birth: 813, death: 858,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 30.6, lng: 104.0, place: '怀州河内（今河南沁阳）' },
    desc: '晚唐著名诗人，与杜牧并称"小李杜"。诗作深情绵邈，多用典故，无题诗堪称一绝。代表作《无题》《锦瑟》等。',
    achievements: ['小李杜', '《无题》诗', '深情绵邈'],
    relations: [
      { id: 'dumu', type: '友情', label: '杜牧' }
    ],
    events: []
  },
  {
    id: 'dumu', name: '杜牧', birth: 803, death: 852,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 33.0, lng: 115.6, place: '京兆万年（今陕西西安）' },
    desc: '晚唐著名诗人，与李商隐并称"小李杜"。诗风俊爽明丽，《阿房宫赋》传颂千古。代表作《泊秦淮》《山行》等。',
    achievements: ['小李杜', '《阿房宫赋》', '俊爽诗风'],
    relations: [
      { id: 'liushangyin', type: '友情', label: '李商隐' }
    ],
    events: []
  },
  {
    id: 'guozhen', name: '郭子仪', birth: 697, death: 781,
    cat: 'military', dynasty: '唐', emoji: '⚔️',
    location: { lat: 34.3, lng: 108.9, place: '华州郑县（今陕西华县）' },
    desc: '唐代名将，平定安史之乱的主要功臣。戎马一生，功高望重，被封为汾阳王，平安史之乱，收复两京。',
    achievements: ['平定安史之乱', '收复两京', '汾阳王'],
    relations: [
      { id: 'xuanzong', type: '君臣', label: '唐玄宗' }
    ],
    events: ['e_anshi']
  },
  {
    id: 'lichengan', name: '李光弼', birth: 727, death: 779,
    cat: 'military', dynasty: '唐', emoji: '⚔️',
    location: { lat: 22.2, lng: 112.5, place: '营州柳城（今辽宁朝阳）' },
    desc: '唐代名将，与郭子仪并称"郭李"。平定安史之乱的主要功臣，在太原之战中以少胜多，大破史思明叛军。',
    achievements: ['太原之战', '大破史思明', '平定安史之乱'],
    relations: [],
    events: ['e_anshi']
  },
  {
    id: 'peiquei', name: '裴度', birth: 765, death: 839,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.7, lng: 113.6, place: '河东闻喜（今山西闻喜）' },
    desc: '唐代名相，辅佐唐宪宗平定淮西之乱，元和中兴的主要功臣。与裴度同时代的还有韩愈、白居易等。',
    achievements: ['平定淮西之乱', '元和中兴', '名相'],
    relations: [],
    events: []
  },
  {
    id: 'lifuguo', name: '李辅国', birth: 704, death: 762,
    cat: 'politician', dynasty: '唐', emoji: '😈',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐代权阉，本名静忠，安史之乱中劝太子李亨即位（即唐肃宗），掌握禁军，权倾朝野。肃宗病重时杀张皇后，拥立代宗。代宗即位后被尊为"尚父"，旋即被代宗派人刺杀，是唐代宦官专权的开端。',
    achievements: ['拥立肃宗', '拥立代宗', '唐代宦官专权之始'],
    relations: [
      { id: 'xuanzong', type: '胁迫', label: '唐玄宗' }
    ],
    events: ['e_anshi']
  },
  {
    id: 'gaozong_tang', name: '唐高宗', birth: 628, death: 683,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐朝第三位皇帝，在位34年。继续贞观之治的繁荣，但在后期大权旁落于武则天。',
    achievements: ['永徽之治', '继续贞观之治'],
    relations: [
      { id: 'li_shimin', type: '父子', label: '唐太宗（父亲）' },
      { id: 'wu_zetian', type: '夫妻', label: '武则天（皇后）' }
    ],
    events: []
  },

  // ==================== 晚唐（安史之乱后） ====================
  {
    id: 'suzong', name: '唐肃宗', birth: 711, death: 762,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '灵武（今宁夏灵武）' },
    desc: '唐玄宗第三子，安史之乱中在灵武即位，遥尊玄宗为太上皇。倚重郭子仪、李光弼等将领平叛，收复长安、洛阳两京。但在位期间宦官李辅国、程元振专权，张皇后干政，朝政混乱。762年病逝，在位仅6年。',
    achievements: ['灵武即位', '收复两京', '平定安史之乱'],
    relations: [
      { id: 'xuanzong', type: '父子', label: '唐玄宗（父亲）' },
      { id: 'guozhen', type: '君臣', label: '郭子仪' },
      { id: 'lifuguo', type: '被控制', label: '李辅国' }
    ],
    events: ['e_anshi']
  },
  {
    id: 'daizong', name: '唐代宗', birth: 727, death: 779,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐肃宗长子，安史之乱末期即位。763年吐蕃攻入长安，代宗出逃，后赖郭子仪收复。在位期间始定"两税法"雏形，以宦官程元振、鱼朝恩典禁军，藩镇割据日益严重，河北三镇（魏博、成德、卢龙）事实上独立。',
    achievements: ['平定安史残余', '两税法雏形'],
    relations: [
      { id: 'suzong', type: '父子', label: '唐肃宗（父亲）' },
      { id: 'guozhen', type: '君臣', label: '郭子仪' }
    ],
    events: []
  },
  {
    id: 'de_zong', name: '唐德宗', birth: 742, death: 805,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐代宗长子，在位26年。初期试图削藩，引发"四镇之乱"和"泾原兵变"，被迫出逃奉天（今陕西乾县）。后推行两税法改革，由宰相杨炎主导，是中国赋税制度重大变革。晚年信任宦官，以窦文场、霍仙鸣典禁军，宦官专权制度化。',
    achievements: ['推行两税法', '削藩失败'],
    relations: [],
    events: []
  },
  {
    id: 'yangyan', name: '杨炎', birth: 727, death: 781,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '凤翔（今陕西凤翔）' },
    desc: '唐代改革家、宰相，两税法的创立者。建中元年（780年）提出并推行两税法，以资产为本、按夏秋两季征税，取代租庸调制，是中国赋税史上的里程碑。后因与卢杞争权被贬赐死。',
    achievements: ['创立两税法', '赋税制度改革'],
    relations: [],
    events: []
  },
  {
    id: 'xianzong', name: '唐宪宗', birth: 778, death: 820,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐朝中期最有作为的皇帝之一，在位15年。以"元和中兴"著称，决心削藩，先后平定西川刘辟、镇海李锜、淮西吴元济、淄青李师道等藩镇叛乱，一度恢复中央权威，使藩镇暂时服从。但晚年信佛求长生，被宦官陈弘志弑杀，是唐代被宦官弑杀的第一位皇帝。',
    achievements: ['元和中兴', '平定淮西', '恢复中央权威'],
    relations: [
      { id: 'peiquei', type: '君臣', label: '裴度（宰相）' }
    ],
    events: ['e_yuanhe_zhongxing']
  },
  {
    id: 'muzong', name: '唐穆宗', birth: 795, death: 824,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐宪宗第三子，在位仅4年。即位后尽废宪宗削藩之策，藩镇复叛，河北三镇再度割据。沉迷宴乐，宠信宦官，朝政日益败坏。击球时受伤，中风不起，24岁暴亡。',
    achievements: [],
    relations: [
      { id: 'xianzong', type: '父子', label: '唐宪宗（父亲）' }
    ],
    events: []
  },
  {
    id: 'wenzong', name: '唐文宗', birth: 809, death: 840,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐穆宗次子，有心振作却无力回天。太和九年（835年）与李训、郑注策划"甘露之变"，企图以观甘露为名诛杀宦官仇士良，事泄失败，参与朝臣千余人被杀，史称"甘露之变"。此后文宗被宦官完全控制，形同傀儡，自叹"受制于家奴"，抑郁而终。',
    achievements: ['甘露之变（失败）'],
    relations: [
      { id: 'muzong', type: '兄弟', label: '唐穆宗（兄长）' }
    ],
    events: ['e_ganlu_zhibian']
  },
  {
    id: 'wuzong', name: '唐武宗', birth: 814, death: 846,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐穆宗第五子，在位6年。倚重宰相李德裕，推行"会昌灭佛"，拆毁寺院4600余所，没收寺院土地和铜像铸钱，暂时充实国库。对外击败回鹘，平定泽潞刘稹之叛，是晚唐最后的强势君主。因服食丹药中毒而死，年仅32岁。',
    achievements: ['会昌灭佛', '击败回鹘', '平定泽潞'],
    relations: [
      { id: 'muzong', type: '父子', label: '唐穆宗（父亲）' }
    ],
    events: ['e_huichang_miefo']
  },
  {
    id: 'xuanzong_tang', name: '唐宣宗', birth: 810, death: 859,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐宪宗第十三子，被称"小太宗"。装傻数十年以避宦官猜忌，即位后一改会昌之政，恢复佛教，贬斥李德裕，起用白敏中。在位13年，勤政爱民，洞察下情，一度出现"大中之治"的治世局面。但无法解决根本的宦官和藩镇问题，唐朝衰亡之势不可逆转。',
    achievements: ['大中之治', '装傻保身', '勤政爱民'],
    relations: [
      { id: 'xianzong', type: '父子', label: '唐宪宗（父亲）' }
    ],
    events: ['e_dazhong_zhizhi']
  },
  {
    id: 'yizong', name: '唐懿宗', birth: 833, death: 873,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐宣宗长子，在位14年，是唐朝最荒淫的皇帝之一。沉迷佛事，广建寺院，出游无度，耗费巨资。其统治时期，浙东裘甫起义、桂林庞勋兵变相继爆发，藩镇割据加剧，唐朝加速走向灭亡。',
    achievements: [],
    relations: [
      { id: 'xuanzong_tang', type: '父子', label: '唐宣宗（父亲）' }
    ],
    events: []
  },
  {
    id: 'xizong', name: '唐僖宗', birth: 862, death: 888,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐懿宗第五子，12岁即位，是唐朝即位年龄最小的皇帝。在位期间由宦官田令孜把持朝政，本人沉迷蹴鞠嬉戏。875年王仙芝、黄巢起义爆发，880年黄巢攻入长安，僖宗出逃四川，流亡5年。885年返长安后又被藩镇逼迫出逃，直至888年病逝。',
    achievements: [],
    relations: [
      { id: 'yizong', type: '父子', label: '唐懿宗（父亲）' },
      { id: 'huangchao', type: '对立', label: '黄巢' }
    ],
    events: ['e_huangchao_qiyi']
  },
  {
    id: 'zhaozong', name: '唐昭宗', birth: 867, death: 904,
    cat: 'emperor', dynasty: '唐', emoji: '👑',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐僖宗之弟，有志恢复唐朝，但无力回天。在位16年，先后被宦官杨复恭、藩镇李茂贞、韩建挟持，又被朱温控制。904年被朱温弑杀，终年37岁。其子唐哀帝即位后仅3年，唐朝即告灭亡。',
    achievements: [],
    relations: [
      { id: 'xizong', type: '兄弟', label: '唐僖宗（兄长）' },
      { id: 'zhu_wen', type: '被害', label: '朱温' }
    ],
    events: []
  },
  {
    id: 'lixun', name: '李训', birth: 790, death: 835,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '晚唐政治人物，唐文宗的心腹谋臣。与郑注合谋策划"甘露之变"，以天降甘露为名企图诛杀权阉仇士良，因部署不周密而失败。李训逃出长安后被捕杀，千余朝臣被牵连处死，此后宦官完全控制朝政。',
    achievements: ['策划甘露之变（失败）'],
    relations: [],
    events: ['e_ganlu_zhibian']
  },
  {
    id: 'choushiliang', name: '仇士良', birth: 781, death: 843,
    cat: 'politician', dynasty: '唐', emoji: '😈',
    location: { lat: 34.3, lng: 108.9, place: '长安（今陕西西安）' },
    desc: '唐代最有权势的宦官之一，甘露之变中粉碎文宗和李训的诛杀计划，此后专权近十年，杀二王、一妃、四宰相，朝臣被杀千余人。文宗沦为傀儡，自叹"赧献受制于强臣，今朕受制于家奴"。致仕后卒于家，追赠扬州大都督。',
    achievements: ['甘露之变反击', '杀朝臣千余人'],
    relations: [],
    events: ['e_ganlu_zhibian']
  },
  {
    id: 'liruide', name: '李德裕', birth: 787, death: 850,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '赵郡（今河北赵县）' },
    desc: '晚唐名相，"牛李党争"中李党领袖。唐武宗时为相，主导会昌灭佛、击败回鹘、平定泽潞，政绩卓著。宣宗即位后被贬崖州（今海南），死于贬所。与牛僧孺的党争持续数十年，严重消耗了晚唐政治资源。',
    achievements: ['会昌灭佛', '平定泽潞', '击败回鹘'],
    relations: [],
    events: ['e_huichang_miefo']
  },
  {
    id: 'niusengru', name: '牛僧孺', birth: 779, death: 848,
    cat: 'politician', dynasty: '唐', emoji: '📋',
    location: { lat: 34.3, lng: 108.9, place: '安定鹑觚（今甘肃灵台）' },
    desc: '晚唐政治家，"牛李党争"中牛党领袖。与李德裕长期争权，两派交替执政，相互倾轧，史称"牛李党争"，持续近四十年，严重消耗朝廷力量。牛僧孺为政宽简，但在党争中多占下风。',
    achievements: ['牛党领袖', '牛李党争'],
    relations: [{ id: 'liruide', type: '对立', label: '李德裕（政敌）' }],
    events: []
  },
  {
    id: 'liuzongyuan', name: '柳宗元', birth: 773, death: 819,
    cat: 'scholar', dynasty: '唐', emoji: '📝',
    location: { lat: 34.3, lng: 108.9, place: '河东（今山西运城）' },
    desc: '唐代著名文学家、哲学家，唐宋八大家之一。参与永贞革新失败后被贬永州司马，后迁柳州刺史，世称"柳柳州"。与韩愈共同倡导古文运动，并称"韩柳"。代表作《江雪》《捕蛇者说》《三戒》《永州八记》等，是中国散文和游记文学的里程碑。',
    achievements: ['唐宋八大家', '古文运动', '《江雪》', '《永州八记》'],
    relations: [
      { id: 'hansan', type: '同道', label: '韩愈' },
      { id: 'liuyizhou', type: '好友', label: '刘禹锡' }
    ],
    events: []
  },
  {
    id: 'huangchao', name: '黄巢', birth: 820, death: 884,
    cat: 'general', dynasty: '唐', emoji: '⚔️',
    location: { lat: 35.3, lng: 115.6, place: '曹州冤句（今山东菏泽）' },
    desc: '唐末农民起义领袖，盐商出身。875年响应王仙芝起义，王仙芝战死后成为义军首领。880年攻入长安，即皇帝位，国号"大齐"，年号金统。但未能建立有效统治，唐军反攻后退出长安。884年在泰山狼虎谷兵败自杀（一说被外甥所杀）。其起义虽失败，但彻底动摇了唐朝根基，是中国历史上影响最深远的农民起义之一。',
    achievements: ['攻入长安', '建立大齐', '动摇唐朝根基'],
    relations: [
      { id: 'xizong', type: '对立', label: '唐僖宗' }
    ],
    events: ['e_huangchao_qiyi']
  },
  {
    id: 'wangxianzhi', name: '王仙芝', birth: 820, death: 878,
    cat: 'general', dynasty: '唐', emoji: '⚔️',
    location: { lat: 35.3, lng: 115.6, place: '濮州（今山东鄄城）' },
    desc: '唐末农民起义先驱，874年在长垣起兵，自称"天补平均大将军"。起义军转战山东、河南、湖北等地，声势浩大。878年在黄梅战死，余部由黄巢统领继续抗争。其起义拉开了唐末农民大起义的序幕。',
    achievements: ['首举义旗', '唐末起义先驱'],
    relations: [{ id: 'huangchao', type: '战友', label: '黄巢' }],
    events: ['e_huangchao_qiyi']
  },

  // ==================== 五代十国 ====================
  {
    id: 'zhu_wen', name: '朱温', birth: 852, death: 912,
    cat: 'emperor', dynasty: '五代', emoji: '👑',
    location: { lat: 34.7, lng: 113.6, place: '宋州砀山（今安徽砀山）' },
    desc: '后梁开国皇帝，原名朱全忠。出身贫寒，早年参加黄巢起义，后降唐被赐名"全忠"。逐步消灭宦官势力、击败李克用等对手，904年弑唐昭宗，907年废唐哀帝自立，建立后梁，定都开封，五代十国时代由此开始。在位5年，晚年荒淫无道，被其子朱友珪弑杀。',
    achievements: ['灭唐建梁', '五代开端', '结束唐朝'],
    relations: [
      { id: 'huangchao', type: '叛离', label: '黄巢（原从后叛离）' },
      { id: 'like_yong', type: '世仇', label: '李克用（宿敌）' }
    ],
    events: ['e_zhuwen_tangmiewang']
  },
  {
    id: 'like_yong', name: '李克用', birth: 856, death: 908,
    cat: 'military', dynasty: '五代', emoji: '⚔️',
    location: { lat: 39.9, lng: 116.4, place: '神武川新城（今山西应县）' },
    desc: '沙陀族将领，唐末五代军事强人，后唐奠基者。因一目失明号称"独眼龙"。镇压黄巢起义有功，封晋王，与朱温争霸数十年（史称"梁晋争霸"）。其子李存勖建立后唐后，追尊为太祖。一生征战，是唐末最勇猛的将领之一。',
    achievements: ['镇压黄巢', '晋王争霸', '后唐奠基者'],
    relations: [
      { id: 'zhu_wen', type: '世仇', label: '朱温' },
      { id: 'licunxu', type: '父子', label: '李存勖（儿子）' }
    ],
    events: []
  },
  {
    id: 'licunxu', name: '李存勖', birth: 885, death: 926,
    cat: 'emperor', dynasty: '五代', emoji: '👑',
    location: { lat: 38.4, lng: 112.7, place: '晋阳（今山西太原）' },
    desc: '后唐开国皇帝，即后唐庄宗，李克用之子。军事天才，923年灭后梁建立后唐，后灭前蜀，一度统一北方大部。但即位后沉迷戏曲，宠信伶人（戏子），朝政荒废，将士离心。926年兴教门之变中被伶人将领郭从谦所杀，在位仅3年，是"马上得天下、戏台失天下"的典型。',
    achievements: ['灭后梁', '建后唐', '灭前蜀', '军事天才'],
    relations: [
      { id: 'like_yong', type: '父子', label: '李克用（父亲）' }
    ],
    events: ['e_houtang_founded']
  },
  {
    id: 'shijing_tang', name: '石敬瑭', birth: 892, death: 942,
    cat: 'emperor', dynasty: '五代', emoji: '👑',
    location: { lat: 38.4, lng: 112.7, place: '太原（今山西太原）' },
    desc: '后晋开国皇帝，沙陀族人。原为后唐河东节度使，936年起兵反唐，为求契丹支持，割让燕云十六州予契丹，并自认"儿皇帝"，以比他小十岁的耶律德光为"父皇帝"。在契丹帮助下灭后唐建后晋。割让燕云十六州使中原失去北方屏障，遗祸四百年，是历史上最臭名昭著的卖国行为之一。',
    achievements: ['割燕云十六州（负面）', '建后晋', '称儿皇帝'],
    relations: [
      { id: 'yilv_deguang', type: '臣属', label: '耶律德光（认父）' }
    ],
    events: ['e_yanyun_cede']
  },
  {
    id: 'chong_rong', name: '柴荣', birth: 921, death: 959,
    cat: 'emperor', dynasty: '五代', emoji: '👑',
    location: { lat: 34.7, lng: 113.6, place: '邢州尧山（今河北隆尧）' },
    desc: '后周第二位皇帝，即周世宗，五代最杰出的君主。本是郭威内侄，被收为养子。954年即位后，高平之战大败北汉与辽联军。政治上整顿吏治、严惩贪腐、均定田赋、限制佛教；军事上南征南唐、西败后蜀、北伐辽国收复三州三关。959年北伐途中病逝，年仅38岁，壮志未酬。其改革为后来北宋统一奠定了基础。',
    achievements: ['高平之战', '北伐收复三关', '整顿吏治', '限制佛教', '五代明君'],
    relations: [
      { id: 'guo_wei', type: '养父子', label: '郭威（养父）' },
      { id: 'zhao_kuangyin', type: '君臣', label: '赵匡胤（部将）' }
    ],
    events: ['e_gaoping_battle']
  },
  {
    id: 'guo_wei', name: '郭威', birth: 904, death: 954,
    cat: 'emperor', dynasty: '五代', emoji: '👑',
    location: { lat: 34.7, lng: 113.6, place: '邢州尧山（今河北隆尧）' },
    desc: '后周开国皇帝，即周太祖。出身寒微，从军卒做到后汉枢密使。950年后汉隐帝欲杀郭威，郭威起兵反叛，以"黄旗加身"方式称帝，建立后周。在位3年，革除弊政，减轻赋税，崇尚节俭，为后周强盛奠定基础。死后传位养子柴荣。',
    achievements: ['建后周', '黄旗加身', '革除弊政'],
    relations: [
      { id: 'chong_rong', type: '养父子', label: '柴荣（养子）' }
    ],
    events: []
  },
  {
    id: 'liyu', name: '李煜', birth: 937, death: 978,
    cat: 'scholar', dynasty: '五代', emoji: '🎭',
    location: { lat: 32.0, lng: 118.8, place: '金陵（今江苏南京）' },
    desc: '南唐最后一位国君，世称"南唐后主"，中国历史上最伟大的词人之一。在政治上软弱无能，975年南唐被宋所灭，李煜被俘至汴京，封违命侯。被囚期间写下《虞美人·春花秋月何时了》《浪淘沙令·帘外雨潺潺》等千古名篇，"问君能有几多愁？恰似一江春水向东流"传唱至今。978年被宋太宗赵光义以牵机药毒杀。',
    achievements: ['千古词帝', '《虞美人》', '《浪淘沙令》', '婉约词宗'],
    relations: [],
    events: []
  },
  {
    id: 'yilv_deguang', name: '耶律德光', birth: 902, death: 947,
    cat: 'emperor', dynasty: '五代', emoji: '🏇',
    location: { lat: 43.9, lng: 125.3, place: '上京临潢府（今内蒙古巴林左旗）' },
    desc: '辽太宗，契丹族，耶律阿保机次子。936年支持石敬瑭建立后晋，获得燕云十六州。947年率军灭后晋，入开封改国号为"大辽"，但无法有效统治中原，北返途中病逝，内脏被取出盐腌保存，史称"帝羓"。其获取燕云十六州，使辽国实力大增，也使中原长期面临北方威胁。',
    achievements: ['得燕云十六州', '灭后晋', '建大辽'],
    relations: [
      { id: 'shijing_tang', type: '臣属', label: '石敬瑭（儿皇帝）' }
    ],
    events: ['e_yanyun_cede']
  },
  {
    id: 'qianliu', name: '钱镠', birth: 852, death: 932,
    cat: 'emperor', dynasty: '五代', emoji: '🌊',
    location: { lat: 30.3, lng: 120.2, place: '临安（今浙江杭州）' },
    desc: '吴越国创建者，即吴越武肃王。盐贩出身，从军后逐步占据两浙之地，907年被后梁封为吴越王。在位期间修筑钱塘江海塘，治理太湖水患，发展农桑贸易，使吴越成为十国中最安定繁荣的地区。"陌上花开，可缓缓归矣"是其写给夫人的书信，传为佳话。',
    achievements: ['修钱塘江海塘', '治太湖水患', '吴越繁荣', '"陌上花开"典故'],
    relations: [],
    events: []
  },
  {
    id: 'wangjian', name: '王建', birth: 847, death: 918,
    cat: 'emperor', dynasty: '五代', emoji: '👑',
    location: { lat: 30.6, lng: 104.0, place: '许州舞阳（今河南舞阳）' },
    desc: '前蜀开国皇帝，无赖出身，从军后入蜀割据。907年朱温灭唐后在成都称帝，建立前蜀。在位期间优待文人，蜀地文化繁荣，但晚年任用宦官，朝政腐败。其子王衍继位后荒淫无道，925年前蜀被后唐所灭。',
    achievements: ['建前蜀', '蜀地文化繁荣'],
    relations: [],
    events: []
  },

  // ==================== 北宋 ====================
  {
    id: 'zhao_kuangyin', name: '宋太祖', birth: 927, death: 976,
    cat: 'emperor', dynasty: '北宋', emoji: '👑',
    location: { lat: 34.7, lng: 115.6, place: '涿州（今河北涿州）' },
    desc: '宋朝开国皇帝。后周殿前都点检，960年陈桥兵变黄袍加身建立宋朝。杯酒释兵权解除武将兵权，重文抑武，奠定宋朝基本格局。先后平定荆南、武平、后蜀、南汉、南唐等割据政权，基本完成统一大业。976年"烛影斧声"中猝死，其死因至今成谜，弟赵光义继位。',
    achievements: ['建立宋朝', '杯酒释兵权', '重文抑武', '基本统一中国', '削弱藩镇'],
    relations: [
      { id: 'zhao_guangyi', type: '兄弟', label: '赵光义（弟弟）' },
      { id: 'chayi', type: '君臣', label: '柴荣（前朝君主）' },
    ],
    events: ['e_song_founded', 'e_beijiubing']
  },
  {
    id: 'zhao_guangyi', name: '宋太宗', birth: 939, death: 997,
    cat: 'emperor', dynasty: '北宋', emoji: '👑',
    location: { lat: 34.7, lng: 114.3, place: '开封（今河南开封）' },
    desc: '宋太祖赵匡胤之弟，宋朝第二位皇帝。976年继位，"烛影斧声"之谜使其即位合法性存疑。完成太祖未竟的统一事业，979年灭北汉，结束五代十国分裂。但两次伐辽均遭惨败（高梁河之战、雍熙北伐），从此宋朝对辽转为守势，确立了"守内虚外"的国策。在位期间扩大科举取士，编修《太平御览》《太平广记》等大型类书。',
    achievements: ['灭北汉统一', '扩大科举', '编修类书', '雍熙北伐失败'],
    relations: [
      { id: 'zhao_kuangyin', type: '兄弟', label: '赵匡胤（哥哥）' },
    ],
    events: []
  },
  {
    id: 'zhao_heng', name: '宋真宗', birth: 968, death: 1022,
    cat: 'emperor', dynasty: '北宋', emoji: '👑',
    location: { lat: 34.7, lng: 114.3, place: '开封（今河南开封）' },
    desc: '宋朝第三位皇帝。1004年辽军大举南侵，真宗在宰相寇准力劝下亲征澶州，宋军射杀辽将萧挞凛，形势有利却签订"澶渊之盟"，每年向辽送银十万两、绢二十万匹，换得百年和平。后期沉迷祥瑞，封禅泰山，劳民伤财，被讥为"神道设教"。在位期间咸平之治使经济恢复，但奠定了宋朝对外妥协的基调。',
    achievements: ['澶渊之盟', '咸平之治', '封禅泰山'],
    relations: [
      { id: 'kou_zhun', type: '君臣', label: '寇准（力劝亲征）' },
    ],
    events: ['e_chanyuan']
  },
  {
    id: 'fan_zhongyan', name: '范仲淹', birth: 989, death: 1052,
    cat: 'politician', dynasty: '北宋', emoji: '🏛️',
    location: { lat: 34.5, lng: 110.1, place: '邠州（今陕西彬县）' },
    desc: '北宋政治家、军事家、文学家。出身贫寒，断齑划粥苦读成才。"先天下之忧而忧，后天下之乐而乐"传颂千古。1040年主持西北防务抵御西夏，采取"屯田久守"策略稳固边防。1043年发起"庆历新政"，提出明黜陟、抑侥幸、精贡举等十项改革，因守旧派反对而失败。文学成就卓著，《岳阳楼记》为千古名篇。',
    achievements: ['庆历新政', '抵御西夏', '《岳阳楼记》', '先忧后乐'],
    relations: [
      { id: 'wang_anshi', type: '传承', label: '王安石（后继改革）' },
      { id: 'ou_yangxiu', type: '交游', label: '欧阳修（同道）' },
    ],
    events: ['e_qingli_xinzheng']
  },
  {
    id: 'ou_yangxiu', name: '欧阳修', birth: 1007, death: 1072,
    cat: 'scholar', dynasty: '北宋', emoji: '📖',
    location: { lat: 27.8, lng: 114.4, place: '吉州庐陵（今江西吉安）' },
    desc: '北宋文学家、史学家、政治家，"唐宋八大家"之一。领导北宋诗文革新运动，一扫五代浮靡文风。曾任枢密副使、参知政事，支持范仲淹庆历新政。著有《新五代史》《新唐书》（与宋祁合修），散文《醉翁亭记》为千古名篇。晚年自号"六一居士"。',
    achievements: ['唐宋八大家', '诗文革新', '《醉翁亭记》', '《新五代史》', '庆历新政'],
    relations: [
      { id: 'fan_zhongyan', type: '交游', label: '范仲淹（同道）' },
      { id: 'su_shi', type: '师承', label: '苏轼（门生）' },
    ],
    events: []
  },
  {
    id: 'bao_zheng', name: '包拯', birth: 999, death: 1062,
    cat: 'politician', dynasty: '北宋', emoji: '⚖️',
    location: { lat: 31.8, lng: 117.3, place: '庐州合肥（今安徽合肥）' },
    desc: '北宋名臣，以刚正不阿、执法如山著称，民间尊称"包青天"。任监察御史时弹劾贪官污吏，任开封知府时不畏权贵，"关节不到，有阎罗包老"。民间传说中他日审阳间、夜审阴间，铁面无私，三口铡刀（龙头铡、虎头铡、狗头铡）惩奸除恶，成为中国历史上公正廉明的象征。',
    achievements: ['铁面无私', '执法如山', '包青天传说', '弹劾权贵'],
    relations: [],
    events: []
  },
  {
    id: 'wang_anshi', name: '王安石', birth: 1021, death: 1086,
    cat: 'politician', dynasty: '北宋', emoji: '⚖️',
    location: { lat: 28.6, lng: 115.9, place: '临川（今江西抚州）' },
    desc: '北宋政治家、文学家、思想家，"唐宋八大家"之一。1069年在宋神宗支持下推行"熙宁变法"，以"天变不足畏，祖宗不足法，人言不足恤"的"三不足"精神，推行青苗法、免役法、方田均税法、保甲法、市易法等新法。变法旨在富国强兵，但因用人不当、操之过急，加重百姓负担，在保守派（司马光等）反对下最终失败。两次拜相，两次罢相，晚年退居金陵，寄情诗文。',
    achievements: ['王安石变法', '唐宋八大家', '《伤仲永》', '三不足精神', '青苗法'],
    relations: [
      { id: 'su_shi', type: '对立', label: '苏轼（旧党）' },
      { id: 'sima_guang', type: '对立', label: '司马光（旧党领袖）' },
      { id: 'fan_zhongyan', type: '传承', label: '范仲淹（改革先驱）' },
    ],
    events: ['e_xining_bianfa']
  },
  {
    id: 'sima_guang', name: '司马光', birth: 1019, death: 1086,
    cat: 'scholar', dynasty: '北宋', emoji: '📚',
    location: { lat: 35.0, lng: 111.5, place: '陕州夏县（今山西夏县）' },
    desc: '北宋政治家、史学家、文学家。反对王安石变法，为新法主要反对者。退居洛阳15年，主持编纂编年体史书巨著《资治通鉴》，上起周威烈王（前403年），下至五代后周世宗（959年），共294卷，历时19年完成，是中国第一部编年体通史。1086年哲宗即位后出任宰相，尽废新法，但同年病逝。"司马光砸缸"的故事家喻户晓。',
    achievements: ['《资治通鉴》', '反对新法', '司马光砸缸', '编年体通史'],
    relations: [
      { id: 'wang_anshi', type: '对立', label: '王安石（政敌）' },
    ],
    events: ['e_zizhi_tongjian']
  },
  {
    id: 'su_shi', name: '苏轼', birth: 1037, death: 1101,
    cat: 'scholar', dynasty: '北宋', emoji: '✍️',
    location: { lat: 30.6, lng: 116.3, place: '眉州眉山（今四川眉山）' },
    desc: '北宋文学家、书法家、画家，号东坡居士，"唐宋八大家"之一。词风豪放，与辛弃疾并称"苏辛"，开豪放词派先河。因反对王安石变法，又不满旧党尽废新法，左右不逢源，一生屡遭贬谪——乌台诗案险丧命，先后被贬黄州、惠州、儋州（海南），却始终保持豁达。"日啖荔枝三百颗，不辞长作岭南人"是其乐观写照。代表作《赤壁赋》《水调歌头》《念奴娇·赤壁怀古》等。书法列"宋四家"之首，画作开文人画先河。',
    achievements: ['唐宋八大家', '豪放词派', '《赤壁赋》', '《水调歌头》', '东坡肉', '书法宋四家'],
    relations: [
      { id: 'wang_anshi', type: '对立', label: '王安石（政见相左）' },
      { id: 'ou_yangxiu', type: '师承', label: '欧阳修（座师）' },
      { id: 'su_che', type: '兄弟', label: '苏辙（弟弟）' },
    ],
    events: ['e_wutai_shian']
  },
  {
    id: 'su_che', name: '苏辙', birth: 1039, death: 1112,
    cat: 'scholar', dynasty: '北宋', emoji: '📖',
    location: { lat: 30.6, lng: 116.3, place: '眉州眉山（今四川眉山）' },
    desc: '北宋文学家，苏轼之弟，"唐宋八大家"之一，与父苏洵、兄苏轼合称"三苏"。官至门下侍郎（副宰相），文学成就虽不及兄长，但政论文章见识深远。与兄感情深厚，苏轼乌台诗案时，苏辙上书愿削官赎兄之罪。代表作《黄州快哉亭记》等。',
    achievements: ['唐宋八大家', '三苏', '《栾城集》'],
    relations: [
      { id: 'su_shi', type: '兄弟', label: '苏轼（哥哥）' },
    ],
    events: []
  },
  {
    id: 'shen_kuo', name: '沈括', birth: 1031, death: 1095,
    cat: 'scientist', dynasty: '北宋', emoji: '🔬',
    location: { lat: 30.9, lng: 120.1, place: '杭州钱塘（今浙江杭州）' },
    desc: '北宋科学家、政治家。被誉为"中国科学史上的坐标"（李约瑟语），所著《梦溪笔谈》涵盖天文、数学、物理、化学、生物、地质、地理、医学等众多领域，记录了活字印刷术、磁偏角、石油命名等重大发现。首次发现地磁偏角（比欧洲早400余年），改良浑天仪，提出十二气历。政治上参与王安石变法，出使辽国谈判边界，知延州抵御西夏。',
    achievements: ['《梦溪笔谈》', '发现磁偏角', '活字印刷记录', '十二气历', '出使辽国'],
    relations: [
      { id: 'wang_anshi', type: '同盟', label: '王安石（变法同僚）' },
    ],
    events: []
  },
  {
    id: 'bi_sheng', name: '毕昇', birth: 972, death: 1051,
    cat: 'inventor', dynasty: '北宋', emoji: '🔧',
    location: { lat: 30.3, lng: 115.6, place: '蕲州蕲水（今湖北英山）' },
    desc: '北宋布衣发明家，约1040年发明胶泥活字印刷术，是印刷史上一次重大革命。活字印刷术比德国古登堡活字印刷早约400年，与造纸术、火药、指南针并称"四大发明"，深刻影响了世界文明进程。沈括《梦溪笔谈》详细记载了其发明。',
    achievements: ['发明活字印刷术', '四大发明之一'],
    relations: [
      { id: 'shen_kuo', type: '传承', label: '沈括（记录其发明）' },
    ],
    events: []
  },
  {
    id: 'zhao_ji', name: '宋徽宗', birth: 1082, death: 1135,
    cat: 'emperor', dynasty: '北宋', emoji: '🎨',
    location: { lat: 34.7, lng: 114.3, place: '开封（今河南开封）' },
    desc: '北宋第八位皇帝，艺术天赋极高却治国无方。创"瘦金体"书法，工笔花鸟画冠绝当世，是古代帝王中最杰出的艺术家。设立翰林书画院，编《宣和画谱》《宣和书谱》。但任用蔡京、童贯等"六贼"，大搞花石纲，民不聊生，方腊、宋江起义此起彼伏。1125年金军南侵，仓促禅位给太子（钦宗）。1127年"靖康之变"中被金军俘虏北去，囚于五国城（今黑龙江依兰），受尽屈辱而死。',
    achievements: ['瘦金体书法', '工笔花鸟画', '翰林书画院', '《宣和画谱》'],
    relations: [
      { id: 'zhao_huan', type: '父子', label: '宋钦宗（儿子）' },
      { id: 'cai_jing', type: '君臣', label: '蔡京（宠臣）' },
    ],
    events: ['e_jingkang']
  },
  {
    id: 'zhao_huan', name: '宋钦宗', birth: 1100, death: 1156,
    cat: 'emperor', dynasty: '北宋', emoji: '👑',
    location: { lat: 34.7, lng: 114.3, place: '开封（今河南开封）' },
    desc: '北宋末代皇帝，宋徽宗长子。1125年金军南侵，徽宗禅位，钦宗即位后犹豫不决，在主战与主和间反复摇摆。虽罢免蔡京等"六贼"，但任用耿南仲等主和派，排挤李纲等主战派。1126年冬金军攻破开封，次年四月"靖康之变"，钦宗与徽宗同被俘虏北去，北宋灭亡。在金国囚禁近30年后死去，死讯数年后南宋方知。',
    achievements: [],
    relations: [
      { id: 'zhao_ji', type: '父子', label: '宋徽宗（父亲）' },
      { id: 'li_gang', type: '君臣', label: '李纲（主战派）' },
    ],
    events: ['e_jingkang']
  },
  {
    id: 'li_gang', name: '李纲', birth: 1083, death: 1140,
    cat: 'politician', dynasty: '北宋', emoji: '🏛️',
    location: { lat: 26.1, lng: 119.3, place: '邵武（今福建邵武）' },
    desc: '北宋末年抗金名臣。靖康之变前力主坚守开封，组织军民击退金军第一次围攻。但被主和派排挤罢相。南宋建立后一度出任宰相，提出抗金十策，但仅75天即被罢免。此后屡起屡落，壮志难酬。与宗泽同为南宋初期最坚定的主战派代表。',
    achievements: ['坚守开封', '抗金十策', '主战派领袖'],
    relations: [
      { id: 'zhao_huan', type: '君臣', label: '宋钦宗' },
      { id: 'zhao_gou', type: '君臣', label: '宋高宗' },
    ],
    events: []
  },
  {
    id: 'cai_jing', name: '蔡京', birth: 1047, death: 1126,
    cat: 'politician', dynasty: '北宋', emoji: '🙅',
    location: { lat: 25.0, lng: 118.5, place: '兴化仙游（今福建仙游）' },
    desc: '北宋权臣，"北宋六贼"之首。四次拜相，逢迎徽宗，推行花石纲，搜刮民脂民膏，大兴土木修建艮岳。书法造诣颇高，但因人品恶劣被列为"宋四家"之外的"第五家"。靖康之变后被贬谪，途中饿死于潭州（今长沙），百姓拒售食与之，实为可悲。',
    achievements: ['书法造诣', '四次拜相'],
    relations: [
      { id: 'zhao_ji', type: '君臣', label: '宋徽宗（逢迎）' },
    ],
    events: []
  },
  {
    id: 'zong_ze', name: '宗泽', birth: 1060, death: 1128,
    cat: 'military', dynasty: '北宋', emoji: '⚔️',
    location: { lat: 29.3, lng: 120.1, place: '婺州义乌（今浙江义乌）' },
    desc: '北宋末年抗金名将。靖康之变时率军勤王，后镇守东京开封，整顿防务，多次击退金军进攻。岳飞在其麾下初露头角，宗泽慧眼识才加以提拔。连上20余道奏疏请求宋高宗还都开封、北伐收复中原，均被置之不理。临终前仍连呼"过河！过河！过河！"，含恨而逝，是南宋初年最悲壮的抗金英雄。',
    achievements: ['镇守开封', '提拔岳飞', '连呼过河', '二十道奏疏'],
    relations: [
      { id: 'yue_fei', type: '师承', label: '岳飞（部将）' },
    ],
    events: []
  },

  // ==================== 南宋 ====================
  {
    id: 'zhao_gou', name: '宋高宗', birth: 1107, death: 1187,
    cat: 'emperor', dynasty: '南宋', emoji: '👑',
    location: { lat: 30.3, lng: 120.2, place: '临安（今浙江杭州）' },
    desc: '南宋开国皇帝，宋徽宗第九子。靖康之变时在外地统兵，成为唯一未被俘的皇族，在应天府（今商丘）即位。金军追击下南逃至温州海上，是历史上出名的"逃跑皇帝"。后定都临安（杭州），偏安江南。为保住皇位，不惜向金称臣求和，默许秦桧杀害岳飞。1162年禅位给养子宋孝宗，当太上皇25年，是历史上在位最长的太上皇。',
    achievements: ['建立南宋', '偏安江南'],
    relations: [
      { id: 'qin_hui', type: '君臣', label: '秦桧（倚重）' },
      { id: 'yue_fei', type: '对立', label: '岳飞（忌惮）' },
      { id: 'zhao_ji', type: '父子', label: '宋徽宗（父亲）' },
    ],
    events: ['e_nansong_founded']
  },
  {
    id: 'yue_fei', name: '岳飞', birth: 1103, death: 1142,
    cat: 'military', dynasty: '南宋', emoji: '⚔️',
    location: { lat: 34.8, lng: 113.6, place: '相州汤阴（今河南汤阴）' },
    desc: '南宋名将，中国历史上最著名的民族英雄。字鹏举，出身农家，从军后屡建战功。组建"岳家军"，军纪严明，"冻死不拆屋，饿死不掳掠"。郾城大捷中大破金兀术的"铁浮屠"和"拐子马"，金军哀叹"撼山易，撼岳家军难"。正欲乘胜北伐、直捣黄龙之际，被宋高宗连下十二道金牌召回。秦桧以"莫须有"罪名将其害死于风波亭，年仅39岁。临终前写下"天日昭昭，天日昭昭"八字绝笔。',
    achievements: ['精忠报国', '郾城大捷', '岳家军', '《满江红》', '十二道金牌'],
    relations: [
      { id: 'qin_hui', type: '对立', label: '秦桧（陷害者）' },
      { id: 'zhao_gou', type: '对立', label: '宋高宗（忌惮）' },
      { id: 'zong_ze', type: '师承', label: '宗泽（老上司）' },
    ],
    events: ['e_yancheng_dajie', 'e_yue_fei_si']
  },
  {
    id: 'qin_hui', name: '秦桧', birth: 1090, death: 1155,
    cat: 'politician', dynasty: '南宋', emoji: '🙅',
    location: { lat: 32.0, lng: 118.8, place: '江宁（今江苏南京）' },
    desc: '南宋权相，中国历史上最著名的奸臣。靖康之变中被俘北去，后声称杀监逃回，实为金国细作之说流传甚广。两度出任宰相共19年，专权擅政，卖国求和，以"莫须有"罪名杀害岳飞，排斥主战派。死后谥"忠献"，后改谥"缪丑"。其与妻王氏的铁铸跪像至今跪于杭州岳王庙前，受千古唾骂。',
    achievements: [],
    relations: [
      { id: 'yue_fei', type: '对立', label: '岳飞（陷害对象）' },
      { id: 'zhao_gou', type: '君臣', label: '宋高宗' },
    ],
    events: ['e_yue_fei_si']
  },
  {
    id: 'han_shizhong', name: '韩世忠', birth: 1089, death: 1151,
    cat: 'military', dynasty: '南宋', emoji: '⚔️',
    location: { lat: 35.1, lng: 107.6, place: '延安（今陕西延安）' },
    desc: '南宋名将，与岳飞、张俊、刘光世并称"中兴四将"。黄天荡之战中以8000水军阻击10万金军48天，虽未全胜但极大地鼓舞了抗金士气。妻子梁红玉亲自击鼓助战，传为佳话。岳飞遇害后，韩世忠当面质问秦桧"莫须有三字何以服天下"，后愤而辞职，自号"清凉居士"，绝口不言兵。',
    achievements: ['黄天荡之战', '中兴四将', '质问秦桧', '梁红玉击鼓'],
    relations: [
      { id: 'qin_hui', type: '对立', label: '秦桧' },
      { id: 'yue_fei', type: '交游', label: '岳飞（战友）' },
    ],
    events: ['e_huangtiandang']
  },
  {
    id: 'xin_qiji', name: '辛弃疾', birth: 1140, death: 1207,
    cat: 'scholar', dynasty: '南宋', emoji: '⚔️',
    location: { lat: 36.8, lng: 118.3, place: '济南历城（今山东济南）' },
    desc: '南宋词人、军事家，豪放词派代表，与苏轼并称"苏辛"。21岁时率50骑突入5万金军大营，擒叛徒张安国南归，壮举震惊朝野。但南归后长期不被重用，"把吴钩看了，栏杆拍遍，无人会，登临意"。其词慷慨悲壮，"醉里挑灯看剑，梦回吹角连营""了却君王天下事，赢得生前身后名"等名句传颂千古。',
    achievements: ['豪放词派', '苏辛并称', '50骑擒叛', '《稼轩词》'],
    relations: [
      { id: 'su_shi', type: '传承', label: '苏轼（词风传承）' },
      { id: 'lu_you', type: '交游', label: '陆游（同道）' },
    ],
    events: []
  },
  {
    id: 'lu_you', name: '陆游', birth: 1125, death: 1210,
    cat: 'scholar', dynasty: '南宋', emoji: '✍️',
    location: { lat: 30.0, lng: 120.6, place: '越州山阴（今浙江绍兴）' },
    desc: '南宋爱国诗人，现存诗9300余首，是中国古代存诗最多的诗人。一生矢志北伐收复中原，"王师北定中原日，家祭无忘告乃翁"是临终绝笔。与唐婉的爱情悲剧令人唏嘘——"红酥手，黄縢酒，满城春色宫墙柳"的《钗头凤》写尽刻骨相思与悔恨。诗歌风格雄浑悲壮，亦工词，与辛弃疾并称南宋爱国词人双璧。',
    achievements: ['存诗9300首', '《钗头凤》', '爱国诗人', '《剑南诗稿》'],
    relations: [
      { id: 'xin_qiji', type: '交游', label: '辛弃疾（同道）' },
    ],
    events: []
  },
  {
    id: 'wen_tianxiang', name: '文天祥', birth: 1236, death: 1283,
    cat: 'politician', dynasty: '南宋', emoji: '🌟',
    location: { lat: 26.9, lng: 115.4, place: '吉州庐陵（今江西吉安）' },
    desc: '南宋末年抗元名臣、民族英雄。1256年中状元，1275年元军南侵时散尽家财起兵勤王。1278年在五坡岭被俘，元将张弘范逼他写信招降张世杰，他写下《过零丁洋》以明志——"人生自古谁无死，留取丹心照汗青"。被押送大都（北京）后，忽必烈亲自劝降，许以宰相之位，文天祥坚贞不屈，从容就义。狱中所作《正气歌》浩然正气，为千古绝唱。',
    achievements: ['《过零丁洋》', '《正气歌》', '抗元不屈', '散尽家财勤王'],
    relations: [
      { id: 'kublai_khan', type: '对立', label: '忽必烈（拒降）' },
    ],
    events: ['e_yaesahn_bingbian']
  },
  {
    id: 'zhao_bing', name: '宋帝昺', birth: 1272, death: 1279,
    cat: 'emperor', dynasty: '南宋', emoji: '👑',
    location: { lat: 22.2, lng: 113.6, place: '崖山（今广东新会）' },
    desc: '南宋末代皇帝，即位时年仅6岁。1279年元军进攻崖山，宋军大败。丞相陆秀夫背小皇帝跳海殉国，随行十余万军民亦跳海殉难，南宋灭亡。崖山海战是中国历史上最悲壮的亡国之战，"崖山之后无中国"之说虽争议颇大，但确标志着古典中华文明的重大转折。',
    achievements: [],
    relations: [],
    events: ['e_yashan']
  },
  {
    id: 'lu_xiufu', name: '陆秀夫', birth: 1237, death: 1279,
    cat: 'politician', dynasty: '南宋', emoji: '🏛️',
    location: { lat: 33.4, lng: 120.1, place: '楚州盐城（今江苏盐城）' },
    desc: '南宋末年丞相、民族英雄。崖山海战失败后，背8岁小皇帝赵昺跳海殉国，宁死不降。与文天祥、张世杰并称"宋末三杰"。在南宋流亡朝廷中，陆秀夫以非凡毅力维持朝政，即使在最艰难的逃亡途中仍坚持朝仪。',
    achievements: ['负帝蹈海', '宋末三杰', '坚持朝仪'],
    relations: [
      { id: 'wen_tianxiang', type: '交游', label: '文天祥（宋末三杰）' },
      { id: 'zhang_shijie', type: '交游', label: '张世杰（宋末三杰）' },
    ],
    events: ['e_yashan']
  },
  {
    id: 'zhang_shijie', name: '张世杰', birth: 1236, death: 1279,
    cat: 'military', dynasty: '南宋', emoji: '⚔️',
    location: { lat: 35.4, lng: 115.9, place: '涿州范阳（今河北涿州）' },
    desc: '南宋末年抗元名将，与文天祥、陆秀夫并称"宋末三杰"。先后拥立端宗赵昰、帝昺赵昺，在海上坚持抗元。崖山海战中率残部突围，后遇飓风翻船溺死。虽最终失败，但其忠贞不屈的精神为后人所敬仰。',
    achievements: ['宋末三杰', '拥立二帝', '海上抗元'],
    relations: [
      { id: 'wen_tianxiang', type: '交游', label: '文天祥' },
      { id: 'lu_xiufu', type: '交游', label: '陆秀夫' },
    ],
    events: ['e_yashan']
  },

  // ==================== 元朝 ====================
  {
    id: 'genghis_khan', name: '成吉思汗', birth: 1162, death: 1227,
    cat: 'emperor', dynasty: '元', emoji: '🐴',
    location: { lat: 47.9, lng: 106.9, place: '斡难河畔（今蒙古国肯特省）' },
    desc: '蒙古帝国奠基者，名铁木真。幼年丧父，部众离散，历经磨难统一蒙古各部。1206年在斡难河畔召开忽里勒台大会，被尊为"成吉思汗"（海洋般的大汗）。此后发动三次大规模西征：第一次灭花剌子模，征服中亚；第二次征钦察、俄罗斯；第三次征西夏。建立横跨欧亚的蒙古帝国，是人类历史上疆域最大的连续帝国。1227年征西夏时病逝，死因成谜。其"千年风云第一人"的称号当之无愧。',
    achievements: ['统一蒙古', '建立蒙古帝国', '三次西征', '《大札撒》法典', '千户制'],
    relations: [
      { id: 'kublai_khan', type: '祖孙', label: '忽必烈（孙子）' },
      { id: 'wo_kuotai', type: '父子', label: '窝阔台（三子）' },
      { id: 'tuo_lei', type: '父子', label: '拖雷（四子）' },
    ],
    events: ['e_mongol_xiqin']
  },
  {
    id: 'wo_kuotai', name: '窝阔台', birth: 1186, death: 1241,
    cat: 'emperor', dynasty: '元', emoji: '👑',
    location: { lat: 47.9, lng: 106.9, place: '蒙古高原' },
    desc: '蒙古帝国第二任大汗，成吉思汗第三子。1229年继位后继续扩张：灭金朝（1234年）、发动第二次西征（"长子西征"），征服俄罗斯、东欧，蒙古铁骑横扫欧洲至匈牙利。在中原设行省、立税制，任用耶律楚材推行汉法，使蒙古从游牧军事集团向正规帝国转变。但晚年嗜酒荒淫，1241年暴死于饮酒过度。',
    achievements: ['灭金朝', '长子西征', '推行汉法', '设立行省'],
    relations: [
      { id: 'genghis_khan', type: '父子', label: '成吉思汗（父亲）' },
      { id: 'yelv_chucai', type: '君臣', label: '耶律楚材（谋臣）' },
    ],
    events: []
  },
  {
    id: 'tuo_lei', name: '拖雷', birth: 1193, death: 1232,
    cat: 'military', dynasty: '元', emoji: '⚔️',
    location: { lat: 47.9, lng: 106.9, place: '蒙古高原' },
    desc: '成吉思汗第四子，蒙古帝国杰出军事统帅。成吉思汗生前将精锐部队交其统率，是蒙古军事力量的核心。1232年三峰山之战大败金军主力，为灭金奠定基础。同年病死（一说被窝阔台毒杀），年仅39岁。其子蒙哥、忽必烈、旭烈兀分别成为大汗和伊利汗国创建者，拖雷家族最终夺取蒙古帝国最高权力。',
    achievements: ['三峰山之战', '统率精锐', '拖雷家族奠基'],
    relations: [
      { id: 'genghis_khan', type: '父子', label: '成吉思汗（父亲）' },
      { id: 'kublai_khan', type: '父子', label: '忽必烈（四子）' },
      { id: 'mengge', type: '父子', label: '蒙哥（长子）' },
    ],
    events: []
  },
  {
    id: 'mengge', name: '蒙哥汗', birth: 1209, death: 1259,
    cat: 'emperor', dynasty: '元', emoji: '👑',
    location: { lat: 47.9, lng: 106.9, place: '蒙古高原' },
    desc: '蒙古帝国第四任大汗，拖雷长子。1251年通过忽里勒台大会即位，结束了窝阔台系对汗位的垄断。在位期间派弟弟忽必烈征大理（云南）、灭大理国，派旭烈兀西征征服波斯、巴格达（灭阿拔斯王朝）。1258年亲率大军攻南宋，围攻钓鱼城（今重庆合川）时被炮石击中身亡（一说病死），其死引发忽必烈与阿里不哥的汗位争夺，蒙古帝国走向分裂。',
    achievements: ['灭大理', '旭烈兀西征', '攻宋之战', '钓鱼城阵亡'],
    relations: [
      { id: 'tuo_lei', type: '父子', label: '拖雷（父亲）' },
      { id: 'kublai_khan', type: '兄弟', label: '忽必烈（弟弟）' },
    ],
    events: []
  },
  {
    id: 'kublai_khan', name: '忽必烈', birth: 1215, death: 1294,
    cat: 'emperor', dynasty: '元', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '大都（今北京）' },
    desc: '元朝开国皇帝，成吉思汗之孙，拖雷第四子。1253年奉命远征大理，灭大理国。蒙哥汗死后与弟阿里不哥争位，1260年即大汗位，1264年平定阿里不哥。1271年建国号"大元"，取《易经》"大哉乾元"之意，定都大都（北京）。1279年崖山海战灭南宋，统一中国。在位期间推行行省制度，开凿会通河，发行纸币，促进中外交流。马可·波罗在其朝中服务17年，《马可·波罗游记》即为记录。但后期两次远征日本均因台风失败（"神风"之源），征安南、爪哇亦无功而返。',
    achievements: ['建立元朝', '统一中国', '行省制度', '远征日本', '马可·波罗来华'],
    relations: [
      { id: 'genghis_khan', type: '祖孙', label: '成吉思汗（祖父）' },
      { id: 'tuo_lei', type: '父子', label: '拖雷（父亲）' },
      { id: 'wen_tianxiang', type: '对立', label: '文天祥（拒降）' },
    ],
    events: ['e_yuan_founded', 'e_yashan']
  },
  {
    id: 'yelv_chucai', name: '耶律楚材', birth: 1190, death: 1244,
    cat: 'politician', dynasty: '元', emoji: '🏛️',
    location: { lat: 39.9, lng: 116.4, place: '燕京（今北京）' },
    desc: '契丹族政治家，辽朝皇族后裔。成吉思汗攻占金中都后召其为幕僚，窝阔台汗时更受倚重。力劝蒙古贵族放弃"汉人无用，不如尽杀之"的提议，以"可征税充军资"说服其保留汉地百姓。推行税收制度、设置十路征收课税使，使中原经济得以恢复。保护汉族文化，开科取士，修编历法。被誉为"元朝第一谋臣"，是蒙古从游牧征服者向中原王朝转变的关键人物。',
    achievements: ['保护汉地百姓', '推行税制', '开科取士', '元朝第一谋臣'],
    relations: [
      { id: 'wo_kuotai', type: '君臣', label: '窝阔台（倚重）' },
      { id: 'genghis_khan', type: '君臣', label: '成吉思汗（老臣）' },
    ],
    events: []
  },
  {
    id: 'guo_shoujing', name: '郭守敬', birth: 1231, death: 1316,
    cat: 'scientist', dynasty: '元', emoji: '🔬',
    location: { lat: 37.1, lng: 114.5, place: '顺德邢台（今河北邢台）' },
    desc: '元朝天文学家、数学家、水利学家。编制《授时历》，以365.2425天为一年，与现代公历完全一致，比西方格里高利历早300年。主持元大都水利建设，开凿通惠河使大运河直达北京，设计改造简仪、仰仪等天文仪器。精通历算、水利、测绘，是中国古代最伟大的科学家之一。',
    achievements: ['《授时历》', '365.2425天/年', '开凿通惠河', '天文仪器改革'],
    relations: [],
    events: ['e_shoushi_li']
  },
  {
    id: 'zhu_dao', name: '关汉卿', birth: 1219, death: 1301,
    cat: 'artist', dynasty: '元', emoji: '🎭',
    location: { lat: 39.9, lng: 116.4, place: '大都（今北京）' },
    desc: '元曲四大家之首，被誉为"东方莎士比亚"。代表作《窦娥冤》是中国古典悲剧巅峰，"六月飞雪"的典故出自此处。一生创作杂剧60余种，题材广泛，深刻揭露社会黑暗，同情底层人民。自述"我是个蒸不烂、煮不熟、捶不扁、炒不爆、响珰珰一粒铜豌豆"，可见其刚直不屈的性格。',
    achievements: ['《窦娥冤》', '元曲四大家', '杂剧60余种', '东方莎士比亚'],
    relations: [],
    events: []
  },
  {
    id: 'huang_daopo', name: '黄道婆', birth: 1245, death: 1330,
    cat: 'inventor', dynasty: '元', emoji: '🧵',
    location: { lat: 31.1, lng: 121.5, place: '松江乌泥泾（今上海）' },
    desc: '元代棉纺织技术革新家。少年时流落崖州（海南），向黎族学习棉纺织技术。约1295年返回故乡松江乌泥泾，改良纺车、织机，发明三锭脚踏纺车，使纺纱效率提高三倍。推广"错纱配色，综线挈花"技术，松江棉布"衣被天下"，松江成为中国棉纺织中心。是中国古代少有的女性技术革新者。',
    achievements: ['改良棉纺技术', '三锭脚踏纺车', '松江棉布', '衣被天下'],
    relations: [],
    events: []
  },
  {
    id: 'zhao_mengfu', name: '赵孟頫', birth: 1254, death: 1322,
    cat: 'artist', dynasty: '元', emoji: '🎨',
    location: { lat: 30.9, lng: 120.1, place: '吴兴（今浙江湖州）' },
    desc: '元朝书画大家，宋太祖赵匡胤十一世孙。出仕元朝备受争议，但艺术成就冠绝一代。书法集晋唐之大成，篆隶真行草无不精通，与欧阳询、颜真卿、柳公权并称"楷书四大家"。绘画开创元代文人画新风，主张"书画同源"，山水、人物、花鸟、竹石无所不精。妻子管道昇亦是著名书画家，"你侬我侬"的《我侬词》传为佳话。',
    achievements: ['楷书四大家', '书画同源', '元代文人画', '赵体书法'],
    relations: [],
    events: []
  },
  {
    id: 'tuo_tuo', name: '脱脱', birth: 1314, death: 1355,
    cat: 'politician', dynasty: '元', emoji: '🏛️',
    location: { lat: 42.0, lng: 121.7, place: '蒙古乞颜部' },
    desc: '元朝末年权相，字大用。1340年发动政变推翻权臣伯颜，推行"脱脱更化"：恢复科举、平反冤狱、减免赋税、修辽金宋三史，一度使元朝出现中兴希望。1344年黄河决口，脱脱征发17万民夫治河，但加重了百姓负担。1351年红巾军起义爆发，脱脱率军镇压屡有战功，却遭朝中政敌诬陷，被削职流放，1355年被毒死。其死后元朝再无人能挽救危局，13年后元亡。',
    achievements: ['脱脱更化', '恢复科举', '修辽金宋三史', '治理黄河'],
    relations: [],
    events: ['e_tuotuo_genghua']
  },
  {
    id: 'zhu_yuanzhang_yuan', name: '韩山童', birth: 1310, death: 1351,
    cat: 'politician', dynasty: '元', emoji: '🔥',
    location: { lat: 34.0, lng: 115.0, place: '颍州（今安徽阜阳）' },
    desc: '元末红巾军起义领袖。以白莲教聚众，口号"石人一只眼，挑动黄河天下反"深入人心。1351年与刘福通在颍州起义，头裹红巾号称"红巾军"，建立"大宋"政权。但起义不久即被元军捕获杀害。其子韩林儿被拥立为"小明王"，后为朱元璋所害。红巾军起义虽未成功，但敲响了元朝丧钟。',
    achievements: ['红巾军起义', '白莲教聚众', '反元先驱'],
    relations: [
      { id: 'zhu_yuanzhang', type: '同盟', label: '朱元璋（后继者）' },
    ],
    events: ['e_hongjin_qiyi']
  },

  // 明
  {
    id: 'zhu_yuanzhang', name: '朱元璋', birth: 1328, death: 1398,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 33.0, lng: 118.3, place: '濠州钟离（今安徽凤阳）' },
    desc: '明朝开国皇帝（明太祖），出身贫苦，由乞丐、和尚、起义军一步步成为皇帝，推翻元朝，建立大明。废丞相，加强皇权，大杀功臣。',
    achievements: ['建立明朝', '废除丞相', '推翻蒙古统治'],
    relations: [
      { id: 'liu_ji', type: '君臣', label: '刘伯温（谋士）' },
      { id: 'yongle', type: '父子', label: '朱棣（儿子）' }
    ],
    events: ['e_ming_founded']
  },
  {
    id: 'liu_ji', name: '刘伯温', birth: 1311, death: 1375,
    cat: 'philosopher', dynasty: '明', emoji: '🔮',
    location: { lat: 28.0, lng: 120.6, place: '处州青田（今浙江青田）' },
    desc: '明朝开国功臣，著名政治家、军事家、文学家，精通天文地理、兵法数学，辅助朱元璋建立明朝，被誉为"前知五百年，后知五百年"的神算子。',
    achievements: ['辅助建明', '著《烧饼歌》（传说）', '精通天文兵法'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'yongle', name: '明成祖朱棣', birth: 1360, death: 1424,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北平/北京' },
    desc: '明朝第三位皇帝，通过靖难之役夺取侄子建文帝的皇位。迁都北京，命郑和下西洋，编修《永乐大典》，开创永乐盛世。',
    achievements: ['迁都北京', '郑和下西洋', '《永乐大典》', '靖难之役'],
    relations: [
      { id: 'zhu_yuanzhang', type: '父子', label: '朱元璋（父亲）' },
      { id: 'zheng_he', type: '君臣', label: '郑和（派遣下西洋）' }
    ],
    events: ['e_yongle_qianba', 'e_zhenghe_voyage']
  },
  {
    id: 'zheng_he', name: '郑和', birth: 1371, death: 1433,
    cat: 'politician', dynasty: '明', emoji: '⚓',
    location: { lat: 24.4, lng: 118.1, place: '昆阳州（今云南昆明）' },
    desc: '明朝航海家、外交家，七下西洋，最远到达非洲东海岸和红海沿岸，是世界航海史上的壮举，比哥伦布发现美洲早了近百年。',
    achievements: ['七下西洋', '促进东西方交流', '最远到达非洲'],
    relations: [{ id: 'yongle', type: '君臣', label: '朱棣（遣派出使）' }],
    events: ['e_zhenghe_voyage']
  },
  {
    id: 'wang_yangming', name: '王阳明', birth: 1472, death: 1529,
    cat: 'philosopher', dynasty: '明', emoji: '💡',
    location: { lat: 29.8, lng: 121.5, place: '余姚（今浙江余姚）' },
    desc: '明代著名哲学家、军事家、政治家，心学集大成者。提出"心即理""知行合一""致良知"等哲学命题，影响了东亚哲学数百年。龙场悟道开宗立派，平定宁王之乱展现军事奇才，一生文武兼备，是中国历史上罕见的立德、立功、立言"三不朽"之人。',
    achievements: ['心学集大成', '知行合一', '龙场悟道', '平定宁王之乱', '致良知'],
    relations: [],
    events: []
  },
  {
    id: 'jianwen', name: '建文帝朱允炆', birth: 1377, death: 1402,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 32.0, lng: 118.8, place: '南京' },
    desc: '明朝第二位皇帝，朱元璋之孙。即位后推行削藩，引发燕王朱棣起兵反抗，靖难之役中兵败，南京城破后下落不明，成为明史最大谜案之一。有说法其化装僧人逃出，云游四方。',
    achievements: ['推行削藩', '宽政爱民'],
    relations: [{ id: 'yongle', type: '叔侄', label: '朱棣（叔父）' }],
    events: ['e_jingnan']
  },
  {
    id: 'xu_da', name: '徐达', birth: 1332, death: 1385,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 34.2, lng: 117.1, place: '濠州钟离（今安徽凤阳）' },
    desc: '明朝开国第一功臣，与朱元璋同乡，自参加红巾军起追随朱元璋，南征北战。率军北伐，攻克元大都（北京），推翻元朝统治。为人谨慎，善于治军，被誉为"大明第一名将"，朱元璋称其为"万里长城"。',
    achievements: ['攻克元大都', '北伐灭元', '大明第一名将', '万里长城'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'chang_yuchun', name: '常遇春', birth: 1330, death: 1369,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 33.6, lng: 117.9, place: '怀远（今安徽怀远）' },
    desc: '明朝开国名将，勇冠三军，自称"能将十万众，横行天下"，军中称"常十万"。鄱阳湖大战中射杀陈友谅头号猛将张定边，北伐中屡建奇功，暴卒于军中，年仅39岁。',
    achievements: ['鄱阳湖大战立功', '北伐先锋', '常十万'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }, { id: 'xu_da', type: '同盟', label: '徐达（搭档）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'yu_qian', name: '于谦', birth: 1398, death: 1457,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.3, lng: 120.2, place: '钱塘（今浙江杭州）' },
    desc: '明朝名臣、民族英雄。土木堡之变后，力排众议坚守北京，拥立景帝，组织北京保卫战，击退瓦剌也先大军，挽救了大明王朝。后遭英宗复辟冤杀，"千锤万凿出深山，烈火焚烧若等闲"，其《石灰吟》恰如其一生。',
    achievements: ['北京保卫战', '力挽狂澜', '《石灰吟》'],
    relations: [],
    events: ['e_tumubao']
  },
  {
    id: 'ming_yingzong', name: '明英宗朱祁镇', birth: 1427, death: 1464,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第六位皇帝，宠信太监王振，御驾亲征瓦剌，在土木堡被俘，史称"土木堡之变"。被俘一年后获释回京，被软禁南宫七年。发动夺门之变复辟，冤杀于谦，但废除了残酷的殉葬制度。',
    achievements: ['废除殉葬制度'],
    relations: [{ id: 'yu_qian', type: '对立', label: '于谦（冤杀）' }],
    events: ['e_tumubao', 'e_duomen']
  },
  {
    id: 'zhang_juzheng', name: '张居正', birth: 1525, death: 1582,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.4, lng: 112.2, place: '江陵（今湖北荆州）' },
    desc: '明朝最杰出的改革家、政治家，万历初年内阁首辅。推行"一条鞭法"改革赋税，清丈田地，整顿吏治实行"考成法"，使国库充盈，太仓积粟可支十年。但作风专断，死后遭万历清算抄家，改革成果逐渐被废。',
    achievements: ['一条鞭法', '考成法', '万历中兴', '清丈田地'],
    relations: [],
    events: ['e_wanli_zhongxing']
  },
  {
    id: 'hai_rui', name: '海瑞', birth: 1514, death: 1587,
    cat: 'politician', dynasty: '明', emoji: '⚖️',
    location: { lat: 19.9, lng: 110.3, place: '琼山（今海南海口）' },
    desc: '明朝著名清官，人称"海青天""南包公"。任户部主事时上疏《治安疏》痛斥嘉靖帝，被下狱论死，嘉靖死后获释。任应天巡抚时推行退田还民、严惩贪腐，遭权贵排挤去职。一生清贫，死时家无余财，百姓沿街哭泣送行。',
    achievements: ['上疏痛斥嘉靖', '海青天', '《治安疏》'],
    relations: [{ id: 'zhang_juzheng', type: '对立', label: '张居正（政敌）' }],
    events: []
  },
  {
    id: 'qi_jiguang', name: '戚继光', birth: 1528, death: 1588,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 37.5, lng: 121.4, place: '登州（今山东蓬莱）' },
    desc: '明朝抗倭名将、军事家。在东南沿海抗击倭寇十余年，创立"鸳鸯阵"，组建训练有素的"戚家军"，大小百余战未尝败绩。后镇守北疆，修筑蓟镇长城，抵御蒙古。著有《纪效新书》《练兵实纪》，是中国古代军事理论重要遗产。',
    achievements: ['平定倭患', '创立鸳鸯阵', '戚家军', '《纪效新书》'],
    relations: [{ id: 'zhang_juzheng', type: '同盟', label: '张居正（支持者）' }],
    events: ['e_anti_wako']
  },
  {
    id: 'ming_shenzong', name: '万历帝朱翊钧', birth: 1563, death: 1620,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝在位时间最长的皇帝（48年），前十年在张居正辅政下出现"万历中兴"。亲政后清算张居正，因立储之争与群臣对抗，长达28年不上朝，被称为"怠政皇帝"。万历三大征虽全胜，但国库耗尽，为明朝灭亡埋下伏笔。"明亡于万历"成为后世共识。',
    achievements: ['万历三大征', '万历中兴（前期）'],
    relations: [{ id: 'zhang_juzheng', type: '君臣', label: '张居正（首辅）' }],
    events: ['e_wanli_zhongxing', 'e_wanli_three_war']
  },
  {
    id: 'li_zicheng', name: '李自成', birth: 1606, death: 1645,
    cat: 'general', dynasty: '明', emoji: '✊',
    location: { lat: 38.3, lng: 109.8, place: '米脂（今陕西榆林）' },
    desc: '明末农民起义领袖，号称"闯王"。提出"均田免赋"口号，深得民心，"迎闯王，不纳粮"。1644年攻入北京，推翻明朝，建立大顺政权。但因纵容部下烧杀抢掠，失尽民心，山海关之战败于吴三桂与清军联军，退出北京，后在湖北九宫山被乡民击杀。',
    achievements: ['推翻明朝', '均田免赋', '建立大顺'],
    relations: [{ id: 'zhu_yuanzhang', type: '传承', label: '朱元璋（同为起义建政）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'chongzhen', name: '崇祯帝朱由检', birth: 1611, death: 1644,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝末代皇帝，即位后铲除魏忠贤阉党，欲振兴大明。但生性多疑，刚愎自用，17年间更换50位内阁首辅。内有李自成、张献忠起义，外有后金（清）入侵，加之天灾不断，回天无力。李自成攻入北京，崇祯在煤山（景山）自缢殉国，明朝灭亡，遗书"朕非亡国之君，臣皆亡国之臣"。',
    achievements: ['铲除阉党', '殉国煤山'],
    relations: [],
    events: ['e_ming_fall']
  },
  {
    id: 'tang_xianzu', name: '汤显祖', birth: 1550, death: 1616,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 27.9, lng: 116.3, place: '临川（今江西抚州）' },
    desc: '明代戏曲家、文学家，被誉为"东方莎士比亚"。代表作《牡丹亭》写杜丽娘与柳梦梅生死之恋，"情不知所起，一往而深，生者可以死，死可以生"成为千古名句。与莎士比亚同年去世。',
    achievements: ['《牡丹亭》', '临川四梦', '东方莎士比亚'],
    relations: [],
    events: []
  },
  {
    id: 'song_yingxing', name: '宋应星', birth: 1587, death: 1666,
    cat: 'scientist', dynasty: '明', emoji: '🔬',
    location: { lat: 27.7, lng: 115.6, place: '奉新（今江西宜春）' },
    desc: '明代科学家，编著《天工开物》，系统记录了农业和手工业生产技术，涵盖种植、纺织、冶炼、陶瓷等18个门类，被誉为"中国17世纪的工艺百科全书"，比西方类似著作早约一个世纪。',
    achievements: ['《天工开物》', '中国工艺百科全书'],
    relations: [],
    events: []
  },
  {
    id: 'li_shizhen', name: '李时珍', birth: 1518, death: 1593,
    cat: 'scientist', dynasty: '明', emoji: '🌿',
    location: { lat: 30.2, lng: 115.4, place: '蕲州（今湖北蕲春）' },
    desc: '明代医药学家，历时27年三易其稿，编著《本草纲目》，收录药物1892种、方剂11096首，附图1160幅，是中国古代最伟大的药物学著作，被达尔文称为"中国古代的百科全书"。',
    achievements: ['《本草纲目》', '药物学巨著', '收录1892种药物'],
    relations: [],
    events: []
  },
  {
    id: 'wei_zhongxian', name: '魏忠贤', birth: 1568, death: 1627,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明末权阉，号称"九千岁"，天启年间把持朝政，迫害东林党人，全国各地为其建生祠。崇祯帝即位后将其铲除，阉党覆灭，但明朝元气已大伤，加速了灭亡进程。',
    achievements: [],
    relations: [{ id: 'chongzhen', type: '对立', label: '崇祯帝（铲除者）' }],
    events: []
  },
  {
    id: 'yan_song', name: '严嵩', birth: 1480, death: 1567,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 27.8, lng: 114.4, place: '分宜（今江西新余）' },
    desc: '明朝权臣，专国政近二十年，贪污腐败，排斥异己，杀害忠良夏言、杨继盛等。其子严世蕃更为跋扈，卖官鬻爵。最终被邹应龙弹劾倒台，严世蕃伏诛，严嵩寄食墓舍而死。',
    achievements: [],
    relations: [],
    events: []
  },

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
// rulers/politicians
{ id: 'jingtai', name: '景泰帝朱祁钰', birth: 1428, death: 1457, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明英宗之弟。土木堡之变后在于谦拥立下即位，任用于谦击退瓦剌。英宗复辟后被废为郕王，不久去世。', achievements: ['保卫北京', '任用于谦'], relations: [], events: [] },
{ id: 'xie_jin', name: '解缙', birth: 1369, death: 1415, cat: 'scholar', dynasty: '明', emoji: '📚', desc: '明代大儒，主持编纂《永乐大典》——世界最大的百科全书。因卷入太子之争被下狱，死于狱中。', achievements: ['编纂永乐大典'], relations: [], events: [] },
{ id: 'xu_guangqi', name: '徐光启', birth: 1562, death: 1633, cat: 'scientist', dynasty: '明', emoji: '📐', desc: '明朝大臣、科学家。师从利玛窦学习西学，翻译《几何原本》，编纂《农政全书》，是中国近代科学的先驱。', achievements: ['翻译几何原本', '农政全书', '西学引进'], relations: [], events: [] },
{ id: 'matteo_ricci', name: '利玛窦', birth: 1552, death: 1610, cat: 'scientist', dynasty: '明', emoji: '✝️', desc: '意大利耶稣会传教士。1582年来华，将西方天文、数学、地理引入中国，绘制《坤舆万国全图》。穿儒服、学汉语，开创了中西文化交流的新纪元。', achievements: ['坤舆万国全图', '西学东渐', '中西文化桥梁'], relations: [], events: [] },
{ id: 'yuan_chonghuan', name: '袁崇焕', birth: 1584, death: 1630, cat: 'general', dynasty: '明', emoji: '🛡️', desc: '明末抗清名将。宁远之战以红衣大炮击伤努尔哈赤（传说致死），宁锦之战再败皇太极。被崇祯帝凌迟处死，明朝自毁长城。', achievements: ['宁远大捷', '宁锦大捷', '明朝长城'], relations: [], events: [] },
{ id: 'shi_kefa', name: '史可法', birth: 1602, death: 1645, cat: 'general', dynasty: '明', emoji: '🏴', desc: '明末忠臣。清军南下时死守扬州，城破被俘，拒绝投降后被杀。扬州百姓建史公祠纪念，是明末气节的象征。', achievements: ['死守扬州', '民族气节'], relations: [], events: [] },
{ id: 'fang_xiaoru', name: '方孝孺', birth: 1357, death: 1402, cat: 'scholar', dynasty: '明', emoji: '📜', desc: '建文帝师。朱棣即位后令其草拟诏书，方孝孺投笔于地拒绝，被灭十族（唯一历史记载）。其气节为后世景仰。', achievements: ['忠臣气节', '灭十族'], relations: [], events: [] },
{ id: 'shen_wansan', name: '沈万三', birth: 1306, death: 1394, cat: 'politician', dynasty: '明', emoji: '💰', desc: '元末明初江南巨富，以海外贸易致富，财富富可敌国。传说资助修建南京城墙三分之一，后因触怒朱元璋被流放云南。', achievements: ['江南巨富', '修筑南京城墙'], relations: [], events: [] },
{ id: 'wang_zhen', name: '王振', birth: 1400, death: 1449, cat: 'politician', dynasty: '明', emoji: '🕸️', desc: '明英宗时权倾朝野的大太监。怂恿英宗御驾亲征瓦剌，导致土木堡之变，英宗被俘，王振在乱军中被杀。', achievements: ['土木堡之变祸首', '宦官专权'], relations: [], events: [] },
{ id: 'yu_dayou', name: '俞大猷', birth: 1503, death: 1579, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '抗倭名将，与戚继光并称"俞龙戚虎"。在东南沿海抗击倭寇，转战闽浙粤赣，战功卓著。善诗文，著有《正气堂集》。', achievements: ['俞龙戚虎', '抗倭名将'], relations: [], events: [] },
{ id: 'yang_jisheng', name: '杨继盛', birth: 1516, death: 1555, cat: 'scholar', dynasty: '明', emoji: '✊', desc: '明朝忠臣。上疏弹劾权臣严嵩十大罪状，被下狱拷打至骨折。狱中用碎碗片自割腐肉，留下"铁肩担道义，辣手著文章"的千古名句，从容赴死。', achievements: ['弹劾严嵩', '铁肩道义'], relations: [], events: [] },
{ id: 'tang_saier', name: '唐赛儿', birth: 1399, death: 1450, cat: 'military', dynasty: '明', emoji: '⚡', desc: '明初女起义领袖。以白莲教聚众数万起义，攻占州县。明成祖派大军镇压，唐赛儿突围后不知所踪，成为传奇人物。', achievements: ['女起义领袖', '白莲教起义'], relations: [], events: [] },
{ id: 'kuang_zhong', name: '况钟', birth: 1383, death: 1443, cat: 'politician', dynasty: '明', emoji: '⚖️', desc: '明代著名清官。任苏州知府13年，革除积弊，减轻赋税，深得民心。离任时百姓遮道挽留，是明朝"三大青天"之一。', achievements: ['苏州青天', '三大青天'], relations: [], events: [] },
{ id: 'yang_shiqi', name: '杨士奇', birth: 1365, death: 1444, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '明朝名臣，历事五朝的内阁首辅。与杨荣、杨溥并称"三杨"，辅佐仁宣之治。为人宽厚，善于调和，是明代文官政治的典范。', achievements: ['三杨之首', '仁宣之治'], relations: [], events: [] },
{ id: 'dong_qichang', name: '董其昌', birth: 1555, death: 1636, cat: 'artist', dynasty: '明', emoji: '🖌️', desc: '晚明书画大家，文人画理论集大成者。提出"南北宗论"，影响了其后300年的中国画坛。其书法和山水画均属一流。', achievements: ['南北宗论', '文人画理论', '书画双绝'], relations: [], events: [] },
{ id: 'lang_ying', name: '郎瑛', birth: 1487, death: 1566, cat: 'scholar', dynasty: '明', emoji: '📝', desc: '明代学者、笔记作家。所著《七修类稿》涵盖天文、地理、历史、文学等各领域，是了解明代社会文化的珍贵史料。', achievements: ['七修类稿'], relations: [], events: [] },
{ id: 'zheng_zhilong', name: '郑芝龙', birth: 1604, death: 1661, cat: 'military', dynasty: '明', emoji: '⛵', desc: '明末海上霸主，郑成功之父。以台湾为基地垄断中日海上贸易，拥有庞大舰队。降清后被软禁并杀害。', achievements: ['海上霸主', '垄断中日贸易'], relations: [], events: [] },
{ id: 'lan_yu', name: '蓝玉', birth: 1340, death: 1393, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '明朝开国名将。捕鱼儿海之战大破北元残余势力，俘获元皇子及妃嫔大臣数百人。后以谋反罪被朱元璋诛杀，牵连者达一万五千人。', achievements: ['捕鱼儿海大捷', '灭北元残余'], relations: [], events: [] },
// === 洪武 (朱元璋) 1368-1398 相关 ===
// 朱元璋 已有。新增关联人物：
{ id: 'ma_empress', name: '马皇后', birth: 1332, death: 1382, cat: 'politician', dynasty: '明', emoji: '👸', desc: '明太祖朱元璋的结发妻子。出身贫寒，聪慧贤德，多次劝谏朱元璋减少杀戮。传说朱元璋发怒时无人敢劝，唯有马皇后能使他息怒。', achievements: ['贤后典范', '劝谏减刑'], relations: [{ id: 'zhu_yuanzhang', type: '夫妻', label: '朱元璋' }], events: [] },
{ id: 'li_shanzhang', name: '李善长', birth: 1314, death: 1390, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '明朝开国第一功臣，韩国公。辅助朱元璋建立明朝，制定各项制度。后因胡惟庸案牵连，全家七十余口被诛杀。', achievements: ['首任丞相', '制定律令'], relations: [], events: [] },
{ id: 'hu_weiyong', name: '胡惟庸', birth: 1325, death: 1380, cat: 'politician', dynasty: '明', emoji: '🕸️', desc: '明朝最后一位丞相。以谋反罪被诛杀，株连三万余人。朱元璋借此废除丞相制度，将权力集中于皇帝一身。', achievements: ['末代丞相', '胡惟庸案'], relations: [], events: [] },
{ id: 'mu_ying', name: '沐英', birth: 1345, death: 1392, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '朱元璋养子，世镇云南的黔国公。平定云南，设卫所屯田。沐氏世袭镇守云南直至明亡，是明代最显赫的世袭武将家族。', achievements: ['平定云南', '世镇云南'], relations: [], events: [] },

// === 建文 (朱允炆) 1398-1402 相关 ===
// 建文帝已有。新增：
{ id: 'qi_tai', name: '齐泰', birth: 1365, death: 1402, cat: 'politician', dynasty: '明', emoji: '📜', desc: '建文帝兵部尚书，削藩政策的主要策划者。靖难之役中兵败，被朱棣处死，全家被灭族。', achievements: ['削藩策划'], relations: [], events: [] },
{ id: 'huang_zicheng', name: '黄子澄', birth: 1350, death: 1402, cat: 'politician', dynasty: '明', emoji: '📜', desc: '建文朝太常寺卿，与齐泰共同推进削藩。靖难之役兵败被俘，被朱棣凌迟处死，株连九族。', achievements: ['削藩谋臣'], relations: [], events: [] },

// === 永乐 (朱棣) 1402-1424 相关 ===
// 朱棣已有。新增：
{ id: 'yao_guangxiao', name: '姚广孝', birth: 1335, death: 1418, cat: 'philosopher', dynasty: '明', emoji: '🔮', desc: '僧侣出身，靖难之役的首席谋士。辅佐朱棣夺取天下后不恋权位，回寺为僧。被称为黑衣宰相。', achievements: ['靖难首谋', '黑衣宰相'], relations: [], events: [] },
{ id: 'zhang_fu', name: '张辅', birth: 1375, death: 1449, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '永乐朝名将。四征安南，将安南并入明朝版图。后在土木堡之变中战死，一门忠烈。', achievements: ['四征安南', '土木堡殉国'], relations: [], events: [] },
{ id: 'hou_xian', name: '侯显', birth: 1370, death: 1430, cat: 'politician', dynasty: '明', emoji: '⛵', desc: '明代宦官航海家。五次出使西洋和西藏，是郑和之外明朝最重要的航海外交使节。', achievements: ['五使西洋', '航海外交'], relations: [], events: [] },

// === 洪熙 (朱高炽) 1424-1425 ===
{ id: 'hongxi', name: '洪熙帝朱高炽', birth: 1378, death: 1425, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第四位皇帝。在位仅十个月即病逝。但停止下西洋、平反建文旧臣、减免赋税，开创了转向文治的方向。其子宣德帝继承其政策。', achievements: ['停止下西洋', '平反旧臣', '在位仅十月'], relations: [{ id: 'yongle', type: '父子', label: '朱棣' }], events: [] },
// 同期世界: 日本室町幕府足利义教在位 朝鲜世宗大王创造韩文

// === 宣德 (朱瞻基) 1425-1435 ===
{ id: 'xuande', name: '宣德帝朱瞻基', birth: 1399, death: 1435, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第五位皇帝。与其父洪熙帝共同开创仁宣之治，与汉代文景之治并称。善书画，尤工花鸟。平定汉王朱高煦叛乱。', achievements: ['仁宣之治', '善书画', '平定汉王之乱'], relations: [], events: [] },
{ id: 'yang_rong', name: '杨荣', birth: 1371, death: 1440, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '三杨之一。历事成祖至英宗四朝，多次随军出征参与决策。以机敏果决著称，被誉为"东杨"。', achievements: ['四朝元老', '随军决策'], relations: [], events: [] },
{ id: 'yang_pu', name: '杨溥', birth: 1372, death: 1446, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '三杨之一。因建文旧臣入狱十年仍坚持读书。仁宣时复起，位居首辅。以宽厚稳重著称。', achievements: ['狱中读书十年', '宽厚首辅'], relations: [], events: [] },
// 同期: 1433郑和第七次下西洋结束 朝鲜颁布训民正音

// === 正统 (朱祁镇) 1435-1449 相关 ===
// 明英宗已有。新增：
// 同期事件: 1444匈牙利击败奥斯曼 1449也先俘虏英宗

// === 景泰 (朱祁钰) 1449-1457 相关 ===
// 景泰帝已有。新增：
// 同期世界: 1453君士坦丁堡陷落 东罗马灭亡

// === 天顺 (朱祁镇复辟) 1457-1464 ===
{ id: 'cao_jixiang', name: '曹吉祥', birth: 1410, death: 1461, cat: 'politician', dynasty: '明', emoji: '🕸️', desc: '英宗复辟的功臣太监。夺门之变中帮助英宗复位。后因野心膨胀起兵谋反，兵败被凌迟处死。', achievements: ['夺门之变', '太监谋反'], relations: [], events: [] },
// 同期世界: 1467应仁之乱 日本战国时代开始

// === 成化 (朱见深) 1464-1487 ===
{ id: 'chenghua', name: '成化帝朱见深', birth: 1447, death: 1487, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第八位皇帝。童年因土木堡之变历经坎坷。在位时万贵妃专宠，设立西厂特务机构。但成化瓷器（斗彩鸡缸杯）为中国瓷器巅峰。', achievements: ['成化斗彩', '设立西厂', '万贵妃专宠'], relations: [], events: [] },
{ id: 'wan_gui_fei', name: '万贵妃', birth: 1428, death: 1487, cat: 'politician', dynasty: '明', emoji: '💋', desc: '明宪宗宠妃。比皇帝年长19岁却专宠终生。其骄纵导致后宫无人敢生育皇子。成化帝死后不久她也去世，随帝而去。', achievements: ['专宠终生', '年差19岁'], relations: [], events: [] },
{ id: 'wang_zhi', name: '汪直', birth: 1450, death: 1505, cat: 'politician', dynasty: '明', emoji: '👁️', desc: '成化朝权宦，西厂提督。以特务手段监控全国官员，权倾一时。后失宠被贬，年仅四十余岁退隐。', achievements: ['西厂首领', '特务统治'], relations: [], events: [] },
// 同期世界: 1480莫斯科大公国摆脱蒙古统治 1492哥伦布发现美洲

// === 弘治 (朱祐樘) 1487-1505 ===
{ id: 'hongzhi', name: '弘治帝朱祐樘', birth: 1470, death: 1505, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第九位皇帝。中国历史上唯一坚持一夫一妻的皇帝。勤政爱民，罢黜奸宦，起用正直大臣，开创弘治中兴。', achievements: ['一夫一妻', '弘治中兴', '勤政爱民'], relations: [], events: [] },
{ id: 'liu_jian', name: '刘健', birth: 1433, death: 1526, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '弘治朝首辅。辅佐孝宗开创弘治中兴，为人刚正不阿。正德初年因反对刘瑾专权愤而辞职。', achievements: ['弘治中兴', '刚正不阿'], relations: [], events: [] },
// 同期世界: 1498达伽马到印度 1500葡萄牙发现巴西

// === 正德 (朱厚照) 1505-1521 ===
{ id: 'zhengde', name: '正德帝朱厚照', birth: 1491, death: 1521, cat: 'emperor', dynasty: '明', emoji: '🎭', desc: '明朝第十位皇帝。明朝最另类的皇帝。喜欢微服出巡，自封威武大将军，在豹房玩乐。曾亲自率军在应州击退蒙古入侵。无子而终。', achievements: ['自封大将军', '应州大捷', '豹房'], relations: [], events: [] },
{ id: 'liu_jin', name: '刘瑾', birth: 1451, death: 1510, cat: 'politician', dynasty: '明', emoji: '🕸️', desc: '正德朝权倾天下的大太监。与另外七名太监结为八虎。贪污腐败至极，被凌迟3357刀处死，是明代最著名的权阉之一。', achievements: ['八虎之首', '凌迟处死'], relations: [], events: [] },
// 同期世界: 1517马丁路德发表95条论纲 1519麦哲伦环球航行 1521麦哲伦在菲律宾被杀

// === 嘉靖 (朱厚熜) 1521-1567 ===
{ id: 'jiajing', name: '嘉靖帝朱厚熜', birth: 1507, death: 1567, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第十一位皇帝。前期革除弊政出现中兴迹象，后期沉迷道教炼丹求长生，二十余年不上朝。大礼议之争影响深远。海瑞上疏骂皇帝。', achievements: ['大礼议', '嘉靖中兴', '二十年不上朝'], relations: [], events: [] },
{ id: 'xia_yan', name: '夏言', birth: 1482, death: 1548, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '嘉靖朝首辅。力主收复河套，被严嵩陷害致死。其死标志着嘉靖朝政治从清明转向腐败。', achievements: ['首辅', '被严嵩陷害'], relations: [], events: [] },
{ id: 'xu_jie', name: '徐阶', birth: 1503, death: 1583, cat: 'politician', dynasty: '明', emoji: '🎯', desc: '嘉靖末年至隆庆初年首辅。隐忍数十年最终扳倒严嵩，为杨继盛等忠臣平反。以其政治智慧结束了一个黑暗时代。', achievements: ['扳倒严嵩', '为忠臣平反'], relations: [], events: [] },
// 同期世界: 1543哥白尼日心说出版 1545特伦托会议开始反宗教改革 1564莎士比亚诞生

// === 隆庆 (朱载坖) 1567-1572 ===
{ id: 'longqing', name: '隆庆帝朱载坖', birth: 1537, death: 1572, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第十二位皇帝。在位仅六年但意义重大。解除海禁（隆庆开关），允许民间海外贸易。与蒙古俺答汗达成隆庆和议，结束长达百年的北疆战争。', achievements: ['隆庆开关', '隆庆和议', '结束百年北疆战事'], relations: [], events: [] },
{ id: 'gao_gong', name: '高拱', birth: 1513, death: 1578, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '隆庆朝首辅。积极支持隆庆和议与开关政策。性格刚烈，与张居正有过激烈权力斗争，最终被罢官。', achievements: ['隆庆和议', '支持开关'], relations: [], events: [] },
// 同期世界: 1568织田信长上洛 1571勒班多海战

// === 万历 (朱翊钧) 1572-1620 相关 ===
// 万历帝已有。新增：
{ id: 'li_ru_song', name: '李如松', birth: 1549, death: 1598, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '万历朝名将。平定宁夏哱拜之乱，朝鲜之役中率明军收复平壤大破日军。后在与蒙古作战中阵亡。是万历三大征的主要统帅。', achievements: ['收复平壤', '三大征统帅'], relations: [], events: [] },
{ id: 'shen_yiguan', name: '沈一贯', birth: 1531, death: 1615, cat: 'politician', dynasty: '明', emoji: '🏛️', desc: '万历时首辅。在国本之争中调和皇权与文官集团，但也被指责导致后来的党争激化。', achievements: ['首辅', '调和国本之争'], relations: [], events: [] },
// 同期世界: 1588西班牙无敌舰队覆灭 1592壬辰倭乱 1600关原之战

// === 泰昌 (朱常洛) 1620 ===
{ id: 'taichang', name: '泰昌帝朱常洛', birth: 1582, death: 1620, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第十四位皇帝。苦等39年终于即位，但在位仅29天即因红丸案暴毙。是明朝最短命的皇帝之一。其死引发明末三大案。', achievements: ['在位29天', '红丸案'], relations: [], events: [] },

// === 天启 (朱由校) 1620-1627 ===
{ id: 'tianqi', name: '天启帝朱由校', birth: 1605, death: 1627, cat: 'emperor', dynasty: '明', emoji: '👑', desc: '明朝第十五位皇帝。酷爱木工手艺胜于朝政，将国事尽付魏忠贤。其在位期间太监专权达到顶峰，后金（清朝）趁机壮大。', achievements: ['木工皇帝', '魏忠贤专权'], relations: [], events: [] },
{ id: 'yang_lian', name: '杨涟', birth: 1572, death: 1625, cat: 'politician', dynasty: '明', emoji: '✊', desc: '东林党领袖。上疏弹劾魏忠贤二十四条大罪，被诬陷下狱。狱中被铁钉贯耳、土袋压身，临终血书"大笑大笑还大笑，刀砍东风，于我何有哉"，从容赴死。', achievements: ['弹劾魏忠贤', '东林六君子'], relations: [], events: [] },
{ id: 'sun_chengzong', name: '孙承宗', birth: 1563, death: 1638, cat: 'general', dynasty: '明', emoji: '🛡️', desc: '明末军事家。督师蓟辽，建立关宁锦防线，培养袁崇焕等名将。清军攻高阳时率全家守城，城破全家百余人殉国。', achievements: ['关宁锦防线', '培养袁崇焕', '阖门殉国'], relations: [], events: [] },
// 同期世界: 1620五月花号 1626荷兰买曼哈顿

// === 崇祯 (朱由检) 1627-1644 相关 ===
// 崇祯已有。新增：
{ id: 'wu_sangui', name: '吴三桂', birth: 1612, death: 1678, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '明末宁远总兵。李自成攻破北京后降清，引清军入关。后镇守云南反清复明失败，是明末最具争议的历史人物。', achievements: ['引清军入关', '三藩之首'], relations: [], events: [] },
{ id: 'hong_chengchou', name: '洪承畴', birth: 1593, death: 1665, cat: 'general', dynasty: '明', emoji: '⚔️', desc: '明末著名统帅。松锦之战兵败降清，成为清朝开国功臣。明人耻其降敌，清人也讥其不忠，一生背负骂名。', achievements: ['降清贰臣', '松锦之战'], relations: [], events: [] },
{ id: 'chen_yuanyuan', name: '陈圆圆', birth: 1623, death: 1695, cat: 'artist', dynasty: '明', emoji: '🌸', desc: '明末秦淮八艳之一。吴三桂为其"冲冠一怒为红颜"引清兵入关。其美貌与命运交织了大时代的剧变。', achievements: ['秦淮八艳', '冲冠一怒为红颜'], relations: [], events: [] },

  // 清
  {
    id: 'nurhachi', name: '努尔哈赤', birth: 1559, death: 1626,
    cat: 'emperor', dynasty: '清', emoji: '🏹',
    location: { lat: 41.8, lng: 123.4, place: '费阿拉城（今辽宁新宾）' },
    desc: '后金开国之君，女真族领袖。以"七大恨"告天起兵，统一女真各部，建立八旗制度，是清朝的奠基者，创立满文。',
    achievements: ['统一女真', '建立八旗', '建立后金', '创满文'],
    relations: [{ id: 'hong_taiji', type: '父子', label: '皇太极（儿子）' }],
    events: ['e_houjin_jianguo']
  },
  {
    id: 'hong_taiji', name: '皇太极', birth: 1592, death: 1643,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 41.8, lng: 123.4, place: '盛京（今辽宁沈阳）' },
    desc: '清朝第二位君主，努尔哈赤之子。改国号为清，改族名为满洲，多次入关劫掠，为清军入主中原奠定基础。',
    achievements: ['改国号为清', '改族名满洲', '为入关奠基'],
    relations: [
      { id: 'nurhachi', type: '父子', label: '努尔哈赤（父亲）' },
      { id: 'shunzhi', type: '父子', label: '顺治帝（儿子）' }
    ],
    events: ['e_qing_gaohao']
  },
  {
    id: 'kangxi', name: '康熙帝', birth: 1654, death: 1722,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝第四位皇帝，在位61年，是中国历史上在位时间最长的皇帝。平三藩、收台湾、驱沙俄、亲征准噶尔，开创"康乾盛世"。',
    achievements: ['平三藩', '收台湾', '抵御沙俄', '康熙字典', '在位最长'],
    relations: [
      { id: 'yongzheng', type: '父子', label: '雍正帝（儿子）' },
    ],
    events: ['e_santai', 'e_taiwan_tongyi']
  },
  {
    id: 'yongzheng', name: '雍正帝', birth: 1678, death: 1735,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝第五位皇帝，以铁腕手段整顿吏治，推行摊丁入亩、火耗归公等改革，国库充实，为乾隆盛世奠定基础。',
    achievements: ['整顿吏治', '摊丁入亩', '秘密立储制'],
    relations: [
      { id: 'kangxi', type: '父子', label: '康熙（父亲）' },
      { id: 'qianlong', type: '父子', label: '乾隆（儿子）' }
    ],
    events: []
  },
  {
    id: 'qianlong', name: '乾隆帝', birth: 1711, death: 1799,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝第六位皇帝，在位60年，实际掌权长达63年。十全武功，编修《四库全书》，晚年宠信和珅，闭关锁国，清朝由盛转衰。',
    achievements: ['十全武功', '《四库全书》', '平定准噶尔', '乾隆盛世'],
    relations: [
      { id: 'yongzheng', type: '父子', label: '雍正（父亲）' },
      { id: 'heshen', type: '君臣', label: '和珅（宠臣）' }
    ],
    events: ['e_siku_quanshu']
  },
  {
    id: 'heshen', name: '和珅', birth: 1750, death: 1799,
    cat: 'politician', dynasty: '清', emoji: '💰',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '清乾隆朝权臣，中国历史上最大的贪官，聚敛财富相当于清朝15年财政收入。乾隆死后被嘉庆帝赐死，"和珅跌倒，嘉庆吃饱"。',
    achievements: [],
    relations: [
      { id: 'qianlong', type: '君臣', label: '乾隆（宠爱者）' },
    ],
    events: ['e_heshen_huo']
  },
  {
    id: 'cao_xueqin', name: '曹雪芹', birth: 1715, death: 1763,
    cat: 'scholar', dynasty: '清', emoji: '📖',
    location: { lat: 39.9, lng: 116.4, place: '江宁（今江苏南京），后居北京西郊' },
    desc: '清代小说家，著有《红楼梦》，中国古典小说的巅峰之作，是中国四大名著之首，影响了无数后世读者和研究者。曹家原为江南织造，曾煊赫一时，后遭抄家败落。曹雪芹以自身家族兴衰为蓝本，"批阅十载，增删五次"创作此书，终因贫病交加而逝，未完稿。',
    achievements: ['著《红楼梦》', '中国古典文学巅峰', '批阅十载增删五次'],
    relations: [],
    events: []
  },
  {
    id: 'shunzhi', name: '顺治帝福临', birth: 1638, death: 1661,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝入关后第一位皇帝，6岁即位，由摄政王多尔衮辅政。多尔衮死后亲政，推行满汉融合政策。笃信佛教，宠信董鄂妃，董鄂妃死后悲痛欲绝，不久驾崩（一说出家为僧），年仅24岁。',
    achievements: ['入关定鼎', '满汉融合'],
    relations: [{ id: 'hong_taiji', type: '父子', label: '皇太极（父亲）' }, { id: 'kangxi', type: '父子', label: '康熙帝（儿子）' }],
    events: []
  },
  {
    id: 'duoergun', name: '多尔衮', birth: 1612, death: 1650,
    cat: 'politician', dynasty: '清', emoji: '🏛️',
    location: { lat: 41.8, lng: 123.4, place: '盛京（今辽宁沈阳）' },
    desc: '清朝摄政王，努尔哈赤第十四子。统率清军入关，定鼎中原，是清朝统一中国的关键人物。但在位期间推行剃发易服、圈地等高压政策，激起汉族强烈反抗。死后被追夺封号，掘墓鞭尸。',
    achievements: ['统军入关', '定鼎中原', '摄政'],
    relations: [{ id: 'hong_taiji', type: '兄弟', label: '皇太极（兄长）' }],
    events: []
  },
  {
    id: 'shi_lang', name: '施琅', birth: 1621, death: 1696,
    cat: 'general', dynasty: '清', emoji: '⚔️',
    location: { lat: 24.7, lng: 118.6, place: '晋江（今福建泉州）' },
    desc: '清初将领，原为郑成功部下，后降清。康熙二十二年（1683年）率清军渡海攻克台湾，建议设台湾府，使台湾正式纳入清朝版图，对中国统一有重大贡献。',
    achievements: ['攻克台湾', '建议设台湾府'],
    relations: [{ id: 'kangxi', type: '君臣', label: '康熙帝（派遣者）' }],
    events: ['e_taiwan_tongyi']
  },
  {
    id: 'nian_gengyao', name: '年羹尧', birth: 1679, death: 1726,
    cat: 'general', dynasty: '清', emoji: '⚔️',
    location: { lat: 36.6, lng: 117.0, place: '合肥（今安徽）' },
    desc: '清朝将领，雍正帝心腹，官至抚远大将军。平定青海罗卜藏丹津叛乱，威震西北，权倾一时。但恃功骄横，被雍正帝以92条大罪赐死，从炙手可热到身首异处仅两年，"功高震主"的典型。',
    achievements: ['平定青海叛乱', '抚远大将军'],
    relations: [{ id: 'yongzheng', type: '君臣', label: '雍正帝（赐死者）' }],
    events: []
  },
  {
    id: 'ji_xiaolan', name: '纪晓岚', birth: 1724, death: 1805,
    cat: 'scholar', dynasty: '清', emoji: '📖',
    location: { lat: 36.6, lng: 115.9, place: '献县（今河北沧州）' },
    desc: '清代学者、文学家，官至礼部尚书、协办大学士。曾任《四库全书》总纂官，历时十余年编成，并著《四库全书总目提要》。以才思敏捷、幽默风趣闻名，民间传说中与和珅斗智的故事广为流传。',
    achievements: ['《四库全书》总纂', '《阅微草堂笔记》', '文坛领袖'],
    relations: [{ id: 'qianlong', type: '君臣', label: '乾隆帝（君主）' }, { id: 'heshen', type: '对立', label: '和珅（政敌）' }],
    events: ['e_siku_quanshu']
  },
  {
    id: 'lin_zexu', name: '林则徐', birth: 1785, death: 1850,
    cat: 'politician', dynasty: '清', emoji: '🚬',
    location: { lat: 26.0, lng: 119.3, place: '福建福州' },
    desc: '清朝后期政治家，道光年间主导"虎门销烟"，销毁英国走私鸦片，引发第一次鸦片战争，是中国近代史上抵抗外辱的第一人。被誉为"开眼看世界的第一人"，编译《四洲志》，倡导向西方学习。',
    achievements: ['虎门销烟', '抵御外辱', '开眼看世界', '编译《四洲志》'],
    relations: [],
    events: ['e_humen_xiaoyian', 'e_yapian_war']
  },
  {
    id: 'hong_xiuquan', name: '洪秀全', birth: 1814, death: 1864,
    cat: 'politician', dynasty: '清', emoji: '✊',
    location: { lat: 23.4, lng: 113.2, place: '广东花县' },
    desc: '太平天国运动领袖，创立拜上帝会，自称天父次子、耶稣之弟。1851年金田起义，建太平天国，1853年占领南京改名天京。但定都后迅速腐化，天京事变屠杀杨秀清等，元气大伤，最终在天京城破前自尽。',
    achievements: ['建立太平天国', '金田起义', '《天朝田亩制度》'],
    relations: [{ id: 'zeng_guofan', type: '对立', label: '曾国藩（镇压者）' }],
    events: ['e_taiping']
  },
  {
    id: 'zeng_guofan', name: '曾国藩', birth: 1811, death: 1872,
    cat: 'politician', dynasty: '清', emoji: '📚',
    location: { lat: 27.9, lng: 112.9, place: '湖南长沙' },
    desc: '清朝中兴名臣，组建湘军镇压太平天国运动，推动洋务运动，培养了大量人才，是近代中国最有影响力的人物之一。以"结硬寨，打呆仗"著称，一生奉行理学，修身律己，被誉为"千古第一完人"。',
    achievements: ['组建湘军', '平定太平天国', '推动洋务运动', '《曾国藩家书》'],
    relations: [
      { id: 'li_hongzhang', type: '师生', label: '李鸿章（门生）' },
      { id: 'zuo_zongtang', type: '同盟', label: '左宗棠（同僚）' },
    ],
    events: ['e_yangwu', 'e_taiping']
  },
  {
    id: 'li_hongzhang', name: '李鸿章', birth: 1823, death: 1901,
    cat: 'politician', dynasty: '清', emoji: '🤝',
    location: { lat: 31.8, lng: 117.2, place: '安徽合肥' },
    desc: '清朝重臣，洋务运动领袖，建立北洋舰队，主张"中体西用"。甲午战争惨败后代表清廷签订《马关条约》，背负历史骂名。一生签下30多个不平等条约，被梁启超评价为"吾敬李鸿章之才，吾惜李鸿章之识，吾悲李鸿章之遇"。',
    achievements: ['洋务运动', '建北洋水师', '创办江南制造局'],
    relations: [
      { id: 'zeng_guofan', type: '师生', label: '曾国藩（老师）' },
    ],
    events: ['e_yangwu', 'e_jiawu', 'e_maguan']
  },
  {
    id: 'zuo_zongtang', name: '左宗棠', birth: 1812, death: 1885,
    cat: 'general', dynasty: '清', emoji: '⚔️',
    location: { lat: 27.9, lng: 113.0, place: '湘阴（今湖南岳阳）' },
    desc: '清朝名将、洋务派代表人物。力排众议，抬棺西征，率军收复新疆，粉碎阿古柏政权和沙俄侵略，保住中国六分之一国土。创办福州船政局等洋务企业，与曾国藩并称"曾左"。"天下不可一日无湖南，湖南不可一日无左宗棠"。',
    achievements: ['收复新疆', '抬棺西征', '创办福州船政局'],
    relations: [{ id: 'zeng_guofan', type: '同盟', label: '曾国藩（同僚）' }, { id: 'li_hongzhang', type: '对立', label: '李鸿章（政敌）' }],
    events: ['e_yangwu', 'e_xinjiang']
  },
  {
    id: 'ci_xi', name: '慈禧太后', birth: 1835, death: 1908,
    cat: 'politician', dynasty: '清', emoji: '👸',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '晚清实际统治者，通过辛酉政变垂帘听政，掌控清朝近半个世纪。同治、光绪两朝幕后掌权，扼杀戊戌变法，发动庚子拳乱后签《辛丑条约》，以"量中华之物力，结与国之欢心"闻名。一生穷奢极欲，挪用海军军费修颐和园，加速了清朝灭亡。',
    achievements: [],
    relations: [],
    events: ['e_wuxu', 'e_gengzi']
  },
  {
    id: 'guangxu', name: '光绪帝载湉', birth: 1871, death: 1908,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝第十一位皇帝，4岁即位，由慈禧太后垂帘听政。亲政后支持康有为、梁启超推行戊戌变法（百日维新），但被慈禧发动政变镇压，被囚禁于瀛台至死。死前一日慈禧去世，死因成谜（2008年证实死于砒霜中毒）。',
    achievements: ['支持戊戌变法', '百日维新'],
    relations: [{ id: 'ci_xi', type: '对立', label: '慈禧太后（囚禁者）' }],
    events: ['e_wuxu']
  },
  {
    id: 'zhang_zhidong', name: '张之洞', birth: 1837, death: 1909,
    cat: 'politician', dynasty: '清', emoji: '🏭',
    location: { lat: 30.6, lng: 114.3, place: '南皮（今河北沧州）' },
    desc: '晚清名臣、洋务运动后起之秀，提出"中学为体，西学为用"。创办汉阳铁厂、湖北枪炮厂、织布局等，修筑卢汉铁路，推动中国近代工业发展。兴办新式学堂，派遣留学生，对中国教育近代化贡献巨大。与曾国藩、李鸿章、左宗棠并称"晚清四大名臣"。',
    achievements: ['中体西用', '创办汉阳铁厂', '兴办新学', '晚清四大名臣'],
    relations: [{ id: 'li_hongzhang', type: '同盟', label: '李鸿章（同僚）' }],
    events: ['e_yangwu']
  },
  {
    id: 'jiaqing', name: '嘉庆帝颙琰', birth: 1760, death: 1820,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝第七位皇帝，即位后铲除权臣和珅，"和珅跌倒，嘉庆吃饱"，抄没财产约八亿两白银。但嘉庆朝吏治腐败日深，白莲教起义此起彼伏，天理教徒曾攻入紫禁城，清朝由盛转衰的趋势不可逆转。',
    achievements: ['铲除和珅'],
    relations: [{ id: 'qianlong', type: '父子', label: '乾隆帝（父亲）' }, { id: 'heshen', type: '对立', label: '和珅（赐死者）' }],
    events: ['e_heshen_huo']
  },
  {
    id: 'dao_guang', name: '道光帝旻宁', birth: 1782, death: 1850,
    cat: 'emperor', dynasty: '清', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '清朝第八位皇帝，以节俭著称，龙袍打补丁。但节俭治国未能挽救国运，鸦片战争惨败，签订《南京条约》，割让香港岛，开启中国近代百年屈辱史。一生勤政却无力回天，是中国从古代社会沦为半殖民地半封建社会的转折时期的皇帝。',
    achievements: [],
    relations: [{ id: 'jiaqing', type: '父子', label: '嘉庆帝（父亲）' }],
    events: ['e_yapian_war']
  },

  // ===== 民国时期人物 =====
  {
    id: 'sun_zhongshan', name: '孙中山', birth: 1866, death: 1925,
    cat: 'politician', dynasty: '民国', emoji: '🌟',
    location: { lat: 22.5, lng: 113.6, place: '香山（今广东中山）' },
    desc: '中国民主革命先行者，中华民国国父。创立兴中会、同盟会，提出"三民主义"（民族、民权、民生），领导辛亥革命推翻清朝，结束两千余年帝制。历任中华民国临时大总统、大元帅。一生奔走革命，"革命尚未成功，同志仍须努力"为临终遗言。',
    achievements: ['创立三民主义', '领导辛亥革命', '建立中华民国', '创建同盟会', '改组国民党'],
    relations: [{ id: 'yuan_shikai', type: '对立', label: '袁世凯（窃取果实）' }, { id: 'huang_xing', type: '同盟', label: '黄兴（战友）' }],
    events: ['e_xinhai', 'e_minguo_jianguo']
  },
  {
    id: 'huang_xing', name: '黄兴', birth: 1874, death: 1916,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 28.2, lng: 112.9, place: '善化（今湖南长沙）' },
    desc: '辛亥革命元勋，与孙中山并称"孙黄"。多次亲临前线指挥起义，武昌起义后任战时总司令，领导阳夏保卫战。"无公则无民国，有史必有斯人"是对其最高评价。一生坦荡无私，功成不居。',
    achievements: ['指挥武昌起义', '阳夏保卫战', '创建华兴会', '孙黄并称', '二次革命'],
    relations: [{ id: 'sun_zhongshan', type: '同盟', label: '孙中山（战友）' }],
    events: ['e_xinhai']
  },
  {
    id: 'yuan_shikai', name: '袁世凯', birth: 1859, death: 1916,
    cat: 'politician', dynasty: '民国', emoji: '🏛️',
    location: { lat: 34.0, lng: 113.7, place: '项城（今河南周口）' },
    desc: '北洋军阀创始人，中华民国首位正式大总统。小站练兵编练新军，逼清帝退位又窃取革命果实。1915年称帝，改国号"中华帝国"，遭全国反对，83天后被迫取消帝制，不久病死。一生权谋善变，既有推动近代化之功，又有复辟帝制之过。',
    achievements: ['小站练兵', '逼清帝退位', '建立北洋体系'],
    relations: [{ id: 'sun_zhongshan', type: '对立', label: '孙中山（政敌）' }, { id: 'li_hongzhang', type: '传承', label: '李鸿章（前辈）' }],
    events: ['e_minguo_jianguo']
  },
  {
    id: 'song_jiaoren', name: '宋教仁', birth: 1882, death: 1913,
    cat: 'politician', dynasty: '民国', emoji: '📖',
    location: { lat: 29.4, lng: 111.7, place: '桃源（今湖南常德）' },
    desc: '中国宪政先驱，国民党实际缔造者。同盟会核心成员，民国成立后改组国民党，主张责任内阁制，限制总统权力。1913年国民党大选获胜，即将组阁之际，在上海火车站遇刺身亡，年仅31岁。临终遗言："诸公皆当勉力进行，勿以我为念。"其死引发二次革命。',
    achievements: ['缔造国民党', '推动宪政', '主张责任内阁制'],
    relations: [{ id: 'sun_zhongshan', type: '同盟', label: '孙中山（同志）' }, { id: 'yuan_shikai', type: '对立', label: '袁世凯（被其暗杀）' }],
    events: []
  },
  {
    id: 'cai_e', name: '蔡锷', birth: 1882, death: 1916,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 26.7, lng: 111.6, place: '邵阳（今湖南）' },
    desc: '护国将军，再造共和第一人。云南起义领导人，率先反对袁世凯称帝，组织护国军北伐，迫使袁取消帝制。与小凤仙的传奇故事流传甚广。积劳成疾，病逝日本，年仅34岁。孙中山挽联："平生慷慨班都护，万里间关马伏波。"',
    achievements: ['发动护国战争', '反对袁世凯称帝', '再造共和', '云南起义'],
    relations: [{ id: 'yuan_shikai', type: '对立', label: '袁世凯（讨伐对象）' }],
    events: []
  },
  {
    id: 'lu_xun', name: '鲁迅', birth: 1881, death: 1936,
    cat: 'scholar', dynasty: '民国', emoji: '✍️',
    location: { lat: 30.0, lng: 120.6, place: '绍兴（今浙江）' },
    desc: '中国现代文学奠基人，"民族魂"。原名周树人，弃医从文，以笔为枪。1918年发表《狂人日记》，中国第一篇白话小说。代表作《阿Q正传》《祝福》《孔乙己》等深刻批判国民性。杂文如匕首投枪，直刺社会黑暗面。毛泽东评价："鲁迅的方向，就是中华民族新文化的方向。"',
    achievements: ['《狂人日记》开白话小说先河', '《阿Q正传》', '中国现代文学奠基', '左翼文化旗帜', '《呐喊》《彷徨》'],
    relations: [],
    events: ['e_wusi']
  },
  {
    id: 'chen_duxiu', name: '陈独秀', birth: 1879, death: 1942,
    cat: 'scholar', dynasty: '民国', emoji: '📢',
    location: { lat: 30.4, lng: 117.0, place: '安庆（今安徽）' },
    desc: '新文化运动旗手，中国共产党主要创始人。1915年创办《新青年》，高举"民主"与"科学"大旗，发动新文化运动。与李大钊"南陈北李"相约建党，任中共一至五届总书记。后因路线分歧被开除党籍，晚年流寓四川江津，贫病而终。',
    achievements: ['创办《新青年》', '领导新文化运动', '创建中国共产党', '南陈北李建党'],
    relations: [{ id: 'lu_xun', type: '交游', label: '鲁迅（同道）' }, { id: 'li_dazhao', type: '同盟', label: '李大钊（南陈北李）' }],
    events: ['e_wusi']
  },
  {
    id: 'li_dazhao', name: '李大钊', birth: 1889, death: 1927,
    cat: 'scholar', dynasty: '民国', emoji: '💡',
    location: { lat: 39.6, lng: 118.2, place: '乐亭（今河北唐山）' },
    desc: '中国共产主义运动先驱，中国共产党主要创始人之一。中国最早传播马克思主义者，发表《庶民的胜利》《我的马克思主义观》。与陈独秀"南陈北李"相约建党，推动国共合作。1927年被张作霖逮捕，英勇就义，年仅38岁。"铁肩担道义，妙手著文章"是其一生写照。',
    achievements: ['最早传播马克思主义', '中共创始人之一', '推动国共合作', '《庶民的胜利》'],
    relations: [{ id: 'chen_duxiu', type: '同盟', label: '陈独秀（南陈北李）' }],
    events: ['e_wusi']
  },
  {
    id: 'hu_shi', name: '胡适', birth: 1891, death: 1962,
    cat: 'scholar', dynasty: '民国', emoji: '📚',
    location: { lat: 29.9, lng: 118.3, place: '绩溪（今安徽宣城）' },
    desc: '新文化运动领袖，白话文运动倡导者。留美归来提倡白话文，发表《文学改良刍议》，推动白话文取代文言文。主张"大胆假设，小心求证"的实证精神。曾任北大校长、驻美大使。一生倡导自由主义，与鲁迅从战友到论敌。',
    achievements: ['倡导白话文运动', '《文学改良刍议》', '推动新文化运动', '大胆假设小心求证', '驻美大使'],
    relations: [{ id: 'chen_duxiu', type: '交游', label: '陈独秀（战友后分道）' }, { id: 'lu_xun', type: '交游', label: '鲁迅（从同道到论敌）' }],
    events: ['e_wusi']
  },
  {
    id: 'cai_yuanpei', name: '蔡元培', birth: 1868, death: 1940,
    cat: 'scholar', dynasty: '民国', emoji: '🎓',
    location: { lat: 30.0, lng: 120.6, place: '绍兴（今浙江）' },
    desc: '中国现代教育之父，北大精神缔造者。任北大校长期间，提出"思想自由，兼容并包"方针，使北大成为新文化运动中心。支持学生运动，保护进步师生。四度留学欧洲，将西方大学制度引入中国。清正廉洁，一生两袖清风。',
    achievements: ['改革北京大学', '思想自由兼容并包', '中国现代教育奠基', '支持五四运动', '中央研究院首任院长'],
    relations: [{ id: 'lu_xun', type: '交游', label: '鲁迅（同乡知交）' }, { id: 'chen_duxiu', type: '交游', label: '陈独秀（聘为北大文科学长）' }],
    events: ['e_wusi']
  },
  {
    id: 'zhang_taiyan', name: '章太炎', birth: 1869, death: 1936,
    cat: 'scholar', dynasty: '民国', emoji: '📜',
    location: { lat: 30.2, lng: 120.2, place: '余杭（今浙江杭州）' },
    desc: '国学大师，革命思想家。清末因《驳康有为论革命书》和邹容《革命军》案入狱三年。同盟会早期核心成员，后与孙中山分道。学问渊博，精于小学、经学、佛学，门下弟子众多：黄侃、鲁迅、周作人、钱玄同等。"章疯子"之名，是其不随流俗的写照。',
    achievements: ['国学大师', '《驳康有为论革命书》', '门下弟子众多', '精研小学经学'],
    relations: [{ id: 'lu_xun', type: '师承', label: '鲁迅（弟子）' }, { id: 'sun_zhongshan', type: '同盟', label: '孙中山（后分道）' }],
    events: []
  },
  {
    id: 'qiu_jin', name: '秋瑾', birth: 1875, death: 1907,
    cat: 'politician', dynasty: '清', emoji: '🗡️',
    location: { lat: 30.0, lng: 120.6, place: '绍兴（今浙江）' },
    desc: '巾帼英雄，中国女权和女学倡导者。自号"鉴湖女侠"，留学日本期间参加同盟会。回国后创办《中国女报》，组织光复军准备起义，事泄被捕，从容就义于绍兴轩亭口，年仅32岁。"秋风秋雨愁煞人"为其绝笔。是近代中国为革命牺牲的第一位女性。',
    achievements: ['鉴湖女侠', '倡导女权女学', '同盟会成员', '创办《中国女报》'],
    relations: [{ id: 'sun_zhongshan', type: '同盟', label: '孙中山（同志）' }],
    events: ['e_xinhai']
  },
  {
    id: 'lin_jueming', name: '林觉民', birth: 1887, death: 1911,
    cat: 'politician', dynasty: '清', emoji: '💌',
    location: { lat: 26.1, lng: 119.3, place: '闽县（今福建福州）' },
    desc: '黄花岗七十二烈士之一。1911年参加广州起义，事前写下绝笔《与妻书》："吾充吾爱汝之心，助天下人爱其所爱"，以天下为己任，舍小家为大家。起义中受伤被捕，从容就义，年仅24岁。《与妻书》情真意切，是近代最感人的家书。',
    achievements: ['黄花岗烈士', '《与妻书》', '广州起义'],
    relations: [],
    events: ['e_xinhai']
  },
  {
    id: 'yan_xishan', name: '阎锡山', birth: 1883, death: 1960,
    cat: 'politician', dynasty: '民国', emoji: '🏔️',
    location: { lat: 38.4, lng: 112.7, place: '五台（今山西忻州）' },
    desc: '山西军阀，统治山西近四十年，人称"山西王"。同盟会出身，辛亥革命时发动太原起义。统治山西期间推行"村本政治"和"用民政治"，兴办实业、教育，山西成为"模范省"。在军阀混战中左右逢源，抗日时期坚持"守土抗战"，内战后去台湾。',
    achievements: ['统治山西近四十年', '推行村本政治', '山西模范省'],
    relations: [{ id: 'yuan_shikai', type: '君臣', label: '袁世凯（依附）' }],
    events: []
  },
  {
    id: 'feng_yuxiang', name: '冯玉祥', birth: 1882, death: 1948,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 34.7, lng: 115.3, place: '巢县（今安徽合肥）' },
    desc: '"基督将军"，著名爱国将领。1924年发动北京政变，驱逐溥仪出宫，推翻曹锟贿选政府。北伐战争中率部参战，中原大战后隐居。抗战时期坚持抗日，反对内战。1948年归国途中在黑海遇难。一生信奉基督教，要求士兵洗礼，生活简朴。',
    achievements: ['北京政变', '驱逐溥仪出宫', '基督将军', '坚持抗日'],
    relations: [],
    events: []
  },
  {
    id: 'zhang_xueliang', name: '张学良', birth: 1901, death: 2001,
    cat: 'general', dynasty: '民国', emoji: '🏳️',
    location: { lat: 41.8, lng: 123.4, place: '海城（今辽宁鞍山）' },
    desc: '"少帅"，东北军阀张作霖之子。1928年"东北易帜"，服从南京国民政府，实现国家形式统一。1936年发动"西安事变"，兵谏蒋介石联共抗日，改变中国历史进程。事变后陪蒋回南京，被软禁长达54年，1990年重获自由，2001年病逝于夏威夷，享年100岁。',
    achievements: ['东北易帜', '西安事变', '兵谏联共抗日'],
    relations: [{ id: 'feng_yuxiang', type: '同盟', label: '冯玉祥（中原大战盟友）' }],
    events: ['e_xian_bianshi']
  },
  {
    id: 'cai_tingkai', name: '蔡廷锴', birth: 1892, death: 1968,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 22.3, lng: 112.7, place: '罗定（今广东云浮）' },
    desc: '抗日名将，"一二八"淞沪抗战英雄。1932年率十九路军在上海英勇抗击日军进攻33天，名震中外。后参加福建事变反蒋，失败后流亡海外。抗战爆发后重返抗日战场。一生爱国，从军阀将领到共和国国防委员会副主席。',
    achievements: ['一二八淞沪抗战', '十九路军', '福建事变'],
    relations: [],
    events: []
  },
  {
    id: 'li_zongren', name: '李宗仁', birth: 1891, death: 1969,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 24.4, lng: 110.1, place: '临桂（今广西桂林）' },
    desc: '桂系首领，抗日名将。统一广西后成为新桂系核心，与白崇禧合称"李白"。1938年指挥台儿庄战役，歼灭日军精锐万余人，取得抗战以来正面战场首次重大胜利。1948年当选副总统，1949年代理总统。1965年从美国回到祖国。',
    achievements: ['台儿庄大捷', '桂系首领', '统一广西'],
    relations: [],
    events: ['e_kangzhan']
  },
  {
    id: 'bai_chongxi', name: '白崇禧', birth: 1893, death: 1966,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 24.4, lng: 110.1, place: '临桂（今广西桂林）' },
    desc: '"小诸葛"，新桂系核心人物，国民党军著名战略家。北伐时率部从广东打到北京，抗战期间指挥多场大战。足智多谋，用兵灵活，被日军称为"战神"。与李宗仁合称"李白"，共同经营桂系二十余年。内战后去台湾，郁郁而终。',
    achievements: ['小诸葛', '北伐名将', '抗战战略家', '桂系核心'],
    relations: [{ id: 'li_zongren', type: '同盟', label: '李宗仁（李白组合）' }],
    events: ['e_kangzhan']
  },
  {
    id: 'xue_yue', name: '薛岳', birth: 1896, death: 1998,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 24.5, lng: 114.1, place: '乐昌（今广东韶关）' },
    desc: '"战神"，抗日第一名将。抗战期间指挥四次长沙会战，前三次均大败日军，独创"天炉战法"，歼灭日军十余万人，是抗战歼敌最多的中国将领。万家岭大捷全歼日军第106师团。一生战功赫赫，内战后去台湾，高寿102岁。',
    achievements: ['长沙会战三捷', '天炉战法', '万家岭大捷', '抗战歼敌最多', '四战长沙'],
    relations: [],
    events: ['e_kangzhan']
  },
  {
    id: 'zhang_zizhong', name: '张自忠', birth: 1891, death: 1940,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 36.2, lng: 116.0, place: '临清（今山东聊城）' },
    desc: '抗日殉国最高将领，民族英雄。曾因与日军周旋被诬为"汉奸"，忍辱负重，誓以死明志。1940年枣宜会战中，身先士卒，身中数弹仍不退却，最终壮烈殉国，年仅49岁。牺牲前留书："国家到了如此地步，除我等为其死，毫无其他办法。"国民政府追授其为陆军上将。',
    achievements: ['枣宜会战殉国', '抗日殉国最高将领', '临沂大捷'],
    relations: [],
    events: ['e_kangzhan']
  },
  {
    id: 'dai_jitao', name: '戴安澜', birth: 1904, death: 1942,
    cat: 'general', dynasty: '民国', emoji: '⚔️',
    location: { lat: 31.3, lng: 117.3, place: '无为（今安徽芜湖）' },
    desc: '中国远征军名将，抗日殉国英雄。1942年率第200师远征缅甸，在同古保卫战中以9000人抗击4万日军12天，后收复棠吉。撤退途中遭日军伏击，身负重伤，在缅北茅邦村殉国，年仅38岁。美国政府追授懋绩勋章，是首位获此殊荣的中国军人。',
    achievements: ['远征缅甸', '同古保卫战', '收复棠吉', '获美国懋绩勋章'],
    relations: [],
    events: ['e_kangzhan']
  },
  {
    id: 'mao_dun', name: '茅盾', birth: 1896, death: 1981,
    cat: 'scholar', dynasty: '民国', emoji: '📖',
    location: { lat: 30.8, lng: 120.5, place: '桐乡（今浙江嘉兴）' },
    desc: '中国现代文学巨匠，文学评论家。代表作《子夜》全景式描绘1930年代上海社会，《春蚕》《林家铺子》反映农村和城镇经济崩溃。曾任文化部部长，创办《小说月报》。临终捐出25万元稿费设立"茅盾文学奖"，是中国最重要的文学奖项。',
    achievements: ['《子夜》', '《春蚕》', '茅盾文学奖', '文学评论家'],
    relations: [{ id: 'lu_xun', type: '交游', label: '鲁迅（同道）' }],
    events: []
  },
  {
    id: 'lao_she', name: '老舍', birth: 1899, death: 1966,
    cat: 'scholar', dynasty: '民国', emoji: '📖',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '人民艺术家，京味文学大师。原名舒庆春，代表作《骆驼祥子》《四世同堂》《茶馆》等。《骆驼祥子》写人力车夫悲剧，《茶馆》浓缩半个世纪社会变迁。语言幽默生动，京味浓郁，被誉为"语言大师"。文革中不堪凌辱，自沉太平湖。',
    achievements: ['《骆驼祥子》', '《茶馆》', '《四世同堂》', '人民艺术家', '京味文学大师'],
    relations: [],
    events: []
  },
  {
    id: 'bing_xin', name: '冰心', birth: 1900, death: 1999,
    cat: 'scholar', dynasty: '民国', emoji: '🌸',
    location: { lat: 26.1, lng: 119.3, place: '长乐（今福建福州）' },
    desc: '中国现代文学先驱，儿童文学奠基人。原名谢婉莹，代表作《繁星》《春水》开创小诗体，《寄小读者》是中国儿童文学经典。一生宣扬"爱的哲学"，"有了爱便有了一切"。1999年逝世，享年99岁，与世纪同龄。',
    achievements: ['《繁星》《春水》', '《寄小读者》', '儿童文学奠基', '爱的哲学'],
    relations: [],
    events: []
  },
  {
    id: 'xu_zhimo', name: '徐志摩', birth: 1897, death: 1931,
    cat: 'scholar', dynasty: '民国', emoji: '✈️',
    location: { lat: 30.3, lng: 120.3, place: '海宁（今浙江嘉兴）' },
    desc: '新月派代表诗人，浪漫主义文学先驱。代表作《再别康桥》"轻轻的我走了，正如我轻轻的来"传诵至今。创办新月社，主编《诗刊》，推动新诗格律化。与林徽因、陆小曼的感情故事为人津津乐道。1931年乘飞机失事遇难，年仅34岁。',
    achievements: ['《再别康桥》', '新月派创始人', '推动新诗格律化', '《志摩的诗》'],
    relations: [],
    events: []
  },
  {
    id: 'wen_yiduo', name: '闻一多', birth: 1899, death: 1946,
    cat: 'scholar', dynasty: '民国', emoji: '🔥',
    location: { lat: 30.5, lng: 115.4, place: '浠水（今湖北黄冈）' },
    desc: '诗人、学者、民主斗士。代表作《红烛》《死水》是现代诗经典。后潜心学术，研究《楚辞》《诗经》卓然成家。抗战胜利后积极投身民主运动，1946年在昆明悼念李公朴大会上发表《最后一次讲演》，当天回家途中遭国民党特务暗杀，年仅47岁。',
    achievements: ['《红烛》《死水》', '《最后一次讲演》', '楚辞研究', '民主斗士'],
    relations: [{ id: 'lu_xun', type: '传承', label: '鲁迅（精神传承）' }],
    events: []
  },
  {
    id: 'zhu_ziqing', name: '朱自清', birth: 1898, death: 1948,
    cat: 'scholar', dynasty: '民国', emoji: '📝',
    location: { lat: 32.4, lng: 119.4, place: '东海（今江苏连云港）' },
    desc: '现代散文大师，语文教育家。代表作《背影》《荷塘月色》是中学课本必选名篇。散文感情真挚，文字清丽。抗战后身患重病，仍拒绝领取美国救济粮，"宁可饿死，不领美国救济粮"。1948年病逝，年仅50岁。毛泽东称赞其"表现了我们民族的英雄气概"。',
    achievements: ['《背影》', '《荷塘月色》', '拒绝美国救济粮', '散文大师'],
    relations: [],
    events: []
  },
  {
    id: 'mei_lanfang', name: '梅兰芳', birth: 1894, death: 1961,
    cat: 'artist', dynasty: '民国', emoji: '🎭',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '京剧艺术大师，"四大名旦"之首。创立梅派艺术，将京剧推向世界舞台。抗战期间蓄须明志，拒绝为日伪演出，八年辍演以示民族气节。三次访日、访美、访苏演出，使京剧成为世界三大戏剧体系之一。周恩来说："梅兰芳这位伟大的艺术家，不仅是属于中国的，更是属于世界的。"',
    achievements: ['梅派艺术', '四大名旦之首', '蓄须明志', '京剧走向世界'],
    relations: [],
    events: []
  },
];

// 重要事件
const EVENTS = [
  { id: 'e_banquanzhan', year: -2697, name: '阪泉之战', type: 'war', desc: '黄帝与炎帝的战争，最终炎黄联合，奠定华夏民族基础。' },
  { id: 'e_zhuoluzhan', year: -2690, name: '涿鹿之战', type: 'war', desc: '黄帝联合炎帝大败蚩尤，确立华夏族主导地位。' },
  { id: 'e_shanrang_yao', year: -2260, name: '尧禅让舜', type: 'politics', desc: '上古禅让制的典范，尧将帝位传给德行高尚的舜。' },
  { id: 'e_shanrang_shun', year: -2206, name: '舜禅让禹', type: 'politics', desc: '舜因大禹治水有功，将帝位禅让给禹。' },
  { id: 'e_zhishui', year: -2100, name: '大禹治水', type: 'science', desc: '大禹带领民众治理洪水，三过家门而不入，历时13年终于成功。' },
  { id: 'e_xia_founded', year: -2070, name: '夏朝建立', type: 'politics', desc: '大禹建立中国历史上第一个王朝——夏朝，世袭制取代禅让制。' },

  // 夏朝事件
  { id: 'e_gan_zhanyi', year: -2050, name: '甘之战', type: 'war', desc: '夏启平定有扈氏叛乱，在甘地（今河南洛阳西南）击败有扈氏，巩固新生政权，正式确立世袭制。' },
  { id: 'e_taikang_shiguo', year: -2030, name: '太康失国', type: 'politics', desc: '太康沉迷狩猎，后羿趁虚而入夺取夏政，太康流亡，史称"太康失国"，为夏朝首次中断。' },
  { id: 'e_houyi_daixia', year: -2020, name: '后羿代夏', type: 'war', desc: '后羿取代夏政，但不久被寒浞所杀，寒浞建立寒国，夏朝中断约40年。' },
  { id: 'e_shaodi_ticheng', year: -1960, name: '少康中兴', type: 'politics', desc: '少康在有虞氏帮助下复国，灭寒浞，恢复夏朝统治，史称"少康中兴"，夏朝进入稳定发展期。' },
  { id: 'e_xia_baishou', year: -1800, name: '夏王朝鼎盛', type: 'culture', desc: '夏朝在少康复国后进入鼎盛期，经济文化都有较大发展，农业生产进步，青铜器开始使用。' },
  { id: 'e_xia_miewang', year: -1600, name: '鸣条之战/夏朝灭亡', type: 'war', desc: '商汤在鸣条（今河南封丘东）大败夏桀军队，夏朝灭亡，商朝建立。桀被流放于南巢，最终饿死。' },

  // 商朝事件
  { id: 'e_shang_founded', year: -1600, name: '商朝建立', type: 'politics', desc: '商汤灭夏后在亳（今河南商丘）建立商朝，定都于此。重用伊尹为相，制定《汤刑》，商朝成为中国第二个统一王朝。' },
  { id: 'e_wu_yi_luan', year: -1500, name: '五世之乱', type: 'war', desc: '商朝中期的动荡期，王位争夺激烈，多次迁都，国力衰退。伊尹曾放逐太甲，安定商政。' },
  { id: 'e_pangeng_qianyin', year: -1300, name: '盘庚迁殷', type: 'politics', desc: '盘庚为摆脱旧贵族势力，将都城从奄（今山东曲阜）迁至殷（今河南安阳），推行新政，商朝复兴。' },
  { id: 'e_wuding_zhongxing', year: -1250, name: '武丁中兴', type: 'politics', desc: '武丁在位59年，重用傅说为相，对外征伐四方，征服西北羌方、鬼方、荆楚，商朝达到极盛。' },
  { id: 'e_wu_ding_war', year: -1200, name: '武丁征伐', type: 'war', desc: '武丁对外大规模用兵，征服周边方国，扩展商朝版图，奠定商朝鼎盛时期的疆域。' },
  { id: 'e_shang_baoshan', year: -1100, name: '商朝日渐衰落', type: 'politics', desc: '商朝后期，历代君主渐趋腐败，祖甲之后连续出现昏君，国力持续下降，周边方国渐生叛心。' },
  { id: 'e_tao_tang_pohuai', year: -1070, name: '纣王暴政', type: 'politics', desc: '商纣王造鹿台、酒池肉林，宠爱妲己，滥用酷刑，残害忠良，比干被剖心，箕子被囚，微子出逃。' },
  { id: 'e_muye', year: -1046, name: '牧野之战', type: 'war', desc: '周武王率诸侯联军在牧野（今河南淇县南）大败商纣王军队，纣王兵败自焚，商朝灭亡，西周建立。' },

  // 西周事件
  { id: 'e_zhoushi_fenfeng', year: -1043, name: '周朝分封', type: 'politics', desc: '周武王灭商后大规模分封诸侯，将土地和人民分封给宗室、功臣和先贤后裔，建立藩屏周室的封建制度。' },
  { id: 'e_wuwang_shi', year: -1043, name: '武王逝世', type: 'politics', desc: '周武王灭商后两年病逝，年约五十，太子诵即位，是为周成王。因成王年幼，由周公旦摄政。' },
  { id: 'e_zhougongshezheng', year: -1042, name: '周公摄政', type: 'politics', desc: '周公旦辅佐成王，平定管叔、蔡叔、霍叔联合纣王之子武庚的叛乱，制礼作乐，奠定周朝典章制度基础。' },
  { id: 'e_guangong_zhidu', year: -1020, name: '成康之治', type: 'politics', desc: '周成王与周康王父子相承，继承周公制定的礼乐制度，四十年不用刑罚，天下太平，是西周最繁盛时期。' },
  { id: 'e_zhaowang_nansheng', year: -977, name: '昭王南征', type: 'war', desc: '周昭王率军南征荆楚，在汉水遭楚人伏击，船覆溺死，周朝精锐损失殆尽，是周朝由盛转衰的转折点。' },
  { id: 'e_muwang_xiyun', year: -964, name: '穆王西巡', type: 'culture', desc: '周穆王西巡至西王母之国，会见西王母，是古代中西交流的传说记录。《穆天子传》记载此事，亦有"穆王西巡"之说。' },
  { id: 'e_muwang_zhengxu', year: -930, name: '穆王东征', type: 'war', desc: '周穆王东征徐偃王，徐偃王起兵叛周，穆王率军平定，将徐国迁往彭城（今江苏徐州）。' },
  { id: 'e_li_wang_zhuanli', year: -850, name: '厉王专利', type: 'politics', desc: '周厉王实行"专利"政策，将山林川泽收归王室垄断，禁止百姓采猎，导致民怨沸腾。' },
  { id: 'e_daoli', year: -842, name: '道路以目', type: 'culture', desc: '厉王派人监视百姓言论，百姓相见不敢交谈，只能以目示意。厉王说："我就能制止诽谤！"召公警告："防民之口甚于防川。"' },
  { id: 'e_guo_baodong', year: -841, name: '国人暴动', type: 'war', desc: '公元前841年，国都镐京爆发大规模暴动，厉王出逃至彘（今山西霍州），太子静躲入召公家，史称"国人暴动"。这一年是中国历史有确切纪年的开始。' },
  { id: 'e_gonghe', year: -841, name: '共和行政', type: 'politics', desc: '厉王出逃后，共伯和被推为摄政，代行天子之职，历时14年，直至厉王死于彘，周宣王即位。共和行政是中国历史第一次多人执政。' },
  { id: 'e_xuanwang_fuxing', year: -827, name: '宣王中兴', type: 'politics', desc: '周宣王即位后，励精图治，重用尹吉甫、方叔等贤臣，对外征伐狁、淮夷、徐国，恢复周朝国势，史称"宣王中兴"。' },
  { id: 'e_youwang_baoyan', year: -779, name: '烽火戏诸侯', type: 'culture', desc: '周幽王为博褒姒一笑，多次点燃烽火戏弄诸侯，诸侯以为有敌入侵，率军赶来，却发现并无敌兵。褒姒终于大笑，幽王遂数举烽火，诸侯渐不信任。' },
  { id: 'e_fenghuo_xizhhou', year: -771, name: '犬戎破周', type: 'war', desc: '申侯联合犬戎攻入镐京，幽王再次点燃烽火，诸侯无人来救，幽王被杀于骊山脚下，褒姒被掳。' },
  { id: 'e_xizhou_miewang', year: -771, name: '西周灭亡', type: 'politics', desc: '犬戎攻破镐京杀死幽王，西周灭亡。申侯等立幽王太子宜臼为周平王，郑、秦、晋等诸侯护送平王东迁洛邑。' },
  { id: 'e_dongzhou_licheng', year: -770, name: '东周建立', type: 'politics', desc: '周平王在洛邑（今河南洛阳）即位，建立东周。周天子权威衰落，诸侯开始争霸，春秋时代开始。' },

  { id: 'e_yuligu', year: -1060, name: '文王拘羑里', type: 'culture', desc: '周文王被商纣王拘禁于羑里，期间演推《周易》，完成传世之作。' },
  { id: 'e_zhougongshezheng', year: -1042, name: '周公摄政', type: 'politics', desc: '周公旦辅佐成王，平定叛乱，制礼作乐，奠定周朝制度基础。' },
  { id: 'e_sunzi_bingfa', year: -512, name: '《孙子兵法》成书', type: 'culture', desc: '孙子著成《孙子兵法》十三篇，是世界上最早最完整的军事著作。' },
  { id: 'e_kongzi_zhongyou', year: -497, name: '孔子周游列国', type: 'culture', desc: '孔子率弟子周游列国，宣扬仁义礼乐，历时14年未能实现政治抱负。' },
  { id: 'e_kongzi_bianwen', year: -479, name: '孔子整理六经', type: 'culture', desc: '孔子晚年整理《诗》《书》《礼》《乐》《易》《春秋》六经，传授后学。' },
  { id: 'e_laozi_chujian', year: -500, name: '《道德经》成书', type: 'culture', desc: '老子出函谷关，应关令尹喜之请著《道德经》五千言，道家思想奠基之作。' },
  { id: 'e_quyuan_tujian', year: -278, name: '屈原投汨罗江', type: 'culture', desc: '屈原因楚国被秦攻破，悲愤投汨罗江自尽，后世设端午节纪念。' },
  { id: 'e_liuguotongyi', year: -221, name: '秦统一六国', type: 'politics', desc: '秦王嬴政历时10年，先后灭韩、赵、魏、楚、燕、齐六国，建立中国历史上第一个统一的中央集权国家。' },
  { id: 'e_changcheng', year: -214, name: '修建长城', type: 'politics', desc: '秦始皇连接原有燕、赵、秦长城，修建万里长城，防御匈奴南侵。' },
  { id: 'e_julu', year: -207, name: '巨鹿之战', type: 'war', desc: '项羽破釜沉舟，以五万楚军大败秦军四十万，是秦末起义的决定性战役。' },
  { id: 'e_chuhanzhanzheng', year: -206, name: '楚汉之争', type: 'war', desc: '刘邦与项羽争夺天下，历时4年，最终刘邦胜出，建立汉朝。' },
  { id: 'e_wujiang', year: -202, name: '项羽乌江自刎', type: 'war', desc: '楚汉之争末期，项羽被围垓下，霸王别姬，突围至乌江，拒绝渡江自刎而死。' },
  { id: 'e_han_founded', year: -202, name: '汉朝建立', type: 'politics', desc: '刘邦在楚汉之争中取得胜利，建立汉朝，定都长安，是中国历史上第二个统一王朝。' },
  { id: 'e_xiongnu_war', year: -119, name: '漠北之战', type: 'war', desc: '汉武帝派卫青、霍去病深入漠北，歼灭匈奴主力，解除匈奴对汉朝的威胁。' },
  { id: 'e_silkroad', year: -119, name: '张骞通西域', type: 'economy', desc: '张骞两次出使西域，开辟丝绸之路，建立起中西方贸易和文化交流的通道。' },
  { id: 'e_shiji', year: -91, name: '《史记》成书', type: 'culture', desc: '司马迁忍受腐刑之苦，历时14年完成《史记》，中国第一部纪传体通史。' },
  { id: 'e_chibi', year: 208, name: '赤壁之战', type: 'war', desc: '孙刘联军以约五万兵力火烧赤壁，大败曹操约二十万大军，奠定三国鼎立格局。' },
  { id: 'e_guandu', year: 200, name: '官渡之战', type: 'war', desc: '曹操以少胜多，大败袁绍，奠定统一北方的基础，是中国历史上著名的以弱胜强战役。' },
  { id: 'e_shu_founded', year: 221, name: '蜀汉建立', type: 'politics', desc: '刘备在成都称帝，建立蜀汉，与曹魏、东吴形成三国鼎立局面。' },
  { id: 'e_beifa', year: 228, name: '诸葛亮六出祁山', type: 'war', desc: '诸葛亮六次率军出祁山北伐曹魏，鞠躬尽瘁，最终病逝五丈原，星落秋风五丈原。' },
  { id: 'e_tang_founded', year: 618, name: '唐朝建立', type: 'politics', desc: '李渊在长安称帝，建立唐朝，是中国历史上最强盛的王朝之一。' },
  { id: 'e_xuanwumen', year: 626, name: '玄武门之变', type: 'politics', desc: '李世民发动政变，杀太子李建成和齐王李元吉，逼迫李渊退位，自立为帝。' },
  { id: 'e_zhenguan', year: 627, name: '贞观之治', type: 'politics', desc: '唐太宗开创贞观盛世，虚心纳谏，轻徭薄赋，国泰民安，是中国历史上的治世典范。' },
  { id: 'e_wu_jidi', year: 690, name: '武周建立', type: 'politics', desc: '武则天改唐为周，称帝登基，成为中国历史上唯一正式的女皇帝。' },
  { id: 'e_kaiyuan', year: 713, name: '开元盛世', type: 'politics', desc: '唐玄宗开元年间，国家强盛，经济繁荣，人口达巅峰，是唐朝鼎盛时期。' },
  { id: 'e_anshi', year: 755, name: '安史之乱', type: 'war', desc: '安禄山、史思明发动叛乱，历时8年，是唐朝由盛转衰的转折点，造成大量人口死亡。' },

  // 晚唐事件
  { id: 'e_yuanhe_zhongxing', year: 806, name: '元和中兴', type: 'politics', desc: '唐宪宗即位后，决心削藩，先后平定西川、镇海、淮西、淄青等藩镇叛乱，一度恢复中央权威，史称"元和中兴"。' },
  { id: 'e_ganlu_zhibian', year: 835, name: '甘露之变', type: 'politics', desc: '唐文宗与李训、郑注密谋，以观甘露为名企图诛杀权阉仇士良。事泄失败，朝臣千余人被杀，文宗沦为傀儡，宦官完全掌控朝政。' },
  { id: 'e_huichang_miefo', year: 845, name: '会昌灭佛', type: 'politics', desc: '唐武宗在宰相李德裕支持下大规模灭佛，拆毁寺院4600余所，没收寺院土地，强迫僧尼还俗26万余人，铸钱充实国库。' },
  { id: 'e_dazhong_zhizhi', year: 847, name: '大中之治', type: 'politics', desc: '唐宣宗即位后勤政爱民，纠正会昌弊政，恢复佛教，贬斥李德裕，出现短暂的治世局面，但无法逆转唐朝衰亡大势。' },
  { id: 'e_huangchao_qiyi', year: 875, name: '黄巢起义', type: 'war', desc: '王仙芝、黄巢发动农民大起义，880年黄巢攻入长安，建大齐政权。起义虽最终失败，但彻底动摇了唐朝根基，加速了唐朝灭亡。' },
  { id: 'e_zhuwen_tangmiewang', year: 907, name: '朱温篡唐', type: 'politics', desc: '朱温废唐哀帝，自立为帝，建立后梁，定都开封。立国289年的唐朝正式灭亡，五代十国时代开始。' },

  // 五代事件
  { id: 'e_houtang_founded', year: 923, name: '后唐灭梁', type: 'war', desc: '李存勖率军攻入开封，灭后梁，建立后唐。后唐一度是五代疆域最大的政权，但李存勖沉迷戏曲，在位仅3年被杀。' },
  { id: 'e_yanyun_cede', year: 936, name: '割让燕云十六州', type: 'politics', desc: '石敬瑭为换取契丹支持称帝，割让燕云十六州予契丹，并认耶律德光为父。此举使中原失去北方屏障，遗祸四百年，直至明初才收复。' },
  { id: 'e_liao_mie_jin', year: 947, name: '辽灭后晋', type: 'war', desc: '耶律德光率契丹军南下灭后晋，入开封改国号大辽，但因统治不善引发中原反抗，北返途中病逝。' },
  { id: 'e_gaoping_battle', year: 954, name: '高平之战', type: 'war', desc: '周世宗柴荣即位之初，北汉与辽联军南下，柴荣亲征大败敌军。此战奠定了后周的军事优势，也让赵匡胤崭露头角。' },
  { id: 'e_chenqiao_bingbian', year: 960, name: '陈桥兵变', type: 'politics', desc: '赵匡胤在陈桥驿被部下黄袍加身，率军回开封夺取后周政权，建立宋朝，五代十国走向终结。' },
  { id: 'e_song_founded', year: 960, name: '宋朝建立', type: 'politics', desc: '赵匡胤陈桥兵变，黄袍加身，建立宋朝，结束五代十国分裂局面。' },
  { id: 'e_beijiubing', year: 961, name: '杯酒释兵权', type: 'politics', desc: '宋太祖以宴会方式，说服手握重兵的将领交出兵权，解决了藩镇割据问题。' },
  { id: 'e_chanyuan', year: 1005, name: '澶渊之盟', type: 'politics', desc: '辽军南侵，宋真宗在寇准力劝下亲征澶州，宋军射杀辽将萧挞凛。但真宗求和心切，签订盟约：宋每年送辽银10万两、绢20万匹，双方约为兄弟之国。换得百年和平，但开启了宋朝对外妥协的先河。' },
  { id: 'e_qingli_xinzheng', year: 1043, name: '庆历新政', type: 'politics', desc: '范仲淹主持改革，提出明黜陟、抑侥幸、精贡举等十项措施，意在整顿吏治、富国强兵。但因守旧派反对，改革仅一年余即失败，范仲淹等被排挤出朝。' },
  { id: 'e_xining_bianfa', year: 1069, name: '王安石变法', type: 'politics', desc: '王安石在宋神宗支持下推行熙宁变法，包括青苗法、免役法、方田均税法、保甲法、市易法等，旨在富国强兵。但因用人不当、操之过急，加重百姓负担，引发新旧党争长达数十年，最终失败。' },
  { id: 'e_wutai_shian', year: 1079, name: '乌台诗案', type: 'politics', desc: '御史中丞李定等人弹劾苏轼以诗文讥讽新法，苏轼被捕入乌台（御史台）受审，险遭处死。后因太皇太后等人营救，被贬为黄州团练副使。此案是北宋党争中最著名文字狱。' },
  { id: 'e_zizhi_tongjian', year: 1084, name: '《资治通鉴》成书', type: 'culture', desc: '司马光历时19年编纂完成《资治通鉴》，上起周威烈王二十三年（前403年），下至后周世宗显德六年（959年），共294卷，是中国第一部编年体通史巨著。' },
  { id: 'e_huashigang', year: 1105, name: '花石纲之役', type: 'politics', desc: '宋徽宗为修建艮岳园林，在东南大规模搜罗奇花异石，经水路运往开封，称"花石纲"。蔡京等借机盘剥百姓，致使民不聊生，方腊起义即以此为导火索。' },
  { id: 'e_jingkang', year: 1127, name: '靖康之变', type: 'war', desc: '金军攻破开封，俘虏宋徽宗、宋钦宗及后妃、宗室、大臣等3000余人北去，掠走大量珍宝典籍。北宋灭亡，史称"靖康之耻"，是中国历史上最屈辱的事件之一。' },
  { id: 'e_nansong_founded', year: 1127, name: '南宋建立', type: 'politics', desc: '宋徽宗第九子赵构在应天府（今商丘）即位，是为宋高宗，建立南宋。后定都临安（杭州），偏安江南，与金隔淮对峙。' },
  { id: 'e_yancheng_dajie', year: 1140, name: '郾城大捷', type: 'war', desc: '岳飞率岳家军在郾城大破金兀术精锐"铁浮屠"和"拐子马"，金军哀叹"撼山易，撼岳家军难"。岳飞正欲乘胜北伐，却被十二道金牌召回。' },
  { id: 'e_yue_fei_si', year: 1142, name: '岳飞遇害', type: 'war', desc: '秦桧以"莫须有"罪名，在宋高宗默许下，将抗金名将岳飞杀害于风波亭。岳飞临终写下"天日昭昭"，千古奇冤令后人扼腕。' },
  { id: 'e_huangtiandang', year: 1130, name: '黄天荡之战', type: 'war', desc: '韩世忠以8000水军在黄天荡阻击金军10万大军48天，梁红玉亲自击鼓助战。虽最终未能全歼金军，但极大地遏制了金军南侵势头，鼓舞了抗金士气。' },
  { id: 'e_mongol_xiqin', year: 1206, name: '成吉思汗建国', type: 'politics', desc: '铁木真统一蒙古各部，在斡难河畔召开忽里勒台大会，被尊为"成吉思汗"，建立蒙古帝国，开启大规模扩张时代。' },
  { id: 'e_mongol_miejin', year: 1234, name: '蒙古灭金', type: 'war', desc: '蒙古与南宋联合攻灭金朝，金哀宗自缢。但南宋未能收复河南，反而引蒙古南侵，"端平入洛"失败后宋蒙战争全面爆发。' },
  { id: 'e_yuan_founded', year: 1271, name: '元朝建立', type: 'politics', desc: '忽必烈正式建国号"大元"，取《易经》"大哉乾元"之意，定都大都（今北京），是中国历史上版图最大的王朝。' },
  { id: 'e_xiangyang', year: 1273, name: '襄樊之战', type: 'war', desc: '元军围攻襄阳、樊城6年，使用回回炮（巨型投石机）轰破樊城，襄阳守将吕文焕力竭投降。此战是元灭南宋的关键转折，襄阳一失，南宋门户大开。' },
  { id: 'e_yashan', year: 1279, name: '崖山海战', type: 'war', desc: '元军在崖山（今广东新会）全歼南宋最后的水军，丞相陆秀夫背8岁小皇帝赵昺跳海殉国，十万军民蹈海赴死，南宋灭亡。这是中国历史上最悲壮的亡国之战。' },
  { id: 'e_shoushi_li', year: 1281, name: '《授时历》颁行', type: 'science', desc: '郭守敬编制的《授时历》正式颁行，以365.2425天为一年，与现代公历完全一致，比西方格里高利历早300年，是中国古代最精确的历法。' },
  { id: 'e_yuan_faruibin', year: 1281, name: '元征日本失败', type: 'war', desc: '忽必烈两次远征日本（1274年、1281年），均因台风袭击而惨败。日本人称台风为"神风"，二战时"神风特攻队"即取此典故。' },
  { id: 'e_tuotuo_genghua', year: 1340, name: '脱脱更化', type: 'politics', desc: '元顺帝时丞相脱脱推行改革：恢复科举、平反冤狱、减免赋税、修辽金宋三史，一度使元朝出现中兴希望。但治河加重百姓负担，红巾军起义爆发后脱脱被政敌诬陷流放致死。' },
  { id: 'e_hongjin_qiyi', year: 1351, name: '红巾军起义', type: 'war', desc: '韩山童、刘福通以白莲教聚众，"石人一只眼，挑动黄河天下反"，头裹红巾起义。红巾军起义席卷全国，敲响元朝丧钟，最终朱元璋脱颖而出，建立明朝。' },
  { id: 'e_ming_founded', year: 1368, name: '明朝建立', type: 'politics', desc: '朱元璋推翻元朝，建立明朝，定都南京，后迁都北京，汉族重新掌握政权。' },
  { id: 'e_jingnan', year: 1399, name: '靖难之役', type: 'war', desc: '燕王朱棣以"清君侧"为名起兵，历时4年攻入南京，建文帝下落不明，朱棣即位为明成祖。这是中国历史上唯一藩王造反成功的案例。' },
  { id: 'e_zhenghe_voyage', year: 1405, name: '郑和下西洋', type: 'economy', desc: '郑和率领庞大船队七次下西洋（1405-1433），最远到达非洲东海岸和红海，是世界航海史上的壮举，比哥伦布发现美洲早了近百年。船队最大时200余艘、27000余人，展示了明朝的强大国力。' },
  { id: 'e_yongle_dadian', year: 1408, name: '《永乐大典》编成', type: 'culture', desc: '明成祖命解缙等编修《永乐大典》，全书22877卷，约3.7亿字，是中国古代规模最大的类书，也是当时世界上最大的百科全书。收录上自先秦、下至明初的图书七八千种。' },
  { id: 'e_yongle_qianba', year: 1421, name: '迁都北京', type: 'politics', desc: '明成祖朱棣将都城从南京迁至北京，建造紫禁城，奠定此后500年的政治格局。' },
  { id: 'e_tumubao', year: 1449, name: '土木堡之变', type: 'war', desc: '明英宗宠信太监王振，御驾亲征瓦剌，在土木堡（今河北怀来）遭遇惨败，英宗被俘，随驾文武百官几乎全部战死，明朝精锐损失殆尽，是明朝由盛转衰的转折点。' },
  { id: 'e_beijing_baowei', year: 1449, name: '北京保卫战', type: 'war', desc: '土木堡之变后，于谦力排众议，拥立景帝，拒绝南迁，亲自指挥北京保卫战。瓦剌也先大军围攻北京，于谦调兵遣将，激战五日击退敌军，挽救了大明王朝。' },
  { id: 'e_duomen', year: 1457, name: '夺门之变', type: 'politics', desc: '明英宗趁景帝病重，联合石亨、徐有贞等发动政变，攻入宫门复辟，改元天顺。复辟后冤杀于谦等景帝重臣，但废除了残酷的殉葬制度。' },
  { id: 'e_anti_wako', year: 1561, name: '平定倭患', type: 'war', desc: '戚继光在东南沿海抗击倭寇，台州九战九捷，又在福建、广东等地连战连捷，基本平定了困扰明朝数十年的倭患问题。' },
  { id: 'e_wanli_zhongxing', year: 1573, name: '万历中兴', type: 'politics', desc: '张居正任内阁首辅期间推行改革：清丈田地、推行一条鞭法、实行考成法整顿吏治，国库充盈，太仓积粟可支十年，出现了明朝最后的治世。' },
  { id: 'e_wanli_three_war', year: 1592, name: '万历三大征', type: 'war', desc: '万历年间明朝三次大规模用兵：平定宁夏哱拜叛乱、抗击日本丰臣秀吉入侵朝鲜（壬辰倭乱）、平定播州杨应龙叛乱。三战皆胜，但国库耗尽，为明朝灭亡埋下伏笔。' },
  { id: 'e_ming_fall', year: 1644, name: '明朝灭亡', type: 'war', desc: '李自成率农民军攻入北京，崇祯帝在煤山自缢殉国，立国276年的明朝灭亡。随即吴三桂引清军入关，击败李自成，清朝入主中原。' },
  { id: 'e_houjin_jianguo', year: 1616, name: '后金建国', type: 'politics', desc: '努尔哈赤统一女真各部，建立后金，是清朝的前身。' },
  { id: 'e_qing_ruguan', year: 1644, name: '清军入关', type: 'war', desc: '吴三桂引清军入山海关，击败李自成大顺军。多尔衮率清军入主北京，开始了清朝对中国的统治。随后南下征服南明，血洗扬州、嘉定、江阴，制造"扬州十日""嘉定三屠"等惨案。' },
  { id: 'e_qing_gaohao', year: 1636, name: '清朝建立', type: 'politics', desc: '皇太极改国号后金为大清，改族名为满洲，正式建立清朝。' },
  { id: 'e_santai', year: 1673, name: '三藩之乱', type: 'war', desc: '吴三桂、尚可喜、耿精忠三藩起兵反清，吴三桂称帝，占据半壁江山。康熙帝力排众议坚决平叛，历时8年终获全胜，进一步巩固了中央集权。' },
  { id: 'e_taiwan_tongyi', year: 1683, name: '统一台湾', type: 'politics', desc: '康熙帝派施琅率军攻克台湾，设台湾府，台湾正式纳入清朝版图。' },
  { id: 'e_nerchinsk', year: 1689, name: '《尼布楚条约》', type: 'politics', desc: '清与沙俄签订《尼布楚条约》，划定中俄东段边界，是中国历史上第一份与西方国家签订的平等条约，确认了黑龙江和乌苏里江流域属中国。' },
  { id: 'e_kangxi_dict', year: 1716, name: '《康熙字典》编成', type: 'culture', desc: '张玉书、陈廷敬等奉旨编纂《康熙字典》，收录汉字47035个，是中国古代收字最全的字典，沿用了近三百年。' },
  { id: 'e_siku_quanshu', year: 1782, name: '《四库全书》编成', type: 'culture', desc: '乾隆帝主持编纂《四库全书》，收书3500余种，79000余卷，约8亿字，是中国最大的丛书，也被批评借修书之名销毁了许多不利于清朝统治的书籍。' },
  { id: 'e_heshen_huo', year: 1799, name: '和珅被抄家', type: 'politics', desc: '乾隆帝去世，嘉庆帝赐死和珅，查抄其家产约八亿两白银，相当于清廷十余年财政收入。"和珅跌倒，嘉庆吃饱"流传至今。' },
  { id: 'e_bailianjiao', year: 1796, name: '白莲教起义', type: 'war', desc: '川楚陕白莲教大起义，历时9年才被镇压，清廷耗银两亿两，清朝由盛转衰的标志。' },
  { id: 'e_humen_xiaoyian', year: 1839, name: '虎门销烟', type: 'politics', desc: '林则徐在虎门将英国走私鸦片约二百万斤全部销毁，成为鸦片战争导火索。' },
  { id: 'e_yapian_war', year: 1840, name: '第一次鸦片战争', type: 'war', desc: '英国以虎门销烟为由发动战争，清朝战败，签订《南京条约》，割让香港岛，开放五口通商，赔款2100万银元。这是中国近代史的开端，开始了百年屈辱。' },
  { id: 'e_taiping', year: 1851, name: '太平天国运动', type: 'war', desc: '洪秀全领导的农民起义，建立太平天国，历时14年，波及18省，造成数千万人死亡，是中国历史上规模最大、伤亡最惨重的农民战争。' },
  { id: 'e_yapian_war2', year: 1856, name: '第二次鸦片战争', type: 'war', desc: '英法联军侵华，1860年攻入北京，火烧圆明园。签订《北京条约》，割九龙半岛，增开通商口岸，鸦片贸易合法化。' },
  { id: 'e_yangwu', year: 1861, name: '洋务运动', type: 'economy', desc: '曾国藩、李鸿章、左宗棠、张之洞等人推动洋务运动，引进西方技术，建立军工企业、民用企业、新式学堂，是中国近代化的开端。以"中体西用"为指导思想。' },
  { id: 'e_xinjiang', year: 1878, name: '左宗棠收复新疆', type: 'war', desc: '左宗棠力排众议，抬棺西征，率军收复新疆全境，粉碎阿古柏政权和沙俄侵略。1884年新疆正式建省，保住中国六分之一国土。' },
  { id: 'e_jiawu', year: 1894, name: '甲午战争', type: 'war', desc: '中日甲午战争，清朝惨败，北洋舰队在威海卫全军覆没。签订《马关条约》，割让台湾及澎湖列岛，赔偿白银两亿两，中国彻底沦为半殖民地半封建社会。' },
  { id: 'e_maguan', year: 1895, name: '《马关条约》', type: 'politics', desc: '中日甲午战争后签订的不平等条约，割让台湾及澎湖列岛，赔偿两亿两白银，开放沙市、重庆、苏州、杭州为通商口岸，加速了清朝衰亡。' },
  { id: 'e_wuxu', year: 1898, name: '戊戌变法', type: 'politics', desc: '康有为、梁启超主导，光绪帝推行维新变法，历时103天（"百日维新"），推行新政。被慈禧太后发动政变扼杀，谭嗣同等六君子被杀，光绪帝被囚禁于瀛台。' },
  { id: 'e_gengzi', year: 1900, name: '庚子国变', type: 'war', desc: '义和团运动兴起，慈禧向十一国宣战，八国联军攻入北京，慈禧携光绪帝西逃。签订《辛丑条约》，赔款4.5亿两白银（本息合计9.8亿两），中国彻底沦为半殖民地。' },
  { id: 'e_xinhai', year: 1911, name: '辛亥革命', type: 'politics', desc: '孙中山领导的资产阶级民主革命，武昌起义为导火索，推翻清朝统治，结束2000年帝制。' },
  { id: 'e_minguo_jianguo', year: 1912, name: '中华民国成立', type: 'politics', desc: '孙中山在南京宣誓就任中华民国临时大总统，中华民国正式成立，亚洲第一个共和国。' },
  { id: 'e_changzheng', year: 1934, name: '长征', type: 'war', desc: '中国工农红军进行战略转移，历时两年，行程约二万五千里，是中国革命史上的伟大壮举。' },
  { id: 'e_kangzhan', year: 1937, name: '全面抗日战争', type: 'war', desc: '七七事变后，中国全面抗击日本侵略，历时8年，付出了巨大牺牲，最终取得抗战胜利。' },

  // 民国事件
  { id: 'e_wusi', year: 1919, name: '五四运动', type: 'politics', desc: '巴黎和会上中国外交失败，北京学生率先走上街头，高喊"外争国权，内惩国贼"。运动迅速扩展至全国，工人罢工、商人罢市，最终迫使北洋政府拒绝在和约上签字。新文化运动由此走向高潮，马克思主义在中国广泛传播。' },
  { id: 'e_cpc_founded', year: 1921, name: '中国共产党成立', type: 'politics', desc: '7月23日，中国共产党第一次全国代表大会在上海法租界召开，后转移至浙江嘉兴南湖，13位代表出席，代表全国50多名党员。这是中国历史上开天辟地的大事变，从此中国革命有了新的领导力量。' },
  { id: 'e_gongbei', year: 1924, name: '第一次国共合作', type: 'politics', desc: '在中国共产党和共产国际推动下，孙中山改组国民党，实行"联俄、联共、扶助农工"三大政策。国共合作后共同发动北伐战争，基本推翻北洋军阀统治。但孙中山逝世后，国共矛盾日益尖锐。' },
  { id: 'e_beifa', year: 1926, name: '北伐战争', type: 'war', desc: '国民革命军从广东出发北伐，总司令蒋介石。不到一年，先后击败吴佩孚、孙传芳等军阀，势力扩展至长江流域。北伐极大地推动了革命形势发展，但1927年蒋介石发动"四一二"政变，国共合作破裂。' },
  { id: 'e_siyier', year: 1927, name: '四一二政变', type: 'politics', desc: '4月12日，蒋介石在上海发动反革命政变，大肆屠杀共产党人和工人群众。随后汪精卫在武汉"分共"，第一次国共合作彻底破裂，大革命失败。中国共产党由此走上武装反抗的道路。' },
  { id: 'e_nanchang_qiyi', year: 1927, name: '南昌起义', type: 'war', desc: '8月1日，周恩来、贺龙、叶挺、朱德、刘伯承等领导北伐军两万余人在南昌起义，打响了武装反抗国民党反动派的第一枪。这一天后来成为中国人民解放军的建军节。' },
  { id: 'e_jiuiba', year: 1931, name: '九一八事变', type: 'war', desc: '9月18日，日本关东军炸毁南满铁路柳条湖段，反诬中国军队所为，随即攻占沈阳。东北军奉蒋介石"不抵抗"命令撤入关内，日军仅用4个月便占领东北三省。九一八是日本侵华的开端，也是14年抗战的起点。' },
  { id: 'e_xian_bianshi', year: 1936, name: '西安事变', type: 'politics', desc: '12月12日，张学良、杨虎城在西安扣留蒋介石，逼其"停止内战，联共抗日"。经周恩来等斡旋，蒋介石接受停止内战、联共抗日主张，西安事变和平解决。十年内战基本结束，抗日民族统一战线初步形成。' },
  { id: 'e_qiqi', year: 1937, name: '七七事变', type: 'war', desc: '7月7日夜，日军在卢沟桥附近进行军事演习，借口一名士兵"失踪"，要求进入宛平城搜查，遭拒后即向中国驻军发动进攻。中国守军奋起抵抗，全面抗日战争由此开始。' },
  { id: 'e_nanjin_datusha', year: 1937, name: '南京大屠杀', type: 'war', desc: '12月13日日军攻陷南京后，进行了长达六周的大规模屠杀、强奸和抢劫。遇难者达30万人以上，是人类历史上最惨烈的大屠杀之一。这是中华民族永远不能忘记的国耻。' },
  { id: 'e_taierzhuang', year: 1938, name: '台儿庄大捷', type: 'war', desc: '3-4月，第五战区司令李宗仁指挥中国军队在台儿庄地区与日军激战，歼灭日军精锐万余人。这是抗战以来正面战场取得的首次重大胜利，极大振奋了全国抗战信心。' },
  { id: 'e_baituan_dazhan', year: 1940, name: '百团大战', type: 'war', desc: '8-12月，八路军在彭德怀指挥下出动105个团，对日军发动大规模破袭战，破坏铁路公路、攻克据点，歼灭日伪军2.5万余人。百团大战是抗战中八路军规模最大的战役，振奋了全国人民抗战信心。' },
  { id: 'e_kangzhan_shengli', year: 1945, name: '抗日战争胜利', type: 'politics', desc: '8月15日，日本天皇宣布无条件投降。9月2日，日本正式签署投降书。经过14年艰苦卓绝的抗战，中国人民终于取得了抗日战争的伟大胜利。这是近代以来中华民族反抗外敌入侵第一次取得完全胜利。' },
];


const JAPAN_DYNASTIES = [
  { name: '飞鸟时代', start: -2697, end: 710, color: '#8B0000' },
  { name: '奈良时代', start: 710, end: 794, color: '#6a0dad' },
  { name: '平安时代', start: 794, end: 1185, color: '#4a0080' },
  { name: '镰仓幕府', start: 1185, end: 1336, color: '#4a4a4a' },
  { name: '室町幕府', start: 1336, end: 1573, color: '#3a5a3a' },
  { name: '安土桃山', start: 1573, end: 1603, color: '#5a3a3a' },
  { name: '江户幕府', start: 1603, end: 1868, color: '#2a2a5a' },
  { name: '明治以后', start: 1868, end: 2025, color: '#c0392b' },

{ id: 'e_blue_jade_case', year: 1393, name: '蓝玉案', type: 'politics', desc: '朱元璋以谋反罪诛杀开国名将蓝玉，株连一万五千余人。明初功臣几乎被清洗殆尽。' },
{ id: 'e_yongle_encyclopedia', year: 1408, name: '永乐大典成书', type: 'culture', desc: '解缙等2000余人历时五年编成《永乐大典》，共22937卷，是世界最大的纸本百科全书。' },
{ id: 'e_tumu_crisis', year: 1449, name: '土木堡之变', type: 'war', desc: '明英宗在王振怂恿下亲征瓦剌，在土木堡全军覆没被俘。于谦领导北京保卫战，挽救了明朝。' },
{ id: 'e_nanjing_capital', year: 1421, name: '正式迁都北京', type: 'politics', desc: '明成祖正式迁都北京，南京作为留都。紫禁城和天坛等宏伟建筑落成。' },
{ id: 'e_jiajing', year: 1542, name: '壬寅宫变', type: 'politics', desc: '嘉靖帝追求长生服食丹药，虐待宫女。16名宫女试图勒死皇帝，事败被凌迟处死。是中国历史上罕见的宫女起义。' },
{ id: 'e_longqing_switch', year: 1567, name: '隆庆开关', type: 'economy', desc: '隆庆帝解除海禁，允许民间海外贸易。大量白银流入中国，促进了晚明商品经济的繁荣。' },
{ id: 'e_ningxia', year: 1592, name: '万历三大征', type: 'war', desc: '万历年间明军三次大规模远征：宁夏之役、朝鲜之役（抗倭援朝）、播州之役。虽皆取胜但耗尽国力。' },
{ id: 'e_donglin', year: 1604, name: '东林书院重建', type: 'culture', desc: '顾宪成重建东林书院，讲学议政，"风声雨声读书声声声入耳，家事国事天下事事事关心"成为东林精神。' },
{ id: 'e_weizhongxian', year: 1625, name: '魏忠贤擅权', type: 'politics', desc: '天启年间魏忠贤权倾朝野，自称九千岁，残酷镇压东林党人。其擅权标志着明代宦官专权达到顶峰。' },
{ id: 'e_chongzhen_meishan', year: 1644, name: '崇祯帝煤山自缢', type: 'politics', desc: '李自成攻破北京，崇祯帝在煤山（景山）自缢殉国，明朝灭亡。他在衣襟上留下血书"任贼分裂朕尸，勿伤百姓一人"。' },

{ id: 'e_hongwu_reign', year: 1368, name: '洪武之治', type: 'politics', desc: '朱元璋建立明朝后轻徭薄赋、惩治贪腐、休养生息。推行里甲制和黄册制度，为明朝300年统治奠定基础。' },
{ id: 'e_jingnan', year: 1399, name: '靖难之役', type: 'war', desc: '燕王朱棣以清君侧为名起兵，历时四年攻破南京。建文帝失踪，朱棣即位成为明成祖。是中国历史上唯一成功的藩王夺位。' },
{ id: 'e_yongle_reign', year: 1405, name: '永乐盛世', type: 'politics', desc: '朱棣迁都北京，修建紫禁城。郑和下西洋，编永乐大典，五次亲征漠北。是明朝国力最强盛的时期。' },
{ id: 'e_renxuan_rule', year: 1425, name: '仁宣之治', type: 'politics', desc: '洪熙、宣德两朝停止大规模军事行动和下西洋，与民休息。三杨辅政，政治清明。被称为明代的文景之治。' },
{ id: 'e_chenghua_era', year: 1470, name: '成化朝政', type: 'politics', desc: '成化前期有商辂等名臣辅政，后期万贵妃弄权。设西厂，斗彩瓷器为明代之冠。' },
{ id: 'e_hongzhi_rule', year: 1488, name: '弘治中兴', type: 'politics', desc: '弘治帝勤政爱民，一夫一妻，史称弘治中兴。但其后继者正德帝荒淫导致中兴昙花一现。' },
{ id: 'e_zhengde_era', year: 1510, name: '正德荒政', type: 'politics', desc: '正德帝微服私访、豹房玩乐。刘瑾弄权后被杀。宁王朱宸濠叛乱被王阳明平定。' },
{ id: 'e_jiajing_era', year: 1530, name: '嘉靖中后期', type: 'politics', desc: '嘉靖帝痴迷道教，严嵩专权二十年。庚戌之变蒙古俺答兵临北京城下。在政治黑暗的同时，文学艺术空前繁荣。' },
{ id: 'e_longqing_era', year: 1568, name: '隆庆新政', type: 'politics', desc: '隆庆开关海外贸易、隆庆和议结束百年边患。为万历中兴铺平了道路。' },
{ id: 'e_wanli_era', year: 1580, name: '万历中兴与怠政', type: 'politics', desc: '张居正改革（一条鞭法）带来短暂中兴。张死后万历帝长期不上朝，国本之争持续数十年，明朝由盛转衰。' },
{ id: 'e_tianqi_era', year: 1622, name: '天启朝阉党专权', type: 'politics', desc: '天启帝沉迷木工，魏忠贤阉党残酷镇压东林党。后金占领沈阳、辽阳，明朝已在崩溃边缘。' },
];


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

{
    id: 'archimedes', name: '阿基米德', birth: -287, death: -212,
    cat: 'scientist', emoji: '🔬',
    desc: '古希腊最伟大的数学家、物理学家。发现浮力定律（阿基米德原理）和杠杆原理，计算圆周率，发明多种战争机械。在罗马攻破叙拉古时被士兵杀害，临终遗言"不要破坏我的圆"。',
    achievements: ['浮力定律', '杠杆原理', '圆周率计算'],
    relations: [],
    events: []
  },

  {
    id: 'cleopatra', name: '克娄巴特拉七世', birth: -69, death: -30,
    cat: 'emperor', emoji: '👑',
    desc: '古埃及托勒密王朝末代女王，以智慧和魅力著称。先后与凯撒和马克·安东尼结盟，试图维持埃及独立。安东尼战败后，以毒蛇自杀，埃及并入罗马帝国。',
    achievements: ['最后一位埃及法老', '外交谋略'],
    relations: [{ id: 'caesar', type: '情人', label: '凯撒' }],
    events: []
  },

  {
    id: 'constantine', name: '君士坦丁大帝', birth: 272, death: 337,
    cat: 'emperor', emoji: '🏛️',
    desc: '罗马帝国皇帝，重新统一罗马帝国。颁布《米兰敕令》承认基督教合法，迁都拜占庭（后改名君士坦丁堡），奠定了基督教成为罗马国教和东罗马帝国千年基业。',
    achievements: ['米兰敕令', '迁都君士坦丁堡', '统一罗马帝国'],
    relations: [],
    events: []
  },

  {
    id: 'elizabeth_i', name: '伊丽莎白一世', birth: 1533, death: 1603,
    cat: 'emperor', emoji: '👸',
    desc: '英国都铎王朝最后一位君主，开创伊丽莎白时代。击败西班牙无敌舰队，确立英国海上霸权；支持莎士比亚等文艺巨匠。终身未婚，被称为童贞女王。',
    achievements: ['击败无敌舰队', '海上霸权', '伊丽莎白时代'],
    relations: [],
    events: []
  },

  {
    id: 'voltaire', name: '伏尔泰', birth: 1694, death: 1778,
    cat: 'philosopher', emoji: '📝',
    desc: '法国启蒙运动领袖，作家、哲学家。倡导言论自由、宗教宽容、理性主义，抨击教会和专制制度。代表作《哲学通信》《老实人》，名言——我不同意你的观点，但我誓死捍卫你说话的权利——代表启蒙精神。',
    achievements: ['启蒙运动领袖', '《老实人》', '言论自由倡导'],
    relations: [],
    events: []
  },

  {
    id: 'rousseau', name: '让-雅克·卢梭', birth: 1712, death: 1778,
    cat: 'philosopher', emoji: '📖',
    desc: '法国启蒙思想家、哲学家。提出社会契约论和主权在民思想，深刻影响了法国大革命和现代民主政治。代表作《社会契约论》《忏悔录》，其回归自然理念开创浪漫主义。',
    achievements: ['社会契约论', '主权在民', '法国大革命思想先驱'],
    relations: [],
    events: []
  },

  {
    id: 'adam_smith', name: '亚当·斯密', birth: 1723, death: 1790,
    cat: 'philosopher', emoji: '📈',
    desc: '苏格兰经济学家、哲学家，古典经济学之父。代表作《国富论》系统阐述自由市场经济理论，提出看不见的手的著名比喻，奠定了现代经济学的基础。',
    achievements: ['《国富论》', '看不见的手', '现代经济学之父'],
    relations: [],
    events: []
  },

  {
    id: 'peter_great', name: '彼得大帝', birth: 1672, death: 1725,
    cat: 'emperor', emoji: '🛡️',
    desc: '俄国沙皇，俄罗斯帝国奠基人。微服私访西欧学习先进技术，推行全面西化改革：建立海军、改革军制、迁都圣彼得堡。将落后的俄国带入欧洲强国之列。',
    achievements: ['西化改革', '建立海军', '迁都圣彼得堡'],
    relations: [],
    events: []
  },

  {
    id: 'bismarck', name: '奥托·冯·俾斯麦', birth: 1815, death: 1898,
    cat: 'politician', emoji: '🔮',
    desc: '德意志帝国首任宰相，被称为铁血宰相。通过三次王朝战争统一德意志，建立了欧洲大陆最强大的国家。推行社会保险制度，开创现代福利国家先河。',
    achievements: ['统一德意志', '铁血政策', '现代福利制度'],
    relations: [],
    events: []
  },

  {
    id: 'tolstoy', name: '列夫·托尔斯泰', birth: 1828, death: 1910,
    cat: 'artist', emoji: '📚',
    desc: '俄国文学巨匠，世界文学史上最伟大的小说家之一。代表作《战争与和平》《安娜·卡列尼娜》《复活》以宏大叙事和深刻人性描写著称。晚年倡导托尔斯泰主义——不以暴力抗恶。',
    achievements: ['《战争与和平》', '《安娜·卡列尼娜》', '《复活》'],
    relations: [],
    events: []
  },

  {
    id: 'tesla', name: '尼古拉·特斯拉', birth: 1856, death: 1943,
    cat: 'scientist', emoji: '⚡',
    desc: '塞尔维亚裔美国发明家、电气工程师。发明交流电系统，奠定了现代电力工业的基础。拥有700多项专利，包括无线电、遥控技术、特斯拉线圈等。一生贫困但才华横溢，死后被誉为被遗忘的天才。',
    achievements: ['交流电系统', '特斯拉线圈', '无线电先驱', '700多项专利'],
    relations: [],
    events: []
  },

  {
    id: 'chaplin', name: '查理·卓别林', birth: 1889, death: 1977,
    cat: 'artist', emoji: '🎬',
    desc: '英国喜剧大师、电影导演。创造了流浪汉夏尔洛的经典银幕形象。代表作《淘金记》《城市之光》《摩登时代》《大独裁者》，以幽默讽刺社会现实，被誉为电影史上最伟大的喜剧天才。',
    achievements: ['流浪汉夏尔洛', '《摩登时代》', '《大独裁者》', '默片喜剧巅峰'],
    relations: [],
    events: []
  },

  {
    id: 'hemingway', name: '欧内斯特·海明威', birth: 1899, death: 1961,
    cat: 'artist', emoji: '✍️',
    desc: '美国作家，迷惘的一代代表人物。以简洁有力的冰山理论写作风格著称。代表作《老人与海》获诺贝尔文学奖，《太阳照常升起》《永别了，武器》记录战争创伤。',
    achievements: ['诺贝尔文学奖', '《老人与海》', '冰山理论', '迷惘的一代'],
    relations: [],
    events: []
  },

  {
    id: 'hawking', name: '斯蒂芬·霍金', birth: 1942, death: 2018,
    cat: 'scientist', emoji: '🌌',
    desc: '英国理论物理学家。21岁患渐冻症，在轮椅上完成毕生研究。提出黑洞辐射理论（霍金辐射），著《时间简史》全球畅销，将深奥的宇宙学普及给大众。',
    achievements: ['霍金辐射', '《时间简史》', '黑洞理论', '科普巨人'],
    relations: [],
    events: []
  },

  {
    id: 'jobs', name: '史蒂夫·乔布斯', birth: 1955, death: 2011,
    cat: 'inventor', emoji: '📱',
    desc: '美国企业家，苹果公司联合创始人。先后推出Mac电脑、iPod、iPhone、iPad等革命性产品，重新定义了个人电脑、音乐、手机和出版行业。Stay Hungry, Stay Foolish激励了无数人。',
    achievements: ['创立苹果公司', 'iPhone', 'Mac', '颠覆四大行业'],
    relations: [],
    events: []
  },

// === 古代文明 ===
  { id: 'hammurabi', name: '汉谟拉比', birth: -1810, death: -1750, cat: 'emperor', emoji: '📜', desc: '古巴比伦王国第六代国王。颁布《汉谟拉比法典》，是世界上现存最早的成文法典之一，以"以眼还眼"闻名。', achievements: ['汉谟拉比法典', '统一两河流域'], relations: [], events: [] },
  { id: 'ramesses_ii', name: '拉美西斯二世', birth: -1303, death: -1213, cat: 'emperor', emoji: '🏛️', desc: '古埃及新王国时期最伟大的法老。在位67年，修建阿布辛贝神庙，与赫梯帝国签订人类最早的和平条约。', achievements: ['阿布辛贝神庙', '最早和平条约', '在位67年'], relations: [], events: [] },
  { id: 'pericles', name: '伯里克利', birth: -495, death: -429, cat: 'politician', emoji: '🏛️', desc: '雅典黄金时代的领导者。推行民主改革，建造帕特农神庙，雅典在其治下成为希腊最强大的城邦。', achievements: ['雅典民主顶峰', '建造帕特农神庙', '黄金时代'], relations: [], events: [] },
  { id: 'hippocrates', name: '希波克拉底', birth: -460, death: -370, cat: 'scientist', emoji: '⚕️', desc: '古希腊医学之父。将医学从巫术分离，建立以观察和诊断为基础的医学体系。其"希波克拉底誓言"至今仍是医生道德准则。', achievements: ['医学之父', '希波克拉底誓言', '医学科学化'], relations: [], events: [] },
  { id: 'euclid', name: '欧几里得', birth: -330, death: -275, cat: 'scientist', emoji: '🔺', desc: '古希腊数学家，几何学之父。所著《几何原本》系统总结了古典几何学知识，是科学史上最影响深远的著作之一。', achievements: ['《几何原本》', '几何学之父', '公理化方法'], relations: [], events: [] },
  { id: 'cicero', name: '西塞罗', birth: -106, death: -43, cat: 'politician', emoji: '📜', desc: '罗马共和国末期的政治家、演说家、哲学家。拉丁文学的巅峰代表，其著作影响了整个西方政治思想史。', achievements: ['拉丁文学巅峰', '演说大师', '共和精神'], relations: [], events: [] },
  { id: 'nero', name: '尼禄', birth: 37, death: 68, cat: 'emperor', emoji: '🔥', desc: '罗马帝国第五位皇帝。以暴虐和奢华闻名，传说在罗马大火时弹琴作乐。死后罗马陷入内战（四帝之年）。', achievements: ['罗马大火', '暴君典型'], relations: [], events: [] },
  { id: 'marcus_aurelius', name: '马可·奥勒留', birth: 121, death: 180, cat: 'philosopher', emoji: '🧘', desc: '罗马帝国皇帝，斯多葛派哲学家。著有《沉思录》，在戎马倥偬中以哲学修养心灵，被视为"哲学家皇帝"的典范。', achievements: ['《沉思录》', '斯多葛哲学', '哲学家皇帝'], relations: [], events: [] },

// === 中古 ===
  { id: 'augustine', name: '圣奥古斯丁', birth: 354, death: 430, cat: 'philosopher', emoji: '✝️', desc: '基督教神学家，教会博士。著《上帝之城》《忏悔录》，建立了基督教神学体系，深刻影响了整个中世纪西方思想。', achievements: ['《上帝之城》', '《忏悔录》', '基督教神学奠基'], relations: [], events: [] },
  { id: 'justinian', name: '查士丁尼大帝', birth: 482, death: 565, cat: 'emperor', emoji: '⚖️', desc: '东罗马（拜占庭）皇帝。编撰《查士丁尼法典》，成为现代民法的基础。建造圣索菲亚大教堂，一度恢复罗马帝国疆域。', achievements: ['查士丁尼法典', '圣索菲亚大教堂', '民法基础'], relations: [], events: [] },
  { id: 'muhammad', name: '穆罕默德', birth: 570, death: 632, cat: 'philosopher', emoji: '☪️', desc: '伊斯兰教创始人。在阿拉伯半岛创立伊斯兰教，统一阿拉伯各部落。《古兰经》为其所传达的启示，深刻影响了世界文明。', achievements: ['创立伊斯兰教', '统一阿拉伯', '《古兰经》'], relations: [], events: [] },
  { id: 'william_conqueror', name: '征服者威廉', birth: 1028, death: 1087, cat: 'emperor', emoji: '⚔️', desc: '诺曼底公爵，英格兰国王。1066年哈斯廷斯之战征服英格兰，建立诺曼王朝。改变了英国的语言、文化和政治制度。', achievements: ['征服英格兰', '哈斯廷斯之战', '诺曼王朝'], relations: [], events: [] },
  { id: 'saladin', name: '萨拉丁', birth: 1137, death: 1193, cat: 'military', emoji: '⚔️', desc: '埃及和叙利亚苏丹，阿尤布王朝创立者。1187年收复耶路撒冷，以宽容和骑士精神著称，连敌人狮心王理查也对其敬重。', achievements: ['收复耶路撒冷', '哈丁战役', '骑士精神典范'], relations: [], events: [] },
  { id: 'thomas_aquinas', name: '托马斯·阿奎那', birth: 1225, death: 1274, cat: 'philosopher', emoji: '📖', desc: '中世纪最伟大的神学家和哲学家。著《神学大全》，将亚里士多德哲学与基督教神学结合，建立经院哲学体系。', achievements: ['《神学大全》', '经院哲学顶峰'], relations: [], events: [] },
  { id: 'joan_of_arc', name: '圣女贞德', birth: 1412, death: 1431, cat: 'military', emoji: '🛡️', desc: '法国民族英雄。自称受上帝启示，领导法军在百年战争中击败英军，解奥尔良之围。后被捕并被宗教法庭处以火刑，19岁殉难。', achievements: ['解奥尔良之围', '法国民族英雄', '圣女'], relations: [], events: [] },
  { id: 'medici_lorenzo', name: '洛伦佐·德·美第奇', birth: 1449, death: 1492, cat: 'politician', emoji: '🎭', desc: '佛罗伦萨的实际统治者，文艺复兴最伟大的赞助人。资助了波提切利、达芬奇、米开朗基罗等众多艺术家，被尊为"豪华者洛伦佐"。', achievements: ['文艺复兴赞助人', '豪华者洛伦佐', '佛罗伦萨黄金时代'], relations: [], events: [] },
  { id: 'suleiman', name: '苏莱曼大帝', birth: 1494, death: 1566, cat: 'emperor', emoji: '🕌', desc: '奥斯曼帝国第十位苏丹。在位46年，帝国疆域达到顶峰。颁布法典，被誉为立法者，建筑大师锡南为其建造了壮丽的苏莱曼清真寺。', achievements: ['奥斯曼帝国鼎盛', '立法者', '黄金时代'], relations: [], events: ['e_constantinople_fall'] },

// === 近代早期 ===
  { id: 'machiavelli', name: '马基雅维利', birth: 1469, death: 1527, cat: 'politician', emoji: '🦊', desc: '意大利政治哲学家。著《君主论》，提出政治即权力斗争的现实主义观点，被尊为现代政治学之父。"马基雅维利主义"成为权术代名词。', achievements: ['《君主论》', '现代政治学之父'], relations: [], events: [] },
  { id: 'descartes', name: '笛卡尔', birth: 1596, death: 1650, cat: 'philosopher', emoji: '🤔', desc: '法国哲学家、数学家，近代哲学之父。提出"我思故我在"，创立解析几何，将代数和几何统一。笛卡尔坐标系至今是数学基础。', achievements: ['我思故我在', '解析几何', '近代哲学之父'], relations: [], events: [] },
  { id: 'louis_xiv', name: '路易十四', birth: 1638, death: 1715, cat: 'emperor', emoji: '👑', desc: '法国波旁王朝国王，太阳王。在位72年，建造凡尔赛宫，建立绝对君主制。"朕即国家"是其统治哲学。', achievements: ['太阳王', '凡尔赛宫', '在位72年', '绝对君主制'], relations: [], events: [] },
  { id: 'leibniz', name: '莱布尼茨', birth: 1646, death: 1716, cat: 'scientist', emoji: '∫', desc: '德国哲学家、数学家。独立于牛顿发明微积分，提出二进制。其"单子论"哲学体系博大精深。', achievements: ['微积分', '二进制', '单子论'], relations: [], events: [] },
  { id: 'kant', name: '伊曼努尔·康德', birth: 1724, death: 1804, cat: 'philosopher', emoji: '⏰', desc: '德国哲学家，启蒙时代最伟大的思想家之一。著《纯粹理性批判》，提出认识论的哥白尼革命，其道德律令"头顶星空，心中道德"震撼人心。', achievements: ['《纯粹理性批判》', '哥白尼革命', '道德律令'], relations: [], events: [] },
  { id: 'catherine_great', name: '叶卡捷琳娜大帝', birth: 1729, death: 1796, cat: 'emperor', emoji: '👑', desc: '俄国女皇，俄罗斯帝国黄金时代统治者。扩张疆域至黑海，推进启蒙改革，与伏尔泰通信论道，收藏大量艺术品。', achievements: ['俄罗斯扩张', '启蒙改革', '女皇'], relations: [], events: [] },
  { id: 'maria_theresa', name: '玛丽亚·特蕾莎', birth: 1717, death: 1780, cat: 'emperor', emoji: '👑', desc: '奥地利女大公，哈布斯堡王朝唯一女性统治者。推行开明专制改革，奥地利在她的治下成为欧洲强国。生了16个子女（包括玛丽·安托瓦内特）。', achievements: ['奥地利女大公', '开明专制', '16个子女'], relations: [], events: [] },
  { id: 'goethe', name: '歌德', birth: 1749, death: 1832, cat: 'artist', emoji: '📖', desc: '德国文学巨匠，狂飙突进运动代表。诗剧《浮士德》被誉为德语文学巅峰，耗费60年完成。其《少年维特之烦恼》掀起全欧浪漫热潮。', achievements: ['《浮士德》', '《少年维特之烦恼》', '德国文学巅峰'], relations: [], events: [] },

// === 19世纪 ===
  { id: 'simon_bolivar', name: '西蒙·玻利瓦尔', birth: 1783, death: 1830, cat: 'military', emoji: '🗡️', desc: '拉丁美洲独立运动领袖，解放者。领导委内瑞拉、哥伦比亚等多国摆脱西班牙统治独立，梦想建立统一的美洲共和国。', achievements: ['解放南美', '大哥伦比亚', '解放者'], relations: [], events: [] },
  { id: 'victoria_queen', name: '维多利亚女王', birth: 1819, death: 1901, cat: 'emperor', emoji: '👑', desc: '英国女王，在位63年。"日不落帝国"在其治下达到鼎盛。维多利亚时代是英国工业革命、科学进步和文化繁荣的黄金时期。', achievements: ['日不落帝国', '在位63年', '维多利亚时代'], relations: [], events: [] },
  { id: 'charles_dickens', name: '查尔斯·狄更斯', birth: 1812, death: 1870, cat: 'artist', emoji: '📚', desc: '英国维多利亚时代最伟大的小说家。代表作《雾都孤儿》《双城记》《圣诞颂歌》，以写实主义描绘底层人民的苦难。', achievements: ['《雾都孤儿》', '《双城记》', '写实主义大师'], relations: [], events: [] },
  { id: 'hugo', name: '维克多·雨果', birth: 1802, death: 1885, cat: 'artist', emoji: '📖', desc: '法国浪漫主义文学领袖。著《巴黎圣母院》《悲惨世界》《九三年》，以宏大叙事探索正义、人性和社会变革。流亡19年不改初心。', achievements: ['《悲惨世界》', '《巴黎圣母院》', '浪漫主义领袖'], relations: [], events: [] },
  { id: 'pasteur', name: '路易·巴斯德', birth: 1822, death: 1895, cat: 'scientist', emoji: '🧫', desc: '法国微生物学家、化学家。创立微生物学说，发明巴氏杀菌法，研制狂犬病疫苗。其贡献奠定了现代微生物学和免疫学的基础。', achievements: ['微生物学说', '巴氏杀菌法', '狂犬病疫苗'], relations: [], events: [] },
  { id: 'dostoevsky', name: '陀思妥耶夫斯基', birth: 1821, death: 1881, cat: 'artist', emoji: '🖋️', desc: '俄国文学巨匠。代表《罪与罚》《卡拉马佐夫兄弟》《白痴》，深入探索人性黑暗与救赎。尼采称其为"唯一对我有启发的心理学家"。', achievements: ['《罪与罚》', '《卡拉马佐夫兄弟》', '心理小说先驱'], relations: [], events: [] },
  { id: 'nietzsche', name: '弗里德里希·尼采', birth: 1844, death: 1900, cat: 'philosopher', emoji: '💥', desc: '德国哲学家。宣告"上帝已死"，提出超人哲学和权力意志。《查拉图斯特拉如是说》以诗意的语言彻底颠覆传统道德。', achievements: ['上帝已死', '超人哲学', '《查拉图斯特拉》'], relations: [], events: [] },
  { id: 'edison', name: '托马斯·爱迪生', birth: 1847, death: 1931, cat: 'inventor', emoji: '💡', desc: '美国发明家，一生拥有1093项专利。发明电灯、留声机、电影摄影机，建立世界第一个工业研究实验室，被誉为"门洛帕克的巫师"。', achievements: ['电灯', '留声机', '1093项专利', '工业实验室'], relations: [], events: [] },
  { id: 'bell', name: '亚历山大·贝尔', birth: 1847, death: 1922, cat: 'inventor', emoji: '📞', desc: '苏格兰裔美国发明家。获得电话发明专利，开创了现代通讯时代。还发明了光电电话和铁肺等。建立贝尔实验室。', achievements: ['发明电话', '贝尔实验室', '现代通讯先驱'], relations: [], events: [] },
  { id: 'freud', name: '西格蒙德·弗洛伊德', birth: 1856, death: 1939, cat: 'scientist', emoji: '🛋️', desc: '奥地利神经学家，精神分析学派创始人。提出潜意识和性本能理论，著《梦的解析》，彻底改变了人类对自身的认识。', achievements: ['精神分析学', '《梦的解析》', '潜意识理论'], relations: [], events: [] },
  { id: 'wright_brothers', name: '莱特兄弟', birth: 1871, death: 1948, cat: 'inventor', emoji: '✈️', desc: '美国航空先驱。1903年12月17日成功试飞人类第一架有动力飞机，飞行12秒36米。从此人类进入了飞行时代。', achievements: ['第一架飞机', '飞行先驱', '改变交通'], relations: [], events: [] },

// === 20世纪至今 ===
  { id: 'ford', name: '亨利·福特', birth: 1863, death: 1947, cat: 'inventor', emoji: '🚗', desc: '美国企业家，福特汽车创始人。发明流水线生产法，大幅降低汽车价格，使汽车走进千家万户。其"每天5美元工资"改革影响深远。', achievements: ['流水线生产', 'T型车', '5美元工资'], relations: [], events: [] },
  { id: 'orwell', name: '乔治·奥威尔', birth: 1903, death: 1950, cat: 'artist', emoji: '👁️', desc: '英国作家。著《1984》《动物庄园》，以寓言形式深刻揭露极权主义的危害。"老大哥在看着你"成为反极权的经典符号。', achievements: ['《1984》', '《动物庄园》', '反极权经典'], relations: [], events: [] },
  { id: 'crick_watson', name: '沃森与克里克', birth: 1928, death: 2025, cat: 'scientist', emoji: '🧬', desc: '詹姆斯·沃森与弗朗西斯·克里克1953年发现DNA双螺旋结构，揭开了生命遗传密码之谜。是20世纪生物学最重大的发现。', achievements: ['DNA双螺旋', '遗传密码', '诺贝尔奖'], relations: [], events: [] },
  { id: 'lennon', name: '约翰·列侬', birth: 1940, death: 1980, cat: 'artist', emoji: '🎸', desc: '英国音乐家，甲壳虫乐队（披头士）灵魂人物。以《Imagine》《Yesterday》等经典歌曲改变了现代流行音乐，倡导和平与爱。', achievements: ['甲壳虫乐队', '《Imagine》', '流行音乐革命'], relations: [], events: [] },
  { id: 'gates', name: '比尔·盖茨', birth: 1955, death: 2025, cat: 'inventor', emoji: '💻', desc: '美国企业家，微软公司创始人。将个人电脑操作系统普及全球，改变了人类工作和生活方式。后全力投入全球健康和气候慈善事业。', achievements: ['微软创始人', 'PC革命', '全球慈善'], relations: [], events: [] },

{ id: 'medici_cosimo', name: '科西莫·德·美第奇', birth: 1389, death: 1464, cat: 'politician', emoji: '🏦', desc: '美第奇家族奠基人。建立美第奇银行成为欧洲首富，以巨额财富赞助文艺复兴，支持布鲁内莱斯基建造圣母百花大教堂穹顶。', achievements: ['美第奇银行', '文艺复兴赞助'], relations: [], events: [] },
{ id: 'gutenberg', name: '约翰内斯·古滕堡', birth: 1400, death: 1468, cat: 'inventor', emoji: '🖨️', desc: '德国发明家。1439年发明活字印刷术，1455年印刷《古滕堡圣经》。印刷术的发明使知识以前所未有的速度传播，推动了宗教改革和文艺复兴。', achievements: ['活字印刷术', '古滕堡圣经', '知识革命'], relations: [], events: [] },
{ id: 'vasco_da_gama', name: '瓦斯科·达·伽马', birth: 1469, death: 1524, cat: 'diplomat', emoji: '⛵', desc: '葡萄牙航海家。1498年绕过好望角到达印度，开辟了欧洲至亚洲的海上航线。打破了阿拉伯和威尼斯对香料贸易的垄断。', achievements: ['开辟印度航线', '打破香料垄断'], relations: [], events: [] },
{ id: 'magellan', name: '费迪南德·麦哲伦', birth: 1480, death: 1521, cat: 'diplomat', emoji: '🌏', desc: '葡萄牙航海家。率西班牙舰队完成了人类历史上首次环球航行。麦哲伦本人在菲律宾被杀，但其船队最终证明了地圆说。', achievements: ['首次环球航行', '证明地圆说'], relations: [], events: [] },
{ id: 'luther', name: '马丁·路德', birth: 1483, death: 1546, cat: 'philosopher', emoji: '📜', desc: '德国神学家，宗教改革领袖。1517年发表《九十五条论纲》反对赎罪券，点燃了新教改革。将圣经译为德语，深刻改变了基督教世界。', achievements: ['九十五条论纲', '宗教改革', '德语圣经'], relations: [], events: ['e_protestant'] },
{ id: 'calvin', name: '约翰·加尔文', birth: 1509, death: 1564, cat: 'philosopher', emoji: '✝️', desc: '法国神学家，新教加尔文宗创始人。在日内瓦建立了神权共和国，其《基督教要义》系统阐述了预定论。加尔文主义深刻影响了西方资本主义精神。', achievements: ['加尔文宗', '基督教要义', '预定论'], relations: [], events: [] },
{ id: 'cervantes', name: '米格尔·德·塞万提斯', birth: 1547, death: 1616, cat: 'artist', emoji: '📖', desc: '西班牙文学巨匠。创作《堂吉诃德》，是世界文学史上第一部现代小说，以骑士的荒诞冒险讽刺没落的骑士制度，被誉为西方文学经典之巅。', achievements: ['堂吉诃德', '第一部现代小说'], relations: [], events: [] },
{ id: 'bacon_francis', name: '弗朗西斯·培根', birth: 1561, death: 1626, cat: 'scientist', emoji: '🔬', desc: '英国哲学家、科学家，现代科学方法之父。提出"知识就是力量"和归纳法，为科学革命奠定了方法论基础。在实验冷冻保鲜时受寒去世。', achievements: ['知识就是力量', '归纳法', '科学方法'], relations: [], events: [] },
{ id: 'kepler', name: '约翰内斯·开普勒', birth: 1571, death: 1630, cat: 'scientist', emoji: '🔭', desc: '德国天文学家、数学家。发现行星运动三大定律（椭圆轨道），精确描述了天体运行规律。其著作为牛顿万有引力理论提供了关键基础。', achievements: ['行星运动三大定律', '椭圆轨道'], relations: [], events: [] },
{ id: 'harvey', name: '威廉·哈维', birth: 1578, death: 1657, cat: 'scientist', emoji: '❤️', desc: '英国医生。1628年发表《心血运动论》，首次正确描述了血液循环系统，证明心脏像泵一样推动血液在全身循环。是现代生理学的奠基之作。', achievements: ['发现血液循环', '心血运动论'], relations: [], events: [] },
{ id: 'akbar', name: '阿克巴大帝', birth: 1542, death: 1605, cat: 'emperor', emoji: '🕌', desc: '莫卧儿帝国最伟大的皇帝。在位期间将帝国疆域扩张至几乎整个印度次大陆。推行宗教宽容政策，试图融合伊斯兰教、印度教等创建"神圣宗教"。', achievements: ['莫卧儿鼎盛', '宗教宽容', '神圣宗教'], relations: [], events: [] },
];


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

{ id: 'e_black_death', year: 1347, name: '黑死病大流行', type: 'economy', desc: '鼠疫席卷欧洲，约2500万人死亡（占欧洲人口三分之一）。深刻改变了欧洲社会结构，劳动力短缺加速了封建制度瓦解，推动了社会变革。' },
  { id: 'e_constantinople_fall', year: 1453, name: '君士坦丁堡陷落', type: 'war', desc: '奥斯曼帝国苏丹穆罕默德二世攻陷君士坦丁堡，东罗马帝国（拜占庭）灭亡。大量希腊学者携带古籍西逃，促进了意大利文艺复兴。' },
  { id: 'e_enlightenment', year: 1700, name: '启蒙运动', type: 'culture', desc: '18世纪欧洲思想解放运动。伏尔泰、卢梭、孟德斯鸠等思想家倡导理性、自由、平等，批判专制和教会权威，为法国大革命和美国独立提供了思想基础。' },
  { id: 'e_us_constitution', year: 1787, name: '美国宪法制定', type: 'politics', desc: '美国制宪会议在费城召开，制定世界上第一部成文宪法，确立三权分立和联邦制原则，成为现代民主宪政的典范。' },
  { id: 'e_communist_manifesto', year: 1848, name: '《共产党宣言》发表', type: 'politics', desc: '马克思和恩格斯发表《共产党宣言》，系统阐述了共产主义理论，提出全世界无产者联合起来的口号，深刻影响了世界历史进程。' },
  { id: 'e_darwin_evolution', year: 1859, name: '进化论发表', type: 'science', desc: '达尔文出版《物种起源》，提出以自然选择为核心的进化论，彻底改变了人类对生命起源和演化过程的认识。' },
  { id: 'e_great_depression', year: 1929, name: '世界经济大萧条', type: 'economy', desc: '纽约股市崩盘引发全球性经济危机，持续近十年。银行倒闭、工厂停工、大规模失业遍及全世界，促使各国加强经济干预。' },
  { id: 'e_marshall_plan', year: 1948, name: '马歇尔计划实施', type: 'economy', desc: '美国对战后欧洲提供大规模经济援助，总额约130亿美元。帮助西欧迅速复兴经济，同时遏制苏联影响力扩张。' },
  { id: 'e_genome', year: 2000, name: '人类基因组草图完成', type: 'science', desc: '美英日中德法六国科学家合作完成人类基因组测序草图，标志着生命科学研究进入了基因组时代。' },

{ id: 'e_pyramid_giza', year: -2560, name: '吉萨大金字塔建成', type: 'culture', desc: '古埃及第四王朝法老胡夫在吉萨建造了埃及最大的金字塔，高146米，动用10万劳工耗时20年。是世界七大奇迹中唯一仍存在的。' },
  { id: 'e_battle_troy', year: -1184, name: '特洛伊战争（传说）', type: 'war', desc: '希腊联军以木马计攻陷特洛伊城。荷马史诗《伊利亚特》和《奥德赛》以此为背景，是西方文学的源头。' },
  { id: 'e_first_olympics', year: -776, name: '第一届古代奥运会', type: 'culture', desc: '在希腊奥林匹亚举行第一届古代奥运会，最初仅有短跑一项比赛。此后每四年举办一次，延续近1200年。' },
  { id: 'e_rome_founded', year: -753, name: '罗马建城（传说）', type: 'politics', desc: '据传说，罗慕路斯和雷穆斯兄弟建立罗马城。罗慕路斯成为第一任国王，罗马日后发展为世界最强大帝国之一。' },
  { id: 'e_battle_marathon', year: -490, name: '马拉松战役', type: 'war', desc: '雅典以少胜多击败波斯帝国入侵。士兵菲迪皮德斯从马拉松跑到雅典报捷后力竭而亡，马拉松长跑由此得名。' },
  { id: 'e_peloponnesian_war', year: -431, name: '伯罗奔尼撒战争', type: 'war', desc: '雅典与斯巴达两大希腊城邦的全面战争，持续27年。以雅典战败告终，古典希腊文明从此衰落。' },
  { id: 'e_gaugamela', year: -331, name: '高加米拉战役', type: 'war', desc: '亚历山大大帝以4万兵力大败波斯帝国20万大军，灭亡波斯。是古代世界最经典的以少胜多战役之一。' },
  { id: 'e_hannibal', year: -218, name: '汉尼拔翻越阿尔卑斯山', type: 'war', desc: '迦太基统帅汉尼拔率军和大象翻越阿尔卑斯山奇袭罗马，发起第二次布匿战争，以坎尼围歼战震惊世界。' },
  { id: 'e_carthage_fall', year: -146, name: '迦太基灭亡', type: 'war', desc: '罗马在第三次布匿战争中彻底摧毁迦太基城，城中居民被屠或为奴。罗马从此确立了在地中海的绝对霸权。' },
  { id: 'e_spartacus', year: -73, name: '斯巴达克斯起义', type: 'war', desc: '角斗士斯巴达克斯率领奴隶起义，队伍壮大至12万人，震撼罗马共和国。起义被克拉苏镇压，6000人沿路被钉十字架。' },
  { id: 'e_pompeii', year: 79, name: '维苏威火山埋没庞贝', type: 'economy', desc: '维苏威火山爆发，将庞贝和赫库兰尼姆两座罗马城市完全埋没在火山灰下，保存了完整的古罗马生活场景。' },
  { id: 'e_huns_invasion', year: 451, name: '沙隆会战', type: 'war', desc: '匈奴王阿提拉与西罗马-西哥特联军在法国沙隆会战。双方伤亡惨重，阿提拉退却，匈奴帝国自此衰落。' },
  { id: 'e_islam_rise', year: 622, name: '伊斯兰教创立', type: 'culture', desc: '穆罕默德从麦加迁徙到麦地那（希吉来），伊斯兰教纪元开始。此后阿拉伯人在伊斯兰旗帜下迅速崛起。' },
  { id: 'e_charlemagne_crowned', year: 800, name: '查理曼加冕', type: 'politics', desc: '教皇利奥三世在罗马为查理曼加冕为罗马皇帝。标志着西欧从黑暗时代走出，神圣罗马帝国由此奠基。' },
  { id: 'e_viking_raids', year: 793, name: '维京时代开始', type: 'war', desc: '北欧维京人开始大规模劫掠欧洲沿海。此后三百年间维京人入侵、贸易和殖民遍布欧洲，建立了诺曼底、基辅罗斯等政权。' },
  { id: 'e_first_crusade', year: 1096, name: '第一次十字军东征', type: 'war', desc: '教皇乌尔班二世号召十字军远征耶路撒冷。1099年攻陷圣城，建立耶路撒冷王国等十字军国家。' },
  { id: 'e_magna_carta', year: 1215, name: '大宪章签署', type: 'politics', desc: '英国贵族迫使约翰王签署大宪章，限制王权，保障贵族自由。成为后世宪政民主的重要渊源。' },
  { id: 'e_hundred_years_war', year: 1337, name: '百年战争爆发', type: 'war', desc: '英法为争夺法国王位爆发长达116年的战争。最终法国获胜，民族意识觉醒。圣女贞德在此战中成为传奇。' },
  { id: 'e_gutenberg', year: 1440, name: '古滕堡发明印刷机', type: 'science', desc: '德国人古滕堡发明活字印刷术，首次大批量印刷《圣经》。知识传播速度暴增，推动了宗教改革和文艺复兴。' },
  { id: 'e_spanish_armada', year: 1588, name: '无敌舰队覆灭', type: 'war', desc: '西班牙无敌舰队远征英国遭遇惨败，130艘战船仅剩67艘回国。英国取代西班牙成为海上霸主。' },
  { id: 'e_30_years_war', year: 1618, name: '三十年战争', type: 'war', desc: '欧洲天主教与新教国家的大规模宗教战争。以《威斯特伐利亚和约》结束，确立了现代主权国家体系。' },
  { id: 'e_manhattan_project', year: 1945, name: '原子弹研制成功', type: 'science', desc: '美国曼哈顿计划成功研制原子弹并首次核试验（三位一体）。核武器时代诞生，深刻改变了战争和国际政治。' },
  { id: 'e_india_independence', year: 1947, name: '印度独立与印巴分治', type: 'politics', desc: '英国退出印度，印度和巴基斯坦分别独立。甘地的非暴力斗争最终实现目标，但分治造成百万死伤的人道灾难。' },
  { id: 'e_prc_founded', year: 1949, name: '中华人民共和国成立', type: 'politics', desc: '毛泽东在天安门城楼上宣告中华人民共和国成立。结束了百年动乱，中国进入了新的历史阶段。' },
  { id: 'e_eu_founded', year: 1993, name: '欧盟正式成立', type: 'politics', desc: '《马斯特里赫特条约》生效，欧洲联盟正式成立。单一市场和欧元统一了欧洲经济，实现了几百年来欧洲统一的理想。' },
  { id: 'e_911', year: 2001, name: '911恐怖袭击', type: 'war', desc: '基地组织劫持客机撞击纽约世贸中心和五角大楼，近3000人死亡。此后美国发动全球反恐战争，深刻影响21世纪国际格局。' },
  { id: 'e_covid', year: 2020, name: '新冠疫情全球大流行', type: 'economy', desc: '新冠病毒COVID-19席卷全球，造成数百万人死亡，世界经济遭受重创。深刻改变了人类的生活方式和工作模式。' },

{ id: 'e_fall_constantinople', year: 1453, name: '君士坦丁堡陷落', type: 'war', desc: '奥斯曼帝国攻陷君士坦丁堡，东罗马帝国灭亡。大量希腊学者携古籍逃往意大利，直接促进了文艺复兴。' },
{ id: 'e_reconquista', year: 1492, name: '收复失地运动完成', type: 'war', desc: '西班牙攻陷格拉纳达，结束了近800年的收复失地运动。同年哥伦布发现美洲，西班牙驱逐犹太人。' },
{ id: 'e_magellan_circumnavigation', year: 1522, name: '麦哲伦船队完成环球航行', type: 'science', desc: '麦哲伦船队中仅存的维多利亚号返回西班牙，完成人类首次环球航行。历时三年，出发时265人仅18人生还。' },
{ id: 'e_spanish_armada_battle', year: 1588, name: '打败西班牙无敌舰队', type: 'war', desc: '英国海军击败西班牙无敌舰队，打破了西班牙的海上霸权。英国开始崛起为海洋帝国，世界格局从此改变。' },
{ id: 'e_thirty_years_war', year: 1618, name: '三十年战争爆发', type: 'war', desc: '波希米亚新教徒起义引爆欧洲最惨烈的宗教战争。德意志各邦成为主战场，人口损失达三分之一。1648年《威斯特伐利亚和约》确立现代主权国家体系。' },
{ id: 'e_galileo_trial', year: 1633, name: '伽利略受审', type: 'culture', desc: '罗马教廷判处伽利略"有强烈异端嫌疑"，迫其放弃日心说。传说他以手拍地说"但它确实在动"。是科学与宗教冲突的象征。' },
];


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

{ id: 'ganjin', name: '鉴真', birth: 688, death: 763, cat: 'philosopher', emoji: '🛤️',
    desc: '唐代高僧，六次东渡日本，双目失明后终于抵达。在奈良建立唐招提寺，为日本传授戒律和唐代文化，被日本人民尊为日本律宗始祖。',
    achievements: ['六次东渡', '创建唐招提寺', '日本律宗始祖'], relations: [], events: [] },

  { id: 'saicho', name: '最澄', birth: 767, death: 822, cat: 'philosopher', emoji: '🕊️',
    desc: '日本天台宗创始人。随遣唐使入唐，在天台山学习天台教义。回国后在比叡山建立延历寺，开创日本天台宗，与空海并称为日本佛教两大基石。',
    achievements: ['创立天台宗', '延历寺', '日本佛教基石'], relations: [], events: [] },

  { id: 'sugawara_michizane', name: '菅原道真', birth: 845, death: 903, cat: 'scholar', emoji: '📜',
    desc: '日本平安时代学者、政治家。学问渊博，官至右大臣。因遭诬陷被贬九州，去世后被尊为天满大神（学问之神），每年考试季考生们纷纷祈福。',
    achievements: ['学问之神', '遣唐使建议', '右大臣'], relations: [], events: [] },

  { id: 'sei_shonagon', name: '清少纳言', birth: 966, death: 1025, cat: 'artist', emoji: '📓',
    desc: '日本平安时代女作家。仕奉中宫定子皇后，著有随笔文学杰作《枕草子》，与紫式部的《源氏物语》并称为日本古典文学双璧。',
    achievements: ['《枕草子》', '平安文学双璧'], relations: [], events: [] },

  { id: 'taira_masakado', name: '平将门', birth: 903, death: 940, cat: 'military', emoji: '🗡️',
    desc: '日本平安中期武士，自称新皇。在关东发动叛乱，占领坂东八国，是日本历史上第一个公开叛乱的武士。被讨伐后头颅被显示，传说其首级飞回家乡。',
    achievements: ['第一个叛乱武士', '占领坂东'], relations: [], events: [] },

  { id: 'sesshu', name: '雪舟', birth: 1420, death: 1506, cat: 'artist', emoji: '🌨️',
    desc: '日本室町时代水墨画大师。随遣明使入明朝，学习中国南宋水墨画技法。回国后融会贯通，创立日本水墨画流派，代表作《秋冬山水图》被列为国宝。',
    achievements: ['日本水墨画宗师', '《秋冬山水图》', '入明学画'], relations: [], events: [] },

  { id: 'takeda_shingen', name: '武田信玄', birth: 1521, death: 1573, cat: 'military', emoji: '🐉',
    desc: '日本战国时代名将，甲斐国大名，甲斐之虎。以精锐骑兵队威震东日本，川中岛合战与上杉谦信五度对峙不分上下。风林火山军旗为战国最强标志之一。',
    achievements: ['甲斐之虎', '骑兵精锐', '川中岛合战'],
    relations: [{ id: 'uesugi_kenshin', type: '宿敌', label: '上杉谦信' }], events: [] },

  { id: 'uesugi_kenshin', name: '上杉谦信', birth: 1530, death: 1578, cat: 'military', emoji: '🐉',
    desc: '日本战国时代名将，越后国大名，越后之龙。自称战神毗沙门天转世，以正义和仁义著称。川中岛合战与武田信玄势均力敌，是最受尊敬的战国大名。',
    achievements: ['越后之龙', '战神毗沙门天', '川中岛合战'],
    relations: [{ id: 'takeda_shingen', type: '宿敌', label: '武田信玄' }], events: [] },

  { id: 'matsuo_basho', name: '松尾芭蕉', birth: 1644, death: 1694, cat: 'artist', emoji: '🌸',
    desc: '日本江户时代俳人，被尊为俳圣。将俳句从游戏文学提升为严肃的艺术形式。代表作——古池——青蛙跳入水声——传颂世界，《奥之细道》是俳句经典。',
    achievements: ['俳圣', '《奥之细道》', '俳句艺术化'], relations: [], events: [] },

  { id: 'motoori_norinaga', name: '本居宣长', birth: 1730, death: 1801, cat: 'scholar', emoji: '📗',
    desc: '日本江户时代国学大师。花费四十年钻研《古事记》，著《古事记传》。强调日本文化的独特性，提出物哀美学理论，是日本民族主义思想的源头。',
    achievements: ['《古事记传》', '国学大师', '物哀美学'], relations: [], events: [] },

  { id: 'hokusai', name: '葛饰北斋', birth: 1760, death: 1849, cat: 'artist', emoji: '🌊',
    desc: '日本江户时代浮世绘大师。代表作《富岳三十六景》中的《神奈川冲浪里》是世界最著名的日本艺术作品，深刻影响了梵高、莫奈等印象派大师。',
    achievements: ['《富岳三十六景》', '浮世绘顶峰', '影响印象派'], relations: [], events: [] },

  { id: 'akutagawa', name: '芥川龙之介', birth: 1892, death: 1927, cat: 'artist', emoji: '📚',
    desc: '日本大正时代作家，日本短篇小说之王。代表作《罗生门》《鼻子》《地狱变》等，以冷峻的笔触揭示人性的黑暗。日本最高文学奖以其名字命名。',
    achievements: ['《罗生门》', '芥川奖', '短篇小说之王'], relations: [], events: [] },

  { id: 'kurosawa', name: '黑泽明', birth: 1910, death: 1998, cat: 'artist', emoji: '🎥',
    desc: '日本电影导演，世界电影史上最伟大的导演之一。代表作《罗生门》《七武士》《乱》《影武者》，将日本文化推向世界。获奥斯卡终身成就奖。',
    achievements: ['《七武士》', '《罗生门》', '奥斯卡终身成就奖'], relations: [], events: [] },

  { id: 'kawabata', name: '川端康成', birth: 1899, death: 1972, cat: 'artist', emoji: '🏆',
    desc: '日本作家，首位获得诺贝尔文学奖的日本人。代表作《雪国》《千只鹤》《伊豆的舞女》，以精美美学和日本传统文化享誉世界。',
    achievements: ['诺贝尔文学奖', '《雪国》', '《千只鹤》'], relations: [], events: [] },

// === 古坟·飞鸟 ===
  { id: 'jimmu', name: '神武天皇', birth: -711, death: -585, cat: 'emperor', emoji: '👑', desc: '日本神话中第一代天皇，据《日本书纪》记载于公元前660年即位，被视为日本建国之祖。', achievements: ['日本建国之祖', '第一代天皇'], relations: [], events: [] },
  { id: 'haniwa', name: '卑弥呼', birth: 170, death: 248, cat: 'emperor', emoji: '🔮', desc: '日本弥生时代邪马台国女王。以巫术统治三十余国，曾遣使至魏，受封亲魏倭王。是日本最早有文字记载的统治者。', achievements: ['邪马台国女王', '遣使至魏', '亲魏倭王'], relations: [], events: [] },
  { id: 'yuryaku', name: '雄略天皇', birth: 418, death: 479, cat: 'emperor', emoji: '👑', desc: '日本第21代天皇。积极推动与中国南朝的外交，引入大陆先进技术和文化。留下多首和歌，被认为是《万叶集》最早的和歌作者之一。', achievements: ['对宋外交', '引入大陆文化', '最早和歌作者'], relations: [], events: [] },
  { id: 'soga_iruka', name: '苏我入鹿', birth: 610, death: 645, cat: 'politician', emoji: '🏛️', desc: '飞鸟时代权臣。继承父业垄断朝政，排挤圣德太子之子山背大兄王。在乙巳之变中被中大兄皇子刺杀，苏我氏势力覆灭。', achievements: ['垄断朝政', '苏我氏最后的掌权者'], relations: [], events: ['e_taika_reform'] },
  { id: 'nakatomi_katamari', name: '中臣镰足', birth: 614, death: 669, cat: 'politician', emoji: '🏛️', desc: '飞鸟时代政治家。与中大兄皇子联合发动乙巳之变，消灭苏我氏后主导大化改新。被赐姓藤原，是日本最显赫贵族藤原氏之祖。', achievements: ['发动乙巳之变', '大化改新', '藤原氏始祖'], relations: [], events: ['e_taika_reform'] },
  { id: 'emperor_tenmu', name: '天武天皇', birth: 631, death: 686, cat: 'emperor', emoji: '👑', desc: '日本第40代天皇。壬申之乱中击败大友皇子即位。推行律令制度，下令编撰《古事记》，确立天皇为神的权威。', achievements: ['壬申之乱胜利', '颁布律令', '编撰古事记'], relations: [], events: ['e_jinshin_war'] },
  { id: 'jito_tenno', name: '持统天皇', birth: 645, death: 703, cat: 'emperor', emoji: '👑', desc: '日本第41代天皇，天武天皇之妻。继承丈夫事业，完成《大宝律令》的制定，迁都藤原京，是日本最早的正规都城。', achievements: ['完成大宝律令', '迁都藤原京'], relations: [], events: [] },

// === 奈良 ===
  { id: 'gyoki', name: '行基', birth: 668, death: 749, cat: 'philosopher', emoji: '🙏', desc: '奈良时代高僧。走遍日本各地修桥铺路、开垦农田、救济贫民，被尊为行基菩萨。为建造东大寺大佛奔走募化，被任命为大僧正。', achievements: ['社会救济', '东大寺大佛', '大僧正'], relations: [], events: ['e_nara_daibutsu'] },
  { id: 'emperor_shomu', name: '圣武天皇', birth: 701, death: 756, cat: 'emperor', emoji: '👑', desc: '日本第45代天皇。笃信佛教，下令各国建国分寺，铸造奈良东大寺大佛。建立正仓院收藏珍宝，是日本天平文化的鼎盛时期。', achievements: ['建立国分寺', '东大寺大佛', '正仓院'], relations: [], events: ['e_nara_daibutsu'] },
  { id: 'otomo_yakamochi', name: '大伴家持', birth: 718, death: 785, cat: 'artist', emoji: '📜', desc: '奈良时代歌人，《万叶集》主要编者。收录了约4500首和歌，涵盖从天皇到庶民的各阶层作品，是日本最古老的和歌总集。', achievements: ['编纂万叶集', '4500首和歌'], relations: [], events: [] },
  { id: 'abe_nakamaro', name: '阿倍仲麻吕', birth: 698, death: 770, cat: 'scholar', emoji: '🎓', desc: '奈良时代遣唐留学生。19岁入唐，考中进士，在唐朝为官数十年，与李白、王维等交往。最终未能返回日本，客死长安。', achievements: ['入唐为官', '结交李白王维', '遣唐留学生典范'], relations: [], events: [] },

// === 平安 ===
  { id: 'fujiwara_michinaga', name: '藤原道长', birth: 966, death: 1028, cat: 'politician', emoji: '🏛️', desc: '平安时代最有权势的藤原氏摄关。三个女儿分别成为皇后，外孙接连成为天皇。自称"此世即我世，如满月无缺"。', achievements: ['摄关政治顶峰', '望月之歌', '藤原氏极盛'], relations: [], events: [] },
  { id: 'minamoto_yorimitsu', name: '源赖光', birth: 948, death: 1021, cat: 'military', emoji: '⚔️', desc: '平安中期武将。以退治妖怪的传说闻名，率赖光四天王消灭酒吞童子、土蜘蛛等。是源氏武士团崛起的关键人物。', achievements: ['退治酒吞童子', '赖光四天王', '源氏武士团'], relations: [], events: [] },
  { id: 'taira_tadamori', name: '平忠盛', birth: 1096, death: 1153, cat: 'military', emoji: '⚔️', desc: '平安后期武将。首次以武士身份被允许上殿觐见天皇，开创了武士进入朝廷核心的先例。其子平清盛更是建立了平氏政权。', achievements: ['武士上殿', '平氏崛起奠基'], relations: [], events: [] },
  { id: 'emperor_goshirakawa', name: '后白河天皇', birth: 1127, death: 1192, cat: 'emperor', emoji: '👑', desc: '日本第77代天皇。退位后以上皇身份掌控朝政，编撰《梁尘秘抄》。在保元、平治之乱中利用武士力量，间接推动了武士政权的兴起。', achievements: ['《梁尘秘抄》', '保元平治之乱'], relations: [], events: [] },
  { id: 'kamo_chomei', name: '鸭长明', birth: 1155, death: 1216, cat: 'artist', emoji: '🏚️', desc: '平安末期至镰仓初期的随笔家、歌人。因失意出家隐居，著《方丈记》，以优美文笔记述人生无常与自然灾害，是日本隐逸文学代表作。', achievements: ['《方丈记》', '隐逸文学', '随笔经典'], relations: [], events: [] },

// === 镰仓 ===
  { id: 'minamoto_sanetomo', name: '源实朝', birth: 1192, death: 1219, cat: 'emperor', emoji: '👑', desc: '镰仓幕府第三代将军。酷爱和歌，师从藤原定家，著有《金槐和歌集》。后被其侄公晓刺杀，源氏将军世系断绝。', achievements: ['金槐和歌集', '源氏末代将军'], relations: [], events: [] },
  { id: 'hojo_yasutoki', name: '北条泰时', birth: 1183, death: 1242, cat: 'politician', emoji: '⚖️', desc: '镰仓幕府第三代执权。制定《御成败式目》（贞永式目），是日本第一部武家法典，奠定了武家社会的基本法律框架。', achievements: ['制定御成败式目', '第一部武家法典'], relations: [], events: [] },
  { id: 'shinran', name: '亲鸾', birth: 1173, death: 1263, cat: 'philosopher', emoji: '🙏', desc: '镰仓时代僧侣，净土真宗创始人。主张"恶人正机说"——越是罪人越需要阿弥陀佛的救赎。其思想深刻影响了日本佛教的平民化。', achievements: ['创立净土真宗', '恶人正机说', '佛教平民化'], relations: [], events: [] },
  { id: 'dogen', name: '道元', birth: 1200, death: 1253, cat: 'philosopher', emoji: '🧘', desc: '镰仓时代僧侣，日本曹洞宗创始人。入宋学习禅宗后回国，在永平寺开山。著《正法眼藏》，是日本禅宗最重要的哲学著作。', achievements: ['创立曹洞宗', '《正法眼藏》', '永平寺开山'], relations: [], events: [] },
  { id: 'nichiren', name: '日莲', birth: 1222, death: 1282, cat: 'philosopher', emoji: '☀️', desc: '镰仓时代僧侣，日莲宗（法华宗）创始人。主张"南无妙法莲华经"的唱题修行，激烈批判其他佛教宗派，多次遭流放而信念不改。', achievements: ['创立日莲宗', '唱题修行'], relations: [], events: [] },

// === 室町 ===
  { id: 'ashikaga_yoshimitsu', name: '足利义满', birth: 1358, death: 1408, cat: 'emperor', emoji: '🏯', desc: '室町幕府第三代将军。建造金阁寺，统一南北朝，受明朝封为日本国王开展勘合贸易。其奢华的北山文化标志着室町鼎盛。', achievements: ['建造金阁寺', '统一南北朝', '勘合贸易', '北山文化'], relations: [], events: ['e_nanboku_union'] },
  { id: 'ashikaga_yoshimasa', name: '足利义政', birth: 1436, death: 1490, cat: 'emperor', emoji: '🏯', desc: '室町幕府第八代将军。建造银阁寺，开创东山文化（茶道、花道、能乐等）。但无力平息应仁之乱，幕府权威从此崩溃。', achievements: ['建造银阁寺', '东山文化', '银阁寺'], relations: [], events: ['e_onin_war'] },
  { id: 'zeami', name: '世阿弥', birth: 1363, death: 1443, cat: 'artist', emoji: '🎭', desc: '日本能乐集大成者。将能乐提升为高度艺术化的综合表演艺术，著《风姿花传》，提出"幽玄""物真似"等美学理论，影响日本艺术深远。', achievements: ['能乐集大成', '《风姿花传》', '幽玄美学'], relations: [], events: [] },

// === 战国·安土桃山 ===
  { id: 'hojo_soun', name: '北条早云', birth: 1432, death: 1519, cat: 'military', emoji: '⚔️', desc: '战国时代先驱。从一介浪人起家，夺取伊豆和相模，成为战国大名。以优秀的民政和税制改革著称，被后人尊为"战国大名第一人"。', achievements: ['战国大名先驱', '伊豆相模攻略', '民政改革'], relations: [], events: [] },
  { id: 'imagawa_yoshimoto', name: '今川义元', birth: 1519, death: 1560, cat: 'military', emoji: '⚔️', desc: '战国大名，骏河、远江、三河三国守护。以强大的军事力量图谋上洛，在桶狭间遭遇织田信长奇袭身亡，改变了战国格局。', achievements: ['骏远三三国守护', '图谋上洛'], relations: [{ id: 'oda_nobunaga', type: '敌对', label: '织田信长' }], events: [] },
  { id: 'sanada_yukimura', name: '真田幸村', birth: 1567, death: 1615, cat: 'military', emoji: '⚔️', desc: '安土桃山时代武将，被誉为"日本第一兵"。大阪夏之阵中率少数兵力突入德川家康本阵，差点斩杀家康。其勇猛传为佳话。', achievements: ['日本第一兵', '大阪夏之阵', '突入家康本阵'], relations: [], events: [] },
  { id: 'date_masamune', name: '伊达政宗', birth: 1567, death: 1636, cat: 'military', emoji: '🌙', desc: '战国至江户初期大名，仙台藩始祖。因独眼被称为"独眼龙"。在关原之战支持德川家康，奠定了仙台62万石的基业。', achievements: ['独眼龙', '仙台藩始祖', '62万石大名'], relations: [], events: ['e_sekigahara'] },
  { id: 'ishida_mitsunari', name: '石田三成', birth: 1560, death: 1600, cat: 'politician', emoji: '🏛️', desc: '安土桃山时代武将。丰臣秀吉心腹，秀吉死后领导西军在关原之战对抗德川家康。战败被斩首，但忠义之名流芳后世。', achievements: ['丰臣政权核心', '关原西军总大将', '忠义典范'], relations: [{ id: 'tokugawa_ieyasu', type: '敌对', label: '德川家康' }], events: ['e_sekigahara'] },

// === 江户 ===
  { id: 'tokugawa_iemitsu', name: '德川家光', birth: 1604, death: 1651, cat: 'emperor', emoji: '🏯', desc: '江户幕府第三代将军。确立参勤交代制度，完善幕府体制，彻底完成锁国。名君稳住了德川260年的基业。', achievements: ['参勤交代', '完善幕府', '彻底锁国'], relations: [], events: ['e_sakoku'] },
  { id: 'arai_hakuseki', name: '新井白石', birth: 1657, death: 1725, cat: 'scholar', emoji: '📚', desc: '江户中期儒学者、政治家。辅佐第六代将军德川家宣，推行正德之治。著《西洋纪闻》《藩翰谱》等，是日本最博学的儒者之一。', achievements: ['正德之治', '《西洋纪闻》', '博学儒者'], relations: [], events: [] },
  { id: 'yoshimune', name: '德川吉宗', birth: 1684, death: 1751, cat: 'emperor', emoji: '🏯', desc: '江户幕府第八代将军。推行享保改革，重建幕府财政，奖励实学，解除洋书禁令（除基督教相关），被誉为江户中兴之祖。', achievements: ['享保改革', '重建财政', '解除洋书禁令', '江户中兴之祖'], relations: [], events: [] },
  { id: 'ogata_korin', name: '尾形光琳', birth: 1658, death: 1716, cat: 'artist', emoji: '🎨', desc: '江户中期画家，琳派集大成者。代表作《红白梅图屏风》《燕子花图屏风》以大胆的构图和装饰性风格著称，对后世日本美术影响深远。', achievements: ['琳派集大成', '《红白梅图》', '装饰美术'], relations: [], events: [] },
  { id: 'chikamatsu', name: '近松门左卫门', birth: 1653, death: 1725, cat: 'artist', emoji: '🎭', desc: '江户时代最伟大的净琉璃和歌舞伎剧本作家。创作了100多部作品，《曾根崎心中》《国性爷合战》等以深刻的人性描写被誉为"日本的莎士比亚"。', achievements: ['100多部剧本', '《曾根崎心中》', '日本的莎士比亚'], relations: [], events: [] },
  { id: 'yosa_buson', name: '与谢芜村', birth: 1716, death: 1784, cat: 'artist', emoji: '🖌️', desc: '江户中期俳人与画家。诗画双绝，其俳句与芭蕉齐名（芭蕉为"俳圣"，芜村为"俳仙"），同时是日本南画（文人画）的代表画家。', achievements: ['俳仙', '南画代表', '诗画双绝'], relations: [], events: [] },
  { id: 'kobayashi_issa', name: '小林一茶', birth: 1763, death: 1828, cat: 'artist', emoji: '🕯️', desc: '江户后期俳人。一生坎坷，作品以朴素真挚的情感打动人心。俳句名作"露の世は露の世ながらさりながら"道尽人生无奈。', achievements: ['俳句大家', '朴素真挚'], relations: [], events: [] },
  { id: 'ninomiya_sontoku', name: '二宫尊德', birth: 1787, death: 1856, cat: 'philosopher', emoji: '📖', desc: '江户后期农政家、思想家。以"报德思想"著称，提倡勤俭、勤劳和互助，成功复兴了600多个贫困村庄。其精神影响了日本近代道德教育。', achievements: ['报德思想', '复兴600村庄', '勤俭互助'], relations: [], events: [] },
  { id: 'yoshida_shoin', name: '吉田松阴', birth: 1830, death: 1859, cat: 'philosopher', emoji: '🔥', desc: '江户末期思想家、教育家。开办松下村塾，培养了木户孝允、伊藤博文等维新核心人物。因策划倒幕被处死，但其思想点燃了明治维新。', achievements: ['松下村塾', '培养维新志士', '倒幕思想先驱'], relations: [{ id: 'ito_hirobumi', type: '师生', label: '伊藤博文' }], events: ['e_meiji_restoration'] },

// === 现代 ===
  { id: 'noguchi_hideyo', name: '野口英世', birth: 1876, death: 1928, cat: 'scientist', emoji: '🔬', desc: '日本细菌学家。出身贫寒，左手烧伤，以惊人毅力成为世界级科学家。发现梅毒螺旋体，研究黄热病时在非洲感染去世。头像印于1000日元纸币。', achievements: ['发现梅毒螺旋体', '黄热病研究', '千元纸币头像'], relations: [], events: [] },
  { id: 'mishima_yukio', name: '三岛由纪夫', birth: 1925, death: 1970, cat: 'artist', emoji: '✍️', desc: '日本战后文学巨匠。代表作《金阁寺》《潮骚》《丰饶之海》四部曲。追求美学与武士道精神，1970年在自卫队驻地切腹殉道，震惊世界。', achievements: ['《金阁寺》', '《丰饶之海》', '诺贝尔奖提名'], relations: [], events: [] },
  { id: 'tezuka_osamu', name: '手冢治虫', birth: 1928, death: 1989, cat: 'artist', emoji: '🤖', desc: '日本漫画家、动画制作人，“漫画之神”。创作了《铁臂阿童木》《火鸟》《怪医黑杰克》等700部作品，奠定了现代日本漫画和动画的基础。', achievements: ['漫画之神', '《铁臂阿童木》', '700部作品'], relations: [], events: [] },
  { id: 'oda_eiichiro', name: '大江健三郎', birth: 1935, death: 2023, cat: 'artist', emoji: '📕', desc: '日本作家，第二位获得诺贝尔文学奖的日本人。作品以战后日本的创伤和人性的挣扎为主题，代表作《个人的体验》《万延元年的足球队》。', achievements: ['诺贝尔文学奖', '《个人的体验》'], relations: [], events: [] },
  { id: 'suzuki_ichiro', name: '铃木一朗', birth: 1973, death: 2025, cat: 'scientist', emoji: '⚾', desc: '日本棒球运动员，MLB单赛季安打纪录保持者(262支)。以独特的钟摆打法征服美日棒球界，是亚洲运动员在世界体育界的标杆。', achievements: ['MLB安打纪录', '钟摆打法', '亚洲体育标杆'], relations: [], events: [] },
  { id: 'miyazaki_hayao', name: '宫崎骏', birth: 1941, death: 2025, cat: 'artist', emoji: '🐉', desc: '日本动画导演，吉卜力工作室创始人。执导《千与千寻》《龙猫》《幽灵公主》《天空之城》等动画经典，获奥斯卡终身成就奖。', achievements: ['《千与千寻》', '吉卜力工作室', '奥斯卡终身成就奖'], relations: [], events: [] },

// 室町·战国名将
{ id: 'hosokawa_katsumoto', name: '细川胜元', birth: 1430, death: 1473, cat: 'military', emoji: '⚔️', desc: '室町幕府管领，东军总大将。应仁之乱中与山名宗全对峙，京都化为焦土。乱中病逝，战争却持续了11年。', achievements: ['东军总大将', '应仁之乱'], relations: [], events: ['e_onin_war'] },
{ id: 'yamana_sozen', name: '山名宗全', birth: 1404, death: 1473, cat: 'military', emoji: '⚔️', desc: '室町幕府重臣，西军总大将。领有六国，人称"六分一众"。与细川胜元在应仁之乱中互为死敌。', achievements: ['西军总大将', '六分一众'], relations: [], events: ['e_onin_war'] },
{ id: 'mori_motonari', name: '毛利元就', birth: 1497, death: 1571, cat: 'military', emoji: '🏯', desc: '战国大名，中国地方霸主。以智谋著称，"三矢之训"教导三个儿子团结——一支箭易折，三支箭难断。从安艺小豪族发展为中国十国霸主。', achievements: ['三矢之训', '中国十国霸主', '智将'], relations: [], events: [] },
{ id: 'shimazu_yoshihiro', name: '岛津义弘', birth: 1535, death: 1619, cat: 'military', emoji: '⚔️', desc: '战国九州大名，萨摩岛津氏当主。关原之战中率1500人从东军数万包围中成功突围（岛津之退口），被誉为战国最强武士。', achievements: ['岛津之退口', '战国最强'], relations: [], events: ['e_sekigahara'] },
{ id: 'honda_tadakatsu', name: '本多忠胜', birth: 1548, death: 1610, cat: 'military', emoji: '🗡️', desc: '德川家康麾下第一猛将，德川四天王之首。一生参战57次从未受伤，被丰臣秀吉称赞为"日本第一勇士"。头盔饰有鹿角，威名远扬。', achievements: ['57战无伤', '德川四天王', '日本第一勇士'], relations: [], events: [] },
{ id: 'ii_naomasa', name: '井伊直政', birth: 1561, death: 1602, cat: 'military', emoji: '⚔️', desc: '德川四天王之一，"赤鬼"。关原之战中率先冲锋，身负重伤仍坚持追击。其率领的井伊赤备队是战国最精锐的骑兵之一。', achievements: ['德川四天王', '赤鬼', '赤备队'], relations: [], events: ['e_sekigahara'] },
{ id: 'chosokabe_motochika', name: '长宗我部元亲', birth: 1539, death: 1599, cat: 'military', emoji: '🏯', desc: '四国大名，统一四国全岛。以一领具足制度武装农民，从土佐小国崛起为四国霸主。后在丰臣秀吉征伐下屈膝。', achievements: ['统一四国', '一领具足'], relations: [], events: [] },
{ id: 'amakusa_shiro', name: '天草四郎', birth: 1621, death: 1638, cat: 'military', emoji: '✝️', desc: '岛原之乱的少年领袖。年仅16岁率领37000名基督徒和农民起义，对抗幕府12万大军。起义失败后壮烈牺牲，是信仰自由的象征。', achievements: ['岛原起义领袖', '信仰自由象征'], relations: [], events: ['e_shimabara'] },
{ id: 'izumo_okuni', name: '出云阿国', birth: 1572, death: 1613, cat: 'artist', emoji: '💃', desc: '歌舞伎的创始人。在京都四条河原表演新奇的歌舞，风靡全城。歌舞伎从街头表演逐渐发展为日本最代表性的传统戏剧。', achievements: ['创造歌舞伎', '日本传统戏剧之母'], relations: [], events: [] },
{ id: 'honami_koetsu', name: '本阿弥光悦', birth: 1558, death: 1637, cat: 'artist', emoji: '🎨', desc: '江户初期艺术家，琳派奠基人。精通书法、陶艺、漆艺、茶道。在京都鹰峰创建艺术村光悦村，是日本综合艺术的先驱。', achievements: ['琳派奠基', '光悦村', '综合艺术'], relations: [], events: [] },
{ id: 'tawaraya_sotatsu', name: '俵屋宗达', birth: 1570, death: 1643, cat: 'artist', emoji: '🖼️', desc: '江户初期画家，琳派创始人之一。与光悦合作创造了独特的装饰画风。代表作《风神雷神图屏风》是日本国宝级艺术品。', achievements: ['琳派创始人', '风神雷神图'], relations: [], events: [] },
{ id: 'kano_eitoku', name: '狩野永德', birth: 1543, death: 1590, cat: 'artist', emoji: '🏯', desc: '安土桃山时代最具影响力的画家。为织田信长的安土城和丰臣秀吉的大阪城绘制障壁画，以金碧辉煌的浓绘风格开创了桃山美术的黄金时代。', achievements: ['桃山美术代表', '安土城障壁画', '狩野派黄金时代'], relations: [], events: [] },
];


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

{ id: 'e_battle_baekgang', year: 663, name: '白村江之战', type: 'war', desc: '唐朝与新罗联军在白村江（今韩国锦江）击败日本与百济联军，是中日历史上首次大规模军事冲突。日本惨败后退守本土，全面学习唐朝制度。', dynasty: '飞鸟' },
  { id: 'e_nara_daibutsu', year: 752, name: '奈良大佛开眼', type: 'culture', desc: '东大寺卢舍那大佛（奈良大佛）举行开眼供养仪式，是日本佛教文化鼎盛的象征。大佛高约15米，是日本最大的青铜佛像。', dynasty: '奈良' },
  { id: 'e_masakado_rebellion', year: 940, name: '平将门之乱', type: 'war', desc: '平将门在关东发动叛乱，自称新皇。朝廷派遣藤原忠文讨伐，将门战死。这是日本历史上第一个公开反叛朝廷的武士。', dynasty: '平安' },
  { id: 'e_nanboku_union', year: 1392, name: '南北朝统一', type: 'politics', desc: '室町幕府第三代将军足利义满促成南朝与北朝和解，结束了长达56年的南北朝分裂局面。义满受封为日本国王，与明朝建立勘合贸易。', dynasty: '室町' },
  { id: 'e_shimabara', year: 1637, name: '岛原之乱', type: 'war', desc: '九州岛原和天草地区基督徒和农民联合起义，反抗幕府高压和重税。起义被镇压后，德川幕府彻底禁止基督教，锁国政策进一步强化。', dynasty: '江户' },
  { id: 'e_abolish_domains', year: 1871, name: '废藩置县', type: 'politics', desc: '明治政府废除全国的藩，设立县，将地方权力收归中央。这标志着日本从封建制度彻底转向中央集权的近代国家体制。', dynasty: '明治' },
  { id: 'e_tokyo_olympic', year: 1964, name: '东京奥运会', type: 'culture', desc: '亚洲首次举办奥运会，标志日本战后经济奇迹的巅峰。东海道新干线在奥运会前通车，日本向世界展示了其现代化成就。', dynasty: '昭和' },
  { id: 'e_bubble_burst', year: 1990, name: '泡沫经济崩溃', type: 'economy', desc: '日本股市和房地产泡沫破裂，日经指数暴跌，银行坏账堆积如山。日本经济陷入长期低迷的失去的三十年。', dynasty: '平成' },

{ id: 'e_jimmu_ascension', year: -660, name: '神武天皇即位', type: 'politics', desc: '据《日本书纪》记载，神武天皇在大和橿原宫即位，被视为日本建国之始。', dynasty: '神话' },
  { id: 'e_himiko_mission', year: 239, name: '卑弥呼遣使至魏', type: 'politics', desc: '邪马台国女王卑弥呼派遣使节至曹魏，被授予亲魏倭王称号和金印。是中日官方交流的最早记录。', dynasty: '弥生' },
  { id: 'e_buddhism_japan', year: 538, name: '佛教传入日本', type: 'culture', desc: '百济圣王派遣使节向日本钦明天皇赠送佛像和佛经。佛教由此传入日本，深刻改变了日本文化。', dynasty: '飞鸟' },
  { id: 'e_heijo_kyo', year: 710, name: '平城京迁都', type: 'politics', desc: '元明天皇迁都平城京（奈良），仿唐长安城规划建造。标志着奈良时代的开始，日本大规模吸收唐文化。', dynasty: '奈良' },
  { id: 'e_kokin_wakashu', year: 905, name: '《古今和歌集》编成', type: 'culture', desc: '醍醐天皇敕令纪贯之等编纂日本第一部敕撰和歌集，标志和歌成为一种正式的宫廷文学体裁。', dynasty: '平安' },
  { id: 'e_taira_no_masakado', year: 940, name: '平将门之乱', type: 'war', desc: '平将门在关东自称新皇，反叛朝廷。藤原忠文奉命讨伐，将门战死。是首个公开叛乱的武士。', dynasty: '平安' },
  { id: 'e_heiji_rebellion', year: 1160, name: '平治之乱', type: 'war', desc: '源义朝与平清盛两大武士集团在京都激战。平氏获胜，源义朝被杀，源赖朝被流放。', dynasty: '平安' },
  { id: 'e_heike_monogatari', year: 1230, name: '《平家物语》成书', type: 'culture', desc: '记述源平合战的军记物语问世。以"诸行无常"开篇，琵琶法师传唱，成为日本最具影响力的文学经典之一。', dynasty: '镰仓' },
  { id: 'e_mongol_invasion2', year: 1281, name: '元军第二次入侵(弘安之役)', type: 'war', desc: '忽必烈再度派遣14万大军东征日本。北条时宗领导抵抗，元军遭遇台风惨败，日本称神风佑国。', dynasty: '镰仓' },
  { id: 'e_kemmu_restoration', year: 1333, name: '建武新政', type: 'politics', desc: '后醍醐天皇推翻镰仓幕府，恢复天皇亲政。但新政偏袒贵族，迅速失去武士支持，三年后崩溃。', dynasty: '镰仓' },
  { id: 'e_kinkakuji', year: 1397, name: '金阁寺建成', type: 'culture', desc: '足利义满在京都北山建造金阁寺（鹿苑寺），全身贴以金箔，北山文化的象征。', dynasty: '室町' },
  { id: 'e_ginkakuji', year: 1490, name: '银阁寺建成', type: 'culture', desc: '足利义政在京都东山建造银阁寺（慈照寺），东山文化的象征，虽未贴银箔但美学价值极高。', dynasty: '室町' },
  { id: 'e_nobunaga_kyoto', year: 1568, name: '织田信长上洛', type: 'politics', desc: '织田信长拥立足利义昭进京，掌握中央政权。开始"天下布武"的统一大业。', dynasty: '安土桃山' },
  { id: 'e_nagashino', year: 1575, name: '长篠之战', type: 'war', desc: '织田信长与德川家康联军用铁炮三段击战术大败武田胜赖骑兵，宣告骑兵时代的终结，铁炮时代来临。', dynasty: '安土桃山' },
  { id: 'e_azuchi_castle', year: 1579, name: '安土城竣工', type: 'culture', desc: '织田信长在琵琶湖畔建造七层安土城。融合城堡与宫殿功能，是日本城郭建筑史上的里程碑。', dynasty: '安土桃山' },
  { id: 'e_taiko_kenchi', year: 1591, name: '太阁检地实施', type: 'economy', desc: '丰臣秀吉在全国范围实行土地丈量，统一度量标准，确定年贡额。奠定了近世幕藩体制的经济基础。', dynasty: '安土桃山' },
  { id: 'e_tokugawa_iemitsu_sankin', year: 1635, name: '参勤交代制度化', type: 'politics', desc: '德川家光将参勤交代定为全国大名必须履行的义务。既削弱大名财力，又促进各地交通和文化交流。', dynasty: '江户' },
  { id: 'e_genroku', year: 1688, name: '元禄文化繁荣', type: 'culture', desc: '以大阪和京都为中心的城市文化繁荣期。井原西鹤的浮世草子、近松门左卫门的戏剧、松尾芭蕉的俳句达到顶峰。', dynasty: '江户' },
  { id: 'e_kyoho_reform', year: 1721, name: '享保改革', type: 'economy', desc: '第八代将军德川吉宗推行财政改革：开源节流、振兴农业、奖励实学。成功重建了濒临破产的幕府财政。', dynasty: '江户' },
  { id: 'e_tenmei_famine', year: 1783, name: '天明大饥荒', type: 'economy', desc: '日本史上最严重的饥荒之一。火山灰遮天，全国歉收，饿殍遍野。幕府统治力严重削弱，为后来的倒幕埋下伏笔。', dynasty: '江户' },
  { id: 'e_kansei_reform', year: 1790, name: '宽政改革', type: 'politics', desc: '松平定信推行紧缩改革，禁奢侈、抑商业、重整农业。同时禁异学，确立朱子学为官方意识形态。', dynasty: '江户' },
  { id: 'e_nagasaki_studies', year: 1774, name: '《解体新书》出版', type: 'science', desc: '杉田玄白和前野良泽将荷兰解剖学著作译成日文出版，标志着日本兰学（西学）的开端。', dynasty: '江户' },
  { id: 'e_tempo_reform', year: 1841, name: '天保改革', type: 'politics', desc: '水野忠邦推行的最后一次幕府改革。解散垄断行会、限制奢侈，但触动多方利益而失败，幕府威信进一步下降。', dynasty: '江户' },
  { id: 'e_boshin_war', year: 1868, name: '戊辰战争', type: 'war', desc: '明治新政府军与会津等旧幕府势力之间的内战。经鸟羽伏见之战、上野战争等，新政府取得全面胜利。', dynasty: '明治' },
  { id: 'e_iwakura_mission', year: 1871, name: '岩仓使节团出访', type: 'politics', desc: '以岩仓具视为首的大规模使节团考察欧美12国，历时近两年。回国后以欧美经验推动日本的全面近代化。', dynasty: '明治' },
  { id: 'e_land_tax_reform', year: 1873, name: '地租改正', type: 'economy', desc: '明治政府改革土地制度，确立私有产权，以货币定额纳税。为工业化提供了稳定的财政收入基础。', dynasty: '明治' },
  { id: 'e_constitution_japan', year: 1889, name: '大日本帝国宪法颁布', type: 'politics', desc: '伊藤博文主导制定，以普鲁士宪法为蓝本。确立天皇主权和国民权利，日本成为亚洲首个立宪国家。', dynasty: '明治' },
  { id: 'e_mukden', year: 1931, name: '满洲事变(九一八)', type: 'war', desc: '关东军在沈阳附近炸毁南满铁路，以此为借口占领东北全境，建立伪满洲国。日本开始全面侵华。', dynasty: '昭和' },
  { id: 'e_jp_ww2_end', year: 1945, name: '广岛长崎原子弹爆炸', type: 'war', desc: '美国在广岛和长崎投下原子弹，死伤数十万平民。苏联对日宣战，日本天皇宣布无条件投降。', dynasty: '昭和' },
  { id: 'e_jp_recovery', year: 1955, name: '经济高速增长开始', type: 'economy', desc: '日本从战败中迅速复兴，进入"神武景气"时期。到1968年成为世界第二大经济体，创造了战后经济奇迹。', dynasty: '昭和' },
  { id: 'e_jp_san Francisco', year: 1951, name: '旧金山和约', type: 'politics', desc: '日本与美国等48国签订和约，正式结束二战状态，恢复国家主权。同时签订美日安保条约。', dynasty: '昭和' },

{ id: 'e_nobunaga_nobuyasu', year: 1579, name: '德川信康切腹', type: 'politics', desc: '织田信长疑德川家康长子信康通敌，命其切腹。家康忍痛服从，体现战国政治的残酷。' },
{ id: 'e_osaka_jo', year: 1583, name: '大阪城筑城', type: 'culture', desc: '丰臣秀吉在大阪修建日本最宏伟的城堡。动用数万劳工，历时三年完成。天守阁覆以金箔，极尽奢华。' },
{ id: 'e_sword_hunt', year: 1588, name: '刀狩令', type: 'politics', desc: '丰臣秀吉颁布刀狩令，没收全国农民武器，禁止百姓持有刀剑。此举确立了兵农分离制度，杜绝了民间武装反抗。' },
{ id: 'e_tokugawa_red_seal', year: 1604, name: '朱印船贸易开始', type: 'economy', desc: '德川家康发放朱印状许可商船出海贸易。日本商船远航东南亚，形成繁荣的朱印船贸易网络。' },
{ id: 'e_kan_ei_ji', year: 1625, name: '宽永寺建立', type: 'culture', desc: '德川家光在上野建立宽永寺，作为江户城的鬼门镇护。与增上寺并列为德川家的菩提寺。' },
{ id: 'e_shimabara_aftermath', year: 1639, name: '葡萄牙船来航禁止', type: 'politics', desc: '幕府禁止葡萄牙船来航，完成锁国。仅允许荷兰和中国在长崎出岛进行有限贸易，日本与世界隔绝200余年。' },
];

const KOREA_PERSONS = [
{ id: 'dangun', name: '檀君', birth: -2333, death: -2240, cat: 'sage', emoji: '🐻', desc: '朝鲜民族始祖。据《三国遗事》记载，天神桓因之子桓雄下凡，与化为女人的熊结合，生下檀君。檀君于公元前2333年建立古朝鲜（檀君朝鲜）。', achievements: ['建立古朝鲜', '朝鲜民族始祖'], relations: [], events: [] },
{ id: 'gija', name: '箕子', birth: -1100, death: -1000, cat: 'sage', emoji: '👑', desc: '商朝宗室，纣王叔父。商亡后率五千人东走朝鲜，建立箕子朝鲜。传播中原先进农业技术和礼乐文化，朝鲜第一次大规模受中华文明影响。', achievements: ['建立箕子朝鲜', '传播中华文明'], relations: [], events: [] },
{ id: 'wiman', name: '卫满', birth: -200, death: -150, cat: 'military', emoji: '⚔️', desc: '燕人出身的古朝鲜将领。率千余人进入朝鲜，推翻箕子朝鲜末代王准，建立卫满朝鲜。积极扩张领土，控制朝鲜半岛北部。', achievements: ['建立卫满朝鲜', '扩张领土'], relations: [], events: [] },
{ id: 'jumong', name: '朱蒙（东明圣王）', birth: -58, death: -19, cat: 'emperor', emoji: '👑', desc: '高句丽建国始祖。出自扶余国，因遭迫害南逃至卒本（今辽宁桓仁），建立高句丽。传说为天帝之子与河伯女所生，善射被誉为神射手。', achievements: ['建立高句丽', '神射手'], relations: [], events: ['e_goguryeo_founded'] },
{ id: 'yuri_king', name: '琉璃王', birth: -38, death: 18, cat: 'emperor', emoji: '👑', desc: '高句丽第二代王，朱蒙之子。继承父业巩固政权，迁都国内城。留下著名诗歌《黄鸟歌》，是朝鲜最古老的抒情诗之一。', achievements: ['继承高句丽', '《黄鸟歌》'], relations: [{ id: 'jumong', type: '父子', label: '朱蒙' }], events: [] },
{ id: 'taejo_goguryeo', name: '太祖王', birth: 47, death: 165, cat: 'emperor', emoji: '👑', desc: '高句丽第六代王。在位93年，将高句丽从一个部落联盟发展为中央集权国家。积极对外扩张，征服东沃沮等周边部落。', achievements: ['中央集权化', '在位93年', '扩张领土'], relations: [], events: [] },
{ id: 'sansang_king', name: '山上王', birth: 170, death: 227, cat: 'emperor', emoji: '👑', desc: '高句丽第十代王。因兄发歧之乱而即位，迁都丸都城。抵御东汉辽东太守公孙康的进攻，维护了高句丽的独立。', achievements: ['迁都丸都城', '抵御公孙康'], relations: [], events: [] },
{ id: 'dongcheon_king', name: '东川王', birth: 209, death: 248, cat: 'emperor', emoji: '👑', desc: '高句丽第十一代王。遭曹魏大将毌丘俭进攻，丸都城被毁。率残部退入沃沮，最终收复失地。深刻体会到中原王朝的强大。', achievements: ['抵御魏军', '收复失地'], relations: [], events: ['e_weigoguryeo_war'] },
{ id: 'michon_king', name: '美川王', birth: 300, death: 331, cat: 'emperor', emoji: '👑', desc: '高句丽第十五代王。主动出击西晋，攻占乐浪郡和带方郡，彻底结束了汉朝在朝鲜半岛400多年的郡县统治。', achievements: ['攻占乐浪郡', '结束汉郡统治'], relations: [], events: [] },
{ id: 'gogukwon_king', name: '故国原王', birth: 320, death: 371, cat: 'emperor', emoji: '👑', desc: '高句丽第十六代王。遭前燕慕容皝进攻，丸都城再次被毁，被迫称臣纳贡。后与百济战争中阵亡，高句丽一度陷入危机。', achievements: ['艰难守国'], relations: [], events: [] },
{ id: 'sosurim_king', name: '小兽林王', birth: 350, death: 384, cat: 'emperor', emoji: '👑', desc: '高句丽第十七代王。推行全面改革：颁布律令、设立太学、引入佛教。为高句丽的强盛奠定了制度和思想基础。', achievements: ['颁布律令', '设立太学', '引入佛教'], relations: [], events: ['e_buddhism_goguryeo'] },
{ id: 'gwanggaeto', name: '广开土大王', birth: 374, death: 413, cat: 'emperor', emoji: '🗡️', desc: '高句丽第十九代王。朝鲜历史上最伟大的君主之一。南征百济、新罗，北驱契丹，将高句丽疆域扩张至史上最大。其功绩刻于广开土大王碑。', achievements: ['南征百济新罗', '北驱契丹', '疆域鼎盛', '广开土大王碑'], relations: [], events: [] },
{ id: 'jangsu_king', name: '长寿王', birth: 394, death: 491, cat: 'emperor', emoji: '👑', desc: '高句丽第二十代王，广开土大王之子。在位79年，迁都平壤。推行对南北朝（中国）的均衡外交，与中原各国保持和平，国力持续强盛。', achievements: ['迁都平壤', '在位79年', '均衡外交'], relations: [{ id: 'gwanggaeto', type: '父子', label: '广开土大王' }], events: [] },
{ id: 'munja_king', name: '文咨明王', birth: 450, death: 519, cat: 'emperor', emoji: '👑', desc: '高句丽第二十一代王。长寿王之孙。继承祖父的强国政策，继续发展高句丽。佛教在其治下进一步繁荣。', achievements: ['继承强国', '佛教繁荣'], relations: [], events: [] },
{ id: 'yeongyang_king', name: '婴阳王', birth: 560, death: 618, cat: 'emperor', emoji: '👑', desc: '高句丽第二十六代王。隋炀帝三征高句丽，婴阳王在乙支文德辅佐下成功抵御，导致隋朝国力大损而亡。', achievements: ['抵御隋炀帝三征'], relations: [], events: ['e_sui_goguryeo_war'] },
{ id: 'yeon_gaesomun', name: '渊盖苏文', birth: 603, death: 666, cat: 'military', emoji: '⚔️', desc: '高句丽末期权臣。发动政变杀死荣留王，立宝藏王。两次大败唐太宗亲征（安市城之战），被誉为高句丽的守护神。其死后高句丽迅速崩溃。', achievements: ['击败唐太宗', '安市城之战', '高句丽守护神'], relations: [], events: ['e_tang_goguryeo_war'] },
{ id: 'onjo_king', name: '温祚王', birth: -18, death: 28, cat: 'emperor', emoji: '👑', desc: '百济建国始祖。朱蒙之子，因受排挤南逃至汉江流域，建立百济国。定都慰礼城（今首尔），是百济近700年基业的开创者。', achievements: ['建立百济'], relations: [{ id: 'jumong', type: '父子', label: '朱蒙（高句丽始祖）' }], events: [] },
{ id: 'goi_king', name: '古尔王', birth: 190, death: 286, cat: 'emperor', emoji: '👑', desc: '百济第八代王。制定16官等制度，颁布律令，确立中央集权统治体制。积极与带方郡和倭国开展外交。', achievements: ['制定官制', '中央集权'], relations: [], events: [] },
{ id: 'geunchogo_king', name: '近肖古王', birth: 320, death: 375, cat: 'emperor', emoji: '👑', desc: '百济第十三��王，百济最伟大的君主之一。击败高句丽故国原王并将其阵斩，扩张疆域至顶峰。积极与中国东晋和倭国发展外交贸易。', achievements: ['击败高句丽', '疆域鼎盛', '对东晋倭国外交'], relations: [], events: [] },
{ id: 'munju_king', name: '文周王', birth: 450, death: 477, cat: 'emperor', emoji: '👑', desc: '百济第二十二代王。因高句丽南侵威逼汉城，被迫迁都熊津（今公州）。百济国力开始衰落。', achievements: ['迁都熊津'], relations: [], events: [] },
{ id: 'seong_king', name: '圣王', birth: 490, death: 554, cat: 'emperor', emoji: '👑', desc: '百济第二十六代王。迁都泗沘（今扶余），短暂中兴百济。积极向倭国传播佛教和先进文化。与新罗交战中阵亡。', achievements: ['百济中兴', '向倭国传播佛教'], relations: [], events: ['e_buddhism_japan'] },
{ id: 'mu_king', name: '武王', birth: 580, death: 641, cat: 'emperor', emoji: '👑', desc: '百济第三十代王。建造弥勒寺，是百济最大的寺院。与新罗频繁交战，互有胜负。其王妃是著名的善花公主。', achievements: ['建造弥勒寺'], relations: [], events: [] },
{ id: 'uija_king', name: '义慈王', birth: 599, death: 660, cat: 'emperor', emoji: '👑', desc: '百济末代王。初期积极对唐外交，后联合高句丽攻新罗。唐与新罗联军攻灭百济，义慈王被俘至洛阳。百济灭亡。', achievements: ['百济末代王'], relations: [], events: ['e_baekje_fall'] },
{ id: 'gyebaek', name: '阶伯', birth: 600, death: 660, cat: 'military', emoji: '⚔️', desc: '百济末期名将。百济灭亡前，率五千死士在黄山伐迎战新罗五万大军。战前杀妻儿以绝后顾，全军壮烈战死，被誉为百济最后的忠诚。', achievements: ['黄山伐之战', '百济最后的忠诚'], relations: [], events: ['e_baekje_fall'] },
{ id: 'hyeokgeose', name: '赫居世居西干', birth: -69, death: 4, cat: 'emperor', emoji: '🥚', desc: '新罗建国始祖。据传从一匹白马留下的紫卵中诞生，13岁被推举为王。建立新罗（徐罗伐），是朝鲜三国中存在最久的王朝。', achievements: ['建立新罗'], relations: [], events: [] },
{ id: 'naemul_king', name: '奈勿王', birth: 350, death: 402, cat: 'emperor', emoji: '👑', desc: '新罗第十七代王。确立金氏世袭王位制度。面对高句丽南侵，遣使向东晋求援，开启了新罗与中国的正式外交关系。', achievements: ['世袭王位制', '对东晋外交'], relations: [], events: [] },
{ id: 'beopheung_king', name: '法兴王', birth: 500, death: 540, cat: 'emperor', emoji: '👑', desc: '新罗第二十三代王。正式承认佛教为国教，颁布律令，确立骨品制度。新罗开始走向强大。', achievements: ['佛教国教化', '骨品制度', '颁布律令'], relations: [], events: [] },
{ id: 'jinheung_king', name: '真兴王', birth: 534, death: 576, cat: 'emperor', emoji: '👑', desc: '新罗第二十四代王，最伟大的新罗君主之一。组建青年精英团体"花郎道"。大幅扩张领土，北至咸兴，西至汉江。留下多处巡狩碑。', achievements: ['创立花郎道', '大幅扩张', '巡狩碑'], relations: [], events: [] },
{ id: 'seondeok_queen', name: '善德女王', birth: 600, death: 647, cat: 'emperor', emoji: '👑', desc: '新罗第二十七代王，朝鲜半岛第一位女性君主。建造瞻星台（亚洲现存最古老的天文台），与唐建立联盟对抗高句丽和百济。', achievements: ['第一位女王', '建造瞻星台', '唐罗联盟'], relations: [], events: [] },
{ id: 'muyeol_king', name: '武烈王（金春秋）', birth: 604, death: 661, cat: 'emperor', emoji: '👑', desc: '新罗第二十九代王。积极与唐朝结盟，为统一三国奠定外交基础。其子文武王最终完成统一大业。', achievements: ['唐罗联盟', '统一三国奠基'], relations: [], events: [] },
{ id: 'kim_yushin', name: '金庾信', birth: 595, death: 673, cat: 'military', emoji: '⚔️', desc: '新罗名将，统一三国的最大功臣。15岁加入花郎道，后在罗唐联军中屡建奇功，指挥灭亡百济和高句丽的战役。被追封为兴武大王。', achievements: ['统一三国功臣', '灭亡百济', '灭亡高句丽'], relations: [], events: ['e_baekje_fall', 'e_goguryeo_fall'] },
{ id: 'munmu_king', name: '文武王', birth: 626, death: 681, cat: 'emperor', emoji: '👑', desc: '新罗第三十代王，完成朝鲜半岛统一。灭百济和高句丽后，驱逐唐朝势力，建立统一新罗。死后遗言火化于东海，化龙守护国家。', achievements: ['统一三国', '驱逐唐军', '统一新罗'], relations: [{ id: 'kim_yushin', type: '君臣', label: '金庾信' }], events: ['e_silla_unify'] },
{ id: 'sinmun_king', name: '神文王', birth: 654, death: 692, cat: 'emperor', emoji: '👑', desc: '统一新罗第二代王。平定金钦突叛乱，巩固中央集权。设立国学，推广儒学教育。', achievements: ['巩固统一', '设立国学'], relations: [], events: [] },
{ id: 'gyeongdeok_king', name: '景德王', birth: 720, death: 765, cat: 'emperor', emoji: '👑', desc: '统一新罗的鼎盛时期。建造佛国寺和石窟庵（世界文化遗产），是统一新罗佛教艺术的巅峰之作。', achievements: ['佛国寺', '石窟庵', '佛教艺术巅峰'], relations: [], events: [] },
{ id: 'dae_joyeong', name: '大祚荣', birth: 660, death: 719, cat: 'emperor', emoji: '🐎', desc: '渤海国建国始祖。原为高句丽遗民，率众东走，在天门岭大败唐朝追兵后建立渤海国。被唐朝封为渤海郡王。', achievements: ['建立渤海国', '天门岭大捷'], relations: [], events: ['e_balhae_founded'] },
{ id: 'mun_wang', name: '文王（大钦茂）', birth: 720, death: 794, cat: 'emperor', emoji: '👑', desc: '渤海第三代王。在位56年，励精图治，仿唐制度建立渤海官僚体系。多次遣使入唐学习，使渤海成为海东盛国。', achievements: ['海东盛国', '仿唐建制', '遣使入唐'], relations: [], events: [] },
{ id: 'wang_geon', name: '王建（太祖）', birth: 877, death: 943, cat: 'emperor', emoji: '👑', desc: '高丽王朝开国君主。原为后高句丽大将，918年发动政变建立高丽。935年接受新罗归降，936年灭后百济，重新统一朝鲜半岛。定都开城。', achievements: ['建立高丽', '统一后三国', '定都开城'], relations: [], events: ['e_goryeo_founded'] },
{ id: 'gwangjong', name: '光宗', birth: 925, death: 975, cat: 'emperor', emoji: '👑', desc: '高丽第四代王。推行奴婢按检法和科举制度，削弱地方豪族势力，加强中央集权。自称皇帝，与宋朝并立。', achievements: ['实行科举', '奴婢按检法', '加强中央集权'], relations: [], events: [] },
{ id: 'seongjong', name: '成宗', birth: 961, death: 997, cat: 'emperor', emoji: '👑', desc: '高丽第六代王。接受宋朝册封，全面推行儒学官僚体制。命崔承老上《时务二十八条》，奠定了高丽王朝200年的文治基础。', achievements: ['儒学官僚制', '文治基础'], relations: [], events: [] },
{ id: 'hyeonjong', name: '显宗', birth: 992, death: 1031, cat: 'emperor', emoji: '👑', desc: '高丽第八代王。契丹（辽）三次入侵高丽，显宗成功击退。避难期间主持雕刻《高丽大藏经》初版，为世界佛教经典之宝。', achievements: ['击退契丹', '高丽大藏经'], relations: [], events: [] },
{ id: 'yoon_gwan', name: '尹瓘', birth: 1040, death: 1111, cat: 'military', emoji: '⚔️', desc: '高丽名将。率17万大军北伐女真，在东北建九城。虽最终归还九城，但展现了高丽的军事能力。', achievements: ['北伐女真', '建九城'], relations: [], events: [] },
{ id: 'uicheon', name: '义天', birth: 1055, death: 1101, cat: 'philosopher', emoji: '🙏', desc: '高丽文宗之子，天台宗高僧。入宋求法，遍访名山古刹。回国后创立高丽天台宗，编撰《续一切经音义》，推动高丽佛教发展。', achievements: ['创立天台宗', '入宋求法', '续一切经音义'], relations: [], events: [] },
{ id: 'myocheong', name: '妙清', birth: 1090, death: 1135, cat: 'philosopher', emoji: '🔮', desc: '高丽僧侣。主张迁都西京（平壤）和称帝建元，与金富轼等保守派发生冲突。起兵反叛（妙清之乱），兵败被杀。', achievements: ['迁都运动', '妙清之乱'], relations: [], events: [] },
{ id: 'kim_busik', name: '金富轼', birth: 1075, death: 1151, cat: 'scholar', emoji: '📚', desc: '高丽儒学家、历史学家。平定妙清之乱后主持编撰《三国史记》，是朝鲜现存最古老的史书，记录了三国时代至统一新罗的历史。', achievements: ['编撰三国史记', '平定妙清之乱'], relations: [], events: [] },
{ id: 'lee_gyubo', name: '李奎报', birth: 1168, death: 1241, cat: 'scholar', emoji: '📝', desc: '高丽文学大家。以《东明王篇》著称，长篇叙事诗叙述朱蒙建国故事。在蒙古入侵中写下大量爱国诗篇。其文集《东国李相国集》为高丽文学最高成就。', achievements: ['东明王篇', '爱国诗篇', '高丽文学巅峰'], relations: [], events: [] },
{ id: 'choi_young', name: '崔莹', birth: 1316, death: 1388, cat: 'military', emoji: '⚔️', desc: '高丽末期名将。多次击退倭寇入侵，又远征收复辽东部分领土。反对李成桂废王自立，兵败被杀，是高丽最后的忠臣。', achievements: ['击退倭寇', '高丽最后的忠臣'], relations: [], events: [] },
{ id: 'jeong_mongju', name: '郑梦周', birth: 1337, death: 1392, cat: 'scholar', emoji: '🎓', desc: '高丽末期大儒，理学大家。坚守对高丽王室的忠诚，反对李成桂篡位。在善竹桥被刺杀，血溅桥石，成为朝鲜儒学史上忠节的象征。', achievements: ['高丽忠节', '性理学传播', '善竹桥'], relations: [], events: ['e_joseon_founded'] },
{ id: 'taejo_joseon', name: '李成桂（太祖）', birth: 1335, death: 1408, cat: 'emperor', emoji: '👑', desc: '朝鲜王朝开国君主。原为高丽大将，威化岛回军后掌握实权。1392年受推举建立朝鲜王朝，定都汉阳（今首尔），开创了延续500多年的李氏朝鲜。', achievements: ['建立朝鲜王朝', '威化岛回军', '定都汉阳'], relations: [], events: ['e_joseon_founded'] },
{ id: 'taejong', name: '太宗（李芳远）', birth: 1367, death: 1422, cat: 'emperor', emoji: '👑', desc: '朝鲜第三代王。通过两次王子之乱消灭政敌，巩固王权。废除私兵，加强中央集权。为其子世宗大王铺平了道路。', achievements: ['巩固王权', '废除私兵', '中央集权'], relations: [], events: [] },
{ id: 'sejong', name: '世宗大王', birth: 1397, death: 1450, cat: 'emperor', emoji: '📜', desc: '朝鲜第四代王，朝鲜历史上最伟大的君主。创制训民正音（韩文），使平民也能读书写字。发展科技农业，编纂《东国通鉴》《农事直说》，建立集贤殿。', achievements: ['创制训民正音', '集贤殿', '《东国通鉴》', '科技农业'], relations: [], events: ['e_hangul_created'] },
{ id: 'jang_yeongsil', name: '蒋英实', birth: 1390, death: 1450, cat: 'scientist', emoji: '⏱️', desc: '朝鲜世宗时代最伟大的发明家。出身奴婢，以才华受世宗重用。发明浑天仪、测雨器、日晷等众多科学仪器，其中测雨器比欧洲早200多年。', achievements: ['浑天仪', '测雨器', '日晷'], relations: [], events: [] },
{ id: 'sin_sukju', name: '申叔舟', birth: 1417, death: 1475, cat: 'scholar', emoji: '📖', desc: '朝鲜世宗至世祖时期的大学者。参与创制训民正音，编撰《东国通鉴》《国朝五礼仪》。精通汉语、女真语和日语，是朝鲜最杰出的语言学家之一。', achievements: ['参与创制训民正音', '外交语言天才'], relations: [], events: [] },
{ id: 'sejo', name: '世祖', birth: 1417, death: 1468, cat: 'emperor', emoji: '👑', desc: '朝鲜第七代王。发动癸酉靖难夺取侄子端宗的王位，成为篡位者。但其治下编纂《经国大典》，完善朝鲜法度，经济文化均有发展。', achievements: ['编撰经国大典', '完善法度'], relations: [], events: [] },
{ id: 'seongjong_joseon', name: '成宗', birth: 1457, death: 1495, cat: 'emperor', emoji: '👑', desc: '朝鲜第九代王。完成并颁布《经国大典》，确立朝鲜基本法典。编纂《东国舆地胜览》等地理志，朝鲜文治达到顶峰。', achievements: ['颁布经国大典', '东国舆地胜览'], relations: [], events: [] },
{ id: 'jo_gwangjo', name: '赵光祖', birth: 1482, death: 1519, cat: 'philosopher', emoji: '💡', desc: '朝鲜中宗时代的性理学者和政治改革家。追求至治主义的理想政治，推行激进的改革（乡约、贤良科）。因触动勋旧派利益遭己卯士祸，被赐死。', achievements: ['至治主义', '己卯士祸'], relations: [], events: [] },
{ id: 'yi_hwang', name: '李滉（退溪）', birth: 1501, death: 1570, cat: 'philosopher', emoji: '🎓', desc: '朝鲜最伟大的性理学家之一，岭南学派的宗师。发展朱熹性理学，著《圣学十图》，其学说深刻影响了朝鲜社会数百年。韩元千元纸币上印有其头像。', achievements: ['退溪学派', '《圣学十图》', '岭南学派宗师'], relations: [], events: [] },
{ id: 'yi_i', name: '李珥（栗谷）', birth: 1536, death: 1584, cat: 'philosopher', emoji: '🎓', desc: '朝鲜性理学大家，畿湖学派创始人。主张"理气一元论"，与李滉的"理气二元论"形成朝鲜儒学两大流派。提出10万养兵论预见倭乱。韩元五千元纸币印有其头像。', achievements: ['栗谷学派', '理气一元论', '10万养兵论'], relations: [], events: [] },
{ id: 'yi_sunshin', name: '李舜臣', birth: 1545, death: 1598, cat: 'military', emoji: '⚓', desc: '朝鲜水军名将。发明龟船，在壬辰倭乱中率12艘战船在鸣梁海峡大败133艘日本战船。露梁海战中壮烈殉国，遗言"战方急，勿言我死"。被视为朝鲜民族英雄第一人。', achievements: ['发明龟船', '鸣梁大捷', '露梁殉国'], relations: [], events: ['e_imjin_war'] },
{ id: 'heo_jun', name: '许浚', birth: 1539, death: 1615, cat: 'scientist', emoji: '🩺', desc: '朝鲜御医，编纂《东医宝鉴》。汇集东亚传统医学精华，是朝鲜医学史上最伟大的著作。2009年被列入联合国教科文组织世界记忆遗产。', achievements: ['编纂东医宝鉴', '朝鲜医学集大成'], relations: [], events: [] },
{ id: 'gwanghaegun', name: '光海君', birth: 1575, death: 1641, cat: 'emperor', emoji: '👑', desc: '朝鲜第十五代王。在壬辰倭乱后推行中立外交（明朝与后金之间），重建战后经济。后被仁祖反正推翻，流放至死。其务实外交被称为朝鲜最明智的君主。', achievements: ['中立外交', '战后重建'], relations: [], events: ['e_imjin_war'] },
{ id: 'heo_nanseolheon', name: '许兰雪轩', birth: 1563, death: 1589, cat: 'artist', emoji: '✍️', desc: '朝鲜女诗人。许浚之妹，自幼聪慧。其诗歌忧国忧民，充满人文关怀。27岁早逝。其诗作传入中国，受到明朝文人高度评价。', achievements: ['女诗人', '诗歌传入中国'], relations: [], events: [] },
{ id: 'kim_jeongho', name: '金正浩', birth: 1804, death: 1866, cat: 'scientist', emoji: '🗺️', desc: '朝鲜地理学家。耗费27年走遍全国，绘制《大东舆地图》，是朝鲜最精确详尽的全国地图。因泄露国家机密被囚致死，但其爱国精神永存。', achievements: ['大东舆地图', '27年实地测绘'], relations: [], events: [] },
{ id: 'jeong_yakyong', name: '丁若镛（茶山）', birth: 1762, death: 1836, cat: 'scholar', emoji: '📚', desc: '朝鲜后期实学派集大成者。著作500余卷涵盖经学、政治、经济、科技、医学等各领域。设计举重机和华城。其"为民之学"的实学精神影响深远。', achievements: ['实学集大成', '500余卷著作', '举重机设计'], relations: [], events: [] },
{ id: 'heungseon', name: '兴宣大院君', birth: 1820, death: 1898, cat: 'politician', emoji: '🏛️', desc: '朝鲜末期摄政。推行闭关锁国政策，镇压天主教（丙寅迫害）。抗击法国（丙寅洋扰）和美国（辛未洋扰）的入侵，其锁国政策使朝鲜被称为隐士王国。', achievements: ['抗击法国入侵', '抗击美国入侵', '锁国政策'], relations: [], events: [] },
{ id: 'gojong', name: '高宗', birth: 1852, death: 1919, cat: 'emperor', emoji: '👑', desc: '朝鲜末代国王、大韩帝国首任皇帝。在列强夹缝中艰难维持独立，最终于1910年被日本吞并。1919年逝世，引发三一独立运动。', achievements: ['大韩帝国皇帝', '抗争日本吞并'], relations: [], events: [] },
{ id: 'ahn_junggeun', name: '安重根', birth: 1879, death: 1910, cat: 'military', emoji: '✊', desc: '朝鲜独立运动家。1909年在哈尔滨火车站刺杀伊藤博文，被捕后慷慨就义。在狱中写下《东洋和平论》，主张中日韩三国平等合作。被中韩两国尊为英雄。', achievements: ['刺杀伊藤博文', '《东洋和平论》'], relations: [], events: [] },
{ id: 'kim_gu', name: '金九', birth: 1876, death: 1949, cat: 'politician', emoji: '🕊️', desc: '韩国独立运动领袖。大韩民国临时政府主席，领导海外抗日独立运动。战后反对朝鲜半岛分裂，致力于南北统一谈判。被极右势力暗杀。', achievements: ['独立运动领袖', '临时政府主席', '统一运动'], relations: [], events: [] },
{ id: 'syngman_rhee', name: '李承晚', birth: 1875, death: 1965, cat: 'politician', emoji: '🏛️', desc: '韩国首任总统。早年参加独立运动，流亡美国。1948年就任大韩民国首任总统，执政12年。1960年因四一九革命被迫下台，流亡夏威夷。', achievements: ['首任总统', '独立运动先驱'], relations: [], events: [] },
{ id: 'park_chunghee', name: '朴正熙', birth: 1917, death: 1979, cat: 'politician', emoji: '🏗️', desc: '韩国第五至第九任总统。通过军事政变上台，推行经济发展五年计划，创造了汉江奇迹。韩国经济从最贫穷国家跃升为工业强国。1979年被部下刺杀。', achievements: ['汉江奇迹', '经济发展'], relations: [], events: [] },

{ id: 'jeong_dojeon', name: '郑道传', birth: 1342, death: 1398, cat: 'scholar', emoji: '📜', desc: '朝鲜王朝的设计师。辅佐李成桂建立朝鲜，制定《朝鲜经国典》，规划汉阳都城，奠定了朝鲜500年的制度基础。被李芳远（太宗）杀害。', achievements: ['朝鲜王朝设计师', '朝鲜经国典', '规划汉阳'], relations: [], events: ['e_joseon_founded'] },
{ id: 'hwang_hui', name: '黄喜', birth: 1363, death: 1452, cat: 'politician', emoji: '🏛️', desc: '朝鲜世宗时代名相。担任领议政18年，是朝鲜历史上任职最长的宰相。以宽容和正直辅佐世宗，被称为"太平宰相"。', achievements: ['18年宰相', '太平宰相'], relations: [], events: [] },
{ id: 'shin_saimdang', name: '申师任堂', birth: 1504, death: 1551, cat: 'artist', emoji: '🍇', desc: '朝鲜女艺术家、诗人。精通书画刺绣，是韩国最受尊敬的女性历史人物之一。其子李珥（栗谷）是朝鲜儒学大师。头像印于韩国5万韩元纸币。', achievements: ['女艺术家', '五万韩元头像', '儒学家之母'], relations: [], events: [] },
{ id: 'heo_gyun', name: '许筠', birth: 1569, death: 1618, cat: 'artist', emoji: '📕', desc: '朝鲜中期文臣、小说家。创作了朝鲜第一部韩文小说《洪吉童传》，反映了社会下层人民的愿望，是朝鲜文学史上的里程碑。', achievements: ['洪吉童传', '第一部韩文小说'], relations: [], events: [] },
{ id: 'yi_hangbok', name: '李恒福', birth: 1556, death: 1618, cat: 'politician', emoji: '🏛️', desc: '朝鲜中期文臣。壬辰倭乱中随宣祖播迁，主持与明朝的外交斡旋，请来援军。是乱中国家的中流砥柱。', achievements: ['请明援军', '中流砥柱'], relations: [], events: ['e_imjin_war'] },
{ id: 'ryu_seongryong', name: '柳成龙', birth: 1542, death: 1607, cat: 'politician', emoji: '📖', desc: '朝鲜领议政。壬辰倭乱中总揽国政，起用李舜臣和权栗等名将。著《惩毖录》反思战争教训，是朝鲜最重要的历史文献之一。', achievements: ['起用李舜臣', '惩毖录', '战争总指挥'], relations: [], events: ['e_imjin_war'] },
{ id: 'han_seokbong', name: '韩石峰', birth: 1543, death: 1605, cat: 'artist', emoji: '✍️', desc: '朝鲜最伟大的书法家。其楷书被誉为"东方第一"，连明朝使臣也赞不绝口。世传其母为激励他苦练，深夜关灯让他凭感觉写字。', achievements: ['东方第一书法', '石峰体'], relations: [], events: [] },
{ id: 'kim_siseup', name: '金时习', birth: 1435, death: 1493, cat: 'artist', emoji: '📚', desc: '朝鲜初期文学家。因不满世祖篡位而隐居，著《金鰲新话》——朝鲜文学史上第一部传奇小说集。被称为"方外之人"。', achievements: ['金鳌新话', '第一位小说家'], relations: [], events: [] },
{ id: 'park_yun', name: '朴堧', birth: 1378, death: 1458, cat: 'scientist', emoji: '🎵', desc: '朝鲜世宗时代的音乐家。整理朝鲜雅乐和乡乐，创制编钟和乐谱体系。为朝鲜宫廷音乐奠定了千年基础。', achievements: ['整理雅乐', '创制编钟', '宫廷音乐奠基'], relations: [], events: [] },
{ id: 'gang_huian', name: '姜希颜', birth: 1417, death: 1464, cat: 'artist', emoji: '🎨', desc: '朝鲜初期著名画家。随使节赴明朝学习中国绘画，回国后开创朝鲜文人画传统。其山水人物画被奉为国宝。', achievements: ['朝鲜文人画开创', '入明学画'], relations: [], events: [] },
{ id: 'kwon_yul', name: '权栗', birth: 1537, death: 1599, cat: 'military', emoji: '⚔️', desc: '朝鲜陆军名将。壬辰倭乱中在幸州以三千兵力大破三万日军（幸州大捷），鼓舞了全国抗敌士气。与李舜臣并称陆海双雄。', achievements: ['幸州大捷', '陆海双雄'], relations: [], events: ['e_imjin_war'] },
{ id: 'kim_deokryeong', name: '金德龄', birth: 1568, death: 1596, cat: 'military', emoji: '🗡️', desc: '朝鲜义兵将领。壬辰倭乱中率义兵屡破日军，被诬陷通敌冤死狱中。其忠勇感动后人，小说《林巨正》以他为原型。', achievements: ['义兵将领', '忠勇之士'], relations: [], events: ['e_imjin_war'] },
];

const KOREA_EVENTS = [
{ id: 'e_gojoseon_founded', year: -2333, name: '檀君建立古朝鲜', type: 'politics', desc: '据《三国遗事》记载，檀君王俭于公元前2333年建立古朝鲜，定都平壤。这是朝鲜半岛最早的政权传说。', dynasty: '古朝鲜' },
{ id: 'e_gija_joseon', year: -1100, name: '箕子东走朝鲜', type: 'politics', desc: '商朝灭亡后，纣王叔父箕子率五千人东走朝鲜，建立箕子朝鲜。带来中原农业技术和礼乐文化。', dynasty: '古朝鲜' },
{ id: 'e_wiman_joseon', year: -195, name: '卫满朝鲜建立', type: 'politics', desc: '燕人卫满率千余人进入朝鲜推翻箕子朝鲜，建立卫满朝鲜。积极扩张领土。', dynasty: '古朝鲜' },
{ id: 'e_han_goguryeo', year: -108, name: '汉武帝灭卫满朝鲜', type: 'war', desc: '汉武帝派兵征服卫满朝鲜，在其地设乐浪、临屯、玄菟、真番四郡。朝鲜半岛北部纳入汉朝直接统治400年。', dynasty: '古朝鲜' },
{ id: 'e_goguryeo_founded', year: -37, name: '高句丽建国', type: 'politics', desc: '朱蒙从扶余国南逃至卒本，建立高句丽国。此后发展为朝鲜三国中最强大的国家。', dynasty: '三国' },
{ id: 'e_baekje_founded', year: -18, name: '百济建国', type: 'politics', desc: '温祚王在汉江流域建立百济国。百济积极吸收中国文化，并向倭国传播佛教和先进技术。', dynasty: '三国' },
{ id: 'e_silla_founded', year: -57, name: '新罗建国', type: 'politics', desc: '赫居世居西干建立新罗（徐罗伐），是三国中建立最早、存在最久的王朝。', dynasty: '三国' },
{ id: 'e_buddhism_goguryeo', year: 372, name: '佛教传入高句丽', type: 'culture', desc: '前秦王苻坚遣使送佛经和僧人到高句丽，佛教正式传入朝鲜半岛。', dynasty: '三国' },
{ id: 'e_weigoguryeo_war', year: 244, name: '魏国入侵高句丽', type: 'war', desc: '曹魏大将毌丘俭率军攻破高句丽丸都城，追击东川王至沃沮。刻石纪功而还。', dynasty: '三国' },
{ id: 'e_sui_goguryeo_war', year: 612, name: '隋炀帝三征高句丽', type: 'war', desc: '隋炀帝三次大规模征伐高句丽。乙支文德在萨水大败隋军，隋朝国力大损而亡国。', dynasty: '三国' },
{ id: 'e_tang_goguryeo_war', year: 645, name: '唐太宗亲征高句丽', type: 'war', desc: '李世民亲率大军东征，攻陷辽东十余城。在安市城被渊盖苏文击退，未能灭国。', dynasty: '三国' },
{ id: 'e_baekje_fall', year: 660, name: '百济灭亡', type: 'war', desc: '唐将苏定方率军与新罗联军攻灭百济。义慈王被俘，阶伯在黄山伐阵亡。', dynasty: '三国' },
{ id: 'e_goguryeo_fall', year: 668, name: '高句丽灭亡', type: 'war', desc: '李勣率唐军与金庾信联合攻灭高句丽。存在705年的高句丽亡国，朝鲜三国时代结束。', dynasty: '三国' },
{ id: 'e_silla_unify', year: 676, name: '新罗统一三国', type: 'politics', desc: '新罗在文武王时期驱逐唐朝势力，统一了朝鲜半岛汉江以南地区，进入统一新罗时代。', dynasty: '统一新罗' },
{ id: 'e_balhae_founded', year: 698, name: '渤海国建立', type: 'politics', desc: '高句丽遗民大祚荣在天门岭大败唐军后建立渤海国。与统一新罗并立，史称南北国时代。', dynasty: '渤海' },
{ id: 'e_goryeo_founded', year: 918, name: '高丽王朝建立', type: 'politics', desc: '王建推翻弓裔建立高丽王朝。935年灭新罗、936年灭后百济，重新统一朝鲜半岛。', dynasty: '高丽' },
{ id: 'e_balhae_fall', year: 926, name: '渤海国灭亡', type: 'war', desc: '契丹（辽）攻灭渤海国，存在228年的渤海国亡。大批渤海遗民南投高丽。', dynasty: '渤海' },
{ id: 'e_khitan_invasion', year: 1010, name: '契丹三侵高丽', type: 'war', desc: '辽圣宗三次入侵高丽，高丽击退入侵。显宗雕刻高丽大藏经初版以祈佛佑国。', dynasty: '高丽' },
{ id: 'e_tripitaka', year: 1236, name: '高丽大藏经再雕', type: 'culture', desc: '蒙古入侵，高丽再雕大藏经以求佛佑。8万块木版现存海印寺，是世界上最完整的汉文大藏经。', dynasty: '高丽' },
{ id: 'e_mongol_invasion_kr', year: 1231, name: '蒙古入侵高丽', type: 'war', desc: '蒙古大军八次入侵高丽，高丽朝廷迁都江华岛坚持抵抗近30年。最终高丽成为元朝驸马国。', dynasty: '高丽' },
{ id: 'e_joseon_founded', year: 1392, name: '朝鲜王朝建立', type: 'politics', desc: '李成桂废黜高丽恭让王，建立朝鲜王朝。定都汉阳（首尔），开启了500多年的李氏朝鲜。', dynasty: '朝鲜' },
{ id: 'e_hangul_created', year: 1443, name: '训民正音创制', type: 'culture', desc: '世宗大王创制训民正音（韩文）。以科学原理设计的拼音文字，使平民百姓也能识字读书。', dynasty: '朝鲜' },
{ id: 'e_imjin_war', year: 1592, name: '壬辰倭乱', type: 'war', desc: '丰臣秀吉派15万大军入侵朝鲜。李舜臣以龟船在海上大破日军，各地义兵奋起，明朝派军援助。7年战争日军最终撤退。', dynasty: '朝鲜' },
{ id: 'e_qing_invasion_kr', year: 1636, name: '丙子胡乱', type: 'war', desc: '皇太极率清军入侵朝鲜，迫使朝鲜断绝与明朝宗藩关系，改为清朝藩属。朝鲜表面臣服，内心仍怀明朝。', dynasty: '朝鲜' },
{ id: 'e_silhak_movement', year: 1700, name: '实学运动兴起', type: 'culture', desc: '以柳馨远、李瀷、丁若镛为代表的朝鲜实学派兴起。主张实用之学，批评空谈性理，关注民生科技。', dynasty: '朝鲜' },
{ id: 'korea_modern_founded', year: 1897, name: '大韩帝国成立', type: 'politics', desc: '高宗称帝，改国号为大韩帝国。试图在列强夹缝中维持独立自主。', dynasty: '朝鲜' },
{ id: 'e_japan_annex_kr', year: 1910, name: '日本吞并朝鲜', type: 'politics', desc: '《韩日合并条约》签订，大韩帝国被日本正式吞并。朝鲜沦为日本殖民地35年。', dynasty: '朝鲜' },
{ id: 'korea_march1st', year: 1919, name: '三一独立运动', type: 'politics', desc: '朝鲜半岛爆发大规模反日独立示威。200多万人参与，日本军警镇压造成大量死伤。大韩民国临时政府在海外成立。', dynasty: '现代' },
{ id: 'e_korea_liberation', year: 1945, name: '朝鲜光复', type: 'politics', desc: '日本投降，朝鲜半岛光复。但随即以北纬38度线分为美苏占领区，为后来的分裂埋下伏笔。', dynasty: '现代' },
{ id: 'korea_rok_founded', year: 1948, name: '大韩民国成立', type: 'politics', desc: '李承晚就任首任总统，大韩民国正式成立。同年北部成立朝鲜民主主义人民共和国。', dynasty: '现代' },
{ id: 'e_korean_war', year: 1950, name: '朝鲜战争爆发', type: 'war', desc: '朝鲜人民军南下，韩国军队节节败退。以美国为首的联合国军介入，中国派遣志愿军。1953年停战，38线至今仍是分裂线。', dynasty: '现代' },
{ id: 'e_hangang_miracle', year: 1960, name: '汉江奇迹', type: 'economy', desc: '韩国从1960年代开始经济腾飞，30年间从世界最穷国之一跃升为高收入发达国家，创造了汉江奇迹。', dynasty: '现代' },
{ id: 'e_seoul_olympics', year: 1988, name: '汉城奥运会', type: 'culture', desc: '第24届夏季奥运会在汉城举行，是韩国向世界展示发展成就的里程碑。', dynasty: '现代' },

{ id: 'e_hanyang_construction', year: 1395, name: '汉阳都城竣工', type: 'culture', desc: '朝鲜太祖李成桂命郑道传规划建造汉阳（首尔）都城，包括景福宫和宗庙。奠定了600年韩国首都的基础。' },
{ id: 'e_hunminjeongeum_promulgated', year: 1446, name: '训民正音正式颁布', type: 'culture', desc: '世宗大王正式颁布训民正音，共28个字母。这是世界上唯一知道创制者和创制年份的文字系统。' },
{ id: 'e_literati_purge', year: 1498, name: '戊午史祸', type: 'politics', desc: '朝鲜历史上第一次大士祸。因金宗直在史书中批评世祖篡位引发，数十名士林派官员被杀或流放。开启了持续百年的四代士祸。' },
{ id: 'e_gapsin_purge', year: 1504, name: '甲子士祸', type: 'politics', desc: '燕山君得知生母被赐死真相后疯狂报复，屠杀大批官员。燕山君成为朝鲜历史上最著名的暴君，后被中宗反正推翻。' },
{ id: 'e_gimyo_purge', year: 1519, name: '己卯士祸', type: 'politics', desc: '赵光祖推行激进改革触怒勋旧派，被诬陷赐死。其理想主义的至治政治虽失败，但成为后世士林的精神遗产。' },
{ id: 'e_sa_Century_purges', year: 1545, name: '乙巳士祸', type: 'politics', desc: '朝鲜第12代王仁宗在位仅8月即死，围绕继位问题发生大规模政治清洗。四次士祸极大削弱了士林势力。' },
];
