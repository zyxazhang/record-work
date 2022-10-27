<template>
  <div class="page">
    {{cname}}
    <!-- <img src="./assets/img/recode.png" alt=""> -->
    <i class="record-work icon-webpack"></i>
    <a-button type="primary" @click="getlist">Primary Button</a-button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
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
  color: red;
  // background-color: skyblue;
}
</style>