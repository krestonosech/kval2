import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthPage.vue')
  },
  {
    path: '/main',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogsPage.vue')
  },
  {
    path: '/create',
    component: () => import(/* webpackChunkName: "about" */ '../components/CreateBlog.vue'),
    props: (route) => ({
      id: route.query.id,
      title: route.query.title,
      text: route.query.text
    })
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
