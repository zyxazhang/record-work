<template>
  <div class="detail">
    <img class="img" src="../../assets/img/siderbg.jpg" alt="">
    <div class="contanier">
      <div class="d-content">
        <a-anchor>
          <div class="left">
            <div class="l-opear">
              <div class="go-back">
                <i class="goback-icon record-work icon-fanhuidingbu" @click="goToBack"></i>
              </div>
              <div class="date">
                <p class="mouth">{{detail.date.mouth}}</p>
                <p class="day">{{detail.date.day}}</p>
              </div>
              <div class="favorite">
                <p class="icon record-work icon-icon"></p>
                <p class="nums">156</p>
              </div>
            </div>
            <div class="l-share">
              <div class="share-icon">f</div>
              <div class="share-icon">s</div>
              <div class="share-icon">as</div>
            </div>
          </div>
        </a-anchor>
        <div class="right">
          <a-anchor id="header" @change="changeAnchor">
            <div herf class="title">{{detail.title}}</div>
          </a-anchor>
          <div class="content">
            <editor type="view" :content="detail.content"></editor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import editor from '../../components/editor.vue'
import useMain from '../../store/index'
import { monthMap } from '../../constans/index'
import { IrecordDate } from '../../types/index'

export default defineComponent({
  name: 'Detail',
  components: {
    editor
  },
  setup () {
    const store = useMain()
    const route = useRoute()
    const router = useRouter()
    const detail = reactive<IrecordDate>({
      title: '',
      content: '',
      date: {
        mouth: '',
        day: ''
      },
      favorite: {
        is: true,
        nums: 0
      }
    })
    const changeAnchor = (currentActiveLink: string): void => {
      console.log(currentActiveLink)
    }

    const getRecordDetails = (): void => {
      const id = route.query.r_id
      store.getRecordDetails({ id }).then(res => {
        const { name, content, create_time } = res.data
        detail.title = name
        detail.content = content
        create_time.split(' ')[0].split('-')[1]
        detail.date.mouth = monthMap[create_time.split(' ')[0].split('-')[1]]
        detail.date.day = create_time.split(' ')[0].split('-')[2]
      }).finally(() => {
      })
    }

    const goToBack = (): void => {
      router.back()
    }
    onMounted(() => {
      getRecordDetails()
    })
    return {
      changeAnchor,
      detail,
      goToBack
    }
  }
})
</script>
<style>
.ant-anchor-ink {
  display: none;
}

</style>
<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: auto;
  .img {
    width: 100%;
    height: 320px;
    object-fit: cover;
  }

  .contanier {
    width: 100%;
    height: 100%;
    // overflow: auto;
    .d-content {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      .left {
        width: 160px;
        height: 200px;
        display: flex;
  
        .l-opear {
          width: 100px;
          height: 100%;
          border-right: 2px solid #eee;
          padding: 0 10px;
          text-align: center;
          font-weight: bold;
          .go-back {
            height: 60px;
            width: 100%;
            border-bottom: 2px solid #eee;
            .goback-icon {
              font-size: 40px;
              color: #c9d1d5;
              cursor: pointer;
            }
          }
          .date {
            height: 60px;
            width: 100%;
            border-bottom: 2px solid #eee;
            color: #c9d1d5;
  
            .mouth {
              margin: 0;
              font-size: 16px;
              line-height: 20px;
            }
  
            .day {
              margin: 0;
              font-size: 20px;
              line-height: 30px;
            }
          }
  
          .favorite {
            height: 60px;
            width: 100%;
            color: #c9d1d5;
            margin-top: 10px;
  
            .icon {
              margin: 0;
              font-size: 16px;
              line-height: 20px;
              cursor: pointer;
            }
  
            .nums {
              margin: 0;
              font-size: 20px;
              line-height: 30px;
            }
          }
        }
        .l-share {
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 10px 0;
          .share-icon {
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: #c9d1d5;
            color: #fff;
            font-weight: bold;
            font-size: 20px;
            border-radius: 50%;
            
          }
        }
      }
  
      .right {
        width: 1120px;
        overflow: hidden;
        .title {
          height: 100px;
          width: 100%;
          line-height: 60px;
          padding: 20px;
          font-size: 24px;
          font-weight: bold;
          background-color: #fff;
        }
        .content {
          width: 100%;
          padding: 0 20px;
        }
      }
    }

  }
}
</style>