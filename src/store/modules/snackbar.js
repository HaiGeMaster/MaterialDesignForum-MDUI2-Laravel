const app = {
    namespaced: true,
    state: {
        model: false,
        text: '',
        timeout: 4000,
    },
    getters: {
        GetModel: state => state.model,
        GetText: state => state.text,
        GetTimeout: state => state.timeout,
    },
    mutations: {
        SetModel(state, val) {
            state.model = val;
        },
        SetText(state, val) {
            state.text = val;
        },
        SetTimeout(state, val) {
            state.timeout = val;
        },
    },
    actions: {
        Show_Snackbar({ commit }, val) {
            commit('SetModel', true);
            commit('SetText', val.text);
            commit('SetTimeout', val.timeout || 4000);
        },
        Hide_Snackbar({ commit }) {
            commit('SetModel', false);
            commit('SetText', '');
            commit('SetTimeout', 4000);
        },
    }
}
export default app