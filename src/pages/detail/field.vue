<template>
  <view class="cell-list-container">
    <van-cell-group inset v-bind="valCellGroupProps">
      <van-cell v-for="cell in cellData" :key="cell.prop" use-label-slot v-bind="cell">
        <!-- 接收默认插槽，也就是value插槽 -->
        <template #default>
          <slot name="value" :data="cell"></slot>
        </template>
        <template #title>
          <slot name="title" :data="cell"></slot>
        </template>
        <template #label>
          <slot name="label" :data="cell"></slot>
        </template>

        <!-- 这么写作用域插槽不起作用 -->
        <!-- <template v-for="item in buildinSlots">
          <slot v-if="$slots[item]" :data="cell" :name="item"></slot>
        </template> -->
      </van-cell>
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  valCellGroupProps: {
    type: Object,
    default: () => ({})
  },
  cols: {
    type: Array,
    default: () => []
  },
  data: {
    type: Object,
    default: () => ({})
  }
})
const buildinSlots = ['title', 'label', 'icon', 'right-icon']
const cellData = computed(() => {
  return (props.cols as any).map(o => {
    const hasValueProp = Object.hasOwn(o, 'value')
    return {
      ...o,
      $cellValue: hasValueProp ? o.value : props.data[o.prop],
      $cellValueSource: hasValueProp ? 'cols' : 'data'
    }
  })
})
onMounted(() => {
  console.log(props, '属性')
  console.log(useSlots(), '插槽')
  console.log(cellData.value, '列表值')
})
</script>

<style scoped></style>
