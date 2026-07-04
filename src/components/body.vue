<template>
  <!-- style="height: 100vh;width: 100%;" -->
  <mdui-layout
  :style="{
    height: IsElectron||IsTauri ? 'calc(100vh - 32px)' : '100vh',
    width: '100%',
  }"
  >
    <mdui-top-app-bar v-if="!v_search_appbar" scroll-behavior="elevate" scroll-target=".layout-main"

    >

      <mdui-tooltip :content="GetBarDrawerText" placement="right">
        <mdui-button-icon @click="navigation_drawer = !navigation_drawer">

          <!-- <mdi-icon :icon="($store.getters.GetPad && !navigation_drawer) ? 'mdi-menu-close' : (($store.getters.GetMobile) ? 'mdi-format-list-bulleted' : (($store.getters.GetPad && navigation_drawer) ? 'mdi-menu-open' : 'mdi-menu'))
            " /> -->

          <mdi-icon :icon="GetBarDrawerIcon" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-top-app-bar-title v-if="$store.getters.GetReadTitle" @click="$router.push($G_UrlHeaderLang() + '/')">
        {{
        $store.getters.GetReadTitle }}
      </mdui-top-app-bar-title>

      <mdui-top-app-bar-title v-else @click="$router.push($G_UrlHeaderLang() + '/')">
        {{
          ($store.getters.GetBreakpoint == 'xs' || $store.getters.GetBreakpoint == 'sm' || $store.getters.GetBreakpoint ==
            'md') ?
            $store.getters.GetAppbarSubtitle : mainStore.getInfoData.site_name
        }}

        <a v-show="($store.getters.GetBreakpoint == 'lg' || $store.getters.GetBreakpoint == 'xl' || $store.getters.GetBreakpoint == 'xxl')"
          style="font-size: 1rem;margin-left: 16px;margin-bottom: 8px;">
          {{
            $store.getters.GetAppbarSubtitle
          }}
        </a>
      </mdui-top-app-bar-title>

      <div style="flex-grow: 1"></div>
      <slot name="appbar-right">

      </slot>
    </mdui-top-app-bar>

    <mdui-top-app-bar v-else scroll-behavior="elevate" scroll-target=".layout-main">
      <input style="display: none;" />
      <CustomInput :name="'search-appbar'" :placeholder="$t('Message.Components.Search.SearchTooltop')" @model="val => {
        $store.dispatch('FabDialog/Set_SearchFabDialog', {
          value: val,
          model: 'moderate',
        })
      }" width="88%" />

      <mdui-button-icon style="margin-left: 4px;margin-right: 4px;" @click="v_search_appbar = !v_search_appbar">
        <mdi-icon icon="mdi-close" />
      </mdui-button-icon>
    </mdui-top-app-bar>

    <mdui-navigation-drawer v-if="!$store.getters.GetPad" close-on-overlay-click
      :open="navigation_drawer && !$store.getters.GetPad" @close="navigation_drawer = false"
      class="navigation-drawer" style="-webkit-app-region: drag;"
      >
      <!-- :style="!$store.getters.GetMobile?'-webkit-app-region: drag;-webkit-user-select: none;':''" -->
      <slot name="navigation-drawer-content"></slot>
      <slot name="navigation-drawer-bottom"></slot>

    </mdui-navigation-drawer>

    <mdui-navigation-rail v-if="navigation_drawer" v-show="$store.getters.GetPad && navigation_drawer"
      :value="$route.path" alignment="center" contained
      style="-webkit-app-region: drag;-webkit-user-select: none;"
      >
      <slot name="navigation-rail-content"></slot>
      <slot name="navigation-rail-bottom"></slot>
    </mdui-navigation-rail>

    <mdui-layout-main class="layout-main" @scroll="updateScrollValue">
      <slot></slot>
    </mdui-layout-main>

    <mdui-navigation-bar :hide="!$store.getters.GetMobile" :value="$route.path" label-visibility="labeled">
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

import 'mdui/components/icon.js';
import { breakpoint } from 'mdui/functions/breakpoint.js';
import AddFabButton from '@/components/add-fab-button/index.vue'
import ToTopFab from '@/components/to-top-fab/index.vue'
import CustomInput from '@/components/custom-input/index.vue'
// C:\Users\Administrator\Documents\Vue\MaterialDesignForum-MDUI2\src\components\append-footer\components\copyright\index.vue
// import Copyright from '@/components/append-footer/components/copyright/index.vue'
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js'
export default {
  name: "App",
  props: {
    search_appbar: {
      type: Boolean,
      default: false
    },
    appbar_title: {
      type: String,
      default: 'Material Design Forum'
    },
    appbar_suntitle: {
      type: String,
      default: 'MDF'
    },
    navigation_drawer_items: {
      type: Array,
      default: () => []
    },
    navigation_rail_items: {
      type: Array,
      default: () => []
    },
    navigation_bar_items: {
      type: Array,
      default: () => []
    },
  },
  components: {
    AddFabButton,
    ToTopFab,
    CustomInput,
    // Copyright,
  },
  data() {
    return {
      mainStore: useMainStore(),
      v_search_appbar: false,
      navigation_drawer: false,
      bp_smlg: false,
      bp_xssm: false,
      IsElectron: IsElectron(),
      IsMobileApp: IsMobileApp(),
    }
  },
  mounted() {
    this.OnResize()
    let _this = this;
    window.addEventListener('resize', () => {
      _this.OnResize()
      _this.$forceUpdate();
    });
    // let randomColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
  },
  computed: {
    IsTauri(){
      return IsTauri()
    },
    IsElectron(){
      return IsElectron()
    },
    IsMobileApp(){
      return IsMobileApp()
    },
    breakpoints() {
      return breakpoint;
    },
    GetBarDrawerText() {
      if (this.$store.getters.GetPc && this.$store.getters.GetComponents.drawer_navigation) {
        return this.$t('Message.Components.Appbar.CollapseTheSideNavigationDrawer')
      } else if (this.$store.getters.GetPc && !this.$store.getters.GetComponents.drawer_navigation) {
        return this.$t('Message.Components.Appbar.ShowSideNavigationDrawer')
      } else if (this.$store.getters.GetPad && this.$store.getters.GetComponents.drawer_navigation) {
        return this.$t('Message.Components.Appbar.CollapseTheSideNavigationBar')
      } else if (this.$store.getters.GetPad && !this.$store.getters.GetComponents.drawer_navigation) {
        return this.$t('Message.Components.Appbar.ShowSideNavigationBar')
      } else if (this.$store.getters.GetMobile && this.$store.getters.GetComponents.drawer_navigation) {
        return this.$t('Message.Components.Appbar.CollapseTheSideNavigationDrawer')
      } else if (this.$store.getters.GetMobile && !this.$store.getters.GetComponents.drawer_navigation) {
        return this.$t('Message.Components.Appbar.ShowSideNavigationDrawer')
      }
    },
    GetBarDrawerIcon() {
      // return (this.$store.getters.GetPad && !this.$store.getters.GetComponents.drawer_navigation)
      //   ?
      //   'mdi-menu-close'
      //   :
      //   (
      //     (this.$store.getters.GetMobile)
      //       ?
      //       'mdi-format-list-bulleted'
      //       :
      //       'mdi-menu'
      //   )
      if (this.$store.getters.GetPad && !this.$store.getters.GetComponents.drawer_navigation) {
        return 'mdi-menu-close'
      } else if (this.$store.getters.GetMobile) {
        return 'mdi-format-list-bulleted'
      } else if (this.$store.getters.GetPad && this.$store.getters.GetComponents.drawer_navigation) {
        return 'mdi-menu-open'
      } else {
        return 'mdi-menu'
      }
    },
  },
  methods: {
    /**
     * 滚动到顶部
     */
    ToTop() {
      let main = document.querySelector('mdui-layout-main');
      main.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    SetScrollListener() {
      //   var scrollHeight = main.scrollHeight - main.clientHeight;

      //   _this.$store.commit('SetScrollValue', a === 99 ? 100 : a);
    },
    updateScrollValue() {
      var _this = this;
      const main = document.querySelector('mdui-layout-main');
      var scrollHeight = main.scrollHeight - main.clientHeight;
      var scrollTop = main.scrollTop;

      var scrollPercent = (scrollTop / scrollHeight) * 100;
      var a = parseInt(scrollPercent.toFixed(2));
      _this.$store.commit('SetScrollValue', a === 99 ? 100 : a);
    },
    /**
     * 窗口大小调整事件
     */
    OnResize() {
      this.navigation_drawer = true
      // this.bp_smlg = this.breakpoints().between('sm', 'lg');
      this.bp_smlg = this.breakpoints().between('sm', 'xl');
      this.bp_xssm = this.breakpoints().between('xs', 'sm');

      if (this.breakpointOnly('xs')) {
        this.$store.dispatch('Set_Breakpoint', 'xs')
        this.$store.dispatch('Set_Mobile', true)
      } else if (this.breakpointOnly('sm')) {
        this.$store.dispatch('Set_Breakpoint', 'sm')
        this.$store.dispatch('Set_Pad', true)
      } else if (this.breakpointOnly('md')) {
        this.$store.dispatch('Set_Breakpoint', 'md')
        this.$store.dispatch('Set_Pad', true)
      } else if (this.breakpointOnly('lg')) {
        this.$store.dispatch('Set_Breakpoint', 'lg')
        this.$store.dispatch('Set_Pad', true)
      } else if (this.breakpointOnly('xl')) {
        this.$store.dispatch('Set_Breakpoint', 'xl')
        this.$store.dispatch('Set_Pc', true)
      } else if (this.breakpointOnly('xxl')) {
        this.$store.dispatch('Set_Breakpoint', 'xxl')
        this.$store.dispatch('Set_Pc', true)
      }

      this.navigation_drawer = !this.$store.getters.GetMobile
    },
    /**
     * 判断当前断点是否仅为指定的断点
     * @param {string} value 断点名称
     * @return {boolean} 如果当前断点仅为指定的断点，返回 true，否则返回 false
     */
    breakpointOnly(value) {
      return this.breakpoints().only(value);
    },
    /**
     * 判断当前断点是否在指定的断点范围内
     * @param {string} start 开始断点
     * @param {string} end 结束断点
     * @return {boolean} 如果当前断点在指定的断点范围内，返回 true，否则返回 false
     */
    breakpointBetween(start, end) {
      return this.breakpoints().between(start, end);
    },
  },
  created() {
    this.SetScrollListener()
  },
  watch: {
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
    navigation_drawer(val) {
      this.$store.dispatch('Set_Component',{ components:'drawer_navigation',value: val });
    },
  }
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
