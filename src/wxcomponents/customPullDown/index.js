// component/index.js
Component({
  // 声明可以多个slot
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 直接使用properties在 slot="refresher" 上没有生效
    changeBoundaryThreshold: {
      type: Number,
      default: 45
    }
  },

  observers: {
    changeBoundaryThreshold: function (val) {
      this.setData({
        changeBoundary: val
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    refresherTriggered: false,
    changeBoundary: 45
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onReachBottom(event) {
      this.triggerEvent('reachBottom')
    },
    onRefresherRestore(event) {
      this.triggerEvent('refresherRestore')
    },
    onRefresherAbort(event) {
      this.triggerEvent('refresherAbort')
    },
    onPullDownRefresh(event) {
      this.setTriggerStatus(true)
      setTimeout(() => {
        this.setTriggerStatus(false)
      }, 60)
    },
    setTriggerStatus(bool) {
      this.setData({
        refresherTriggered: bool
      })
      this.triggerEvent(bool ? 'pullDownRefreshStart' : 'pullDownRefreshEnd')
    }
  }
})
