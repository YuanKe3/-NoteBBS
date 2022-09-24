<template>
  <view :class="{ 'controller': true, 'controllered-clicked': isShow }" @click="changeShow"></view>
  <view :class="{ 'edit': true, 'edit-appear': isShow }">
    <slot name="edit">编辑</slot>
  </view>
  <view :class="{ 'write': true, 'write-appear': isShow }">
    <slot name="write">添加</slot>
  </view>
</template>

<script setup>
  defineProps({
    isShow: Boolean
  })
  const emits = defineEmits(['showMultiMenuList'])
  const changeShow = () => {
    emits('showMultiMenuList')
  }
</script>

<style scoped lang="scss">
  .controller {
    width: 100upx;
    height: 100upx;
    position: fixed;
    right: 50upx;
    bottom: calc(var(--window-bottom) + 50upx);
    background-color: #555;
    border-radius: 50%;
    z-index: 2;
  }

  .controller::before {
    content: '';
    position: absolute;
    width: 40upx;
    height: 4upx;
    left: 50upx;
    top: 50upx;
    transform: translate(-50%, -50%);
    background-color: #fff;
    transition: 0.3s ease;
  }

  .controller::after {
    content: '';
    position: absolute;
    width: 4upx;
    height: 40upx;
    left: 50upx;
    top: 50upx;
    transform: translate(-50%, -50%);
    background-color: #fff;
    transition: 0.3s ease;
  }

  .controllered-clicked {
    background-color: #777;
  }

  .controllered-clicked::before {
    content: '';
    position: absolute;
    width: 40upx;
    height: 4upx;
    left: 50upx;
    top: 50upx;
    transform: translate(-50%, -50%) rotateZ(45deg);
    background-color: #fff;
    transition: 0.3s ease;
  }

  .controllered-clicked::after {
    content: '';
    position: absolute;
    width: 4upx;
    height: 40upx;
    left: 50upx;
    top: 50upx;
    transform: translate(-50%, -50%) rotateZ(45deg);
    background-color: #fff;
    transition: 0.3s ease;
  }

  .write {
    width: 100upx;
    height: 100upx;
    position: fixed;
    right: 50upx;
    bottom: calc(var(--window-bottom) + 50upx);
    background-color: #777;
    border-radius: 50%;
    z-index: 1;
    transition: 0.3s ease;
  }

  .write-appear {
    transform: translateY(-120upx);
  }

  .edit {
    width: 100upx;
    height: 100upx;
    position: fixed;
    right: 50upx;
    bottom: calc(var(--window-bottom) + 50upx);
    background-color: #777;
    border-radius: 50%;
    z-index: 1;
    transition: 0.3s ease;
  }

  .edit-appear {
    transform: translateY(-240upx);
  }
</style>
