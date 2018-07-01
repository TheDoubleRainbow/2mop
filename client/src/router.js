import Vue from 'vue'
import Router from 'vue-router'
import Jobs from './views/Jobs.vue'
import Hackathons from './views/Hackathons'
import Excursions from './views/Excursions'
import Courses from './views/Courses'
import Login from './views/Login.vue'
import PNF from './views/PNF.vue'
import Profile from './views/Profile.vue'
import fullCard from './views/fullCard.vue'
import Add from './views/Add.vue'

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

const isCompany = function(to, from, next){
  if(store.state.auth.userType === 'company' ){
    next()
    return
  }
  next('/404')
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
      path: '/courses',
      name: 'courses',
      component: Courses,
      beforeEnter: isAuth
    },
    {
      path: '/fullCard/:type/:id',
      name: 'fullCard',
      component: fullCard,
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
      path: '/add',
      name: 'add',
      component: Add,
      beforeEnter: isCompany
    },
    {
      path: '**',
      name: '404',
      component: PNF
    },
  ]
})
