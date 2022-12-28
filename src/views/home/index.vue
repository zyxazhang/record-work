<template>
  <div class="home">
    <p class="homt-text">I am a sloow walker, but I never walk backwards.</p>
    <img class="home-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <div class="tag">
        <li :class="['tag-item', tagKey === tags.key ? 'active' : '']" v-for="tags in tagList" :key="tags.key"
          @click="changeTag(tags.key)">
          {{ tags.name }}
        </li>
      </div>
      <div class="content">
        <a-spin v-if="tagLoading" class="loading" size="large" />
        <no-data v-else-if="typelist.displayList.length === 0"></no-data>
        <div v-else class="list">
            <card v-for="list in typelist.displayList" :key="list.key" :item="list"></card>
        </div>
      </div>
    </div>
    <footerVue></footerVue>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import Card from './Card.vue'
import welcome from '../../components/welcome.vue'
import useMain from '../../store/index'
import footerVue from '../../layout/footer.vue'
import NoData from '../../components/noData.vue'
const tags = [
  { name: 'All', key: 'all' },
  { name: 'Vue', key: 'vue' },
  { name: 'Js', key: 'js' },
  { name: 'Html', key: 'html' },
  { name: 'Css', key: 'css' },
  { name: 'Python', key: 'py' }
]
export default defineComponent({
  name: 'home',
  components: {
    welcome,
    Card,
    footerVue,
    NoData
  },
  setup() {
    const store = useMain()
    // 切换tag
    const tagKey = ref<string>('all')
    const tagList = reactive<any>(tags)
    const changeTag = (key: string): void => {
      tagLoading.value = true
      tagKey.value = key
      typelist.displayList = typelist[key]
      setTimeout(() => {
        tagLoading.value = false
      }, 200);
    }
    // loading状态
    const tagLoading = ref<boolean>(false)
    // 分类列表
    const typelist = reactive<any>({
      displayList: [],all: [], vue: [], html: [], js: [], css: [], py: []
    })
    const getRecordList = async () => {
      const res = await store.getRecordList()
      typelist.all = res.data
      res.data.forEach((item: any) => {
        switch (item.tag) {
          case 'vue':
            typelist.vue.push(item)
            break;
          case 'js':
            typelist.js.push(item)
            break;
          case 'html':
            typelist.html.push(item)
            break;
          case 'css':
            typelist.css.push(item)
            break;
          case 'py':
            typelist.py.push(item)
            break;
          default:
            break;
        }
      });

    }
    onMounted(async () => {
      await getRecordList()
      changeTag(tagKey.value)
    })
    return {
      tagKey,
      tagList,
      typelist,
      changeTag,
      tagLoading
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  overflow: auto;

  .homt-text {
    width: 100%;
    height: 20px;
    font-size: 20px;
    position: absolute;
    top: 100px;
    z-index: 101;
    color: #fff;
    text-align: center;
    color: transparent;
    font-size: 1.5em;
    -webkit-text-stroke: 1px #fff;
    font-weight: bold;
  }

  .home-img {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 320px;
    object-fit: cover;
  }

  .contanier {
    width: 1280px;
    margin: 0 auto;
    min-height: calc(100% - 360px);

    // height: 60px;
    .tag {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;

      .tag-item {
        height: 30px;
        line-height: 30px;
        padding: 0 30px;
        margin: 0 20px;
        border-radius: 15px;
        background-color: #eee;
        color: rgb(135, 135, 135);
        font-weight: bold;
        cursor: pointer;

        &:hover {
          color: #fff;
          background-color: rgb(195, 196, 196);
        }
      }

      .active {
        color: black;
      }
    }

    .content {
      width: 100%;
      height: 100%;

      .loading {
        width: 100%;
        min-height: 200px;
        line-height: 200px;
      }

      .list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 500px);
        grid-auto-rows: auto;
        justify-content: space-evenly;
        grid-gap: 30px;
      }
    }
  }
}
</style>