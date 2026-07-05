<template>
  <!-- <v-list rounded="lg">
    <v-list-subheader>{{
      $t('Message.Components.SettingNaviagtionDrawer.Personal')
    }}</v-list-subheader>
    <v-list-item
      prepend-icon="mdi-pencil"
      :disabled="!userStore.getUser.user_group.ability_edit_own_info"
      :title="$t('Message.Client.User.User.EditProfile')"
      @click="Set_EditInfoDialog"
      append-icon="mdi-dots-vertical"
    ></v-list-item>
    <v-list-item
      prepend-icon="mdi-bell-cog"
      :title="$t('Message.Components.SettingNaviagtionDrawer.NotificationsSetting')"
      :to="`${$G_UrlHeaderLang()}/notifications/setting`"
      append-icon="mdi-chevron-right"
    ></v-list-item>
  </v-list> -->

  <mdui-list style="margin-top: 64px">
    <mdui-list-subheader>
      {{ $t('Message.Components.SettingNaviagtionDrawer.Personal') }}
    </mdui-list-subheader>

    <mdui-list-item
      :disabled="!userStore.getUser.user_group.ability_edit_own_info"
      @click="Set_EditInfoDialog"
    >
      <mdi-icon icon="mdi-pencil" slot="icon"></mdi-icon>
      {{ $t('Message.Client.User.User.EditProfile') }}
      <mdi-icon icon="mdi-dots-vertical" slot="end-icon"></mdi-icon>
    </mdui-list-item>

    <mdui-list-item @click="$router.push(`${$G_UrlHeaderLang()}/notifications/setting`)">
      <mdi-icon icon="mdi-bell-cog" slot="icon"></mdi-icon>
      {{ $t('Message.Components.SettingNaviagtionDrawer.NotificationsSetting') }}
      <mdi-icon icon="mdi-chevron-right" slot="end-icon"></mdi-icon>
    </mdui-list-item>
  </mdui-list>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'

export default {
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
    }
  },
  methods: {
    Set_EditInfoDialog() {
      // if (!this.userStore.getUser.user_group.ability_edit_own_info) {
      //   return
      // }
      //  // console.log(this._user)
      this.dialogStore.setEditInfoDialog({
        model: true,
        user: this.userStore.getUser,
      })
    },
  },
}
</script>
