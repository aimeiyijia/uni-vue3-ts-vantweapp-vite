<template>
  <view class="page-container channel-page">
    <van-image width="100%" height="300rpx" use-loading-slot :src="iconChannelInfo">
      <template #loading>
        <van-loading type="spinner" size="20" vertical />
      </template>
    </van-image>
    <!-- 破产事务 -->
    <view class="channel-funcs">
      <div class="funcs__title">我的功能</div>
      <nav-list :nav-list="funcsList" />
    </view>
  </view>
  <van-dialog use-slot title="标题" show="{{ show }}" confirm-button-text="马上去修改">
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
onMounted(() => {})

const show = ref(true)

const funcsList = reactive([
  {
    image: iconJointMatters,
    text: '协同事项',
    navToName: 'JointMattersList',
    auth: '/jointMatters'
  },
  {
    image: iconKnowledge,
    text: '知识库',
    navToName: 'KnowledgeBaseList',
    auth: '/knowledgeBaseList'
  },
  {
    image: iconMeeting,
    text: '联席会议',
    navToName: 'JointMeetingList',
    auth: '/MeetingList'
  }
])
</script>

<style lang="scss" scoped>
.channel-page {
  .show-img {
    /* height: 248rpx; */
    margin: 24rpx 0 18rpx;
    border-radius: 12rpx;
  }
  .show-img,
  .grid-nav {
    width: 100%;
  }
  .channel-funcs {
    overflow: hidden;
    margin: auto;
    padding-bottom: 20rpx;
    border-radius: 16rpx;
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
