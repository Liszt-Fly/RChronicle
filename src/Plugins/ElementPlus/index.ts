import ElementPlus from "element-plus"
import {App} from "vue";
import {createI18n} from "_vue-i18n@9.1.10@vue-i18n";
import {messages} from "./languages";

export function setupElementPlus(app:App){
    app.use(ElementPlus)
    //* international
    const i18n = createI18n({
        locale: 'cn',
        fallbackLocale: 'en',
        messages,
    })
    app.use(i18n)
}