<template>
  <van-field :value="modelValue" v-bind="$attrs" @input="handleInput" @change="handleChange">
    <template v-for="item in buildinSlots" #[item]>
      <slot v-if="$slots.button" :name="item"></slot>
    </template>
  </van-field>
</template>

<script setup lang="ts">
const props = defineProps(['modelValue'])
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

<style scoped></style>
