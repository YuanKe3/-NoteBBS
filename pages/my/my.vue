<template>
  <view class="my">
    <view class="my__info" @click="toEditOrLoginPage">
      <view class="my__info__detail">
        <image class="my__avatar" :src="avatar" mode="widthFix"></image>
        <view class="my__avatarAndDesc">
          <text class="my__nickName">{{ nickName }}</text>
          <text class="my__description">{{ description }}</text>
        </view>
      </view>
      <uni-icons type="right"></uni-icons>
    </view>

    <view class="my__vip">
      <view class="my__vip-left">
        <uni-icons type="vip" size="25"></uni-icons>
        <text class="buy">开通超级会员</text>
      </view>
      <view class="my__vip-right">
        <text>享15GB空间、5GB云同步等特权</text>
        <uni-icons type="right"></uni-icons>
      </view>
    </view>

    <view class="my__list">
      <text>云空间</text>
      <text>浏览记录</text>
      <text>我的收藏</text>
      <text>联系客服</text>
      <text>设置</text>
    </view>
  </view>
</template>

<script setup>
  import {
    computed
  } from "vue";
  import store from "../../store";
  import {
    useTopSquareHook
  } from '../../hook/pages/my/my.js'

  // 初始化个人信息,使 vuex 数据进行响应式操作
  const username = computed(() => store.state.userModule.username)
  const isVip = computed(() => store.state.userModule.isVip)
  const avatar = computed(() => store.state.userModule.avatar)
  const nickName = computed(() => store.state.userModule.nickName)
  const description = computed(() => store.state.userModule.description)
  
  const { toEditOrLoginPage, toEditPage, toLoginPage } = useTopSquareHook()
 
</script>

<style lang="scss" scoped>
  .my {
    background-image: linear-gradient(#777, #eee);
    height: 100vh;
    display: flex;
    flex-direction: column;

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30upx;
      margin: 30upx;
      border-radius: 20upx;
      /* #ifdef MP-WEIXIN */
      margin-top: calc(var(--status-bar-height) + 90upx);
      /* #endif */

      &__detail {
        display: flex;
      }
    }

    &__avatar {
      width: 100upx;
    }
    
    &__avatarAndDesc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    &__nickName {
      margin-left: 20upx;
      font-weight: bold;
      max-width: 400upx;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__description {
      margin-left: 20upx;
      font-size: 28upx;
      color: #333;
      max-width: 450upx;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__vip {
      display: flex;
      padding: 30upx;
      margin: 20upx 30upx;
      border-radius: 10upx;
      background-image: linear-gradient(to right, #ffd700, #ffffff);
      justify-content: space-between;

      &-left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28upx;

        .buy {
          font-weight: bold;
        }
      }

      &-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24upx;
      }
    }

    &__list {
      display: flex;
      flex-direction: column;
      border: 1upx solid #fff;
      margin: 60upx 30upx 30upx 30upx;
      background-color: #fff;
      border-radius: 20upx;

      text {
        height: 150upx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1upx solid #eee;
      }
    }
  }
</style>
