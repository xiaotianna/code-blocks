import Vue from 'vue'
import App from './App.vue'
import CodeBlockUI from '@code-blocks/ui/vue2'

Vue.config.productionTip = false

import '@code-blocks/ui/vue2/style'

Vue.use(CodeBlockUI, { platform: 'user' })

const app = new Vue({
  render: (h) => h(App)
})

app.$mount('#app')
