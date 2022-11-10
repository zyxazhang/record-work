<template>
  <div class="works-content">
    <a-spin :spinning="contentLoading" size="large">
      <section class="content">
        <editor v-if="!unfold" type="view" :content="content.content"></editor>
        <div v-else class="mask">
          {{store.testText}}
        </div>
      </section>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import editor from '../../components/editor.vue'
import { IRecordDetail } from '../../types/index'
import useMain from '../../store/index'
export default defineComponent({
  name: 'wooksContent',
  components: {
    editor
  },
  props: {
    unfold: Boolean,
    curRecordId: Number
  },
  setup(props){
    const { unfold, curRecordId } = toRefs(props)
    const store = useMain()
    const contentLoading = ref<boolean>(false)
    const content = ref<any>({})
    watch(curRecordId, (id) => {
      contentLoading.value = true
      if(id === undefined) {
        console.log('首页')
      } else {
        getRecordDetails(id)
      }
    })
    const getRecordDetails = (id: number) => {
      store.getRecordDetails({id}).then(res =>{
        content.value = res.data
      }).finally(() => {
        contentLoading.value = false
      })
    }
    return {
      contentLoading,
      content,
      store,
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