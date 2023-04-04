import type { HttpError, HttpRequestConfig, HttpResponse } from 'luch-request'

import { router } from '@/router'
import useUserStore from '@/store/user'

import { goEncrypt } from '../../encrypt'
import { nativeLists, whiteLists } from '../../white'

const userStore = useUserStore()
// 请求拦截器
export function requestInterceptors(config: HttpRequestConfig) {
  console.log(config, '请求配置')
  const { url } = config
  const { token, platform } = userStore

  // 接口请求头UserRole
  // 暂不从userInfo中取，后续根据实际情况修改
  if (platform) {
    config.header!.UserRole = platform
  }
  // 白名单
  if (url && whiteLists.includes(url)) {
    return goEncrypt(config)
  }

  // 请求认证
  if (token) {
    config.header!.Authorization = token
  } else {
    console.log(url, '错误的url')
    console.log('这里写登录失效或未登录逻辑')
  }

  return goEncrypt(config)
}
// 请求拦截器 错误处理
export function requestError(error: HttpRequestConfig): Promise<HttpRequestConfig> {
  return Promise.reject(error)
}
// 响应拦截器
export function responseInterceptors(response: HttpResponse) {
  return response
}
// 响应拦截器 错误处理
export function responseError(error: HttpError): Promise<HttpError> {
  return Promise.reject(error)
}
