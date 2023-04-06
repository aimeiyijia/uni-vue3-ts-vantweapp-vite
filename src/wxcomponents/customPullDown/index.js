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
		},
	},

	observers: {
		'changeBoundaryThreshold': function (val) {
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
		onReachBottom (event) {
			this.triggerEvent('onReachBottom')
		},
		onRefresherRestore (event) {
			this.triggerEvent('onRefresherRestore')
		},
		onRefresherAbort (event) {
			this.triggerEvent('onRefresherAbort')
		},
		onPullDownRefresh (event) {
			this.setTriggerStatus(true)
			setTimeout(() => {
				this.setTriggerStatus(false)
			}, 1000)
		},
		setTriggerStatus (bool) {
			this.setData({
				refresherTriggered: bool
			})
			this.triggerEvent(bool ? 'onPullDownRefreshStart' : 'onPullDownRefreshEnd')
		}
	}
})
