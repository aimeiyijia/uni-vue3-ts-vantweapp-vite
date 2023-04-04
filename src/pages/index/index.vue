<template>
  <view class="content">
    <image class="logo" src="@/assets/logo.png" />
    <view class="text-area p20">
      <text class="title h2">{{ title }}</text>
      <van-button type="primary">危险按钮</van-button>
      <van-icon name="chat" dot />
      <van-rate :value="2" icon="like" void-icon="like-o" />
    </view>
    <view>1234</view>
    <view @click="changeTitle">changeTitle</view>

    <van-tabbar :active="0">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </view>
</template>

<script setup lang="ts">
import { httpGetProvince } from '@/api/user'
import { useTitle } from '@/hooks/useTitle'
import { useRequest } from '@/http/hooks'
import { useRoute, useRouter } from '@/plugins/uni-router'

const curRouter = useRouter()

const curRoute = useRoute()

console.log(curRouter, 'curRouter 页面 index')
console.log(curRoute.path, 'curRoute 页面 index')

onMounted(async () => {
  const resp = await httpGetProvince({})
  console.log(resp, '省份信息')
})

// setTimeout(() => {
//   console.log('即将跳转路由')
//   curRouter.push('/pages/test/test')
// }, 2000)

const { title, changeTitle } = useTitle()
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
