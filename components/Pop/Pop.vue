<template>
  <view class="mask" @click="closePop"></view>
  <view class="dialog">
    <slot></slot>
    <view class="dialog__btns">
      <button size="mini" @click="closePop">取消</button>
      <button size="mini" type="primary" @click="modifyConfirm">修改</button>
    </view>
  </view>
</template>

<script setup>
  const emit = defineEmits(['close', 'confirm'])
  const closePop = () => {
    emit('close')
  }
  const modifyConfirm = () => {
    emit('confirm')
  }
</script>

<style lang="scss" scoped>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .dialog {
    width: 600upx;
    height: 300upx;
    background-color: #fff;
    border-radius: 10upx;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &__btns {
      width: 100%;
      display: flex;
      position: absolute;
      bottom: 0upx;
      align-items: center;
      margin-bottom: 20upx;

      button {
        width: 200upx;
        height: 80upx;
        line-height: 80upx;
      }
    }
  }
</style>
