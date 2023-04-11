<template>
  <van-field
    :class="[hiddenLabel ? `hidden-label` : '']"
    :value="modelValue"
    v-bind="attrs"
    @change="handleChange"
    @click-input="handleInputClick"
    @input="handleInput"
  >
    <template v-if="$slots.button" #button>
      <slot name="button"></slot>
    </template>
    <template v-if="$slots.input" #input>
      <slot name="input"></slot>
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
    <!-- 插槽里的view 就算不写，uniapp也会帮你生成一个，所以为了方便调样式，还是写一个 -->
    <template v-if="$slots['left-icon']" #left-icon>
      <view class="slot__left-icon">
        <slot name="left-icon"></slot>
      </view>
    </template>
    <template v-if="$slots['right-icon']" #right-icon>
      <view class="slot__right-icon">
        <slot name="right-icon"></slot>
      </view>
    </template>
  </van-field>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

import { getCamelCase } from '@/utils/transform'
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
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
  console.log(newAttrs, '新数据')
  return newAttrs
})
function handleInputClick(e) {
  console.log('时间', e)
  emit('click-input', e)
}
function handleInput(e: WechatMiniprogram.TouchEvent) {
  const value = e.detail
  emit('update:modelValue', value)
}
function handleChange(e) {
  console.log('PVantField变化---')
  emit('change')
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
  margin-left: var(--padding-base, 4px);
  margin-right: var(--padding-base, 4px);
}
</style>
