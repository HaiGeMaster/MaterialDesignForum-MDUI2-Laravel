const app = {
    state: {
        select: false,
    },
    getters: {
        GetSelect: state => state.select,
    },
    mutations: {
        SetSelect(state, select) {
            state.select = select
        },
    },
    actions: {
        Set_Select({ commit }, select) {
            commit('SetSelect', select)
        }
    }
}
export default app
