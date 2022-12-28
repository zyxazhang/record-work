<template>
  <div class="log-out">
    <template v-if="!waitState">
      <p>确定要{{ btnInfo.name }}？</p>
      <div class="operate">
        <button class="btn" @click="submit">确定</button>
        <button class="btn" @click="close">取消</button>
      </div>
    </template>
    <no-data v-else :msg="waitMsg"></no-data>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import noData from '../../components/noData.vue'
import Template from '../funcs/components/template.vue'
export default defineComponent({
  name: 'Logout',
  components: {
    noData,
    Template
  },
  props: {
    btnInfo: Object,
    userInfo: Object
  },
  emits: [
    'closeAdminModal',
    'logout',
    'exit'
  ],
  setup(props, { emit }) {
    const waitState = ref<boolean>(false)
    const waitMsg = ref<string>('')
    const { btnInfo, userInfo } = toRefs<any>(props)

    const submit = ():void => {
      const isQuit = btnInfo.value.key === 'quit'
      const time = isQuit ? 1000 : 2000
      waitMsg.value = isQuit ? '正 在 退 出 中 ···': '正 在 注 销 中 ···'
      waitState.value = true
      setTimeout(() => {
        waitMsg.value = isQuit ? '退 出 成 功, 即 将 返 回 首 页 ！': '注 销 成 功 ，即 将 返 回 首 页 ！'
        setTimeout(() => {
          isQuit ? emit('exit') : emit('logout')
        }, 1000);
      }, time);
    }

    const close = (): void => {
      emit('closeAdminModal')
    }
    return {
      waitState,
      btnInfo,
      waitMsg,
      close,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.log-out {
  text-align: center;

  p {
    font-weight: bold;
    font-size: 20px;
  }

  .operate {
    .btn {
      font-weight: bold;
      font-size: 20px;
      width: 150px;
      height: 40px;
      border: none;
      border-radius: 8px;
      margin: 0 20px;
      cursor: pointer;
      &:hover {
        background: url("../../assets/img/btnbg.png") no-repeat;
        cursor: pointer;
        color: #fff !important;
      }
    }
  }
}
</style>