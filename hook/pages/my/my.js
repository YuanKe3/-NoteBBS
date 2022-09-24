import store from "../../../store"

// my 页面头部区域
const useTopSquareHook = () => {
  const toEditPage = () => {
    uni.navigateTo({
      url: `/pages/my/edit`
    })
  }
  
  const toLoginPage = () => {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }
  
  // 点击跳转编辑页面或登录页面
  const toEditOrLoginPage = () => {
    if (!!uni.getStorageSync('token')) {
      toEditPage()
    } else {
      toLoginPage()
    }
  }
  
  return {
    toEditPage,
    toLoginPage,
    toEditOrLoginPage
  }
}

export {
  useTopSquareHook
}