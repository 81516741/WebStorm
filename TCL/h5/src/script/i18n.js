import Vue from 'vue'
import VueI18n from 'vue-i18n'
import LangZHCN from '../assets/lang/zh-CN.js'
import LangEN from '../assets/lang/en.js'

Vue.use(VueI18n);
let lang = (navigator.languages && navigator.languages[0]) || navigator.language;
let setLanguage = localStorage.getItem('locale') || lang.toLowerCase();//使用localStorage是为了用户手动切换语言
switch(setLanguage){
    case 'zh-cn':
    case 'zh':
        setLanguage = 'zh-cn'
        break;
    default:
        setLanguage = 'en';
}

console.log("i18n.js--当前小T音箱系统默认："+ setLanguage);

const i18n = new VueI18n({
    locale: setLanguage,
    messages:{
        'zh-cn': LangZHCN,
        'en': LangEN
    }
})
export default i18n;