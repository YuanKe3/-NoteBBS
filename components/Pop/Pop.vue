<template>
  <view class="mask" @click="closePop"></view>
  <view class="dialog">
    <slot></slot>
    <view class="dialog__btns">
      <button size="mini" @click="closePop">取消</button>
      <button v-if="!enableConfirmBtn" type="primary" size="mini" @click="previewImage">预览</button>
      <button v-else type="primary" size="mini" @click="confirmSubmit">确认</button>
    </view>
  </view>
</template>

<script setup>
  defineProps({
    enableConfirmBtn: {
      type: Boolean,
      required: false,
      default: false
    }
  })
  
  const emit = defineEmits(['close', 'preview', 'confirm'])
  const closePop = () => {
    emit('close')
  }
  const previewImage = () => {
    emit('preview')
  }
  const confirmSubmit = () => {
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
    height: 500upx;
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
