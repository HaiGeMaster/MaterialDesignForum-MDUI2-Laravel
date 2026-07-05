<template>
  <mdui-button-icon
    class="edit"
    variant="filled"
    v-show="$G_GetUserID() == user.user_id"
    @click="Set_EditInfoDialog"
    :disabled="!userStore.getUser.user_group['ability_edit_own_info']"
  >
    <mdi-icon
      :icon="
        !userStore.getUser.user_group['ability_edit_own_info'] ? 'mdi-pencil-off' : 'mdi-pencil'
      "
    />
  </mdui-button-icon>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
    }
  },
  methods: {
    Set_EditInfoDialog() {
      if (!this.userStore.getUser.user_group['ability_edit_own_info']) {
        return
      }
      this.dialogStore.setEditInfoDialog({
        model: true,
        user: this.user,
      })
    },
  },
}
</script>
