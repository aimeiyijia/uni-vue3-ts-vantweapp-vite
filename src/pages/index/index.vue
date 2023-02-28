<template>
  <view class="content">
    <image class="logo" src="@/assets/logo.png" />
    <view class="text-area p20">
      <text class="title">{{ title }}</text>
      <van-button type="primary">危险按钮</van-button>
      <van-icon name="chat" dot />
      <van-rate :value="2" icon="like" void-icon="like-o" />
    </view>
    <view>1234</view>
    <view @click="changeTitle">changeTitle</view>
    <view @click="goTest">合格好好干测试页快</view>
  </view>
</template>

<script setup lang="ts">
import { useTitle } from '@/hooks/useTitle'
import { forward } from '@/utils/router'

import { useRoute, useRouter } from '../../plugins/uni-router'

const curRouter = useRouter()
const curRoute = useRoute()

console.log(curRouter, 'curRouter 页面 index')
console.log(curRoute.path, 'curRoute 页面 index')

setTimeout(() => {
  console.log('即将跳转路由')
  curRouter.push('/pages/test/test')
}, 2000)

const { title, changeTitle } = useTitle()
function goTest() {
  forward('test', {
    a: 1,
  })
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 200rpx;
  height: 200rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
