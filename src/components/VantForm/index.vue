<template>
  <view class="vant-form-container">
    <view v-for="item in options" :key="item.field" class="vant-form__item">
      <p-vant-field v-if="item.type === 'Field'" v-bind="item"></p-vant-field>
      <vant-field-picker v-if="item.type === 'Picker'" v-bind="item"></vant-field-picker>
    </view>
  </view>
</template>

<script setup lang="ts">
import PVantField from '@/components/PVant/PVantField/index.vue'

import VantFieldPicker from './components/VantFieldPicker/index.vue'
const props = defineProps(['options'])
console.log(props.options, '123')
</script>

<style scoped></style>
