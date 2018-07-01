import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: localStorage.auth ? JSON.parse(localStorage.auth) : {},
    authError: '',
    jobs: undefined
  },
  mutations: {
    login(state, payload){
      fetch('https://bokunozibra.herokuapp.com/api/auth', {headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload), method: 'POST'}).then(res=>{
        return res.json()
      }).then(res => {
        if(res.status === 0){
          state.auth = res.data
          state.auth.logTime = new Date().getTime();
          state.auth.expiresIn *= 1000;
          router.push('/')
          localStorage.auth = JSON.stringify(state.auth);
        }else{
          state.authError = res.message
        }
      })
      console.log(payload)
    }, 
    register(state, payload){
      fetch('https://bokunozibra.herokuapp.com/api/register', {headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload), method: 'POST'}).then(res=>{
        return res.json()
      }).then(res => {
        if(res.status === 0){
          state.auth = res.data
          state.auth.logTime = new Date().getTime();
          state.auth.expiresIn *= 1000;
          router.push('/')
          localStorage.auth = JSON.stringify(state.auth);
        }else{
          state.authError = res.message
        }
      })
      console.log(payload)
    },
    logout(state){
      state.auth = {};
      localStorage.auth = false;
      router.push('login')
    },
    refreshToken(state, from){
      fetch('https://bokunozibra.herokuapp.com/api/token', {headers: {'token':'application/json'}, body: JSON.stringify({refreshToken: state.auth.refreshToken}), method: 'POST'}).then(res=>{
        return res.json()
      }).then(res => {
        if(res.success){
          router.push(from)
        }else{
          state.auth = {};
          router.push('login')
        }
      })
    }
  },
  actions: {

  }
})
