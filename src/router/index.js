import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Layout from '@/views/layout/'
import Home from '@/views/home/'
import Articles from '@/views/articles/'
import Publish from '@/views/publish/'
import Images from '@/views/images/'
import Comments from '@/views/comments/'
import Settings from '@/views/settings/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/articles',
        name: 'articles',
        component: Articles
      },
      {
        path: '/images',
        name: 'images',
        component: Images
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/comments',
        name: 'comments',
        component: Comments
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
