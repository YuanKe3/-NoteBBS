import store from '../store/index.js'
import {
  BASE_URL
} from './env.js'

// 未登录时的操作
export const unLoginHanler = () => {
  uni.showToast({
    title: '未登录'
  })
  // 未登录则删除本地 token
  uni.removeStorageSync('token')
  // 删除 vuex 状态
  store.commit('userModule/resetUserStore')
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/login/login'
    })
  }, 500)
}

/**
 * @description 封装 request 方法
 * @author yuanke
 */
export const req = (options = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      header: {
        // 请求时携带请求头
        'Authorization': 'Bearer ' + uni.getStorageSync('token')
      },
      timeout: 5000,
      data: options.data || {},
      success: (res) => {
        // 无权限(这里是为 vip)时
        if (res.data.status === 403) {
          uni.showToast({
            title: '你不是 vip',
            icon: 'error'
          })
        }
        // token 验证不通过时
        if (res.data.status === 401) {
          unLoginHanler()
        }
        resolve(res.data)
      },
      fail: (err) => {
        uni.showToast({
          title: '请求借口失败'
        })
        reject(err)
      }
    })
  })
}
