<template>
  <view class="vant-form-container">
    <view v-for="item in options" :key="item.field" class="vant-form__item">
      <p-vant-field
        v-if="item.vantType === 'Field'"
        v-model="formData.data[item.field]"
        v-bind="item"
      ></p-vant-field>
      <vant-field-picker
        v-if="item.vantType === 'Picker'"
        v-model="formData.data[item.field]"
        v-bind="item"
        @change="handleChange"
      ></vant-field-picker>
      <vant-field-calendar
        v-if="item.vantType === 'Calendar'"
        v-model="formData.data[item.field]"
        v-bind="item"
        @change="handleChange"
      ></vant-field-calendar>
    </view>
  </view>
</template>

<script setup lang="ts">
import PVantField from '@/components/PVant/PVantField/index.vue'

import PVantFieldCalendar from './components/VantFieldCalendar/index.vue'
import VantFieldPicker from './components/VantFieldPicker/index.vue'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  options: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['update:modelValue'])
const formData = reactive({
  data: props.modelValue
})

watch(
  () => formData.data,
  value => {
    console.log(value, 'formData发生了变化')
    emits('update:modelValue', value)
  },
  {
    deep: true // 默认：false
  }
)
console.log(props, '表单配置项')
function handleChange(e) {
  console.log(e, '选中的值变化')
}
</script>

<style scoped></style>
