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
            return axios.post('v1/upload/file', params).then(response => response.data)
        },
        getRecordList () {
            return axios.get('v1/record/list').then(response => response.data)
        },
        getRecordDetails (params: any) {
            return axios.get('v1/record/detail', { params }).then(response => response.data)
        },
        createRecord(params: any) {
            return axios.post('v1/record/create', params).then(response => response.data)
        },
        login () {
            return axios.post('v1/user/login').then(response => response.data)
        }
    }
})