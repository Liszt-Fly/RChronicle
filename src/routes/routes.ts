import {RouteRecordRaw} from "vue-router";
import Editor from "@/views/Editor.vue"
import Setting from "@/views/Setting.vue"
import Stream from "@/views/Stream.vue"
import Home from "@/views/Home.vue"
import Info from "@/components/Setting/Info.vue"
import Jotting from "@/views/Jotting.vue"
import Trash from "@/views/Trash.vue"
import Security from "@/views/Security.vue"
import TVditor from "@/views/TVditor.vue"
import Appearance from "@/components/Setting/Appearance.vue"
import Shortcut from "@/components/Setting/Shortcut.vue"
import General from "@/components/Setting/General.vue"
import WorkSpace from "@/components/WorkSpace/WorkSpace.vue"

export const routes: RouteRecordRaw[] = [
    // {path: '/workspace', redirect: {name: "Home"}},
    // {path: "/", name: "Home", component: Home},
    // {path: "/Editor", name: "EditorPage", component: TVditor},
    // {path: "/Editor/:note([\\s\\S]*)", name: "EditorContent", component: Editor},
    // {path: "/Stream", name: "Stream", component: Stream},
    // {path: "/Jotting", name: "Jotting", component: Jotting},
    // {path: "/Trash", name: "Trash", component: Trash},
    // {path: "/Security", name: "Security", component: Security},
    // {path: "/WorkSpace", name: "WorkSpace", component: WorkSpace},
    // {
    //     path: "/Setting", name: "Setting", component: Setting,
    //     children: [
    //         {path: 'Info', component: Info},
    //         {path: 'General', component: General},
    //         {path: 'Appearance', component: Appearance},
    //         {path: 'Shortcut', component: Shortcut}
    //     ],
    // },
]


