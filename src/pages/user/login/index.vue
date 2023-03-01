<template>
  <view class="login__container">
    <image src="/pages/images/ic_login_bg.jpeg" class="login__bg-img" />
    <view class="login__top">
      <image src="/pages/images/ic_legal_emblem.png" mode="" class="login__logo-img" />
      <text class="login__platform-name">{{ systemName }}</text>
    </view>
    <view class="login__middle">
      <view class="login__switch-type" wx:if="{{ isShowFace }}">
        <view
          class="login__type left {{ loginType === 'face' ? 'type-actived' : '' }}"
          data-type="face"
          bindtap="handleLoginTypeClick"
        >
          <text class="login__type--desc">刷脸登录</text>
          <view class="after"></view>
          <view class="before"></view>
        </view>

        <view
          class="login__type right {{ loginType === 'acc' ? 'type-actived' : '' }}"
          data-type="acc"
          bindtap="handleLoginTypeClick"
        >
          <text class="login__type--desc">账号密码</text>
          <view class="after"></view>
          <view class="before"></view>
        </view>
      </view>
      <view
        class="login__form {{ loginType === 'face' ? 'left-actived' : 'right-actived' }} {{ isShowFace ? '' : 'all-actived' }} "
      >
        <!-- 刷脸登录 -->
        <view class="login__form--field-container" wx:if="{{isShowFace && loginType === 'face' }}">
          <view class="login__form--field">
            <van-field
              value="{{ username }}"
              size="large"
              placeholder="请输入姓名"
              left-icon="/pages/images/ic_register_name.png"
              data-type="username"
              bind:change="onFieldChange"
            />
          </view>
          <view class="login__form--field">
            <van-field
              value="{{ idcard }}"
              size="large"
              placeholder="请输入证件号码"
              left-icon="/pages/images/ic_register_zjhm.png"
              data-type="idcard"
              bind:change="onFieldChange"
            />
          </view>
        </view>

        <!-- 账号密码 -->
        <view class="login__form--field-container" wx:if="{{ !isShowFace || loginType === 'acc' }}">
          <view class="login__form--field">
            <van-field
              value="{{ accname }}"
              size="large"
              placeholder="{{namePlaceholder}}"
              left-icon="/pages/images/ic_register_name.png"
              data-type="accname"
              bind:change="onFieldChange"
            />
          </view>
          <view class="login__form--field">
            <van-field
              value="{{ password }}"
              size="large"
              placeholder="请输入密码"
              left-icon="/pages/images/ic_register_password.png"
              password="{{true}}"
              data-type="password"
              bind:change="onFieldChange"
            />
          </view>
          <view class="find-password">
            <text bindtap="passwordAction">找回密码</text>
          </view>
        </view>

        <view class="login__form--opera-container">
          <van-button
            type="info"
            block
            color="#589af5"
            custom-style="border-radius: 8rpx;box-shadow: 0 0 6px 0 #589af5;margin-bottom: 36rpx"
            size="large"
            bind:click="handleLogin"
            >登录</van-button
          >
          <text class="register-user" bindtap="registerAction">注册新用户</text>
        </view>
      </view>
    </view>
    <view class="login__bottom">
      <van-divider content-position="center" custom-style="color: #9dc7ff; border-color: #61abff;">
        专业有效的破产管理平台
      </van-divider>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
/* @define login */
.login__container,
.login__bg-img {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}
.login__container-grayscale {
  filter: grayscale(100%);
}
.login__container {
  position: relative;
  padding-top: 160rpx;
  color: #fff;
  &.login__bg-img {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    &::after {
      color: '#fff';
    }
  }
}
.login__top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login__top .login__logo-img {
  width: 100rpx;
  height: 110rpx;
}
.login__top .login__platform-name {
  padding: 24rpx 0;
  font-weight: bold;
  font-size: 56rpx;
}
.login__middle {
  margin: 76rpx 36rpx 0;
  height: calc(100% - 430rpx);
}
.login__switch-type {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -2rpx;
}
.login__type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - 36rpx);
  height: 90rpx;
}
.login__noswitch {
  margin-bottom: 24rpx;
}
.login__type--desc {
  font-weight: bold;
  font-size: 38rpx;
}
.left,
.right {
  position: relative;
  color: #fff;
}
.left.type-actived,
.right.type-actived {
  color: rgb(62, 136, 239);
}
.left.type-actived .after,
.right.type-actived .after {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  border-radius: 2px;
  border-top-left-radius: 18rpx;
  border-top-right-radius: 18rpx;
  background: #fff;
  content: '';
}
.left.type-actived .before,
.right.type-actived .before {
  position: absolute;
  right: -36rpx;
  top: 0;
  z-index: -1;
  width: 90rpx;
  height: 90rpx;
  background: #fff;
  content: '';
}
.left.type-actived .after {
  transform: skewX(24deg);
}
.left.type-actived .before {
  left: -36rpx;
  border-top-left-radius: 18rpx;
}
.right.type-actived .after {
  transform: skewX(-24deg);
}
.right.type-actived .before {
  right: -36rpx;
  border-top-right-radius: 24rpx;
}
.login__form {
  padding: 0 42rpx;
  border-radius: 24rpx;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  height: 740rpx;
  background-color: #fff;
  &.leftactived {
    border-top-right-radius: 24rpx;
  }
}
.all-actived {
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
}
.login__form.right-actived {
  border-top-left-radius: 24rpx;
}
.van-icon__image {
  vertical-align: top;
}
.login__form--field-container {
  margin-bottom: 42rpx;
  padding-top: 64rpx;
  height: 360rpx;
}
.login__form--field {
  flex: 1;
  margin-bottom: 64rpx;
}
.find-password {
  text-align: right;
  font-size: 28rpx;
  color: #4892f5;
}
.login__form--opera-container {
  text-align: center;
}
.login__form--opera-container .register-user {
  font-size: 34rpx;
  color: #4892f5;
}
.login__bottom {
}
</style>
