<template>
  <view class="edit">
    <List>
      <view class="edit__item" @click="showAvatarPop">
        <image :src="avatar" mode="widthFix"></image>
        <uni-icons type="right"></uni-icons>
      </view>

      <view class="edit__item" @click="showNickNamePop">
        <view><text>昵称：</text>{{ nickName }}</view>
        <uni-icons type="right"></uni-icons>
      </view>

      <view class="edit__item" @click="showDescriptionPop">
        <view><text>描述：</text>{{ description }}</view>
        <uni-icons @click="logout" type="right"></uni-icons>
      </view>
    </List>
    
    <button class="logout" @click="logout" type="warn">退出登录</button>

    <Pop v-if="isShowAvatarPop" @close="closeAvatarPop" @preview="previewImage">
      <image class="pop__image" @click="openGallery" :src="previewTempImage" mode="widthFix"></image>
    </Pop>

    <Pop v-if="isShowNickNamePop" @close="closeNickNamePop" @confirm="confirmChangeNickName" :enableConfirmBtn="true">
      <input v-model="editedNickName" class="pop__nickName" type="text" maxlength="10" />
    </Pop>

    <Pop v-if="isShowDescPop" @close="closeDescPop" @confirm="confirmChangeDesc" :enableConfirmBtn="true">
      <textarea v-model="editedDesc" class="pop__desc" cols="30" rows="10"></textarea>
    </Pop>
  </view>

</template>

<script setup>
  import {
    reactive,
    ref,
    computed
  } from 'vue'
  import {
    req,
    unLoginHanler
  } from '../../server/api.js'
  import {
    BASE_URL
  } from '../../server/env.js'
  import List from '../../components/List/List.vue'
  import Pop from '../../components/Pop/Pop.vue'
  import store from '../../store/index.js'
  import {
    useAvatarPopEffect,
    useDescPopEffect,
    useNickNamePopEffect
  } from '../../hook/pages/my/edit.js'

  // 初始化个人信息,使 vuex 数据进行响应式操作
  const avatar = computed(() => store.state.userModule.avatar)
  const nickName = computed(() => store.state.userModule.nickName)
  const description = computed(() => store.state.userModule.description)

  // 弹出框的临时头像
  let previewTempImage = ref(avatar.value)

  // 头像弹出框相关逻辑
  let isShowAvatarPop = ref(false)
  const {
    showAvatarPop,
    closeAvatarPop,
    previewImage
  } = useAvatarPopEffect(isShowAvatarPop, previewTempImage)

  // 昵称弹出框相关逻辑
  let isShowNickNamePop = ref(false)
  let editedNickName = ref(nickName.value)
  const {
    showNickNamePop,
    closeNickNamePop,
    confirmChangeNickName
  } = useNickNamePopEffect(isShowNickNamePop, editedNickName)

  // 描述弹出框相关逻辑
  let isShowDescPop = ref(false)
  let editedDesc = ref(description.value)
  const {
    showDescriptionPop,
    closeDescPop,
    confirmChangeDesc
  } = useDescPopEffect(isShowDescPop, editedDesc)

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
              previewTempImage.value = res.data.newAvatar
              store.commit('userModule/updateUserInfo', {
                avatar: previewTempImage.value
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
  
  // 退出登录
  const logout = () => {
    uni.removeStorageSync('token')
    store.commit('userModule/resetUserStore')
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }
</script>

<style scoped lang="scss">
  .logout {
    margin: 50upx 20upx;
  }
  
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
      white-space: nowrap;
      overflow: hidden;

      text {
        font-size: 35upx;
        color: #222;
      }

      image {
        width: 120upx;
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
        width: 150upx;
        margin-top: 50upx;
      }

      &__nickName {
        border: 1upx solid #ccc;
        margin-top: 50upx;
        width: 500upx;
        height: 80upx;
        padding: 15upx;
        font-size: 40upx;
      }

      &__desc {
        border: 1upx solid #ccc;
        margin-top: 50upx;
        width: 500upx;
        height: 80upx;
        padding: 15upx;
        font-size: 30upx;
      }
    }
  }
</style>
