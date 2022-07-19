//* 路由文件配置

import {createRouter, createWebHistory} from "vue-router";
import {routes} from "./routes";
import {getStayTime} from "../Helper";

const router=createRouter({
    linkActiveClass:"active",
    history:createWebHistory(),
    routes

})



export function setupRouter(){
    router.beforeEach((to,from,next)=>{
        getStayTime(to,from,next)
    })
    return router
}
export default  router