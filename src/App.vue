<template>
  <div class="page">
    <workHeader v-if="isShowHead"></workHeader>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import workHeader from './layout/header.vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'App',
  components: {
    workHeader
  },
  props: {},
  emits: {},
  setup() {
    const route = useRoute()
    const isShowHead = ref<boolean>(true)
    const exlist = reactive<Array<string>>([
      '/login'
    ])
    watch(route, (r) => {
      isShowHead.value = !exlist.includes(r.fullPath.split('?')[0])
    }, {
      immediate: true
    })
    return {
      isShowHead
    }
  }
})
</script>

<style lang="scss">
@import './assets/fonts/iconfont.css';
@import './assets/scss/reset.scss';
@import './assets/scss/app.scss';
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // background-color: skyblue;
}
.ant-drawer-mask {
  background: cornsilk !important;
}
.ant-modal-header {
  background: url('./assets/img/dialog-header.png') !important;
}

</style>