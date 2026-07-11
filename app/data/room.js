/** 直播间 mock 数据 — 后续可替换为 API */

export const ROOM_TEST_STREAM_URL =
  'https://hwplay.zoxo5.com/live/245090_1783733418.flv?auth_key=1783751112-0-0-dc1dfac32fff622c05a33be48a665a54'

export const ROOM_PROXY_STREAM_URL = `/api/proxy?url=${encodeURIComponent(ROOM_TEST_STREAM_URL)}`

export const DEFAULT_ROOM_INFO = {
  name: '一起来聊球',
  anchor: '老万',
  hot: '61464',
  avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg'
}

export const SCORE_ROWS = [
  { time: '23:30', status: '中', home: '格力夫克女足', score: '2-0', away: '赫尔辛基球队B队女足', half: '1-3', live: '直播' },
  { time: '23:30', status: '中', home: '奥莫尼亚（中）', score: '1-2', away: '贝夏普尔', half: '0-2', live: '动画' },
  { time: '23:45', status: '38’', home: '希奥利艾', score: '0-0', away: '萨尔格里斯', half: '2-2', live: '直播' },
  { time: '00:00', status: '22’', home: '潭美卡', score: '1-1', away: '哈留足球学院', half: '0-1', live: '直播' },
  { time: '00:00', status: '18’', home: '基尔梅斯阿根廷', score: '0-0', away: '埃斯卡拉达', half: '0-1', live: '直播' },
  { time: '00:00', status: '21’', home: '意大利亚诺', score: '0-0', away: '皇家皮拉尔', half: '1-2', live: '动画' },
  { time: '00:00', status: '24’', home: '萨卡兹斯帕斯', score: '1-0', away: '祖文图德尤尼达', half: '0-2', live: '直播' },
  { time: '00:00', status: '19’', home: '阿雷纳斯胜利队', score: '0-0', away: '巴拉圭竞技', half: '0-0', live: '直播' },
  { time: '00:00', status: '14’', home: '波士顿河女足', score: '0-1', away: '海湾女足', half: '0-1', live: '动画' }
]

export const RANK_USERS = [
  { rank: 1, name: '💖精彩💖', lv: 8, score: '13810', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg' },
  { rank: 2, name: '🚫船长☢', lv: 5, score: '11540', avatar: 'https://sta.ncctrials.com/file/head/20240208/4b36b5f6ef44fa066dac6ec92482c763.jpg' },
  { rank: 3, name: '✨星星✨', lv: 2, score: '7168', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg' },
  { rank: 4, name: '范巴斯藤2', lv: 4, score: '4240', avatar: '/assets/avatars/avatar.png' },
  { rank: 5, name: '🐉小神龙', lv: 5, score: '3475', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg' },
  { rank: 6, name: '球队小神', lv: 4, score: '3062', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg' },
  { rank: 7, name: '朱古力炒蛋', lv: 3, score: '2517', avatar: '/assets/avatars/avatar.png' },
  { rank: 8, name: '球场边', lv: 2, score: '1986', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg' },
  { rank: 9, name: '蓝海', lv: 1, score: '1650', avatar: 'https://sta.ncctrials.com/file/head/20260228/1d35c871f0eae83d76dc1c6c7e30e174.jpg' }
]

export const ROOM_SCHEDULES = [
  { title: '一起来聊球1', league: '一起来聊球', date: '今天', time: '19:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球2', league: '一起来聊球', date: '今天', time: '23:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球3', league: '一起来聊球', date: '07-07', time: '19:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球4', league: '一起来聊球', date: '07-07', time: '23:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球5', league: '一起来聊球', date: '07-08', time: '19:00', home: '一起来聊球', away: '一起来聊球' }
]

export const RECOMMENDED_LIVES = [
  { title: '爱沙甲 潭美卡VS哈留足球学院', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240222/23a0fd3943d7d814ba5f46a3c316dd25.png', anchor: '司马老贼', viewers: '5.20w', href: '/room/238362?scheduleId=undefined' },
  { title: '哈萨克超 卡萨尔vs伊特什', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251112/7c61f9874371fec5fd7b73df63fb23e5.jpg', anchor: '大帝', viewers: '8.52w', href: '/room/765648?scheduleId=undefined' },
  { title: '欧青U19 乌克兰U19 VS 意大利U19', cover: 'https://sta.ncctrials.com/file/common/20260627/f41c9604ab224cf5c9daeaff94356933_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg', anchor: '大熊', viewers: '5.55w', href: '/room/551893?scheduleId=undefined' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: 'https://sta.ncctrials.com/file/common/20260705/da243db7abd0bf0d3660c1766abf1908_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '评述员阿虎', viewers: '11.30w', href: '/room/506605?scheduleId=undefined' },
  { title: '芬甲 MP米克力 VS 哈卡', cover: 'https://sta.ncctrials.com/file/common/20250505/b81f3e7b51f21db55760ca678cf672ef_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20230409/07e5fa23d5829784c70851c16bc1a1a8.png', anchor: '茶茶爱看球', viewers: '5.26w', href: '/room/346346?scheduleId=undefined' },
  { title: '世欧预 格鲁吉亚vs西班牙', cover: 'https://sta.ncctrials.com/file/common/20260509/cbed26223a5f4dedba17eab9339d2c4c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240316/7f93ace06b551d5bcc8d261b6c464eeb.jpg', anchor: '小新（粵語）', viewers: '5.04w', href: '/room/1573951?scheduleId=undefined' },
  { title: '哈萨克超：奥达巴斯vs乌雷套', cover: 'https://sta.ncctrials.com/file/common/20250805/b38bb3088a743ba2aef1ea3df0e3a24d_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5', anchor: '都教授', viewers: '8.29w', href: '/room/896956?scheduleId=undefined' },
  { title: '一起来聊球', cover: 'https://sta.ncctrials.com/file/common/20230217/7045823059a1d115eda50c8c616609da_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg', anchor: '车太勤', viewers: '6.31w', href: '/room/491355?scheduleId=undefined' },
  { title: '一起来聊球', cover: 'https://sta.ncctrials.com/file/common/20260404/1d08caafb9db4e9311556c8f5a595760_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240208/4b36b5f6ef44fa066dac6ec92482c763.jpg', anchor: '咖球皇帝', viewers: '6.20w', href: '/room/287671?scheduleId=undefined' },
  { title: '〖瑞典超〗埃尔夫斯堡 ▲ 哈马比', cover: 'https://sta.ncctrials.com/file/common/20260705/45717f0b20b8567fbe1e6e46902e1fc9_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20221206/e67279aa3ea0f7aeae85a95bdb43a044.png', anchor: '八💥佰', viewers: '12.94w', href: '/room/308116?scheduleId=undefined' },
  { title: '智利杯：塞雷那 VS 安托法加斯塔', cover: 'https://sta.ncctrials.com/file/common/20260506/942354ec3d25c234f06c1475986300a9_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20231118/c51b26949b0c3e6c6cb61ddf5a5e2111.png', anchor: '百万', viewers: '3.21w', href: '/room/534857?scheduleId=undefined' },
  { title: '欧青U19 塞尔维亚U19 VS 克罗地亚U19', cover: 'https://sta.ncctrials.com/file/common/20251018/e70adcbbbcec4010594a7993ae47189c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251018/c2a03d3cebf1d8f5d993114d84419224.jpg', anchor: '金州-拉文', viewers: '3.18w', href: '/room/774913?scheduleId=undefined' },
  { title: '哈萨克超 卡萨尔 VS 伊特什', cover: 'https://sta.ncctrials.com/file/common/20260628/22ab415fae30a1b5eb8947547e7c7608_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240809/e3c7f4be827023a392a0a817adbb105b.jpg', anchor: '奥巴（粤语）', viewers: '3.15w', href: '/room/572879?scheduleId=undefined' },
  { title: '清源直播间', cover: 'https://sta.ncctrials.com/file/live/room/cover/160590.jpg?t=1783262031', avatar: 'https://sta.ncctrials.com/file/head/20200910/087cb14b5636264a67a93433632899ef', anchor: '卫星小牛', viewers: '1261', href: '/room/160590?scheduleId=undefined' }
]

export function createInitialChatMessages(t) {
  return [
    { lv: 3, name: '琳子', text: '哦，都是在群里分享的' },
    { lv: 2, name: '大果头', text: '初盘英格兰怎么看' },
    { lv: 3, name: '琳子', text: '这是没有说明' },
    { lv: 3, name: '琳子', text: '不是呀我说的是直播间没说中途有什么***什么时候去' },
    { lv: 2, name: '大果头', text: '英格兰呢' },
    { lv: 3, name: '我', text: '我觉得英格兰这场稳了，主场优势很大', self: true },
    { lv: 8, name: '💖精彩💖', text: '主播红包', type: 'redpacket', opened: false, time: t('page.justNow') },
    { lv: 2, name: '大果头', text: '墨西哥怎么看' },
    { lv: 8, name: '群管理', title: '群管公告', text: '请大家文明发言，禁止发布广告和违规内容', type: 'announcement', time: t('page.justNow') },
    { lv: 8, name: '活动助手', title: '充值返现活动', text: '今日充值满100送20，限时活动先到先得', link: 'https://example.com/activity', linkText: '立即参与', type: 'activity', time: t('page.justNow') },
    { lv: 3, name: '琳子', text: '瞌睡来了 😂' },
    { lv: 5, name: '帅帅🔥C99999', text: '领取包赔、体育链接、添加66号：C99999🔥' },
    { lv: 2, name: '大果头', text: '墨西哥几比几' },
    { lv: 3, name: '我', text: '墨西哥应该能赢一球', self: true },
    { lv: 3, name: '琳子', text: '睡了拜拜' },
    { lv: 5, name: t('page.assistant'), text: '欢迎来到直播间，有问题随时咨询我哦', assistant: true },
    { lv: 1, name: '新手小白', text: '第一次来，多多关照' },
    { lv: 6, name: '紫霞仙子', image: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', text: '看看这张图', type: 'image' },
    { lv: 6, name: '紫霞仙子', text: '这场节奏不错，继续跟' },
    { lv: 7, name: '玫瑰骑士', text: '老万分析得太稳了' },
    { lv: 1, name: '游客007', text: '进入直播间', type: 'entry' },
    { lv: 2, name: '大果头', text: '进入直播间', type: 'entry' },
    { lv: 3, name: '琳子', text: '进入直播间', type: 'entry' },
    { lv: 5, name: '帅帅🔥C99999', text: '进入直播间', type: 'entry' },
    { lv: 6, name: '紫霞仙子', text: '进入直播间', type: 'entry' },
    { lv: 7, name: '玫瑰骑士', text: '进入直播间', type: 'entry' },
    { lv: 8, name: '💖精彩💖', text: '进入直播间', type: 'entry' }
  ]
}
