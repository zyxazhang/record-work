<template>
  <div class="admin">
    <!-- <p class="admin-text">I am a sloow walker, but I never walk backwards.</p> -->
    <p class="admin-text"></p>
    <img class="admin-img" src="../../assets/img/homebg.jpg" alt="" />
    <div class="contanier">
      <div class="name">
        欢迎你：{{ store.islogin ? store.userInfo.username : "--" }}
      </div>
      <div class="cur-time">{{ new Date() }}</div>
      <div class="info-warpper">
        <div class="item" v-for="info in metaData" :key="info.key">
          <div class="item-name">
            <p :class="'s'">🐳</p>
            <p>{{ info.name }}</p>
          </div>
          <div class="mask">
            <button
              class="btns"
              v-for="btn in info.meta.btns"
              :key="btn.key"
              :style="{ color: btn.color }"
              @click="openAdminModal(btn, info)"
            >
              {{ btn.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="adminModal"
      :width="modalConfig.width"
      :title="modalConfig.title"
      style="top: 300px"
      :maskClosable="false"
      :footer="null"
      :destroyOnClose="true"
    >
      <component
        :is="componentKey"
        :btn-info="bottonInfo"
        :user-info="store.userInfo"
        @exit="exit"
        @logout="logout"
        @closeAdminModal="closeAdminModal"
      >
      </component>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useMain from "../../store/index";
import { userMata } from "../../constans/index";

import useInfo from "./useInfo.vue";
import logout from "./logout.vue";

interface IBottonInfo {
  name: string;
  key: string;
  color?: string;
}
export default defineComponent({
  name: "admin",
  components: {
    useInfo,
    logout,
  },
  setup() {
    const store = useMain();
    const router = useRouter();
    const metaData = reactive(userMata);
    const componentKey = ref<string>("");
    const adminModal = ref<boolean>(false);

    const modalConfig = reactive<any>({
      title: "",
      width: "",
    });

    const bottonInfo = reactive<IBottonInfo>({
      name: "",
      key: "",
    });
    //  ---- modal ----
    // 打开modal 给modal变量赋值
    const openAdminModal = (btn: any, info: any) => {
      modalConfig.title = info.name + "-" + btn.name;
      modalConfig.width = info.key !== "logout" ? "1000px" : "500px";
      bottonInfo.name = btn.name;
      bottonInfo.key = btn.key;
      componentKey.value = info.key;

      adminModal.value = true;
    };
    const closeAdminModal = () => {
      adminModal.value = false;
    };

    const init = () => {
      // getRecordList()
    };


    // ---- 登出 ----
    const exit = () => {
      store.setUserInfo({}, false);
      document.cookie =
        "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      router.push({
        name: "home",
      });
      adminModal.value = false;
    };
    const logout = (): void => {
      adminModal.value = false;
    }
    const sumbit = (): void => {
      adminModal.value = false;
    };
    onMounted(() => {
      init();
    });
    return {
      store,
      metaData,
      adminModal,
      componentKey,
      bottonInfo,
      modalConfig,
      openAdminModal,
      closeAdminModal,
      sumbit,
      exit,
      logout
    };
  },
});
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
        background: url("../../assets/img/191729-163230944924ea.jpg") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-size: 200%;
        color: #fff;
        float: left;
        overflow: hidden;
        position: relative;

        &:hover {
          .mask {
            box-shadow: 0 0 6px 0 #afa5ae inset;
            bottom: 0;
          }
        }

        .item-name {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          font-weight: bold;
          flex-direction: column;
          justify-content: center;

          p {
            margin: 0;
            height: 50px;
            line-height: 50px;
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
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
          padding: 45px 0px;

          .btns {
            font-weight: bold;
            font-size: 20px;
            width: 150px;
            height: 40px;
            border: none;
            border-radius: 8px;

            &:hover {
              background: url("../../assets/img/btnbg.png") no-repeat;
              cursor: pointer;
              color: #fff !important;
            }
          }
        }
      }
    }
  }
}
</style>
