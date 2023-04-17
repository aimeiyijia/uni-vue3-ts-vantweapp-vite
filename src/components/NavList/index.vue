<template>
  <van-grid :border="false" :column-num="3">
    <van-grid-item
      v-for="item in lists"
      :key="item.text"
      :index="item.text"
      use-slot
      @click="handleGridClick(item)"
    >
      <view class="vant-grid-item-content">
        <image class="vant-grid-item__image" :src="item.image" />
        <text class="vant-grid-item__text">{{ item.text }}</text>
      </view>
    </van-grid-item>
  </van-grid>
</template>

<script setup lang="ts">
import jointMatters from '@/assets/images/channel/icon_joint-matters.png'

const props = defineProps({
  col: {
    type: Number,
    default: 3
  },
  border: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: 'left'
  },
  mode: {
    type: String,
    default: 'aspectFit'
  },
  navList: {
    type: Array,
    default: []
  },
  gridTextStyle: {
    type: Object,
    default: () => {}
  },
  size: {
    type: Number,
    default: 80
  }
})
const emits = defineEmits(['click'])

const lists = computed<any>(() => props.navList)

function handleGridClick(nav) {
  emits('click', nav)
}
</script>
<script lang="ts">
export default {
  options: { styleIsolation: 'shared' }
}
</script>

<style lang="scss" scoped>
.vant-grid-item-content {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  .vant-grid-item__image {
    width: 124rpx;
    height: 130rpx;
  }
  .vant-grid-item__text {
    font-size: 32rpx;
  }
}
</style>
