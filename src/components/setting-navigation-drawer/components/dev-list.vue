<template>
  <mdui-list>
    <mdui-list-subheader>{{
      $t('Message.Components.SettingNaviagtionDrawer.ExperimentalFunction')
    }}</mdui-list-subheader>

    <mdui-list-item>
      <mdi-icon slot="icon" icon="mdi-theme-light-dark" />
      {{ $t('Message.Components.SettingNaviagtionDrawer.ThemeModeButton') }}
      <div slot="description">
        {{ $t('Message.Components.SettingNaviagtionDrawer.DisplayInApplicationBarWhenScreenSizeIsAppropriate') }}
      </div>
      <mdui-switch
        slot="end-icon"
        :checked="appbarShowThemeButton"
        @change="localDataStore.setAppbarShowThemeButton($event.target.checked)"
      />
    </mdui-list-item>

    <mdui-list-item>
      <mdi-icon slot="icon" icon="mdi-translate" />
      {{ $t('Message.Components.SettingNaviagtionDrawer.LanguageSelectionButton') }}
      <div slot="description">
        {{ $t('Message.Components.SettingNaviagtionDrawer.DisplayInApplicationBarWhenScreenSizeIsAppropriate') }}
      </div>
      <mdui-switch
        slot="end-icon"
        :checked="appbarShowLanguageButton"
        @change="localDataStore.setAppbarShowLanguageButton($event.target.checked)"
      />
    </mdui-list-item>
  </mdui-list>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useLocalDataStore } from '@/stores/local-data'
// import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      mainStore: useMainStore(),
      localDataStore: useLocalDataStore(),
      //   userStore: useUserStore(),
    }
  },
  computed: {
    appbarShowLanguageButton: {
      get() {
        return this.localDataStore.getAppbarShowLanguageButton
      },
      set(val) {
        this.localDataStore.setAppbarShowLanguageButton(val)
      }
    },
    appbarShowThemeButton: {
      get() {
        return this.localDataStore.getAppbarShowThemeButton
      },
      set(val) {
        this.localDataStore.setAppbarShowThemeButton(val)
      }
    },
    csd_model: {
      get() {
        return this.mainStore.getPageLayout === 'csd'
      },
      set(val) {
        this.mainStore.pageLayout = val ? 'csd' : 'default'
      }
    },
  }
}
</script>