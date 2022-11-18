<template>
  <div class="record">
    <div class="record-head">
      <i class="record-work icon-caidan" @click="unfoldlist"></i>
      <i class="record-work icon-fanhuidingbu"></i>
    </div>
    <div class="record-content">
      <worksList
        ref="worksList"
        class="work-list"
        :record-list="recordList"
        @getCurRecordId="getCurRecordId"
        @closeUnfoldList="closeUnfoldList">
      </worksList>
      <worksContent
        ref="worksContent"
        class="work-content"
        :unfold="unfold"
        :cur-record-id="curRecordId"
        @click="closeUnfoldList">
      </worksContent>
      <div :class="[ 'position-list', unfold ? 'show-p-list' : '' ]"   @click="closeUnfoldList">
        <worksList
          class="work-list-mask"
          ref="worksList1"
          :record-list="recordList"
          @getCurRecordId="getCurRecordId"
          @closeUnfoldList="closeUnfoldList">
        </worksList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useMain from '../../store/index'
import worksList from './worksList.vue'
import worksContent from './worksContent.vue'
import { IRecordField, IRecordType } from '../../types/index'

export default defineComponent({
  name: 'record',
  components: {
    worksList,
    worksContent
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useMain()
    const unfold = ref<boolean>(false)
    const worksList = ref<any>(null)
    const worksContent = ref<any>(null)
    const recordList = ref<Array<IRecordField>>([])
    const unfoldlist = (): void => {
      unfold.value = true
    }
    const closeUnfoldList = (): void => {
      unfold.value = false
    }
    const getRecordList = async () => {
      const res = await store.getRecordList()
      const resultList: any = []
      res.data.forEach((item: IRecordField) => {
        const cur = resultList.find((v: IRecordType) => v.type === item.tag)
        if (cur) {
          cur.children.push(item)
        } else {
          resultList.push({
            type: item.tag,
            children: [item]
          })
        }
      })
      recordList.value = resultList
    }
    // 当前记录ID
    const curRecordId = ref<number>()
    const getCurRecordId = (id: number) => {
      const query = {
        recordId: id
      }
      router.push({
        name: 'record',
        query,
      })
      curRecordId.value = id
    }
    onMounted(async () => {
      await getRecordList()
      if (route.query.recordId) {
        curRecordId.value = Number(route.query.recordId)
      } else {
        // 默认第一条
        getCurRecordId(recordList.value[0].children[0].id)
      }
    })
    return {
      unfold,
      worksList,
      worksContent,
      curRecordId,
      recordList,
      unfoldlist,
      closeUnfoldList,
      getCurRecordId
    }
  }
})
</script>

<style lang="scss" scoped>
.record {
  width: 100%;
  height: calc(100% - 50px);
  .record-head {
    height: 0px;
    overflow: hidden;
    width: 100%;
    padding: 0 5px;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      font-size: 20px;
    }
  }
  .record-content {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    .work-list {
      width: 200px;
    }
    .work-content {
      flex: 1;
      height: 100%;
      overflow: auto;
    }
    .position-list {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      background-color: cornsilk;
      transition: all 0.3s;
      .work-list-mask {
        background-color: #fff;
        width: 300px;
        box-shadow: 0 6px 24px 0 rgb(0 0 0 / 15%);
      }
    }
    .show-p-list {
      left: 0;
      opacity: 1;
    }
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
.record {
  .record-head {
    height: 30px;
  }
  .record-content {
    height: calc(100% - 30px);
    .work-list {
      display: none;
    }
  }
}
}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){
.record {
  .record-head {
    height: 30px;
  }
  .record-content {
    height: calc(100% - 30px);
    .work-list {
      display: none;
    }
  }
}
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