// router.js
import type { platformRule } from '../plugins/uni-router'
import { createRouter, RouterMount } from '../plugins/uni-router'

console.log(ROUTES, '共享路由')
const router = createRouter({
  platform: (process.env.VUE_APP_PLATFORM as platformRule) || 'mp-weixin',
  routes: [...ROUTES],
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束')
})

console.log(router, '路由哈哈哈')

// setTimeout(() => {
//   console.log('要跳转了')
//   router.push('/pages/test/test')
// }, 2000)

export { router, RouterMount }
