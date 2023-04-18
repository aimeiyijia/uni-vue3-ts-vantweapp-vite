<template>
  <view class="p-search-container">
    <van-search
      v-bind="attrs"
      shape="round"
      placeholder="请输入搜索内容"
      @change="handleChange"
      @search="handleSearch"
    />
  </view>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

import { getCamelCase } from '@/utils/transform'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue', 'search'])
const attrs = computed(() => {
  const originAttrs = useAttrs()
  const newAttrs = {}
  for (const key in originAttrs) {
    newAttrs[getCamelCase(key)] = originAttrs[key]
  }
  return newAttrs
})
function handleChange(e) {
  emits('update:modelValue', e.detail)
}
function handleSearch(e) {
  emits('search', e)
}
</script>

<style scoped></style>
