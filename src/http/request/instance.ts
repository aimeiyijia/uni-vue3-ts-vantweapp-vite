import ProxyUni from '@pc/common/ui'
import Request from 'luch-request'

import { router } from '@/router'
import store from '@/store'

import { goEncrypt } from '../encrypt'
import { nativeLists, whiteLists } from '../white/whiteList.js'

let allowShowReLoginTip = true

// 调整登录页面
function goLogin() {
  router.replaceAll({
    name: 'Login'
  })
}

// 重新登录弹窗
function reLogin(content) {
  ProxyUni.showConfirmModal({
    title: '提示',
    content,
    confirmText: '去登录',
    complete: () => {
      allowShowReLoginTip = true
      goLogin()
      store.commit('clearToken')
      store.commit('clearUserInfo')
    }
  })
}

const instance = new Request({
  baseURL: pcglConfig.baseURL,
  timeout: 60000
})

instance.interceptors.request.use(
  (config) => {
    console.log(config, '请求配置')
    const url = config.url
    const { token, platform } = store.state

    // 接口请求头UserRole
    // 暂不从userInfo中取，后续根据实际情况修改
    if (platform) {
      config.header.UserRole = platform
    }
    // 白名单
    if (whiteLists.find((o) => url.indexOf(o) !== -1)) {
      return goEncrypt(config)
    }

    // 请求认证
    if (token) {
      config.header.Authorization = token
    } else {
      console.log(url, '错误的url')
      if (allowShowReLoginTip) {
        allowShowReLoginTip = false
        reLogin('您已登录失效或在其它地方登录，请回登录页登录！')
      }
    }

    return goEncrypt(config)
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use((response) => {
  const { config } = response
  const resData = response.data

  console.log(response, '响应')

  // 401: token 过期了;
  if (resData.code === 401) {
    if (allowShowReLoginTip) {
      allowShowReLoginTip = false
      reLogin('您已登录失效或在其它地方登录，请回登录页登录！')
    }
  }

  if (nativeLists.includes(config.url)) return response
  return resData
})

export default instance
