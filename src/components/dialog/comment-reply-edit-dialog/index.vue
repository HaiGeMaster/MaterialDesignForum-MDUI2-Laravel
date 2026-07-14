<template>
  <mdui-dialog
    close-on-overlay-click
    :fullscreen="mainStore.getMobile"
    @close="vmodel = false"
    style="margin: auto"
    ref="comments_reply_edit_dialog"
    :headline="title"
  >
    <mdui-button-icon class="close" @click="OnCancel()" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>

    <mdui-text-field
      :style="!mainStore.getMobile ? 'min-width: 450px;' : ''"
      autosize
      min-rows="2"
      max-rows="5"
      :value="vcontent"
      @input="vcontent = $event.target.value"
    ></mdui-text-field>

    <mdui-button slot="action" variant="outlined" @click="OnCancel()">
      {{ $t('Message.Components.TopicSelectDialog.Cancel') }}
    </mdui-button>
    <mdui-button
      slot="action"
      variant="filled"
      @click="OnEdit()"
      :disabled="vcontent.length > 1000 || vcontent.length == 0"
    >
      {{ $t('Message.Components.DataTable.Edit') }}
    </mdui-button>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
import { EditReply, EditComment } from '@/api/global.js'
export default {
  name: 'comment-reply-edit-dialog',
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    title: {
      //编辑 评论 回复
      type: String,
      default: 'Message.Components.DataTable.Edit',
    },
    type: {
      type: String,
      default: 'reply', //comment reply
    },
    edit_id: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: '',
    },
  },
  components: {
    // Confirm,
    // Cancel
  },
  data: () => ({
    mainStore: useMainStore(),
    vmodel: false,
    vcontent: '',
  }),
  methods: {
    async OnEdit() {
      //如果字数大于1000
      if (this.vcontent.length > 1000) {
        return
      }
      if (this.type == 'comment') {
        const response = await EditComment({
          comment_id: this.edit_id,
          content: this.vcontent,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_edit) {
          this.$emit('edit_comment', response.data.comment)
          this.vmodel = false
        } else {
          this.vmodel = false
        }
      } else if (this.type == 'reply') {
        const response = await EditReply({
          reply_id: this.edit_id,
          content: this.vcontent,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_edit) {
          this.$emit('edit_reply', response.data.reply)
          this.vmodel = false
        } else {
          this.vmodel = false
        }
      }
    },
    OnCancel() {
      this.vmodel = false
    },
    OnSave() {
      this.vmodel = false
    },
  },
  watch: {
    model(val) {
      if (val) {
        this.$refs.comments_reply_edit_dialog.open = true
        this.vmodel = true
      }
    },
    vmodel(val) {
      if (!val) {
        this.$refs.comments_reply_edit_dialog.open = false
        this.$emit('model', false)
      }
    },
    content(val) {
      this.vcontent = val
    },
  },
}
</script>
