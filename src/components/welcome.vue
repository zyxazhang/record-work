<template>
  <div class="welcome">
    <h1>welcome to record</h1>
    <p></p>
    <div class="guide">
      <a-button class="btn" type="primary" @click="goToRecord">开始</a-button>
      <a-button class="btn">反馈</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'welcome',
  setup() {
    const router = useRouter()
    const goToRecord = () => {
      router.push({
        name: 'record',
        query: {
          from: 'home'
        }
      })
    }
    return {
      goToRecord
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