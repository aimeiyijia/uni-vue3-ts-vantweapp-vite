<template>
  <view class="page-container change-password-page">
    <p-vant-field
      v-model="changePasswordForm.username"
      placeholder="请输入原密码"
      :hidden-label="true"
      :is-link="true"
      :clearable="false"
    >
      <template #left-icon>
        <i class="left-icon icon-ep-unlock"></i>
      </template>
    </p-vant-field>
  </view>
</template>

<script setup lang="ts">
import PVantField from '@/components/PVant/PVantField/index.vue'
const changePasswordForm = reactive({
  username: ''
})
</script>

<style scoped lang="scss">
.page-container {
  overflow: hidden;
  position: relative;
  padding: 0 40rpx;
  background-color: #f7f7f7;
  .left-icon {
    margin-bottom: 4rpx;
    color: #c8c9cc;
  }
}
</style>
