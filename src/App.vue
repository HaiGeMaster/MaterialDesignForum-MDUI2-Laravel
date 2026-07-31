<template>
  <div>
    <!-- <WinHeader v-show="IsElectron || IsTauri" /> -->

    <AppBody :search_appbar="search_appbar" @search_appbar="search_appbar = $event">
      <template v-slot:appbar-right>
        <CustomInput
          style="-webkit-app-region: no-drag"
          v-if="mainStore.getDesktop"
          :placeholder="$t('Message.Components.Search.SearchTooltop')"
          @model="
            (val) => {
              fabDialogStore.setSearchFabDialog({
                value: val,
                model: 'moderate',
              })
            }
          "
        />
        <mdui-button-icon
          v-if="!mainStore.getDesktop"
          style="margin-left: 4px; margin-right: 4px; -webkit-app-region: no-drag"
          @click="search_appbar = !search_appbar"
        >
          <mdi-icon icon="mdi-magnify" />
        </mdui-button-icon>
        <ThemeButton
          :show="!mainStore.getMobile && localDataStore.getAppbarShowThemeButton"
          style="-webkit-app-region: no-drag"
        />
        <LanguageButton
          :show="!mainStore.getMobile && localDataStore.getAppbarShowLanguageButton"
          style="-webkit-app-region: no-drag"
        />
        <!-- :show="!userStore.getIsLogin || (userStore.getIsLogin && !mainStore.getMobile)" -->
        <!-- <DeviceTypeButton :show="mainStore.getDesktop"/> -->

        <mdui-button
          v-if="!mainStore.getMobile && !userStore.getIsLogin"
          variant="filled"
          style="margin-right: 4px; margin-left: 4px; -webkit-app-region: no-drag"
          @click="
            () => {
              mainStore.setDrawer(false)
              $router.push(UrlHeaderLang() + '/login')
            }
          "
        >
          <!-- @click="dialogStore.setLoginDialog(true)" -->
          <mdi-icon slot="icon" icon="mdi-login" />
          {{ $t('Message.Components.Account.Login') }}
        </mdui-button>
        <mdui-button
          v-if="!mainStore.getMobile && !userStore.getIsLogin"
          variant="tonal"
          @click="dialogStore.setRegisterDialog(true)"
          style="-webkit-app-region: no-drag"
        >
          <mdi-icon slot="icon" icon="mdi-account-plus" />
          {{ $t('Message.Components.Account.Register') }}
        </mdui-button>

        <NotificationButton v-if="userStore.getIsLogin" style="-webkit-app-region: no-drag" />

        <AppbarAvatarMenu v-if="userStore.getIsLogin" style="-webkit-app-region: no-drag">
          <template v-slot:action>
            <ThemeButton :show="mainStore.getMobile" />
            <LanguageButton :show="mainStore.getMobile" />
            <!-- <DeviceTypeButton :show="!mainStore.getDesktop"/> -->
          </template>
        </AppbarAvatarMenu>

        <LoginRegisterMenu
          v-if="mainStore.getMobile && !userStore.getIsLogin"
          style="-webkit-app-region: no-drag"
        />
      </template>

      <template v-slot:navigation-drawer-content>
        <mdui-list style="padding: 8px; -webkit-app-region: no-drag">
          <mdui-list-item
            rounded
            :active="`${$G_UrlHeaderLang()}/` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/')"
          >
            <mdi-icon slot="icon" icon="mdi-home"></mdi-icon>
            {{ $t('Message.Components.DrawerNavigation.Home') }}
          </mdui-list-item>
          <mdui-list-item
            rounded
            :active="`${$G_UrlHeaderLang()}/topics` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/topics')"
          >
            <mdi-icon slot="icon" icon="mdi-book"></mdi-icon>
            {{ $t('Message.Components.DrawerNavigation.Topics') }}
          </mdui-list-item>
          <mdui-list-item
            rounded
            :active="`${$G_UrlHeaderLang()}/questions` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/questions')"
          >
            <mdi-icon slot="icon" icon="mdi-forum"></mdi-icon>
            {{ $t('Message.Components.DrawerNavigation.Questions') }}
          </mdui-list-item>
          <mdui-list-item
            rounded
            :active="`${$G_UrlHeaderLang()}/articles` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/articles')"
          >
            <mdi-icon slot="icon" icon="mdi-file-document"></mdi-icon>
            {{ $t('Message.Components.DrawerNavigation.Articles') }}
          </mdui-list-item>
          <mdui-divider style="margin: 8px 0 8px 0"></mdui-divider>
          <mdui-list-item
            rounded
            v-if="userStore.getIsLogin"
            :active="`${$G_UrlHeaderLang()}/users/${$G_GetUserID()}` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/users/' + $G_GetUserID())"
          >
            <mdi-icon slot="icon" icon="mdi-account-circle"></mdi-icon>
            {{ $t('Message.Components.DrawerNavigation.PersonalData') }}
          </mdui-list-item>
          <mdui-list-item
            rounded
            :active="`${$G_UrlHeaderLang()}/users` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/users')"
          >
            <mdi-icon slot="icon" icon="mdi-account-multiple"></mdi-icon>
            {{ $t('Message.Components.DrawerNavigation.Users') }}
          </mdui-list-item>
          <mdui-list-item
            rounded
            v-if="userStore.getIsLogin"
            :active="`${$G_UrlHeaderLang()}/notifications` === $route.path"
            @click="$router.push($G_UrlHeaderLang() + '/notifications')"
          >
            <!-- <mdi-icon slot="icon" icon="mdi-bell"></mdi-icon> -->
            <mdi-icon
              slot="icon"
              :icon="userStore.getUser.notification_unread > 0 ? 'mdi-bell-badge' : 'mdi-bell'"
            />
            {{ $t('Message.Components.DrawerNavigation.Notice') }}
          </mdui-list-item>
        </mdui-list>
      </template>
      <template v-slot:navigation-drawer-bottom>
        <div style="position: absolute; bottom: 0; padding: 16px; width: auto">
          <Copyright />
        </div>
      </template>

      <template v-slot:navigation-rail-content>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          :value="$G_UrlHeaderLang() + '/'"
          @click="$router.push($G_UrlHeaderLang() + '/')"
        >
          <mdi-icon slot="icon" icon="mdi-home"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Home') }}
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          :value="$G_UrlHeaderLang() + '/topics'"
          @click="$router.push($G_UrlHeaderLang() + '/topics')"
        >
          <mdi-icon slot="icon" icon="mdi-book"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Topics') }}
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          :value="$G_UrlHeaderLang() + '/questions'"
          @click="$router.push($G_UrlHeaderLang() + '/questions')"
        >
          <mdi-icon slot="icon" icon="mdi-forum"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Questions') }}
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          :value="$G_UrlHeaderLang() + '/articles'"
          @click="$router.push($G_UrlHeaderLang() + '/articles')"
        >
          <mdi-icon slot="icon" icon="mdi-file-document"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Articles') }}
        </mdui-navigation-rail-item>
        <mdui-divider style="width: 100%"></mdui-divider>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          v-if="userStore.getIsLogin"
          :value="$G_UrlHeaderLang() + '/users/' + $G_GetUserID()"
          @click="$router.push($G_UrlHeaderLang() + '/users/' + $G_GetUserID())"
        >
          <mdi-icon slot="icon" icon="mdi-account-circle"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.PersonalData') }}
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          :value="$G_UrlHeaderLang() + '/users'"
          @click="$router.push($G_UrlHeaderLang() + '/users')"
        >
          <mdi-icon slot="icon" icon="mdi-account-multiple"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Users') }}
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item
          style="-webkit-app-region: no-drag"
          v-if="userStore.getIsLogin"
          :value="$G_UrlHeaderLang() + '/notifications'"
          @click="$router.push($G_UrlHeaderLang() + '/notifications')"
        >
          <!-- <mdi-icon slot="icon" icon="mdi-bell"></mdi-icon> -->
          <mdi-icon
            slot="icon"
            :icon="userStore.getUser.notification_unread > 0 ? 'mdi-bell-badge' : 'mdi-bell'"
          />
          {{ $t('Message.Components.DrawerNavigation.Notice') }}
        </mdui-navigation-rail-item>
      </template>

      <template v-slot:navigation-rail-bottom>
        <div
          style="position: absolute; bottom: 0; padding: 0 16px 0 16px; -webkit-app-region: no-drag"
        >
          <mdui-dropdown>
            <mdui-button-icon slot="trigger">
              <mdui-tooltip
                :content="
                  $t('Message.Components.DrawerNavigation.AppendFooter.InformationAboutThisSite')
                "
              >
                <mdi-icon icon="mdi-information-outline" />
              </mdui-tooltip>
            </mdui-button-icon>
            <mdui-menu>
              <div style="padding: 8px" class="copyright-div-menu">
                <!-- <h1>{{ $t('Message.Components.DrawerNavigation.AppendFooter.InformationAboutThisSite') }}</h1> -->
                <Copyright />
              </div>
            </mdui-menu>
          </mdui-dropdown>
        </div>
      </template>

      <template v-slot:navigation-bar-content>
        <mdui-navigation-bar-item
          :value="$G_UrlHeaderLang() + '/'"
          @click="$router.push($G_UrlHeaderLang() + '/')"
        >
          <mdi-icon slot="icon" icon="mdi-home"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Home') }}
        </mdui-navigation-bar-item>
        <mdui-navigation-bar-item
          :value="$G_UrlHeaderLang() + '/topics'"
          @click="$router.push($G_UrlHeaderLang() + '/topics')"
        >
          <mdi-icon slot="icon" icon="mdi-book"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Topics') }}
        </mdui-navigation-bar-item>
        <mdui-navigation-bar-item
          :value="$G_UrlHeaderLang() + '/questions'"
          @click="$router.push($G_UrlHeaderLang() + '/questions')"
        >
          <mdi-icon slot="icon" icon="mdi-forum"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Questions') }}
        </mdui-navigation-bar-item>

        <mdui-navigation-bar-item
          v-if="userStore.getIsLogin"
          :value="$G_UrlHeaderLang() + '/users/' + $G_GetUserID()"
          @click="$router.push($G_UrlHeaderLang() + '/users/' + $G_GetUserID())"
        >
          <mdi-icon slot="icon" icon="mdi-account-circle"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.PersonalData') }}
        </mdui-navigation-bar-item>
        <mdui-navigation-bar-item
          v-if="!userStore.getIsLogin"
          :value="$G_UrlHeaderLang() + '/users'"
          @click="$router.push($G_UrlHeaderLang() + '/users')"
        >
          <mdi-icon slot="icon" icon="mdi-account-multiple"></mdi-icon>
          {{ $t('Message.Components.DrawerNavigation.Users') }}
        </mdui-navigation-bar-item>
      </template>

      <NoAllowUse v-if="!AppIsCanUse()" />
      <router-view v-else style="animation: fadeIn 1s forwards !important; /* 添加淡入效果 */" />
      <!-- <keep-alive v-else>
      <router-view style="animation: fadeIn 1s forwards !important; /* 添加淡入效果 */"/>
    </keep-alive> -->
      <Login />
      <Register />
      <Reset />

      <FabDialogSearch
        :model="fabDialogStore.getSearchFabDialog.model"
        @model="
          (val) => {
            fabDialogStore.setSearchFabDialog({
              model: val,
            })
          }
        "
        :value="fabDialogStore.getSearchFabDialog.value"
      />

      <MDEditor
        :model="fabDialogStore.getEditorFabDialog.model"
        :title="fabDialogStore.getEditorFabDialog.title"
        :icon="fabDialogStore.getEditorFabDialog.icon"
        :has_title="fabDialogStore.getEditorFabDialog.has_title"
        :has_topic="fabDialogStore.getEditorFabDialog.has_topic"
        :submit_text="fabDialogStore.getEditorFabDialog.submit_text"
        :edit_type="fabDialogStore.getEditorFabDialog.edit_type"
        :edit_mode="fabDialogStore.getEditorFabDialog.edit_mode"
        :edit_mode_id="fabDialogStore.getEditorFabDialog.edit_mode_id"
        :answer_to_question_id="fabDialogStore.getEditorFabDialog.answer_to_question_id"
        :md_title="fabDialogStore.getEditorFabDialog.md_title"
        :md_topics="fabDialogStore.getEditorFabDialog.md_topics"
        :md_content="fabDialogStore.getEditorFabDialog.md_content"
        @model="
          (val) => {
            fabDialogStore.setEditorFabDialog({
              model: val,
            })
          }
        "
        @add_article="
          (article) => {
            $router.push(`${$G_UrlHeaderLang()}/articles/${article.article_id}`)
          }
        "
        @add_question="
          (question) => {
            $router.push(`${$G_UrlHeaderLang()}/questions/${question.question_id}`)
          }
        "
        @add_answer="
          (answer) => {
            updateStore.setAnswerUpdate(answer)
          }
        "
        @edit_article="
          (article) => {
            updateStore.setArticleUpdate(article)
          }
        "
        @edit_question="
          (question) => {
            updateStore.setQuestionUpdate(question)
          }
        "
        @edit_answer="
          (answer) => {
            updateStore.setAnswerUpdate(answer)
          }
        "
      />
      <TopicSelectorDialog
        :model="dialogStore.getTopicSelectorDialog"
        :pre_selected_topics="fabDialogStore.getEditorFabDialog.md_topics"
        @model="
          (model, selector_topics) => {
            dialogStore.setTopicSelectorDialog(model)
            fabDialogStore.setEditorFabDialog({
              md_topics: selector_topics,
            })
          }
        "
      />
      <TopicDialog
        :model="dialogStore.getTopicDialog.model"
        :mode="dialogStore.getTopicDialog.mode"
        :edit_topic="dialogStore.getTopicDialog.edit_topic"
        @add_topic="
          (topic) => {
            $router.push(`${UrlHeaderLang()}/topics/${topic.topic_id}`)
          }
        "
        @edit_topic="
          (topic) => {
            updateStore.setTopicUpdate(topic)
          }
        "
        @model="
          (val) => {
            dialogStore.setTopicDialog({
              model: val,
            })
          }
        "
      />
      <UsersDialog
        :id="dialogStore.getUsersDialog.id"
        :type="dialogStore.getUsersDialog.type"
        :modes="dialogStore.getUsersDialog.modes"
        :model="dialogStore.getUsersDialog.model"
        @model="
          (val) => {
            dialogStore.setUsersDialog({ model: val })
          }
        "
      />
      <CommentReplyEditDialog
        :model="dialogStore.getCommentReplyEditDialog.model"
        :title="dialogStore.getCommentReplyEditDialog.title"
        :type="dialogStore.getCommentReplyEditDialog.type"
        :edit_id="dialogStore.getCommentReplyEditDialog.edit_id"
        :content="dialogStore.getCommentReplyEditDialog.content"
        @edit_comment="
          (comment) => {
            updateStore.setCommentUpdate(comment)
          }
        "
        @edit_reply="
          (reply) => {
            updateStore.setReplyUpdate(reply)
          }
        "
        @model="
          (val) => {
            dialogStore.setCommentReplyEditDialog({
              model: val,
            })
          }
        "
      />
      <ReportDialog
        :model="dialogStore.getReportDialog.model"
        :item="dialogStore.getReportDialog.item"
        :type="dialogStore.getReportDialog.type"
        :report_preview_text="dialogStore.getReportDialog.report_preview_text"
        @model="
          (val) => {
            dialogStore.setReportDialog({
              model: val,
            })
          }
        "
      />
      <DeleteDialog
        :model="dialogStore.getDeleteDialog.model"
        :item="dialogStore.getDeleteDialog.item"
        :type="dialogStore.getDeleteDialog.type"
        :item_ids="dialogStore.getDeleteDialog.item_ids"
        :delete_preview_text="dialogStore.getDeleteDialog.delete_preview_text"
        @model="
          (val) => {
            dialogStore.setDeleteDialog({
              model: val,
            })
          }
        "
        @delete_topic="
          (topic) => {
            $router.push(`${$G_UrlHeaderLang()}/topics`)
          }
        "
        @delete_question="
          (question) => {
            $router.push(`${$G_UrlHeaderLang()}/questions`)
          }
        "
        @delete_article="
          (article) => {
            $router.push(`${$G_UrlHeaderLang()}/articles`)
          }
        "
        @delete_answer="
          (answer) => {
            updateStore.setAnswerUpdate(answer)
          }
        "
        @delete_comment="
          (comment) => {
            updateStore.setCommentUpdate(comment)
          }
        "
        @delete_user="(user) => {}"
        @delete_reply="
          (reply) => {
            updateStore.setReplyUpdate(reply)
          }
        "
        @delete_report="(report) => {}"
        @delete_user_group="(user_group) => {}"
        @delete_topics="(topics) => {}"
        @delete_questions="(questions) => {}"
        @delete_articles="(articles) => {}"
        @delete_answers="(answers) => {}"
        @delete_comments="(comments) => {}"
        @delete_users="(users) => {}"
        @delete_replys="(replys) => {}"
        @delete_reports="(reports) => {}"
        @delete_user_groups="(user_groups) => {}"
      />
      <EditInfoDialog
        :user="dialogStore.getEditInfoDialog.user"
        :model="dialogStore.getEditInfoDialog.model"
        @model="
          (val) =>
            dialogStore.setEditInfoDialog({
              model: val,
            })
        "
        @edit_user="
          (user) => {
            updateStore.setUserUpdate(user)
          }
        "
      />

      <CommentsDialog
        :title="dialogStore.getCommentDialog.title"
        :model="dialogStore.getCommentDialog.model"
        :external_loading="dialogStore.getCommentDialog.external_loading"
        :commentable_id="dialogStore.getCommentDialog.commentable_id"
        :commentable_type="dialogStore.getCommentDialog.commentable_type"
        :comment_count="dialogStore.getCommentDialog.comment_count"
        @close_comments_dialog="dialogStore.setCommentDialog({ model: false })"
        @return_update_comments="
          (comment) => {
            dialogStore.getCommentDialog.return_update_comments(comment)
          }
        "
      />

      <UseCookieDialog
        :model="dialogStore.getCookieUseDialog"
        @model="dialogStore.setCookieUseDialog(false)"
      />

      <!-- <Snackbar /> -->

      <!-- <Dialog
        :model="$store.getters['Dialog/GetDialog'].model"
        :title="$store.getters['Dialog/GetDialog'].title"
        :content="$store.getters['Dialog/GetDialog'].content"
        @model="$store.dispatch('Dialog/Set_Dialog', false)"
      /> -->
    </AppBody>
  </div>
</template>

<script>
import AppBody from '@/components/body.vue'

import Login from '@/components/account/login.vue'
import Register from '@/components/account/register.vue'
import Reset from '@/components/account/reset.vue'

import MDEditor from '@/components/md-editor/index.vue'
import NoAllowUse from '@/components/no-allow-use/index.vue'
import CustomInput from '@/components/custom-input/index.vue'
import ThemeButton from '@/components/theme-button/index.vue'
import LanguageButton from '@/components/language-button/index.vue'
import DeviceTypeButton from '@/components/device-type-button/index.vue'
import AppbarAvatarMenu from '@/components/appbar-avatar-menu/index.vue'
import LoginRegisterMenu from '@/components/login-register-menu/index.vue'
import NotificationButton from '@/components/notification-button/index.vue'
import FabDialogSearch from '@/components/fab-dialog/search-fab-dialog/index.vue'
import Copyright from '@/components/append-footer/components/copyright/index.vue'

// import Dialog from '@/components/dialog/index.vue'
import UsersDialog from '@/components/users-dialog/index.vue'
import TopicDialog from '@/components/topic-dialog/index.vue'
import CommentsDialog from '@/components/comments/dialog.vue'
import ReportDialog from '@/components/dialog/report-dialog/index.vue'
import DeleteDialog from '@/components/dialog/delete-dialog/index.vue'
import EditInfoDialog from '@/components/dialog/edit-info-dialog/index.vue'
import CommentReplyEditDialog from '@/components/dialog/comment-reply-edit-dialog/index.vue'
import TopicSelectorDialog from '@/components/md-editor/components/topic-selector-dialog/index.vue'

import UseCookieDialog from '@/components/dialog/use-cookie-dialog/index.vue'
// import Snackbar from '@/components/snackbar/index.vue'

// import WinHeader from '@/components/win-header/index.vue'

import { defineAsyncComponent, getCurrentInstance } from 'vue'

import {
  GetUserToken,
  IsTauri,
  IsElectron,
  IsMobileApp,
  AddActivity,
  // GetInfoData,
  GetAppBaseInfo,
} from '@/api/global.js'

import { useUserStore } from '@/stores/user'
import { useUpdateStore } from '@/stores/update'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog'
import { useMainStore } from '@/stores/main'
import { useLocalDataStore } from '@/stores/local-data'
export default {
  name: 'App',
  components: {
    AppBody,
    // WinHeader,

    // Login: defineAsyncComponent(() => import('@/components/account/login.vue')),
    // Register: defineAsyncComponent(() => import('@/components/account/register.vue')),
    // Reset: defineAsyncComponent(() => import('@/components/account/reset.vue')),

    // MDEditor: defineAsyncComponent(() => import('@/components/md-editor/index.vue')),
    // NoAllowUse: defineAsyncComponent(() => import('@/components/no-allow-use/index.vue')),
    // CustomInput: defineAsyncComponent(() => import('@/components/custom-input/index.vue')),
    // ThemeButton: defineAsyncComponent(() => import('@/components/theme-button/index.vue')),
    // LanguageButton: defineAsyncComponent(() => import('@/components/language-button/index.vue')),
    // DeviceTypeButton: defineAsyncComponent(() => import('@/components/device-type-button/index.vue')),
    // AppbarAvatarMenu: defineAsyncComponent(() => import('@/components/appbar-avatar-menu/index.vue')),
    // LoginRegisterMenu: defineAsyncComponent(() => import('@/components/login-register-menu/index.vue')),
    // NotificationButton: defineAsyncComponent(() => import('@/components/notification-button/index.vue')),
    // FabDialogSearch: defineAsyncComponent(() => import('@/components/fab-dialog/search-fab-dialog/index.vue')),
    // Copyright: defineAsyncComponent(() => import('@/components/append-footer/components/copyright/index.vue')),

    // UsersDialog: defineAsyncComponent(() => import('@/components/users-dialog/index.vue')),
    // TopicDialog: defineAsyncComponent(() => import('@/components/topic-dialog/index.vue')),
    // ReportDialog: defineAsyncComponent(() => import('@/components/dialog/report-dialog/index.vue')),
    // DeleteDialog: defineAsyncComponent(() => import('@/components/dialog/delete-dialog/index.vue')),
    // EditInfoDialog: defineAsyncComponent(() => import('@/components/dialog/edit-info-dialog/index.vue')),
    // CommentReplyEditDialog: defineAsyncComponent(() => import('@/components/dialog/comment-reply-edit-dialog/index.vue')),
    // TopicSelectorDialog: defineAsyncComponent(() => import('@/components/md-editor/components/topic-selector-dialog/index.vue')),

    Login,
    Register,
    Reset,

    MDEditor,
    NoAllowUse,
    CustomInput,
    ThemeButton,
    LanguageButton,
    DeviceTypeButton,
    AppbarAvatarMenu,
    LoginRegisterMenu,
    NotificationButton,
    FabDialogSearch,
    Copyright,

    // Dialog,
    UsersDialog,
    TopicDialog,
    CommentsDialog,
    ReportDialog,
    DeleteDialog,
    EditInfoDialog,
    CommentReplyEditDialog,
    TopicSelectorDialog,

    UseCookieDialog,
    // Snackbar,
  },
  data() {
    return {
      userStore: useUserStore(),
      updateStore: useUpdateStore(),
      dialogStore: useDialogStore(),
      fabDialogStore: useFabDialogStore(),
      mainStore: useMainStore(),
      localDataStore: useLocalDataStore(),
      search_appbar: false,
    }
  },
  computed: {
    IsTauri() {
      return IsTauri()
    },
    IsElectron() {
      return IsElectron()
    },
    IsMobileApp() {
      return IsMobileApp()
    },
  },
  methods: {
    //将时间：2026-06-18T08:06:45.000000Z转换为时间戳178177000的方法
    GetTimeStamp(time) {
      return Math.floor(new Date(time).getTime() / 1000)
    },
    async GetAppBaseInfoData() {
      const response = await GetAppBaseInfo({
        user_token: this.userStore?.getUser?.user_token,
      })
      // console.log(response)
      if (response.data.is_get) {
        this.mainStore.setAppBaseInfo({
          ...response.data.data,
        })
        this.mainStore.setInfoData({
          ...response.data.data.option_list,
        })
        // console.log(this.mainStore.getAppBaseInfo)
        //获取title标签
        document.title = this.mainStore.getInfoData.site_name
        //获取keywords标签
        document.querySelector('meta[name="keywords"]').content =
          this.mainStore.getInfoData.site_keywords
        //获取description标签
        document.querySelector('meta[name="description"]').content =
          this.mainStore.getInfoData.site_description
      }
    },
    openFancybox(src) {
      // 手动调用 Fancybox 打开图片
      this.$Fancybox.show([
        {
          src,
          type: 'image',
          caption: '图片预览', // 可选标题
        },
      ])
    },
    /**
     * 滚动到顶部
     */
    ToTop() {
      //获取main元素
      let main = document.querySelector('mdui-layout-main')
      //滚动到顶部
      main.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    // /**
    //  * 窗口大小调整事件
    //  */
    // OnResize() {
    //   //mdui 共包含 6 个断点，分别为：xs、sm、md、lg、xl、xxl
    //   this.navigation_drawer = true
    //   this.bp_smlg = this.breakpoints().between('sm', 'lg');
    //   this.bp_xssm = this.breakpoints().between('xs', 'sm');
    // },
    // /**
    //  * 判断当前断点是否仅为指定的断点
    //  * @param {string} value 断点名称
    //  * @return {boolean} 如果当前断点仅为指定的断点，返回 true，否则返回 false
    //  */
    // breakpointOnly(value) {
    //   return this.breakpoints().only(value);
    // },
    // /**
    //  * 判断当前断点是否在指定的断点范围内
    //  * @param {string} start 开始断点
    //  * @param {string} end 结束断点
    //  * @return {boolean} 如果当前断点在指定的断点范围内，返回 true，否则返回 false
    //  */
    // breakpointBetween(start, end) {
    //   return this.breakpoints().between(start, end);
    // },
    async AddActivity() {
      var domain = window.location.host //或者定制域名
      if (IsTauri() || IsElectron() || IsMobileApp()) {
        //打包专属app时使用
        domain = 'www.xbedrock.com'
      }
      var base64 = btoa(domain)
      // console.log('AddActivity-base64',base64)
      const response = await AddActivity({
        domain_name_base64: base64,
      })
      var value = parseInt(atob(response.data.v))
      var time = atob(response.data.t)
      var lang = JSON.parse(atob(response.data.l))
      this.mainStore.setAppVersionExpirationTime(time)
      this.mainStore.setAppAllowUseLangpack(lang)
      var now_time = Math.round(new Date().getTime() / 1000)
      console.log(value)
      if (value == 1) {
        this.mainStore.setAppAllowUse(true)
      } else {
        this.mainStore.setAppAllowUse(false)
      }
    },
    /**
     * @description: 获取设备类型 必须在此页面写死
     * @return {String} mobile | tablet | desktop
     */
    GetDeviceType() {
      var a = ''
      return a
    },
    /**
     * @description: 获取设备类型字符串 必须在此页面写死
     * @return {String} mobile | pad | pc
     */
    GetDeviceTypeString() {
      var userAgent = navigator.userAgent.toLowerCase()
      var type = ''
      if (userAgent.match(/mobile/i)) {
        type = 'mobile'
      } else if (
        userAgent.match(/ipad/i) ||
        userAgent.match(/android/i) ||
        userAgent.match(/pad/i) ||
        userAgent.match(/tablet/i)
      ) {
        type = 'tablet'
      } else {
        type = 'desktop'
      }
      return type
    },
    /**
     * @description: 设置滚动监听器 必须在此页面写死
     * @return {void}
     */
    SetScrollListener() {
      var _this = this
      const main = document.querySelector('mdui-layout-main')
      // console.log('main', main)
      const updateScrollValue = () => {
        var scrollHeight = main.scrollHeight - main.clientHeight
        var scrollTop = main.scrollTop

        var scrollPercent = (scrollTop / scrollHeight) * 100
        var a = parseInt(scrollPercent.toFixed(2))
        _this.mainStore.setScrollValue(a === 99 ? 100 : a)
      }
      if (main) {
        main.addEventListener('scroll', updateScrollValue)
      }
    },
    /**
     * @description: 设置背景图片 必须在此页面写死
     * @return {void}
     */
    SetBackgroundImage() {
      // const client = document.querySelector('#client')
      // client.style.backgroundImage = `url(${require('@/assets/images/panda.png')})`
      // client.style.backgroundSize = 'cover'
      // client.style.backgroundAttachment = 'fixed'
      // client.style.backgroundPosition = 'center center'
    },
    /**
     * @description: 设置背景颜色 必须在此页面写死
     * @return {void}
     */
    SetBackgroundColor() {
      // const html = document.querySelector('html');
      // if (this.$vuetify.theme.dark) {
      //   // html.style.backgroundColor = '#2d2d2d'
      //   html.style.backgroundColor = '#303030'
      // } else {
      //   html.style.backgroundColor = '#ffffff'
      // }
    },
    /**
     * @description: 获取url头部语言 必须在此页面写死
     * @return {String} /zh | /en
     */
    UrlHeaderLang() {
      return this.$route.params.lang ? `/${this.$route.params.lang}` : ''
    },
    /**
     * @description: 路由文本替换 必须在此页面写死
     * @param {String} route
     * @return {String}
     */
    RouteText(route) {
      if (route.indexOf('%user_id') != -1) {
        return route.replace('%user_id', this.$G_GetUserID())
      }
      return route
    },
    /**
     * @description: 获取用户token 必须在此页面写死
     * @return {String}
     */
    GetUserToken() {
      var token = this.userStore.getUserToken || GetUserToken()
      return token
    },
    /**
     * @description: 跨域处理 必须在此页面写死
     * @return {String}
     */
    CrossDomain() {
      return this.$axios.defaults.baseURL == undefined ? '' : this.$axios.defaults.baseURL
      // return GetBaseUrl()
    },
    /**
     * @description: 图片处理 必须在此页面写死
     * @param {String} url
     * @return {String}
     */
    ImgHandle(url) {
      //如果url以/public开头，去掉/public。兼容laravel的public目录。
      if (url.indexOf('/public') == 0) {
        url = url.replace('/public', '')
      }

      return `${this.CrossDomain()}${url}`
    },
    /**
     * @description: 是否有效 必须在此页面写死
     * @param {String} value
     * @return {Boolean}
     */
    IsVaild(value) {
      return value != undefined && value != null && value != ''
    },
    /**
     * @description: 过滤相同项 必须在此页面写死
     * @param {String} name
     * @param {Array} source_item
     * @param {Array} items
     * @return {Array}
     */
    FilterSameItems(name, source_item, items) {
      var cache = source_item
      items.forEach((item, index) => {
        var index = source_item.findIndex((item2) => item2[name] === item[name])
        var isExist = index !== -1
        if (!isExist) {
          cache.push(item)
        }
      })
      return cache
    },
    /**
     * @description: 用户端智能判断时间戳 必须在此页面写死
     * @param {Number} timestamp
     * @return {String}
     */
    UserTimeStampToDateTime(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()

      // 计算时间差（秒）
      const diffSeconds = Math.floor((now - date) / 1000)

      // 1小时内显示分钟前
      if (diffSeconds < 3600) {
        return diffSeconds < 60
          ? this.$t('Message.App.Just')
          : this.$t('Message.App.NMinutesAgo', {
              value: Math.floor(diffSeconds / 60),
            })
        // `${Math.floor(diffSeconds / 60)}分钟前`;
      }

      // 今天（精确到时分秒）
      // if (date.toDateString() === now.toDateString()) {
      //   return [
      //     String(date.getHours()).padStart(2, '0'),
      //     String(date.getMinutes()).padStart(2, '0'),
      //     String(date.getSeconds()).padStart(2, '0')
      //   ].join(':');
      // }
      // 今天（精确到时分）
      if (date.toDateString() === now.toDateString()) {
        return [
          String(date.getHours()).padStart(2, '0'),
          String(date.getMinutes()).padStart(2, '0'),
        ].join(':')
      }

      // 昨天
      const yesterday = new Date(now)
      yesterday.setDate(now.getDate() - 1)
      if (date.toDateString() === yesterday.toDateString()) {
        return this.$t('Message.App.Yesterday')
      }

      // 今年（月/日）
      if (date.getFullYear() === now.getFullYear()) {
        return [
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ].join('/')
      }

      // 去年（月-日）
      if (date.getFullYear() === now.getFullYear() - 1) {
        return [
          this.$t('Message.App.LastYear'),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ].join('-')
      }

      // 更早（年-月-日）
      return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-')
    },
    /**
     * @description: 管理端时间戳转日期时间 必须在此页面写死
     * @param {Number} timestamp
     * @return {String}
     */
    AdminTimeStampToDateTime(timestamp) {
      var date = new Date(timestamp)
      var now = new Date()
      var yearDiff = now.getFullYear() - date.getFullYear()
      var monthDiff = now.getMonth() - date.getMonth()
      var dayDiff = now.getDate() - date.getDate()
      //如果是今天，则返回时分秒
      if (yearDiff === 0 && monthDiff === 0 && dayDiff === 0) {
        return date.toLocaleTimeString()
      }
      //如果是今年，则返回月/日 时分秒
      else if (yearDiff === 0 && monthDiff === 0) {
        var formattedDate =
          date.getMonth() + 1 + '-' + date.getDate() + ' ' + date.toLocaleTimeString()
        return formattedDate
      }
      //如果不是今年，则返回 年-月-日 时分秒
      else {
        var formattedDate =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate() +
          ' ' +
          date.toLocaleTimeString()
        return formattedDate
      }
    },
    /**
     * @description: 更新网页标题和应用栏副标题 必须在此页面写死
     * @param {String} title 网页的 左边标题 - 网站名称
     * @param {String} appbar_subtitle 应用栏的副标题
     * @return {void}
     */
    UpdateWebTitleAndAppbarSubTitle(title, appbar_subtitle = '') {
      const titlehtml = document.querySelector('title')

      // this.$store.dispatch(
      //   'Set_CacheWebLeftTitle',
      //   title || this.mainStore.getAppBaseInfo.site_name,
      // )

      this.mainStore.setAppbarSubtitle(appbar_subtitle || this.mainStore.getAppbarSubtitle)

      titlehtml.innerHTML = `${title} - ${this.mainStore.getAppBaseInfo.option_list?.site_name || ''}`
    },
    GetUserID() {
      if (this.userStore.getIsLogin) {
        return this.userStore.getUser.user_id
      } else {
        return 0
      }
    },
    AppIsCanUse() {
      return (
        this.mainStore.getAppAllowUse &&
        this.mainStore.getAppVersionExpirationTime > Math.round(new Date().getTime() / 1000)
      )
    },
  },
  created() {
    // 获取应用基本信息
    this.GetAppBaseInfoData()
    //获取当前实例来挂载全局方法
    const instance = getCurrentInstance()
    if (instance) {
      instance.appContext.config.globalProperties.$G_UrlHeaderLang = this.UrlHeaderLang
      instance.appContext.config.globalProperties.$G_RouteText = this.RouteText
      instance.appContext.config.globalProperties.$G_GetUserToken = this.GetUserToken
      instance.appContext.config.globalProperties.$G_CrossDomain = this.CrossDomain
      instance.appContext.config.globalProperties.$G_ImgHandle = this.ImgHandle
      instance.appContext.config.globalProperties.$G_IsVaild = this.IsVaild
      instance.appContext.config.globalProperties.$G_FilterSameItems = this.FilterSameItems
      instance.appContext.config.globalProperties.$G_UserTimeStampToDateTime =
        this.UserTimeStampToDateTime
      instance.appContext.config.globalProperties.$G_AdminTimeStampToDateTime =
        this.AdminTimeStampToDateTime
      instance.appContext.config.globalProperties.$G_UpdateWebTitleAndAppbarSubTitle =
        this.UpdateWebTitleAndAppbarSubTitle
      instance.appContext.config.globalProperties.$G_GetUserID = this.GetUserID
      instance.appContext.config.globalProperties.$G_AppIsCanUse = this.AppIsCanUse
      instance.appContext.config.globalProperties.$G_GetTimeStamp = this.GetTimeStamp
    }

    // this.AddActivity()

    //添加远程script
    const script = document.createElement('script')
    script.src = 'https://www.xbedrock.com/mdui2.js'
    script.async = true
    document.head.appendChild(script)
  },
  mounted() {
    // 初始化 Fancybox（必须！）
    this.$Fancybox.bind('[data-fancybox]', {
      // 可选配置项
      infinite: true,
      keyboard: true,
    })
    if (IsElectron()) {
      //如果当前路由是/
      if (this.$route.path != '/') {
        this.$router.push('/')
      }
    }
    const _this = this
    this.$axios.interceptors.response.use(
      function (response) {
        // Do something with response data
        // console.log('拦截请求')
        if (response.data.snackbar) {
          // _this.$store.dispatch('Snackbar/Show_Snackbar', {
          //   text: _this.$t(response.data.snackbar),
          // })
        }
        if (response.data.error) {
          // _this.$store.dispatch('Dialog/Set_Dialog', {
          //   model: true,
          //   title: 'Error',
          //   content: response.data.error,
          // })
        }
        return response
      },
      function (error) {
        // Do something with response error
        return Promise.reject(error)
      },
    )
    // // 获取应用基本信息
    // this.GetAppBaseInfoData()
  },
  watch: {
    $route() {
      // this.mainStore.setReadTitle( '')
      this.mainStore.setReadTitle('')
    },
    search_appbar(val) {
      if (!val) {
        this.fabDialogStore.setSearchFabDialog({
          value: false,
          model: 'close',
        })
      }
    },
  },
}
</script>
<style lang="less">
.flex-grow {
  flex-grow: 1;
}

// * {
//   transition: background-color 1s ease;
// }

body {
  margin: 0;
}

/* 定义滚动条的宽度和圆角 */
::-webkit-scrollbar {
  width: 6px !important;
  border-radius: 100px !important;
}

/* 定义滚动条轨道的背景色 */
::-webkit-scrollbar-track {
  background-color: #00000000 !important;
}

/* 定义滚动条滑块的样式 */
::-webkit-scrollbar-thumb {
  background-color: #c1c1c1 !important;
  /* //background-color: var(--custom-theme-primary) !important; */
  border-radius: 3px !important;
  transition: width 0.2s !important;

  /* 添加过渡效果 */
  .mdui-theme-dark & {
    background-color: #707070 !important;
  }
}

/* .appbar-search-text-field>.container{
  height: 40px;

} */

.copyright-components {
  p {
    margin: 0;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.38) !important;
    font-size: 13px;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;

    .mdui-theme-dark & {
      color: rgba(255, 255, 255, 0.38) !important;
    }
  }

  a {
    color: rgba(0, 0, 0, 0.52) !important;
    text-decoration: none;

    .mdui-theme-dark & {
      color: rgba(255, 255, 255, 0.52) !important;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
