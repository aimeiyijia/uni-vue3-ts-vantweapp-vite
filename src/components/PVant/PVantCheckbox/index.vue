<template>
  <van-checkbox
    :class="[hiddenLabel ? `hidden-label` : '']"
    :value="modelValue"
    v-bind="attrs"
    @change="handleChange"
  >
    <slot></slot>
    <template v-if="$slots.icon" #icon>
      <slot name="icon"></slot>
    </template>
  </van-checkbox>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

import { getCamelCase } from '@/utils/transform'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  hiddenLabel: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'change', 'click-input'])
// 封装组件时 为了解决uniapp 不支持 kebab-case（短横线）命名 所以需要转为 camelCased (驼峰式) 命名
const attrs = computed(() => {
  const originAttrs = useAttrs()
  const newAttrs = {}
  for (const key in originAttrs) {
    newAttrs[getCamelCase(key)] = originAttrs[key]
  }
  console.log(props, 'checkbox旧数据')
  console.log(newAttrs, 'checkbox新数据')
  return newAttrs
})
function handleChange(e) {
  console.log('PVantField变化---', e)
  const value = e.detail
  emit('update:modelValue', value)
  emit('change', e)
}
</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<style scoped lang="scss">
.hidden-label {
  :deep(.van-cell__title) {
    display: none;
  }
}
.slot__left-icon,
.slot__right-icon {
  display: flex;
  align-items: center;
}
</style>
