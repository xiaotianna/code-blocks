import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CodeBlockUI from '@code-blocks/ui'
import '@code-blocks/ui/style'

const app = createApp(App)

app.use(router)
app.use<{ platform: 'editor' | 'user' }>(CodeBlockUI, { platform: 'user' })

app.mount('#app')
