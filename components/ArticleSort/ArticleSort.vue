<template>
  <view class="sort">
    <view class="title">
      <uni-icons type="paperclip" size="23"></uni-icons>
      <text class="title__content">笔记列表</text>
      <text class="title__description">（共 2 个分类）</text>
    </view>
    <!-- accordion 开启手风琴 -->
    <uni-collapse :accordion="true">
      <uni-collapse-item title="HTML / CSS / JavaScript"
        thumb="https://i0.wp.com/www.techomoro.com/wp-content/uploads/2019/11/javascript-736400-1.png?fit=1854%2C941&ssl=1">
        <scroll-view scroll-y="true">
          <ul class="sections default">
            <li class="section">
              dsf
            </li>
            <li class="section">2222222222222222222222222222222</li>
            <li class="section">3333333333333333333333333333333</li>
            <li class="section">4444444444444444444444444444444</li>
            <li class="section">5555555555555555555555555555555</li>
            <li class="section">6666666666666666666666666666666</li>
            <li class="section">7777777777777777777777777777777</li>
            <li class="section">8888888888888888888888888888888</li>
            <li class="section">9999999999999999999999999999999</li>
            <li class="section">1000000000000000000000000000000</li>
          </ul>
        </scroll-view>
      </uni-collapse-item>
      <uni-collapse-item title="标题文字2"
        thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        :show-animation="true">
        <text class="content">折叠内容主体，可自定义内容及样式</text>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<script setup>
  
</script>

<style scoped lang="scss">
  .sort {
    width: 700upx;
    height: 100%;
    margin: 20upx auto;
    /* #ifdef MP-WEIXIN */
    margin: calc(var(--status-bar-height) + 20upx) auto 20upx;
    /* #endif */

    .title {
      height: 60upx;
      font-size: 40upx;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20upx;

      &__content {
        font-weight: 400;
      }

      &__description {
        font-size: 25upx;
        font-weight: 400;
      }
    }

    .sections {
      .section {
        box-shadow: 0 1upx 3upx 0 rgba(0, 0, 0, 0.1), 0 6upx 10upx 0 rgba(0, 0, 0, 0.1);
        margin-top: 30upx;
        padding: 20upx;
      }
    }
  }
</style>
