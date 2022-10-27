import { createApp } from "vue";
import App from './App.vue';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import axios from './axios/index'

const app = createApp(App);
app.config.globalProperties.$http = axios

app.use(Antd).mount('#app');
