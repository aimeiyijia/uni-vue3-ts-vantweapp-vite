// router.js
import type { platformRule } from '../plugins/uni-router'
import { createRouter, RouterMount } from '../plugins/uni-router'
const router = createRouter({
  platform: (process.env.VUE_APP_PLATFORM as platformRule) || 'mp-weixin',
  routes: [...ROUTES]
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束')
})

export { router, RouterMount }
