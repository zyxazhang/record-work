<template>
  <div class="tools">
    <p class="tools-text">工具</p>
    <img class="tools-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <ul class="tool-list">
        <li v-for="toolItem in tools.toolList" :key="toolItem.key" @click="openView(toolItem)">
          <h3 class="name">{{ toolItem.name }}</h3>
          <p class="desc">{{ toolItem.desc || '🤔还没有备注哦！' }}</p>
          <span class="time">{{ toolItem.time }}</span>
        </li>
      </ul>
    </div>
    <a-modal
      v-model:visible="isView" 
      :title="tools.curSeleted.name"
      centered
      :footer="null">
      <div class="tool-view">
        <toolComponent :cur-key="tools.curComponent" :cur-seleted="tools.curSeleted" @closeView="closeView">
        </toolComponent>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { toolList } from '../../constans/index'
import { IToolState, IToolsList } from '../../types/index'
import toolComponent from './toolComponents/index.vue'
export default defineComponent({
  name: 'toolsIndex',
  components: {
    toolComponent
  },
  setup() {
    const tools = reactive<IToolState>({
      toolList,
      curSeleted: {
        name: '',
        key: '',
        time: '',
        desc: ''
      },
      curComponent: ''
    })
    const isView = ref<boolean>(false)
    const openView = (item: IToolsList): void => {
      tools.curSeleted = item
      tools.curComponent = item.key
      isView.value = true
    }
    const closeView = (): void => {
      tools.curComponent = ''
      isView.value = false
    }
    return {
      tools,
      isView,
      openView,
      closeView
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