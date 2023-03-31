import 'uno.css'

import { createSSRApp } from 'vue'

import store from '@/store'

import App from './App.vue'
import { router } from './router'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(router)
  return {
    app
  }
}
