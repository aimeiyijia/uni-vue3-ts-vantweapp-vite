import to from 'await-to-js'
import type { HttpError, HttpRequestConfig, HttpResponse } from 'luch-request'
import { ref } from 'vue'
interface IProcessResponse {
  code: number
  msg: string
  data: any
}
interface IParams {
  loadingText?: string
}
export async function useRequest(fn: Promise<any>, params?: IParams) {
  const { loadingText = '' } = params || {}
  // 请求是否成功的状态指示
  let status = false
  uni.showLoading({
    mask: true,
    title: '加载中'
  })
  const [err, response] = await to<IProcessResponse>(fn)
  uni.hideLoading()

  if (err || !response) {
    console.log(err, '接口请求出错')
    status = false
    return {
      status,
      code: '',
      data: null,
      msg: ''
    }
  }

  const { code, msg, data } = response
  if (code === 200) {
    status = true
    console.log('请求成功且获取到了数据')
  } else {
    status = false
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: msg
    })
  }
  return {
    status,
    code,
    data,
    msg: ''
  }
}
