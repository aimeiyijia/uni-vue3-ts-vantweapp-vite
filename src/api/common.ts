import { $get, $post, $put } from '@/http/request'

export function httpGetAhListByUserCode(params) {
  return $get('/waj/getAhListByUserCode', params)
}

export function httpGetAhListByUserCodeCreditor(params) {
  return $get('/waj/getAhListByUserCodeCreditor', params)
}
export function httpGetAhListByUserCodeNj(params) {
  return $get('/waj/getAhListByUserCodeNj', params)
}

// 获取验证码
export function httpGetSmsCode(params) {
  return $get('/broke/sms/smsCode', params)
}

// 验证手机
export function httpPutVerifyPhone(params) {
  return $put('/user/verifyPhone', params)
}

// 获取微信人脸access_token
export function httpPostWxToken(params) {
  return $post('/rlsb/getWxToken', params)
}

// 人脸验证成功后将成功消息推送给后端，存储到redis
export function httpPostAddResultToRedis(params) {
  return $post('/common/authenticationAddRedis', params)
}

// 更新实名认证状态
export function httpPostUpdateAuth(params) {
  return $post('/orgUser/updateIsAuth', params)
}

// 获取 tsdm
export function httpGetTsDm(params) {
  return $get('/tsdm/getTsdm', params)
}

// 获取银行下拉
export function httpGetBankMsg(params) {
  return $get('/broke/fundsAccount/getBankMsg', params)
}

// 根据bankName查询列表
export function httpGetSelectBankByName(params) {
  // 银行
  return $get('/admin/recieverBank/selectByName', params)
}

// 获取消息提醒列表
export function httpPostNoticeList(params) {
  return $post('/broke/notice/record', params)
}

// 提醒事项下拉列表
export function httpGetNoticeTemplate(params) {
  return $get('/broke/notice/template', params)
}
// 获取当前用户消息提醒数量
export function httpGetNoticeRecords(params) {
  return $get('/broke/notice/record/sum', params)
}
// 标记已读
export function httpPutNoticeRecord(params) {
  return $put('/broke/notice/record/read', params)
}

// 获取当前用户消息提醒数量
export function httpGetAppVersion(params) {
  return $get('/appUser/appVersion', params)
}
