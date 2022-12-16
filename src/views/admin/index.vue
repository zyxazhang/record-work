<template>
  <div class="admin">
    <!-- <p class="admin-text">I am a sloow walker, but I never walk backwards.</p> -->
    <p class="admin-text"></p>
    <img class="admin-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <div class="name">欢迎你：{{store.islogin ? store.userInfo.username : '--' }}</div>
      <div class="cur-time">{{new Date()}}</div>
      <div class="info-warpper">
        <div class="item" v-for="info in 7" :key="info">
          <div class="mask" @click="logout">这是什么大苏打</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'
import useMain from '../../store/index'
import { IRecordField, IRecordType } from '../../types/index'
const column = [
  {
    name: '个人资料',
    meta: {

    }
  }
]
export default defineComponent({
  name: 'admin',
  setup() {
    const store = useMain()
    const router = useRouter()
    const data = ref<Array<IRecordField>>([])
    const init = () => {
      // getRecordList()
    }
    const getRecordList = async () => {
      // const res = await store.getRecordList()
      // data.value = res.data
    }
    const logout = () => {
      store.setUserInfo({}, false)
      document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
      router.push({
        name: 'home'
      })
    }
    onMounted(() => {
      init()
    })
    return {
      store,
      data,
      logout
    }
  }
})

</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  .admin-text {
    width: 100%;
    height: 20px;
    font-size: 20px;
    position: absolute;
    top: 100px;
    z-index: 101;
    color: #fff;
    text-align: center;
    color: transparent;
    font-size: 2.5em;
    -webkit-text-stroke: 1px #fff;
    font-weight: bold;
  }

  .admin-img {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 320px;
    object-fit: cover;
  }
  .contanier {
    width: 1280px;
    margin: 0 auto;
    min-height: calc(100% - 440px);
    .name {
      padding: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .cur-time {
      padding: 0 20px;
    }
    .info-warpper {
      width: 100%;
      .item {
        width: 380px;
        height: 200px;
        margin: 20px;
        background-color: #afa5ae;
        text-align: center;
        font-size: 200%;
        color: #fff;
        float: left;
        overflow: hidden;
        position: relative;
        &:hover {
          .mask {
            bottom: 0;
          }
        }
        .mask {
          position: relative;
          left: 0;
          bottom: -200px;
          background-color: #fff;
          width: 100%;
          height: 100%;
          color: rgb(112, 109, 109);
          transition: all 0.5s;
          cursor: pointer;
        }
      }
    }
  }
}
</style>