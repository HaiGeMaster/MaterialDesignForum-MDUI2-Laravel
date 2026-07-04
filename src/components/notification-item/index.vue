<template>

  <mdui-card 
    @click="$router.push(SpawnLink(item))" :variant="$store.getters.GetDark ? 'filled' : 'elevated'"
    style="width: 100%;">
<!-- alignment="start"  -->
    <mdui-list-item alignment="start" description-line="2" :headline="item.sender_user.username">
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

  </mdui-card>
</template>
<script>
import UserPopover from '@/components/user-popover/index.vue'
export default {
  name: 'notification-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    UserPopover,
  },
  data: () => ({
    mouseover: false,
  }),
  methods: {
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
  }
}
</script>