<template>
  <div class="home">
    <img class="home-img" src="../../assets/img/homebg.jpg" alt="">
    <div class="contanier">
      <div class="tag">
        <li :class="['tag-item', tagKey === tags.key ? 'active' : '']" v-for="tags in tagList" :key="tags.key" @click="changeTag(tags.key)">
          {{tags.name}}
        </li>
      </div>
      <div class="list">
        <card v-for="tags in tagList" :key="tags.key" :item="tags"></card>
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
      tagKey.value = key
      console.log(key)
    }
    return {
      tagKey,
      tagList,
      changeTag
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: calc(100% - 50px);
  .home-img {
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
</style>