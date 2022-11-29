import Vue from 'vue'
import Router from 'vue-router'
//import Layout from '@/views/layout/index.vue'
Vue.use(Router)
export const asyncRouterMap = [
  {
    path: '',
    redirect:'/first'
  },
  {
    path:'/first',
    component: () => import('@/views/first/index.vue'),
  },
  {
    path:'/register',
    name:'register',
    component: () => import('@/views/register/index.vue'),
  },
  {
    path:'/editor/:userName',
    name:'editor',
    component: () => import('@/views/editor/index.vue'),
    props:true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
  },
  {
    path: '/likelist',
    name: 'likelist',
    component: () => import('@/views/likelist/index.vue'),
  },
  {
    path: '/focuslist',
    name:'focuslist',
    component:() => import('@/views/focuslist/index.vue')
  },
  {
    path: '/histotylist',
    name: 'historylist',
    component:() => import('@/views/historylist/index.vue')
  },
  {
    path: '/focuslists/:authorName',
    name:'focuslists',
    component:() => import('@/views/focuslists/index.vue'),
    props: true
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children:[
      {
        path:'/home',
        name:'home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path:'/my',
        name:'my',
        component: () => import('@/views/my/index.vue'),
      }
    ]
  },
  {
    path: '/article/:articleId',
    name:'article',
    component: () => import('@/views/article/index.vue'),
    props:true
  },

]
var myRouter = new Router({
  routes: asyncRouterMap
})
export default myRouter
