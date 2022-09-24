<template>
  <view class="edit">
    <List>
      <view class="edit__item" @click="showAvatarPop">
        <image :src="userInfo.avatar" mode="widthFix"></image>
        <uni-icons type="right"></uni-icons>
      </view>

      <view class="edit__item" @click="showNickNamePop">
        <view><text>昵称：</text>{{ userInfo.nickName }}</view>
        <uni-icons type="right"></uni-icons>
      </view>

      <view class="edit__item" @click="showDescriptionPop">
        <view><text>描述：</text>{{ userInfo.description }}</view>
        <uni-icons type="right"></uni-icons>
      </view>
    </List>

    <Pop v-if="isShowPop" @close="closePop" @confirm="modifyConfirm">
      <image class="pop__image" v-if="isImage" @click="openGallery" :src="userInfo.avatar" mode="widthFix"></image>
      {{ popContent }}
    </Pop>
  </view>

</template>

<script setup>
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    reactive,
    ref
  } from 'vue'
  import {
    unLoginHanler
  } from '../../server/api.js'
  import {
    BASE_URL
  } from '../../server/env.js'
  import List from '../../components/List/List.vue'
  import Pop from '../../components/Pop/Pop.vue'
  import store from '../../store/index.js'

  let popContent = ref('')
  let isImage = ref(false)

  // 弹出框相关逻辑
  let isShowPop = ref(false)
  const closePop = () => {
    isShowPop.value = false
  }
  const modifyConfirm = () => {
    console.log('confirm');
  }

  // userInfo: avatar、nickName、description
  const userInfo = reactive({})
  onLoad((options) => {
    Object.assign(userInfo, JSON.parse(decodeURIComponent(options.userInfo)))
  })

  // 编辑页的三项功能
  const showAvatarPop = () => {
    isShowPop.value = true
    isImage.value = true
    popContent.value = ''
  }
  const showNickNamePop = () => {
    console.log('改变昵称')
  }
  const showDescriptionPop = () => {
    console.log('改变描述')
  }

  // 打开图像选择
  const openGallery = () => {
    uni.chooseImage({
      success: (chooseImageRes) => {
        uni.showLoading({
          title: '正在上传中......'
        })
        const tempFilePaths = chooseImageRes.tempFilePaths
        uni.uploadFile({
          url: `${BASE_URL}/my/upload/image`,
          filePath: tempFilePaths[0],
          name: 'avatar',
          header: {
            // 请求时携带请求头
            'Authorization': 'Bearer ' + uni.getStorageSync('token'),
          },
          success: (uploadFileRes) => {
            const res = JSON.parse(uploadFileRes.data)
            uni.hideLoading()
            // 未登录则转到登录页
            if (res.status === 401) {
              unLoginHanler()
            }
            // 后台头像更改成功后
            if (res.errno === 0) {
              store.commit('userModule/updateUserInfo', {
                avatar: res.data.newAvatar
              })
            }
          },
          fail: (err) => {
            uni.hideLoading()
            uni.showToast({
              title: `发生了错误 - ${err}`
            })
          }
        })
      }
    })
  }
</script>

<style scoped lang="scss">
  .edit {
    height: 100vh;
    background-color: #eee;

    &__item {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      height: 130upx;
      position: relative;
      font-size: 28upx;
      color: #555;

      text {
        font-size: 35upx;
        color: #222;
      }

      image {
        width: 100upx;
      }

      &::after {
        position: absolute;
        content: '';
        height: 4upx;
        width: 100%;
        background-color: #eee;
        bottom: 0upx;
        // top: 0;
      }
    }

    .pop {
      &__image {
        width: 100upx;
        margin-top: 50upx;
      }
    }
  }
</style>
