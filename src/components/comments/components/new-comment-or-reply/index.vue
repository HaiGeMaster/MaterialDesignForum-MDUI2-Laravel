<template>
  

  
  <mdui-card :class="[
    'new-comment',
    {
      'rounded-xxl': dialog_mode && !$store.getters.GetMobile,
      'rounded-t-xxl': !dialog_mode && !$store.getters.GetMobile,
      'rounded-0': $store.getters.GetMobile,
      'glass-container': new_comment_reply_need_glass_container,
      'layout-colourless': !new_comment_reply_need_glass_container,
    }
  ]" key="new-comment" v-show="show" :elevation="new_comment_reply_elevation"
  variant="filled"
  >
    

    

    <mdui-text-field variant="outlined"   @focus="$emit('on_focus')" @blur="$emit('on_blur')"
      :label="label || $t('Message.Components.Comments.NewCommentOrReply.WriteYourComment')" :value="SubmitText"
      @input="SubmitText = $event.target.value"
      style="padding-top: 16px !important;"
      >
    </mdui-text-field>
    

    <mdui-button :class="['submit']" :loading="is_loading" @click="OnSubmit()" style="margin-bottom: 8px;">
      {{ Submitting ? $t('Message.Components.Comments.NewCommentOrReply.Publlishing') :
    $t('Message.Components.Comments.NewCommentOrReply.Publish') }}
    </mdui-button>
  </mdui-card>
</template>
<script>
import {
  AddComment,
  AddReply
} from '@/api/global.js';
export default {
  name: 'new-comment-reply',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: '',
    },
    new_comment_reply_need_glass_container: {
      type: Boolean,
      default: true,
    },
    new_comment_reply_rounded_t_or_b: {
      type: String,
      default: 't',
    },
    new_comment_reply_elevation: {
      type: String,
      default: '0',
    },
    commentable_type: {
      type: String,
      default: '',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    replyable_type: {
      type: String,
      default: '',
    },
    replyable_id: {
      type: Number,
      default: 0,
    },
    replyable_user_id: {
      type: Number,
      default: 0,
    },
    replyable_comment_id: {
      type: Number,
      default: 0,
    },
    dialog_mode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      SubmitText: '',
      Submitting: false,
      is_loading: false,
    }
  },
  methods: {
    OnSubmit() {
      if (!this.$store.getters['User/GetIsLogin']) {
        this.$store.dispatch('Dialog/Set_LoginDialog', true)
        this.$store.dispatch('Snackbar/Show_Snackbar', {
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      if (this.commentable_type == 'question' || this.commentable_type == 'answer' || this.commentable_type == 'article') {
        this.AddComment()
      } else if (this.replyable_type == 'comment' || this.replyable_type == 'reply') {
        this.AddReply()
      }
    },
    async AddComment() {
      this.is_loading = true
      const response = await AddComment({
        commentable_id: this.commentable_id,
        commentable_type: this.commentable_type,
        content: this.SubmitText,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_add == true) {
        this.is_loading = false
        this.SubmitText = ''
        this.$emit('return_update_comments', response.data.comment)
      } else {
        this.is_loading = false
        this.IsEmpty = true
      }
    },
    async AddReply() {
      this.is_loading = true
      const response = await AddReply({
        replyable_id: this.replyable_id,
        replyable_type: this.replyable_type,
        content: this.SubmitText,
        user_token: this.$G_GetUserToken(),
        replyable_user_id: this.replyable_user_id,
        replyable_comment_id: this.replyable_comment_id,
      })
      if (response.data.is_add == true) {
        this.is_loading = false
        this.SubmitText = ''
        this.$emit('add_reply', response.data.reply)
      } else {
        this.is_loading = false
        this.IsEmpty = true
      }
    }
  }
}
</script>
<style lang="less">
@import "../../../../vendor/variable.less";




.mc-comments-dialog,
.mc-comments-page {
  .new-comment {
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    width: 100%;
    
    padding-bottom: 16px;
            
    mdui-text-field,
    textarea {
      flex: 1;
      max-height: 60vh;
            margin-right: 16px;
      overflow: auto;
      font-size: inherit;
      border-bottom: none !important;

      
                }

    .submit {
      width: 76px;
    }
  }
}
</style>