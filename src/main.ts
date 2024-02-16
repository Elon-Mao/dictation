import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'

import 'vant/lib/index.css'

Locale.use('en-US', enUS)

const app = createApp(App)

app.use(router).use(createPinia()).use(ElementPlus)

app.mount('#app')
