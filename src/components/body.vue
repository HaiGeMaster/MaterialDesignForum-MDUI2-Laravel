<template>
  <!-- style="height: 100vh;width: 100%;" -->

  <!-- :style="{
      height: IsElectron || IsTauri ? 'calc(100vh - 32px)' : '100vh',
      width: '100%',
    }" -->
  <mdui-layout style="height: 100vh; width: 100%">
    <mdui-top-app-bar
      v-if="!v_search_appbar"
      scroll-behavior="elevate"
      scroll-target=".layout-main"
      style="-webkit-app-region: drag; -webkit-user-select: none"
    >
      <mdui-tooltip :content="GetBarDrawerText" placement="right">
        <mdui-button-icon
          @click="navigation_drawer = !navigation_drawer"
          style="margin-right: 16px; -webkit-app-region: no-drag"
        >
          <mdi-icon :icon="GetBarDrawerIcon" />
        </mdui-button-icon>
      </mdui-tooltip>

      <!-- style="-webkit-app-region: no-drag" -->
      <mdui-top-app-bar-title
        v-if="mainStore.getReadTitle"
        @click="$router.push($G_UrlHeaderLang() + '/')"
      >
        {{ mainStore.getReadTitle }}
      </mdui-top-app-bar-title>

      <!-- style="-webkit-app-region: no-drag" -->
      <mdui-top-app-bar-title v-else @click="$router.push($G_UrlHeaderLang() + '/')">
        {{
          mainStore.getBreakpointName == 'xs' ||
          mainStore.getBreakpointName == 'sm' ||
          mainStore.getBreakpointName == 'md'
            ? mainStore.getAppbarSubtitle
            : mainStore.getInfoData.site_name
        }}

        <a
          v-show="
            mainStore.getBreakpointName == 'lg' ||
            mainStore.getBreakpointName == 'xl' ||
            mainStore.getBreakpointName == 'xxl'
          "
          style="font-size: 1rem; margin-left: 16px; margin-bottom: 8px"
        >
          {{ mainStore.getAppbarSubtitle }}
        </a>
      </mdui-top-app-bar-title>

      <div style="flex-grow: 1"></div>
      <slot name="appbar-right"> </slot>

      <mdui-tooltip
        v-show="IsElectron || IsTauri"
        :content="
          !top_window
            ? $t('Message.Components.SystemBar.TopWindow')
            : $t('Message.Components.SystemBar.CancelTopWindow')
        "
      >
        <mdui-button-icon @click="top_window = !top_window" style="-webkit-app-region: no-drag">
          <mdi-icon :icon="!top_window ? 'mdi-pin-outline' : 'mdi-pin'"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip
        v-show="IsElectron || IsTauri"
        :content="$t('Message.Components.Editor.Minimize')"
      >
        <mdui-button-icon @click="_OnWindowOpen('window-min')" style="-webkit-app-region: no-drag">
          <mdi-icon icon="mdi-minus"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip
        v-show="IsElectron || IsTauri"
        :content="$t('Message.Components.Editor.Maximize')"
      >
        <mdui-button-icon @click="_OnWindowOpen('window-max')" style="-webkit-app-region: no-drag">
          <mdi-icon icon="mdi-square-rounded-outline"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip v-show="IsElectron || IsTauri" :content="$t('Message.Components.Editor.Close')">
        <mdui-button-icon
          @click="_OnWindowOpen('window-close')"
          style="-webkit-app-region: no-drag"
        >
          <mdi-icon icon="mdi-window-close"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>
    </mdui-top-app-bar>

    <mdui-top-app-bar
      v-else
      scroll-behavior="elevate"
      scroll-target=".layout-main"
      style="-webkit-app-region: drag; -webkit-user-select: none"
    >
      <input style="display: none" />
      <CustomInput
        style="-webkit-app-region: no-drag"
        :name="'search-appbar'"
        :placeholder="$t('Message.Components.Search.SearchTooltop')"
        @model="
          (val) => {
            fabDialogStore.setSearchFabDialog({
              value: val,
              model: 'moderate',
            })
          }
        "
        @enter="
          (val) => {
            fabDialogStore.setSearchFabDialog({
              value: val,
              model: 'moderate',
            })
          }
        "
        width="88%"
      />

      <mdui-button-icon
        style="margin-left: 4px; margin-right: 4px; -webkit-app-region: no-drag"
        @click="v_search_appbar = !v_search_appbar"
      >
        <mdi-icon icon="mdi-close" />
      </mdui-button-icon>
    </mdui-top-app-bar>

    <mdui-navigation-drawer
      v-if="!mainStore.getTablet"
      close-on-overlay-click
      :open="navigation_drawer && !mainStore.getTablet"
      @close="navigation_drawer = false"
      class="navigation-drawer"
      style="-webkit-app-region: drag"
    >
      <!-- :style="!mainStore.getMobile?'-webkit-app-region: drag;-webkit-user-select: none;':''" -->
      <slot name="navigation-drawer-content"></slot>
      <slot name="navigation-drawer-bottom"></slot>
    </mdui-navigation-drawer>

    <mdui-navigation-rail
      v-if="navigation_drawer"
      v-show="mainStore.getTablet && navigation_drawer"
      :value="$route.path"
      alignment="center"
      contained
      style="-webkit-app-region: drag; -webkit-user-select: none"
    >
      <slot name="navigation-rail-content"></slot>
      <slot name="navigation-rail-bottom"></slot>
    </mdui-navigation-rail>

    <mdui-layout-main class="layout-main" @scroll="updateScrollValue">
      <slot></slot>
      <SettingNavigationDrawer />
    </mdui-layout-main>

    <mdui-navigation-bar
      :hide="!mainStore.getMobile"
      :value="$route.path"
      label-visibility="labeled"
    >
      <slot name="navigation-bar-content"></slot>
    </mdui-navigation-bar>
    <slot name="bottom">
      <AddFabButton />
      <ToTopFab />
    </slot>
  </mdui-layout>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useFabDialogStore } from '@/stores/fab-dialog'

import 'mdui/components/icon.js'
import { breakpoint } from 'mdui/functions/breakpoint.js'
import AddFabButton from '@/components/add-fab-button/index.vue'
import ToTopFab from '@/components/to-top-fab/index.vue'
import CustomInput from '@/components/custom-input/index.vue'
// C:\Users\Administrator\Documents\Vue\MaterialDesignForum-MDUI2\src\components\append-footer\components\copyright\index.vue
// import Copyright from '@/components/append-footer/components/copyright/index.vue'
import { IsTauri, IsElectron, IsMobileApp } from '@/api/global.js'
import SettingNavigationDrawer from '@/components/setting-navigation-drawer/index.vue'
import { OnWindowOpen } from '@/api/global.js'
export default {
  name: 'App',
  props: {
    search_appbar: {
      type: Boolean,
      default: false,
    },
    appbar_title: {
      type: String,
      default: 'Material Design Forum',
    },
    appbar_suntitle: {
      type: String,
      default: 'MDF',
    },
    navigation_drawer_items: {
      type: Array,
      default: () => [],
    },
    navigation_rail_items: {
      type: Array,
      default: () => [],
    },
    navigation_bar_items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AddFabButton,
    ToTopFab,
    CustomInput,
    SettingNavigationDrawer,
    // Copyright,
  },
  data() {
    return {
      max: false,
      top_window: false,
      mainStore: useMainStore(),
      dialogStore: useDialogStore(),
      fabDialogStore: useFabDialogStore(),
      v_search_appbar: false,
      // navigation_drawer: false,
      bp_smlg: false,
      bp_xssm: false,
      IsElectron: IsElectron(),
      IsMobileApp: IsMobileApp(),
    }
  },
  mounted() {
    this.OnResize()
    let _this = this
    window.addEventListener('resize', () => {
      _this.OnResize()
      _this.$forceUpdate()
    })
    // let randomColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
  },
  computed: {
    navigation_drawer: {
      get() {
        return this.mainStore.getDrawer
      },
      set(val) {
        this.mainStore.setDrawer(val)
      },
    },
    IsTauri() {
      return IsTauri()
    },
    IsElectron() {
      return IsElectron()
    },
    IsMobileApp() {
      return IsMobileApp()
    },
    breakpoints() {
      return breakpoint
    },
    GetBarDrawerText() {
      if (this.mainStore.getDesktop && this.mainStore.getDrawer) {
        return this.$t('Message.Components.Appbar.CollapseTheSideNavigationDrawer')
      } else if (this.mainStore.getDesktop && !this.mainStore.getDrawer) {
        return this.$t('Message.Components.Appbar.ShowSideNavigationDrawer')
      } else if (this.mainStore.getTablet && this.mainStore.getDrawer) {
        return this.$t('Message.Components.Appbar.CollapseTheSideNavigationBar')
      } else if (this.mainStore.getTablet && !this.mainStore.getDrawer) {
        return this.$t('Message.Components.Appbar.ShowSideNavigationBar')
      } else if (this.mainStore.getMobile && this.mainStore.getDrawer) {
        return this.$t('Message.Components.Appbar.CollapseTheSideNavigationDrawer')
      } else if (this.mainStore.getMobile && !this.mainStore.getDrawer) {
        return this.$t('Message.Components.Appbar.ShowSideNavigationDrawer')
      }
    },
    GetBarDrawerIcon() {
      // return (this.mainStore.getTablet && !this.mainStore.getDrawer)
      //   ?
      //   'mdi-menu-close'
      //   :
      //   (
      //     (this.mainStore.getMobile)
      //       ?
      //       'mdi-format-list-bulleted'
      //       :
      //       'mdi-menu'
      //   )
      if (this.mainStore.getTablet && !this.mainStore.getDrawer) {
        return 'mdi-menu-close'
      } else if (this.mainStore.getMobile) {
        return 'mdi-format-list-bulleted'
      } else if (this.mainStore.getTablet && this.mainStore.getDrawer) {
        return 'mdi-menu-open'
      } else {
        return 'mdi-menu'
      }
    },
  },
  methods: {
    _OnWindowOpen(type) {
      OnWindowOpen(type)
    },
    /**
     * 滚动到顶部
     */
    ToTop() {
      let main = document.querySelector('mdui-layout-main')
      main.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },

    SetScrollListener() {},
    updateScrollValue() {
      var _this = this
      const main = document.querySelector('mdui-layout-main')
      var scrollHeight = main.scrollHeight - main.clientHeight
      var scrollTop = main.scrollTop

      var scrollPercent = (scrollTop / scrollHeight) * 100
      var a = parseInt(scrollPercent.toFixed(2))
      _this.mainStore.setScrollValue(a === 99 ? 100 : a)
    },
    /**
     * 窗口大小调整事件
     */
    OnResize() {
      this.navigation_drawer = true
      // this.bp_smlg = this.breakpoints().between('sm', 'lg');
      this.bp_smlg = this.breakpoints().between('sm', 'xl')
      this.bp_xssm = this.breakpoints().between('xs', 'sm')

      if (this.breakpointOnly('xs')) {
        this.mainStore.setBreakpointName('xs')
        this.mainStore.setMobile(true)
      } else if (this.breakpointOnly('sm')) {
        this.mainStore.setBreakpointName('sm')
        this.mainStore.setTablet(true)
      } else if (this.breakpointOnly('md')) {
        this.mainStore.setBreakpointName('md')
        this.mainStore.setTablet(true)
      } else if (this.breakpointOnly('lg')) {
        this.mainStore.setBreakpointName('lg')
        this.mainStore.setTablet(true)
      } else if (this.breakpointOnly('xl')) {
        this.mainStore.setBreakpointName('xl')
        this.mainStore.setDesktop(true)
      } else if (this.breakpointOnly('xxl')) {
        this.mainStore.setBreakpointName('xxl')
        this.mainStore.setDesktop(true)
      }

      // console.log(this.mainStore.getBreakpointName)

      this.navigation_drawer = !this.mainStore.getMobile
    },
    /**
     * 判断当前断点是否仅为指定的断点
     * @param {string} value 断点名称
     * @return {boolean} 如果当前断点仅为指定的断点，返回 true，否则返回 false
     */
    breakpointOnly(value) {
      return this.breakpoints().only(value)
    },
    /**
     * 判断当前断点是否在指定的断点范围内
     * @param {string} start 开始断点
     * @param {string} end 结束断点
     * @return {boolean} 如果当前断点在指定的断点范围内，返回 true，否则返回 false
     */
    breakpointBetween(start, end) {
      return this.breakpoints().between(start, end)
    },
  },
  created() {},
  watch: {
    max(val) {
      this._OnWindowOpen('max')
    },
    top_window(val) {
      this._OnWindowOpen(val ? 'window-top' : 'window-top-cancel')
    },
    search_appbar(val) {
      if (val) {
        this.v_search_appbar = true
      }
    },
    v_search_appbar(val) {
      if (!val) {
        this.$emit('search_appbar', false)
      }
    },
    breakpoints() {
      this.v_search_appbar = false
    },
    // navigation_drawer(val) {
    //   this.mainStore.setDrawer(val)
    // },
  },
}
</script>
<style lang="less">
body {
  margin: 0;
}

mdui-layout {
  /* 定义滚动条的宽度和圆角 */
  ::-webkit-scrollbar {
    width: 6px !important;
    border-radius: 100px !important;
  }

  /* 定义滚动条轨道的背景色 */
  ::-webkit-scrollbar-track {
    background-color: #00000000 !important;
  }

  /* 定义滚动条滑块的样式 */
  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1 !important;

    .mdui-theme-dark & {
      background-color: #707070 !important;
    }
  }
}

mdui-navigation-drawer:host {
  @media (min-width: 1080px) {
    width: 15.5rem !important;
  }
}
</style>
