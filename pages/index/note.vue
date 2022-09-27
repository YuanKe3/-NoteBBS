<template>
  <view class="note">
    <view class="note__back" @click="back">
      <uni-icons type="back" size="27"></uni-icons>
    </view>

    <!-- 背景图 -->
    <image class="note__backImg" :src="noteContent.previewImage"></image>

    <view class="note__wrapper">
      <text class="note__title">{{ noteContent.title }}</text>
    </view>
  </view>
</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    req
  } from '../../server/api';
  import {
    reactive
  } from "vue";

  const noteContent = reactive({})

  onLoad(async (option) => {
    const result = await req({
      url: `/majorCategory/minorCategory/note/${option.noteId}`
    })
    Object.assign(noteContent, result.data)
    console.log(noteContent);
  })

  // 返回上一页
  const back = () => {
    console.log('haha');
    uni.navigateBack()
  }
</script>

<style scoped lang="scss">
  .note {
    background-image: linear-gradient(#555, #eee);
    padding-bottom: 50upx;

    &__back {
      // background-color: red;
      position: fixed;
      z-index: 2;
      /* #ifdef MP-WEIXIN */
      padding: 20upx;
      margin-top: 35upx;
      /* #endif */
      /* #ifdef H5 */
      padding: 25upx;
      /* #endif */
    }

    &__backImg {
      margin-top: 20upx;
      width: 100%;
      max-height: 500upx;
    }

    &__wrapper {}

    &__title {}
  }
</style>
