<template>
  <div class="tools-contanier">
    <div v-if="!isView" class="tool-list">
      <ul class="tool-content">
        <li v-for="toolItem in tools.toolList" :key="toolItem.key" @click="openView(toolItem)">
          <h3 class="name">{{toolItem.name}}</h3>
          <p class="desc">{{toolItem.desc || '🤔还没有备注哦！'}}</p>
          <span class="time">{{toolItem.time}}</span>
        </li>
      </ul>
    </div>
    <div v-else class="tool-view">
      <toolComponent
        :cur-key="tools.curComponent"
        :cur-seleted="tools.curSeleted"
        @closeView="closeView"
      ></toolComponent>
    </div>
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
      curSeleted: {},
      curComponent: ''
    })
    const isView = ref<boolean>(false)
    const openView = (item: IToolsList):void => {
      tools.curSeleted = item
      tools.curComponent = item.key
      isView.value = true
    }
    const closeView = ():void => {
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
.tools-contanier {
  width: 100%;
  height: calc(100% - 50px);
  .tool-view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
  }
  .tool-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    .tool-content {
      width: 100%;
      display: grid;
      justify-content: space-evenly;
      grid-template-columns: repeat(auto-fill, 320px);
      grid-gap: 20px;
      li {
        width: 320px;
        height: 100px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 15%);
        padding: 10px;
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
}
</style>