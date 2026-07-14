<template>
  <mdui-dialog :headline="title" :description="content" close-on-overlay-click>
    <mdui-button @click="vmodel = false" slot="action" variant="outlined">{{
      $t('Message.Components.DataTable.Cancel')
    }}</mdui-button>
    <mdui-button @click="vmodel = false" slot="action" variant="filled">{{
      $t('Message.Components.DataTable.Confirm')
    }}</mdui-button>
  </mdui-dialog>
</template>
<script>
// import Confirm from '@/components/button/confirm.vue'
// import Cancel from '@/components/button/cancel.vue'
export default {
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'title',
    },
    content: {
      type: String,
      default: 'content',
    },
  },
  components: {
    // Confirm,
    // Cancel,
  },
  data() {
    return {
      vmodel: false,
    }
  },
  watch: {
    model(val) {
      this.vmodel = val
      if (val) {
      }
    },
    vmodel(val) {
      if (!val) {
        this.$emit('model', false)
      }
    },
  },
}
</script>
