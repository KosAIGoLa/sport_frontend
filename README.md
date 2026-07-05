# 857直播仿站

基于 Nuxt 4 + Vue 3 实现的 857 直播首页仿制项目。

## 项目结构

```
857zb92/
├── app/
│   ├── components/        # 可复用 Vue 组件
│   │   ├── Carousel.vue     # 通用横向轮播
│   │   ├── LiveCard.vue     # 通用直播卡片
│   │   ├── Icon.vue         # SVG 图标组件
│   │   ├── FormInput.vue    # 表单输入框
│   │   ├── SocialLogin.vue  # 第三方登录
│   │   ├── HotAnchors.vue   # 热门主播轮播
│   │   ├── AppointmentList.vue  # 赛程预约轮播
│   │   ├── LiveCategory.vue     # 分类直播列表
│   │   ├── HotLives.vue         # 热门直播卡片
│   │   ├── HeroSection.vue      # 主视觉直播区
│   │   ├── LoginModal.vue       # 登录/注册弹窗
│   │   ├── SiteHeader.vue       # 顶部导航
│   │   ├── SiteFooter.vue       # 页脚
│   │   └── RightFix.vue         # 右侧固定工具栏
│   ├── layouts/           # 页面布局
│   ├── pages/             # 页面路由
│   └── app.vue            # 应用入口
├── public/                # 静态资源
├── nuxt.config.ts         # Nuxt 配置
├── package.json
└── README.md
```

## 页面模块

- 顶部透明导航栏（滚动后变白）
- 主视觉直播区（大 Banner + 右侧直播列表）
- 热门直播卡片
- 热门主播轮播
- 分类直播列表（足球、篮球、其他）
- 右侧固定工具栏（返回顶部、下载 APP、意见反馈）
- 登录 / 注册弹窗
- 深色页脚

## 给项目点 Star

如果觉得这个项目对你有帮助，欢迎点击仓库右上角的 **Star ⭐** 按钮支持一下！

> 点 Star 不会收到任何通知，但可以帮助作者获得反馈，也能让更多人发现这个仓库。

## 启动

```bash
pnpm install
pnpm dev
```

本地预览地址：`http://localhost:3000`

## 页面预览

![首页预览](./screen/img.png)

## 构建

```bash
pnpm build
pnpm preview
```
