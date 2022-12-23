import { notification } from 'ant-design-vue';
import axios from 'axios'
import cookie from 'cookie'

axios.defaults.baseURL = 'http://114.132.201.39/'
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
        notification.success({
            message: response.data.message,
            duration: 1
        })
    } else if (!response.data.result && response.status === 200) {
        notification.error({
            message: response.data.message,
            duration: 1
        })
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
        notification.error({
            message: '请先登录',
            description: error.response.statusText,
            duration: 4
        })
    } else if (error.toJSON() && error.toJSON().message === 'Network Error') {
        notification.error({
            message: '后端接口异常',
            description: error.response.data.message,
            duration: 2
        })
    }
    return Promise.reject(error);
});


export default axios