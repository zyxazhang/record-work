<template>
  <div class="works-content">
    <section class="content">
      <editor v-if="!unfold" type="view"></editor>
      <div v-else class="mask">
        {{store.testText}}
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import editor from '../../components/editor.vue'
import { textEn } from '../../mock/index'
import useMain from '../../store/index'
export default defineComponent({
  name: 'wooksContent',
  components: {
    editor
  },
  props: {
    unfold: Boolean
  },
  setup(props){
    const { unfold } = toRefs(props)
    const store = useMain()
    const list = reactive(textEn)
    return {
      store,
      list,
      unfold
    }
  }
})
</script>

<style lang="scss" scoped>
.works-content {
  flex: 1;
  height: 100%;
  overflow: auto;
  .content {
    width: 100%;
    overflow-y: auto;
    padding: 10px 20%;
    .mask {

    }
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
  .works-content {
    .content {
      padding: 10px 5%;
    }
  }
}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){
  .works-content {
    .content {
      padding: 10px 10%;
    }
  }
}
// 中等屏幕
@media screen and (min-width: 768px) and (max-width: 991px){
  .works-content {
    .content {
      padding: 10px 10%;
    }
  }
}
// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px){

}
// 特大屏幕
@media screen and (min-width: 1200px){

}
</style>