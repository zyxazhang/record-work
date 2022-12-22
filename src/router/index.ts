import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
const Detail = () => import(/* webpackChunkName: "home" */ '../views/detail/index.vue')
const Record = () => import(/* webpackChunkName: "home" */ '../views/record/index.vue')
const Example = () => import(/* webpackChunkName: "example" */ '../views/example/index.vue')
const Admin = () => import(/* webpackChunkName: "admin" */ '../views/admin/index.vue')
const Tools = () => import(/* webpackChunkName: "admin" */ '../views/tools/index.vue')
const Login = () => import(/* webpackChunkName: "admin" */ '../components/login.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [],
      meta: {
        title: '首页'
      }
    },
    {
      path: '/',
      name: 'detail',
      component: Detail,
      children: [],
      meta: {
        title: '详情'
      }
    },
    {
      path: '/record',
      name: 'record',
      component: Record,
      children: [],
      meta: {
        title: '用例'
      }
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
      children: [],
      meta: {
        title: '用例'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [],
      meta: {
        title: '管理'
      }
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools,
      children: [],
      meta: {
        title: '工具'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      children: [],
      meta: {
        title: '登录'
      }
    }
  ]
})

// router.beforeEach((to) => {
//   document.title = to.meta.title
// })

export default router