const app = {
  namespaced: true,
  state: {
    answer_update: 0,
    question_update: 0,
    article_update: 0,
    topic_update: 0,
    comment_update: 0,
    reply_update: 0,
    user_update: 0,
    data_table_update: 0,
  },
  getters: {
    GetAnswerUpdate: state => state.answer_update,
    GetQuestionUpdate: state => state.question_update,
    GetArticleUpdate: state => state.article_update,
    GetTopicUpdate: state => state.topic_update,
    GetCommentUpdate: state => state.comment_update,
    GetReplyUpdate: state => state.reply_update,
    GetUserUpdate: state => state.user_update,
    GetDataTableUpdate: state => state.data_table_update,
  },
  mutations: {
    SetAnswerUpdate(state, val) {
      state.answer_update = val
    },
    SetQuestionUpdate(state, val) {
      state.question_update = val
    },
    SetArticleUpdate(state, val) {
      state.article_update = val
    },
    SetTopicUpdate(state, val) {
      state.topic_update = val
    },
    SetCommentUpdate(state, val) {
      state.comment_update = val
    },
    SetReplyUpdate(state, val) {
      state.reply_update = val
    },
    SetUserUpdate(state, val) {
      state.user_update = val
    },
    SetDataTableUpdate(state, val) {
      state.data_table_update = val
    },
  },
  actions: {
    Set_AnswerUpdate({ commit }, val) {
      commit('SetAnswerUpdate', val)
    },
    Set_QuestionUpdate({ commit }, val) {
      commit('SetQuestionUpdate', val)
    },
    Set_ArticleUpdate({ commit }, val) {
      commit('SetArticleUpdate', val)
    },
    Set_TopicUpdate({ commit }, val) {
      commit('SetTopicUpdate', val)
    },
    Set_CommentUpdate({ commit }, val) {
      commit('SetCommentUpdate', val)
    },
    Set_ReplyUpdate({ commit }, val) {
      commit('SetReplyUpdate', val)
    },
    Set_UserUpdate({ commit }, val) {
      commit('SetUserUpdate', val)
    },
    Set_DataTableUpdate({ commit }, val) {
      commit('SetDataTableUpdate', val)
    },
  }
}
export default app
