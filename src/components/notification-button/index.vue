<template>
  <div>
    <mdui-button-icon
      style="margin-left: 4px; margin-right: 4px"
      @click="$router.push(`${$G_UrlHeaderLang()}/notifications`)"
    >
      <mdi-icon icon="mdi-bell" />
    </mdui-button-icon>
    <mdui-badge
      style="position: absolute; right: 64px"
      v-show="userStore.getUser.notification_unread > 0"
      >{{
        userStore.getUser.notification_unread > 99 ? '99+' : userStore.getUser.notification_unread
      }}</mdui-badge
    >
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {
  name: 'notification-button',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      userStore: useUserStore(),
    }
  },
}
</script>
