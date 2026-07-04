<template>
  <v-dialog v-model="vmodel" max-width="500px" >
    <v-card :class="['glass-container']">
      <v-card-title>
        {{
    title
  }}
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="vcontent" filled :auto-grow="true" counter="1000" maxlength="1000"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        
        <Cancel 
          @cancel="OnCancel()" 
          :text="$t('Message.Components.DataTable.Cancel')"
        />

        <Confirm
          @confirm="OnEdit()"
          :text="$t('Message.Components.DataTable.Edit')"
          :disabled="vcontent.length > 1000"
        />

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Confirm from '@/components/button/confirm.vue'
import Cancel from '@/components/button/cancel.vue'
import {
  EditReply,
  EditComment,
} from '@/api/global.js'
export default {
  name: 'text-edit-dialog',
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    title: {      type: String,
      default: 'Message.Components.DataTable.Edit',
    },
    type: {
      type: String,
      default: 'reply',    },
    edit_id: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: '',
    },
  },
  components:{
    Confirm,
    Cancel
  },
  data: () => ({
    vmodel: false,
    vcontent: '',
  }),
  methods: {
    async OnEdit() {
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
        this.vmodel = true
      }
    },
    vmodel(val) {
      if (!val) {
        this.$emit('model', false)
      }
    },
    content(val) {
      this.vcontent = val
    },
  },
}
</script>