<template>
  <mdui-button-icon
    v-if="show"
    class="mc-follow"
    variant="tonal"
    @click.stop=""
    @click="OnFollowClickCallback()"
    :loading="is_loading"
  >
    <mdi-icon :icon="IsFollow ? 'mdi-star' : 'mdi-star-outline'"></mdi-icon>
  </mdui-button-icon>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useSnackbarStore } from '@/stores/snackbar'
import { Follow } from '@/api/global.js'
export default {
  name: 'follow',
  props: {
    followable_type: String,
    followable_id: Number,
    is_follow: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  data: () => ({
    userStore: useUserStore(),
    dialogStore: useDialogStore(),
    snackbarStore: useSnackbarStore(),
    IsFollow: false,
    is_loading: false,
  }),
  created() {
    this.IsFollow = this.is_follow
  },
  methods: {
    async OnFollowClickCallback() {
      if (!this.userStore.getIsLogin) {
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      this.is_loading = true
      const response = await Follow({
        followable_type: this.followable_type,
        followable_id: this.followable_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_follow == true) {
        this.IsFollow = true
      } else {
        this.IsFollow = false
      }
      this.is_loading = false
      this.$forceUpdate()
    },
  },
}
</script>

<style lang="less">
@import './index.less';
</style>
