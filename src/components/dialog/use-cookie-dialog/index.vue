<template>
  <mdui-dialog ref="sheet" stacked-actions>
    <p slot="description">
      <!-- 我们使用可选的 Cookie，通过社交媒体连接等方式改善你在我们网站上的体验，并且根据你的在线活动投放个性化的广告。
      如果你拒绝可选 Cookie，则我们将仅使用为你提供服务所必须的 Cookie。
      你可以单击页面底部的"管理 Cookie"更改你的选择。 -->
      {{ $t('Message.Components.UseCookieDialog.cookieConsent.description') }}
    </p>
    <mdui-button slot="action" @click="acceptOptional" full-width style="width: 100%">
      {{ $t('Message.Components.UseCookieDialog.cookieConsent.accept') }}
      <mdi-icon slot="end-icon" v-if="isOptionalAcceptSelected" icon="mdi-check"></mdi-icon>
    </mdui-button>
    <mdui-button
      slot="action"
      variant="tonal"
      @click="rejectOptional"
      full-width
      style="width: 100%"
    >
      {{ $t('Message.Components.UseCookieDialog.cookieConsent.reject') }}
      <mdi-icon slot="end-icon" v-if="isOptionalRejectSelected" icon="mdi-check"></mdi-icon>
    </mdui-button>
    <mdui-button
      slot="action"
      variant="outlined"
      @click="manageCookies"
      full-width
      style="width: 100%"
    >
      {{ $t('Message.Components.UseCookieDialog.cookieConsent.manage') }}
    </mdui-button>

    <div slot="action" style="width: 100%">
      <LanguageButton slotname="btn"></LanguageButton>
    </div>

    <mdui-dialog
      :headline="$t('Message.Components.UseCookieDialog.cookieConsent.dialogTitle')"
      ref="dialog"
      :stacked-actions="mainStore.getMobile"
      :fullscreen="mainStore.getMobile"
    >
      <div slot="description">
        <p>
          <!-- 大多数 Xbedrock 网站都使用 Cookie。Cookie 是放置在设备上的小文本文件，用于存储数据，供 Web 服务器以后使用。Xbedrock 和我们的第三方合作伙伴使用 Cookie
            来记住你的首选项和设置、帮助你登录、向你展示个性化的广告，以及分析我们网站的运行状况。有关详细信息，请参阅隐私声明中的"Cookie 和类似技术"部分。 -->

          {{
            $t('Message.Components.UseCookieDialog.cookieConsent.dialogIntro', {
              domain: GetMainDomain,
            })
          }}
        </p>

        <mdui-divider></mdui-divider>

        <h3 class="text-h6 font-weight-medium">
          {{ $t('Message.Components.UseCookieDialog.cookieConsent.requiredTitle') }}
        </h3>
        <p>
          <!-- 我们使用必需的 Cookie 执行重要的网站功能。例如，用于让你登录、保存你的语言首选项、提供购物车体验、改进性能、路由 Web
          服务器之间的流量、检测屏幕尺寸、确定页面加载时间、改善用户体验以及进行受众数据统计。 -->
          {{ $t('Message.Components.UseCookieDialog.cookieConsent.requiredDesc') }}
        </p>
        <p>
          <!-- 以下为我们必须使用的Cookie名称： -->
          {{ $t('Message.Components.UseCookieDialog.cookieConsent.requiredCookies') }}
        </p>
        <table>
          <thead>
            <tr>
              <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_name') }}</th>
              <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_desc') }}</th>
              <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_source') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>theme</strong></td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.theme') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.self_site') }}</td>
            </tr>
            <tr>
              <td><strong>user_token</strong></td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.user_token') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.self_site') }}</td>
            </tr>
            <tr>
              <td><strong>lang</strong></td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.lang') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.self_site') }}</td>
            </tr>
            <tr>
              <td><strong>cf_clearance</strong></td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cf_clearance') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cloudflare') }}</td>
            </tr>
            <tr>
              <td><strong>_clsk</strong></td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields._clsk') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cloudflare') }}</td>
            </tr>
            <tr>
              <td><strong>_clck</strong></td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields._clck') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.cloudflare') }}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin: 8px">
          <mdui-button @click="acceptRequired">
            <!-- 接受 -->
            {{ $t('Message.Components.UseCookieDialog.cookieConsent.accept') }}
            <mdi-icon slot="end-icon" v-if="requiredAccepted" icon="mdi-check"></mdi-icon>
          </mdui-button>
          <!-- @click="rejectRequired" -->
          <mdui-button variant="tonal" disabled>
            <!-- 拒绝 -->
            {{ $t('Message.Components.UseCookieDialog.cookieConsent.reject') }}
          </mdui-button>
        </div>

        <mdui-divider></mdui-divider>

        <h3 class="text-h6 font-weight-medium">
          <!-- 分析 -->
          {{ $t('Message.Components.UseCookieDialog.cookieConsent.analyticsTitle') }}
        </h3>
        <p>
          <!-- 我们允许第三方使用分析 Cookie 来了解你如何使用我们的网站，以便我们能够对其进行完善，同时第三方也可以使用此类信息进行产品开发和改进，他们可能会在不属于 Xbedrock 或非
              Xbedrock 运营的网站上使用这些产品。 -->
          {{
            $t('Message.Components.UseCookieDialog.cookieConsent.analyticsDesc', {
              domain: GetMainDomain,
            })
          }}
        </p>
        <p>
          <!-- 我们将一些分析 Cookie 用于广告与操作日志目的。 -->
          {{ $t('Message.Components.UseCookieDialog.cookieConsent.analyticsCookies') }}
        </p>
        <p>
          <!-- 示例 Cookie: -->
          {{ $t('Message.Components.UseCookieDialog.cookieConsent.exampleCookies') }}
        </p>
        <table>
          <thead>
            <tr>
              <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_name') }}</th>
              <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_desc') }}</th>
              <th>{{ $t('Message.Components.UseCookieDialog.cookieFields.field_source') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>MUID</strong></td>
              <!-- <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.MUID') }}</td> -->
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.MUID') }}</td>
              <td>{{ $t('Message.Components.UseCookieDialog.cookieFields.microsoft') }}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin: 8px">
          <mdui-button @click="acceptAnalytics">
            <!-- 接受 -->
            {{ $t('Message.Components.UseCookieDialog.cookieConsent.accept') }}
            <mdi-icon slot="end-icon" v-if="analyticsAccepted" icon="mdi-check"></mdi-icon>
          </mdui-button>
          <mdui-button variant="tonal" @click="rejectAnalytics">
            <!-- 拒绝 -->
            {{ $t('Message.Components.UseCookieDialog.cookieConsent.reject') }}
            <mdi-icon slot="end-icon" v-if="!analyticsAccepted" icon="mdi-check"></mdi-icon>
          </mdui-button>
        </div>
      </div>

      <mdui-button
        slot="action"
        @click="savePreferences"
        :full-width="mainStore.getMobile"
        :style="mainStore.getMobile ? 'width:100%' : ''"
      >
        <!-- 保存 -->
        {{ $t('Message.Components.UseCookieDialog.cookieConsent.save') }}
      </mdui-button>
      <mdui-button
        slot="action"
        variant="tonal"
        @click="closeDialog"
        :full-width="mainStore.getMobile"
        :style="mainStore.getMobile ? 'width:100%' : ''"
      >
        <!-- 关闭 -->
        {{ $t('Message.Components.UseCookieDialog.cookieConsent.close') }}
      </mdui-button>
    </mdui-dialog>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useLocalDataStore } from '@/stores/local-data'
// import { AddClarityScript } from '@/api/global.js'
import LanguageButton from '@/components/language-button/index.vue'
export default {
  name: 'UseCookieDialog',
  props: {
    model: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    LanguageButton,
  },
  data() {
    return {
      mainStore: useMainStore(),
      localDataStore: useLocalDataStore(),
      sheet: false, // 控制底部工作表的显示状态
      dialog: false, // 默认显示对话框
      requiredAccepted: true, // 必需Cookie是否被接受
      analyticsAccepted: true, // 分析Cookie是否被接受
      // socialAccepted: false,  // 社交媒体Cookie是否被接受
      // adsAccepted: false,     // 广告Cookie是否被接受
    }
  },
  computed: {
    // 计算底部工作表接受按钮是否应该显示勾选图标
    isOptionalAcceptSelected() {
      return this.requiredAccepted && this.analyticsAccepted
    },
    // 计算底部工作表拒绝按钮是否应该显示勾选图标
    isOptionalRejectSelected() {
      return this.requiredAccepted && !this.analyticsAccepted
    },
    //获取主域名
    GetMainDomain() {
      const hostname = window.location.hostname
      const parts = hostname.split('.')
      let mainDomain = ''
      if (parts.length > 2) {
        // 取最后两部分（适用于大多数 .com/.org/.net 等情况）
        mainDomain = parts.slice(-2).join('.')
      } else {
        mainDomain = hostname
      }
      return mainDomain
    },
  },
  methods: {
    // 保存所有Cookie偏好到localStorage
    savePreferences() {
      const preferences = {
        required: this.requiredAccepted,
        analytics: this.analyticsAccepted,
        // social: this.socialAccepted,
        // ads: this.adsAccepted,
      }
      this.localDataStore.setCookiePreferences(preferences)
      //console.log('Cookie偏好已保存:', preferences);
      this.loadPreferences()
      this.$refs.dialog.open = false
    },
    // 从localStorage加载Cookie偏好
    loadPreferences() {
      const savedPreferences = this.localDataStore.getCookiePreferences
      if (savedPreferences) {
        try {
          const preferences = JSON.parse(savedPreferences)
          this.requiredAccepted = preferences.required !== undefined ? preferences.required : true // 必需Cookie默认启用
          this.analyticsAccepted = preferences.analytics || false
          // this.socialAccepted = preferences.social || false;
          // this.adsAccepted = preferences.ads || false;
          //console.log('已加载保存的Cookie偏好:', preferences);
          if (this.analyticsAccepted) {
            //console.log('用户同意 analyticsAccepted 添加Clarity脚本用来分析')
            // AddClarityScript() //添加Clarity脚本用来分析！！！
          } else if ((window.location.origin = 'https://www.xbedrock.com')) {
            //console.log('官方网站开启分析')
            // AddClarityScript() //添加Clarity脚本用来分析！！！
          } else {
            //console.log('非官方网站，不开启分析')
            // AddClarityScript() //添加Clarity脚本用来分析！！！
          }
        } catch (e) {
          //console.error('解析保存的Cookie偏好失败:', e);
          // 如果解析失败，使用默认值
          this.resetToDefaults()
        }
      } else {
        // 如果没有保存的偏好，使用默认值
        // this.resetToDefaults();
        this.$refs.sheet.open = true
      }
    },
    // 重置为默认值（必需Cookie启用，其他禁用）
    resetToDefaults() {
      this.requiredAccepted = true // 必需Cookie总是启用的
      this.analyticsAccepted = true
      // this.socialAccepted = false;
      // this.adsAccepted = false;
    },
    acceptRequired() {
      //接受对话框里的必需Cookie
      //console.log('用户接受了必需Cookie')
      this.requiredAccepted = true
      this.savePreferences() // 保存设置
    },
    rejectRequired() {
      //拒绝对话框里的必需Cookie
      // 注意：必需Cookie不应该被拒绝，因为它们对网站功能至关重要
      // 这个方法可能只是为了完整性而保留
      //console.log('用户尝试拒绝必需Cookie - 这通常不应该发生')
      this.requiredAccepted = true // 仍然保持启用状态，因为必需Cookie不能被拒绝
      // this.savePreferences(); // 保存设置
    },
    acceptAnalytics() {
      //接受对话框里的分析Cookie
      //console.log('用户接受了分析Cookie')
      this.analyticsAccepted = true
      // this.savePreferences(); // 保存设置
    },
    rejectAnalytics() {
      //拒绝对话框里的分析Cookie
      //console.log('用户拒绝了分析Cookie')
      this.analyticsAccepted = false
      // this.savePreferences(); // 保存设置
    },
    closeDialog() {
      this.$refs.dialog.open = false
    },
    acceptOptional() {
      //接受所有Cookie
      // 处理接受可选Cookie的逻辑
      //console.log('用户接受了可选Cookie');
      // 接受可选Cookie意味着接受必需和分析Cookie
      this.requiredAccepted = true
      this.analyticsAccepted = true
      this.savePreferences() // 保存设置
      this.$emit('model', false)
      this.$refs.sheet.open = false // 关闭底部工作表
    },
    rejectOptional() {
      //拒绝所有Cookie
      // 处理拒绝可选Cookie的逻辑
      //console.log('用户拒绝了可选Cookie');
      // 拒绝可选Cookie意味着只使用必需的Cookie
      this.requiredAccepted = true // 必需Cookie总是启用的
      this.analyticsAccepted = false // 拒绝分析Cookie
      this.savePreferences() // 保存设置
      this.$emit('model', false)
      this.$refs.sheet.open = false // 关闭底部工作表
    },
    manageCookies() {
      // 处理管理Cookie的逻辑
      //console.log('用户点击了管理Cookie');
      // 打开对话框显示详细的Cookie管理选项
      this.$refs.dialog.open = true
    },
  },
  mounted() {
    this.loadPreferences()
  },
  watch: {
    model(val) {
      this.$refs.sheet.open = val
    },
  },
}
</script>

<style lang="less" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #80808080;
  padding: 10px;
  text-align: left;
}

// th {
//   // background-color: #f2f2f2;
// }

// tr:nth-child(even) {
//   // background-color: #f9f9f9;
// }
</style>
