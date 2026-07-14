<template>
  <mdui-tooltip :content="tooltipContent">
    <mdui-button-icon
      v-show="show"
      @click="handleThemeSwitch"
      style="margin-right: 4px; margin-left: 4px"
    >
      <mdi-icon :icon="themeIcon" />
    </mdui-button-icon>
  </mdui-tooltip>
</template>

<script>
import { setColorScheme } from 'mdui/functions/setColorScheme.js'
import { setTheme } from 'mdui/functions/setTheme.js'
import {} from // GetThemeColorParamJson,
// GetThemeSettingColor,
'@/api/global.js'

import { useMainStore } from '@/stores/main'

export default {
  name: 'ThemeButton',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isDark: false,
      theme_data: null,
      mainStore: useMainStore(),
    }
  },
  computed: {
    tooltipContent() {
      return !this.isDark
        ? this.$t('Message.Components.ThemeButton.LightTheme')
        : this.$t('Message.Components.ThemeButton.DarkTheme')
    },
    themeIcon() {
      return this.isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'
    },
    ReturnGetAppBaseInfo() {
      return this.mainStore.getAppBaseInfo
    },
  },
  methods: {
    async handleThemeSwitch(event) {
      // Add click effect with view transition if supported
      document.documentElement.style.setProperty('--x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--y', `${event.clientY}px`)

      if (document.startViewTransition) {
        document.startViewTransition(() => this.switchTheme())
      } else {
        this.switchTheme()
      }
    },

    switchTheme() {
      const html = document.querySelector('html')

      if (html.classList.contains('mdui-theme-dark')) {
        setTheme('light')
        this.isDark = false
      } else if (html.classList.contains('mdui-theme-light')) {
        setTheme('dark')
        this.isDark = true
      } else {
        setTheme('auto')
        // Default to dark theme when auto is first set
        this.isDark = true
      }

      // Update color scheme after theme change
      this.updateColorScheme()
    },
    async GetThemeSettingColor() {
      // const response = await GetThemeSettingColor({
      //   user_token: this.$G_GetUserToken(),
      //   theme_name: 'MaterialDesignForum-MDUI2'
      // })
      // if (response.data.is_get == true) {
      //   // console.log(response.data.theme_color)
      //   //将response.data.theme_color合并覆盖到this.$vuetify.theme.themes
      //   let themes = this.theme_data
      //   themes = Object.assign({}, themes, response.data.theme_color)
      //   this.theme_data = themes
      //   console.log(this.theme_data)
      //   this.updateColorScheme()
      // }
      let themes = this.theme_data
      themes = Object.assign({}, themes, this.mainStore.getAppBaseInfo.theme_color)
      this.theme_data = themes
      this.updateColorScheme()
    },

    // async fetchThemeColorParams() {
    //   try {
    //     const user_token = this.$G_GetUserToken();
    //     const res = await GetThemeColorParamJson({ user_token });

    //     if (res.data.is_get) {
    //       this.theme_data = res.data.json_text;
    //       this.$forceUpdate();
    //       this.updateColorScheme();
    //     }
    //   } catch (error) {
    //     console.error('Failed to fetch theme color parameters:', error);
    //     // Fallback to default colors if API fails
    //     this.updateColorScheme();
    //   }
    // },

    updateColorScheme() {
      if (!this.theme_data) return

      const lightColor = this.theme_data.light.colors?.primary
      const darkColor = this.theme_data.dark.colors?.primary

      if (this.isDark) {
        setColorScheme(darkColor)
      } else if (!this.isDark) {
        setColorScheme(lightColor)
      } else {
        setColorScheme('#4c5e8b')
      }

      // 从 CSS 变量读取当前主题色，更新浏览器顶栏
      this.updateThemeColorMeta()
    },

    updateThemeColorMeta() {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--mdui-color-surface')
        .trim()
      if (!color) return

      let el = document.querySelector('meta[name="theme-color"]')
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', 'theme-color')
        document.head.appendChild(el)
      }
      el.setAttribute('content', `rgb(${color})`)
    },

    setRandomColor() {
      const randomColor =
        '#' +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padEnd(6, '0')
      setColorScheme(randomColor)
    },
  },
  created() {
    setColorScheme('#4c5e8b')

    // Initialize theme based on system preference
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(isSystemDark ? 'dark' : 'light')
    this.isDark = isSystemDark

    // Listen for system theme changes
    this.colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    this.colorSchemeMediaQuery.addListener((e) => {
      setTheme(e.matches ? 'dark' : 'light')
      this.isDark = e.matches
      this.updateColorScheme()
    })
  },
  mounted() {
    // this.fetchThemeColorParams();
    // this.GetThemeSettingColor()
  },
  beforeUnmount() {
    // Clean up event listener
    if (this.colorSchemeMediaQuery) {
      this.colorSchemeMediaQuery.removeListener(this.handleSystemThemeChange)
    }
  },
  watch: {
    isDark(newVal) {
      // console.log('isDark changed:', newVal);
      this.mainStore.setIsDark(newVal)
      this.updateColorScheme()
    },
    ReturnGetAppBaseInfo(val) {
      this.GetThemeSettingColor()
    },
  },
}
</script>
