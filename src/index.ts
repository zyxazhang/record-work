import { createApp } from "vue";
import App from './App.vue';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import axios from './axios/index'
import router from './router'
import { createPinia } from 'pinia'
import VueLuckyCanvas from '@lucky-canvas/vue'

import components from './components/custom'


const app = createApp(App);
app.config.globalProperties.$http = axios
app.use(router)
app.use(VueLuckyCanvas)
app.use(createPinia())
app.use(components)
app.use(Antd).mount('#app');
