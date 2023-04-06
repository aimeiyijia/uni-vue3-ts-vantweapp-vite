<template>
  <view class="page-container">
    <van-tabs
      :active="activeTab"
      color="#1989fa"
      title-active-color="#1989fa"
      title-inactive-color="#999"
      wrap-class="tabWrapClass"
      :custom-class="tabWrapClass"
      @change="handleTabChange"
    >
      <van-tab title="标签 1"></van-tab>
      <van-tab title="标签 2"></van-tab>
      <van-tab title="标签 3"></van-tab>
      <van-tab title="标签 4"></van-tab>
    </van-tabs>
    <custom-pull-down class="custom-pull-down">
      <view name="refresh-animation"></view>
      <view slot="refresh-before-trigger" class="custom-refresh-zone-tips-loading">
        继续下拉刷新
      </view>
      <view slot="refresh-after-trigger" class="custom-refresh-zone-tips-loading">释放刷新</view>
      <view slot="refresh-loading" class="custom-refresh-zone-tips-loading">加载中</view>
      <template #content>
        <view class="card-container">
          <view v-for="item in 10" class="single-card-container">
            <view class="card__title">标题</view>
            <text class="card__status">状态hahha</text>
            <view class="card__main">
              <view class="card__content">
                <view class="main__col">
                  <text class="col__title">收款方户名：</text>
                  <text class="col__value">张三</text>
                </view>
                <view class="main__col">
                  <text class="col__title">付款金额：</text>
                  <text class="col__value" style="color: #1989fa">3000.00</text>
                </view>
                <view class="main__col">
                  <text class="col__title">收款方户名：</text>
                  <text class="col__value">云润食品集团有限公司管理人哈哈哈哈哈哈</text>
                </view>
                <view class="main__col">
                  <text class="col__title">收款方户名：</text>
                  <text class="col__value">云润食品集团有限公司管理人哈哈哈哈哈哈</text>
                </view>
              </view>
              <van-divider />
              <view class="card__footer">
                <view class="footer__item">
                  <van-icon name="manager" class="item__icon" />
                  <span class="item__value">张山峰</span>
                </view>
                <view class="footer__item">
                  <van-icon name="underway" class="item__icon" />
                  <span class="item__value">2022-11-03 12:30:00</span>
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </custom-pull-down>
  </view>
</template>

<script setup lang="ts">
const tabWrapClass = '1234'
const activeTab = ref(0)
function handleTabChange(e) {}
</script>

<style scoped lang="scss">
/* .custom-pull-down {
  margin-top: 20rpx;
  width: 100%;
  height: 100%;
} */
.custom-refresh-zone-tips-loading {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10rpx;
  width: 100%;
  font-size: 26rpx;
  color: #1989fa;
}
.page-container {
  display: inline-block;
  padding: 0 24rpx;
  width: 100%;
  height: 100%;
  background-color: #f0f4f7;
}
.card-container {
  /* padding: 12rpx 0; */
}
.single-card-container {
  position: relative;
  margin-top: 30rpx;
  border: 2rpx solid #fff;
  border-radius: 16rpx;
  background-color: #fff;
  box-shadow: 0rpx 0rpx 8rpx 1rpx rgba(165, 165, 165, 0.32);
  &:nth-child(1) {
    margin-top: 0;
  }
  .card__title {
    padding: 22rpx 0;
    padding-left: 32rpx;
    border-radius: 16rpx 16rpx 0 0;
    background: linear-gradient(180deg, #e9ebfc 0%, rgba(229, 240, 249, 0.06) 100%);
    font-weight: bold;
    font-size: 36rpx;
  }
  .col__value {
    color: #222;
  }
  .card__status {
    position: absolute;
    right: 0;
    top: 0;
    padding: 6rpx 12rpx;
    border-radius: 0 20rpx;
    background-color: #ffaa16;
    color: #fff;
  }
  .card__main {
    padding: 20rpx;
    padding-left: 32rpx;
    .main__col {
      display: flex;
      margin: 12rpx 0;
      &:nth-child(1) {
        margin-top: 0;
      }
      .col__title {
        flex: 0 0 172rpx;
        color: #999;
      }
      .col__value {
        flex: 1 1 auto;
      }
    }
  }
  .card__footer {
    display: flex;
    justify-content: space-between;
    .footer__item {
      color: #b7b7b7;
      .item__icon {
        margin-right: 12rpx;
      }
      .item__value {
      }
    }
  }
}
.tabWrapClass {
  color: red;
}
:deep(.van-tabs) {
  margin-bottom: 20rpx;
}
:deep(.van-tabs__scroll) {
  background-color: transparent;
}
</style>
