import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
Vue.use(Router)
export const asyncRouterMap = [
  { path:'/',
    redirect: '/first/index'
  },
  {
    path: '/',
    component: Layout,
    name: 'mainIndex',
    children: [
      {
        path: '/article/publish',
        component: () => import('@/views/publish/index.vue')
      },
      {
        path: '/article/list',
        component: () => import('@/views/content/index.vue')
      },
      {
        path: '/articleInfo/:id',
        name:'articleInfo',
        component: () =>import('@/views/articleInfo/index.vue'),
        props:true
      },

      {
        path: '/material/list',
        component: () => import('@/views/material/material.vue')
      },

    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register/index', // 用户注册管理
    component: () => import('@/views/register/index.vue')
  },
  { path: '/first/index', // App用户管理
    component: () => import('@/views/first/index.vue')
  },
  {
    path: '/my/modify',
    component: () => import('@/views/my/modify.vue')
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
]
var myRouter = new Router({
  routes: asyncRouterMap
})
export default myRouter
