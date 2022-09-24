<template>
  <!-- 文章分类 -->
  <ArticleSort></ArticleSort>
  <!-- 右下角控制菜单 -->
  <MultiMenu :isShow="isShow" @showMultiMenuList="showMultiList">
    <template #edit>
      <text class="center">编辑</text>
    </template>
    <template #write>
      <text class="center">添加</text>
    </template>
  </MultiMenu>
  
  <button @click="test">haha</button>
  <button @click="test2">haha</button>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import {
    onLoad
  } from '@dcloudio/uni-app'
import { req } from '../../server/api';

  // 控制右下角控制菜单的逻辑
  let isShow = ref(false)
  const showMultiList = () => {
    isShow.value = !isShow.value
  }
  
  const test = () => {
    req({ url: '/test' }).then(res => {
      console.log(res);
    })
  }
  const test2 = () => {
    req({ url: '/test2' }).then(res => {
      console.log(res)
    })
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
