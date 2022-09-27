<template>

  <!-- #ifdef MP-WEIXIN -->
  <view class="search">
    <u-search placeholder="请输入笔记名......" :actionStyle="{ color: 'white' }"></u-search>
  </view>
  <!-- #endif -->

  <scroll-view class="nav" scroll-x="true">
    <view class="nav__wrapper">
      <view v-for="(tabList, tabIndex) in tabData" :key="tabList.id"
        :class="{ nav__item: true, selected: tabIndex === selectedIndex }" @click="selectNav(tabIndex, tabList.id)">
        {{ tabList.tabTitle }}
      </view>
    </view>
  </scroll-view>

  <template v-if="mainContent.length !== 0">
    <template v-for="noteList in mainContent" :key="noteList.id">
      <view class="note">
        <view class="note__title">
          <u-icon name="tags" color="#2979ff" :label="noteList.categoryName" size="28"></u-icon>
        </view>
        <ul class="sections">
          <li class="section" hover-class="click-hover" v-for="note in noteList.lists" :key="note.id" @click="toNoteDetail(note.id, note.noteName)">
            <u--image class="section__image" :src="note.previewImage" :fade="true" width="50" height="50"
              mode="widthFix">
              <template v-slot:loading>
                <u-loading-icon color="green"></u-loading-icon>
              </template>
            </u--image>
            <text>{{ note.noteName }}</text>
          </li>
        </ul>
      </view>
    </template>
  </template>
</template>

<script setup>
  import {
    getCurrentInstance,
    onMounted,
    reactive,
    ref,
    toRef
  } from "vue"
  import {
    req
  } from "../../server/api";

  // 接收 tab 的信息
  const prop = defineProps({
    tabData: {
      type: Array,
      required: true
    },
    firstTabId: {
      type: Number,
      required: true
    }
  })
  // 上面的 tabData、firstTabId 只能在 HTML 中使用,而下面解构了之后能在 js 中调用
  const firstTabId = toRef(prop, 'firstTabId')

  // 内容区域渲染
  const mainContent = reactive([])
  const getMainContent = async (tabId) => {
    const result = await req({
      url: `/majorCategory/${tabId}/minorCategory`
    })
    mainContent.length = 0
    mainContent.push(...result.data)
  }
  defineExpose({
    getMainContent
  })

  onMounted(async () => {
    // 组件开始渲染时,渲染第一个内容区域
    await getMainContent(firstTabId.value)
  })

  // 切换 tab 栏相关逻辑
  let selectedIndex = ref(0)
  const selectNav = async (index, tabId) => {
    if (selectedIndex.value === index) return
    selectedIndex.value = index
    await getMainContent(tabId)
  }
  
  // 监听刷新操作,若刷新则返回主页
  uni.$on('backToIndex', () => {
    selectedIndex.value = 0
  })
  
  // 进入笔记内部
  const toNoteDetail = (noteId, noteName) => {
    uni.navigateTo({
      url: `/pages/index/note?noteId=${noteId}`
    })
  }
</script>

<style scoped lang="scss">
  // 微信搜索框样式
  /* #ifdef MP-WEIXIN */
  .search {
    padding: 20upx;
    background-color: #555;
  }

  /* #endif */

  // nav 栏样式
  .nav {
    background-color: #555;
    color: #eee;
    height: 120upx;
    line-height: 120upx;

    &__wrapper {
      display: flex;
      align-items: center;
    }

    &__item {
      min-width: 160upx;
      display: flex;
      justify-content: center;
      flex: 1;
    }
  }

  // nav 栏选中样式
  .selected {
    color: skyblue;
    position: relative;
    transition: color 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      width: 100upx;
      height: 2upx;
      top: 30upx;
      background-color: skyblue;
      transition: all 0.3s ease;
    }
  }

  // 内容区样式
  .note {
    margin: 20upx;
    display: flex;
    flex-direction: column;
    box-shadow: 0upx 0upx 6upx rgba(0, 0, 0, 0.2);
    margin-bottom: 50upx;

    &__title {
      margin: 20upx 0 20upx 20upx;
      font-size: 35upx;
    }

    .sections {
      padding: 0;

      .section {
        height: 100upx;
        border-top: 1upx solid #eee;
        padding: 20upx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        text {
          font-size: 35upx;
          max-width: 350upx;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .click-hover {
        background-color: #f5f5f5;
      }
    }
  }
</style>
