<template>
  <view class="page-container mine-page">
    <!-- <image class="mine__top-bg" src="@/assets/images/channel/channel-top-bg.png"></image> -->
    <view class="mine__userinfo">
      <van-image round width="4.5rem" height="4.5rem" :src="iconAvatar" />
      <view class="userinfo__content">
        <view class="userinfo__name">
          名字超级超级超级超超级超级长的浩晨单位
          <!-- <van-tag class="name__tag" type="primary" round plain>协同单位端</van-tag> -->
        </view>
        <view class="userinfo__desc">15064836859</view>
      </view>
    </view>
    <view class="mine-funcs">
      <p-vant-cell :cols="funcCols" @click="handleCellClick"></p-vant-cell>
    </view>
    <van-button class="loginout-btn" round block type="info" @click="handleLogout">
      退出登录
    </van-button>
  </view>
</template>

<script setup lang="ts">
import iconAvatar from '@/assets/images/mine/icon_avatar.png'
import PVantCell from '@/components/PVant/PVantCell/index.vue'
import { useRouter } from '@/plugins/uni-router'
const Router = useRouter()

const funcCols = reactive([
  {
    title: '修改密码',
    prop: 'value1',
    isLink: true,
    // 跳转路径
    pathName: 'ChangePassword'
  },
  {
    title: '我的信息',
    prop: 'value1',
    isLink: true,
    pathName: 'UserInfo'
  }
])

const show = ref(false)
function handleCellClick(e) {
  console.log(e)
  const { pathName } = e
  Router.push({
    name: pathName
  })
}
function handleLogout() {
  wx.showModal({
    title: '提示',
    content: '确定退出登录?',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
</script>
<script lang="ts">
export default {
  options: { styleIsolation: 'shared', addGlobalClass: true, externalClasses: ['custom-class'] }
}
</script>

<style lang="scss" scoped>
.mine-page {
  overflow: hidden;
  position: relative;
  padding: 0 40rpx;
  background-color: #f7f7f7;
  .mine__top-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .mine__userinfo {
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    /* justify-content: flex-start; */
    align-items: center;
    /* margin-top: 180rpx; */
    padding: 180rpx 40rpx 140rpx;
    width: 100%;
    background: linear-gradient(to bottom, #1989fa, #2da5ff);
    color: #fff;
    .userinfo__content {
      margin-left: 32rpx;
    }
    .userinfo__name {
      position: relative;
      font-weight: bold;
      font-size: 36rpx;
      /* .name__tag {
      } */
    }
    .userinfo__desc {
      margin-top: 8rpx;
      font-size: 28rpx;
    }
  }
  .mine-funcs {
    overflow: hidden;
    margin-top: 380rpx;
    border-radius: 20rpx;
  }
  .loginout-btn {
    position: absolute;
    left: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    bottom: 48rpx;
    padding: 0 40rpx;
    width: calc(100% - 80rpx);
  }
}
</style>
