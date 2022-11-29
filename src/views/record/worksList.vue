<template>
  <div class="works-list">
    <section class="work-content">
      <ul class="work-type" v-for="works in recordList" :key="works.type">
        <li class="works-head">{{works.type}}</li>
        <li class="works-item" v-for="item in works.children" :key="item.id">
          <span :title="item.name" @click="changeRecord(item)">{{item.name}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { worklist } from '../../mock/index'
export default defineComponent({
  name: 'worksList',
  props: {
    recordList: Array
  },
  emits: [
    'getCurRecordId',
    'closeUnfoldList'
  ],
  setup(props, { emit }) {
    const { recordList } = toRefs(props)
    const workList = reactive<any>(worklist)
    const changeRecord = (item: any): void => {
      emit('getCurRecordId', item.record_id)
      emit('closeUnfoldList')
    }
    return {
      workList,
      recordList,
      changeRecord
    }
  }
})
</script>

<style lang="scss" scoped>
.works-list {
  width: 200px;
  height: 100%;
  transition: all 0.5s;
  .work-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 20px 0;
    .work-type {
      width: 100%;
      margin: 0;
      .works-head {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        padding: 0 20px;
      }
      .works-item {
        width: 100%;
        font-size: 12px;
        // height: 50px;
        line-height: 20px;
        padding: 5px 10px 5px 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          color: #979696;
          cursor: pointer;
          &:hover {
            color: #1a73e8;
          }
        }
      }
    }
  }
}
// 超小屏幕
@media screen and (max-width: 575px){

}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){

}
// 中等屏幕
@media screen and (min-width: 768px) and (max-width: 991px){

}
// 大屏幕
@media screen and (min-width: 992px) and (max-width: 1199px){

}
// 特大屏幕
@media screen and (min-width: 1200px){

}
</style>