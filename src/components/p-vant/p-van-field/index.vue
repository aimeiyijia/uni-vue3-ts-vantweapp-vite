<template>
  <van-field
    :class="[hiddenLabel ? `hidden-label` : '']"
    :value="modelValue"
    v-bind="$attrs"
    @input="handleInput"
    @change="handleChange"
  >
    <template v-for="item in buildinSlots" #[item]>
      <slot v-if="$slots[item]" :name="item"></slot>
    </template>
  </van-field>
</template>

<script setup lang="ts">
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
const emit = defineEmits(['update:modelValue', 'change'])

const buildinSlots = ['button', 'label']
onMounted(() => {
  console.log(props)
  console.log(useSlots())
})
function handleInput(e: WechatMiniprogram.TouchEvent) {
  console.log(e, 'input')
  const value = e.detail
  emit('update:modelValue', value)
}
function handleChange(e) {
  console.log('变化---')
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
  color: red;
  :deep(.van-cell__title) {
    display: none;
  }
}
</style>
