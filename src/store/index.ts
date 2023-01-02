import axios from '../axios/index'
import { defineStore } from 'pinia'
import { TLogin } from '../types/index'

export default defineStore('main', {
    state: () => ({
        userInfo: <any>{},
        islogin: false
    }),
    getters: {
        
    },
    actions: {
        setUserInfo (data: any, login: boolean) {
            this.userInfo = data
            this.islogin = login
        },
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
        login (params: TLogin) {
            return axios.post('v1/user/login', params).then(response => response.data)
        },
        async getUserInfo () {
            const res = await axios.get('v1/user/info').then(response => response.data)
            this.setUserInfo(res.data, true)
        },
        // lucky
        getUserPrizeList () {
            return axios.get('v1/lucky/prize/list').then(response => response.data)
        },
        getUserPrize () {
            return axios.get('v1/lucky/prizer').then(response => response.data)
        },
        updateUserPrize () {
            return axios.patch('v1/lucky/update/prizer').then(response => response.data)
        },


    }
})