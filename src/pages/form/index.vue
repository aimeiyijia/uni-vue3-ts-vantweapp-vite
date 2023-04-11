<template>
  <view>
    <vant-form :options="options"></vant-form>
  </view>
</template>

<script setup lang="ts">
import VantForm from '@/components/VantForm/index.vue'
const options = [
  // {
  //   type: 'Field',
  //   field: 'input',
  //   value: '',
  //   placeholder: '请输入用户名',
  //   label: '输入型：',
  //   onChange() {
  //     console.log('变化123')
  //   }
  // },
  {
    type: 'Picker',
    field: 'picker',
    value: '',
    placeholder: '请输入用户名',
    label: '输入型：',
    onChange() {
      console.log('最外部变化123')
    }
  }
]
</script>

<style scoped></style>
