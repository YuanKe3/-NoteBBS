<script>
  import {
    req
  } from './server/api.js'
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
  .default {
    list-style: none;
    padding: 0 30upx;
  }

  body,
  html {
    overflow-x: hidden;
/*    height: 100%;
    width: 100%; */
  }

  /* 隐藏滚动条 */
  body::-webkit-scrollbar {
    display: none;
  }
</style>
