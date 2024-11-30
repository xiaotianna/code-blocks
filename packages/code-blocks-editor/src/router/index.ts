import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home.vue'),
      meta: {
        title: '项目介绍',
        layout: 'home',
        isLogin: false
      }
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('@/pages/page.vue'),
      meta: {
        title: '页面管理',
        layout: 'home',
        isLogin: true
      }
    },
    {
      path: '/package',
      name: 'package',
      component: () => import('@/pages/package.vue'),
      meta: {
        title: '套件管理',
        layout: 'home',
        isLogin: true
      }
    },
    {
      path: '/works-square',
      name: 'works-square',
      component: () => import('@/pages/works-square.vue'),
      meta: {
        title: '作品广场',
        layout: 'home',
        isLogin: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/user.vue'),
      meta: {
        title: '用户管理',
        layout: 'home',
        isLogin: true
      }
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/pages/editor.vue'),
      meta: {
        title: '在线编辑',
        isLogin: true
      }
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('@/pages/preview.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/pages/404.vue'),
      meta: {
        title: '404页面不存在'
      }
    }
  ]
})

export default router
