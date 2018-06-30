import Vue from 'vue'
import Router from 'vue-router'
import Jobs from './views/Jobs.vue'
import Hackathons from './views/Hackathons'
import Excursions from './views/Excursions'
import Login from './views/Login.vue'
import PNF from './views/PNF.vue'
import Profile from './views/Profile.vue'

import store from './store';

Vue.use(Router)

const isAuth = function(to, from, next){
  console.log(store.state.auth.logTime, store.state.auth.expiresIn)
  if(store.state.auth.authToken){
    if((new Date()).getTime() < (store.state.auth.logTime + store.state.auth.expiresIn)){
      next()
      return
    }else{
      store.commit('refreshToken', to)
      return
    }
  }
  next('/login')
}

const isNotAuth = function(to, from, next){
  if(store.state.auth.authToken){
    if((new Date()).getTime() < (store.state.auth.logTime + store.state.auth.expiresIn)){
      next('/')
      return
    }else{
      store.commit('refreshToken', to)
      return
    }
  }
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: Jobs,
      beforeEnter: isAuth
    },
    {
      path: '/hackathons',
      name: 'hackathons',
      component: Hackathons,
      beforeEnter: isAuth
    },
    {
      path: '/excursions',
      name: 'excursions',
      component: Excursions,
      beforeEnter: isAuth
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: isNotAuth
    },
    {
      path: '/recover',
      name: 'login',
      component: Login,
      beforeEnter: isNotAuth
    },
    {
      path: '/register',
      name: 'login',
      component: Login,
      beforeEnter: isNotAuth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: isAuth
    },
    {
      path: '**',
      name: '404',
      component: PNF
    },
  ]
})
