import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
// component
import { Icon } from '@iconify/vue'
import DraggableComponent from 'vuedraggable'
import CodeBlockUI from '@code-blocks/ui'
import { QuillEditor } from '@vueup/vue-quill'
// css
import '@/assets/styles/main.scss'
import '@/style.css'
import '@code-blocks/ui/style'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'element-plus/dist/index.css'
// base
import { baseUrl } from '@/common/baseUrl'
import { getUserInfo } from '@/utils/storage'
import { useUserStore } from '@/stores/user'
// 引入路由守卫
import '@/router/permission'

const app = createApp(App)

const u_info = getUserInfo()
if (u_info) {
  const user = useUserStore(pinia)
  user.setInfo(u_info)
}

app.config.globalProperties.$baseUrl = baseUrl

app.component('Icon', Icon)
app.component('draggable', DraggableComponent)
app.component('QuillEditor', QuillEditor)

app.use(router)
app.use(pinia)
// 使用use，需要自己上绑定install方法，需要去@code-blocks/ui添加
// app.use可以传递第二个参数，提供给ui组件库，platform用来判断是编辑器还是用户端
app.use<{ platform: 'editor' | 'user' }>(CodeBlockUI, { platform: 'editor' })

app.mount('#app')
