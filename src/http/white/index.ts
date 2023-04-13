// 以下必须填入完整请求路径，不然可能会造成请求拦截错误

// 不要求token的接口
export const whiteLists = [
  '/appUser/appVersion',
  '/cooperative/user/login', //登录接口
  '/broke/sms/smsCode',
  '/common/getHomePageConfig'
]

// 需要更原生的response的接口
export const nativeLists = []
