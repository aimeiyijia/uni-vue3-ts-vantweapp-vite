<template>
  <view class="vant-form-container br20">
    <van-cell-group :border="false">
      <van-cell
        v-for="item in options"
        :key="item.field"
        v-bind="item"
        center
        class="vant-form__item"
      >
        <template #title>
          <view class="cell__title">
            <text v-if="rules[item.field]" class="icon__required">*</text>
            {{ item.vantTitle }}
          </view>
        </template>
        <view class="cell__value--container">
          <p-vant-field
            v-if="item.vantType === 'Field'"
            v-model="formData.data[item.field]"
            class="form__vant-field"
            :hidden-label="true"
            :border="false"
            clearable
            v-bind="item"
            @change="e => handleFieldChange(e, item.field)"
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
          <text
            v-show="formData.rules[item.field] && formData.rules[item.field].show"
            class="error__message"
          >
            {{ formData.rules[item.field] && formData.rules[item.field].errMsg }}
          </text>
          <!-- uniapp 不支持动态 作用域插槽 -->
          <slot v-if="item.slot" :name="item.slot"></slot>
        </view>
      </van-cell>
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
import omit from 'lodash.omit'

import PVantCell from '@/components/PVant/PVantCell/index.vue'
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
  },
  rules: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['update:modelValue'])
const formData = reactive({
  data: props.modelValue,
  // 存储转换之后的校验规则
  rules: {}
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
function handleFieldChange(e, field) {
  const rules = props.rules[field]
  const value = e.detail
  console.log(e, '校验规则')
  console.log(rules, '校验规则')
  rules.forEach(o => {
    formData.rules[field] = {
      show: false,
      errMsg: ''
    }
    const curFormRule = formData.rules[field]
    const { required, message } = o

    if (!value) {
      curFormRule.show = true
      curFormRule.errMsg = message
    }
  })
  console.log(formData.rules, '规则')
}
function handleChange(e) {
  console.log(e, '选中的值变化')
}
</script>

<style lang="scss">
.vant-form-container {
  .icon__required {
    position: absolute;
    left: -10rpx;
    top: -4rpx;
    font-size: 18rpx;
    color: var(--red, #ee0a24);
  }
  .form__vant-field {
    flex: 1;
  }
  .cell__value--container {
    display: flex;
    position: relative;
    align-items: center;
    .error__message {
      position: absolute;
      left: 0;
      bottom: 0rpx;
      line-height: 100%;
      font-size: 20rpx;
      color: var(--red, #ee0a24);
    }
  }
}
</style>
