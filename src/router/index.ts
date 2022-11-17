import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
const Record = () => import(/* webpackChunkName: "home" */ '../views/record/index.vue')
const Example = () => import(/* webpackChunkName: "example" */ '../views/example/index.vue')
const Admin = () => import(/* webpackChunkName: "admin" */ '../views/admin/index.vue')

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
    }
  ]
})

// router.beforeEach((to) => {
//   document.title = to.meta.title
// })

export default router