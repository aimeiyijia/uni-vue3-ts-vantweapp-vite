<template>
  <view style="height: 100%; background-color: aquamarine">
    <field :cols="cols" :data="data">
      <!-- 必须接收下作用域插槽中的值，不然也无法渲染 -->
      <template #value="{ data }">插槽设置的title{{ data }}</template>
      <template #title="{ data }">插槽设置的title{{ data }}</template>
      <template #label="{ data }">插槽设置的label{{ data }}</template>
    </field>
  </view>
</template>

<script setup lang="ts">
import field from './field.vue'
const cols = [
  {
    // title: '1',
    prop: 'value1'
    // value: 0,
    // label: 'label'
  }
]
const data = {
  value1: 'data设置的值'
}
</script>

<style scoped></style>
