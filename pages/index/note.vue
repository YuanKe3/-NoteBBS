<template>
  <view v-if="JSON.stringify(noteContent) !== '{}'">
    <view class="nav">
      <view class="nav__back" @click="back">
        <uni-icons type="back" size="27"></uni-icons>
      </view>
      <!-- 背景图 -->
      <image class="nav__backImg" :src="noteContent.previewImage"></image>
    </view>

    <view class="note">
      <text class="note__title">{{ noteContent.title }}</text>
      <view class="note__info">
        <image class="note__avatar" :src="noteContent.user.avatar" mode="aspectFill" />
        <text class="note__nickName">{{ noteContent.user.nickName }}</text>
        <text class="note__createTime">{{ formatDate(noteContent.user.updatedAt) }}</text>
      </view>

      <view class="anchor">
        <template v-for="(titleItem, titleIndex) in sortedArr" :key="titleItem.id">
          <view class="anchor__link" v-if="titleItem.level === '2'" @click="auchorJump(titleIndex, $event)">
            {{ titleItem.text }}
          </view>
          <view class="anchor__link-space" v-else @click="auchorJump(titleIndex, $event)">{{ titleItem.text }}</view>
        </template>
      </view>

      <view class="note__content">
        <mp-html :content="markdown" :lazyLoad="true" :tagStyle="parse_style" selectable></mp-html>
      </view>
      <u-back-top :scroll-top="scrollTop" mode="circle" :top="300"></u-back-top>
    </view>

  </view>
</template>

<script setup>
  import {
    onLoad,
    onPageScroll
  } from '@dcloudio/uni-app'
  import {
    req
  } from '../../server/api';
  import {
    getCurrentInstance,
    nextTick,
    onMounted,
    reactive,
    ref
  } from "vue"
  import {
    marked
  } from 'marked'
  import hljs from 'highlight.js'
  import 'highlight.js/scss/github-dark.scss'
  import {
    formatDate
  } from '../../utils/parseTime.js'
  import {
    useRenderMarkdownEffect
  } from '../../hook/pages/index/note.js'
  import {
    throtte
  } from '../../utils/optimization.js'

  // 监听页面滚动事件,进行节流操作
  let scrollTop = ref(0)
  onPageScroll(throtte(function(e) {
    scrollTop.value = e.scrollTop
  }))

  // 锚点跳转
  const instance = getCurrentInstance()
  const auchorJump = (index, e) => {
    // #ifdef H5
    const nowDomToTopDistance = e.target.offsetTop
    let targetDomToTopDistance = 0
    uni.createSelectorQuery().in(instance).selectAll('._title').boundingClientRect(data => {
      targetDomToTopDistance = data[index].top
    }).exec()
    uni.pageScrollTo({
      duration: 300,
      scrollTop: targetDomToTopDistance - nowDomToTopDistance
    })
    // #endif
    // #ifdef MP-WEIXIN
    uni.showToast({
      title: '暂不支持跳转~',
      icon: 'error'
    })
    // #endif
  }

  // 后台请求来的文章数据 - 初始化
  const noteContent = reactive({})
  // toc 数据
  const sortedArr = reactive([])

  // markdown 渲染相关逻辑
  let markdown = ref('')
  const {
    parse_style,
    initHightLight
  } = useRenderMarkdownEffect()

  onLoad(async (option) => {
    // 请求该标题的文章内容
    const result = await req({
      url: `/majorCategory/minorCategory/note/${option.noteId}`
    })
    Object.assign(noteContent, result.data)

    // marked 和 highlight 的一些基本设置
    const renderer = new marked.Renderer()
    initHightLight(renderer)
    // 返回的 h 标签格式: h1 -> 1-1 1-2 1-3; h2 -> 2-1 2-2 2-2; h3 -> 3-1 3-2 3-3
    // 下述代码使移动端只支持 h1 - h3 标签
    let index1 = 0
    let index2 = 0
    let index3 = 0
    renderer.heading = function(text, level) {
      if (level === 1) {
        return `
        <h${level} class="_title" data-id="${level}-${++index1}">
          ${text}
        </h${level}>
      `
      }
      if (level === 2) {
        return `
          <h${level} class="_title" data-id="${level}-${++index2}">
            ${text}
          </h${level}>
        `
      }
      return `
          <h${level} class="_title" data-id="${level}-${++index3}">
            ${text}
          </h${level}>
        `
    }
    // 将服务器的 markdown 数据赋值给本地变量
    markdown.value = noteContent.content
    // 将 markdown 内容渲染为 html
    const markdownToHtmlRes = marked.parse(markdown.value)
    // 未排序的数组 - 格式: [{ level: xx, id: xx, text: xx }, { xxx }]
    const resArr = []
    // 通过正则获取 level、id、text
    const matchStrs = [...markdownToHtmlRes.matchAll(
      /<h(\d)\s+class=\"_title\"\s+data-id=\"(\d-\d)\">\s*(.+)?\s*<\/h\1>/gi)]
    matchStrs.forEach(matchArr => {
      resArr.push({
        level: matchArr[1],
        id: matchArr[2],
        text: matchArr[3]
      })
    })
    // 根据 id 进行排序
    sortedArr.push(...resArr
      .sort((prev, next) => Number(prev.id.split('-')[1]) - Number(next.id.split('-')[1]))
      .sort((prev, next) => Number(prev.id.split('-')[0]) - Number(next.id.split('-')[0]))
    )
    // replace 是为了让代码有黑色背景
    markdown.value = markdownToHtmlRes.replace(/<pre>/g, "<pre class='hljs'>")
  })

  // 返回上一页
  const back = () => {
    uni.navigateBack()
  }
</script>

<style scoped lang="scss">
  .nav {
    background-image: linear-gradient(#555, #eee);
    padding-bottom: 50upx;

    &__back {
      // background-color: red;
      position: fixed;
      z-index: 2;
      /* #ifdef MP-WEIXIN */
      padding: 20upx;
      margin-top: 35upx;
      /* #endif */
      /* #ifdef H5 */
      padding: 25upx;
      /* #endif */
    }

    &__backImg {
      margin-top: 20upx;
      width: 100%;
      max-height: 500upx;
    }
  }

  .anchor {
    margin: 10upx;
    color: slateblue;
    text-decoration: underline;

    &__link {
      margin-bottom: 20upx;

      &-space {
        margin-left: 20upx;
        margin-bottom: 20upx;
      }

    }

  }

  .note {
    // background-color: red;
    width: 750upx;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    &__title {
      background: #eea;
      margin-bottom: 20upx;
      padding: 30upx;
      font-weight: bold;
      font-size: 60upx;
      color: #344;
    }

    &__info {
      display: flex;
      align-items: center;
      margin: 0 0 30upx 10upx;
      font-size: 28upx;
    }

    &__avatar {
      border-radius: 50%;
      width: 50upx;
      max-height: 50upx;
    }

    &__nickName {
      margin-left: 10upx;
      color: #999;
    }

    &__createTime {
      margin-left: 10upx;
      color: #999;
    }

    &__content {
      padding: 0 0 15upx;
      margin-top: 25upx;
      font-size: 38upx;
      max-width: 750upx;
    }
  }
</style>
