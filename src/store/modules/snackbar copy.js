
const app = {
    namespaced: true,
    state: {
        meaasge_array: [
            // {
            //     text: '测试信息1', // 消息文本内容
            //     timeout: 3000, // 消息显示时间，单位毫秒 -1表示永久显示
            // },
            // {
            //     text: '测试信息2',
            //     timeout: 3000,
            // },
            // {
            //     text: '测试信息3',
            //     timeout: -1,
            // },
            // {
            //     text: '测试信息4',
            //     timeout: -1,
            // },
        ],
    },
    getters: {
        GetMessageArray: state => state.meaasge_array,
    },
    mutations: {
        SetMessageArray(state, val) {
            state.meaasge_array = val;
        },
        AddMessage(state, val) {
            state.meaasge_array.push({
                text: val.text, // 消息文本内容
                timeout: val.timeout || -1, // 消息显示时间，单位毫秒 -1表示永久显示
            });
        },
        RemoveMessage(state, index) {
            state.meaasge_array.splice(index, 1);//删除的索引开始，删除几个
        },
        ClearMessages(state) {
            state.meaasge_array = [];
        }
    },
    actions: {
        Set_MessageArray({ commit }, val) {
            commit('SetMessageArray', val);
        },
        Add_Message({ commit }, val) {
            commit('AddMessage', val);
        },
        Remove_Message({ commit }, index) {
            commit('RemoveMessage', index);
        },
        Clear_Messages({ commit }) {
            commit('ClearMessages');
        }
    }
}
export default app
