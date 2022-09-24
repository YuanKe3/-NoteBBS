<template>
  <view class="lists">
    <view class="list">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped lang="scss">
  .lists {
    margin-top: 30upx;
    background-color: #fff;
    padding: 0 30upx;
    border-radius: 15upx;
    font-size: 35upx;
    box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.2);
    
    .list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
</style>
