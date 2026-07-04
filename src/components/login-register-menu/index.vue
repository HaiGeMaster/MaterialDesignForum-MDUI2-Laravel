<template>
  
  <mdui-dropdown>
    <mdui-button-icon v-show="show" slot="trigger" style="margin-right: 4px;margin-left: 4px;">
      <mdi-icon icon="mdi-dots-vertical" />
    </mdui-button-icon>
    <mdui-menu>
      <mdui-menu-item @click="$store.dispatch('Dialog/Set_LoginDialog', true)">
        <mdi-icon slot="icon" icon="mdi-login" />
        {{ $t('Message.Components.Account.Login') }}
      </mdui-menu-item>
      <mdui-menu-item @click="$store.dispatch('Dialog/Set_RegisterDialog', true)">
        <mdi-icon slot="icon" icon="mdi-account-plus" />
        {{ $t('Message.Components.Account.Register') }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});
</script>