<template>
  <header class="header">
    <div class="text" @click="goToPage({path: 'home'})">RW Record Work</div>
    <div class="header-right">
      <ul class="header-nav-li">
        <li v-for="router in routerList" :key="router.name" @click="goToPage(router)">{{router.name}}</li>
      </ul>
      <div class="header-nav-drop" @click="openMenu">
        <i class="record-work icon-caidan"></i>
      </div>
      <div class="login">
        <a-avatar size="small" @click="openUserInfo">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
    </div>
    <a-drawer
      v-model:visible="menuVisible"
      width="80%"
      :closable="false"
      placement="right"
      @after-visible-change="afterVisibleChange">
      <siderMenu :routerList="routerList" @onCloseMenu="closeMenu"></siderMenu>
    </a-drawer>
    <div v-if="userInfoVisible" class="user-info">
      hh
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import siderMenu from '../components/sideBarMenu.vue'
interface IrouterItem {
  name?: string,
  icon?: string,
  path: string
}
export default defineComponent({
  name: 'Header',
  components: {
    siderMenu
  },
  setup() {
    const router = useRouter()
    const routerList: any = [
      {
        name: '记录',
        icon: 'icon-test-case-secondary',
        path: 'record'
      },
      {
        name: '用例',
        icon: 'icon-ceshi',
        path: 'example'
      },
      {
        name: '工具',
        icon: '',
        path: 'tools'
      },
    ]
    const menuVisible = ref<boolean>(false)
    const userInfoVisible = ref<boolean>(false)
    const openMenu = (): void => {
      menuVisible.value = true
    }
    const afterVisibleChange = (bool: boolean) => {
      console.log(bool)
    }
    const closeMenu = () => {
      menuVisible.value = false
    }
    const goToPage = (listItem: IrouterItem): void => {
      router.push({
        name: listItem.path
      })
    }
    const openUserInfo = ():void => {
      userInfoVisible.value = !userInfoVisible.value
    }
    return {
      routerList,
      menuVisible,
      userInfoVisible,
      openMenu,
      afterVisibleChange,
      goToPage,
      closeMenu,
      openUserInfo
    }
  }
})
</script>
<style lang="scss">
.ant-drawer-body {
  padding: 0 !important;
  background-color: #f2f6fc;
}
.ant-drawer-mask {
  background: cornsilk;
}
</style>
<style lang="scss" scoped>
.header {
  position: relative;
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
    cursor: pointer;
  }
  .header-right {
    display: flex;
    .header-nav-li {
      display: flex;
      margin: 0;
      li {
        padding: 0 20px;
        cursor: pointer;
        &:hover {
          color: #1e80ff;
        }
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
  .user-info {
    position: absolute;
    top: 60px;
    right: 10px;
    width: 600px;
    height: 400px;
    background-color: #fff;
    border: 1px solid #e4e6eb;
    box-shadow: 0 0 24px rgb(81 87 103 / 16%);
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
  .header {
    background-color: cornsilk;
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
    background: cornsilk;
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
    background: cornsilk;
  }
}
// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px){
  .header {
    background: cornsilk;
  }
}
// 特大屏幕
@media screen and (min-width: 1200px){
  .header {
    background: cornsilk;
  }
}
</style>