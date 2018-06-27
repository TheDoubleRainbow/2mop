import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},
    authError: '',
    jobs: undefined
  },
  mutations: {
    login(state, payload){
      fetch('https://bokunozibra.herokuapp.com/api/auth', {headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload), method: 'POST'}).then(res=>{
        return res.json()
      }).then(res => {
        if(res.success == true){
          state.auth = res
          state.auth.logTime = new Date().getTime();
          router.push('/')
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
        if(res.success == true){
          state.auth = res.data
          state.auth.logTime = new Date().getTime();
          router.push('/')
        }else{
          state.authError = res.message
        }
      })
      console.log(payload)
    },
    logout(state){
      state.auth = {};
      router.push('login')
    },
    refreshToken(state, from){
      fetch('https://bokunozibra.herokuapp.com/api/token', {headers: {'token':'application/json'}, body: JSON.stringify({refreshToken: state.auth.refreshToken}), method: 'POST'}).then(res=>{
        return res.json()
      }).then(res => {
        console.log(res)
        router.push(from)
      })
    },
    getJobs(state){
      fetch('https://bokunozibra.herokuapp.com/api/jobs', {headers: {'token':'application/json'}, method: 'GET'}).then(res=>{
        return res.json()
      }).then(res => {
        state.jobs = res;
      })
    }
  },
  actions: {

  }
})
