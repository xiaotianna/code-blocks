// 引入pinia
import pinia from '@/stores'
import { useUserStore } from '@/stores/user'
// 引入路由
import router from '@/router'
import { checkPermission } from '@/utils/permission'
import type { RouteLocationNormalized } from 'vue-router'
const user = useUserStore(pinia)

router.beforeEach((to, from, next) => {
  // matched：是父路由和子路由组成的数组
  const isLogin = to.matched.some((item) => item.meta.isLogin)
  if (user.token) routeCheck(to)
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

const myRoutes = [
  {
    path: '/page',
    name: 'page',
    component: () => import('@/pages/page.vue'),
    meta: {
      title: '我的页面',
      layout: 'home',
      isLogin: true
    }
  },
  {
    path: '/package',
    name: 'package',
    component: () => import('@/pages/package.vue'),
    meta: {
      title: '我的套件',
      layout: 'home',
      isLogin: true
    }
  }
]
const authRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/pages/user.vue'),
    meta: {
      title: '用户管理',
      layout: 'home',
      isLogin: true
    }
  }
]

const createRouteChecker = () => {
  let isAddedRoutes = false
  return async (to: RouteLocationNormalized) => {
    myRoutes.forEach((item) => {
      router.addRoute(item)
    })
    if (checkPermission(['admin'])) {
      authRoutes.forEach((item) => router.addRoute(item))
    }
    if (!isAddedRoutes) {
      isAddedRoutes = true
      await router.replace(to.fullPath)
    }
  }
}

const routeCheck = createRouteChecker()
