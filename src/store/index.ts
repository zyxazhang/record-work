import axios from '../axios/index'
import { defineStore } from 'pinia'

export default defineStore('main', {
    state: () => ({
        testText: 'asdw'
    }),
    getters: {

    },
    actions: {
        upload (params: any) {
            return axios.post('/api/upload/file', params).then(response => response.data)
        },
        getRecordList () {
            return axios.get('api/article/get_article_list').then(response => response.data)
        },
        getRecordDetails (params: any) {
            return axios.get('api/article/get_article_detail', { params }).then(response => response.data)
        },
        createRecord(params: any) {
            return axios.post('api/article/create_article/', params).then(response => response.data)
        },
        login () {
            return axios.post('v1/user/login').then(response => response.data)
        }
    }
})