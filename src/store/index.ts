import axios from '../axios/index'
import { defineStore } from 'pinia'

export default defineStore('main', {
    state: () => ({
        testText: 'asdw'
    }),
    getters: {

    },
    actions: {
        getRecordList () {
            return axios.get('api/article/get_article_list').then(response => response.data)
        },
        getRecordDetails (params: any) {
            return axios.get('api/article/get_article_detail', { params }).then(response => response.data)
        }
    }
})