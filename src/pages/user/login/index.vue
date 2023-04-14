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
          loginType === 'face' ? 'login-area__left--actived' : 'login-area__right--actived',
          isShowFace ? '' : 'all--actived'
        ]"
      >
        <!-- 刷脸登录 -->
        <view v-if="isShowFace && loginType === 'face'" class="login__form--field-container">
          <view class="login__form--field">
            <p-vant-field
              v-model="faceLoginForm.username"
              :hidden-label="true"
              placeholder="请输入姓名"
              clearable
              size="large"
              left-icon="user-o"
            />
          </view>
          <view class="login__form--field">
            <p-vant-field
              v-model="faceLoginForm.idcard"
              :hidden-label="true"
              placeholder="请输入证件号码"
              clearable
              size="large"
              left-icon="idcard"
            />
          </view>
        </view>

        <!-- 账号密码 -->
        <view v-if="!isShowFace || loginType === 'acc'" class="login__form--field-container">
          <view class="login__form--field">
            <p-vant-field
              v-model="accLoginForm.userName"
              :hidden-label="true"
              :placeholder="namePlaceholder"
              clearable
              size="large"
              left-icon="user-o"
            />
          </view>
          <view class="login__form--field">
            <p-vant-field
              v-model="accLoginForm.password"
              :hidden-label="true"
              placeholder="请输入密码"
              clearable
              size="large"
              password="true"
            >
              <template #left-icon>
                <i class="m8 icon-ep-lock"></i>
              </template>
            </p-vant-field>
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
            custom-style="border-radius: 8rpx;box-shadow: 0 0 6px 0 #589af5;"
            size="large"
            @click="handleLogin"
          >
            登录
          </van-button>
          <p-vant-checkbox
            v-model="accLoginForm.isRemember"
            checked-color="#589af5"
            class="remember-checkbox"
          >
            <text class="remember-checkbox__desc">记住账号</text>
          </p-vant-checkbox>
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
import omit from 'lodash.omit'
import { noneParamsEaseFuncs } from 'XrFrame/xrFrameSystem'

import { httpPostCooperativeLogin } from '@/api/user'
import PVantCheckbox from '@/components/PVant/PVantCheckbox/index.vue'
import PVantField from '@/components/PVant/PVantField/index.vue'
import { useRequest } from '@/http/hooks'
import { useRouter } from '@/plugins/uni-router'
import useUserStore from '@/store/user'

const Router = useRouter()
const userInfo = useUserStore()
const systemName = '府院平台'
const isShowFace = ref(false)
const loginType = ref('acc')
const namePlaceholder = ref('请输入账号/手机号码/证件号码')
const faceLoginForm = reactive({
  username: '',
  idcard: ''
})
console.log(userInfo.rememberLoginInfo, '记录的账号')
const accLoginForm = reactive({
  roleCode: 'cooperative',
  isNeedVerify: '1',
  isRemember: false,
  userName: '3201002',
  password: 'Pcgl1234'
})
onMounted(() => {
  const { rememberLoginInfo } = userInfo
  const { isRemember } = rememberLoginInfo
  if (isRemember) {
    Object.assign(accLoginForm, rememberLoginInfo)
  }
})
function handleLoginTypeClick(e) {
  console.log(e, '登录类型变化')
  const { type } = e.currentTarget.dataset
  loginType.value = type
}
function verifyLoginForm() {
  const { userName, password } = accLoginForm
  if (!userName) {
    uni.showToast({
      icon: 'none',
      title: '请输入登录账号'
    })
    return
  }
  if (!password) {
    uni.showToast({
      icon: 'none',
      title: '请输入密码'
    })
    return
  }
  return true
}
function getParams() {
  return accLoginForm
}
async function handleLogin() {
  if (!verifyLoginForm()) return
  const params = getParams()
  const { data } = await useRequest(httpPostCooperativeLogin(params))
  if (data) {
    console.log(accLoginForm.isRemember, '登录成功')
    userInfo.setUserInfo(data)
    if (accLoginForm.isRemember) {
      const rememberLoginInfo = omit(accLoginForm, ['password'])
      userInfo.setRememberLoginInfo(rememberLoginInfo)
    } else {
      userInfo.clearRemeberLoginInfo()
      console.log(userInfo.rememberLoginInfo, '不记住')
    }
    // Router.pushTab({
    //   name: 'Channel'
    // })
  }
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
  &.login-area__left--actived {
    border-top-right-radius: 24rpx;
  }
  &.login-area__right--actived {
    border-top-left-radius: 24rpx;
  }
  &.all--actived {
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
  }
}
.van-icon__image {
  vertical-align: top;
}
.login__form--field-container {
  margin-bottom: 42rpx;
  padding-top: 64rpx;
  height: 420rpx;
}
.login__form--field {
  flex: 1;
  margin-bottom: 64rpx;
  :deep(.van-icon),
  :deep(.slot__left-icon) {
    color: var(--field-placeholder-text-color, #c8c9cc);
  }
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
  .remember-checkbox {
    :deep(.van-checkbox) {
      margin: 18rpx 0;
    }
    .remember-checkbox__desc {
      color: #589af5;
    }
  }
}
</style>
