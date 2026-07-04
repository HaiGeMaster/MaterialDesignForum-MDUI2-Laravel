const app = {
  namespaced: true,
  state: {
    alerts: [
    ],
  },
  getters: {
    GetAlerts: state => state.alerts,
  },
  mutations: {
    SetAlerts(state, alerts) {
      state.alerts = alerts
    },
    AddAlert(state, {
      title = 'Console Alert Title',
      message = 'Console Alert Message',
      sub_message = '',
      action_text = '',
      type = '',
      color = '',
    }) {
      state.alerts.push({
        title: title,
        message: message,
        sub_message: sub_message,
        action_text: action_text,
        type: type,
        color: color,
      })
    },
    RemoveAlert(state, index) {
      state.alerts.splice(index, 1)
    },
  },
  actions: {
    Set_Alerts({ commit }, alerts) {
      commit('SetAlerts', alerts)
    },
    Add_Alert({ commit }, alert) {
      commit('AddAlert', alert)
    },
    Remove_Alert({ commit }, index) {
      commit('RemoveAlert', index)
    },
  }
}
export default app
