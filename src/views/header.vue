<template>
  <header class="header">
    <div class="text">RW Record Work</div>
    <div class="header-right">
      <ul class="header-nav-li">
        <li v-for="router in routerList" :key="router.name">{{router.name}}</li>
      </ul>
      <div class="header-nav-drop" @click="openMenu">
        <i class="record-work icon-caidan"></i>
      </div>
      <div class="login">
        <a-avatar size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
    </div>
    <a-drawer
      v-model:visible="menuVisible"
      width="40%"
      :closable="false"
      placement="right"
      @after-visible-change="afterVisibleChange">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </header>
</template>

<script lang="ts">
import { BlockList } from 'net'
import { defineComponent, Ref, readonly, ref, reactive } from 'vue'
interface IState {
  list: Array<Ilist>
}
interface Ilist {
  name: string,
  key?: string
}
export default defineComponent({
  name: 'Header',
  setup() {
    const routerList: any = [
      {
        name: '记录',
        icon: 'icon-test-case-secondary',
        path: ''
      },
      {
        name: '用例',
        icon: 'icon-ceshi',
        path: ''
      },
      {
        name: '工具',
        icon: '',
        path: ''
      },
    ]
    const menuVisible = ref<boolean>(false)
    const openMenu = () => {
      menuVisible.value = true
    }
    const afterVisibleChange = (bool: boolean) => {
      console.log(menuVisible.value)
    }
    return {
      routerList,
      menuVisible,
      openMenu,
      afterVisibleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgba(60, 60, 60, .12);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .text {
    color: rgb(25, 24, 24);
    font-weight: bold;
  }
  .header-right {
    display: flex;
    .header-nav-li {
      display: flex;
      margin: 0;
      li {
        padding: 0 20px;
      }
    }
    .header-nav-drop {
      display: none;
    }
    .login {
      height: 100%;
      margin-left: 20px;
    }
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
  .header {
    background-color: rgb(47, 233, 233);
    .header-right {
      .header-nav-li {
        display: none;
      }
      .header-nav-drop {
        display: block;
      }
      .login {
        display: none;
      }
    }
  }
}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){
  .header {
    background: rgb(239, 164, 223);
    .header-right {
      .header-nav-li {
        display: none;
      }
      .header-nav-drop {
        display: block;
      }
      .login {
        display: none;
      }
    }
  }
}
// 中等屏幕
@media screen and (min-width: 768px) and (max-width: 991px){
  .header {
    background: rgb(118, 163, 227);
  }
}
// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px){
  .header {
    background: rgb(226, 243, 97);
  }
}
// 特大屏幕
@media screen and (min-width: 1200px){
  .header {
    background: white;
  }
}
</style>