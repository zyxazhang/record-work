<template>
  <div class="login">
    <div class="container">
      <a-input v-model:value="loginInfo.username" size="small" placeholder="用户名" />
      <a-input-password v-model:value="loginInfo.password" size="small" placeholder="密码" />
      <a-button type="primary" @click="submit">登录</a-button>
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
  background: cornsilk;
  opacity: 0.8;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: calc(50% - 75px);
    left: calc(50% - 100px);
    width: 200px;
    height: 150px;
    padding: 20px;
    font-size: 16px;
    background-color: skyblue;
    border-radius: 8px;
  }

}
</style>
