<template>
  <div id="locky">
    <LuckyGrid ref="myLucky" width="400px" height="400px" rows="3" cols="3" style="margin: 0 auto;" :prizes="prizes"
      :blocks="blocks" :buttons="buttons" @start="startCallback" @end="endCallback" />
    <div class="count">你共拥有{{ count }}次机会</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
export default defineComponent({
  name: 'locky',
  setup() {
    const prizeImg3 = [
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      },
      {
        src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d482c51cd47345cf94483218d5f6fc39~tplv-k3u1fbpfcp-no-mark:240:240:240:240.awebp?',
        width: '50%',
        top: '15%'
      }
    ]

    const myLucky = ref<HTMLElement | null>(null)
    const config = reactive<any>({
      blocks: [
        { padding: '10px', background: '#869cfa' },
        { padding: '10px', background: '#e9e8fe' },
      ],
      prizes: [
        { x: 0, y: 0, range: 1, fonts: [{ text: '谢谢参与', top: '70%' }], imgs: [prizeImg3[0]], background: '#fff' },
        { x: 1, y: 0, range: 1, fonts: [{ text: '小米手环', top: '70%' }], imgs: [prizeImg3[1]], background: '#fff' },
        { x: 2, y: 0, range: 1, fonts: [{ text: '苹果13', top: '70%' }], imgs: [prizeImg3[2]], background: '#fff' },
        { x: 2, y: 1, range: 1, fonts: [{ text: '优惠券50', top: '70%' }], imgs: [prizeImg3[3]], background: '#fff' },
        { x: 2, y: 2, range: 1, fonts: [{ text: '优惠券100', top: '70%' }], imgs: [prizeImg3[4]], background: '#fff' },
        { x: 1, y: 2, range: 1, fonts: [{ text: '迷你小冰箱', top: '70%' }], imgs: [prizeImg3[5]], background: '#fff' },
        { x: 0, y: 2, range: 1, fonts: [{ text: '腾讯会员', top: '70%' }], imgs: [prizeImg3[6]], background: '#fff' },
        { x: 0, y: 1, range: 1, fonts: [{ text: '优酷会员', top: '70%' }], imgs: [prizeImg3[7]], background: '#fff' },

      ],
      buttons: [
        {
          x: 1, y: 1,
          background: '#9c9dd8',
          fonts: [{ text: '抽奖', top: '40%' }],
        },
      ],
    })
    const count = ref<number>(5)
    const startCallback = () => {
      myLucky.value.play()
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        // const index = 0
        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop()
      }, 3000)
    }
    const endCallback = (prize: any) => {
      console.log(prize.fonts[0].text)
    }
    return {
      count,
      myLucky,
      ...config,
      startCallback,
      endCallback
    }
  }
})
</script>

<style lang="scss" scoped>
#locky {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>