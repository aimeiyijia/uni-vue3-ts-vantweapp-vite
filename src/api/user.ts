import { $get, $post } from '@/http/request'

// 获取省级目录
export function httpGetProvince(params) {
  return $get('/getProvince', params)
}
// 登录
export function httpPostCooperativeLogin(params) {
  return $post('/cooperative/user/login', params)
}

// 重置密码
export function httpPostResetPassword(params) {
  return $post('/cooperative/user/resetPassword', params)
}

// 修改密码
export function httpPostModifyPassword(params) {
  return $post('/cooperative/user/modifyPassword', params)
}

// 修改用户信息
export function httpPostModifyUserInfo(params) {
  return $post('/cooperative/user/modifyUserInfo', params)
}
