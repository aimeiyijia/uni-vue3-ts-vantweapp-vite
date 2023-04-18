<template>
  <view class="page-container">
    <p-search v-model="searchValue" placeholder="搜索案号、协同事项标题" @search="handleSearch" />
    <p-van-tabs :active="activeTab" :tabs="statusTabs" @change="handleTabChange"></p-van-tabs>
    <view
      class="page__content page__content--has-search page__content--has-tabs page__content--has-search-tabs"
    >
      <p-list
        :columns="formOptions.columns"
        :data="formOptions.data"
        :row-props="formOptions.rowProps"
        :config="formOptions.config"
        :total="formOptions.total"
        @refresher-restore="handleRefresherRestore"
        @load-more="handleLoadMore"
      >
        <template #mark-right="{ data }">
          <van-image
            v-if="data.showUnread"
            width="3rem"
            height="3rem"
            fit="contain"
            :src="iconUnread"
          />
        </template>
      </p-list>
    </view>
  </view>
</template>

<script setup lang="ts">
import { httpPostJointMatterCount, httpPostJointMatterList, httpPutUpdateRead } from '@/api/matters'
import iconUnread from '@/assets/images/icons/unread.png'
import PList from '@/components/PList/index.vue'
import PSearch from '@/components/PVant/PSearch/index.vue'
import PVanTabs from '@/components/PVant/PVanTabs/index.vue'
import { useRequest } from '@/http/hooks'
import { useRouter } from '@/plugins/uni-router'
const Router = useRouter()
const userType = 'cooperative'
const activeTab = ref(3)
const statusTabs = reactive([
  {
    title: '全部',
    type: 'allCount',
    code: '',
    value: ''
  },
  {
    title: '待处理',
    type: 'dwCount',
    code: '3',
    value: ''
  },
  {
    title: '已处理',
    type: 'yclCount',
    code: '1,2',
    value: ''
  },
  {
    title: '已办结',
    type: 'bjCount',
    code: '4',
    value: ''
  }
])
const searchValue = ref('')
const matterStatus = ref(0)
// 分页相关参数
const pagParams = reactive({
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
  data: [],
  total: 0
})

// 加载更多
function handleLoadMore(pageNo) {
  console.log(pageNo, '加载更多')
  pagParams.pageNo = pageNo
  getJointMatterList()
}
function handleRefresherRestore() {
  initPageParams()
  getJointMatterList()
}
function initPageParams() {
  formOptions.data = []
  pagParams.pageNo = 1
  pagParams.pageSize = 10
}
// 获取协同事项列表
async function getJointMatterList() {
  console.log(pagParams, '分页参数')
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
  formOptions.total = res.data.total
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
.page-container {
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}
.page__content {
  margin-top: 20rpx;
  height: calc(100% - 230rpx);
}
</style>
