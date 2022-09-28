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

<style lang="scss">
  @import "@/uni_modules/uview-plus/index.scss";
  
  /*每个页面公共css */
  .default {
    list-style: none;
    padding: 0 30upx;
  }

  /* 隐藏滚动条 */
  body::-webkit-scrollbar {
    display: none;
  }
</style>
