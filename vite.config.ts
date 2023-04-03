// vite-plugin-restart 不起作用
// vite-plugin-environment 不起作用，
import uni from '@dcloudio/vite-plugin-uni'
import AutoImportTypes from 'auto-import-types'
import { resolve } from 'path'
import PiniaAutoRefs from 'pinia-auto-refs'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import commonjs from 'vite-plugin-commonjs'

import ROUTES from './build/route'
console.log(ROUTES, '生成的路由')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    define: {
      ROUTES,
      npmPackageInfo: { name: '1', version: '1', lastVersion: '1' }
    },
    plugins: [
      commonjs(),
      AutoImportTypes({
        dtsDir: 'types'
      }),
      PiniaAutoRefs(),
      AutoImport({
        dts: 'types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
        imports: [
          'vue',
          'uni-app',
          'pinia',
          {
            '@/helper/pinia-auto-refs': ['useStore']
          }
        ],
        // resolvers: [VantResolver()],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: 'readonly' // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      Components({
        // 指定组件位置，默认是src/components
        dirs: ['src/components'],
        // ui库解析器
        // resolvers: [VantResolver()],
        extensions: ['vue'],
        // 配置文件生成位置
        dts: 'types/components.d.ts'
      }),
      uni(),
      Unocss()
    ],
    server: {
      port: 3001,
      open: true, //自动打开
      base: './ ', //生产环境路径
      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // 正则表达式写法
        '^/api': {
          target: 'http:192.168.0.0:0000', // 后端服务实际地址
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
