/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let ROUTES

declare interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

declare interface ViteEnv {
  VITE_USE_MOCK: Boolean
  VITE_USE_ERUDA: Boolean
  VITE_USE_COMPRESS: Boolean
  VITE_USE_REPORT: Boolean
}
