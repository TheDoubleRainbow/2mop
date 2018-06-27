import Vue from 'vue'
import Router from 'vue-router'
import Jobs from './views/Jobs.vue'
import Login from './views/Login.vue'

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
  if((new Date()).getTime() < (store.state.auth.logTime +  store.state.auth.expiresIn)){
    if(store.state.auth.authToken){
      next('/')
      return
    }
  }else{
    store.commit('refreshToken', to)
  }
  next()
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jobs',
      component: Jobs,
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
      beforeEnter: isNotAuth
    }
  ]
})
