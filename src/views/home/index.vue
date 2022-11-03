<template>
  <div class="home">
    <div class="home-head">
      <i class="record-work icon-webpack" @click="unfoldlist"></i>
      <i class="record-work icon-fanhuidingbu"></i>
    </div>
    <div class="home-content">
      <worksList ref="worksList" :class="[ unfold ? 'list-unfold' : 'list' ]"></worksList>
      <worksContent @click="closeUnfoldList" ref="worksContent" :class="[ unfold ? 'content-unfold' : 'content' ]" :unfold="unfold"></worksContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import worksList from './worksList.vue'
import worksContent from './worksContent.vue'
export default defineComponent({
  name: 'home',
  components: {
    worksList,
    worksContent
  },
  setup() {
    const unfold = ref<boolean>(false)
    const worksList = ref<any>(null)
    const worksContent = ref<any>(null)
    const unfoldlist = (): void => {
      console.log(worksList.value)
      unfold.value = true
    }
    const closeUnfoldList = (): void => {
      unfold.value = false
    }
    return {
      unfold,
      worksList,
      worksContent,
      unfoldlist,
      closeUnfoldList
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% - 50px);
  .home-head {
    height: 0px;
    overflow: hidden;
    width: 100%;
    padding: 0 5px;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      font-size: 20px;
    }
  }
  .home-content {
    width: 100%;
    height: 100%;
    display: flex;
    .list-unfold {
      width: 200px;
    }
    .content-unfold {
      background: #333333;
      opacity: 0.1;
    }
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
.home {
  .home-head {
    height: 30px;
  }
  .home-content {
    height: calc(100% - 30px);
    .list {
      width: 0;
    }
  }
}
}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){
.home {
  .home-head {
    height: 30px;
  }
  .home-content {
    height: calc(100% - 30px);
    .list {
      width: 0;
    }
  }
}
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