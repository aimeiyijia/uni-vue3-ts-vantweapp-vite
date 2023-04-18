<template>
  <view>
    <van-tabs
      v-bind="attrs"
      color="#1989fa"
      title-active-color="#1989fa"
      title-inactive-color="#999"
      @change="handleTabChange"
    >
      <van-tab
        v-for="item in tabs"
        :key="item.title"
        :title="item.title"
        :info="item.value"
      ></van-tab>
    </van-tabs>
  </view>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

import { getCamelCase } from '@/utils/transform'
const props = defineProps({
  tabs: {
    type: Array,
    default: []
  }
})
const emits = defineEmits(['change'])
const attrs = computed(() => {
  const originAttrs = useAttrs()
  const newAttrs = {}
  for (const key in originAttrs) {
    newAttrs[getCamelCase(key)] = originAttrs[key]
  }
  return newAttrs
})
function handleTabChange(e) {
  emits('change', e)
}
</script>

<style scoped lang="scss"></style>
