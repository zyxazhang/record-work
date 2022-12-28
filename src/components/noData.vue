<template>
  <div class="no-data">
    <img src="../assets/img/paimengyun.gif" alt="">
    <p class="tipMsg">{{ tipMsg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'NoData',
  props: {
    isDev: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '派蒙不知道哦！'
    }
  },
  setup(props) {
    const { isDev, msg } = toRefs(props)
    watch(msg, val => {
      tipMsg.value = val
    })
    const tipMsg = ref<string>('')
    tipMsg.value = isDev.value ? '正 在 开 发 中 · · ·' : msg.value
    return {
      tipMsg
    }
  }
})

</script>

<style lang="scss" scoped>
.no-data {
  width: 100%;
  height: 100%;
  text-align: center;
  // padding: 50px 0;

  img {
    width: 150px;
    height: 150px;
  }

  p {
    font-weight: bold;
    color: #898383;
  }
}
</style>