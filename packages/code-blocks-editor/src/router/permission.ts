// 引入pinia
import pinia from '@/stores'
import { useUserStore } from '@/stores/user'
// 引入路由
import router from '@/router'
const user = useUserStore(pinia)

router.beforeEach((to, from, next) => {
  // matched：是父路由和子路由组成的数组
  const isLogin = to.matched.some((item) => item.meta.isLogin)
  if (isLogin) {
    const token = user.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
