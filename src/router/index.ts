import { createRouter, createWebHashHistory } from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
const Detail = () => import(/* webpackChunkName: "home" */ '../views/detail/index.vue')
const Funcs = () => import(/* webpackChunkName: "home" */ '../views/funcs/index.vue')
const Example = () => import(/* webpackChunkName: "example" */ '../views/example/index.vue')
const Admin = () => import(/* webpackChunkName: "admin" */ '../views/admin/index.vue')
const Tools = () => import(/* webpackChunkName: "admin" */ '../views/tools/index.vue')
const Login = () => import(/* webpackChunkName: "admin" */ '../components/login.vue')

const LolBackList = () => import(/* webpackChunkName: "lolBackList" */ '../views/tools/toolComponents/lolBackList.vue')
const FileUpload = () => import(/* webpackChunkName: "lolBackList" */ '../views/tools/toolComponents/fileUpload.vue')
const Lucky = () => import(/* webpackChunkName: "lolBackList" */ '../views/tools/toolComponents/lucky.vue')


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
      path: '/funcs',
      name: 'funcs',
      component: Funcs,
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
      children: [
        {
          path: 'lol-back-list',
          name: 'lolBackList',
          component: LolBackList,
          meta: { title: 'lol黑名单'}
        },
        {
          path: 'file-upload',
          name: 'fileUpload',
          component: FileUpload,
          meta: { title: '文件上传'}
        },
        {
          path: 'lucky',
          name: 'Lucky',
          component: Lucky,
          meta: { title: '福利抽奖'}
        },
      ],
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