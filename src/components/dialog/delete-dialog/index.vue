<template>
  <mdui-dialog
    close-on-overlay-click
    :fullscreen="mainStore.getMobile"
    @close="vmodel = false"
    style="margin: auto"
    ref="delete_dialog"
    :headline="$t('Message.Components.DataTable.Delete')"
  >
    <mdui-button-icon class="close" @click="vmodel = false" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>
    <span :style="!mainStore.getMobile ? 'min-width: 450px;' : ''">
      <template v-for="(item, index) in vdelete_preview_text">
        <br />
        <code>{{ item }}</code>
      </template>
    </span>

    <mdui-button slot="action" variant="outlined" @click="vmodel = false">
      {{ $t('Message.Components.TopicSelectDialog.Cancel') }}
    </mdui-button>
    <mdui-button slot="action" variant="filled" @click="DeleteItem()" :loading="loading">
      {{ $t('Message.Components.DataTable.Confirm') }}
    </mdui-button>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { DeleteDatas } from '@/api/global.js'
export default {
  name: 'delete-dialog',
  components: {},
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: '',
    },
    item_ids: {
      type: Array,
      default: () => [],
    },
    delete_preview_text: {
      type: [String, Array],
      default: null,
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
      vmodel: false,
      vdelete_preview_text: null,
      ids: [],
      loading: false,
    }
  },
  methods: {
    async DeleteItem() {
      // this.OnAxiosDelete([this.GetItemID()])
      this.ids = this.item_ids
      var user_token = this.$G_GetUserToken()
      var data = null
      switch (this.type) {
        case 'topic':
          data = {
            topic_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'article':
          data = {
            article_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'question':
          data = {
            question_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'answer':
          data = {
            answer_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'comment':
          data = {
            comment_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'user':
          data = {
            user_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'reply':
          data = {
            reply_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'report':
          data = {
            report_ids: this.ids,
            user_token: user_token,
          }
          break
        case 'user_group':
          data = {
            user_group_ids: this.ids,
            user_token: user_token,
          }
          break
      }
      this.loading = true
      const response = await DeleteDatas(`${this.type}s`, data)
      if (response.data.is_delete == true) {
        this.loading = false
        this.vmodel = false
        //确认response.data.data是否为数组
        if (Array.isArray(response.data.data)) {
          // this.$emit(`delete_${this.type}`, response.data.data)
          if (response.data.data.length == 1) {
            this.$emit(`delete_${this.type}`, response.data.data[0])
          } else {
            this.$emit(`delete_${this.type}s`, response.data.data)
          }
        }
      } else {
        this.loading = false
      }
    },
  },
  watch: {
    model(val) {
      console.log('model', val)
      if (val == true) {
        this.$refs.delete_dialog.open = true
        this.vmodel = val
      }
    },
    vmodel(val) {
      if (val == false) {
        this.$refs.delete_dialog.open = false
        this.$emit('model', val)
      }
    },
    delete_preview_text(val) {
      if (Array.isArray(val)) {
        this.vdelete_preview_text = val
      } else {
        this.vdelete_preview_text = [val]
      }
    },
  },
}
</script>
