<template>
  <div class="card">
    <!-- <img v-if="" :src="" alt="" class="img" @click="goToDetail"> -->
    <img src="../../assets/img/siderbg.jpg" alt="" class="img" @click="goToDetail">
    <div class="content">
        <div class="left">
            <div class="date">
                <p class="mouth">FEB</p>
                <p class="day">08</p>
            </div>
            <div class="favorite">
                <p class="icon record-work icon-icon"></p>
                <p class="nums">156</p>
            </div>
        </div>
        <div class="right">
            <div class="title">这边的呼叫文革的改革的大吴大苏打吴大维阿文染发我是大鳄哇让哥窟尬舞</div>
            <div class="creator">admin</div>
            <div class="desc">fgwaekjhzd uqagweigwja uqgawuegqwr</div>
            <div class="link" @click="goToDetail">-> Read more</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'Card',
    props: {
        item: {
            type: Object,
            default: {}
        }
    },                                                                                                                                                                                                                                
    setup(props) {
        const router = useRouter()
        // console.log(props)
        // const info = r
        const goToDetail = () => {
            router.push({
                name: 'detail',
                query: {
                    r_id: 55,
                    from: 'home'
                }
            })
        }
        return {
            goToDetail
        }
    }
})
</script>

<style lang="scss" scoped>
.card {
    width: 500px;
    height: 400px;
    // background-color: skyblue;
    display: flex;
    flex-direction: column;
    &:hover {
        box-shadow: 0 2px 10px 0 #eee;
    }
    .img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        cursor: pointer;
    }
    .content {
        width: 100%;
        height: 200px;
        padding: 20px 0;
        display: flex;
        justify-content: flex-start;
        .left {
            width: 100px;
            height: 100%;
            border-right: 2px solid #eee;
            padding: 0 10px;
            text-align: center;
            font-weight: bold;
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
        .right {
            width: 400px;
            height: 100%;
            display: flex;
            padding: 0 10px;
            flex-direction: column;
            justify-content: space-between;
            .title {
                font-size: 20px;
                font-weight: bold;
                color: rgb(92, 91, 91);
            }
            .creator {
                font-size: 10px;
                color: rgb(158, 158, 158);
            }
            .desc {
                font-size: 14px;
                color: rgb(118, 119, 119);
            }
            .link {
                font-weight: bold;
                cursor: pointer;
            }
        }
    }
}
</style>