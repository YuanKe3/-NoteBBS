<template>
  <!-- 文章分类 -->
  <template v-if="tabData.length !== 0">
    <ArticleSort ref="articleSortRef" :tabData="tabData" :firstTabId="tabData[0].id" />
  </template>
  <!-- 右下角控制菜单 -->
  <MultiMenu :isShow="isShow" @showMultiMenuList="showMultiList">
    <template #edit>
      <text class="center" @click="initData">刷新</text>
    </template>
    <template #write>
      <text class="center">发表</text>
    </template>
  </MultiMenu>
</template>

<script setup>
  import {
    onMounted,
    reactive,
    ref
  } from 'vue'
  import {
    req
  } from '../../server/api';
  import {
    onUnload,
    onPullDownRefresh
  } from '@dcloudio/uni-app'

  // 获取 tab 数据
  const tabData = reactive([])
  onMounted(async () => {
    const result = await req({
      url: '/majorCategory'
    })
    tabData.length = 0
    tabData.push(...result.data.tabData)
  })

  // 点击刷新,返回首页且刷新首页数据
  const articleSortRef = ref(null)
  const initData = async () => {
    uni.$emit('backToIndex')
    await articleSortRef.value.getMainContent(tabData[0].id)
  }
  onUnload(() => {
    uni.$off('backToIndex')
  })
  
  // 下拉刷新
  onPullDownRefresh(async () => {
    await initData()
    uni.stopPullDownRefresh()
  })

  // 控制右下角控制菜单的逻辑
  let isShow = ref(false)
  const showMultiList = () => {
    isShow.value = !isShow.value
  }
</script>

<style scoped>
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 24upx;
    color: white;
  }
</style>
