#!/usr/bin/env python3
"""安全添加日本和世界历史数据"""
import shutil, os

DATA = r'C:\Users\Admin\WorkBuddy\history-timeline\data.js'
shutil.copy(DATA, DATA + '.bak2')
print('备份完成')

with open(DATA, 'r', encoding='utf-8') as f:
    text = f.read()

# ===== 世界新增人物 (16人) =====
WORLD_NEW = [
    {
        "id": "archimedes", "name": "阿基米德", "birth": -287, "death": -212,
        "cat": "scientist", "emoji": "\U0001f52c",
        "desc": "古希腊最伟大的数学家、物理学家。发现浮力定律（阿基米德原理）和杠杆原理，计算圆周率，发明多种战争机械。在罗马攻破叙拉古时被士兵杀害，临终遗言"不要破坏我的圆"。",
        "achievements": ["浮力定律", "杠杆原理", "圆周率计算"],
        "relations": [], "events": []
    },
    {
        "id": "cleopatra", "name": "克娄巴特拉七世", "birth": -69, "death": -30,
        "cat": "emperor", "emoji": "\U0001f451",
        "desc": "古埃及托勒密王朝末代女王，以智慧和魅力著称。先后与凯撒和马克·安东尼结盟，试图维持埃及独立。安东尼战败后，以毒蛇自杀，埃及并入罗马帝国。",
        "achievements": ["最后一位埃及法老", "外交谋略"],
        "relations": [{"id": "caesar", "type": "情人", "label": "凯撒"}], "events": []
    },
    {
        "id": "constantine", "name": "君士坦丁大帝", "birth": 272, "death": 337,
        "cat": "emperor", "emoji": "\U0001f3db\ufe0f",
        "desc": "罗马帝国皇帝，重新统一罗马帝国。颁布《米兰敕令》承认基督教合法，迁都拜占庭（后改名君士坦丁堡），奠定了基督教成为罗马国教和东罗马帝国千年基业。",
        "achievements": ["米兰敕令", "迁都君士坦丁堡", "统一罗马帝国"],
        "relations": [], "events": []
    },
    {
        "id": "elizabeth_i", "name": "伊丽莎白一世", "birth": 1533, "death": 1603,
        "cat": "emperor", "emoji": "\U0001f478",
        "desc": "英国都铎王朝最后一位君主，开创"伊丽莎白时代"。击败西班牙无敌舰队，确立英国海上霸权；支持莎士比亚等文艺巨匠。终身未婚，被称为"童贞女王"。",
        "achievements": ["击败无敌舰队", "海上霸权", "伊丽莎白时代"],
        "relations": [], "events": []
    },
    {
        "id": "voltaire", "name": "伏尔泰", "birth": 1694, "death": 1778,
        "cat": "philosopher", "emoji": "\U0001f4dd",
        "desc": '''法国启蒙运动领袖，作家、哲学家。倡导言论自由、宗教宽容、理性主义，抨击教会和专制制度。代表作《哲学通信》《老实人》，名言"我不同意你的观点，但我誓死捍卫你说话的权利"代表启蒙精神。''',
        "achievements": ["启蒙运动领袖", "《老实人》", "言论自由倡导"],
        "relations": [], "events": []
    },
    {
        "id": "rousseau", "name": "让-雅克·卢梭", "birth": 1712, "death": 1778,
        "cat": "philosopher", "emoji": "\U0001f4d6",
        "desc": "法国启蒙思想家、哲学家。提出"社会契约论"和"主权在民"思想，深刻影响了法国大革命和现代民主政治。代表作《社会契约论》《忏悔录》，其"回归自然"理念开创浪漫主义。",
        "achievements": ["社会契约论", "主权在民", "法国大革命思想先驱"],
        "relations": [], "events": []
    },
    {
        "id": "adam_smith", "name": "亚当·斯密", "birth": 1723, "death": 1790,
        "cat": "philosopher", "emoji": "\U0001f4c8",
        "desc": "苏格兰经济学家、哲学家，古典经济学之父。代表作《国富论》系统阐述自由市场经济理论，提出"看不见的手"的著名比喻，奠定了现代经济学的基础。",
        "achievements": ["《国富论》", "看不见的手", "现代经济学之父"],
        "relations": [], "events": []
    },
    {
        "id": "peter_great", "name": "彼得大帝", "birth": 1672, "death": 1725,
        "cat": "emperor", "emoji": "\U0001f6e1\ufe0f",
        "desc": "俄国沙皇，俄罗斯帝国奠基人。微服私访西欧学习先进技术，推行全面西化改革：建立海军、改革军制、迁都圣彼得堡。将落后的俄国带入欧洲强国之列。",
        "achievements": ["西化改革", "建立海军", "迁都圣彼得堡"],
        "relations": [], "events": []
    },
    {
        "id": "bismarck", "name": "奥托·冯·俾斯麦", "birth": 1815, "death": 1898,
        "cat": "politician", "emoji": "\U0001f52e",
        "desc": "德意志帝国首任宰相，被称为"铁血宰相"。通过三次王朝战争（普丹、普奥、普法）统一德意志，建立了欧洲大陆最强大的国家。推行社会保险制度，开创现代福利国家先河。",
        "achievements": ["统一德意志", "铁血政策", "现代福利制度"],
        "relations": [], "events": []
    },
    {
        "id": "tolstoy", "name": "列夫·托尔斯泰", "birth": 1828, "death": 1910,
        "cat": "artist", "emoji": "\U0001f4da",
        "desc": "俄国文学巨匠，世界文学史上最伟大的小说家之一。代表作《战争与和平》《安娜·卡列尼娜》《复活》以宏大叙事和深刻人性描写著称。晚年倡导"托尔斯泰主义"——不以暴力抗恶。",
        "achievements": ["《战争与和平》", "《安娜·卡列尼娜》", "《复活》"],
        "relations": [], "events": []
    },
    {
        "id": "tesla", "name": "尼古拉·特斯拉", "birth": 1856, "death": 1943,
        "cat": "scientist", "emoji": "\U000026a1",
        "desc": "塞尔维亚裔美国发明家、电气工程师。发明交流电系统，奠定了现代电力工业的基础。拥有700多项专利，包括无线电、遥控技术、特斯拉线圈等。一生贫困但才华横溢，死后被誉为"被遗忘的天才"。",
        "achievements": ["交流电系统", "特斯拉线圈", "无线电先驱", "700多项专利"],
        "relations": [], "events": []
    },
    {
        "id": "chaplin", "name": "查理·卓别林", "birth": 1889, "death": 1977,
        "cat": "artist", "emoji": "\U0001f3ac",
        "desc": "英国喜剧大师、电影导演。创造了流浪汉"夏尔洛"的经典银幕形象。代表作《淘金记》《城市之光》《摩登时代》《大独裁者》，以幽默讽刺社会现实，被誉为电影史上最伟大的喜剧天才。",
        "achievements": ["流浪汉夏尔洛", "《摩登时代》", "《大独裁者》", "默片喜剧巅峰"],
        "relations": [], "events": []
    },
    {
        "id": "hemingway", "name": "欧内斯特·海明威", "birth": 1899, "death": 1961,
        "cat": "artist", "emoji": "\U0000270d\ufe0f",
        "desc": "美国作家，"迷惘的一代"代表人物。以简洁有力的"冰山理论"写作风格著称。代表作《老人与海》获诺贝尔文学奖，《太阳照常升起》《永别了，武器》记录战争创伤。",
        "achievements": ["诺贝尔文学奖", "《老人与海》", "冰山理论", "迷惘的一代"],
        "relations": [], "events": []
    },
    {
        "id": "hawking", "name": "斯蒂芬·霍金", "birth": 1942, "death": 2018,
        "cat": "scientist", "emoji": "\U0001f30c",
        "desc": "英国理论物理学家。21岁患肌萎缩侧索硬化症（渐冻症），在轮椅上完成毕生研究。提出黑洞辐射理论（霍金辐射），著《时间简史》全球畅销，将深奥的宇宙学普及给大众。",
        "achievements": ["霍金辐射", "《时间简史》", "黑洞理论", "科普巨人"],
        "relations": [], "events": []
    },
    {
        "id": "jobs", "name": "史蒂夫·乔布斯", "birth": 1955, "death": 2011,
        "cat": "inventor", "emoji": "\U0001f4f1",
        "desc": "美国企业家，苹果公司联合创始人。先后推出Mac电脑、iPod、iPhone、iPad等革命性产品，重新定义了个人电脑、音乐、手机和出版行业。"Stay Hungry, Stay Foolish"激励了无数人。",
        "achievements": ["创立苹果公司", "iPhone", "Mac", "颠覆四大行业"],
        "relations": [], "events": []
    },
    {
        "id": "mandela_note", "name": "已删除", "birth": 0, "death": 0,
        "cat": "politician", "emoji": "X",
        "desc": "SKIP", "achievements": [], "relations": [], "events": []
    },
]

# ===== 世界新增事件 (10条) =====
WORLD_EVENTS_NEW = [
    {
        "id": "e_black_death", "year": 1347, "name": "黑死病大流行", "type": "economy",
        "desc": "鼠疫席卷欧洲，约2500万人死亡（占欧洲人口三分之一）。深刻改变了欧洲社会结构，劳动力短缺加速了封建制度瓦解，推动了社会变革。"
    },
    {
        "id": "e_constantinople_fall", "year": 1453, "name": "君士坦丁堡陷落", "type": "war",
        "desc": "奥斯曼帝国苏丹穆罕默德二世攻陷君士坦丁堡，东罗马帝国（拜占庭）灭亡。大量希腊学者携带古籍西逃，促进了意大利文艺复兴。"
    },
    {
        "id": "e_enlightenment", "year": 1700, "name": "启蒙运动", "type": "culture",
        "desc": "18世纪欧洲思想解放运动。伏尔泰、卢梭、孟德斯鸠等思想家倡导理性、自由、平等，批判专制和教会权威，为法国大革命和美国独立提供了思想基础。"
    },
    {
        "id": "e_us_constitution", "year": 1787, "name": "美国宪法制定", "type": "politics",
        "desc": "美国制宪会议在费城召开，制定世界上第一部成文宪法，确立三权分立和联邦制原则，成为现代民主宪政的典范。"
    },
    {
        "id": "e_marx_manifesto", "year": 1848, "name": "《共产党宣言》发表", "type": "politics",
        "desc": "马克思和恩格斯发表《共产党宣言》，提出"全世界无产者联合起来"的口号，系统阐述了共产主义理论，深刻影响了世界历史进程。"
    },
    {
        "id": "e_darwin_evolution", "year": 1859, "name": "进化论发表", "type": "science",
        "desc": "达尔文出版《物种起源》，提出以自然选择为核心的进化论，彻底改变了人类对生命起源和演化过程的认识，是科学史上最重要的里程碑之一。"
    },
    {
        "id": "e_great_depression", "year": 1929, "name": "世界经济大萧条", "type": "economy",
        "desc": "纽约股市崩盘引发全球性经济危机，持续近十年。银行倒闭、工厂停工、大规模失业遍及全世界，促使各国政府加强经济干预和福利制度建设。"
    },
    {
        "id": "e_marshall_plan", "year": 1948, "name": "马歇尔计划实施", "type": "economy",
        "desc": "美国对战后欧洲提供大规模经济援助，总额约130亿美元。帮助西欧迅速复兴经济，同时遏制苏联影响力扩张，奠定了战后西方经济秩序。"
    },
    {
        "id": "e_genome", "year": 2000, "name": "人类基因组草图完成", "type": "science",
        "desc": "美英日中德法六国科学家合作完成人类基因组测序草图，标志着生命科学研究进入了基因组时代，为精准医疗和基因编辑奠定了基础。"
    },
    {
        "id": "e_911_dup", "year": 0, "name": "跳过", "type": "default",
        "desc": "SKIP"
    },
]

# ===== 日本新增人物 (14人) =====
JAPAN_NEW = [
    {
        "id": "ganjin", "name": "\u9274\u771f", "birth": 688, "death": 763,
        "cat": "philosopher", "emoji": "\U0001f6e4\ufe0f",
        "desc": "\u5510\u4ee3\u9ad8\u50e7\uff0c\u516d\u6b21\u4e1c\u6e21\u65e5\u672c\uff0c\u53cc\u76ee\u5931\u660e\u540e\u7ec8\u4e8e\u62b5\u8fbe\u3002\u5728\u5948\u826f\u5efa\u7acb\u5510\u62db\u63d0\u5bfa\uff0c\u4e3a\u65e5\u672c\u4f20\u6388\u6212\u5f8b\u548c\u5510\u4ee3\u6587\u5316\uff0c\u88ab\u65e5\u672c\u4eba\u6c11\u5c0a\u4e3a\u201c\u65e5\u672c\u5f8b\u5b97\u59cb\u7956\u201d\u3002",
        "achievements": ["\u516d\u6b21\u4e1c\u6e21", "\u521b\u5efa\u5510\u62db\u63d0\u5bfa", "\u65e5\u672c\u5f8b\u5b97\u59cb\u7956"],
        "relations": [], "events": []
    },
    {
        "id": "saicho", "name": "\u6700\u6f84", "birth": 767, "death": 822,
        "cat": "philosopher", "emoji": "\U0001f54a\ufe0f",
        "desc": "\u65e5\u672c\u5929\u53f0\u5b97\u521b\u59cb\u4eba\u3002\u968f\u9063\u5510\u4f7f\u5165\u5510\uff0c\u5728\u5929\u53f0\u5c71\u5b66\u4e60\u5929\u53f0\u6559\u4e49\u3002\u56de\u56fd\u540e\u5728\u6bd4\u53e1\u5c71\u5efa\u7acb\u5ef6\u5386\u5bfa\uff0c\u5f00\u521b\u65e5\u672c\u5929\u53f0\u5b97\uff0c\u4e0e\u7a7a\u6d77\u5e76\u79f0\u4e3a\u65e5\u672c\u4f5b\u6559\u4e24\u5927\u5176\u790e\u3002",
        "achievements": ["\u521b\u7acb\u5929\u53f0\u5b97", "\u5ef6\u5386\u5bfa", "\u65e5\u672c\u4f5b\u6559\u5176\u790e"],
        "relations": [], "events": []
    },
    {
        "id": "sugawara_michizane", "name": "\u83c5\u539f\u9053\u771f", "birth": 845, "death": 903,
        "cat": "scholar", "emoji": "\U0001f4dc",
        "desc": "\u65e5\u672c\u5e73\u5b89\u65f6\u4ee3\u5b66\u8005\u3001\u653f\u6cbb\u5bb6\u3002\u5b66\u95ee\u6e0a\u535a\uff0c\u5b98\u81f3\u53f3\u5927\u81e3\u3002\u56e0\u906d\u8c23\u9677\u88ab\u8d2c\u4e5d\u5dde\uff0c\u53bb\u4e16\u540e\u88ab\u5c0a\u4e3a\u201c\u5929\u6ee1\u5927\u795e\u201d\uff08\u5b66\u95ee\u4e4b\u795e\uff09\uff0c\u6bcf\u5e74\u8003\u8bd5\u5b63\u8003\u751f\u4eec\u7eb7\u7eb7\u7948\u798f\u3002",
        "achievements": ["\u5b66\u95ee\u4e4b\u795e", "\u9063\u5510\u4f7f\u5efa\u8bae", "\u53f3\u5927\u81e3"],
        "relations": [], "events": []
    },
    {
        "id": "sei_shonagon", "name": "\u6e05\u5c11\u7eb3\u8a00", "birth": 966, "death": 1025,
        "cat": "artist", "emoji": "\U0001f4d3",
        "desc": "\u65e5\u672c\u5e73\u5b89\u65f6\u4ee3\u5973\u4f5c\u5bb6\u3002\u4ed5\u5949\u4e2d\u5bab\u5b9a\u5b50\u7687\u540e\uff0c\u8457\u6709\u968f\u7b14\u6587\u5b66\u6770\u4f5c\u300a\u6795\u8349\u5b50\u300b\uff0c\u4e0e\u7d2b\u5f0f\u90e8\u7684\u300a\u6e90\u6c0f\u7269\u8bed\u300b\u5e76\u79f0\u4e3a\u65e5\u672c\u53e4\u5178\u6587\u5b66\u53cc\u74a7\u3002",
        "achievements": ["\u300a\u6795\u8349\u5b50\u300b", "\u5e73\u5b89\u6587\u5b66\u53cc\u74a7"],
        "relations": [], "events": []
    },
    {
        "id": "taira_masakado", "name": "\u5e73\u5c06\u95e8", "birth": 903, "death": 940,
        "cat": "military", "emoji": "\U0001f5e1\ufe0f",
        "desc": "\u65e5\u672c\u5e73\u5b89\u4e2d\u671f\u6b66\u58eb\uff0c\u81ea\u79f0\u201c\u65b0\u7687\u201d\u3002\u5728\u5173\u4e1c\u53d1\u52a8\u53db\u4e71\uff0c\u5360\u9886\u5742\u4e1c\u516b\u56fd\uff0c\u662f\u65e5\u672c\u5386\u53f2\u4e0a\u7b2c\u4e00\u4e2a\u516c\u5f00\u53db\u4e71\u7684\u6b66\u58eb\u3002\u88ab\u8ba8\u4f10\u540e\u5934\u9885\u88ab\u663e\u793a\uff0c\u4f20\u8bf4\u5176\u9996\u7ea7\u98de\u56de\u5bb6\u4e61\u3002",
        "achievements": ["\u7b2c\u4e00\u4e2a\u53db\u4e71\u6b66\u58eb", "\u5360\u9886\u5742\u4e1c"],
        "relations": [], "events": []
    },
    {
        "id": "sesshu", "name": "\u96ea\u821f", "birth": 1420, "death": 1506,
        "cat": "artist", "emoji": "\U0001f328\ufe0f",
        "desc": "\u65e5\u672c\u5ba4\u753a\u65f6\u4ee3\u6c34\u58a8\u753b\u5927\u5e08\u3002\u968f\u9063\u660e\u4f7f\u5165\u660e\u671d\uff0c\u5b66\u4e60\u4e2d\u56fd\u5357\u5b8b\u6c34\u58a8\u753b\u6280\u6cd5\u3002\u56de\u56fd\u540e\u878d\u4f1a\u8d2f\u901a\uff0c\u521b\u7acb\u65e5\u672c\u6c34\u58a8\u753b\u6d41\u6d3e\uff0c\u4ee3\u8868\u4f5c\u300a\u79cb\u51ac\u5c71\u6c34\u56fe\u300b\u88ab\u5217\u4e3a\u56fd\u5b9d\u3002",
        "achievements": ["\u65e5\u672c\u6c34\u58a8\u753b\u5b97\u5e08", "\u300a\u79cb\u51ac\u5c71\u6c34\u56fe\u300b", "\u5165\u660e\u5b66\u753b"],
        "relations": [], "events": []
    },
    {
        "id": "takeda_shingen", "name": "\u6b66\u7530\u4fe1\u7384", "birth": 1521, "death": 1573,
        "cat": "military", "emoji": "\U0001f409",
        "desc": "\u65e5\u672c\u6218\u56fd\u65f6\u4ee3\u540d\u5c06\uff0c\u7532\u6590\u56fd\u5927\u540d\uff0c\u201c\u7532\u6590\u4e4b\u864e\u201d\u3002\u4ee5\u7cbe\u9510\u9a91\u5175\u961f\u5a01\u9707\u4e1c\u65e5\u672c\uff0c\u5ddd\u4e2d\u5c9b\u5408\u6218\u4e0e\u4e0a\u6749\u8c26\u4fe1\u4e94\u5ea6\u5bf9\u5cd9\u4e0d\u5206\u4e0a\u4e0b\u3002\u201c\u98ce\u6797\u706b\u5c71\u201d\u519b\u65d7\u4e3a\u6218\u56fd\u6700\u5f3a\u6807\u5fd7\u4e4b\u4e00\u3002",
        "achievements": ["\u7532\u6590\u4e4b\u864e", "\u9a91\u5175\u7cbe\u9510", "\u5ddd\u4e2d\u5c9b\u5408\u6218"],
        "relations": [{"id": "uesugi_kenshin", "type": "\u5bbf\u654c", "label": "\u4e0a\u6749\u8c26\u4fe1"}], "events": []
    },
    {
        "id": "uesugi_kenshin", "name": "\u4e0a\u6749\u8c26\u4fe1", "birth": 1530, "death": 1578,
        "cat": "military", "emoji": "\U0001f409",
        "desc": "\u65e5\u672c\u6218\u56fd\u65f6\u4ee3\u540d\u5c06\uff0c\u8d8a\u540e\u56fd\u5927\u540d\uff0c\u201c\u8d8a\u540e\u4e4b\u9f99\u201d\u3002\u81ea\u79f0\u6218\u795e\u6bd7\u6c99\u95e8\u5929\u8f6c\u4e16\uff0c\u4ee5\u6b63\u4e49\u548c\u4ec1\u4e49\u8457\u79f0\u3002\u5ddd\u4e2d\u5c9b\u5408\u6218\u4e0e\u6b66\u7530\u4fe1\u7384\u52bf\u5747\u529b\u654c\uff0c\u662f\u6218\u56fd\u6700\u53d7\u5c0a\u656c\u7684\u5927\u540d\u3002",
        "achievements": ["\u8d8a\u540e\u4e4b\u9f99", "\u6218\u795e\u6bd7\u6c99\u95e8\u5929", "\u5ddd\u4e2d\u5c9b\u5408\u6218"],
        "relations": [{"id": "takeda_shingen", "type": "\u5bbf\u654c", "label": "\u6b66\u7530\u4fe1\u7384"}], "events": []
    },
    {
        "id": "matsuo_basho", "name": "\u677e\u5c3e\u82ad\u8549", "birth": 1644, "death": 1694,
        "cat": "artist", "emoji": "\U0001f338",
        "desc": "\u65e5\u672c\u6c5f\u6237\u65f6\u4ee3\u4f53\u4eba\uff0c\u88ab\u5c0a\u4e3a\u201c\u4f33\u5723\u201d\u3002\u5c06\u4f33\u53e5\u4ece\u6e38\u620f\u6587\u5b66\u63d0\u5347\u4e3a\u4e25\u8083\u7684\u827a\u672f\u5f62\u5f0f\u3002\u4ee3\u8868\u4f5c\u201c\u53e4\u6c60\u2014\u2014\u9752\u86d9\u8df3\u5165\u6c34\u58f0\u201d\u4f20\u9882\u4e16\u754c\uff0c\u300a\u5967\u4e4b\u7d30\u9053\u300b\u662f\u4f33\u53e5\u7ecf\u5178\u3002",
        "achievements": ["\u4f33\u5723", "\u300a\u5965\u4e4b\u7ec6\u9053\u300b", "\u4f33\u53e5\u827a\u672f\u5316"],
        "relations": [], "events": []
    },
    {
        "id": "motoori_norinaga", "name": "\u672c\u5c45\u5ba3\u957f", "birth": 1730, "death": 1801,
        "cat": "scholar", "emoji": "\U0001f4d7",
        "desc": "\u65e5\u672c\u6c5f\u6237\u65f6\u4ee3\u56fd\u5b66\u5927\u5e08\u3002\u82b1\u8d39\u56db\u5341\u5e74\u7814\u7a76\u300a\u53e4\u4e8b\u8bb0\u300b\uff0c\u8457\u300a\u53e4\u4e8b\u8bb0\u4f20\u300b\u3002\u5f3a\u8c03\u65e5\u672c\u6587\u5316\u7684\u72ec\u7279\u6027\uff0c\u63d0\u51fa\u201c\u7269\u54c0\u201d\u7f8e\u5b66\u7406\u8bba\uff0c\u662f\u65e5\u672c\u6c11\u65cf\u4e3b\u4e49\u601d\u60f3\u7684\u6e8a\u5934\u3002",
        "achievements": ["\u300a\u53e4\u4e8b\u8bb0\u4f20\u300b", "\u56fd\u5b66\u5927\u5e08", "\u7269\u54c0\u7f8e\u5b66"],
        "relations": [], "events": []
    },
    {
        "id": "hokusai", "name": "\u845b\u9970\u5317\u658e", "birth": 1760, "death": 1849,
        "cat": "artist", "emoji": "\U0001f30a",
        "desc": "\u65e5\u672c\u6c5f\u6237\u65f6\u4ee3\u6d6e\u4e16\u7ed8\u5927\u5e08\u3002\u4ee3\u8868\u4f5c\u300a\u5bcc\u5dbd\u4e09\u5341\u516d\u666f\u300b\u4e2d\u7684\u300a\u795e\u5948\u5ddd\u6c96\u6d6a\u91cc\u300b\u662f\u4e16\u754c\u6700\u8457\u540d\u7684\u65e5\u672c\u827a\u672f\u4f5c\u54c1\uff0c\u6df1\u523b\u5f71\u54cd\u4e86\u68b5\u9ad8\u3001\u83ab\u5948\u7b49\u5370\u8c61\u6d3e\u5927\u5e08\u3002",
        "achievements": ["\u300a\u5bcc\u5dbd\u4e09\u5341\u516d\u666f\u300b", "\u6d6e\u4e16\u7ed8\u5de5\u5cf0", "\u5f71\u54cd\u5370\u8c61\u6d3e"],
        "relations": [], "events": []
    },
    {
        "id": "akutagawa", "name": "\u82a5\u5ddd\u9f99\u4e4b\u4ecb", "birth": 1892, "death": 1927,
        "cat": "artist", "emoji": "\U0001f4d6",
        "desc": "\u65e5\u672c\u5927\u6b63\u65f6\u4ee3\u4f5c\u5bb6\uff0c\u65e5\u672c\u77ed\u7bc7\u5c0f\u8bf4\u4e4b\u738b\u3002\u4ee3\u8868\u4f5c\u300a\u7f57\u751f\u95e8\u300b\u300a\u9f3b\u5b50\u300b\u300a\u5730\u72f1\u53d8\u300b\u7b49\uff0c\u4ee5\u51b7\u5cfb\u7684\u7b14\u89e6\u63ed\u793a\u4eba\u6027\u7684\u9ed1\u6697\u3002\u65e5\u672c\u6700\u9ad8\u6587\u5b66\u5956\u4ee5\u5176\u540d\u5b57\u547d\u540d\u3002",
        "achievements": ["\u300a\u7f57\u751f\u95e8\u300b", "\u82a5\u5ddd\u5956", "\u77ed\u7bc7\u5c0f\u8bf4\u4e4b\u738b"],
        "relations": [], "events": []
    },
    {
        "id": "kurosawa", "name": "\u9ed1\u6cfd\u660e", "birth": 1910, "death": 1998,
        "cat": "artist", "emoji": "\U0001f3a5",
        "desc": "\u65e5\u672c\u7535\u5f71\u5bfc\u6f14\uff0c\u4e16\u754c\u7535\u5f71\u53f2\u4e0a\u6700\u4f1f\u5927\u7684\u5bfc\u6f14\u4e4b\u4e00\u3002\u4ee3\u8868\u4f5c\u300a\u7f57\u751f\u95e8\u300b\u300a\u4e03\u6b66\u58eb\u300b\u300a\u4e71\u300b\u300a\u5f71\u6b66\u8005\u300b\uff0c\u5c06\u65e5\u672c\u6587\u5316\u63a8\u5411\u4e16\u754c\u3002\u83b7\u5965\u65af\u5361\u7ec8\u8eab\u6210\u5c31\u5956\u3002",
        "achievements": ["\u300a\u4e03\u6b66\u58eb\u300b", "\u300a\u7f57\u751f\u95e8\u300b", "\u5965\u65af\u5361\u7ec8\u8eab\u6210\u5c31\u5956"],
        "relations": [], "events": []
    },
    {
        "id": "kawabata", "name": "\u5ddd\u7aef\u5eb7\u6210", "birth": 1899, "death": 1972,
        "cat": "artist", "emoji": "\U0001f3c6",
        "desc": "\u65e5\u672c\u4f5c\u5bb6\uff0c\u9996\u4f4d\u83b7\u5f97\u8bfa\u8d1d\u5c14\u6587\u5b66\u5956\u7684\u65e5\u672c\u4eba\u3002\u4ee3\u8868\u4f5c\u300a\u96ea\u56fd\u300b\u300a\u5343\u53ea\u9e64\u300b\u300a\u4f0a\u8c46\u7684\u821e\u5973\u300b\uff0c\u4ee5\u7cbe\u7f8e\u7f8e\u5b66\u548c\u65e5\u672c\u4f20\u7edf\u6587\u5316\u5f55\u4eab\u8a89\u4e16\u754c\u3002",
        "achievements": ["\u8bfa\u8d1d\u5c14\u6587\u5b66\u5956", "\u300a\u96ea\u56fd\u300b", "\u300a\u5343\u53ea\u9e64\u300b"],
        "relations": [], "events": []
    },
]

# ===== 日本新增事件 (8条) =====
JAPAN_EVENTS_NEW = [
    {
        "id": "e_battle_baekgang", "year": 663, "name": "白村江之战", "type": "war",
        "desc": "唐朝与新罗联军在白村江（今韩国锦江）击败日本与百济联军，是中日历史上首次大规模军事冲突。日本惨败后退守本土，全面学习唐朝制度。",
        "dynasty": "飞鸟"
    },
    {
        "id": "e_nara_daibutsu", "year": 752, "name": "奈良大佛开眼", "type": "culture",
        "desc": "东大寺卢舍那大佛（奈良大佛）举行开眼供养仪式，是日本佛教文化鼎盛的象征。大佛高约15米，是日本最大的青铜佛像。",
        "dynasty": "奈良"
    },
    {
        "id": "e_masakado_rebellion", "year": 940, "name": "平将门之乱", "type": "war",
        "desc": "平将门在关东发动叛乱，自称新皇。朝廷派遣藤原忠文讨伐，将门战死。这是日本历史上第一个公开反叛朝廷的武士。",
        "dynasty": "平安"
    },
    {
        "id": "e_nanboku_union", "year": 1392, "name": "南北朝统一", "type": "politics",
        "desc": "室町幕府第三代将军足利义满促成南朝与北朝和解，结束了长达56年的南北朝分裂局面。义满受封为日本国王，与明朝建立勘合贸易。",
        "dynasty": "室町"
    },
    {
        "id": "e_shimabara", "year": 1637, "name": "岛原之乱", "type": "war",
        "desc": "九州岛原和天草地区基督徒和农民联合起义，反抗幕府高压和重税。起义被镇压后，德川幕府彻底禁止基督教，锁国政策进一步强化。",
        "dynasty": "江户"
    },
    {
        "id": "e_abolish_domains", "year": 1871, "name": "废藩置县", "type": "politics",
        "desc": "明治政府废除全国的藩，设立县，将地方权力收归中央。这标志着日本从封建制度彻底转向中央集权的近代国家体制。",
        "dynasty": "明治"
    },
    {
        "id": "e_tokyo_olympic", "year": 1964, "name": "东京奥运会", "type": "culture",
        "desc": "亚洲首次举办奥运会，标志日本战后经济奇迹的巅峰。东海道新干线在奥运会前通车，日本向世界展示了其现代化成就。",
        "dynasty": "昭和"
    },
    {
        "id": "e_bubble_burst", "year": 1990, "name": "泡沫经济崩溃", "type": "economy",
        "desc": "日本股市和房地产泡沫破裂，日经指数暴跌，银行坏账堆积如山。日本经济陷入长期低迷的"失去的三十年"。",
        "dynasty": "平成"
    },
]

# ====================== 执行插入 ======================

# 移除跳过条目
WORLD_NEW = [p for p in WORLD_NEW if p["id"] != "mandela_note"]
WORLD_EVENTS_NEW = [e for e in WORLD_EVENTS_NEW if e["id"] != "e_911_dup"]

# 1. 世界人物：在最后一个 ], 之前插入
world_start = text.find('const WORLD_PERSONS')
world_end = text.find('const WORLD_EVENTS')
before = text[:world_end]
last_bracket = before.rfind('  },')
# 生成人物数据文本
def gen_person(p):
    emoji = p["emoji"]
    rels = ", ".join([f'{{ id: "{r["id"]}", type: "{r["type"]}", label: "{r["label"]}" }}' for r in p["relations"]])
    return f"""
  {{
    id: '{p["id"]}', name: '{p["name"]}', birth: {p["birth"]}, death: {p["death"]},
    cat: '{p["cat"]}', emoji: '{emoji}',
    desc: '{p["desc"]}',
    achievements: {p["achievements"]},
    relations: [{rels}],
    events: {p["events"]}
  }},"""

world_insert = ""
for p in WORLD_NEW:
    world_insert += gen_person(p)

text = text[:last_bracket + 5] + "\n" + world_insert + text[last_bracket + 5:]
print(f"世界 +{len(WORLD_NEW)}人 插入成功")

# 2. 世界事件：在最后一个 }, 之前插入
# 重新定位
we_start = text.find('const WORLD_EVENTS')
jp_start = text.find('const JAPAN_PERSONS')
before2 = text[:jp_start]
last_ev = before2.rfind('  },')
world_ev_insert = ""
for e in WORLD_EVENTS_NEW:
    world_ev_insert += f"""
  {{ id: '{e["id"]}', year: {e["year"]}, name: '{e["name"]}', type: '{e["type"]}', desc: '{e["desc"]}' }},"""

text = text[:last_ev + 5] + "\n" + world_ev_insert + text[last_ev + 5:]
print(f"世界 +{len(WORLD_EVENTS_NEW)}事件 插入成功")

# 3. 日本人物：在最后一个 }, 之前插入
js2 = text.find('const JAPAN_PERSONS')
je2 = text.find('const JAPAN_EVENTS')
before3 = text[:je2]
last_jp = before3.rfind('  },')
jp_insert = ""
for p in JAPAN_NEW:
    jp_insert += gen_person(p)

text = text[:last_jp + 5] + "\n" + jp_insert + text[last_jp + 5:]
print(f"日本 +{len(JAPAN_NEW)}人 插入成功")

# 4. 日本事件：在最后一个 }, 之前插入
je_start = text.find('const JAPAN_EVENTS')
je_end = len(text)  # 到文件末尾
before4 = text[:je_end]
last_je = before4.rfind('  },')
jp_ev_insert = ""
for e in JAPAN_EVENTS_NEW:
    jp_ev_insert += f"""
  {{ id: '{e["id"]}', year: {e["year"]}, name: '{e["name"]}', type: '{e["type"]}', desc: '{e["desc"]}', dynasty: '{e["dynasty"]}' }},"""

text = text[:last_je + 5] + "\n" + jp_ev_insert + text[last_je + 5:]
print(f"日本 +{len(JAPAN_EVENTS_NEW)}事件 插入成功")

# 写回
with open(DATA, 'w', encoding='utf-8') as f:
    f.write(text)

print(f"\n数据更新完成!")
print(f"世界人物: 34 -> {34 + len(WORLD_NEW)}人")
print(f"世界事件: 20 -> {20 + len(WORLD_EVENTS_NEW)}条")
print(f"日本人物: 21 -> {21 + len(JAPAN_NEW)}人")
print(f"日本事件: 21 -> {21 + len(JAPAN_EVENTS_NEW)}条")
