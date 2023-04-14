import cloneDeep from 'lodash.clonedeep'
import isObject from 'lodash.isobject'

function clearObj(obj, skip: Object | string[]) {
  const skipIsArray = Array.isArray(skip)
  const skipIsObject = isObject(skip)
  Object.keys(obj).forEach(key => {
    if (skipIsArray && !skip.includes(key)) {
      delete obj[key]
    }
    if (skipIsObject && !Object.hasOwn(skip, key)) {
      delete obj[key]
    }
  })
}
export interface UserInfo {
  contactCardNo: string
  contactName: string
  contactPhone: string
  cooperativeAccountId: string
  createTime: number
  createUserCode: string
  createUserName: string
  departmentAddress: string
  departmentName: string
  fydm: string
  lastUpdate: number
  needUpdatePassword: boolean
  ssxzqh: string
  token: string
  updateTime: number
  userName: string
  userRoleCode: string
}
export interface RememberLoginInfo {
  roleCode: string
  isNeedVerify: string
  isRemember: boolean
  userName: string
}
export interface UserInfoStore {
  userInfo: UserInfo
  platform: string
  rememberLoginInfo: RememberLoginInfo
}
// userRoleCode: 'cooperative'
export default defineStore({
  id: 'userInfo',
  persist: {
    // 开启持久化
    enabled: true
  },
  state: (): UserInfoStore => {
    return {
      userInfo: {
        userRoleCode: 'cooperative'
      } as UserInfo,
      rememberLoginInfo: {} as RememberLoginInfo,
      // 登录的端，gir管理人端、zqr债权人端、cooperative府院
      platform: 'cooperative'
    }
  },
  getters: {
    token: state => {
      return state.userInfo.token ?? ''
    }
  },
  actions: {
    setUserInfo(userInfo) {
      Object.assign(this.userInfo, userInfo)
    },
    setRememberLoginInfo(rememberLoginInfo: RememberLoginInfo) {
      Object.assign(this.rememberLoginInfo, rememberLoginInfo)
    },
    clearRemeberLoginInfo() {
      clearObj(this.rememberLoginInfo, {})
    },
    setPlatform(platform: string) {
      this.platform = platform
    }
  }
})
