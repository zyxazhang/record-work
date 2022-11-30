import { message } from 'ant-design-vue';
import axios from 'axios'
import cookie from 'cookie'

// axios.defaults.baseURL = 'http://127.0.0.1:80' // 远程地址
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers = {
        authorization: cookie.parse(document.cookie).token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.result && response.status === 200) {
        message.success(response.data.message)
    } else if (!response.data.result && response.status === 200) {
        message.error(response.data.message)
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
        message.error('请先登录')
    }
    return Promise.reject(error);
});


export default axios