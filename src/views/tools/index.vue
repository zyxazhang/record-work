<template>
  <div class="tools">
    <p class="tools-text">工具</p>
    <img class="tools-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <a-space>
        <customBotton title="朱泽民sb" class="name" size="small" :loading="loading" @onClick="handleClick"></customBotton>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { IToolState, IToolsList } from '../../types/index'
export default defineComponent({
  name: 'toolsIndex',
  components: {
  },
  setup() {
    const route = useRoute()
    const toolList = ref<Array<IToolState>>([])
    route.matched[0].children.forEach((item: any) => {
      toolList.value.push({
        title: item.meta.title,
        path: item.path,
        name: item.name
      })
    })
    const loading = ref<boolean>(false)
    const handleClick = () => {
      loading.value = !loading.value
      console.log('sdsdsd')
    }
    return {
      loading,
      toolList,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.name {
  // font-size: 20px;
}
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
      padding: 20px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 320px;
        height: 100px;
        background-color: #8f7e88;
        border-radius: 8px;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 15%);
        padding: 10px;
        margin: 10px;
        color: #dee1e6;
        cursor: pointer;

        .name {
          font-weight: 600;
          color: #6e6e6e;
        }

        .desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .time {
          display: block;
          text-align: right;
        }

        &:hover {
          box-shadow: 0 6px 24px 0 rgb(0 0 0 / 15%);
        }
      }
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