<template>
  <mdui-dropdown>
    <mdui-button-icon v-show="show"
    slot="trigger" style="margin-right: 4px;margin-left: 4px;">
      <mdi-icon :icon="$store.getters.GetMobile ?
        'mdi-cellphone' :
        $store.getters.GetPad ?
          'mdi-tablet' :
          'mdi-monitor'" />

    </mdui-button-icon>
    <mdui-menu>
      <mdui-menu-item @click="$store.dispatch('Set_Mobile',true)" >
        <mdi-icon icon="mdi-cellphone" slot="icon" />
        {{ $t('Message.Components.DeviceTypeButton.Mobile') }}
      </mdui-menu-item>
      <mdui-menu-item @click="$store.dispatch('Set_Pad',true)">
        <mdi-icon icon="mdi-tablet" slot="icon" />
        {{ $t('Message.Components.DeviceTypeButton.Pad') }}
      </mdui-menu-item>
      <mdui-menu-item  @click="$store.dispatch('Set_Pc',true)">
        <mdi-icon icon="mdi-monitor" slot="icon" />
        {{ $t('Message.Components.DeviceTypeButton.Pc') }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown>
</template>
<script>
export default {
  name: 'device-type-button',
  props: {
    show: {
      Boolean,
      default: true,
    }
  },
  data() {
    return {
      selectedItem: null,
    }
  },
}
</script>
