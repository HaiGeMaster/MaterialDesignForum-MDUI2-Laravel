<template>
  <!-- <v-navigation-drawer location="right" temporary v-model="drawer" :width="400">
    <template v-slot:prepend>
      <v-toolbar :title="$t('Message.Components.DevDialog.Setting')">
        <template v-slot:append>
          <div class="d-flex ga-1">
            <v-btn icon="mdi-close" @click="drawer = false"></v-btn>
            <v-tooltip activator="parent" location="right">{{
              $t('Message.Components.DialogClass.Close')
            }}</v-tooltip>
          </div>
        </template>
      </v-toolbar>
    </template>

    <v-divider v-show="userStore.getIsLogin && !admin"></v-divider>
    <Personal v-if="userStore.getIsLogin && !admin"></Personal>

    <v-divider v-show="userStore.getIsLogin && !admin"></v-divider>
    <OauthList v-if="userStore.getIsLogin && !admin"></OauthList>

    <v-divider></v-divider>
    <v-list rounded="lg">
      <v-list-subheader>{{
        $t('Message.Components.SettingNaviagtionDrawer.Client')
      }}</v-list-subheader>
      <ThemeItem></ThemeItem>
      <LanguageItem slotname="list"></LanguageItem>
    </v-list>

    <v-divider></v-divider>
    <DevList></DevList>
  </v-navigation-drawer> -->

  <mdui-navigation-drawer
    class="right-drawer"
    placement="right"
    modal
    close-on-esc
    close-on-overlay-click
    contained
    :open="mainStore.getRightDrawer"
    @close.self="mainStore.setRightDrawer(false)"
  >
    <mdui-top-app-bar scroll-target=".right-drawer">
      <mdui-top-app-bar-title>{{
        $t('Message.Components.DevDialog.Setting')
      }}</mdui-top-app-bar-title>
      <div style="flex-grow: 1"></div>
      <mdui-button-icon @click="mainStore.setRightDrawer(false)">
        <mdi-icon icon="mdi-close"></mdi-icon>
      </mdui-button-icon>
    </mdui-top-app-bar>

    <Personal v-if="userStore.getIsLogin && !admin"></Personal>
    <mdui-divider></mdui-divider>
    <OauthList v-if="userStore.getIsLogin && !admin"></OauthList>
    <mdui-divider></mdui-divider>

    <mdui-list>
      <mdui-list-subheader>{{
        $t('Message.Components.SettingNaviagtionDrawer.Client')
      }}</mdui-list-subheader>
      <!-- <ThemeItem></ThemeItem> -->
      <LanguageItem slotname="list"></LanguageItem>
    </mdui-list>
    <mdui-divider></mdui-divider>

    <DevList></DevList>
  </mdui-navigation-drawer>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
// import ThemeItem from './components/theme-item.vue'
import LanguageItem from '@/components/language-button/index.vue'
import Personal from './components/personal.vue'
import OauthList from './components/oauth-list.vue'
import DevList from './components/dev-list.vue'
export default {
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    // ThemeItem,
    LanguageItem,
    Personal,
    OauthList,
    DevList,
  },
  data() {
    return {
      // drawer: true,
      mainStore: useMainStore(),
      userStore: useUserStore(),
      // dialogStore: useDialogStore(),
      // delete_loading_id: null,
    }
  },
  computed: {
    csd_model: {
      get() {
        return this.mainStore.getPageLayout === 'csd'
      },
      set(val) {
        this.mainStore.pageLayout = val ? 'csd' : 'default'
      },
    },
    drawer: {
      get() {
        return this.mainStore.getRightDrawer
      },
      set(val) {
        this.mainStore.setRightDrawer(val)
      },
    },
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    },
  },
}
</script>
