import Vue from 'vue'
import Router from 'vue-router'
import Jobs from './views/Jobs.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: Jobs
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/recover',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'login',
      component: Login
    }
  ]
})
