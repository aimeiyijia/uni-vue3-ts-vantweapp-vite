<template>
  <view class="cell-list-container">
    <van-cell-group v-bind="valCellGroupProps">
      <van-cell
        v-for="cell in cellData"
        :key="cell.prop"
        use-label-slot
        v-bind="cell"
        @click="handleClick(cell)"
      >
        <!-- 接收默认插槽，也就是value插槽 -->
        <template v-if="$slots.value" #default>
          <slot name="value" :data="cell"></slot>
        </template>
        <template v-if="$slots.title" #title>
          <slot name="title" :data="cell"></slot>
        </template>
        <template v-if="$slots.label" #label>
          <slot name="label" :data="cell"></slot>
        </template>

        <!-- 这么写作用域插槽不起作用，普通的插槽可以 -->
        <!-- <template v-for="item in buildinSlots">
          <slot v-if="$slots[item]" :data="cell" :name="item"></slot>
        </template> -->
      </van-cell>
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
const emits = defineEmits(['click'])
const cellData = computed(() => {
  return (props.cols as any).map(o => {
    const hasValueProp = Object.hasOwn(o, 'value')
    return {
      ...o,
      $cellValue: hasValueProp ? o.value : props.data[o.prop || ''],
      $cellValueSource: hasValueProp ? 'cols' : 'data'
    }
  })
})
function handleClick(item) {
  emits('click', item)
}
</script>

<style scoped></style>
