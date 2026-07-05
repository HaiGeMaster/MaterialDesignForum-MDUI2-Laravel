<template>
  <mdui-dropdown>
    <mdui-button-icon v-show="show" slot="trigger" style="margin-right: 4px; margin-left: 4px">
      <mdi-icon icon="mdi-dots-vertical" />
    </mdui-button-icon>
    <mdui-menu>
      <mdui-menu-item @click="dialogStore.setLoginDialog(true)">
        <mdi-icon slot="icon" icon="mdi-login" />
        {{ $t('Message.Components.Account.Login') }}
      </mdui-menu-item>
      <mdui-menu-item @click="dialogStore.setRegisterDialog(true)">
        <mdi-icon slot="icon" icon="mdi-account-plus" />
        {{ $t('Message.Components.Account.Register') }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
export default {
  name: 'account-button',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
    }
  },
}
</script>
