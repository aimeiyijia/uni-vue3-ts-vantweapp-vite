<template>
  <view class="page-container">
    <p-search v-model="searchValue" placeholder="搜索案号、协同事项标题" @search="handleSearch" />
    <p-van-tabs :active="activeTab" :tabs="statusTabs" @change="handleTabChange"></p-van-tabs>
    <p-list
      :columns="formOptions.columns"
      :data="formOptions.data"
      :row-props="formOptions.rowProps"
      :config="formOptions.config"
    ></p-list>
  </view>
</template>

<script setup lang="ts">
import { httpPostJointMatterCount, httpPostJointMatterList, httpPutUpdateRead } from '@/api/matters'
import PList from '@/components/PList/index.vue'
import PSearch from '@/components/PVant/PSearch/index.vue'
import PVanTabs from '@/components/PVant/PVanTabs/index.vue'
import { useRequest } from '@/http/hooks'
import { useRouter } from '@/plugins/uni-router'
const Router = useRouter()
const userType = 'cooperative'
const activeTab = ref(1)
const statusTabs = reactive([
  {
    title: '全部',
    type: 'allCount',
    code: '',
    value: 0
  },
  {
    title: '待处理',
    type: 'dwCount',
    code: '3',
    value: 0
  },
  {
    title: '已处理',
    type: 'yclCount',
    code: '1,2',
    value: 0
  },
  {
    title: '已办结',
    type: 'bjCount',
    code: '4',
    value: 0
  }
])
const searchValue = ref('')
const matterStatus = ref(0)
// 分页相关参数
const pagParams = reactive({
  total: 0,
  pageNo: 1,
  pageSize: 10
})
// 列表配置相关
const formOptions = reactive({
  config: {
    labelWidth: '210rpx'
  },
  columns: [
    {
      label: '案号：',
      // 数据项对应的数据字段名称
      prop: 'ah'
    },
    {
      label: '处理截止日期：',
      // 数据项对应的数据字段名称
      prop: 'expirationDate'
    },
    {
      label: '剩余天数：',
      // 数据项对应的数据字段名称
      prop: 'overdueDate'
      // 第一个参数是当前列的配置项
      // 第二个参数是所有的数据
      // customRender(single, data1) {
      //   console.log(single, '第一个参数')
      //   console.log(data1, '第二个参数')
      //   return 'hahha'
      // }
    }
  ],
  rowProps: {
    personProp: 'departmentName',
    timeProps: 'submitTime'
  },
  data: []
})

// 加载更多
function loadingMore(pageNo) {
  pagParams.pageNo = pageNo
  getJointMatterList()
}
function initPageParams() {
  formOptions.data = []
  pagParams.total = 0
  pagParams.pageNo = 1
  pagParams.pageSize = 10
}
// 获取协同事项列表
async function getJointMatterList() {
  const params = {
    pageNo: pagParams.pageNo,
    pageSize: pagParams.pageSize,
    userType,
    keyWord: searchValue.value,
    matterStatus: matterStatus.value
  }
  const res = await useRequest(httpPostJointMatterList(params))
  if (!res.data) return
  const statusMap = {
    1: 'error',
    2: 'error',
    3: 'wait',
    4: 'success'
  }
  const list = res.data.records.map(i => {
    return {
      ...i,
      status: i.matterStatusName,
      statusType: statusMap[i.matterStatus],
      showUnread: i.matterStatus === 3 && i.isRead === 0
    }
  })
  formOptions.data = formOptions.data.concat(list)
  console.log(formOptions.data, '所有的列表数据')
  pagParams.total = res.data.total
  getJointMatterCount()
}
// 获取协同事项统计数量
async function getJointMatterCount() {
  const params = {
    userType
  }
  const res = await useRequest(httpPostJointMatterCount(params))
  if (!res.data) return
  statusTabs.forEach(item => {
    item.value = res.data[item.type] > 99 ? '99+' : res.data[item.type]
  })
}
function refresherpulling() {
  formOptions.data = []
}
function handleSearch(e) {
  console.log(e, '搜索')
  searchValue.value = e
  initPageParams()
  getJointMatterList()
}
function handleTabChange(e) {
  const { code } = e
  console.log(e, '切换')
  matterStatus.value = code
  initPageParams()
  getJointMatterList()
}
async function handleViewDetail(detail) {
  console.log(detail, '查看详情')
  await setRead(detail)
  Router.push({
    path: '/main/pages/joint-matters/detail/index',
    query: {
      ah: detail.ah,
      jointMatterId: detail.jointMatterId
    }
  })
}
// 将某一个相同事项设为已读
async function setRead(detail) {
  const { isRead, jointMatterId } = detail
  if (isRead !== 0) return
  const params = {
    userType,
    jointMatterId
  }
  const res = await useRequest(httpPutUpdateRead(params))
  if (res) {
    detail.hasRead = 1
  }
}
</script>

<style scoped lang="scss">
/* .custom-pull-down {
  margin-top: 20rpx;
  width: 100%;
  height: 100%;
} */
.page-container {
  display: inline-block;
  /* padding: 0 30rpx; */
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}
:deep(.van-divider) {
  margin: 18rpx 0 !important;
}
:deep(.van-tabs) {
  margin-bottom: 20rpx;
}
/* :deep(.van-tabs__scroll) {
  background-color: transparent;
} */
</style>
<!-- 共享的css变量 useCssModule -->
<style module lang="scss">
.a {
  color: red;
}
</style>
