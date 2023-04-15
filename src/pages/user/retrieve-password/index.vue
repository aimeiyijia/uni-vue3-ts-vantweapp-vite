<template>
  <view class="page-container retrieve-password-page">
    <view class="p-card-container">
      <vant-form v-model="forms.data" :options="options" :rules="rules">
        <template #test>
          <van-button plain type="info" size="small">获取验证码</van-button>
        </template>
      </vant-form>
    </view>
    <van-button class="loginout-btn" round block type="info" @click="handleSubmit">提交</van-button>
  </view>
</template>

<script setup lang="ts">
import VantForm from '@/components/VantForm/index.vue'
const forms = reactive({
  data: {
    input: '',
    picker: [
      { name: '宁波', key: 'ningbo' },
      { name: '宁波', key: 'ningbo' }
    ],
    calendar: ['2021-1-1', '2022-1-1']
  }
})
const options = [
  {
    // 防止与内部type冲突
    vantType: 'Field',
    // 防止与内置的title冲突
    vantTitle: '姓名',
    field: 'input',
    placeholder: '请输入真实姓名',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '证件号码',
    field: 'input1',
    placeholder: '请输入证件号码',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '手机号码',
    field: 'input2',
    placeholder: '请输入手机号码',
    titleWidth: '150rpx',
    slot: 'test'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '验证码',
    field: 'input3',
    placeholder: '请输入验证码',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '新密码',
    field: 'input4',
    placeholder: '8-16位，包含大写、小写字母、数字',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '确认密码',
    field: 'input5',
    placeholder: '确认新密码',
    titleWidth: '150rpx'
  }
]
const rules = reactive({
  // 触发方式目前就支持change,因为vant表单组件有且只有change事件
  // required 加 validator 的形式下相当于先校验必填，再校验validator
  input: [
    {
      required: true,
      validator: (rule, value, callback) => {
        console.log(value, '外面的value')
        // return callback(new Error('请输入数字值'))
        return callback()
      },
      message: '请输入活动名称'
    }
  ]
})
function handleSubmit() {
  console.log('提交')
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
