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
}
export interface UserInfoStore {
  userInfo: UserInfo
  platform: string
  rememberLoginInfo: RememberLoginInfo
}
const defaultRememberLoginInfo = {
  roleCode: 'cooperative',
  isNeedVerify: '1'
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
      rememberLoginInfo: defaultRememberLoginInfo,
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
      Object.assign(this.rememberLoginInfo, defaultRememberLoginInfo)
    },
    setPlatform(platform) {
      this.platform = platform
    }
  }
})
