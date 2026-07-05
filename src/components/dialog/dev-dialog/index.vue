<template>
  <mdui-dialog
    close-on-overlay-click
    :fullscreen="mainStore.getMobile"
    @close="vmodel = false"
    style="margin: auto"
    ref="dev_dialog"
    :headline="$t('Message.Components.DevDialog.Setting')"
  >
    <mdui-button-icon @click="vmodel = false" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>
    <mdui-card :style="!mainStore.getMobile ? 'min-width: 450px;' : 'width: 100%;'">
      <mdui-list>
        <mdui-list-subheader> {{ $t('Message.Admin.Options.Theme') }}</mdui-list-subheader>
        <mdui-list-item
          headline="MaterialDesignForum-MDUI2"
          description="MaterialDesign3"
          @click="SwitchClientTheme('MaterialDesignForum-MDUI2')"
        >
          <!-- <mdi-icon slot="icon" icon="mdi-shape" /> -->
          <img
            slot="icon"
            :src="$G_ImgHandle('/assets/fixed_content/mdui2-logo.svg')"
            style="width: 24px"
          />
        </mdui-list-item>
        <mdui-list-item
          headline="MaterialDesignForum-Vuetify2"
          description="MaterialDesign2"
          @click="SwitchClientTheme('MaterialDesignForum-Vuetify2')"
        >
          <!-- <mdi-icon slot="icon" icon="mdi-shape-outline" /> -->
          <img
            slot="icon"
            :src="$G_ImgHandle('/assets/fixed_content/vuetify2-logo.svg')"
            style="width: 24px"
          />
        </mdui-list-item>
      </mdui-list>
    </mdui-card>
  </mdui-dialog>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { SwitchClientTheme } from '@/api/global.js'
export default {
  props: {
    model: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
      vmodel: false,
    }
  },
  methods: {
    SwitchClientTheme(val) {
      if (SwitchClientTheme(val)) {
        window.location.reload()
      }
    },
  },
  watch: {
    model(val) {
      if (val) {
        this.$refs.dev_dialog.open = val
        this.vmodel = val
      }
    },
    vmodel(val) {
      if (!val) {
        this.$refs.dev_dialog.open = val
        this.$emit('model', val)
      }
    },
  },
}
</script>
