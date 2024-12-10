import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
    },
  },

  // 示例
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      isKeepAlive: true,
    },
  },
  {
    path: '/gameDetails',
    name: 'gameDetails',
    component: () => import('@/views/details/index.vue'),
    meta: {
      title: '详情',
      isKeepAlive: true,
    },
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/game/index.vue'),
    meta: {
      title: '游戏',
      isKeepAlive: true,
    },
  },
  {
    path: '/cookie',
    name: 'cookie',
    component: () => import('@/views/policy/cookie.vue'),
    meta: {
      title: 'cookie',
      isKeepAlive: true,
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/policy/privacy.vue'),
    meta: {
      title: 'privacy',
      isKeepAlive: true,
    },
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router
