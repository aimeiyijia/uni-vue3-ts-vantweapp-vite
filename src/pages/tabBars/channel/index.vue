<template>
  <view class="page-container channel-page">
    <image class="channel__top-bg" src="@/assets/images/channel/channel-top-bg.png"></image>
    <van-image
      class="channel__banners"
      width="100%"
      height="300rpx"
      use-loading-slot
      custom-class="hahhaha"
      :src="iconChannelInfo"
    >
      <template #loading>
        <van-loading type="spinner" size="20" vertical />
      </template>
    </van-image>
    <!-- 破产事务 -->
    <view class="channel-funcs">
      <div class="funcs__title">我的功能</div>
      <nav-list :nav-list="funcsList" @click="handleNavClick" />
    </view>
  </view>
  <van-dialog use-slot title="标题" :show="show" confirm-button-text="马上去修改">
    <image src="https://img.yzcdn.cn/vant/cat.jpeg" />
  </van-dialog>
</template>

<script setup lang="ts">
// 万物皆模块，不这么写图片加载不出来
// uniapp环境下: require 解析路径有问题，也不支持动态import
import iconChannelInfo from '@/assets/images/channel/icon_channel-info.png'
import iconJointMatters from '@/assets/images/channel/icon_joint-matters.png'
import iconKnowledge from '@/assets/images/channel/icon_knowledge.png'
import iconMeeting from '@/assets/images/channel/icon_meeting.png'
import { useRoute, useRouter } from '@/plugins/uni-router'
const Router = useRouter()

const show = ref(false)

const funcsList = reactive([
  {
    image: iconJointMatters,
    text: '协同事项',
    navToName: 'Matters',
    auth: '/jointMatters'
  },
  {
    image: iconKnowledge,
    text: '知识库',
    navToName: 'Knowledge',
    auth: '/knowledgeBaseList'
  },
  {
    image: iconMeeting,
    text: '联席会议',
    navToName: 'Meeting',
    auth: '/MeetingList'
  }
])
function handleNavClick(navItem) {
  console.log(navItem, 'navItem')
  const { navToName } = navItem
  Router.push({
    name: navToName
  })
}
</script>
<script lang="ts">
export default {
  options: { styleIsolation: 'shared', addGlobalClass: true, externalClasses: ['custom-class'] }
}
</script>

<style lang="scss" scoped>
.channel-page {
  overflow: hidden;
  position: relative;
  padding: 0 40rpx;
  background-color: #f7f7f7;
  .channel__top-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 680rpx;
  }
  .channel__banners {
    :deep(.van-image) {
      margin-top: 180rpx;
    }
  }
  .channel-funcs {
    overflow: hidden;
    margin-top: 14rpx;
    padding-bottom: 20rpx;
    border-radius: 20rpx;
    background-color: #fff;
    .funcs__title {
      padding: 20rpx;
      font-weight: 700;
      font-size: 38rpx;
    }
  }
}
.code-input {
  margin-right: 8rpx;
}
.code-btn {
  height: 72rpx;
}
</style>
