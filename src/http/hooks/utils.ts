import proxyUni from '@pc/common/ui/index'
import to from 'await-to-js'

// 处理典型的接口请求，最终返回数据
export async function processReturn(reqFn, options = {}) {
  const { needSuccessTip = false, needNativeRep = false, needLoading = true } = options
  needLoading && proxyUni.showLoading()
  const [err, res] = await to(reqFn)
  needLoading && proxyUni.hideLoading()
  if (err || !res) {
    console.log(err, '接口请求出错')
    return
  }

  const { code, msg, data } = res
  if (code === 200) {
    needSuccessTip &&
      proxyUni.showToast({
        title: msg
      })
  } else {
    const errTxt = msg || '未知错误'
    proxyUni.showToast({
      title: errTxt
    })
    return
  }
  return needNativeRep ? res : data
}
