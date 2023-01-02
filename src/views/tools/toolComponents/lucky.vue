<template>
  <div class="lucky">
    <div class="locky-content">
      <LuckyGrid ref="myLucky" width="400px" height="400px" rows="3" cols="3" style="margin: 0 auto; border-radius: 40px;" :prizes="prizes"
        :blocks="blocks" :buttons="buttons" @start="startCallback" @end="endCallback" />
    </div>
    <div class="user-lucky-info">

      <div class="count" @click="startCallback">
        抽奖剩余<span class="text">{{ userPrizeInfo.cur.count }}</span>次
      </div>
    </div>
    <div class="all-lucky-info">
      <div class="prize">
        <li style="border: none">已获得</li>
        <li v-for="(prize, i) in userPrizeInfo.cur.display" :key="i">
          {{ prize }}
        </li>
      </div>
      <div class="other">其他用户获奖情况</div>
      <a-carousel class="all-lucky" dot-position="top" autoplay :dots="false">
        <li class="lucky-item" v-for="(prize, i) in userPrizeInfo.list" :key="i">
          <span>{{ prize.uname }}</span>
          <span>-----</span>
          <span>{{ prize.display.toString()}} -----</span>
        </li>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { number } from 'vue-types'
import useMain from '../../../store/index'
export default defineComponent({
  name: 'locky',
  setup() {
    const store = useMain()
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
        { padding: '10px', background: '#fff' },
        { padding: '10px', background: '#888ea6' },
      ],
      prizes: [
        { id: 1, x: 0, y: 0, range: 1, fonts: [{ text: '谢谢参与', top: '70%' }], imgs: [prizeImg3[0]], background: '#fff' },
        { id: 2, x: 1, y: 0, range: 1, fonts: [{ text: '小米手环', top: '70%' }], imgs: [prizeImg3[1]], background: '#fff' },
        { id: 3, x: 2, y: 0, range: 1, fonts: [{ text: '苹果13', top: '70%' }], imgs: [prizeImg3[2]], background: '#fff' },
        { id: 4, x: 2, y: 1, range: 1, fonts: [{ text: '优惠券50', top: '70%' }], imgs: [prizeImg3[3]], background: '#fff' },
        { id: 5, x: 2, y: 2, range: 1, fonts: [{ text: '优惠券100', top: '70%' }], imgs: [prizeImg3[4]], background: '#fff' },
        { id: 6, x: 1, y: 2, range: 1, fonts: [{ text: '迷你小冰箱', top: '70%' }], imgs: [prizeImg3[5]], background: '#fff' },
        { id: 7, x: 0, y: 2, range: 1, fonts: [{ text: '腾讯会员', top: '70%' }], imgs: [prizeImg3[6]], background: '#fff' },
        { id: 8, x: 0, y: 1, range: 1, fonts: [{ text: '优酷会员', top: '70%' }], imgs: [prizeImg3[7]], background: '#fff' },

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
      if (userPrizeInfo.cur.count === 0) {
        message.info('抽奖次数已用完！！')
        return
      }
      userPrizeInfo.cur.count --
      myLucky.value.play()
      setTimeout(async () => {
        const res = await store.updateUserPrize()
        const curPrize = config.prizes.findIndex((i: any) => i.id === Number(res.data.prize))
        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(curPrize)
      }, 3000)
    }
    const endCallback = (prize: any) => {
      init()
    }
    const userPrizeInfo = reactive<any>({
      cur: {},
      list: {}
    })
    const getUserPrize = async (): Promise<any> => {
      const res = await store.getUserPrize()
      userPrizeInfo.cur = res.data
      userPrizeInfo.cur.display = []
      userPrizeInfo.cur.prize.split(',').forEach((prize: number | string) => {
        if (prize) {
          const curPrize = config.prizes.find((i: any) => i.id === Number(prize))
          userPrizeInfo.cur.display.push(curPrize.fonts[0].text)
        }
      })
    }
    const getUserPrizeList = async (): Promise<any> => {
      const res = await store.getUserPrizeList()
      userPrizeInfo.list = res.data
      userPrizeInfo.list.forEach((item: any) => {
        item.display = []
        item.prize.split(',').forEach((prize: number | string) => {
          if (prize) {
            const curPrize = config.prizes.find((i: any) => i.id === Number(prize))
            item.display.push(curPrize.fonts[0].text)
          }
        })
      })
    }
    const init = () => {
      getUserPrize()
      getUserPrizeList()
    }

    onMounted(() => {
      init()
    })
    return {
      count,
      myLucky,
      ...config,
      userPrizeInfo,
      startCallback,
      endCallback
    }
  }
})
</script>

<style lang="scss" scoped>
.lucky {
  width: 100%;
  height: 100%;
  display: flex;

  // text-align: center;
  .user-lucky-info {
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .count {
      width: 200px;
      height: 50px;
      border-radius: 25px;
      background-color: #888ea6;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      font-weight: bold;
      vertical-align: baseline;
      cursor: pointer;

      .text {
        font-size: 30px;
        font-weight: bold;
        padding: 0 10px;
        line-height: 30px;
        vertical-align: text-bottom;
        color: #fff;
      }
    }

  }

  .all-lucky-info {
    width: 400px;
    height: 378px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .prize {
      width: 100%;
      // height: 50px;
      border: 8px solid #888ea6;
      margin-bottom: 20px;
      border-radius: 4px;

      li {
        width: 100%;
        height: 30px;
        line-height: 22px;
        text-align: center;
        background-color: #888ea6;
        color: #fff;
        border: 4px solid #fff;
      }
    }

    .other {
      width: 150px;
      height: 20px;
      background-color: #888ea6;
      line-height: 26px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .all-lucky {
      width: 400px;
      height: 40px;
      border: 8px solid #888ea6;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      .lucky-item {
        height: 40px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>