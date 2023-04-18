import { $get, $post, $put } from '@/http/request'

// 协同事项数量
export function httpPostJointMatterCount(params) {
  return $post('/broke/jointMatter/queryCount', params)
}
// 协同单位
export function httpGetCooperativeAccountList(params) {
  return $get('/broke/jointMatter/getCooperativeAccountList', params)
}
// 协同事项列表
export function httpPostJointMatterList(params) {
  return $post('/broke/jointMatter/queryPage', params)
}

// 新增事项
export function httpPutAddJointMatter(params) {
  return $put('/broke/jointMatter/addSmsNotice', params)
}

// 更新已读状态
export function httpPutUpdateRead(params) {
  return $put('/broke/jointMatter/doReadJoinMatter', params)
}

// 新增回复
export function httpPutAddReply(params) {
  return $put('/broke/jointMatter//addJointMatteReply', params)
}
// 办结
export function httpPutDoClose(params) {
  return $put('/broke/jointMatter/doCloseJoinMatter', params)
}
// 协同事项详情
export function httpGetJoinMatterDetail(params) {
  return $get('/broke/jointMatter/getJoinMatterDetail', params)
}

// 回复列表
export function httpPostJoinMatterReplyPage(params) {
  return $post('/broke/jointMatter/getJoinMatterReplyPage', params)
}
// 详情中 回复列表中回复详情
export function httpGetJinMatterReplyDetail(params) {
  return $get('/broke/jointMatter/getJoinMatterReplyDetail', params)
}
