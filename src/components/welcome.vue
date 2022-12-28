<template>
  <div class="welcome">
    <h1>welcome to record</h1>
    <p></p>
    <div class="guide">
      <a-button class="btn" type="primary" @click="goToRecord">开始</a-button>
      <a-button class="btn" @click="showModal">反馈</a-button>
    </div>
    <a-modal v-model:visible="showSuggest" title="给个建议吧😁" :confirm-loading="confirmLoading" @ok="submit">
      <a-textarea v-model:value="suggestValue" placeholder="建议一下！" :rows="4" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'welcome',
  setup() {
    const router = useRouter()
    const showSuggest = ref<boolean>(false)
    const confirmLoading = ref<boolean>(false)
    const suggestValue = ref<string>('')
    const goToRecord = (): void => {
      router.push({
        name: 'record',
        query: {
          from: 'home'
        }
      })
    }
    const showModal = (): void => {
      showSuggest.value = true
    }
    const submit = (): void => {
      confirmLoading.value = true
      setTimeout(() => {
        message.success('提交成功')
        confirmLoading.value = false
        showSuggest.value = false
        suggestValue.value = ''
      }, 2000)
    };
    return {
      showSuggest,
      confirmLoading,
      suggestValue,
      goToRecord,
      showModal,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.welcome {
  width: 80%;
  margin: 20% auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .guide {
    width: 50%;
    display: flex;
    justify-content: center;
    .btn {
      padding: 0 30px;
      margin: 0 10px;
    }
  }
}
@media screen and (max-width: 575px){

}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){

}
// 中等屏幕
@media screen and (min-width: 768px) and (max-width: 991px){

}
// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px){

}
// 特大屏幕
@media screen and (min-width: 1200px){

}
</style>