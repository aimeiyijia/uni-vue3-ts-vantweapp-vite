export default defineStore({
  id: 'userInfo',
  persist: {
    // 开启持久化
    enabled: true
  },
  state: () => {
    return {
      userInfo: {
        token: 'token'
      },
      platform: 'glr'
    }
  },
  getters: {
    token: (state) => {
      return state.userInfo.token
    },
    platform: (state) => {
      return state.platform
    }
  },
  actions: {
    setUserInfo(userInfo) {
      Object.assign(this.userInfo, userInfo)
    },
    setPlatform(platform) {
      this.platform = platform
    }
  }
})
