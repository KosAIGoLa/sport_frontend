export const USER_NICKNAME = '企鹅玩家Kc2hI9'
export const USER_AVATAR = 'https://uc2.qiecdn.com/avatar.php?uid=28030520&size=middle&force=1'

export const USER_STATS = { videos: 0, plays: 0, fans: 0 }

export const PROFILE_TABS = [
  { key: 'basic', label: '基本资料' },
  { key: 'avatar', label: '修改头像' },
  { key: 'nickname', label: '修改昵称' },
  { key: 'realname', label: '实名认证' },
  { key: 'phone', label: '绑定手机' }
]

export const WEALTH_TABS = [
  { key: 'liver', label: '鹅肝消费记录' },
  { key: 'eggs', label: '鹅蛋记录' },
  { key: 'equipment', label: '装备包使用记录' },
  { key: 'tickets', label: '门票消费' },
  { key: 'coupons', label: '卡券明细' }
]

export const MEDAL_FILTERS = ['NBA球队热度榜', 'NBA死忠粉丝榜', '首充活动', '锦旗', '2019春节活动', '商城专卖']

export const MEDALS = [
  { name: '76人', icon: '🏀', color: '#ed1c24' },
  { name: '湖人', icon: '💛', color: '#552583' },
  { name: '掘金', icon: '⛰️', color: '#0e2240' },
  { name: '开拓者', icon: '⚔️', color: '#e03a3e' },
  { name: '快船', icon: '🚢', color: '#1d428a' },
  { name: '马刺', icon: '🤠', color: '#c4ced4' },
  { name: '鹈鹕', icon: '🐦', color: '#0c2340' },
  { name: '小牛', icon: '🐴', color: '#00538c' }
]

export const FOLLOW_LIST = [
  {
    id: 1,
    name: '乔氏台球002',
    avatar: '/assets/avatars/avatar.png',
    cover: '/assets/teams/team1.png',
    title: '乔氏台球002的直播间',
    viewers: '1144',
    tag: '台球',
    liveLink: '/room/1'
  },
  {
    id: 2,
    name: '阿祖又收了',
    avatar: '/assets/avatars/avatar.png',
    cover: '/assets/teams/team2.png',
    title: '【阿祖】U20 德国VS塞尔维亚',
    viewers: '62012',
    tag: '篮球',
    liveLink: '/room/2'
  }
]

export const HISTORY_LIST = [
  {
    id: 1,
    title: '乔氏台球002的直播间',
    author: '乔氏台球002',
    avatar: '/assets/avatars/avatar.png',
    cover: '/assets/teams/team1.png',
    viewers: '1016',
    isLive: true,
    link: '/room/1'
  },
  {
    id: 2,
    title: '【阿祖】U20 法国VS立陶宛',
    author: '阿祖又收了',
    avatar: '/assets/avatars/avatar.png',
    cover: '/assets/teams/team2.png',
    viewers: '5.0万',
    isLive: true,
    link: '/room/2'
  }
]

export const USER_MESSAGES = [
  {
    title: '官方公告',
    date: '2026-04-30',
    content: '反诈中心提示您：临近假期，出行要提高反诈意识，接到自称航空公司客服拨打的关于退票或理赔电话，务必通过官方渠道确认。购买各类商品及演唱会门票，要通过官方平台。购买体育彩票要到线下实体店，任何通过网络销售的体育彩票都是非法彩票。凡是让您点击陌生链接、下载陌生APP或索要银行卡密码、短信验证码的，都是诈骗。'
  },
  {
    title: '官方公告',
    date: '2026-04-17',
    content: '官方提示：电信网络诈骗手法千变万化，各种套路层出不穷，请您牢记：陌生来电不轻信、未知链接不点击、个人信息不遗漏、转账汇款多核实。祝您生活愉快！'
  }
]

export function createUserMenu(IconFollow) {
  return [
    { key: 'profile', label: '我的资料', path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
    { key: 'message', label: '我的消息', path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
    { key: 'wealth', label: '我的财富', path: 'M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-6 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z' },
    { key: 'follow', label: '我的关注', component: IconFollow },
    { key: 'order', label: '视频订单', path: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z' },
    { key: 'history', label: '观看历史', path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
    { key: 'appointment', label: '赛事预约', path: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z' },
    { key: 'guess', label: '我的趣猜', path: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.38 4.94A5.005 5.005 0 0012 19.94 5.005 5.005 0 0016.62 12.94C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82c-.85-.25-1.51-.99-1.51-1.93V7h2v3.82zm11-1.93c0 .94-.66 1.68-1.51 1.93V7h2v1.89z' },
    { key: 'medal', label: '我的奖牌', path: 'M7 2h10v6l-5 4-5-4V2zM12 14a6 6 0 100 12 6 6 0 000-12z' },
    { key: 'contribute', label: '我的投稿', path: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z' },
    { key: 'collection', label: '视频收藏', path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
    { key: 'room', label: '房间管理', path: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' },
    { key: 'realname', label: '实名认证', path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' }
  ]
}

export function wealthColumnsFor(tab) {
  switch (tab) {
    case 'eggs': return ['时间', '主播', '类型', '额度']
    case 'equipment': return ['消费时间', '使用点', '物品', '数量']
    case 'tickets': return ['消费时间', '直播间', '类型', '额度']
    case 'coupons': return ['时间', '卡券名称', '方式', '数量']
    default: return ['消费时间', '主播', '礼物', '单价（鹅肝）', '数量']
  }
}

export function wealthEmptyTextFor(tab) {
  switch (tab) {
    case 'equipment': return '--暂无使用记录--'
    case 'tickets': return '--暂无数据--'
    case 'coupons': return '--暂无卡券明细--'
    default: return '--暂无消费记录--'
  }
}
