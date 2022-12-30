<template>
  <component
    class="view-content"
    :is="curKey"
  ></component>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import lolBackList from './lolBackList.vue'
export default defineComponent({
  name: 'toolComponent',
  components: {
    lolBackList,
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
</style>