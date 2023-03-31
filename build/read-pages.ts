import { parse } from 'comment-json'
import path from 'path'

import { getJson } from './json'

const CONFIG = {
  includes: ['path', 'aliasPath', 'name']
}

function getPageJsonData() {
  const pagesJsonString = getJson('pages.json', process.env.UNI_INPUT_DIR)
  let pageJsonData: any = {}
  if (pagesJsonString) {
    pageJsonData = parse(pagesJsonString)
  }
  return pageJsonData
}

/**
 * 通过读取pages.json文件 生成直接可用的routes
 */
function getPagesRoutes(pages, rootPath = '') {
  const routes: any = []
  for (let i = 0; i < pages.length; i++) {
    const item = pages[i]
    const route = {}
    for (let j = 0; j < CONFIG.includes.length; j++) {
      const key = CONFIG.includes[j]
      let value = item[key]
      if (key === 'path') {
        value = rootPath ? `/${rootPath}/${value}` : `/${value}`
      }
      if (key === 'aliasPath' && i === 0 && rootPath === null) {
        route[key] = route[key] || '/'
      } else if (value !== undefined) {
        route[key] = value
      }
    }
    routes.push(route)
  }
  return routes
}
/**
 * 解析小程序分包路径
 */
function getNotMpRoutes(subPackages) {
  let routes = []
  if (!subPackages || subPackages.length === 0) {
    return []
  }
  for (let i = 0; i < subPackages.length; i++) {
    const subPages = subPackages[i].pages
    const root = subPackages[i].root
    const subRoutes = getPagesRoutes(subPages, root)
    routes = routes.concat(subRoutes)
  }
  return routes
}

function getRouterByPageJsonData() {
  const { pages, subPackages } = getPageJsonData()
  const pageRoutes = getPagesRoutes(pages)
  const mpRoutes = getNotMpRoutes(subPackages)
  return pageRoutes.concat(mpRoutes)
}

export default getRouterByPageJsonData()
