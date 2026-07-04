import { createApp } from 'vue'
import App from './App.vue'

// 注释这个请在index.html中引入<link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css"rel="stylesheet">
import '@mdi/font/css/materialdesignicons.css'

// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'mdui/mdui.css'
import 'mdui'
import router from './router'
import store from './store'
import './vendor/mdui2-global.less'
import './vendor/skeleton.less'
import i18n from './i18n'
import axios from 'axios'
import { createPinia } from 'pinia'
// import { Fancybox } from '@fancyapps/ui'
// import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { Fancybox } from '@fancyapps/ui'

import MdiIcon from '@/components/mdi-icon/index.vue'
const app = createApp(App)
app.use(i18n)
app.use(store)
app.use(router)
app.use(createPinia())
app.config.globalProperties.$axios = axios
app.config.globalProperties.$Fancybox = Fancybox
// app.config.globalProperties.$Fancybox = Fancybox
// app.component('MdiIcon', MdiIcon)
app.component('mdi-icon', MdiIcon)
app.mount('#app')
