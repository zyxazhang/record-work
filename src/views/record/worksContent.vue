<template>
  <div class="works-content">
    <a-spin :spinning="contentLoading" size="large">
      <section class="content">
        <div class="content-header">
          <h1>{{ detail.name }}</h1>
          <p v-if="detail.create_time" class="time"><i class="record-work icon-shijian"></i>{{ detail.create_time }}</p>
        </div>
        <editor v-if="!unfold" type="view" :content="detail.content"></editor>
        <div v-else class="mask">
          {{ store.testText }}
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
  setup(props) {
    const { unfold, curRecordId } = toRefs(props)
    const store = useMain()
    const contentLoading = ref<boolean>(false)
    const detail = ref<any>({})
    watch(curRecordId, (id) => {
      contentLoading.value = true
      if (id === undefined) {
        console.log('首页')
      } else {
        getRecordDetails(id)
      }
    })
    const getRecordDetails = (id: number) => {
      store.getRecordDetails({ id }).then(res => {
        detail.value = res.data
      }).finally(() => {
        contentLoading.value = false
      })
    }
    return {
      contentLoading,
      detail,
      store,
      unfold
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  overflow-y: auto;
  padding: 10px 10%;

  .content-header {
    .time {
      font-size: 10px;
      i {
        font-size: 10px;
        margin-right: 5px;
      }
    }
  }
}

// 超小屏幕
@media screen and (max-width: 575px) {
  .content {
    padding: 10px 5%;
  }
}

// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px) {}

// 中等屏幕
@media screen and (min-width: 768px) and (max-width: 991px) {}

// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px) {}

// 特大屏幕
@media screen and (min-width: 1200px) {}
</style>