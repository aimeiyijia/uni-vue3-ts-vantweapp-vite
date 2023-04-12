<template>
  <div>
    <p-vant-field
      v-model="showValue"
      :is-link="true"
      :disabled="true"
      v-bind="$attrs"
      @click-input="handleOpenPicker"
    ></p-vant-field>
    <van-popup :show="popupShow" v-bind="$attrs" round position="bottom" custom-style="height: 50%">
      <van-picker
        show-toolbar
        v-bind="$attrs"
        title="请选择"
        @confirm="handlePickerConfirm"
        @cancel="handlePickerCancel"
        @change="handlePickerChange"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import PVantField from '@/components/PVant/PVantField/index.vue'
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'change'])
// const pickerRef = ref('')
const popupShow = ref(false)
const fieldValue = ref([])
const showValue = computed(() => {
  return fieldValue.value
    .map((o: any) => {
      return o.name
    })
    .join('/')
})
function handlePopupClose() {
  popupShow.value = false
}
function handleOpenPicker() {
  console.log('field点击')
  popupShow.value = true
}
function handlePickerConfirm(e) {
  const { index, value } = e.detail
  fieldValue.value = value
  popupShow.value = false
  emits('update:modelValue', value)
  console.log(value, '选中的值')
}
function handlePickerCancel(e) {
  popupShow.value = false
}
function handlePickerChange(e) {
  // const { value } = e.detail
  // emits('update:modelValue', value)
  emits('change', e)
}
</script>

<style scoped></style>
