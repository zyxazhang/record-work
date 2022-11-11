<template>
  <div class="home">
    <div class="home-head">
      <i class="record-work icon-caidan" @click="unfoldlist"></i>
      <i class="record-work icon-fanhuidingbu"></i>
    </div>
    <div class="home-content">
      <worksList
        ref="worksList"
        :class="[ unfold ? 'list-unfold' : 'list' ]"
        :record-list="recordList"
        @getCurRecordId="getCurRecordId"
        @closeUnfoldList="closeUnfoldList">
      </worksList>
      <worksContent
        ref="worksContent"
        :class="[ unfold ? 'content-unfold' : 'content' ]"
        :unfold="unfold"
        :cur-record-id="curRecordId"
        @click="closeUnfoldList">
      </worksContent>
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
  name: 'home',
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
        name: 'home',
        query,
      })
      curRecordId.value = id
    }
    onMounted(() => {
      if (route.query.recordId) {
        curRecordId.value = Number(route.query.recordId)
      }
      getRecordList()
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
.home {
  width: 100%;
  height: calc(100% - 50px);
  .home-head {
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
  .home-content {
    width: 100%;
    height: 100%;
    display: flex;
    .list-unfold {
      width: 200px;
    }
    .content-unfold {
      background: #333333;
      opacity: 0.1;
    }
  }
}
// 超小屏幕
@media screen and (max-width: 575px){
.home {
  .home-head {
    height: 30px;
  }
  .home-content {
    height: calc(100% - 30px);
    .list {
      width: 0;
    }
  }
}
}
// 小屏幕
@media screen and (min-width: 576px) and (max-width: 767px){
.home {
  .home-head {
    height: 30px;
  }
  .home-content {
    height: calc(100% - 30px);
    .list {
      width: 0;
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