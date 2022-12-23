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
        <div v-else class="list">
          <card v-for="tags in tagList" :key="tags.key" :item="tags"></card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Card from './Card.vue'
import welcome from '../../components/welcome.vue'
const tags = [
  { name: 'All', key: 'all' },
  { name: 'Vue', key: 'vue' },
  { name: 'Js', key: 'js' },
  { name: 'Html', key: 'html' },
  { name: 'Css', key: 'css' }
]
export default defineComponent({
  name: 'home',
  components: {
    welcome,
    Card
  },
  setup() {
    // 切换tag
    const tagKey = ref<string>('all')
    const tagList = reactive<any>(tags)
    const changeTag = (key: string): void => {
      tagLoading.value = true
      tagKey.value = key
      console.log(key)
      setTimeout(() => {
        tagLoading.value = false
      }, 1000);
    }

    // loading状态
    const tagLoading = ref<boolean>(false)
    return {
      tagKey,
      tagList,
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
    min-height: calc(100% - 440px);

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