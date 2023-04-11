<template>
  <div>
    <p-vant-field
      v-model="fieldValue"
      :is-link="true"
      :disabled="true"
      v-bind="$attrs"
      @click-input="handleOpenPicker"
    ></p-vant-field>
    <van-popup
      :show="popupShow"
      round
      position="bottom"
      custom-style="height: 50%"
      @close="handlePopupClose"
    >
      <van-picker show-toolbar :columns="columns" title="请选择" @change="handlePickerChange" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import PVantField from '@/components/PVant/PVantField/index.vue'
const popupShow = ref(true)
const fieldValue = ref('')
const columns = [
  '杭州',
  '宁波',
  '温州',
  '嘉兴',
  '湖州',
  '湖州',
  '湖州',
  '湖州',
  '湖州',
  '湖州',
  '湖州'
]
function handlePopupClose() {}
function handleOpenPicker() {
  console.log('field点击')
  popupShow.value = true
}
function handlePickerChange() {}
</script>

<style scoped></style>
