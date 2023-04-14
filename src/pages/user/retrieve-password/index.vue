<template>
  <view class="page-container retrieve-password-page">
    <view class="p-card-container">
      <vant-form v-model="forms.data" :options="options">
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
    title: '姓名',
    field: 'input',
    placeholder: '请输入用户名',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '证件号码',
    field: 'input1',
    placeholder: '请输入用户名',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '手机号码',
    field: 'input2',
    placeholder: '请输入用户名',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '验证码',
    field: 'input3',
    placeholder: '请输入用户名',
    titleWidth: '150rpx',
    slot: 'test'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '新密码',
    field: 'input4',
    placeholder: '请输入用户名',
    titleWidth: '150rpx'
  },
  {
    // 防止与内部type冲突
    vantType: 'Field',
    title: '确认密码',
    field: 'input5',
    placeholder: '请输入用户名',
    titleWidth: '150rpx'
  }
]
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
