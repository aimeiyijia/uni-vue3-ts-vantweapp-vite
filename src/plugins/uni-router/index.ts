export { runtimeQuit } from './app/appPatch'
export * from './helpers/utils'
export * from './options/base'
export * from './options/config'
export { createRouter, RouterMount } from './public/router'

const version = npmPackageInfo.version
if (/[A-Z]/g.test(version)) {
  console.warn(
    `【${npmPackageInfo.name.toLocaleLowerCase()} 提示】：当前版本 ${version.toLocaleLowerCase()} 此版本为测试版。有BUG请退回正式版，线上正式版本：${
      npmPackageInfo.lastVersion
    }`
  )
}
