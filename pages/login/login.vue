<template>
  <view class="login">
    <view class="login__input">
      <input v-model="username" placeholder="请输入账号" class="input" type="text" />
    </view>
    <view class="login__input">
      <input v-model="password" :password="isShowPassword" placeholder="请输入密码" class="input" />
      <uni-icons type="eye" @click="showPassword"></uni-icons>
    </view>

    <view class="login-btn">
      <button v-show="isRegister" @click="register" type="primary">注册</button>
      <button v-show="isRegister" @click="backToLoginPage" type="default">点击回到登录页面</button>
      <button v-show="!isRegister" @click="login" type="primary">登录</button>
      <button v-show="!isRegister" @click="toRegisterPage" type="default">前往注册</button>
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from "vue"
  import {
    req
  } from "../../server/api.js";
  import {
    BASE_URL
  } from '../../server/env.js'
  import {
    useStore
  } from 'vuex'
  
  // vuex
  const store = useStore()
  
  // 节流
  let isLoginConfirm = false
  let isRegisterConfirm = false

  // 登录逻辑
  const username = ref('')
  const password = ref('')
  const login = () => {
    if (isLoginConfirm) return
    isLoginConfirm = true
    req({
        url: '/api/user/login',
        data: {
          username: username.value,
          password: password.value
        },
        method: 'POST'
      })
      .then(res => {
        if (res.errno !== 0) {
          uni.showToast({
            title: '密码错误',
            icon: 'error'
          })
        } else {
          uni.setStorageSync('token', res.data.token)
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          // 将用户信息进行保存
          store.commit('userModule/initUserInfo', {
            username: res.data.userInfo.username,
            isVip: res.data.userInfo.isVip,
            avatar: res.data.userInfo.avatar,
            nickName: res.data.userInfo.nickName,
            description: res.data.userInfo.description,
          })
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
      })
      .catch(err => {
        uni.showToast({
          title: '请求接口失败'
        })
      })
      .finally(() => {
        isLoginConfirm = false
      })
  }


  // 显示密码相关逻辑
  let isShowPassword = ref(true)
  const showPassword = () => {
    isShowPassword.value = !isShowPassword.value
  }


  // 注册逻辑
  // 是否进入注册页面
  let isRegister = ref(false)
  const toRegisterPage = () => {
    // 清空账号密码
    username.value = ''
    password.value = ''
    isRegister.value = true
    uni.setNavigationBarTitle({
      title: '注册'
    })
  }
  const register = () => {
    if (isRegisterConfirm) return
    isRegisterConfirm = true
    req({
        url: '/api/user/register',
        method: 'POST',
        data: {
          username: username.value,
          password: password.value
        }
      })
      .then(res => {
        if (res.errno !== 0) {
          uni.showToast({
            title: '注册失败!',
            icon: 'error'
          })
        } else {
          uni.showToast({
            title: '注册成功',
            icon: 'success'
          })
          isRegister.value = false
        }
      })
      .catch(err => {
        uni.showToast({
          title: '请求接口失败',
          icon: 'error'
        })
      })
      .finally(() => {
        isRegisterConfirm = false
      })
  }
  // 回到登录页面
  const backToLoginPage = () => {
    isRegister.value = false
    username.value = ''
    password.value = ''
    uni.setNavigationBarTitle({
      title: '登录'
    })
  }
</script>

<style lang="scss" scoped>
  .login {
    padding: 60upx;
    border-radius: 10upx;
    background-color: #eee;
    height: 100vh;

    &__input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      padding: 20upx;
      border-radius: 10upx;
    }

    .input {
      width: 75%;
      // border: 1upx solid #ddd;
      border-radius: 10upx;
      height: 60upx;
      margin-bottom: 10upx;
      padding: 0 20upx;
      background-color: #fff;
      font-size: 30upx;
    }

    &-btn {
      margin-top: 50upx;

      button {
        margin-top: 20upx;
      }
    }
  }
</style>
