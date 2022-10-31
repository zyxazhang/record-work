<template>
  <div class="works-content">
    <section class="content">
      <p>Can you give me the invoice?</p>
      <p>Have you heaed the weather forecast?</p>
      <p>That's a real let down.</p>
      <p v-for="(text, index) in list" :key="index">
        {{text}}
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { textEn } from '../../mock/index'
export default defineComponent({
  name: 'wooksContent',
  setup(){
    const list = reactive(textEn)
    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.works-content {
  flex: 1;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px 20%;
  }
}
// 超小屏幕
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