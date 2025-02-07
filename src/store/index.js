import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: ''
  },
  getters: {
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
  },
  modules: {
  }
})
