<template>
  <mdui-dropdown>
    <mdui-button-icon v-show="show" slot="trigger" style="margin-right: 4px; margin-left: 4px">
      <mdi-icon
        :icon="
          mainStore.getMobile ? 'mdi-cellphone' : mainStore.getTablet ? 'mdi-tablet' : 'mdi-monitor'
        "
      />
    </mdui-button-icon>
    <mdui-menu>
      <mdui-menu-item @click="mainStore.setMobile(true)">
        <mdi-icon icon="mdi-cellphone" slot="icon" />
        {{ $t('Message.Components.DeviceTypeButton.Mobile') }}
      </mdui-menu-item>
      <mdui-menu-item @click="mainStore.setTablet(true)">
        <mdi-icon icon="mdi-tablet" slot="icon" />
        {{ $t('Message.Components.DeviceTypeButton.Pad') }}
      </mdui-menu-item>
      <mdui-menu-item @click="mainStore.setDesktop(true)">
        <mdi-icon icon="mdi-monitor" slot="icon" />
        {{ $t('Message.Components.DeviceTypeButton.Pc') }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown>
</template>
<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'device-type-button',
  props: {
    show: {
      Boolean,
      default: true,
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
      selectedItem: null,
    }
  },
}
</script>
