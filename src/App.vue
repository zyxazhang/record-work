<template>
  <div class="page">
    <workHeader></workHeader>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import workHeader from './views/header.vue'
export default defineComponent({
  name: 'App',
  components: {
    workHeader
  },
  props: {},
  emits: {},
  setup() {
    const cname: string = 'this is record'
    const getlist = (): void => {
      console.log('asas')
    }
    return {
      cname,
      getlist
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

</style>