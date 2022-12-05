<template>
  <div class="sider-menu">
    <div class="sider-img"></div>
    <div class="s-container">
      <div class="avator">
        <a-avatar :size="64" style="line-height:52px; cursor:pointer">
          <template #icon>
            <img v-if="store.islogin" src="../assets/img/tag2.gif" alt="">
            <UserOutlined v-else style="font-size: 16px" @click="goToPage({path: 'login'})">未登录</UserOutlined>
          </template>
        </a-avatar>
        <div class="avator-info">
          <h2 class="name">{{store.islogin ? store.userInfo.username : '--' }}</h2>
          <p class="desc">{{store.islogin ? store.userInfo.desc : '--' }}</p>
        </div>
      </div>
    </div>
    <div class="s-container">
      <div class="router-list" v-for="router in routerList" :key="router.name" @click="goToPage(router)">
        <div class="r-name">{{router.name}}</div>
        <div class="r-num"></div>
        <div class="r-icon"></div>
      </div>
    </div>
    <div class="s-container">
      <div class="logout" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import useMain from '../store/index'
// import { IUserinfo } from '../types/index'
export default defineComponent({
  name: 'siderMenu',
  props: {
    routerList: Array
  },
  emits: ['onCloseMenu'],
  setup(props, { emit }) {
    const store = useMain()
    const router = useRouter()
    const { routerList } = toRefs<any>(props)
    const goToPage = (item: any) => {
      router.push({
        name: item.path,
        query: {
          from: 'sider'
        }
      })
      emit('onCloseMenu')
    }
    const logout = () => {
      store.setUserInfo({}, false)
    }
    return {
      goToPage,
      logout,
      store,
      routerList
    }
  }
})
</script>

<style lang="scss" scoped>
.sider-menu {
  width: 100%;
  overflow-y: auto;
  position: relative;
  background-color: #f2f5fb;
  padding-top: 110px;

  .s-container {
    min-height: 40px;
    position: relative;
    z-index: 11;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    margin: 10px 20px;
    padding: 10px;
  }

  .sider-img {
    width: 100%;
    height: 160px;
    position: absolute;
    top: 0;
    left: 0;
    background: url('../assets/img/siderbg.jpg') no-repeat;
    background-size: 100% 100%;
    z-index: 10;
  }

  .avator {
    display: flex;
    align-items: center;

    .avator-info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 14px;
        font-weight: 600;
      }

      .desc {
        font-size: 12px;
      }
    }
  }

  .router-list {
    padding: 5px 10px;

    cursor: pointer;

    &:hover {
      color: #1e80ff;
    }
  }
  .logout {
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>