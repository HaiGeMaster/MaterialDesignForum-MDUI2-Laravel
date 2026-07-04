const app = {
  namespaced: true,
  state: {
    fab_dialog_name: '',
    search_fab_dialog:{
      model: 'close',
      value: '',
    },
    editor_fab_dialog: {
      model: 'close',      
      title: '',
      icon: 'mdi-pencil-outline',
      has_title: true,
      has_topic: true,
      submit_text: '',
      edit_type: 'article',
      edit_mode: 'new',
      edit_mode_id: 0,
      answer_to_question_id: 0,
      md_title: '',
      md_topics: [],
      md_content: '',
    }
  },
  getters: {
    GetFabDialogName: state => state.fab_dialog_name,
    GetQuestionFabDialog: state => state.question_fab_dialog,
    GetAnswerFabDialog: state => state.answer_fab_dialog,
    GetArticleFabDialog: state => state.article_fab_dialog,
    GetSearchFabDialog: state => state.search_fab_dialog,
    GetEditorFabDialog: state => state.editor_fab_dialog,
  },
  mutations: {
    SetFabDialogName(state, payload) {
      state.fab_dialog_name = payload
    },
    SetSearchFabDialog(state, {
      model = state.search_fab_dialog.model,
      value = state.search_fab_dialog.value
    }) {
      state.search_fab_dialog.model = model
      state.search_fab_dialog.value = value
    },
    SetEditorFabDialog(state, {
      model = state.editor_fab_dialog.model,
      title = state.editor_fab_dialog.title,
      icon = state.editor_fab_dialog.icon,
      has_title = state.editor_fab_dialog.has_title,
      has_topic = state.editor_fab_dialog.has_topic,
      submit_text = state.editor_fab_dialog.submit_text,
      edit_type = state.editor_fab_dialog.edit_type,
      edit_mode = state.editor_fab_dialog.edit_mode,
      edit_mode_id = state.editor_fab_dialog.edit_mode_id,
      answer_to_question_id = state.editor_fab_dialog.answer_to_question_id,
      md_title = state.editor_fab_dialog.md_title,
      md_topics = state.editor_fab_dialog.md_topics,
      md_content = state.editor_fab_dialog.md_content
    }) {
      state.editor_fab_dialog.model = model
      state.editor_fab_dialog.title = title
      state.editor_fab_dialog.icon = icon
      state.editor_fab_dialog.has_title = has_title
      state.editor_fab_dialog.has_topic = has_topic
      state.editor_fab_dialog.submit_text = submit_text
      state.editor_fab_dialog.edit_type = edit_type
      state.editor_fab_dialog.edit_mode = edit_mode
      state.editor_fab_dialog.edit_mode_id = edit_mode_id
      state.editor_fab_dialog.answer_to_question_id = answer_to_question_id
      state.editor_fab_dialog.md_title = md_title
      state.editor_fab_dialog.md_topics = md_topics
      state.editor_fab_dialog.md_content = md_content
      // console.log('SetEditorFabDialog', state.editor_fab_dialog)
    },
  },
  actions: {
    Set_FabDialogName({ commit }, payload) {
      commit('SetFabDialogName', payload)
    },
    Set_SearchFabDialog({ commit }, payload) {
      commit('SetSearchFabDialog', payload)
    },
    Set_SearchFabDialogValue({ commit }, payload) {
      commit('SetSearchFabDialogValue', payload)
    },
    Set_EditorFabDialog({ commit }, payload) {
      commit('SetEditorFabDialog', payload)
    },
  }
}
export default app
