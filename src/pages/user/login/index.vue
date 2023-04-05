<template>
  <view class="login__container">
    <image src="@/assets/images/ic_login_bg.jpeg" class="login__bg-img" />
    <view class="login__top">
      <image src="@/assets/images/ic_legal_emblem.png" mode="" class="login__logo-img" />
      <text class="login__platform-name">{{ systemName }}</text>
    </view>
    <view class="login__middle">
      <view v-if="isShowFace" class="login__switch-type">
        <view
          :class="['login__type', 'login-area__left', loginType === 'face' ? 'type-actived' : '']"
          data-type="face"
          @click="handleLoginTypeClick"
        >
          <text class="login__type--desc">刷脸登录</text>
        </view>

        <view
          :class="['login__type', 'login-area__right', loginType === 'acc' ? 'type-actived' : '']"
          data-type="acc"
          @click="handleLoginTypeClick"
        >
          <text class="login__type--desc">账号密码</text>
        </view>
      </view>
      <view
        :class="[
          'login__form',
          loginType === 'face' ? 'login-area__left-actived' : 'login-area__right--actived',
          isShowFace ? '' : 'all-actived'
        ]"
      >
        <!-- 刷脸登录 -->
        <view v-if="isShowFace && loginType === 'face'" class="login__form--field-container">
          <view class="login__form--field">
            <p-van-field
              v-model="faceLoginForm.username"
              :hidden-label="true"
              placeholder="请输入姓名"
              size="large"
              left-icon="@/assets/images/ic_register_name.png"
            />
          </view>
          <view class="login__form--field">
            <p-van-field
              v-model="faceLoginForm.idcard"
              :hidden-label="true"
              placeholder="请输入证件号码"
              size="large"
              left-icon="@/assets/images/ic_register_zjhm.png"
            />
          </view>
        </view>

        <!-- 账号密码 -->
        <view v-if="!isShowFace || loginType === 'acc'" class="login__form--field-container">
          <view class="login__form--field">
            <p-van-field
              v-model="accLoginForm.accname"
              :hidden-label="true"
              :placeholder="namePlaceholder"
              size="large"
              left-icon="~@/assets/images/ic_register_name.png"
            />
          </view>
          <view class="login__form--field">
            <p-van-field
              v-model="accLoginForm.password"
              :hidden-label="true"
              placeholder="请输入密码"
              left-icon="@/assets/images/ic_register_password.png"
              size="large"
              password="true"
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
            @click="handleLogin"
            >登录</van-button
          >
          <text class="register-user" @click="registerAction">注册新用户</text>
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

<script setup lang="ts">
import PVantField from '@/components/p-vant/p-van-field/index.vue'
const systemName = ref('破产平台')
const isShowFace = ref(true)
const loginType = ref('acc')
const namePlaceholder = ref('请输入账号/手机号码/证件号码')
const faceLoginForm = reactive({
  username: '',
  idcard: ''
})
const accLoginForm = reactive({
  accname: '',
  password: ''
})
function onFieldChange(e) {
  const value = e.detail
  const { dataset } = e.currentTarget
  const { type } = dataset
  if (loginType.value === 'acc') {
    Object.assign(accLoginForm, {
      [type]: value
    })
  }
  console.log(e, '表单变化')
}
function handleLoginTypeClick(e) {
  console.log(e, '登录类型变化')
  const { type } = e.currentTarget.dataset
  loginType.value = type
}
function handleLogin() {
  console.log(accLoginForm, '账号登录表单')
}
function registerAction() {}
</script>

<style scoped lang="scss">
.login__container,
.login__bg-img {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}
.login__container--grayscale {
  filter: grayscale(100%);
}
.login__container {
  position: relative;
  padding-top: 160rpx;
  color: #fff;
  .login__bg-img {
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
.login-area__left,
.login-area__right {
  position: relative;
  color: #fff;
  &.type-actived {
    color: rgb(62, 136, 239);
    &::before {
      position: absolute;
      right: -36rpx;
      top: 0;
      z-index: -1;
      width: 90rpx;
      height: 90rpx;
      background: #fff;
      content: '';
    }
  }
}
/* .login-area__left.type-actived,
.login-area__right.type-actived {
  color: rgb(62, 136, 239);
} */
.login-area__left.type-actived::after,
.login-area__right.type-actived::after {
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
.login-area__left.type-actived::after {
  transform: skewX(24deg);
}
.login-area__left.type-actived::before {
  left: -36rpx;
  border-top-left-radius: 18rpx;
}
.login-area__right.type-actived::after {
  transform: skewX(-24deg);
}
.login-area__right.type-actived::before {
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
.all--actived {
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
}
.login__form.login-area__right-actived {
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
  .register-user {
    font-size: 34rpx;
    color: #4892f5;
  }
}
</style>
