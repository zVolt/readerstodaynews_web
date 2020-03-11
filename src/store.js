import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      logged_in: false,
      id: null,
      name: null,
      email: null,
      image: null
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.logged_in = value
    },
    SET_USER(state, data) {
      state.user.id = data.id
      state.user.name = data.name
      state.user.email = data.email
      state.user.image = data.image
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (!user)
        user = {}
      commit("SET_USER", {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      })
    }
  }
})