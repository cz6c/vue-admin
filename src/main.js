import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入全局css
import '@/assets/css/normalize.css'

//引入element 组件
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')