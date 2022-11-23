<template>
  <div class="tools-component-contanier">
    <div class="c-header">
      <span>{{curSeleted.name}}</span>
      <i class="record-work icon-react" title="close" style="cursor: pointer" @click="closeView"></i>
    </div>
    <component
      class="view-content"
      :is="curKey"
    ></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import lolBackList from './lolBackList.vue'
import imageUpload from './imageUpload.vue'
export default defineComponent({
  name: 'toolComponent',
  components: {
    lolBackList,
    imageUpload
  },
  props: {
    curKey: String,
    curSeleted: Object
  },
  setup(props, { emit }) {
    const { curKey , curSeleted } = toRefs<any>(props)
    const closeView = (): void => {
      emit('closeView')
    }
    return {
      curKey,
      curSeleted,
      closeView
    }
  }
})
</script>

<style lang="scss" scoped>
.tools-component-contanier {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 15%);
  .c-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 5px;
    background-color: #eee;
  }
  .view-content {
    padding: 10px;
  }
}
</style>