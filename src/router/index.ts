import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')

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
    }
  ]
})

// router.beforeEach((to) => {
//   document.title = to.meta.title
// })

export default router