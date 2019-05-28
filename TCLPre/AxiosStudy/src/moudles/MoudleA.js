export default {
  namespaced: true,
  state: {
    num: 1
  },
  mutations: {
    add (state, obj) {
      console.log(obj.num)
      state.num++
    },
    sub (state) {
      state.num--
    }
  },
  actions: {
    addAct (store, obj) {
      store.commit('add', obj)
    },
    subAct ({commit}) {
      commit('sub')
    }
  },
  getters: {
    getNums (state) {
      return state.num
    }
  }
}
