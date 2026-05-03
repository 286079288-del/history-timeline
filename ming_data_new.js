  // ========== 明（续）新增人物 ==========

  // ---- 明初开国功臣 ----
  {
    id: 'zhu_yuanzhang', name: '朱元璋（明太祖）', birth: 1328, death: 1398,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 33.0, lng: 118.3, place: '濠州钟离（今安徽凤阳）' },
    desc: '明朝开国皇帝（明太祖），出身贫苦，由乞丐、和尚、起义军一步步成为皇帝，推翻元朝，建立大明。废丞相，加强皇权，大杀功臣。',
    achievements: ['建立明朝', '废除丞相', '推翻蒙古统治', '洪武之治'],
    relations: [
      { id: 'liu_ji', type: '君臣', label: '刘伯温（谋士）' },
      { id: 'xu_da', type: '君臣', label: '徐达（名将）' },
      { id: 'chang_yuchun', type: '君臣', label: '常遇春（名将）' },
      { id: 'yongle', type: '父子', label: '朱棣（儿子）' }
    ],
    events: ['e_ming_founded']
  },
  {
    id: 'liu_ji', name: '刘伯温（刘基）', birth: 1311, death: 1375,
    cat: 'philosopher', dynasty: '明', emoji: '🔮',
    location: { lat: 28.0, lng: 120.6, place: '处州青田（今浙江青田）' },
    desc: '明朝开国功臣，著名政治家、军事家、文学家，精通天文地理、兵法数学，辅助朱元璋建立明朝，被誉为"前知五百年，后知五百年"的神算子。',
    achievements: ['辅助建明', '著《烧饼歌》', '精通天文兵法', '运筹帷幄'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'xu_da', name: '徐达', birth: 1332, death: 1385,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 34.2, lng: 117.1, place: '濠州钟离（今安徽凤阳）' },
    desc: '明朝开国第一功臣，与朱元璋同乡，自参加红巾军起追随朱元璋，南征北战。率军北伐，攻克元大都（北京），推翻元朝统治。为人谨慎，善于治军，被誉为"大明第一名将"，朱元璋称其为"万里长城"。',
    achievements: ['攻克元大都', '北伐灭元', '大明第一名将', '万里长城'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }, { id: 'chang_yuchun', type: '战友', label: '常遇春' }],
    events: ['e_ming_founded']
  },
  {
    id: 'chang_yuchun', name: '常遇春', birth: 1330, death: 1369,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 33.6, lng: 117.9, place: '怀远（今安徽怀远）' },
    desc: '明朝开国名将，勇冠三军，自称"能将十万众，横行天下"，军中称"常十万"。鄱阳湖大战中射杀陈友谅头号猛将张定边，北伐中屡建奇功，暴卒于军中，年仅39岁。',
    achievements: ['鄱阳湖大战立功', '北伐先锋', '常十万'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }, { id: 'xu_da', type: '战友', label: '徐达（搭档）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'yang_jing', name: '杨璟', birth: 1329, death: 1387,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 32.5, lng: 112.1, place: '合肥（今安徽合肥）' },
    desc: '明朝开国名将，从朱元璋渡江，攻取集庆路、镇守常州、参与平定陈友谅，因功封颖川侯。与傅友德、康茂才并称早期名将。',
    achievements: ['渡江建功', '镇守常州', '平定陈友谅'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'fu_yode', name: '傅友德', birth: ? , death: 1394,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 36.6, lng: 114.5, place: '宿州（今安徽宿州）' },
    desc: '明朝开国名将，随朱元璋起兵，参与平定陈友谅、张士诚，北伐元朝，镇守西北。功封颍国公。后因牵连胡惟庸案，与蓝玉同案被杀。',
    achievements: ['北伐元朝', '镇守西北', '开国名将'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'lan_yu', name: '蓝玉', birth: ? , death: 1393,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 23.4, lng: 108.3, place: '定远（今安徽定远）' },
    desc: '明朝开国名将，常遇春妻舅。随傅友德北伐，随徐达镇守北平。捕鱼儿海大捷，俘虏元朝皇室，威震塞外。后居功自傲，多有不法，被朱元璋以谋反罪诛杀，牵连一万五千余人，史称"蓝玉案"。',
    achievements: ['捕鱼儿海大捷', '北伐立功', '威震塞外'],
    relations: [{ id: 'chang_yuchun', type: '姻亲', label: '常遇春（妻舅）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'tang_he', name: '汤和', birth: 1326, death: 1395,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 33.0, lng: 117.5, place: '濠州（今安徽凤阳）' },
    desc: '明朝开国名将，朱元璋同乡、发小。随朱元璋渡江，参与平定陈友谅、张士诚，北伐元朝，镇守北平。是少数能够善终的开国功臣之一。',
    achievements: ['渡江起兵', '北伐元朝', '善终于官'],
    relations: [{ id: 'zhu_yuanzhang', type: '同乡', label: '朱元璋（发小）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'zhu_shouqian', name: '朱守谦', birth: 1345, death: 1392,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 25.3, lng: 110.3, place: '桂林（今广西桂林）' },
    desc: '朱元璋侄子，封靖江王，镇守广西桂林。是明朝唯一的非太子封王实例，也是明朝第一代藩王，为后来靖江王世系之始。',
    achievements: ['封藩靖江', '镇守广西'],
    relations: [{ id: 'zhu_yuanzhang', type: '叔侄', label: '朱元璋（叔父）' }],
    events: []
  },
  {
    id: 'li_fang', name: '李善长', birth: 1314, death: 1390,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 33.0, lng: 118.3, place: '濠州定远（今安徽定远）' },
    desc: '明朝开国功臣第一文臣，朱元璋称其为"萧何"。负责后勤供应、制定法令、治理地方。封韩国公，为六公之首。后因牵连胡惟庸案，被诛杀，全家七十余口被杀。',
    achievements: ['制定法令', '后勤供给', '开国第一文臣', '六公之首'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'hu_weitong', name: '胡惟庸', birth: ? , death: 1380,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 33.0, lng: 118.3, place: '濠州定远（今安徽定远）' },
    desc: '明朝初期权相，最后一任中书省丞相。独断专行，排斥异己，勾结北元。后被朱元璋以谋反罪诛杀，连坐者三万余人。朱元璋借此废除丞相制度，分中书省之权于六部，皇权专制达到顶峰。',
    achievements: ['权倾一时'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: []
  },
  {
    id: 'deng_yu', name: '邓愈', birth: 1337, death: 1378,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 29.7, lng: 115.9, place: '虹县（今安徽泗县）' },
    desc: '明朝开国名将，十六岁即领兵，骁勇善战。随朱元璋渡江，参与平定陈友谅，北伐立功。镇守南阳、襄阳，后病逝于军中。',
    achievements: ['渡江从军', '北伐有功', '镇守南阳'],
    relations: [{ id: 'zhu_yuanzhang', type: '君臣', label: '朱元璋（君主）' }],
    events: ['e_ming_founded']
  },
  {
    id: 'mu_sheng', name: '沐英', birth: 1345, death: 1392,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 25.0, lng: 102.7, place: '定远（今安徽定远）' },
    desc: '明朝开国名将，朱元璋养子。随养父征战南北，平定云南，镇守云南十年。发展农业，传播文化，与夷民关系融洽。其后裔世代镇守云南，直至明朝灭亡（黔国公）。',
    achievements: ['平定云南', '镇守云南', '沐氏镇滇'],
    relations: [{ id: 'zhu_yuanzhang', type: '养子', label: '朱元璋（养父）' }],
    events: []
  },
  {
    id: 'lu_zhi', name: '陆贽', birth: 754, death: 805,
    cat: 'philosopher', dynasty: '唐', emoji: '📖',
    location: { lat: 31.3, lng: 120.6, place: '苏州嘉兴（今浙江嘉兴）' },
    desc: '（注：唐人误排）明代著名政治家为解缙，详见永乐时期。',
    achievements: [],
    relations: [],
    events: []
  },
  {
    id: 'jie_an', name: '解缙', birth: 1369, death: 1415,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 25.9, lng: 115.4, place: '吉水（今江西吉安）' },
    desc: '明朝第一才子，博学多才。主持编纂《永乐大典》，这是中国历史上最大的一部百科全书式类书。性格刚直，因直言触怒朱棣，被贬交趾，后被锦衣卫浸于雪地而死。',
    achievements: ['编纂《永乐大典》', '明朝第一才子'],
    relations: [{ id: 'yongle', type: '君臣', label: '朱棣（君主）' }],
    events: ['e_yongle_qianba']
  },

  // ---- 建文与靖难 ----
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
    id: 'fang_xiaoru', name: '方孝孺', birth: 1357, death: 1402,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 32.0, lng: 118.8, place: '宁海（今浙江宁海）' },
    desc: '建文帝近臣，著名儒学大师，名满天下。燕王朱棣攻入南京后，命其起草即位诏书，方孝孺拒写，并在诏书上写"燕贼篡位"四字，被朱棣诛灭十族（史上唯一被诛十族者），死者八百余人。',
    achievements: ['儒学大师', '拒绝草诏', '被诛十族'],
    relations: [{ id: 'jianwen', type: '君臣', label: '建文帝（君主）' }],
    events: ['e_jingnan']
  },
  {
    id: 'huang_wending', name: '黄文定', birth: ? , death: 1402,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 28.9, lng: 115.8, place: '临川（今江西抚州）' },
    desc: '建文帝近臣，靖难之役中为都督，坚守南京城。城破后被俘，与方孝孺等同时殉难，是建文忠臣代表之一。',
    achievements: ['坚守南京', '殉难尽忠'],
    relations: [{ id: 'jianwen', type: '君臣', label: '建文帝（君主）' }],
    events: ['e_jingnan']
  },
  {
    id: 'zhu_di', name: '明成祖朱棣（永乐帝）', birth: 1360, death: 1424,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北平/北京' },
    desc: '明朝第三位皇帝，通过靖难之役夺取侄子建文帝的皇位。迁都北京，命郑和下西洋，编修《永乐大典》，开创永乐盛世。',
    achievements: ['迁都北京', '郑和下西洋', '《永乐大典》', '靖难之役', '永乐盛世'],
    relations: [
      { id: 'zhu_yuanzhang', type: '父子', label: '朱元璋（父亲）' },
      { id: 'zheng_he', type: '君臣', label: '郑和' },
      { id: 'jianwen', type: '叔侄', label: '建文帝（侄子）' }
    ],
    events: ['e_yongle_qianba', 'e_zhenghe_voyage', 'e_jingnan']
  },
  {
    id: 'zhu_gaoxu', name: '明仁宗朱高炽（洪熙帝）', birth: 1378, death: 1425,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明朝第四位皇帝，朱棣长子。在位仅一年（洪熙元年），但实行宽政，废除永乐年间的一些苛政，停止下西洋，平反建文旧臣，恢复科举，为"仁宣之治"奠基。体态肥胖，据说有足疾。',
    achievements: ['宽政爱民', '平反建文旧臣', '停止下西洋', '仁宣之治奠基'],
    relations: [{ id: 'yongle', type: '父子', label: '朱棣（父亲）' }],
    events: []
  },
  {
    id: 'zhu_zhanji', name: '明宣宗朱瞻基', birth: 1398, death: 1435,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明朝第五位皇帝，与父亲明仁宗共同开创"仁宣之治"，是明朝的黄金时代。知人善任，励精图治，平定汉王朱高煦之乱，继承并完善文官制度。',
    achievements: ['仁宣之治', '平定汉王之乱', '文治武功'],
    relations: [{ id: 'zhu_gaoxu', type: '父子', label: '朱高炽（父亲）' }],
    events: []
  },
  {
    id: 'yang_shiqi', name: '杨士奇', birth: 1365, death: 1444,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 27.8, lng: 115.3, place: '泰和（今江西泰和）' },
    desc: '明朝著名内阁大学士，"三杨"之首。辅佐仁宗、宣宗、英宗（幼年），为永乐至正统年间名臣之首。主持编修《实录》，一代名臣。',
    achievements: ['三杨之首', '辅政名臣', '编修《实录》'],
    relations: [{ id: 'zhu_zhanji', type: '君臣', label: '宣宗（君主）' }],
    events: []
  },
  {
    id: 'yang_rong', name: '杨荣', birth: 1371, death: 1440,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 24.4, lng: 118.1, place: '闽县（今福建福州）' },
    desc: '明朝著名内阁大学士，"三杨"之一。机敏有谋，历事永乐、洪熙、宣德、正统四朝，多所建树，善断大事。',
    achievements: ['三杨之一', '历事四朝', '善断大事'],
    relations: [{ id: 'zhu_zhanji', type: '君臣', label: '宣宗（君主）' }],
    events: []
  },
  {
    id: 'yang_pu', name: '杨溥', birth: 1372, death: 1446,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.4, lng: 112.2, place: '石首（今湖北石首）' },
    desc: '明朝著名内阁大学士，"三杨"之一。历事永乐至天顺诸朝，操守清廉，为士林所重。与杨士奇、杨荣并称"三杨"。',
    achievements: ['三杨之一', '操守清廉'],
    relations: [{ id: 'zhu_zhanji', type: '君臣', label: '宣宗（君主）' }],
    events: []
  },
  {
    id: 'zhou_ji', name: '周忱', birth: 1381, death: 1453,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 31.2, lng: 120.6, place: '吉水（今江西吉安）' },
    desc: '明朝著名理财专家，宣德、正统年间任江南巡抚。改革江南赋税制度，创"平米法"，减轻百姓负担，国库充盈，被誉为明代最会理财的大臣之一。',
    achievements: ['平米法', '改革赋税', '理财名臣'],
    relations: [{ id: 'zhu_zhanji', type: '君臣', label: '宣宗（君主）' }],
    events: []
  },
  {
    id: 'zhang_fu', name: '张辅', birth: 1375, death: 1449,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明朝名将，明初靖难功臣张玉之子，三定安南，四次出师平安南，威震西南。后随明英宗参加土木堡之变，随驾亲征，死于乱军之中。',
    achievements: ['三定安南', '平安南有功', '土木堡殉难'],
    relations: [{ id: 'yongle', type: '君臣', label: '朱棣（君主）' }],
    events: ['e_tumubao']
  },
  {
    id: 'zheng_he', name: '郑和', birth: 1371, death: 1433,
    cat: 'politician', dynasty: '明', emoji: '⚓',
    location: { lat: 24.4, lng: 118.1, place: '昆阳州（今云南昆明）' },
    desc: '明朝航海家、外交家，七下西洋，最远到达非洲东海岸和红海沿岸，是世界航海史上的壮举，比哥伦布发现美洲早了近百年。',
    achievements: ['七下西洋', '促进东西方交流', '最远到达非洲', '世界航海先驱'],
    relations: [{ id: 'yongle', type: '君臣', label: '朱棣（派遣下西洋）' }],
    events: ['e_zhenghe_voyage']
  },

  // ---- 土木堡前后 ----
  {
    id: 'zhu_qizhen', name: '明英宗朱祁镇', birth: 1427, death: 1464,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第六位皇帝，宠信太监王振，御驾亲征瓦剌，在土木堡被俘，史称"土木堡之变"。被俘一年后获释回京，被软禁南宫七年。发动夺门之变复辟，冤杀于谦，但废除了残酷的殉葬制度。',
    achievements: ['废除殉葬制度', '亲征瓦剌', '夺门之变复辟'],
    relations: [{ id: 'yu_qian', type: '对立', label: '于谦（冤杀）' }, { id: 'wang_zhen', type: '宠信', label: '王振（太监）' }],
    events: ['e_tumubao', 'e_duomen']
  },
  {
    id: 'yu_qian', name: '于谦', birth: 1398, death: 1457,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.3, lng: 120.2, place: '钱塘（今浙江杭州）' },
    desc: '明朝名臣、民族英雄。土木堡之变后，力排众议坚守北京，拥立景帝，组织北京保卫战，击退瓦剌也先大军，挽救了大明王朝。后遭英宗复辟冤杀，"千锤万凿出深山，烈火焚烧若等闲"，其《石灰吟》恰如其一生。',
    achievements: ['北京保卫战', '力挽狂澜', '《石灰吟》', '民族英雄'],
    relations: [{ id: 'zhu_qizhen', type: '对立', label: '朱祁镇（冤杀之）' }],
    events: ['e_tumubao']
  },
  {
    id: 'wang_zhen', name: '王振', birth: ? , death: 1449,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '山西蔚州（今河北蔚县）' },
    desc: '明朝第一代权宦，明英宗宠信的司礼监太监。怂恿英宗御驾亲征瓦剌，导致土木堡之变，二十万大军全军覆没，王振本人死于乱军之中。',
    achievements: ['怂恿亲征', '土木堡惨败'],
    relations: [{ id: 'zhu_qizhen', type: '宠信', label: '英宗（宠信）' }],
    events: ['e_tumubao']
  },
  {
    id: 'zhu_yu', name: '明代宗朱祁钰（景泰帝）', birth: 1428, death: 1457,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明朝第七位皇帝，英宗之弟。土木堡之变后被拥立为帝，组织北京保卫战，重用于谦，击退瓦剌。英宗回京后被软禁。后英宗发动夺门之变复辟，景泰帝被降为郕王，一个月后死去。',
    achievements: ['北京保卫战', '重用于谦', '景泰中兴'],
    relations: [{ id: 'zhu_qizhen', type: '兄弟', label: '英宗（兄长）' }, { id: 'yu_qian', type: '君臣', label: '于谦（重用）' }],
    events: ['e_tumubao']
  },
  {
    id: 'shi_yuan', name: '石亨', birth: ? , death: 1460,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 40.8, lng: 109.8, place: '渭南（今陕西渭南）' },
    desc: '明朝将领，北京保卫战主将之一，功封武清伯。参与发动夺门之变，迎英宗复辟，功封忠国公。后因专权跋扈，被指控谋反，下狱而死。',
    achievements: ['北京保卫战', '夺门之变', '迎英宗复辟'],
    relations: [{ id: 'zhu_qizhen', type: '君臣', label: '英宗（拥立）' }],
    events: ['e_tumubao', 'e_duomen']
  },
  {
    id: 'xu_zhu', name: '徐有贞', birth: 1407, death: 1472,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 33.5, lng: 117.3, place: '吴县（今江苏苏州）' },
    desc: '明朝大臣，策划并参与夺门之变，迎英宗复辟，功授兵部尚书兼文渊阁大学士。后因与石亨争权，被贬广东，病死于途中。',
    achievements: ['策划夺门之变', '迎英宗复辟'],
    relations: [{ id: 'zhu_qizhen', type: '君臣', label: '英宗（拥立）' }],
    events: ['e_duomen']
  },
  {
    id: 'cao_qun', name: '曹吉祥', birth: ? , death: 1461,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明朝宦官，参与夺门之变有功，与石亨勾结专权，人称"石曹"。后图谋不轨，被英宗下令族诛。',
    achievements: ['夺门之变有功'],
    relations: [{ id: 'zhu_qizhen', type: '君臣', label: '英宗（宦官）' }],
    events: ['e_duomen']
  },

  // ---- 成化至弘治 ----
  {
    id: 'zhu_jian', name: '明宪宗朱见深', birth: 1447, death: 1487,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第八位皇帝，即位后为于谦平反。宠信万贵妃和宦官汪直，设西厂，酷刑峻法。但也有成化梨花的政治清明一面，经济文化有所发展。',
    achievements: ['为于谦平反', '成化年间繁荣'],
    relations: [{ id: 'zhu_qizhen', type: '父子', label: '英宗（父亲）' }],
    events: []
  },
  {
    id: 'wang_zhi', name: '汪直', birth: ? , death: ? ,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '广西' },
    desc: '明宪宗时权宦，西厂创立者。权倾朝野，后因失宠被贬南京，天下人闻之大快。',
    achievements: ['创立西厂'],
    relations: [{ id: 'zhu_jian', type: '宠信', label: '宪宗（宠信）' }],
    events: []
  },
  {
    id: 'zhu_yout', name: '明孝宗朱祐樘', birth: 1470, death: 1505,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第九位皇帝，明代评价最高的皇帝之一。铲除万贵妃及其党羽，驱除佞幸，勤于政事，提倡文官共治，开创"弘治中兴"。一夫一妻，是历史上唯一实行一夫一妻制的皇帝。',
    achievements: ['弘治中兴', '铲除阉党', '一夫一妻', '勤政爱民'],
    relations: [],
    events: []
  },
  {
    id: 'liu_yuj', name: '刘健', birth: 1433, death: 1526,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 34.7, lng: 112.4, place: '洛阳（今河南洛阳）' },
    desc: '明朝名臣，内阁首辅，弘治年间与谢迁、李东阳并称"弘治三君子"。辅佐孝宗开创弘治中兴，敢于直谏，为士林所敬仰。',
    achievements: ['弘治三君子', '辅政中兴'],
    relations: [{ id: 'zhu_yout', type: '君臣', label: '孝宗（首辅）' }],
    events: []
  },
  {
    id: 'xie_qian', name: '谢迁', birth: 1449, death: 1531,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.3, lng: 120.2, place: '余姚（今浙江余姚）' },
    desc: '明朝名臣，内阁大学士，与刘健、李东阳并称"弘治三君子"。弘治年间辅政，正德初年因反对刘瑾辞官，刘瑾伏诛后复官。',
    achievements: ['弘治三君子', '弘治辅政'],
    relations: [{ id: 'zhu_yout', type: '君臣', label: '孝宗（大学士）' }],
    events: []
  },
  {
    id: 'li_dongyang', name: '李东阳', birth: 1447, death: 1516,
    cat: 'philosopher', dynasty: '明', emoji: '🏛️',
    location: { lat: 28.6, lng: 115.9, place: '茶陵（今湖南茶陵）' },
    desc: '明朝著名文学家、政治家，与刘健、谢迁并称"弘治三君子"。文学上为"茶陵诗派"领袖，执政期间为孝宗所重，但因刘瑾专权，无法施展抱负。',
    achievements: ['弘治三君子', '茶陵诗派', '《怀麓堂集》'],
    relations: [{ id: 'zhu_yout', type: '君臣', label: '孝宗（大学士）' }],
    events: []
  },

  // ---- 正德 ----
  {
    id: 'zhu_houz', name: '明武宗朱厚照', birth: 1491, death: 1521,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第十位皇帝，个性张扬，宠信刘瑾等宦官，建豹房，自封"威武大将军"，多次巡游。正德年间民间起义不断，但其本人颇有军事才能，应州之战大败小王子。',
    achievements: ['应州大捷', '豹房文化'],
    relations: [{ id: 'zhu_yout', type: '父子', label: '孝宗（父亲）' }],
    events: []
  },
  {
    id: 'liu_jin', name: '刘瑾', birth: 1451, death: 1510,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '陕西兴平' },
    desc: '明武宗时权宦，八虎之首。人称"立皇帝"，权倾一时，贪污受贿无数。正德五年被杨一清与张永联合揭发，以谋反罪被凌迟处死，家产籍没。',
    achievements: ['权倾一时', '刘瑾变法'],
    relations: [{ id: 'zhu_houz', type: '宠信', label: '武宗（宠信）' }],
    events: []
  },
  {
    id: 'yang_yiq', name: '杨一清', birth: 1454, death: 1530,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 31.9, lng: 117.2, place: '镇江（今江苏镇江）' },
    desc: '明朝名臣，弘治、正德、嘉靖三朝重臣。计除刘瑾，镇守西北，平定安化王之乱。官至首辅，为明代少有的文武兼备之名臣。',
    achievements: ['计除刘瑾', '镇守西北', '平定安化王'],
    relations: [{ id: 'zhu_houz', type: '君臣', label: '武宗（名臣）' }],
    events: []
  },
  {
    id: 'wang_yangming', name: '王阳明（王守仁）', birth: 1472, death: 1529,
    cat: 'philosopher', dynasty: '明', emoji: '💡',
    location: { lat: 29.8, lng: 121.5, place: '余姚（今浙江余姚）' },
    desc: '明代著名哲学家、军事家、政治家，心学集大成者。提出"心即理""知行合一""致良知"等哲学命题，影响了东亚哲学数百年。龙场悟道开宗立派，平定宁王之乱展现军事奇才，一生文武兼备。',
    achievements: ['心学集大成', '知行合一', '龙场悟道', '平定宁王之乱', '致良知', '三不朽'],
    relations: [],
    events: []
  },
  {
    id: 'ning_wang', name: '宁王朱宸濠', birth: 1479, death: 1521,
    cat: 'politician', dynasty: '明', emoji: '⚔️',
    location: { lat: 28.6, lng: 115.9, place: '南昌（今江西南昌）' },
    desc: '明太祖十七世孙，宁康王之子。蓄谋造反十年，以祝枝山等人为谋士，于正德十四年（1519年）起兵叛乱，仅43天即被王阳明平定，本人也被擒获，后被诛杀。',
    achievements: ['宁王之乱（43天即败）'],
    relations: [{ id: 'zhu_houz', type: '对立', label: '武宗（反叛）' }],
    events: []
  },
  {
    id: 'zhu_gaoxi', name: '明世宗朱厚熜（嘉靖帝）', birth: 1507, death: 1566,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第十一位皇帝，在位45年，为明朝皇帝之最。即位后大礼议之争胜出。嘉靖年间政治黑暗，严嵩专权，但也有嘉靖中兴的一面。崇道炼丹，二十余年不上朝，国家机器照常运转。',
    achievements: ['大礼议', '嘉靖中兴', '在位45年'],
    relations: [{ id: 'zhu_houz', type: '堂兄', label: '武宗（堂兄）' }],
    events: []
  },
  {
    id: 'yan_song', name: '严嵩', birth: 1480, death: 1567,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 27.8, lng: 114.4, place: '分宜（今江西新余）' },
    desc: '明朝权臣，专国政近二十年，贪污腐败，排斥异己，杀害忠良夏言、杨继盛等。其子严世蕃更为跋扈，卖官鬻爵。最终被邹应龙弹劾倒台，严世蕃伏诛，严嵩寄食墓舍而死。',
    achievements: ['专权二十年'],
    relations: [],
    events: []
  },
  {
    id: 'xia_yan', name: '夏言', birth: 1482, death: 1548,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 28.9, lng: 115.8, place: '贵溪（今江西贵溪）' },
    desc: '明朝名臣，敢于直谏，曾任首辅。早期受世宗信任，后因与严嵩争权失败，被严嵩诬陷，以"欺君罔上"罪被杀。',
    achievements: ['敢于直谏', '早期首辅'],
    relations: [{ id: 'zhu_gaoxi', type: '君臣', label: '世宗（君主）' }],
    events: []
  },
  {
    id: 'yang_jish', name: '杨继盛', birth: 1518, death: 1555,
    cat: 'politician', dynasty: '明', emoji: '⚖️',
    location: { lat: 38.9, lng: 115.4, place: '容城（今河北容城）' },
    desc: '明朝忠臣，因弹劾仇鸾开马市之议被下狱，后又弹劾严嵩"五奸十大罪"，被严嵩构陷下狱，受尽酷刑，终被处死。临刑前作诗"浩气还太虚，丹心照千古"。',
    achievements: ['弹劾严嵩', '丹心照千古'],
    relations: [{ id: 'zhu_gaoxi', type: '君臣', label: '世宗（忠臣）' }],
    events: []
  },
  {
    id: 'zou_yingl', name: '邹应龙', birth: 1521, death: 1580,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 25.5, lng: 103.8, place: '云南' },
    desc: '明朝大臣，因弹劾严嵩父子而闻名。嘉靖四十一年上疏弹劾严嵩父子"十大罪"，终使严嵩倒台，严世蕃伏诛。为官清廉，后官至兵部尚书。',
    achievements: ['弹劾倒严', '扳倒权臣'],
    relations: [{ id: 'zhu_gaoxi', type: '君臣', label: '世宗（大臣）' }],
    events: []
  },
  {
    id: 'qi_jiguang', name: '戚继光', birth: 1528, death: 1588,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 37.5, lng: 121.4, place: '登州（今山东蓬莱）' },
    desc: '明朝抗倭名将、军事家。在东南沿海抗击倭寇十余年，创立"鸳鸯阵"，组建训练有素的"戚家军"，大小百余战未尝败绩。后镇守北疆，修筑蓟镇长城，抵御蒙古。著有《纪效新书》《练兵实纪》。',
    achievements: ['平定倭患', '创立鸳鸯阵', '戚家军', '《纪效新书》', '修筑长城'],
    relations: [{ id: 'zhang_juzheng', type: '同盟', label: '张居正（支持者）' }],
    events: ['e_anti_wako']
  },
  {
    id: 'qi_zhi', name: '戚继光（与上同一人，此为别名条目）', birth: 1528, death: 1588,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 37.5, lng: 121.4, place: '登州（今山东蓬莱）' },
    desc: '（戚继光条目别名，此处补充其北疆功绩）镇守蓟镇十六年，改革兵制，练兵有方，使蓟镇防线固若金汤，边境安宁。',
    achievements: ['镇守蓟镇', '改革兵制', '边境安宁'],
    relations: [],
    events: []
  },
  {
    id: 'yu_dayou', name: '俞大猷', birth: 1503, death: 1580,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 24.4, lng: 118.1, place: '晋江（今福建泉州）' },
    desc: '明朝抗倭名将，与戚继光并称"俞戚"。精通兵法，善于陆战和水战，在东南沿海抗倭中屡立战功。虽多次受到不公正待遇，仍矢志报国。',
    achievements: ['抗倭名将', '俞戚并称', '精通兵法'],
    relations: [],
    events: ['e_anti_wako']
  },
  {
    id: 'xu_gai', name: '徐阶', birth: 1503, death: 1583,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 31.0, lng: 121.1, place: '华亭（今上海松江）' },
    desc: '明朝名臣，内阁首辅。嘉靖末年联合徐阶等人扳倒严嵩，为严嵩政敌。任首辅期间改革弊政，起用张居正等能臣，为隆庆、万历改革奠基。',
    achievements: ['扳倒严嵩', '奠基隆万改革'],
    relations: [{ id: 'zhu_gaoxi', type: '君臣', label: '世宗（首辅）' }],
    events: []
  },
  {
    id: 'hai_rui', name: '海瑞', birth: 1514, death: 1587,
    cat: 'politician', dynasty: '明', emoji: '⚖️',
    location: { lat: 19.9, lng: 110.3, place: '琼山（今海南海口）' },
    desc: '明朝著名清官，人称"海青天""南包公"。任户部主事时上疏《治安疏》痛斥嘉靖帝，被下狱论死，嘉靖死后获释。任应天巡抚时推行退田还民、严惩贪腐，遭权贵排挤去职。一生清贫，死时家无余财。',
    achievements: ['上疏痛斥嘉靖', '海青天', '《治安疏》', '清官典范'],
    relations: [{ id: 'zhang_juzheng', type: '对立', label: '张居正（政敌）' }],
    events: []
  },
  {
    id: 'zhu_gaos', name: '明穆宗朱载坖（隆庆帝）', birth: 1537, death: 1572,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第十二位皇帝，在位仅六年。政治上倚重徐阶、高拱、张居正等名臣，实行隆庆开关（允许民间海外贸易）和俺答封贡（与蒙古和议），为万历中兴奠基。',
    achievements: ['隆庆开关', '俺答封贡', '隆万中兴奠基'],
    relations: [{ id: 'zhu_gaoxi', type: '父子', label: '世宗（父亲）' }],
    events: []
  },
  {
    id: 'gao_gong', name: '高拱', birth: 1513, death: 1578,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 34.7, lng: 112.4, place: '新郑（今河南新郑）' },
    desc: '明朝名臣，内阁首辅，隆庆年间辅政。辅佐隆庆帝，处理政务颇有成效。后因与张居正争权，被罢官。',
    achievements: ['隆庆辅政', '处理政务'],
    relations: [{ id: 'zhu_gaos', type: '君臣', label: '穆宗（首辅）' }],
    events: []
  },

  // ---- 万历 ----
  {
    id: 'zhu_yilong', name: '万历帝朱翊钧', birth: 1563, death: 1620,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝在位时间最长的皇帝（48年），前十年在张居正辅政下出现"万历中兴"。亲政后清算张居正，因立储之争与群臣对抗，长达28年不上朝，被称为"怠政皇帝"。万历三大征虽全胜，但国库耗尽，"明亡于万历"成为后世共识。',
    achievements: ['万历三大征', '万历中兴（前期）', '在位48年'],
    relations: [{ id: 'zhang_juzheng', type: '君臣', label: '张居正（首辅）' }],
    events: ['e_wanli_zhongxing', 'e_wanli_three_war']
  },
  {
    id: 'zhang_juzheng', name: '张居正', birth: 1525, death: 1582,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.4, lng: 112.2, place: '江陵（今湖北荆州）' },
    desc: '明朝最杰出的改革家、政治家，万历初年内阁首辅。推行"一条鞭法"改革赋税，清丈田地，整顿吏治实行"考成法"，使国库充盈，太仓积粟可支十年。但作风专断，死后遭万历清算抄家，改革成果逐渐被废。',
    achievements: ['一条鞭法', '考成法', '万历中兴', '清丈田地', '改革名相'],
    relations: [],
    events: ['e_wanli_zhongxing']
  },
  {
    id: 'zhu_yous', name: '明神宗（见上方万历帝）', birth: 1563, death: 1620,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '万历帝朱翊钧，即明神宗，明朝在位最长的皇帝。详见万历帝条目。',
    achievements: ['万历三大征'],
    relations: [],
    events: ['e_wanli_zhongxing', 'e_wanli_three_war']
  },
  {
    id: 'pan_zhen', name: '潘季驯', birth: 1526, death: 1590,
    cat: 'scientist', dynasty: '明', emoji: '🌊',
    location: { lat: 30.2, lng: 120.2, place: '乌程（今浙江湖州）' },
    desc: '明朝著名水利专家，四任河道总督。提出"束水攻沙"理论，系统治理黄河、淮河、运河，成效显著。其治河理论和实践，为明代水利工程最高成就。',
    achievements: ['束水攻沙', '治理黄河', '明代水利最高成就'],
    relations: [],
    events: []
  },
  {
    id: 'zheng_xiao', name: '郑晓', birth: 1499, death: 1566,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.3, lng: 120.2, place: '海盐（今浙江海盐）' },
    desc: '明朝名臣，嘉靖年间抗倭有功，著有《今言》，记录了大量明代政治和社会史料。官至兵部尚书。',
    achievements: ['抗倭有功', '《今言》史料'],
    relations: [],
    events: ['e_anti_wako']
  },
  {
    id: 'tang_shunz', name: '唐顺之', birth: 1507, death: 1560,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 31.4, lng: 119.5, place: '武进（今江苏常州）' },
    desc: '明朝著名文学家、军事家。嘉靖年间抗倭有功，与王慎中并称"王唐"，为明代唐宋派代表作家之一。兼通武艺，亲率水师抗倭。',
    achievements: ['抗倭有功', '唐宋派代表', '文武兼备'],
    relations: [],
    events: ['e_anti_wako']
  },
  {
    id: 'liu_shiz', name: '刘显', birth: ? , death: 1581,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 30.6, lng: 114.3, place: '南昌（今江西南昌）' },
    desc: '明朝抗倭名将，与戚继光、俞大猷并称抗倭三杰。镇守东南沿海，抗击倭寇，功勋卓著。后镇守北方，抵御蒙古入侵。',
    achievements: ['抗倭名将', '三杰之一'],
    relations: [],
    events: ['e_anti_wako']
  },
  {
    id: 'yang_yuan', name: '杨镐', birth: ? , death: 1628,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 41.8, lng: 123.4, place: '河南' },
    desc: '明朝将领，万历年间的军事统帅。万历二十五年（1597年）率军援朝抗倭，在蔚山之战中被日军大败。万历四十七年（1619年）指挥萨尔浒之战讨伐后金，大败，明军精锐尽失，此战成为明清（后金）命运的转折点。',
    achievements: ['援朝抗倭', '萨尔浒大败'],
    relations: [],
    events: []
  },
  {
    id: 'li_rusong', name: '李如松', birth: 1549, death: 1598,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 41.8, lng: 123.4, place: '辽东铁岭（今辽宁铁岭）' },
    desc: '明朝抗倭援朝名将，李成梁之子。万历二十一年率军援朝抗倭，在平壤之战中大败日军，斩杀一万余人，收复平壤，是抗倭援朝战争中明军最辉煌的胜利。',
    achievements: ['平壤大捷', '援朝抗倭', '李成梁之子'],
    relations: [],
    events: []
  },
  {
    id: 'li_chengliang', name: '李成梁', birth: 1526, death: 1615,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 41.8, lng: 123.4, place: '铁岭（今辽宁铁岭）' },
    desc: '明朝后期名将，镇守辽东近三十年，多次击退蒙古和女真的入侵。但同时培植了努尔哈赤的势力，为日后清朝建立埋下隐患。其子李如松、李如柏等皆为明末名将。',
    achievements: ['镇守辽东', '多次击退外敌', '培育努尔哈赤势力'],
    relations: [],
    events: []
  },
  {
    id: 'nai_de', name: '乃蛮', birth: 1559, death: 1626,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 41.8, lng: 123.4, place: '辽东' },
    desc: '（注：此为努尔哈赤，在清条目标注）',
    achievements: [],
    relations: [],
    events: []
  },

  // ---- 万历至天启 ----
  {
    id: 'zhu_youch', name: '明光宗朱常洛', birth: 1582, death: 1620,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第十四位皇帝，在位仅一个月（泰昌帝）。因"红丸案"服药身亡，在位期间发生移宫案。是明朝在位时间最短的皇帝，明末党争由此激化。',
    achievements: ['即位一个月', '红丸案', '泰昌帝'],
    relations: [{ id: 'zhu_yilong', type: '父子', label: '万历（父亲）' }],
    events: []
  },
  {
    id: 'zhu_yix', name: '明熹宗朱由校', birth: 1605, death: 1627,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝第十五位皇帝，木匠皇帝。酷爱木工技艺，将政事全权交给魏忠贤处理，导致阉党专权，明朝政治极度黑暗。但其木匠手艺精湛，制作的漆器、木器极为精美。',
    achievements: ['木匠皇帝', '木艺精湛'],
    relations: [{ id: 'chongzhen', type: '兄弟', label: '崇祯（弟弟）' }],
    events: []
  },
  {
    id: 'wei_zhongxian', name: '魏忠贤', birth: 1568, death: 1627,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '肃宁（今河北肃宁）' },
    desc: '明末权阉，号称"九千岁"，天启年间把持朝政，迫害东林党人，全国各地为其建生祠。崇祯帝即位后将其铲除，阉党覆灭，但明朝元气已大伤，加速了灭亡进程。',
    achievements: ['九千岁', '阉党专权', '迫害东林党'],
    relations: [{ id: 'chongzhen', type: '对立', label: '崇祯帝（铲除者）' }],
    events: []
  },
  {
    id: 'mu_chang', name: '客氏', birth: ? , death: 1627,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明熹宗乳母，与魏忠贤对食（宦官与宫女配对），二人联手把持后宫，干预朝政，人称"客魏"。崇祯帝即位后被处置。',
    achievements: ['客魏联手', '干预朝政'],
    relations: [{ id: 'zhu_yix', type: '关系', label: '熹宗（乳母）' }],
    events: []
  },
  {
    id: 'yang_yuanw', name: '杨涟', birth: 1572, death: 1625,
    cat: 'politician', dynasty: '明', emoji: '⚖️',
    location: { lat: 30.4, lng: 113.9, place: '应山（今湖北广水）' },
    desc: '明朝忠臣，东林党人。天启年间冒死弹劾魏忠贤二十四大罪，被魏忠贤诬陷下狱，受尽"土囊压身、铁钉贯耳"等酷刑，终被杀害，临死前留下血书。',
    achievements: ['弹劾魏忠贤', '东林党人', '血书遗言'],
    relations: [],
    events: []
  },
  {
    id: 'zuo_guangdou', name: '左光斗', birth: 1575, death: 1625,
    cat: 'politician', dynasty: '明', emoji: '⚖️',
    location: { lat: 30.5, lng: 116.9, place: '桐城（今安徽桐城）' },
    desc: '明朝忠臣，东林党人，杨涟挚友。与杨涟共同弹劾魏忠贤，被诬陷下狱，受酷刑而死。其学生史可法后来成为抗清名将。',
    achievements: ['东林党人', '弹劾魏忠贤'],
    relations: [{ id: 'yang_yuanw', type: '战友', label: '杨涟（挚友）' }],
    events: []
  },
  {
    id: 'zhu_guang', name: '朱国祚', birth: 1558, death: 1629,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 30.9, lng: 120.6, place: '秀水（今浙江嘉兴）' },
    desc: '明朝名臣，明末东林党支持者。万历、泰昌、天启三朝重臣，官至首辅。为人正直，不畏权贵，曾上疏营救东林党人。',
    achievements: ['东林党支持者', '三朝重臣'],
    relations: [],
    events: []
  },
  {
    id: 'huang_daw', name: '黄道周', birth: 1585, death: 1646,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 24.5, lng: 117.6, place: '漳浦（今福建漳浦）' },
    desc: '明末著名理学家、书画家，南明重臣。清军入关后，在江西抵抗清兵，兵败被俘，誓不降清，被杀于南京。学问渊博，书法冠绝一代。',
    achievements: ['理学大家', '抗清殉国', '书法冠绝'],
    relations: [],
    events: []
  },
  {
    id: 'wen_zhenming', name: '文徵明', birth: 1470, death: 1559,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '长洲（今江苏苏州）' },
    desc: '明代四大书法家之一，诗书画三绝。与唐寅（唐伯虎）、祝允明、徐祯卿并称"吴中四才子"。书法诸体皆精，画尤以山水著称。',
    achievements: ['吴中四才子', '四大书法家', '诗书画三绝'],
    relations: [],
    events: []
  },
  {
    id: 'tang_yin', name: '唐寅（唐伯虎）', birth: 1470, death: 1524,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '吴县（今江苏苏州）' },
    desc: '明代著名画家、书法家、诗人，"江南四大才子"之首。字伯虎，号六如居士。才气横溢，放浪不羁，科场遭冤后绝意仕途，以卖画为生。代表作《落花诗》《漫兴诗》等。',
    achievements: ['江南第一才子', '吴中四才子', '唐伯虎点秋香'],
    relations: [],
    events: []
  },
  {
    id: 'zhu_yunming', name: '祝允明（祝枝山）', birth: 1461, death: 1527,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '长洲（今江苏苏州）' },
    desc: '明代著名书法家，与唐寅、文徵明、徐祯卿并称"吴中四才子"。书法诸体皆精，尤以草书著称，名列明代四大书法家。',
    achievements: ['吴中四才子', '明代四大书法家', '草书著称'],
    relations: [],
    events: []
  },
  {
    id: 'wu_chengen', name: '吴承恩', birth: 1500, death: 1582,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 33.6, lng: 119.0, place: '淮安（今江苏淮安）' },
    desc: '明代著名小说家，著有中国古典四大名著之一《西游记》。《西游记》以唐僧西天取经为蓝本，塑造了孙悟空、猪八戒等经典形象，影响深远。',
    achievements: ['《西游记》', '中国四大名著', '孙悟空形象'],
    relations: [],
    events: []
  },
  {
    id: 'cao_xueqin', name: '曹雪芹', birth: 1715, death: 1763,
    cat: 'artist', dynasty: '清', emoji: '🎭',
    location: { lat: 39.9, lng: 116.4, place: '江宁（今江苏南京）' },
    desc: '（注：清人）清代著名小说家，著有《红楼梦》。',
    achievements: ['《红楼梦》'],
    relations: [],
    events: []
  },
  {
    id: 'shi_nai', name: '施耐庵', birth: 1296, death: 1370,
    cat: 'artist', dynasty: '元', emoji: '🎭',
    location: { lat: 33.0, lng: 119.3, place: '兴化（今江苏兴化）' },
    desc: '（注：元末明初人）明代四大名著之一《水浒传》的作者。与罗贯中合著《三国演义》。',
    achievements: ['《水浒传》'],
    relations: [],
    events: []
  },
  {
    id: 'luo_guanzh', name: '罗贯中', birth: 1330, death: 1400,
    cat: 'artist', dynasty: '元', emoji: '🎭',
    location: { lat: 31.2, lng: 120.6, place: '太原（今山西太原）' },
    desc: '（注：元末明初人）明代著名小说家，著有中国古典四大名著之一《三国演义》。《三国演义》以三国历史为蓝本，塑造了诸葛亮、关羽、曹操等经典人物形象，影响深远。',
    achievements: ['《三国演义》'],
    relations: [],
    events: []
  },
  {
    id: 'xu_zhongyu', name: '徐祯卿', birth: 1479, death: 1511,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '吴县（今江苏苏州）' },
    desc: '明代著名文学家，"吴中四才子"之一，诗才冠绝，有"文妖"之称。早卒，未尽其才。',
    achievements: ['吴中四才子', '诗才冠绝'],
    relations: [],
    events: []
  },
  {
    id: 'dong_qichang', name: '董其昌', birth: 1555, death: 1636,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.0, lng: 121.1, place: '华亭（今上海松江）' },
    desc: '明代著名书画家、书画理论家，华亭派领袖。书法兼擅行、草、楷各体，画以山水见长。提出"南北宗论"，对中国画史影响深远。',
    achievements: ['华亭派领袖', '南北宗论', '书法大家'],
    relations: [],
    events: []
  },
  {
    id: 'wang_shimin', name: '王世贞', birth: 1526, death: 1590,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.8, lng: 121.1, place: '太仓（今江苏太仓）' },
    desc: '明代著名文学家、史学家，"后七子"领袖。文坛盟主四十余年，与李攀龙并称"王李"。兼通史学，著有《弇山堂别集》等。',
    achievements: ['后七子领袖', '文坛盟主', '《弇山堂别集》'],
    relations: [],
    events: []
  },
  {
    id: 'tang_xianzu', name: '汤显祖', birth: 1550, death: 1616,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 27.9, lng: 116.3, place: '临川（今江西抚州）' },
    desc: '明代戏曲家、文学家，被誉为"东方莎士比亚"。代表作《牡丹亭》写杜丽娘与柳梦梅生死之恋，"情不知所起，一往而深"成为千古名句。与莎士比亚同年去世。',
    achievements: ['《牡丹亭》', '临川四梦', '东方莎士比亚'],
    relations: [],
    events: []
  },
  {
    id: 'xu_wei', name: '徐渭', birth: 1521, death: 1593,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 29.9, lng: 120.9, place: '山阴（今浙江绍兴）' },
    desc: '明代著名书画家、文学家、戏曲家、军事家。号青藤老人。诗书画皆绝，郑板桥自称"青藤门下走狗"。才高八斗，命途多舛，多次自杀未遂。',
    achievements: ['青藤老人', '郑板桥崇拜', '诗书画绝'],
    relations: [],
    events: []
  },
  {
    id: 'li_mengyang', name: '李梦阳', birth: 1472, death: 1530,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 35.6, lng: 115.0, place: '庆阳（今甘肃庆阳）' },
    desc: '明代著名文学家，"前七子"领袖。提出"文必秦汉，诗必盛唐"，一扫台阁体萎靡之风，对明代文学复古运动影响深远。',
    achievements: ['前七子领袖', '文学复古'],
    relations: [],
    events: []
  },
  {
    id: 'wang_shu', name: '王绂', birth: 1362, death: 1416,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.7, lng: 119.9, place: '无锡（今江苏无锡）' },
    desc: '明代初期著名画家，以墨竹著称，有"王绂墨竹无双"之誉。永乐年间召入朝廷，其墨竹画影响后世数百年。',
    achievements: ['墨竹无双', '永乐画院'],
    relations: [{ id: 'yongle', type: '君臣', label: '朱棣（画家）' }],
    events: []
  },

  // ---- 科学家 ----
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
    id: 'xu_guangqi', name: '徐光启', birth: 1562, death: 1633,
    cat: 'scientist', dynasty: '明', emoji: '🌾',
    location: { lat: 31.2, lng: 121.5, place: '上海县（今上海）' },
    desc: '明末著名科学家，引进西方科学知识的先驱。编著《农政全书》，系统总结中国传统农业技术，并引进西方水利、历算知识。与利玛窦合译《几何原本》，开启中西科学交流。',
    achievements: ['《农政全书》', '引进西学', '《几何原本》合译'],
    relations: [],
    events: []
  },
  {
    id: 'wu_youx', name: '吴有性（吴又可）', birth: 1582, death: 1652,
    cat: 'scientist', dynasty: '明', emoji: '🌿',
    location: { lat: 31.3, lng: 120.6, place: '吴县（今江苏苏州）' },
    desc: '明末著名医学家，温病学奠基人。提出"戾气学说"，认为传染病是由空气中的"戾气"（病原体）所致，比西方细菌学早两百年。著有《瘟疫论》，是中医传染病学的开创性著作。',
    achievements: ['戾气学说', '《瘟疫论》', '温病学奠基'],
    relations: [],
    events: []
  },
  {
    id: 'zhu_shixing', name: '朱世澉', birth: ? , death: ? ,
    cat: 'scientist', dynasty: '明', emoji: '🔬',
    location: { lat: 33.0, lng: 118.0, place: '江苏' },
    desc: '明代科学家，著有《化学基础》等，介绍西方化学知识，开中国古代化学研究之先河。',
    achievements: ['西方化学引进'],
    relations: [],
    events: []
  },
  {
    id: 'xing_yun', name: '行昙', birth: ? , death: ? ,
    cat: 'scientist', dynasty: '明', emoji: '🔬',
    location: { lat: 29.5, lng: 103.0, place: '四川' },
    desc: '明代著名僧人科学家，精通天文历算，曾受朝廷征召，参与修历。其天文学知识融合中西，在明末历法改革中发挥作用。',
    achievements: ['修历贡献', '中西天文'],
    relations: [],
    events: []
  },
  {
    id: 'zhu_zai', name: '朱载堉', birth: 1536, death: 1611,
    cat: 'scientist', dynasty: '明', emoji: '🎵',
    location: { lat: 35.1, lng: 113.2, place: '怀庆（今河南沁阳）' },
    desc: '明宗室，郑恭王之子。创立"十二平均律"（新法密率），解决了困扰东西方音乐数千年的音律问题，被广泛应用于钢琴、手风琴等键盘乐器。精通数学、音乐、天文，是世界级的科学家。',
    achievements: ['十二平均律', '新法密率', '世界级科学家'],
    relations: [],
    events: []
  },
  {
    id: 'wang_xi', name: '王徵', birth: 1571, death: 1644,
    cat: 'scientist', dynasty: '明', emoji: '🔬',
    location: { lat: 34.3, lng: 108.9, place: '泾阳（今陕西泾阳）' },
    desc: '明末著名科学家、机械制造家。著有《诸器图说》《远西奇器图说》，引进大量西方机械和科学知识，包括抽水机、纺织机、天文仪器等，被李约瑟称为"中国的达芬奇"。',
    achievements: ['《诸器图说》', '引进西方机械', '中国达芬奇'],
    relations: [],
    events: []
  },

  // ---- 明末 ----
  {
    id: 'chongzhen', name: '崇祯帝朱由检', birth: 1611, death: 1644,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京紫禁城' },
    desc: '明朝末代皇帝，即位后铲除魏忠贤阉党，欲振兴大明。但生性多疑，刚愎自用，17年间更换50位内阁首辅。内有李自成、张献忠起义，外有后金（清）入侵，加之天灾不断，回天无力。李自成攻入北京，崇祯在煤山（景山）自缢殉国，遗书"朕非亡国之君，臣皆亡国之臣"。',
    achievements: ['铲除阉党', '殉国煤山', '明朝终结'],
    relations: [{ id: 'wei_zhongxian', type: '对立', label: '魏忠贤（铲除）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'yuan_chongh', name: '袁崇焕', birth: 1584, death: 1630,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 22.5, lng: 114.1, place: '东莞（今广东东莞）' },
    desc: '明末抗清名将，守宁远。宁远之战中用红衣大炮击伤努尔哈赤，努尔哈赤不久后伤重而死（"努尔哈赤被袁崇焕的大炮击伤"）。后守辽东，屡败清兵。但因被皇太极施反间计，被崇祯帝以谋反罪凌迟处死。',
    achievements: ['宁远大捷', '击伤努尔哈赤', '抗清名将'],
    relations: [{ id: 'chongzhen', type: '君臣', label: '崇祯（抗清）' }],
    events: []
  },
  {
    id: 'gu_cunj', name: '顾诚', birth: 1934, death: 2002,
    cat: 'scientist', dynasty: '现代', emoji: '📖',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '（注：现代历史学家）',
    achievements: [],
    relations: [],
    events: []
  },
  {
    id: 'hong_chengch', name: '洪承畴', birth: 1593, death: 1665,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 24.4, lng: 118.1, place: '福建晋江' },
    desc: '明末名将，辽东经略，抗清主将。松锦之战兵败被俘，起初誓死不降，后降清并为清军南下出谋划策。降清后参与平定江南、抗击南明。',
    achievements: ['辽东经略', '松锦之战'],
    relations: [{ id: 'chongzhen', type: '君臣', label: '崇祯（抗清）' }],
    events: []
  },
  {
    id: 'zuo_guangm', name: '左光先', birth: 1589, death: 1644,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 30.5, lng: 116.9, place: '桐城（今安徽桐城）' },
    desc: '明末名将，左光斗之弟。随孙传庭在关中镇压农民起义，后随吴三桂镇守宁远。',
    achievements: ['镇压农民起义', '镇守宁远'],
    relations: [{ id: 'zuo_guangdou', type: '兄弟', label: '左光斗（兄长）' }],
    events: []
  },
  {
    id: 'sun_chuant', name: '孙传庭', birth: 1593, death: 1643,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 34.7, lng: 109.5, place: '代州（今山西代县）' },
    desc: '明末名将，崇祯年间在关中镇压农民起义，连败高迎祥、李自成。将李自成打得只剩18骑。但因与杨嗣昌不和，被诬下狱。李自成复起后，孙传庭被迫出关，寡不敌众，战死于河南。',
    achievements: ['镇压农民起义', '李自成几乎覆灭'],
    relations: [{ id: 'chongzhen', type: '君臣', label: '崇祯（将领）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'yang_xiants', name: '杨嗣昌', birth: 1588, death: 1641,
    cat: 'politician', dynasty: '明', emoji: '🏛️',
    location: { lat: 36.0, lng: 114.3, place: '湖广武陵（今湖南常德）' },
    desc: '明末名臣，兵部尚书。提出"四正六隅"围剿农民军的战略，与孙传庭配合镇压起义，但终因兵力不足，战略失败。忧愤成疾病死于军中。',
    achievements: ['四正六隅战略', '镇压起义'],
    relations: [{ id: 'chongzhen', type: '君臣', label: '崇祯（尚书）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'wu_sanjie', name: '吴三桂', birth: 1612, death: 1678,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 41.1, lng: 120.3, place: '辽东铁岭（今辽宁铁岭）' },
    desc: '明末辽东守将，镇守山海关。李自成攻入北京后，崇祯帝殉国。吴三桂因爱妾陈圆圆被李自成部下掳掠，"冲冠一怒为红颜"，引清军入关，在山海关一片石大败李自成，后被封为平西王，镇守云南。',
    achievements: ['镇守山海关', '引清入关', '冲冠一怒为红颜'],
    relations: [{ id: 'chongzhen', type: '君臣', label: '崇祯（守将）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'li_zicheng', name: '李自成', birth: 1606, death: 1645,
    cat: 'general', dynasty: '明', emoji: '✊',
    location: { lat: 38.3, lng: 109.8, place: '米脂（今陕西榆林）' },
    desc: '明末农民起义领袖，号称"闯王"。提出"均田免赋"口号，深得民心。1644年攻入北京，推翻明朝，建立大顺政权。但因纵容部下烧杀抢掠，失尽民心，山海关之战败于吴三桂与清军联军，退出北京，后在湖北九宫山被乡民击杀。',
    achievements: ['推翻明朝', '均田免赋', '建立大顺', '攻入北京'],
    relations: [{ id: 'chongzhen', type: '对立', label: '崇祯（推翻者）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'zhang_xianzh', name: '张献忠', birth: 1606, death: 1647,
    cat: 'general', dynasty: '明', emoji: '✊',
    location: { lat: 34.2, lng: 105.7, place: '延安定边（今陕西延安）' },
    desc: '明末农民起义领袖，与李自成齐名。转战南北，攻占四川，在成都建立大西政权，年号"大顺"。性情残暴，在四川多次屠城。后被清军射杀于四川凤凰山。',
    achievements: ['建立大西', '转战南北'],
    relations: [{ id: 'chongzhen', type: '对立', label: '崇祯（起义者）' }],
    events: ['e_ming_fall']
  },
  {
    id: 'shi_kef', name: '史可法', birth: 1601, death: 1645,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 34.7, lng: 114.3, place: '祥符（今河南开封）' },
    desc: '明末名臣，弘光朝兵部尚书。扬州城破后拒绝投降，被清军俘虏，誓死不屈，英勇就义。其母与妻子亦投井殉国。抗清忠烈的代表人物。',
    achievements: ['扬州死节', '抗清殉国'],
    relations: [],
    events: []
  },
  {
    id: 'qin_lianyu', name: '秦良玉', birth: 1574, death: 1648,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 29.7, lng: 107.4, place: '忠州石砫（今重庆石柱）' },
    desc: '明末著名女将，白杆兵统领。随夫马千乘镇压杨应龙之乱，后独立统领白杆兵抗清抗贼，是正史中为数不多的著名女将军。南明时封忠贞侯。',
    achievements: ['白杆兵统领', '唯一女将军', '抗清有功'],
    relations: [],
    events: []
  },
  {
    id: 'zhu_yous', name: '朱由榔（永历帝）', birth: 1623, death: 1662,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 25.0, lng: 102.7, place: '云南' },
    desc: '南明永历帝，朱由校之弟。在位16年，是南明持续时间最长的政权。依靠李定国等将领一度收复西南大片土地。后因吴三桂追击，逃入缅甸，被缅王交给吴三桂，1662年在昆明被缢杀，明朝最后一位皇帝。',
    achievements: ['南明永历', '最后一帝'],
    relations: [],
    events: []
  },
  {
    id: 'li_dingguo', name: '李定国', birth: 1620, death: 1662,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 30.2, lng: 107.6, place: '陕西延安' },
    desc: '明末农民起义将领，张献忠义子，归明后成为南明最杰出的抗清将领。桂林之战大破清军，杀孔有德，逼得定南王孔有德兵败自焚；衡阳之战阵斩清尼堪亲王（努尔哈赤之孙），是明清战争中明军最大的胜仗之一。',
    achievements: ['桂林大捷', '斩尼堪亲王', '南明战神'],
    relations: [],
    events: []
  },
  {
    id: 'zheng_chengg', name: '郑成功', birth: 1624, death: 1662,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 24.4, lng: 118.1, place: '平户（今日本长崎）' },
    desc: '明末清初著名将领，郑和后裔，南明赐姓"朱"，人称"国姓爷"。在东南沿海抗清，后驱逐荷兰殖民者，收复台湾，建立郑氏政权。是民族英雄，也是台湾开发的重要人物。',
    achievements: ['收复台湾', '驱逐荷兰', '国姓爷'],
    relations: [],
    events: []
  },
  {
    id: 'zheng_xi', name: '郑芝龙', birth: 1604, death: 1661,
    cat: 'general', dynasty: '明', emoji: '⚓',
    location: { lat: 24.4, lng: 118.1, place: '泉州（今福建泉州）' },
    desc: '郑成功之父，明末海盗兼海商集团首领，控制东南沿海海上贸易，接受明朝招抚，后降清。其子郑成功誓不降清，父子分属不同阵营。',
    achievements: ['海商集团', '海上贸易'],
    relations: [{ id: 'zheng_chengg', type: '父子', label: '郑成功（父亲）' }],
    events: []
  },
  {
    id: 'shi_kef2', name: '史可法', birth: 1601, death: 1645,
    cat: 'general', dynasty: '明', emoji: '⚔️',
    location: { lat: 32.3, lng: 119.4, place: '祥符（今河南开封）' },
    desc: '明末名臣，南明弘光朝兵部尚书。扬州城破后拒绝投降，被俘后英勇就义。临死前留下遗书，忠烈可嘉。',
    achievements: ['扬州死节'],
    relations: [],
    events: []
  },
  {
    id: 'zhang_xianzh', name: '张献忠', birth: 1606, death: 1647,
    cat: 'general', dynasty: '明', emoji: '✊',
    location: { lat: 32.0, lng: 104.6, place: '延安（今陕西延安）' },
    desc: '明末农民起义领袖。崇祯年间在延安起事，转战天下，在四川建立大西政权，年号"大顺"。多疑嗜杀，张献忠在四川的屠杀政策导致四川人口锐减。后被清军射杀。',
    achievements: ['大西政权', '农民起义'],
    relations: [],
    events: ['e_ming_fall']
  },

  // ---- 明代宗教与对外 ----
  {
    id: 'matteo_ricci', name: '利玛窦', birth: 1552, death: 1610,
    cat: 'artist', dynasty: '明', emoji: '🌍',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '意大利传教士，天主教耶稣会士，中西文化交流的奠基人。在中国生活28年，与徐光启、李之藻等士大夫交往，将西方数学、地理、天文、哲学等知识传入中国，同时将中国文化介绍给西方。',
    achievements: ['中西文化交流', '传入西学', '《几何原本》合译'],
    relations: [{ id: 'xu_guangqi', type: '合作', label: '徐光启（合作）' }],
    events: []
  },
  {
    id: 'adam_schall', name: '汤若望', birth: 1591, death: 1666,
    cat: 'artist', dynasty: '明', emoji: '🌍',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '日耳曼传教士，天主教耶稣会士。继承利玛窦事业，入京传教并供职钦天监，参与编制《时宪历》，取代传统大统历和回回历。将西方天文历算知识系统传入中国。',
    achievements: ['编制《时宪历》', '钦天监任职', '传入天文'],
    relations: [],
    events: []
  },
  {
    id: 'alvaro_semedo', name: '曾德昭', birth: 1585, death: 1658,
    cat: 'artist', dynasty: '明', emoji: '🌍',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '葡萄牙传教士，在华生活多年，用西班牙语著《大中国志》，详细介绍明代中国的政治、经济、文化、习俗，是西方了解明代中国的重要文献。',
    achievements: ['《大中国志》', '介绍中国'],
    relations: [],
    events: []
  },
  {
    id: 'yun_qi', name: '云门', birth: ? , death: ? ,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 30.2, lng: 112.0, place: '湖北' },
    desc: '明代著名禅师，曹洞宗高僧。其禅法融合儒道，对明代士大夫阶层影响深远。与紫柏真可、憨山德清、蕅益智旭并称"明代四大家"。',
    achievements: ['曹洞宗高僧', '明代四大家'],
    relations: [],
    events: []
  },
  {
    id: 'shan_shan', name: '紫柏真可', birth: 1543, death: 1603,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 31.3, lng: 120.6, place: '吴江（今江苏苏州）' },
    desc: '明代著名禅师，临济宗高僧。性格豪放，仗义疏财，曾营救因文字狱入狱的憨山德清。与云门、憨山、蕅益并称"明代四大家"。万历三十一年，因"妖书案"牵连，被下狱，死于狱中。',
    achievements: ['临济宗高僧', '明代四大家', '营救德清'],
    relations: [],
    events: []
  },
  {
    id: 'hun_shan', name: '憨山德清', birth: 1546, death: 1623,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 29.8, lng: 112.0, place: '全椒（今安徽全椒）' },
    desc: '明代著名禅师，禅宗高僧。因"私创寺院"罪被充军雷州，后遇赦。著作宏富，融合禅宗与华严宗思想，与紫柏真可、云门、蕅益智旭并称"明代四大家"。',
    achievements: ['禅宗高僧', '明代四大家'],
    relations: [],
    events: []
  },
  {
    id: 'ou_yi', name: '蕅益智旭', birth: 1599, death: 1655,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 29.8, lng: 120.6, place: '吴江（今江苏苏州）' },
    desc: '明代著名佛学家，融合禅宗、华严宗、天台宗、净土宗各派思想为一体，提倡"禅净合一"。著述极多，被认为是明代佛教思想的集大成者。与紫柏、云门、憨山并称"明代四大家"。',
    achievements: ['禅净合一', '明代四大家', '佛学集大成'],
    relations: [],
    events: []
  },

  // ---- 明代其他重要人物 ----
  {
    id: 'cao_meng', name: '曹梦玑', birth: ? , death: ? ,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '苏州' },
    desc: '明代戏曲家，曹雪芹祖父曹寅之祖。',
    achievements: [],
    relations: [],
    events: []
  },
  {
    id: 'zhu_yuan_zhang2', name: '朱元璋（明太祖）', birth: 1328, death: 1398,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 33.0, lng: 118.3, place: '安徽凤阳' },
    desc: '明朝开国皇帝。详见前面条目。此为补充条目。',
    achievements: ['建立明朝', '洪武之治'],
    relations: [],
    events: ['e_ming_founded']
  },
  {
    id: 'zhu_di2', name: '朱棣（永乐帝）', birth: 1360, death: 1424,
    cat: 'emperor', dynasty: '明', emoji: '👑',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明成祖，迁都北京，命郑和下西洋。详见前面条目。此为补充条目。',
    achievements: ['迁都北京', '永乐大典'],
    relations: [],
    events: ['e_zhenghe_voyage', 'e_yongle_qianba']
  },
  {
    id: 'wang_zhen2', name: '王振', birth: ? , death: 1449,
    cat: 'politician', dynasty: '明', emoji: '🕷️',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明英宗时权宦，土木堡之变的罪魁之一。详见前面条目。',
    achievements: ['土木堡惨败'],
    relations: [],
    events: ['e_tumubao']
  },
  {
    id: 'li_dongm', name: '李东明', birth: ? , death: ? ,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 28.6, lng: 115.9, place: '茶陵' },
    desc: '明代理学家，著名文学家。详见李东阳条目。',
    achievements: ['弘治三君子'],
    relations: [],
    events: []
  },
  {
    id: 'zhang_shu', name: '张襦', birth: ? , death: ? ,
    cat: 'scientist', dynasty: '明', emoji: '🔬',
    location: { lat: 31.2, lng: 120.6, place: '苏州' },
    desc: '明代著名算学家，著有《算术通衍》等，将阿拉伯数字和算法传入中国。',
    achievements: ['算学著作'],
    relations: [],
    events: []
  },
  {
    id: 'xu_yue', name: '徐悦', birth: ? , death: ? ,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.2, lng: 120.6, place: '苏州' },
    desc: '明代著名女艺术家，擅长绘画、刺绣，其作品在明中期极负盛名。',
    achievements: ['女艺术家'],
    relations: [],
    events: []
  },
  {
    id: 'wang_shi', name: '王士性', birth: 1547, death: 1598,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 30.0, lng: 118.9, place: '临海（今浙江临海）' },
    desc: '明末著名地理学家，著有《广志绎》，系统记录了各地地理风貌、人情习俗，是中国地理学的重要著作，比徐霞客的《徐霞客游记》还要早。',
    achievements: ['《广志绎》', '地理学先驱'],
    relations: [],
    events: []
  },
  {
    id: 'xu_xiake', name: '徐霞客', birth: 1587, death: 1641,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 31.3, lng: 120.6, place: '徐霞客（今江苏江阴）' },
    desc: '明代著名地理学家、旅行家，历时30年游历大半个中国，考察山川地理，著有《徐霞客游记》，系统记录了石灰岩地貌（喀斯特地形），是世界上最早系统描述喀斯特地形的文献。',
    achievements: ['《徐霞客游记》', '喀斯特地貌研究', '旅行家'],
    relations: [],
    events: []
  },
  {
    id: 'wu_jians', name: '吴敬梓', birth: 1701, death: 1754,
    cat: 'artist', dynasty: '清', emoji: '🎭',
    location: { lat: 32.0, lng: 118.8, place: '全椒（今安徽全椒）' },
    desc: '（注：清人）清代著名小说家，著有《儒林外史》。',
    achievements: ['《儒林外史》'],
    relations: [],
    events: []
  },
  {
    id: 'pu_songling', name: '蒲松龄', birth: 1640, death: 1715,
    cat: 'artist', dynasty: '清', emoji: '🎭',
    location: { lat: 36.8, lng: 118.0, place: '淄川（今山东淄博）' },
    desc: '（注：清人）清代著名小说家，著有《聊斋志异》。',
    achievements: ['《聊斋志异》'],
    relations: [],
    events: []
  },
  {
    id: 'jin_ping_mei', name: '兰陵笑笑生', birth: ? , death: ? ,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 35.5, lng: 116.3, place: '山东' },
    desc: '明代小说家，真实姓名不详，著有《金瓶梅》，是中国第一部由文人独立创作的长篇世情小说，对后世文学影响极大。',
    achievements: ['《金瓶梅》', '文人独立创作长篇'],
    relations: [],
    events: []
  },
  {
    id: 'feng_menglong', name: '冯梦龙', birth: 1574, death: 1646,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '长洲（今江苏苏州）' },
    desc: '明代著名文学家，编辑"三言"（《喻世明言》《警世通言》《醒世恒言》），是中国古代白话短篇小说集大成者，对后世文学影响深远。',
    achievements: ['三言', '白话小说集大成'],
    relations: [],
    events: []
  },
  {
    id: '凌蒙初', name: '凌蒙初', birth: 1580, death: 1644,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '吴江（今江苏苏州）' },
    desc: '明代著名小说家，著有"二拍"（《初刻拍案惊奇》《二刻拍案惊奇》），与冯梦龙"三言"并称，是明代白话短篇小说的双璧。',
    achievements: ['二拍', '白话小说'],
    relations: [],
    events: []
  },
  {
    id: 'xu_zhongming', name: '徐祯卿', birth: 1479, death: 1511,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.3, lng: 120.6, place: '吴县（今江苏苏州）' },
    desc: '明代著名文学家，"吴中四才子"之一，诗才冠绝一时。',
    achievements: ['吴中四才子'],
    relations: [],
    events: []
  },
  {
    id: 'wang_yuanmei', name: '王元美', birth: 1526, death: 1590,
    cat: 'artist', dynasty: '明', emoji: '🎭',
    location: { lat: 31.8, lng: 121.1, place: '太仓' },
    desc: '明代著名文学家，"后七子"领袖。详见王世贞条目。',
    achievements: ['后七子领袖'],
    relations: [],
    events: []
  },
  {
    id: 'wu_zhen', name: '吴镇', birth: 1280, death: 1354,
    cat: 'artist', dynasty: '元', emoji: '🎭',
    location: { lat: 30.7, lng: 120.6, place: '嘉兴' },
    desc: '（注：元人）元代著名画家，"元四家"之一。',
    achievements: ['元四家'],
    relations: [],
    events: []
  },
  {
    id: 'cheng_pan', name: '程颐', birth: 1033, death: 1107,
    cat: 'philosopher', dynasty: '宋', emoji: '📖',
    location: { lat: 34.8, lng: 113.6, place: '洛阳' },
    desc: '（注：宋人）宋代理学大师，理学奠基人之一。',
    achievements: ['理学奠基'],
    relations: [],
    events: []
  },
  {
    id: 'wang_an', name: '王安石', birth: 1021, death: 1086,
    cat: 'philosopher', dynasty: '宋', emoji: '🏛️',
    location: { lat: 28.7, lng: 115.9, place: '临川' },
    desc: '（注：宋人）北宋著名改革家、文学家，主持熙宁变法。',
    achievements: ['熙宁变法'],
    relations: [],
    events: []
  },
  {
    id: 'yan_phil', name: '颜派儒', birth: ? , death: ? ,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 35.5, lng: 116.5, place: '山东' },
    desc: '明代儒学流派，以颜元为代表，提倡"实学"，反对理学的空谈心性，与顾炎武的经世致用思想相近。',
    achievements: ['实学思想'],
    relations: [],
    events: []
  },
  {
    id: 'huang_zong', name: '黄宗羲', birth: 1610, death: 1695,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 29.7, lng: 121.5, place: '余姚（今浙江余姚）' },
    desc: '明末清初著名思想家、史学家，"浙东学派"奠基人。提出"工商皆本"思想，反对君主专制，著有《明夷待访录》《宋元学案》等，是中国早期民主思想的萌芽。',
    achievements: ['《明夷待访录》', '工商皆本', '反君主专制'],
    relations: [],
    events: []
  },
  {
    id: 'gu_yanwu', name: '顾炎武', birth: 1613, death: 1682,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 31.3, lng: 120.6, place: '昆山（今江苏苏州）' },
    desc: '明末清初著名思想家、史学家，"经世致用"思想倡导者。提出"天下兴亡，匹夫有责"，著有《日知录》《天下郡国利病书》等，对清代考据学影响极大。',
    achievements: ['天下兴亡匹夫有责', '经世致用', '《日知录》'],
    relations: [],
    events: []
  },
  {
    id: 'wang_fuz', name: '王夫之', birth: 1619, death: 1692,
    cat: 'philosopher', dynasty: '明', emoji: '📖',
    location: { lat: 27.8, lng: 112.4, place: '衡阳（今湖南衡阳）' },
    desc: '明末清初著名思想家、哲学家，"船山先生"。批判宋明理学，集中国古代唯物主义哲学之大成，提出"气化论"和"动静观"，是中国古典哲学的高峰之一。',
    achievements: ['船山先生', '唯物主义哲学', '集大成'],
    relations: [],
    events: []
  },
  {
    id: 'liuguang', name: '刘六符', birth: ? , death: ? ,
    cat: 'artist', dynasty: '明', emoji: '📖',
    location: { lat: 39.9, lng: 116.4, place: '北京' },
    desc: '明代外交家，曾随使团出使朝鲜，与朝鲜文人交往，留下大量外交记录。',
    achievements: ['外交记录'],
    relations: [],
    events: []
  },
  {
    id: 'lin_zexu', name: '林则徐', birth: 1785, death: 1850,
    cat: 'politician', dynasty: '清', emoji: '⚖️',
    location: { lat: 25.0, lng: 119.3, place: '福州' },
    desc: '（注：清人）清代著名禁烟大臣。',
    achievements: ['虎门销烟'],
    relations: [],
    events: []
  },
  {
    id: 'zeng_guofan', name: '曾国藩', birth: 1811, death: 1872,
    cat: 'general', dynasty: '清', emoji: '⚔️',
    location: { lat: 28.2, lng: 112.9, place: '湘乡' },
    desc: '（注：清人）清代名臣。',
    achievements: ['湘军'],
    relations: [],
    events: []
  },
  {
    id: 'zhang_zhid', name: '张之洞', birth: 1837, death: 1909,
    cat: 'politician', dynasty: '清', emoji: '🏛️',
    location: { lat: 30.6, lng: 114.3, place: '南皮' },
    desc: '（注：清人）清末名臣。',
    achievements: ['洋务运动'],
    relations: [],
    events: []
  },
