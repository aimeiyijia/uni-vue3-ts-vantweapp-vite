<template>
  <view class="p-vant-tabs-container">
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
        :name="item.code"
        :info="item.value ? item.value : ''"
      ></van-tab>
    </van-tabs>
  </view>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

import { getCamelCase } from '@/utils/transform'
interface ITabs {
  title: string
  value: string
  code: string
}
interface Props {
  tabs: ITabs[]
}
const props = withDefaults(defineProps<Props>(), {
  tabs: () => []
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
const canEmitChange = ref(false)

// 利于子组件晚于父组件mounted
onMounted(() => {
  canEmitChange.value = true
})
function handleTabChange(e) {
  if (canEmitChange.value) {
    emits('change', e)
  }
}
</script>

<style scoped lang="scss"></style>
