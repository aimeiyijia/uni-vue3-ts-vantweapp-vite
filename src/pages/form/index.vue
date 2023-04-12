<template>
  <view>
    <vant-form v-model="forms.data" :options="options"></vant-form>
    <button @click="handleTest">测试表单值是否正确</button>
  </view>
</template>

<script setup lang="ts">
import VantForm from '@/components/VantForm/index.vue'
// 这么写就支持双向绑定，否则不支持
const forms = reactive({
  data: {
    input: '初始值哈哈',
    picker: [
      { name: '宁波', key: 'ningbo' },
      { name: '宁波', key: 'ningbo' }
    ]
  }
})
const options = [
  {
    type: 'Field',
    field: 'input',
    placeholder: '请输入用户名',
    label: '输入型：',
    onChange() {
      console.log('变化123')
    }
  },
  {
    type: 'Picker',
    field: 'picker',
    placeholder: '请输入用户名',
    label: '输入型：',
    // 选项对象中，文字对应的 key
    valueKey: 'name',
    // 值之间分割符
    separator: '--',
    columns: [
      {
        values: [
          { name: '宁波', key: 'ningbo' },
          { name: '杭州', key: 'hangzhou' },
          { name: '温州', key: 'wenzhou' }
        ],
        defaultIndex: 2
      },
      {
        values: [
          { name: '宁波1', key: 'ningbo1' },
          { name: '杭州1', key: 'hangzhou1' },
          { name: '温州1', key: 'wenzhou1' }
        ],
        defaultIndex: 2
      }
    ]
    // onChange(e) {
    //   console.log(e, '最外部变化123')
    // }
  }
]

// setTimeout(() => {
//   forms.data.picker = [
//     { name: '宁波3', key: 'ningbo' },
//     { name: '宁波4', key: 'ningbo' }
//   ]
// }, 2000)

function handleTest() {
  console.log(forms.data, '拼好的表单值')
}
function handleUpdate(val) {
  console.log('更新')
}
</script>

<style scoped></style>
