<template>
  <div class="login">
    <img class="img" src="../assets/img/loginbg.jpg" alt="">
    <div class="container">
      <p class="header-icon record-work icon-bianjimoban"></p>
      <h2>RECORD WORK</h2>
      <div class="input">
        <div class="username-icon record-work icon-yonghu"></div>
        <a-input class="username-input" v-model:value="loginInfo.username" type="text" placeholder="用户名" />
      </div>
      <div class="input">
        <div class="username-icon record-work icon-mima"></div>
        <a-input class="username-input" v-model:value="loginInfo.password" type="password" placeholder="密码" />
      </div>
      <div class="submit" @click="submit">登  录</div>
      <!-- <a-input v-model:value="loginInfo.username" size="small" placeholder="用户名" />
      <a-input-password v-model:value="loginInfo.password" size="small" placeholder="密码" />
      <a-button type="primary" @click="submit">登录</a-button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import setCookie from '../utils/setCookie'
import { message } from 'ant-design-vue'
import { TLogin } from '../types/index'
import useMain from '../store/index'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'login',
  setup() {
    const store = useMain()
    const router = useRouter()
    const loginInfo = reactive<TLogin>({
      username: '',
      password: ''
    })
    const submit = async () => {
      const tipinfo: string = !loginInfo.username ? '请输入用户名' : !loginInfo.password ? '请输入密码' : ''
      if (tipinfo) {
        message.warning(tipinfo)
        return
      }
      const res = await store.login(loginInfo)
      if (res.result) {
        store.setUserInfo(res.data, true)
        setCookie('token', res.data.token, 0.4)
        router.replace({
          name: 'home'
        })
      }
    }
    return {
      loginInfo,
      submit
    }
  }
})
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(2px);
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    z-index: 100;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    padding: 20px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    .header-icon {
      font-size: 40px;
      margin: 0;
    }
    h2 {
      color: #fff;
      line-height: 40px;
    }
    .input {
      display: flex;
      margin-bottom: 20px;
      .username-icon {
        width: 80px;
        height: 60px;
        background-color: #b289bc;
        text-align: center;
        line-height: 60px;
        font-size: 36px;
      }
      .username-input {
        width: 320px;
        height: 60px;
        font-size: 20px;
        border: 1px solid #b289bc;
        background-color: rgba(85, 85, 85, 0.1) ;
        box-shadow: inset 0 0 5px 0 #b289bc;
        color: #fff;
        padding: 0 10px;
      }
      
    }
    .submit {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      background-color: #b289bc;
      box-shadow: inset 0 0 5px 0 #b289bc;
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }

}
</style>
