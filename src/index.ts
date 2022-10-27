import { createApp } from "vue";
import App from './App.vue';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import axios from './axios/index'
import router from './router'

const app = createApp(App);
app.config.globalProperties.$http = axios
app.use(router)
app.use(Antd).mount('#app');
