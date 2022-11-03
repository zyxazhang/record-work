<template>
  <Editor
    v-if="isEdit"
    class="edit"
    :value="value"
    :plugins="plugins"
    :uploadImages="uploadImage"
    @change="handleChange">
  </Editor>
  <Viewer
    v-else
    class="view"
    :value="value"
    :plugins="plugins">
  </Viewer>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { Editor, Viewer } from '@bytemd/vue-next';
import 'bytemd/dist/index.min.css';
import breaks from '@bytemd/plugin-breaks';
import highlight from '@bytemd/plugin-highlight';
import footnotes from '@bytemd/plugin-footnotes';
import frontmatter from '@bytemd/plugin-frontmatter';
import gfm from '@bytemd/plugin-gfm';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import gemoji from '@bytemd/plugin-gemoji';

import "highlight.js/styles/base16/atelier-lakeside-light.css";
import "juejin-markdown-themes/dist/arknights.min.css";

export default defineComponent({
  name: 'editor',
  components: {
    Editor,
    Viewer
  },
  props: {
    type: String
  },
  setup(props) {
    const { type } = toRefs<any>(props)
    const isEdit = type.value === 'edit'
    const value = ref("# 问题描述 ERESOLVE unable to resolve dependency tree\n- 本地配置前端框架 安装依赖时报错\n环境信息\n```js\nconst a = 'asd'\n```")
    const plugins = [
      breaks(),
      highlight(),
      footnotes(),
      frontmatter(),
      gfm(),
      mediumZoom(),
      gemoji(),
    ]
    const handleChange = (v: any): void => {
      value.value = v
    }
    const uploadImage = async (files: any) => {
      const formdata = new FormData()
      formdata.append('file', files[0])
      // const res = await this.$store.dispatch('upload', formdata)
      // console.log(res);
      // return [
      //   {
      //     title: files.map((i) => i.name),
      //     url: 'http://localhost:8080/' + res.img
      //   }
      // ]
    }
    return {
      value,
      isEdit,
      plugins,
      handleChange,
      uploadImage
    }
  }
})
</script>
<style lang="scss">
.edit {
  width: 100%;
  min-height: 800px;
  .bytemd {
    min-height: 800px;
  }
}
.view {
  width: 100%;
  height: 100%;
}
</style>