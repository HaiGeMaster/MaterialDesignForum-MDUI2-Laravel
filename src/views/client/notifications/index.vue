<template>
  <div>
    <div id="page-notifications" v-if="userStore.getIsLogin">
      <div style="display: flex; margin: 16px">
        <h3 style="margin: auto">
          {{ $t('Message.Components.NoticeButton.Notice') }}
        </h3>

        <div class="flex-grow" />

        <!-- <mdui-button-icon
          @click="DeleteAllNotifications"
          v-show="notification_pagination.total > 0"
        >
          <mdi-icon icon="mdi-bell-remove" />
        </mdui-button-icon>

        <mdui-button-icon @click="$router.push(`${$G_UrlHeaderLang()}/notifications/setting`)">
          <mdi-icon icon="mdi-bell-cog" />
        </mdui-button-icon> -->

        <mdui-dropdown>
          <mdui-button-icon slot="trigger"
            ><mdi-icon icon="mdi-dots-vertical"></mdi-icon
          ></mdui-button-icon>
          <mdui-menu>
            <mdui-menu-item
              @click="DeleteAllNotifications"
              v-show="notification_pagination.total > 0"
              >{{ $t('Message.Client.Notification.ClearAllNotifications') }}</mdui-menu-item
            >
            <mdui-menu-item @click="$router.push(`${$G_UrlHeaderLang()}/notifications/setting`)">{{
              $t('Message.Client.Notification.NotificationSetting')
            }}</mdui-menu-item>
          </mdui-menu>
        </mdui-dropdown>
      </div>

      <div style="margin: 16px">
        <!-- <mdui-card v-if="notification_data" v-for="item in notification_data" :key="item.notification_id"
        @click="$router.push(SpawnLink(item))" :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
        style="width: 100%;"> -->

        <!-- <mdui-list-item :headline="item.sender_user.username" headline-line="1" description-line="2" class="notification-item">
          <UserPopover slot="icon" :user="item.sender_user" />
          <div slot="description">
            <span>
              <p>
                {{
        $t(`Message.Client.Notifications.Type.${item.type}`,
          {
            value: '',
          }
        )
      }}:
                <span style="font-weight: 800;">
                  {{
          `${item.receiver_content.length > 10 ? item.receiver_content.substring(0, 10) + '...' :
            item.receiver_content}`
        }}
                </span>
              </p>
              <p>
                "{{
          `${item.sender_content.length > 30 ? item.sender_content.substring(0, 30) + '...' : item.sender_content}`
        }}"
              </p>
            </span>
          </div>
          <mdui-button slot="end-icon" variant="tonal">
            {{ $G_UserTimeStampToDateTime(item.create_time) }}
            <mdi-icon slot="end-icon" :icon="SpawnIcon(item)" />
          </mdui-button>
        </mdui-list-item> -->

        <!-- <mdui-list-item alignment="start" description-line="2" :headline="item.sender_user.username">
          <UserPopover slot="icon" :user="item.sender_user" />
          <span slot="description">
            <p>
              {{
                $t(`Message.Client.Notifications.Type.${item.type}`,
                  {
                    value: '',
                  }
                )
              }}
              <span style="font-weight: 800;" v-if="item.receiver_content">
                {{ item.receiver_content }}

              </span>
            </p>
            <p v-if="item.sender_content">
              {{ $t(item.sender_content) }}
            </p>
          </span>
          <mdui-button slot="end-icon" variant="tonal">
            {{ $G_UserTimeStampToDateTime(item.create_time) }}
            <mdi-icon slot="end-icon" :icon="SpawnIcon(item)" />
          </mdui-button>
        </mdui-list-item>

      </mdui-card> -->

        <NotificationItem
          v-if="notification_data"
          v-for="item in notification_data"
          :key="item.notification_id"
          :item="item"
        />

        <NotificationItemSkeleton v-if="notification_is_loading" v-for="i in 20" />
      </div>

      <Loading
        :empty="notification_data == null"
        :loading="notification_is_loading"
        :pagination="notification_pagination"
        @autoload="GetUserInteractionNotifications"
      />
    </div>
    <NeedLoginAccess v-else />
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {
  GetUserInteractionNotifications,
  DeleteNotification,
  DeleteAllNotifications,
} from '@/api/global.js'
import ListItem from '@/components/list-item/index.vue'
import Loading from '@/components/loading/index.vue'
import UserPopover from '@/components/user-popover/index.vue'
import NotificationItem from '@/components/notification-item/index.vue'
import NotificationItemSkeleton from '@/components/notification-item-skeleton/index.vue'
import NeedLoginAccess from '@/components/need-login-access/index.vue'

export default {
  name: 'notifications-page',
  components: {
    ListItem,
    Loading,
    UserPopover,
    NotificationItem,
    NotificationItemSkeleton,
    NeedLoginAccess,
  },
  data: () => ({
    userStore: useUserStore(),
    tab_item: 'system',
    notification_is_loading: false,
    notification_data: null,
    notification_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1,
    },
  }),
  computed: {},
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'notifications' || val.name == 'lang-notifications') {
        if (val.hash == '#system' || val.hash == '') {
          this.GetUserInteractionNotifications()
          this.tab_item = 'system'
        } else if (val.hash == '#user_group') {
          this.tab_item = 'user_group'
        } else if (val.hash == '#private_message') {
          this.tab_item = 'private_message'
        }
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'notifications' || val.name == 'lang-notifications') {
        if (val.hash == '#system' || val.hash == '') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Notifications.SystemNotifications'),
            this.$t('Message.Client.Notifications.WebSubTitle'),
          )
        } else if (val.hash == '#user_group') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Notifications.UserGroupNotifications'),
            this.$t('Message.Client.Notifications.WebSubTitle'),
          )
        } else if (val.hash == '#private_message') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Notifications.PrivateMessageNotifications'),
            this.$t('Message.Client.Notifications.WebSubTitle'),
          )
        }
      }
    },
    async GetUserInteractionNotifications() {
      this.notification_is_loading = true
      const response = await GetUserInteractionNotifications({
        user_token: this.$G_GetUserToken(),
        order: '-create_time',
        page: this.notification_pagination.next,
        per_page: this.notification_pagination.per_page,
      })
      console.log('response', response.data)
      if (response.data.is_get) {
        this.notification_data == null
          ? (this.notification_data = response.data.data)
          : this.$G_FilterSameItems('notification_id', this.notification_data, response.data.data)
        // this.notification_data = response.data.data
        this.notification_pagination = response.data.pagination
        this.notification_is_loading = false
        this.$forceUpdate()
      } else {
        this.notification_is_loading = false
      }
    },
    // async DeleteNotification(item) {
    //   const response = await DeleteNotification({
    //     user_token: this.$G_GetUserToken(),
    //     notification_id: item.notification_id,
    //   })
    //   console.log('response', response.data)
    //   if (response.data.is_delete) {
    //     this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteSuccess'))
    //     this.$G_FilterSameItems('notification_id', this.notification_data, response.data.notification)
    //     this.$forceUpdate()
    //   } else {
    //     this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteFailed'))
    //   }
    // },
    async DeleteAllNotifications() {
      const response = await DeleteAllNotifications({
        user_token: this.$G_GetUserToken(),
      })
      console.log('response', response.data)
      if (response.data.is_delete) {
        // this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteAllSuccess'))
        this.notification_data = null
        this.$forceUpdate()
        this.ResetData()
        this.GetUserInteractionNotifications()
      } else {
        // this.$G_ShowSnackbar(this.$t('Message.Client.Notifications.DeleteAllFailed'))
      }
    },
    SpawnLink(item) {
      switch (item.type) {
        case 'user_follow':
          return `${this.$G_UrlHeaderLang()}/users/${item.sender_user.user_id}`
        case 'topic_follow':
        case 'topic_delete':
          return `${this.$G_UrlHeaderLang()}/topics/${item.topic_id}`
        case 'question_follow':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'question_comment':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'question_answer':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'question_delete':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'article_follow':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'article_comment':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'article_like':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'article_delete':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
        case 'answer_comment':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
        case 'answer_like':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
        case 'answer_delete':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`
        case 'comment_like':
          console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'comment_reply':
          console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'comment_delete':
          console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'reply_like':
          console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'reply_reply':
          console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'reply_delete':
          console.log('item.comment.commentable_type', item.comment.commentable_type)
          switch (item.comment.commentable_type) {
            case 'question':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
            case 'article':
              return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
            case 'answer':
              return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.comment_id}`
            default:
              return `${this.$G_UrlHeaderLang()}`
          }
        case 'follow_user_update':
          // return `${this.$G_UrlHeaderLang()}/users/${item.sender_user.user_id}`
          if (item.article_id != 0) {
            return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
          } else if (item.question_id != 0) {
            return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
          } else {
            return `${this.$G_UrlHeaderLang()}/users/${item.sender_user.user_id}`
          }
        case 'follow_topic_update':
          // return `${this.$G_UrlHeaderLang()}/topics/${item.topic_id}`
          if (item.article_id != 0) {
            return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
          } else if (item.question_id != 0) {
            return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
          } else {
            return `${this.$G_UrlHeaderLang()}/topics/${item.topic_id}`
          }
        case 'follow_question_update':
          return `${this.$G_UrlHeaderLang()}/questions/${item.question_id}`
        case 'follow_article_update':
          return `${this.$G_UrlHeaderLang()}/articles/${item.article_id}`
      }
    },
    SpawnIcon(item) {
      switch (item.type) {
        case 'user_follow':
          return 'mdi-account'
        case 'topic_follow':
        case 'topic_delete':
          return 'mdi-book-variant'
        case 'question_follow':
          return 'mdi-forum'
        case 'question_comment':
          return 'mdi-forum'
        case 'question_answer':
          return 'mdi-forum'
        case 'question_delete':
          return 'mdi-forum'
        case 'article_follow':
          return 'mdi-file-document'
        case 'article_comment':
          return 'mdi-file-document'
        case 'article_like':
          return 'mdi-thumb-up'
        case 'article_delete':
          return 'mdi-file-document'
        case 'answer_comment':
          return 'mdi-message-reply'
        case 'answer_like':
          return 'mdi-thumb-up'
        case 'answer_delete':
          return 'mdi-message-reply'
        case 'comment_like':
          return 'mdi-thumb-up'
        case 'comment_reply':
          return 'mdi-message-reply-text'
        case 'comment_delete':
          return 'mdi-message-reply-text'
        case 'reply_like':
          return 'mdi-thumb-up'
        case 'reply_reply':
          return 'mdi-reply-all'
        case 'reply_delete':
          return 'mdi-reply-all'
        case 'follow_user_update':
          return 'mdi-star'
        case 'follow_topic_update':
          return 'mdi-star'
        case 'follow_question_update':
          return 'mdi-star'
        case 'follow_article_update':
          return 'mdi-star'
      }
    },
  },
  created() {
    this.UpdateTabItems(this.$route)
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  computed: {
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    },
  },
  watch: {
    $route(val) {
      this.UpdateTabItems(this.$route)
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
        this.UpdateWebTitleAndAppbarSubTitle(this.$route)
      }
    },
  },
}
</script>
<style lang="less">
@import '../questions/index.less';

// .notification-item {
//   .user-popover-badge {
//     top: 36px;
//   }
// }
</style>
