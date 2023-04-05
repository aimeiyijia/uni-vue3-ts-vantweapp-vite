<template>
  <van-field :value="modelValue" v-bind="$attrs" @input="handleInput" @change="handleChange">
    <template v-if="$slots.button" #button>
      <slot name="button"></slot>
    </template>
  </van-field>
</template>

<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'change'])
onMounted(() => {
  console.log(props)
  console.log(useSlots())
})
function handleInput(e) {
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
