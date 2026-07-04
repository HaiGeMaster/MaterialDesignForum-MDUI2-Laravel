const app = {
  namespaced: true,
  state: {
    update: 0,
  },
  getters: {
    GetUpdate: state => state.update,
  },
  mutations: {
    AddUpdate(state, value) {
      state.update += value;
    },
    SetUpdate(state, value) {
      state.update = value;
    }
  },
  actions: {
    Add_Update({ commit }, value) {
      commit('AddUpdate', value);
    },
    Set_Update({ commit }, value) {
      commit('SetUpdate', value);
    }
  }
}
export default app
