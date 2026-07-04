<template>
  <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'"
  style="width: 100%;" :class="[
    classes,
    'item'
  ]" elevation="0" v-if="comment != null">
    <UserLine :user="comment.user" :time="$G_UserTimeStampToDateTime(comment.update_time)" />
    <div class="content">
      {{ comment.content }}
    </div>
    <div class="actions">
      <VoteButton :vote="comment.vote" 
        :vote_up_count="comment.vote_up_count" 
        :vote_down_count="comment.vote_down_count"
      />
      <div style="margin-left: 8px;"></div>
      

      <mdui-tooltip :content="$t('Message.Components.Comments.Item.Reply')" placement="bottom">
        <mdui-button-icon
          @click="new_comment_or_reply_show = !new_comment_or_reply_show">
          <mdi-icon icon="mdi-reply" 
          />
        </mdui-button-icon>
      </mdui-tooltip>

      <div class="flex-grow"></div>
      <OptionsButton 
       type="comment" :item="comment" />
    </div>
    <NewCommentOrReply 
      :show="new_comment_or_reply_show" 
      :new_comment_reply_need_glass_container="false"
      :replyable_id="comment.comment_id" 
      replyable_type="comment" 
      :replyable_comment_id="comment.comment_id"
      :replyable_user_id="comment.user.user_id"
      :label="$t('Message.Components.Comments.NewCommentOrReply.WriteYourReply')" 
      @add_reply="add_reply" 
    />
    <mdui-button v-if="comment.reply_count != 0"
      variant="text" 
      :loading="is_loading" 
      :class="[
      'reply_count',
      {
        'show-replies': show_replies,
      }
    ]" @click="show_replies = !show_replies">
      
      <mdi-icon slot="icon" :icon="
        show_replies
        ? 'mdi-menu-up'
        : 'mdi-menu-down'
      " />
      
        {{
          show_replies
          ? $t('Message.Components.Comments.Item.CollapseReply')
          : $t('Message.Components.Comments.Item.ViewNReplies',{value:comment.reply_count})
        }}
      
    </mdui-button>

    <!-- style="max-height: 300px;overflow: auto;" -->
    <div v-if="data != null" class="replies" v-show="show_replies" >

      
        
          
          <Reply v-for="(item, index) in data" :reply="item" :comment="comment" @add_reply="add_reply"  />
        
      

      <mdui-button :class="['reply_more']" v-if="pagination.next != null" @click="GetReplys()">
        
        <mdi-icon slot="icon" icon="mdi-subdirectory-arrow-right" />
        <span>
          {{ $t('Message.Components.Comments.Item.ShowMoreReplies') }}
          {{ `(${data.length}/${pagination.total})` }}
        </span>
      </mdui-button>
    </div>
  </mdui-card>
</template>
<script>
import UserLine from '@/components/user-line/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import Reply from '../reply-item/index.vue'
import NewCommentOrReply from '../new-comment-or-reply/index.vue'
import {
  GetReplys
} from '@/api/global.js'
export default {
  name: 'comments-item',
  props: {
    classes: {
      type: String,
      default: 'glass-container'
    },
    comment: {
      type: Object,
      default: null,
    },
  },
  components: {
    UserLine,
    VoteButton,
        OptionsButton,
    Reply,
    NewCommentOrReply,
  },
  data() {
    return {
                        show_replies: false,
      new_comment_or_reply_show: false,
      is_loading: false,
      data: null,
      pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
      order: '-update_time',
    }
  },
  computed: {
    ReturnUpdateGetReplyUpdate() {
      return this.$store.getters['Update/GetReplyUpdate']
    }
  },
  methods: {
        //   this.editDialog_id = item.comment_id
    //   this.editDialog_content = item.content
            add_reply(reply) {
      this.new_comment_or_reply_show = false
      if (this.data == null) {
        this.GetReplys()
        this.show_replies = true
      } else {
        this.data.unshift(reply)
      }
      this.$emit('update_comment_reply_count', this.pagination.total)
      this.$forceUpdate()
    },
    async GetReplys() {
      this.is_loading = true
      const response = await GetReplys({
        replyable_comment_id: this.comment.comment_id,
        order: this.order,
        page: this.pagination.next,
                user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('comment_id', this.data, response.data.data)
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('reply_id', this.data, response.data.data)
        this.pagination = response.data.pagination
        this.is_loading = false
      } else {
        this.is_loading = false
      }
    },
    ResetData() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    },
  },
  watch: {
    show_replies(val) {
      if (val == true) {
        this.GetReplys()
      }else{
        this.ResetData()
      }
    },
    ReturnUpdateGetReplyUpdate(val) {
            if (val.replyable_comment_id == this.comment.comment_id) {
        this.ResetData()
        this.GetReplys()
      }
    },
  }
}
</script>
<style lang="less">
@import "../../../../vendor/variable.less";
@import "../../../../components/answers/components/item/style.less";
.mc-comments .item {
  border-radius: 0;
  .content {
    line-height: 1.6;
  }
  .actions>.mc-icon-button {
    margin-left: 8px;
    i {
      font-size: 22px;
    }
  }
  .reply_count,
  .reply_more {
    display: inline-block;
    height: 24px;
        line-height: 24px;
    cursor: pointer;
    i {
      float: left;
      transition: transform .3s;
    }
    span {
      font-size: 14px;
    }
    .mdui-theme-dark & {
          }
  }
  .reply_more {
    i {
      margin-right: 3px;
      font-size: 20px;
    }
  }
  .show-replies {
    i {
      transform: rotate(180deg);
    }
  }
}
</style>