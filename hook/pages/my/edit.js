import {
  req
} from "../../../server/api"
import store from "../../../store"

const useAvatarPopEffect = (
  isShowAvatarPop,
  previewTempImage
) => {
  const showAvatarPop = () => {
    isShowAvatarPop.value = true
  }
  const closeAvatarPop = () => {
    isShowAvatarPop.value = false
  }
  const previewImage = () => {
    uni.previewImage({
      urls: Array(previewTempImage.value),
      longPressActions: {
        itemList: ['发送给好友', '保存图片', '收藏'],
        success: (data) => {
          console.log(data)
        },
        fail: (err) => {
          console.log(err)
        }
      }
    })
  }
  return {
    showAvatarPop,
    closeAvatarPop,
    previewImage
  }
}

const useNickNamePopEffect = (
  isShowNickNamePop,
  editedNickName
) => {
  const showNickNamePop = () => {
    isShowNickNamePop.value = true
  }
  const closeNickNamePop = () => {
    isShowNickNamePop.value = false
  }
  const confirmChangeNickName = async () => {
    const res = await req({
      url: '/my/edit/nickName',
      method: 'POST',
      data: {
        nickName: editedNickName.value
      }
    })
    store.commit('userModule/updateUserInfo', {
      nickName: res.data.newNickName
    })
    isShowNickNamePop.value = false
  }
  return {
    showNickNamePop,
    closeNickNamePop,
    confirmChangeNickName
  }
}

const useDescPopEffect = (
  isShowDescPop,
  editedDesc
) => {
  const showDescriptionPop = () => {
    isShowDescPop.value = true
  }
  const closeDescPop = () => {
    isShowDescPop.value = false
  }
  const confirmChangeDesc = async () => {
    const res = await req({
      url: '/my/edit/desc',
      method: 'POST',
      data: {
        description: editedDesc.value
      }
    })
    store.commit('userModule/updateUserInfo', {
      description: res.data.newDesc
    })
    isShowDescPop.value = false
  }
  return {
    showDescriptionPop,
    closeDescPop,
    confirmChangeDesc
  }
}

export {
  useAvatarPopEffect,
  useNickNamePopEffect,
  useDescPopEffect
}
