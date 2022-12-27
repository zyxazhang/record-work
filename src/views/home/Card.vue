<template>
    <div class="card">
        <!-- <img v-if="" :src="" alt="" class="img" @click="goToDetail"> -->
        <img src="../../assets/img/siderbg.jpg" alt="" class="img" @click.stop="goToDetail(item.record_id)">
        <div class="content">
            <div class="left">
                <div class="date">
                    <p class="mouth">{{ monthMaps[item.create_time.split('-')[1][1]] }}</p>
                    <p class="day">{{ item.create_time.split('-')[2].split('T')[0] }}</p>
                </div>
                <div class="favorite">
                    <p class="icon record-work icon-icon"></p>
                    <p class="nums">{{ item.star_count }}</p>
                </div>
            </div>
            <div class="right">
                <div class="title">{{ item.name }}</div>
                <div class="creator">{{ item.create_by }}</div>
                <div class="desc">{{ item.desc || '这儿是空的哦 0.o' }}</div>
                <div class="link" @click.stop="goToDetail(item.record_id)">-> Read more</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { monthMap } from '../../constans/index'
export default defineComponent({
    name: 'Card',
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    setup(props) {
        const monthMaps = ref<any>(monthMap)
        const router = useRouter()
        // console.log(props)
        // const info = r
        const goToDetail = (id: number) => {
            router.push({
                name: 'detail',
                query: {
                    r_id: id,
                    from: 'home'
                }
            })
        }
        return {
            monthMaps,
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