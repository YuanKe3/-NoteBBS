const userModule = {
  namespaced: true,
  state: () => ({
    avatar: uni.getStorageSync('userInfo').avatar || '/static/my.png',
    nickName: uni.getStorageSync('userInfo').nickName || '未登录',
    description: uni.getStorageSync('userInfo').description || '登录后查看详情......',
    username: uni.getStorageSync('userInfo').username || '',
    isVip: uni.getStorageSync('userInfo').isVip || false
  }),
  mutations: {
    // token 过期时触发
    resetUserStore(state) {
      state.username = '',
      state.isVip = false,
      state.avatar = '/static/my.png'
      state.nickName = '未登录'
      state.description = '登录后查看详情......'
      uni.removeStorageSync('userInfo')
    },
    // 登录时触发
    initUserInfo(state, payload) {
      state.username = payload.username
      state.isVip = payload.isVip
      state.avatar = payload.avatar
      state.nickName = payload.nickName
      state.description = payload.description
      // 这里是防止退出应用后无法获取个人信息
      uni.setStorageSync('userInfo', {
        username: payload.username,
        isVip: payload.isVip,
        avatar: payload.avatar,
        nickName: payload.nickName,
        description: payload.description
      })
    },
    updateUserInfo(state, payload) {
      if (payload.username) state.username = payload.username
      if (payload.isVip) state.isVip = payload.isVip
      if (payload.avatar) state.avatar = payload.avatar
      if (payload.nickName) state.nickName = payload.nickName
      if (payload.description) state.description = payload.description
      uni.setStorageSync('userInfo', {
        username: state.username,
        isVip: state.isVip,
        avatar: state.avatar,
        nickName: state.nickName,
        description: state.description
      })
    }
  }
}

export default userModule