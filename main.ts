import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap-icons/font/bootstrap-icons.css"
import { setupRouter } from "./routes";
import { setupPlugins } from "./Plugins";
import fsp from 'fs-extra'
const app = createApp(App)
console.log('fsp',fsp)
//* 设置路由
// setupRouter()

// //* 插件设置
// setupPlugins(app)

app.mount("#app").$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
}).then(r => console.log(r))

