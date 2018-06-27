import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {},
    refresh: {}
  },
  mutations: {
    login(state, payload){
      console.log(payload, state);
    }, 
    register(state, payload){
      fetch('https://bokunozibra.herokuapp.com/api/register', {body: JSON.stringify(payload), method: 'POST'}).then(res=>{
        return res.json()
      }).then(res => {
        console.log(res)
      })
      console.log(payload)
    }
  },
  actions: {

  }
})
