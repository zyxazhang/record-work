import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
const Example = () => import(/* webpackChunkName: "home" */ '../views/example/index.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [],
      meta: {
        title: ''
      }
    },
    {
      path: '/example',
      name: 'example',
      component: Example,
      children: [],
      meta: {
        title: ''
      }
    }
  ]
})

// router.beforeEach((to) => {
//   document.title = to.meta.title
// })

export default router