<template>
  <div class="home">
    <welcome></welcome>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import welcome from '../../components/welcome.vue'
export default defineComponent({
  name: 'home',
  components: {
    welcome
  },
  setup() {

  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% - 50px);
}
</style>