<template>
  <div>

    <mdui-button-icon style="margin-left: 4px;margin-right: 4px;"
      @click="$router.push(`${$G_UrlHeaderLang()}/notifications`)">
      <!-- <mdi-icon :icon="$store.getters['User/GetUser'].notification_unread > 0 ? 'mdi-bell-badge' : 'mdi-bell'" /> -->
      <mdi-icon icon="mdi-bell" />

    </mdui-button-icon>
    <mdui-badge style="position: absolute;right: 64px;"
    v-show="$store.getters['User/GetUser'].notification_unread > 0"
    >{{ 
    $store.getters['User/GetUser'].notification_unread>99?'99+':$store.getters['User/GetUser'].notification_unread

    }}</mdui-badge>
  </div>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  // count: {
  //   type: Number,
  //   default: 0,
  // },
})
</script>