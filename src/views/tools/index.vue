<template>
  <div class="tools">
    <p class="tools-text">工具</p>
    <img class="tools-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <div class="tool-list">
        <customBotton :class="['name', route.name === tool.name ? 'active' : '']" v-for="tool in toolList" :key="tool.name" @onClick="handleClick(tool.name)">{{ tool.title }}</customBotton>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IToolState, IToolsList } from '../../types/index'
export default defineComponent({
  name: 'toolsIndex',
  components: {
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const toolList = ref<Array<IToolState>>([])
    route.matched[0].children.forEach((item: any) => {
      toolList.value.push({
        title: item.meta.title,
        path: item.path,
        name: item.name
      })
    })
    console.log(route.name)
    const loading = ref<boolean>(false)
    const handleClick = (name: string) => {
      router.push({
        name
      })
    }
    return {
      route,
      loading,
      toolList,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.tools {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;

  .tools-text {
    width: 100%;
    min-width: 1280px;
    height: 20px;
    font-size: 20px;
    position: absolute;
    top: 150px;
    z-index: 101;
    color: #fff;
    text-align: center;
    color: transparent;
    font-size: 2.5em;
    -webkit-text-stroke: 1px #fff;
    font-weight: bold;
  }

  .tools-img {
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

    .tool-list {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 10px 20px;
      display: flex;
      flex-wrap: wrap;

      .name {
        width: 228px;
        height: 50px;
        background-color: #8d7871;
        border-radius: 8px;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 15%);
        padding: 10px;
        margin: 10px;
        color: #dee1e6;
        cursor: pointer;
        line-height: 30px;
      }
      .active {
        background: #888ea6;
      }
    }
    .content {
      width: 100%;
      padding: 0 30px 20px 30px;
      min-height: 500px;
    }
  }


  .tool-view {
    width: 100%;
    // height: 100%;
    overflow-y: auto;
    padding: 20px;
    min-height: 200px;
  }
}
</style>