<template>
  <div class="copyright-components" style="-webkit-app-region: no-drag">
    <p style="cursor: pointer">
      <!-- Cookie Setting -->
      <!-- {{ $t('Message.Components.UseCookieDialog.cookieConsent.manage') }} -->

      <a @click="dialogStore.setCookieUseDialog(true)">
        {{ $t('Message.Components.UseCookieDialog.cookieConsent.manage') }} </a
      >|
      <!-- <a @click="mainStore.setRightDrawer(!mainStore.getRightDrawer)">
              {{ $t('Message.Components.DevDialog.Setting') }}
            </a>| -->
      <a>
        {{ mainStore.getAppVersion }}
      </a>
    </p>
    <p>
      <!-- :href="`${$G_UrlHeaderLang()}/`" -->
      <a href="https://github.com/HaiGeMaster">
        <img :src="$G_ImgHandle('/assets/fixed_content/md3_icon.png')" height="20px" width="20px" />
        Copyright © 2022 - {{ new Date().getFullYear() }}
      </a>
    </p>
    <!-- <p>
      <a href="https://github.com/HaiGeMaster" target="_blank">
        HaiGeMaster
      </a>
    </p> -->
    <p v-if="copyrightInfo.icpText">
      <a href="http://beian.miit.gov.cn" target="_blank">
        <img :src="$G_ImgHandle('/assets/fixed_content/icpbeian.png')" />
        <!-- 粤ICP备2023097526号 -->
        {{ copyrightInfo.icpText }}
      </a>
    </p>
    <p v-if="copyrightInfo.gwText">
      <a
        :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${copyrightInfo.gwNumber}`"
        target="_blank"
      >
        <img :src="$G_ImgHandle('/assets/fixed_content/gwbeian.png')" />
        <!-- 粤公网安备?号(申请中) -->
        {{ copyrightInfo.gwText }}
      </a>
    </p>
    <p>
      Powered by
      <a href="https://www.mdui.org/" target="_blank"> MDUI </a>
      &
    </p>
    <p>
      <a href="https://www.xbedrock.com/info" target="_blank"> Material Design Forum </a>
    </p>
  </div>
</template>
<script>
import {} from // SetInfoData,
// GetInfoData,
'@/api/global.js'
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
export default {
  name: 'drawer-append-footer-copyright',
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
    }
  },
  computed: {
    // 版权信息
    copyrightInfo() {
      const currentYear = new Date().getFullYear()
      // 提取公安备案号中的数字
      const gwNumber = this.mainStore.getInfoData.site_gongan_beian
        ? this.mainStore.getInfoData.site_gongan_beian.match(/\d+/)[0]
        : ''
      return {
        startYear: 2022,
        currentYear,
        icpText: this.mainStore.getInfoData.site_icp_beian,
        gwText: this.mainStore.getInfoData.site_gongan_beian,
        gwNumber: gwNumber,
        poweredBy: [
          { name: 'Vuetify', url: 'https://vuetifyjs.com/' },
          { name: 'Material Design Forum', url: 'https://www.xbedrock.com/info' },
        ],
      }
    },
  },
}
</script>
