<template>
  <view class="vant-form-container br20">
    <van-cell-group :border="false">
      <van-cell v-for="item in options" :key="item.field" v-bind="item" class="vant-form__item">
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
            @blur="e => handleFieldBlur(e, item.field)"
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
        </view>
        <!-- uniapp 不支持动态 作用域插槽 -->
        <slot v-if="item.slot" :name="item.slot"></slot>
      </van-cell>
    </van-cell-group>
  </view>
</template>

<script setup lang="ts">
import isEmpty from 'lodash.isempty'
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
function handleFieldBlur(e, field) {
  const rules = props.rules[field]
  const { value } = e.detail
  console.log(e, '校验规则')
  console.log(rules, '校验规则')
  triggerValidate(value, field, 'blur')
}
function handleFieldChange(e, field) {
  const rules = props.rules[field]
  const value = e.detail
  console.log(e, '校验规则')
  console.log(rules, '校验规则')
  triggerValidate(value, field, 'change')
}

function triggerValidate(value, field, triggerType = 'all') {
  const rules = props.rules[field]
  formData.rules[field] = { show: false, field, errMsg: '' }
  rules.forEach(o => {
    const curFormRule = formData.rules[field]
    const { required, validator, message, trigger } = o
    console.log(triggerType, 'triggerType')
    console.log(trigger, 'trigger')
    if (triggerType === trigger) {
      // 值必填，先校验必填
      if (required) {
        if (isEmpty(value)) {
          curFormRule.show = true
          curFormRule.errMsg = message
        }
      }
      // required 通过校验，再去校验 validator
      if (!curFormRule.show && validator) {
        validator(o, value, (e: Error) => {
          if (e) {
            console.log(e, '报错信息')
            curFormRule.show = true
            curFormRule.errMsg = e instanceof Error ? e.message : e
          }
        })
      }
    }
  })
}

async function validate() {
  const modelValue = props.modelValue
  for (const key in modelValue) {
    if (Object.prototype.hasOwnProperty.call(modelValue, key)) {
      triggerValidate(modelValue[key], key)
    }
  }
  const nopass = Object.values(formData.rules).filter((o: any) => o.show)
  return nopass.length > 0 ? false : true
}
function handleChange(e) {
  console.log(e, '选中的值变化')
}

defineExpose({
  validate
})
</script>

<style lang="scss">
.vant-form-container {
  .icon__required {
    position: absolute;
    left: -10rpx;
    top: -4rpx;
    font-size: 22rpx;
    color: var(--red, #ee0a24);
  }
  .form__vant-field {
    flex: 1;
  }
  .cell__value--container {
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    /* align-items: center; */
    .error__message {
      margin-top: -18rpx;
      /* position: absolute;
      left: 0;
      bottom: 0rpx; */
      line-height: 110%;
      text-align: left;
      font-size: 20rpx;
      color: var(--red, #ee0a24);
    }
  }
}
</style>
