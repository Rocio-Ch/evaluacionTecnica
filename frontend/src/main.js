
import { registerPlugins } from '@/plugins'
import { createApp } from 'vue'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import App from './App.vue'
import router from './router'
import './index.css'

const toastOptions = {
    timeout: 2500,
    closeButton: false,
}

const app = createApp(App)

registerPlugins(app)
app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')
