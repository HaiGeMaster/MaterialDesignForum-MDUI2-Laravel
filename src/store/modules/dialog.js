const app = {
  namespaced: true,
  state: {
    dialog: {
      model: false,
      title: 'title',
      content: 'content',
    },
    use_cookie_dialog: false,
    login_dialog: false,
    register_dialog: false,
    reset_dialog: false,
    users_dialog: {
      id: 1,
      model: false,
      type: 'users',
      modes: 'followers',
    },
    comments_dialog: {
      title: 'title',
      model: false,
      external_loading: false,
      commentable_id: 0,
      commentable_type: 'answer',
      comment_count: 0,
      close_comments_dialog: null,
      return_update_comments: null,
    },
    // edit_info_dialog: false,
    edit_info_dialog: {
      model: false,
      user: null,
    },
    topic_dialog: {
      model: false,
      mode: 'new',
      edit_topic: null,
    },
    topic_selector_dialog: false,
    dev_dialog: false,
    comment_reply_edit_dialog: {
      model: false,
      title: 'Message.Components.DataTable.Edit',
      type: 'comment',
      edit_id: 0,
      content: '',
    },
    user_group_edit_dialog: {
      model: false,
      mode: 'new',
      edit_user_group: null,
    },
    cookie_use_dialog: false,
    report_dialog: {
      model: false,
      item: null,
      type: '',
      report_preview_text: '',
    },
    delete_dialog: {
      model: false,
      item: null,
      type: '',
      item_ids: [],
      delete_preview_text: '',
      delete_time: 0,
    }
  },
  getters: {
    GetDialog: state => state.dialog,
    GetUseCookieDialog: state => state.use_cookie_dialog,
    GetLoginDialog: state => state.login_dialog,
    GetRegisterDialog: state => state.register_dialog,
    GetResetDialog: state => state.reset_dialog,
    GetUsersDialog: state => state.users_dialog,
    GetCommentsDialog: state => state.comments_dialog,
    GetEditInfoDialog: state => state.edit_info_dialog,
    GetTopicDialog: state => state.topic_dialog,
    GetTopicSelectorDialog: state => state.topic_selector_dialog,
    GetDevDialog: state => state.dev_dialog,
    GetCommentReplyEditDialog: state => state.comment_reply_edit_dialog,
    GetUserGroupEditDialog: state => state.user_group_edit_dialog,
    GetCookieUseDialog: state => state.cookie_use_dialog,
    GetReportDialog: state => state.report_dialog,
    GetDeleteDialog: state => state.delete_dialog,
  },
  mutations: {
    SetDialog(state, { model, title, content }) {
      state.dialog.model = model
      state.dialog.title = title
      state.dialog.content = content
    },
    SetUseCookieDialog(state, val) {
      state.use_cookie_dialog = val
    },
    SetLoginDialog(state, val) {
      state.login_dialog = val
    },
    SetRegisterDialog(state, val) {
      state.register_dialog = val
    },
    SetResetDialog(state, val) {
      state.reset_dialog = val
    },
    SetUsersDialog(state, { id, type, modes, model }) {
      state.users_dialog.id = id
      state.users_dialog.type = type
      state.users_dialog.modes = modes
      state.users_dialog.model = model
    },
    SetCommentsDialog(state, {
      title,
      model,
      external_loading = false,
      commentable_id,
      commentable_type = "answer",
      comment_count = 0,
      close_comments_dialog,
      return_update_comments = (v) => {
      }
    }) {
      state.comments_dialog.title = title
      state.comments_dialog.model = model
      state.comments_dialog.external_loading = external_loading
      state.comments_dialog.commentable_id = commentable_id
      state.comments_dialog.commentable_type = commentable_type
      state.comments_dialog.comment_count = comment_count
      state.comments_dialog.close_comments_dialog = close_comments_dialog
      state.comments_dialog.return_update_comments = return_update_comments
    },
    SetEditInfoDialog(state, { model, user }) {
      state.edit_info_dialog.model = model
      state.edit_info_dialog.user = user
    },
    SetTopicDialog(state, {
      model,
      mode,
      edit_topic
    }) {
      state.topic_dialog.model = model
      state.topic_dialog.mode = mode
      state.topic_dialog.edit_topic = edit_topic
    },
    SetTopicSelectorDialog(state, val) {
      state.topic_selector_dialog = val
    },
    SetDevDialog(state, val) {
      state.dev_dialog = val
    },
    SetCommentReplyEditDialog(state, {
      model,
      title,
      type,
      edit_id,
      content
    }) {
      state.comment_reply_edit_dialog.model = model
      state.comment_reply_edit_dialog.title = title
      state.comment_reply_edit_dialog.type = type
      state.comment_reply_edit_dialog.edit_id = edit_id
      state.comment_reply_edit_dialog.content = content
    },
    SetUserGroupEditDialog(state, {
      model,
      mode,
      edit_user_group
    }) {
      state.user_group_edit_dialog.model = model
      state.user_group_edit_dialog.mode = mode
      state.user_group_edit_dialog.edit_user_group = edit_user_group
    },
    SetCookieUseDialog(state, val) {
      state.cookie_use_dialog = val
    },
    SetReportDialog(state, {
      model,
      item,
      type,
      report_preview_text
    }) {
      state.report_dialog.model = model
      state.report_dialog.item = item
      state.report_dialog.type = type
      state.report_dialog.report_preview_text = report_preview_text
    },
    SetDeleteDialog(state, {
      model,
      item,
      type,
      item_ids,
      delete_preview_text
    }) {
      state.delete_dialog.model = model
      state.delete_dialog.item = item
      state.delete_dialog.type = type
      state.delete_dialog.item_ids = item_ids
      state.delete_dialog.delete_preview_text = delete_preview_text
      state.delete_dialog.delete_time = delete_time
    }
  },
  actions: {
    Set_Dialog({ commit }, { model, title, content }) {
      commit('SetDialog', { model, title, content })
    },
    Set_UseCookieDialog({ commit }, val) {
      commit('SetUseCookieDialog', val)
    },
    Set_LoginDialog({ commit }, val) {
      commit('SetLoginDialog', val)
    },
    Set_RegisterDialog({ commit }, val) {
      commit('SetRegisterDialog', val)
    },
    Set_ResetDialog({ commit }, val) {
      commit('SetResetDialog', val)
    },
    Set_UsersDialog({ commit }, { id, type, modes, model }) {
      commit('SetUsersDialog', { id, type, modes, model })
    },
    Set_CommentsDialog({ commit }, { title, model, external_loading, commentable_id, commentable_type, comment_count, close_comments_dialog, return_update_comments }) {
      commit('SetCommentsDialog', { title, model, external_loading, commentable_id, commentable_type, comment_count, close_comments_dialog, return_update_comments })
    },
    Set_EditInfoDialog({ commit }, val) {
      commit('SetEditInfoDialog', val)
    },
    Set_TopicDialog({ commit }, val) {
      commit('SetTopicDialog', val)
    },
    Set_TopicSelectorDialog({ commit }, val) {
      commit('SetTopicSelectorDialog', val)
    },
    Set_DevDialog({ commit }, val) {
      commit('SetDevDialog', val)
    },
    Set_CommentReplyEditDialog({ commit }, val) {
      commit('SetCommentReplyEditDialog', val)
    },
    Set_UserGroupEditDialog({ commit }, val) {
      commit('SetUserGroupEditDialog', val)
    },
    Set_CookieUseDialog({ commit }, val) {
      commit('SetCookieUseDialog', val)
    },
    Set_ReportDialog({ commit }, val) {
      commit('SetReportDialog', val)
    },
    Set_DeleteDialog({ commit }, val) {
      commit('SetDeleteDialog', val)
    },
  }
}
export default app
