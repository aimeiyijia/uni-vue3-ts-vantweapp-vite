<template>
  <view class="page-container retrieve-password-page">
    <view class="p-card-container">
      <vant-form v-model="retrieveForms.data" :options="options" :rules="rules">
        <template #test>
          <van-button plain type="info" size="small">获取验证码</van-button>
        </template>
      </vant-form>
    </view>
    <van-button class="loginout-btn" round block type="info" @click="handleSubmit">提交</van-button>
  </view>
</template>

<script setup lang="ts">
import { httpPostResetPassword } from '@/api/user'
import VantForm from '@/components/VantForm/index.vue'
import { useRequest } from '@/http/hooks'
import { useRouter } from '@/plugins/uni-router'
import {
  validateIdCard,
  validateSmsCode,
  validatorPassword,
  validatorPasswordAgain,
  validatorPhone
} from '@/rules/validator'

const Router = useRouter()
const retrieveForms = reactive({
  data: {
    realName: '',
    idCard: '',
    phone: '',
    smsCode: '',
    password: '',
    rePassword: ''
  }
})
const options = [
  {
    // 防止与内部type冲突
    vantType: 'Field',
    // 防止与内置的title冲突
    vantTitle: '姓名',
    field: 'realName',
    placeholder: '请输入真实姓名',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '证件号码',
    field: 'idCard',
    placeholder: '请输入证件号码',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '手机号码',
    field: 'phone',
    placeholder: '请输入手机号码',
    titleWidth: '150rpx',
    slot: 'test'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '验证码',
    field: 'smsCode',
    placeholder: '请输入验证码',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '新密码',
    field: 'password',
    placeholder: '8-16位，包含大写、小写字母、数字',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '确认密码',
    field: 'rePassword',
    placeholder: '确认新密码',
    titleWidth: '150rpx'
  }
]
const rules = reactive({
  realName: [{ required: true, message: '真实姓名不能为空' }],
  idCard: [
    { required: true, message: '证件号码不能为空' },
    { required: true, validator: validateIdCard }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码'
    },
    {
      validator: validatorPhone
    }
  ],
  smsCode: [
    {
      required: true,
      message: '请输入验证码'
    },
    {
      validator: validateSmsCode
    }
  ],
  password: [{ required: true, message: '请输入新密码' }, { validator: validatorPassword }],
  rePassword: [{ required: true, message: '请再次输入密码' }, { validator: validatorPasswordAgain }]
})
function getParams() {
  const { password, realName, idCard, phone, smsCode } = retrieveForms.data
  const params = {
    newPassword: password,
    contactName: realName,
    contactCardNo: idCard,
    contactPhone: phone,
    smsCode: smsCode
  }
  return params
}
async function handleSubmit() {
  console.log('提交')
  const params = getParams()
  const res = await useRequest(httpPostResetPassword(params))
  if (res.code === 200) {
    uni.showModal({
      title: '温馨提示',
      content: '新密码设置成功',
      showCancel: false,
      success: res => {
        Router.back(1)
      }
    })
  }
}
</script>

<style scoped lang="scss">
.page-container {
  overflow: hidden;
  position: relative;
  padding: 20rpx 40rpx;
  background-color: #f7f7f7;
  .left-icon {
    margin-bottom: 4rpx;
    color: #c8c9cc;
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
