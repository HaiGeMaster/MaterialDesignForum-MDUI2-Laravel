import { createStore } from 'vuex'

// import app from './modules/app.js'
import User from './modules/user.js'
import Dialog from './modules/dialog.js'
import Alerts from './modules/alerts.js'
import NewCommentReply from './modules/new-comment-reply.js'
import FabDialog from './modules/fab-dialog.js'
// import AnswersPage from './modules/answers-page.js'
import Update from './modules/update.js'
import Snackbar from './modules/snackbar.js'
export default createStore({
  state: {
    title: '', 
    subtitle: '',
    readtitle: '',
    appbar_subtitle: '',
    cache_web_left_title: '',
    scroll_value: 0,
    scroll_mode: 'up',
    components: {
      appbar_subtitle: '',
      appbar_tabbar: null,
      drawer_navigation: true,
      appbar_search: false,
    },
    lang_messages: null,
    app_version: '26.4.8',
    app_version_type: 0,
    app_name: 'MaterialDesignForum MDUI2 Client',
    app_version_expiration_time: 253402271999,
    app_allow_use: true,
    app_allow_use_langpack: [],//["zh_CN","en_US","zh_TW","en_GB","ru_RU","fr_FR","de_DE","ja_JP","ko_KR"],

    mobile: false,
    pad: false,
    pc: false,

    breakpoint: '',
    dark: false,
    
    data: {
      appbar_tabbar_items: {
        topics_items: [
          {
            name: 'Message.Components.Appbar.Tabbars.TopicsItems.Following',
            link: '/topics#following',
            need_login: true,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.TopicsItems.Recommended',
            link: '/topics#recommended',
            need_login: true,
          },
        ],
        questions_items: [
          {
            name: 'Message.Components.Appbar.Tabbars.QuestionsItems.Recent',
            link: '/questions#recent',
            need_login: false,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.QuestionsItems.Popular',
            link: '/questions#popular',
            need_login: false,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.QuestionsItems.Following',
            link: '/questions#following',
            need_login: true,
          },
        ],
        articles_items: [
          {
            name: 'Message.Components.Appbar.Tabbars.ArticlesItems.Recent',
            link: '/articles#recent',
            need_login: false,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.ArticlesItems.Popular',
            link: '/articles#popular',
            need_login: false,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.ArticlesItems.Following',
            link: '/articles#following',
            need_login: true,
          },
        ],
        users_items: [
          {
            name: 'Message.Components.Appbar.Tabbars.UsersItems.Followees',
            link: '/users#followees',
            need_login: true,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.UsersItems.Followers',
            link: '/users#followers',
            need_login: true,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.UsersItems.Recommended',
            link: '/users#recommended',
            need_login: false,
          },
        ],
        notifications_items: [
          {
            name: 'Message.Components.Appbar.Tabbars.NotificationsItems.System',
            link: '/notifications#system',
            need_login: true,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.NotificationsItems.UserGroup',
            link: '/notifications#user_group',
            need_login: true,
          },
          {
            name: 'Message.Components.Appbar.Tabbars.NotificationsItems.PrivateMessage',
            link: '/notifications#private_message',
            need_login: true,
          },
        ],
      },
    },
  },
  getters: {
    GetTitle: state => state.title,
    GetSubtitle: state => state.subtitle,
    GetReadTitle: state => state.readtitle,
    GetAppbarSubtitle: state => state.appbar_subtitle,
    GetCacheWebLeftTitle: state => state.cache_web_left_title,
    GetScrollValue: state => state.scroll_value,
    GetScrollMode: state => state.scroll_mode,
    GetComponents: state => state.components,
    GetData: state => state.data,
    GetLangMessages: state => state.lang_messages,
    GetAppVersion: state => state.app_version,
    GetAppVersionType: state => state.app_version_type,
    GetAppName: state => state.app_name,
    GetAppVersionExpirationTime: state => state.app_version_expiration_time,
    GetAppAllowUse: state => state.app_allow_use,
    GetAppAllowUseLangpack: state => state.app_allow_use_langpack,

    GetMobile: state => state.mobile,
    GetPad: state => state.pad,
    GetPc: state => state.pc,

    GetBreakpoint: state => state.breakpoint,
    GetDark: state => state.dark,
  },
  mutations: {
    SetTitle(state, title) {
      state.title = title
    },
    SetSubtitle(state, subtitle) {
      state.subtitle = subtitle
    },
    SetReadTitle(state, readtitle) {
      // console.log('SetReadTitle', readtitle)
      state.readtitle = readtitle
    },
    SetAppbarSubtitle(state, appbar_subtitle) {
      state.appbar_subtitle = appbar_subtitle
    },
    SetCacheWebLeftTitle(state, cache_web_left_title) {
      state.cache_web_left_title = cache_web_left_title
    },
    SetScrollValue(state, value) {
      if (state.scroll_value < value) {
        state.scroll_mode = 'down'
      } else if (state.scroll_value > value) {
        state.scroll_mode = 'up'
      }
      // console.log('state.scroll_value', state.scroll_value)
      // console.log('scroll_mode', state.scroll_mode)
      state.scroll_value = value
    },
    SetScrollMode(state, value) {
      state.scroll_mode = value
    },
    //     state.device.mobile = true
    //     state.device.tablet = false
    //     state.device.desktop = false
    //     state.device.mobile = false
    //     state.device.tablet = true
    //     state.device.desktop = false
    //     state.device.mobile = false
    //     state.device.tablet = false
    //     state.device.desktop = true
    SetComponent(state, { components, value }) {
      switch (components) {
        //   state.components.appbar_subtitle = value
        case 'appbar_tabbar':
          state.components.appbar_tabbar = value
          break
        case 'drawer_navigation':
          state.components.drawer_navigation = value
          break
        case 'appbar_search':
          state.components.appbar_search = value
          break
        default:
          break
      }
    },
    SetLangMessages(state, lang_messages) {
      state.lang_messages = lang_messages
    },
    SetAppVersion(state, app_version) {
      state.app_version = app_version
    },
    SetAppVersionType(state, app_version_type) {
      state.app_version_type = app_version_type
    },
    SetAppName(state, app_name) {
      state.app_name = app_name
    },
    SetAppVersionExpirationTime(state, app_version_expiration_time) {
      state.app_version_expiration_time = app_version_expiration_time
    },
    SetAppAllowUse(state, app_allow_use) {
      state.app_allow_use = app_allow_use
    },
    SetAppAllowUseLangpack(state, app_allow_use_langpack) {
      state.app_allow_use_langpack = app_allow_use_langpack
    },

    SetMobile(state, val) {
      state.mobile = val
      state.pad = false
      state.pc = false
    },
    SetPad(state, val) {
      state.mobile = false
      state.pad = val
      state.pc = false
    },
    SetPc(state, val) {
      state.mobile = false
      state.pad = false
      state.pc = val
    },

    SetBreakpoint(state, val) {
      state.breakpoint = val
    },
    SetDark(state, val) {
      state.dark = val
    },
  },
  actions: {
    Set_Title({ commit }, title) {
      commit('SetTitle', title)
    },
    Set_Subtitle({ commit }, subtitle) {
      commit('SetSubtitle', subtitle)
    },
    Set_ReadTitle({ commit }, readtitle) {
      commit('SetReadTitle', readtitle)
    },
    Set_AppbarSubtitle({ commit }, appbar_subtitle) {
      commit('SetAppbarSubtitle', appbar_subtitle)
    },
    Set_CacheWebLeftTitle({ commit }, cache_web_left_title) {
      commit('SetCacheWebLeftTitle', cache_web_left_title)
    },
    Set_ScrollValue({ commit }, value) {
      commit('SetScrollValue', value)
    },
    Set_ScrollMode({ commit }, value) {
      commit('SetScrollMode', value)
    },
    Set_Component({ commit }, { components, value }) {
      commit('SetComponent', { components, value })
    },
    Set_LangMessages({ commit }, lang_messages) {
      commit('SetLangMessages', lang_messages)
    },
    Set_AppVersion({ commit }, app_version) {
      commit('SetAppVersion', app_version)
    },
    Set_AppVersionType({ commit }, app_version_type) {
      commit('SetAppVersionType', app_version_type)
    },
    Set_AppName({ commit }, app_name) {
      commit('SetAppName', app_name)
    },
    Set_AppVersionExpirationTime({ commit }, app_version_expiration_time) {
      commit('SetAppVersionExpirationTime', app_version_expiration_time)
    },
    Set_AppAllowUse({ commit }, app_allow_use) {
      commit('SetAppAllowUse', app_allow_use)
    },
    Set_AppAllowUseLangpack({ commit }, app_allow_use_langpack) {
      commit('SetAppAllowUseLangpack', app_allow_use_langpack)
    },

    Set_Mobile({ commit }, val) {
      commit('SetMobile', val)
    },
    Set_Pad({ commit }, val) {
      commit('SetPad', val)
    },
    Set_Pc({ commit }, val) {
      commit('SetPc', val)
    },

    Set_Breakpoint({ commit }, val) {
      commit('SetBreakpoint', val)
    },
    Set_Dark({ commit }, val) {
      commit('SetDark', val)
    },
  },
  modules: {
    User,
    Dialog,
    Alerts,
    NewCommentReply,
    FabDialog,
    Update,
    Snackbar,
  }
})
