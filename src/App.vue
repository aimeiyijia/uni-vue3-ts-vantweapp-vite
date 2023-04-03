<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
  console.log(import.meta.env, '运行环境')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'styles/index.scss';
</style>
