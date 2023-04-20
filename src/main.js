import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from "./router/index.js";
import store from "~/store/index.js";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
import 'virtual:windi.css'
import  "~/permission"
import "nprogress/nprogress.css"

app.mount('#app')
