<template>
  <div>
    <p-vant-field
      v-model="showValue"
      :is-link="true"
      :disabled="true"
      v-bind="$attrs"
      @click-input="handleOpenCalendar"
    ></p-vant-field>
    <van-calendar
      :show="calendarShow"
      v-bind="$attrs"
      title="请选择"
      @confirm="handleCalendarConfirm"
      @close="handleCalendarClose"
      @change="handleCalendarChange"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'dayjs'

import PVantField from '@/components/PVant/PVantField/index.vue'
const attrs = useAttrs()
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'change'])
// const CalendarRef = ref('')
onMounted(() => {
  console.log(useAttrs(), '属性')
})
const calendarShow = ref(false)
const fieldValue = ref([])
watch(
  () => props.modelValue,
  value => {
    console.log(value, 'fieldValue发生了变化')
    fieldValue.value = value
  },
  {
    immediate: true,
    deep: true
  }
)
const showValue = computed(() => {
  return transformValue(fieldValue.value)
})
function transformValue(value) {
  const { type } = attrs
  if (type === 'range') {
    return value
      .map(o => {
        return moment(o).format('YYYY-MM-DD')
      })
      .join('至')
  }
  return moment(value).format('YYYY-MM-DD').toString()
}
function handlePopupClose() {
  calendarShow.value = false
}
function handleOpenCalendar() {
  console.log('field点击')
  calendarShow.value = true
}
function handleCalendarConfirm(e) {
  console.log(e, '选中')
  const value = e.detail
  fieldValue.value = value
  calendarShow.value = false
  emits('update:modelValue', transformValue(value))
  console.log(value, '选中的值')
}
function handleCalendarClose(e) {
  calendarShow.value = false
}
function handleCalendarChange(e) {
  // const { value } = e.detail
  // emits('update:modelValue', value)
  emits('change', e)
}
</script>

<style scoped></style>
