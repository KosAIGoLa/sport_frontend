# 857 Live Clone

A clone of the 857 Live homepage built with Nuxt 4 + Vue 3.

## Project Structure

```
857zb92/
├── app/
│   ├── components/        # Reusable Vue components
│   │   ├── Carousel.vue     # Generic horizontal carousel
│   │   ├── LiveCard.vue     # Generic live card
│   │   ├── Icon.vue         # SVG icon component
│   │   ├── FormInput.vue    # Form input
│   │   ├── SocialLogin.vue  # Third-party login
│   │   ├── HotAnchors.vue   # Popular anchors carousel
│   │   ├── AppointmentList.vue  # Match booking carousel
│   │   ├── LiveCategory.vue     # Categorized live list
│   │   ├── HotLives.vue         # Popular live cards
│   │   ├── HeroSection.vue      # Hero live area
│   │   ├── LoginModal.vue       # Login / register modal
│   │   ├── SiteHeader.vue       # Top navigation
│   │   ├── SiteFooter.vue       # Footer
│   │   └── RightFix.vue         # Right-side fixed toolbar
│   ├── layouts/           # Layouts
│   ├── pages/             # Routes
│   └── app.vue            # App entry
├── public/                # Static assets
├── nuxt.config.ts         # Nuxt config
├── package.json
├── LICENSE                # License
└── README.md
```

## Page Modules

- Transparent top navbar (turns solid on scroll)
- Hero live area (large banner + side live list)
- Popular live cards
- Popular anchors carousel
- Categorized live list (football, basketball, others)
- Right-side fixed toolbar (back to top, download app, feedback)
- Login / register modal
- Dark footer

## Give a Star

If this project helps you, feel free to click the **Star ⭐** button in the top-right corner of the repository!

> Starring does not trigger any notifications, but it helps the author get feedback and makes the repository more discoverable.

## Getting Started

```bash
pnpm install
pnpm dev
```

Local preview: `http://localhost:3000`

## Page Preview

![Home Preview](./screen/img.png)

![Match Detail Preview](./screen/img_1.png)

## Page Transitions

The project enables Nuxt View Transitions and a fade in/out fallback:

- `experimental.viewTransition: true` in `nuxt.config.ts`
- `app.pageTransition: { name: 'page', mode: 'out-in' }` in `nuxt.config.ts`
- `app/assets/css/view-transitions.css` handles the old page fade-out, new page fade-in, and shared cover transitions for live rooms

Internal navigation must use Nuxt client-side routing, e.g. `NuxtLink`, `navigateTo()`, or `router.push()`. Do not use plain `<a href="/...">` for internal links, otherwise it triggers a full page reload and View Transitions / fade animations will not work.

External links, download links, and backup URLs can still use normal `<a>` with `target="_blank"`.

## Static Build

This project uses `nuxt build` to generate static files. Upload the `dist` folder for deployment.

```bash
pnpm build
```

Build output directory: `dist`

For a fast build (skip JS obfuscation and Gzip/Brotli compression):

```bash
pnpm build:fast
```

To preview the static site locally:

```bash
pnpm preview
```

## Compression & Obfuscation

The following optimizations are built in and enabled by default for production builds (`pnpm build`):

| Feature | Dependency | Description |
|------|------|------|
| JS obfuscation | `vite-plugin-javascript-obfuscator` | Obfuscates `.vue` / `.ts` files under `app/` |
| CSS compression | `cssnano` + `autoprefixer` | Minifies CSS and adds vendor prefixes |
| Asset compression | `vite-plugin-compression2` | Generates `.gz` and `.br` files |

Config entry: `nuxt.config.ts`.

To adjust obfuscation strength, modify `vite.plugins.obfuscatorPlugin.options` in [javascript-obfuscator options](https://github.com/javascript-obfuscator/javascript-obfuscator#options).

## Internationalization (i18n)

The project uses a lightweight custom lazy-loaded i18n setup:

- Locale files are split under `app/locales/` (`zh-CN.js`, `en-US.js`)
- `app/composables/useI18n.js` exposes `useI18n()` with `t(key)`, `locale`, and `loadLocale()`
- Browser language is detected on the client; `zh*` maps to `zh-CN`, `en*` maps to `en-US`, and all other languages fall back to `zh-CN`
- Only the selected locale chunk is loaded at runtime via `import.meta.glob('../locales/*.js')`

Main UI strings in navigation, mobile sticky bar, mobile follow panel, header, login modal, live/match/room pages, and LiveCard use this composable. Mock sports/team/anchor/chat data remains hardcoded Chinese unless explicitly requested.

## License

This project is open source under the [MIT License](LICENSE). You must retain the original copyright notice and license when using, modifying, or distributing this project.

Copyright (c) 2026 kboy <kosbox101@gmail.com>
