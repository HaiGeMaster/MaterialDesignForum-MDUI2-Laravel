<template>
  <div class="item reply" v-if="reply != null">
    <UserLine
      :user="reply.user"
      :is_reply="reply.replyable_user != null && reply.replyable_type == 'reply'"
      :reply_user="reply.replyable_user"
      :time="$G_UserTimeStampToDateTime(reply.update_time)"
      :small_avatar="true"
    />
    <div class="content">{{ reply.content }}</div>
    <div class="actions">
      <VoteButton
        :vote="reply.vote"
        :vote_up_count="reply.vote_up_count"
        :vote_down_count="reply.vote_down_count"
      />

      <mdui-tooltip :content="$t('Message.Components.Comments.Item.Reply')" placement="bottom">
        <mdui-button-icon @click="new_comment_or_reply_show = !new_comment_or_reply_show">
          <mdi-icon icon="mdi-reply" />
        </mdui-button-icon>
      </mdui-tooltip>

      <div class="flex-grow"></div>
      <OptionsButton v-if="reply != null" type="reply" :item="reply" />
    </div>

    <NewCommentOrReply
      v-if="reply != null"
      :show="new_comment_or_reply_show"
      :new_comment_reply_need_glass_container="false"
      :replyable_id="reply.reply_id"
      :replyable_type="
        reply.replyable_user != null || reply.replyable_type == 'comment' ? 'reply' : 'comment'
      "
      :replyable_user_id="reply.user.user_id"
      :replyable_comment_id="
        reply.replyable_type == 'comment' ? reply.replyable_id : comment.comment_id
      "
      :label="$t('Message.Components.Comments.Item.ReplyTo', { value: reply.user.username })"
      @add_reply="add_reply"
    />
  </div>
</template>

<script>
import { useUpdateStore } from '@/stores/update'
import UserLine from '@/components/user-line/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'

//回复-对-回复可能存在问题
import NewCommentOrReply from '@/components/comments/components/new-comment-or-reply/index.vue'

//由于 回复对回复 回导致数据库逻辑太乱，所以不可以对回复进行回复
export default {
  name: 'comments-reply',
  components: {
    UserLine,
    VoteButton,
    OptionsButton,
    NewCommentOrReply,
  },
  props: {
    reply: {
      type: Object,
    },
    comment: {
      type: Object,
    },
  },
  computed: {
    ReturnUpdateGetReplyUpdate() {
      return this.updateStore.GetReplyUpdate
    },
  },
  data() {
    return {
      updateStore: useUpdateStore(),
      editDialog: false,
      editDialog_id: 0,
      editDialog_content: '',
      new_comment_or_reply_show: false,
      local_reply: null,
      local_comment: null,
    }
  },
  methods: {
    //   this.editDialog_id = item.reply_id
    //   this.editDialog_content = item.content
    add_reply(reply) {
      this.new_comment_or_reply_show = false
      this.$emit('add_reply', reply)
    },
  },
  created() {
    // this.local_reply = this.reply
    // this.local_comment = this.comment
  },
  watch: {
    ReturnUpdateGetReplyUpdate(val) {
      if (val.reply_id == this.reply.reply_id) {
        // console.log('reply_id', val.reply_id)
        this.reply = val
        this.$forceUpdate()
      }
    },
  },
}
</script>
<style lang="less">
@import '../../../../vendor/variable.less';

.mc-comments .item .item {
  border-left: 3px solid #e0e0e0;
  padding-right: 0;
  border-bottom: none;

  .mdui-theme-dark & {
    border-left: 3px solid #424242;
  }

  .mc-user-line {
    height: 24px;

    .avatar {
      width: 24px;
      height: 24px;
      background-size: 24px 24px;
    }

    .username {
      margin-left: 16px;
      line-height: 24px;
    }

    .headline {
      display: none;
    }
  }

  .content {
    padding-top: 26px;
  }

  .content,
  .actions {
    padding-left: 40px;
  }

  @media (max-width: 849px) {
    padding-left: 40px;

    .content,
    .actions {
      padding-left: 0;
    }
  }

  @media (max-width: @screen-xs-max) {
    padding-right: 0;
    padding-left: 40px;
  }
}
</style>
