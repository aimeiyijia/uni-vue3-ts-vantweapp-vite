import { $get } from '@/http/request'

// 获取省级目录
export function httpGetProvince(params) {
  return $get('/getProvince', params)
}
