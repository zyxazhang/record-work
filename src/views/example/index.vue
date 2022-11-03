<template>
  <div>
    <Editor :type="'edit'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from '../../components/editor.vue'
export default defineComponent({
  name: 'example',
  components: {
    Editor
  }
})

</script>

<style lang="scss" scoped>

</style>