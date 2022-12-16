<template>
  <header class="header">
    <div class="text" @click="goToPage({path: 'home'})">RW Record Work</div>
    <div class="header-right">
      <ul class="header-nav-li">
        <li v-for="router in routerList" :key="router.name" @click="goToPage(router)" :title="router.name">{{router.name}}</li>
        <!-- <li></li> -->
      </ul>

      <div class="login">
        <a-avatar @click="goToPage({path: 'login'})">
          <template #icon>
            <UserOutlined v-if="!store.islogin" />
            <img v-else src="../assets/img/tag2.gif" alt="">
          </template>
        </a-avatar>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import cookie from 'cookie'
import { useRouter } from 'vue-router'
import useMain from '../store/index'
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
    const store = useMain()
    console.log(store)
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
    const openMenu = (): void => {
      menuVisible.value = true
    }
    const afterVisibleChange = (bool: boolean) => {
      console.log(bool)
    }
    const goToPage = (listItem: IrouterItem): void => {
      if (store.islogin && listItem.path === 'login') {
        router.push({
          name: 'admin'
        })
        return
      }
      router.push({
        name: listItem.path
      })
    }
    onMounted(async () => {
      const tokenarr: any = document.cookie.match(new RegExp("(^| )" + 'token' + "=([^;]*)(;|$)"))
      if (tokenarr && tokenarr[2]) {
        await store.getUserInfo()
      }
    })
    return {
      store,
      routerList,
      openMenu,
      afterVisibleChange,
      goToPage
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
  height: 60px;
  line-height: 60px;
  background-color:#1e1e1e;
  border-bottom: 1px solid rgba(60, 60, 60, .12);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .text {
    color: rgb(212, 212, 212);
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
        color: #c3c4c4;
        cursor: pointer;
        &:hover {
          color: #fff;
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
    z-index: 999;
    top: 60px;
    right: 10px;
    width: 500px;
    height: 250px;
    background-color: #fff;
    border: 1px solid #e4e6eb;
    box-shadow: 0 0 24px rgb(81 87 103 / 16%);
    .user-left {
      width: 200px;
      height: 100%;
      border-right: 1px solid #e4e6eb;

    }
    .user-right {
      width: 300px;
      height: 100%;
    }
  }
}
</style>