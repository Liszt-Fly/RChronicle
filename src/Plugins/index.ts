
import {App} from "vue";
import {setupElementPlus} from "./ElementPlus";


export const setupPlugins=(app:App)=>{
        //* 设置ElementPlus
        setupElementPlus(app)
}