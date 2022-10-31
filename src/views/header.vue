<template>
  <header class="header">
    <div class="text">RW Record Work</div>

  </header>
</template>

<script lang="ts">
import { defineComponent, Ref, readonly, ref, reactive } from 'vue'
interface IState {
  list: Array<Ilist>
}
interface Ilist {
  name: string,
  key?: string
} 
interface Tasa {
  
}
export default defineComponent({
  name: 'Header',
  setup() {
    const as: Ref<Ilist[]> = ref([
      {
        name: 'ad',
      }, {
        name: 'asdaa'
      }
    ])
    const state = readonly(reactive<IState>({
      list: [
        {
          name: 'asd',
          key: 'asdsd'
        }
      ]
    }))
    return {
      state,
      as
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgba(60, 60, 60, .12);
  padding: 0 20px;
  .text {
    color: rgb(25, 24, 24);
    font-weight: bold;
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
  .header {
    background-color: rgb(47, 233, 233);
  }
}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){
  .header {
    background: rgb(239, 164, 223);
  }
}
// 中等屏幕
@media screen and (min-width: 768px) and (max-width: 991px){
  .header {
    background: rgb(118, 163, 227);
  }
}
// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px){
  .header {
    background: rgb(226, 243, 97);
  }
}
// 特大屏幕
@media screen and (min-width: 1200px){
  .header {
    background: white;
  }
}
</style>