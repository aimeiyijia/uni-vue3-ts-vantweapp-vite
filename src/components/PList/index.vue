<template>
  <view class="list-container">
    <custom-pull-down
      class="custom-pull-down"
      @reach-bottom="handleScrollBottom"
      @refresher-restore="handleRefresherRestore"
    >
      <template #content>
        <view v-if="hasData" class="card-container">
          <view
            v-for="item in listOptions.data"
            :key="item.$columnID"
            class="single-card-container"
          >
            <view class="card__title">{{ item.$columnTitle }}</view>
            <text :class="['card__status', item.$columnStatusType]">{{ item.$columnStatus }}</text>
            <view class="card__main">
              <view class="card__content">
                <view v-for="single in item.$cellData" :key="single.$cellID" class="main__col">
                  <text
                    class="col__title"
                    :style="{
                      width: config.labelWidth
                    }"
                  >
                    {{ single.label }}
                  </text>
                  <text class="col__value">{{ single.$columnsValue }}</text>
                </view>
                <!-- 小程序支持作用域插槽，支持动态插槽，但是不支持动态作用域插槽 -->
                <!-- 所以用固定名称的作用域插槽来扩展 -->
                <view class="mark-right">
                  <slot name="mark-right" :data="item"></slot>
                </view>
              </view>

              <van-divider hairline />
              <view class="card__footer">
                <view class="footer__item">
                  <van-icon name="manager" class="item__icon" />
                  <span class="item__value">{{ item.$columnPerson }}</span>
                </view>
                <view class="footer__item">
                  <van-icon name="underway" class="item__icon" />
                  <span class="item__value">{{ item.$columnTime }}</span>
                </view>
              </view>
            </view>
          </view>
        </view>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/empty-image-default.png"
          description="暂无数据"
        />
      </template>
      <template #bottom>
        <view v-if="hasData" class="pull-up-tips">
          <text v-show="loadingMore">上滑加载更多</text>
          <text v-show="!loadingMore">没有更多数据了</text>
        </view>
      </template>
    </custom-pull-down>
  </view>
</template>

<script setup lang="ts">
import { deepClone, getValueByKey, guid } from '@/utils'

interface IConfig {
  labelWidth?: string
}
interface IData {
  $cellID: string
  $columnsValue: string
  [key: string]: any
}
interface IColumns {
  label?: string
  prop?: string
  customRender: (col: IData, row: IListData) => any
}
interface IRowProps {
  titleProp?: string
  statusProp?: string
  statusTypeProp?: string
  personProp?: string
  timeProps?: string
}

interface Props {
  config: IConfig
  columns: IColumns[]
  rowProps: IRowProps
  data: IData[]
  total: number
}

interface IListData extends IData {
  $columnID: string
  $columnTitle: string
  $columnPerson: string
  $columnTime: string
  $columnStatus: string
  $columnStatusType: string
  $cellData: IData[]
}

interface IListOptions {
  data: IListData[]
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({}),
  columns: () => [],
  rowProps: () => ({}),
  data: () => [],
  total: 0
})

const emits = defineEmits(['click', 'refresher-restore', 'load-more'])

const pageNo = ref(0)

const loadingMore = computed(() => {
  return listOptions.data.length < props.total
})

const listOptions = reactive<IListOptions>({
  data: []
})

const hasData = computed(() => {
  const data = props.data
  if (data && data.length && data.length > 0) return true
  return false
})
const defaultRowProps = {
  titleProp: 'title',
  statusProp: 'status',
  statusTypeProp: 'statusType',
  personProp: 'person',
  timeProps: 'time'
}
const mergeProps = computed(() => {
  return Object.assign({}, defaultRowProps, props.rowProps)
})

// 将this.data转换成符合列表要求的结构
function transformDataToListData(o: any) {
  const cellData: IData[] = []
  deepClone(props.columns).forEach((c: any) => {
    const { customRender } = c
    const cols: any = { $columnsValue: '', $cellID: '' }
    o.$cellID = guid()
    if (customRender) {
      cols.$columnsValue = customRender(c, o)
    } else {
      cols.$columnsValue = getValueByKey(c.prop, o)
    }

    Object.assign(cols, c)
    cellData.push(cols)
  })
  return cellData
}
watch(
  [() => props.columns, () => props.data],
  () => {
    const listsData: IListData[] = []
    const { titleProp, personProp, timeProps, statusProp, statusTypeProp } = mergeProps.value
    deepClone(props.data).forEach(o => {
      o.$columnID = guid()
      o.$columnTitle = getValueByKey(titleProp, o)
      o.$columnPerson = getValueByKey(personProp, o)
      o.$columnTime = getValueByKey(timeProps, o)
      o.$columnStatus = getValueByKey(statusProp, o)
      o.$columnStatusType = getValueByKey(statusTypeProp, o)
      o.$cellData = transformDataToListData(o)
      listsData.push(o as IListData)
    })
    listOptions.data = listsData
  },
  {
    deep: true,
    immediate: true
  }
)
function handleRefresherRestore() {
  console.log('下拉刷新')
  pageNo.value = 0
  emits('refresher-restore')
}
function handleScrollBottom() {
  console.log('滚动到底部')
  if (loadingMore.value) {
    pageNo.value++
    emits('load-more', pageNo)
  }
}
</script>

<style scoped lang="scss">
.list-container {
  height: 100%;
}
.card-container {
  padding: 0 30rpx;
}
.single-card-container {
  position: relative;
  margin-top: 24rpx;
  border: 2rpx solid #fff;
  border-radius: 16rpx;
  background-color: #fff;
  box-shadow: 0rpx 0rpx 8rpx 1rpx rgba(165, 165, 165, 0.1);
  &:nth-child(1) {
    margin-top: 0;
  }
  .card__title {
    padding: 44rpx 32rpx 0;
    border-radius: 16rpx 16rpx 0 0;
    /* background: linear-gradient(180deg, #abdcff 0%, rgba(255, 255, 255, 1) 100%); */
    font-weight: bold;
    font-size: 32rpx;
  }
  .col__value {
    color: #222;
  }
  .card__status {
    position: absolute;
    right: 0;
    top: 0;
    padding: 4rpx 10rpx;
    border-radius: 0 12rpx;
    background-color: #92a5fc;
    font-size: 24rpx;
    color: #fff;
    &.success {
      background-color: #92a5fc;
    }
    &.wait {
      background-color: #c0c4cc;
    }
    /* &.success {
      background-color: #00c1ce;
    } */
    &.error {
      background-color: #ff637b;
    }
    /* &.success {
      background-color: #32ccd7;
    } */
    &.warning {
      background-color: #ffaa16;
    }
  }
  .card__main {
    position: relative;
    padding: 20rpx 32rpx;
    .card__content {
      position: relative;
    }
    .main__col {
      display: flex;
      margin: 12rpx 0;
      &:nth-child(1) {
        margin-top: 0;
      }
      .col__title {
        flex: 0 0 auto;
        color: #999;
      }
      .col__value {
        flex: 1 1 auto;
      }
    }
  }
  .card__footer {
    display: flex;
    justify-content: space-between;
    .footer__item {
      color: #b7b7b7;
      .item__icon {
        margin-right: 12rpx;
      }
    }
  }
}
.mark-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.pull-up-tips {
  text-align: center;
}
</style>
<!-- 共享的css变量 useCssModule -->
<style module lang="scss">
.a {
  color: red;
}
</style>
