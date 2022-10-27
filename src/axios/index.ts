import axios from 'axios'
import cookie from 'cookie'

// axios.defaults.baseURL = 'http://114/'
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
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default axios