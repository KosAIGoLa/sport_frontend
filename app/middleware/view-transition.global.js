/**
 * 所有路由默认启用 View Transition（页面可自行 meta.viewTransition = false 关闭）
 */
export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.viewTransition === undefined) {
    to.meta.viewTransition = 'always'
  }
})
