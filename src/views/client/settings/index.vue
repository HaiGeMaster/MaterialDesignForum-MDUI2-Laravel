<template>
  <div id="page-settings" style="padding: 16px">
    <!-- //服务器不再从客户端获取主题cookie，而是从数据库中获取默认主题 -->
    <!-- <mdui-card style="width: 100%;" :variant="mainStore.getIsDark ? 'filled' : 'elevated'">
      <mdui-list>
        <mdui-list-subheader>
          {{ IsTauri ?
            `${$t('Message.Admin.Options.Theme')}(${$t('Message.App.TheCurrentEnvironmentIsUnavailable')})` :
            $t('Message.Admin.Options.Theme') }}
        </mdui-list-subheader>

        <mdui-list-item v-for="item in form_data" :key="item.name" :headline="item.name + '(v' + item.version + ')'"
          :description="item.author + ' - ' + item.description" :disabled="item.disabled || IsTauri"
          @click="SwitchClientTheme(item.name)">
          <mdi-icon slot="icon" :icon="item.icon" :span_style="`color: ${item.icon_color};`" />
        </mdui-list-item>

        <ListItemSkeleton v-if="loading" v-for="i in 2" :key="i" />

      </mdui-list>
    </mdui-card>

    <br />
    <br /> -->
    <mdui-card
      style="width: 100%"
      :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
      v-if="
        userStore.getIsLogin && (oauths_link.github || oauths_link.google || oauths_link.microsoft)
      "
    >
      <mdui-list-subheader>
        {{
          IsTauri
            ? `${$t('Message.Components.Account.ThirdPartyAccounts')}(${$t('Message.App.TheCurrentEnvironmentIsUnavailable')})`
            : $t('Message.Components.Account.ThirdPartyAccounts')
        }}
      </mdui-list-subheader>

      <mdui-list-item
        :disabled="IsTauri"
        v-show="oauths_link.github"
        :href="oauths.github == null ? oauths_link.github : ''"
        rel="noopener noreferrer"
        :nonclickable="oauths.github != null"
        :headline="$t('Message.Components.Account.GithubAccount')"
        :description="
          oauths.github == null
            ? $t('Message.Components.Account.SssociatedNLogin', {
                value: $t('Message.Components.Account.GithubAccount'),
              })
            : $t('Message.Components.Account.AlreadySssociated') +
              oauths.github.oauth_user_email +
              '(' +
              oauths.github.oauth_user_name +
              ')'
        "
      >
        <img
          slot="icon"
          :src="$G_ImgHandle('/assets/fixed_content/github.png')"
          style="width: 24px"
        />

        <mdui-button-icon v-if="oauths.github == null" slot="end-icon">
          <mdi-icon icon="mdi-open-in-new" />
        </mdui-button-icon>

        <mdui-button
          v-else
          slot="end-icon"
          variant="outlined"
          @click.stop="DeleteOauth(oauths.github.oauth_id)"
        >
          <mdi-icon icon="mdi-link-off" slot="icon" />
          {{ $t('Message.Components.Account.Disassociation') }}
        </mdui-button>
      </mdui-list-item>
      <!-- v-show="oauths_link.google" -->
      <mdui-list-item
        :disabled="IsTauri"
        v-show="oauths_link.google"
        :href="oauths.google == null ? oauths_link.google : ''"
        rel="noopener noreferrer"
        :nonclickable="oauths.google != null"
        :headline="$t('Message.Components.Account.GoogleAccount')"
        :description="
          oauths.google == null
            ? $t('Message.Components.Account.SssociatedNLogin', {
                value: $t('Message.Components.Account.GoogleAccount'),
              })
            : $t('Message.Components.Account.AlreadySssociated') +
              oauths.google.oauth_user_email +
              '(' +
              oauths.google.oauth_user_name +
              ')'
        "
      >
        <img
          slot="icon"
          :src="$G_ImgHandle('/assets/fixed_content/google.png')"
          style="width: 24px"
        />

        <mdui-button-icon v-if="oauths.google == null" slot="end-icon">
          <mdi-icon icon="mdi-open-in-new" />
        </mdui-button-icon>

        <mdui-button
          v-else
          slot="end-icon"
          variant="outlined"
          @click.stop="DeleteOauth(oauths.google.oauth_id)"
        >
          <mdi-icon icon="mdi-link-off" slot="icon" />
          {{ $t('Message.Components.Account.Disassociation') }}
        </mdui-button>
      </mdui-list-item>

      <mdui-list-item
        :disabled="IsTauri"
        v-show="oauths_link.microsoft"
        :href="oauths.microsoft == null ? oauths_link.microsoft : ''"
        rel="noopener noreferrer"
        :nonclickable="oauths.microsoft != null"
        :headline="$t('Message.Components.Account.MicrosoftAccount')"
        :description="
          oauths.microsoft == null
            ? $t('Message.Components.Account.SssociatedNLogin', {
                value: $t('Message.Components.Account.MicrosoftAccount'),
              })
            : $t('Message.Components.Account.AlreadySssociated') +
              oauths.microsoft.oauth_user_email +
              '(' +
              oauths.microsoft.oauth_user_name +
              ')'
        "
      >
        <img
          slot="icon"
          :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')"
          style="width: 24px"
        />

        <mdui-button-icon v-if="oauths.microsoft == null" slot="end-icon">
          <mdi-icon icon="mdi-open-in-new" />
        </mdui-button-icon>

        <mdui-button
          v-else
          slot="end-icon"
          variant="outlined"
          @click.stop="DeleteOauth(oauths.microsoft.oauth_id)"
        >
          <mdi-icon icon="mdi-link-off" slot="icon" />
          {{ $t('Message.Components.Account.Disassociation') }}
        </mdui-button>
      </mdui-list-item>

      <mdui-list-item
        :disabled="IsTauri"
        v-show="oauths_link.sso"
        :href="oauths.sso == null ? oauths_link.sso : ''"
        rel="noopener noreferrer"
        :nonclickable="oauths.sso != null"
        :headline="
          sso_client_main_name
            ? $t('Message.Components.Account.ValueAccount', { value: sso_client_main_name })
            : $t('Message.Components.Account.SSOAccount')
        "
        :description="
          oauths.sso == null
            ? $t('Message.Components.Account.SssociatedNLogin', {
                value: sso_client_main_name
                  ? $t('Message.Components.Account.ValueAccount', { value: sso_client_main_name })
                  : $t('Message.Components.Account.SSOAccount'),
              })
            : $t('Message.Components.Account.AlreadySssociated') +
              oauths.sso.oauth_user_email +
              '(' +
              oauths.sso.oauth_user_name +
              ')'
        "
      >
        <img slot="icon" :src="$G_ImgHandle('/assets/fixed_content/sso.png')" style="width: 24px" />

        <mdui-button-icon v-if="oauths.sso == null" slot="end-icon">
          <mdi-icon icon="mdi-open-in-new" />
        </mdui-button-icon>

        <mdui-button
          v-else
          slot="end-icon"
          variant="outlined"
          @click.stop="DeleteOauth(oauths.sso.oauth_id)"
        >
          <mdi-icon icon="mdi-link-off" slot="icon" />
          {{ $t('Message.Components.Account.Disassociation') }}
        </mdui-button>
      </mdui-list-item>
    </mdui-card>
  </div>
</template>
<script>
import {
  SwitchClientTheme,
  // GetThemeData,
  // GetOauths,
  DeleteOauth,
  // GetOauthLink,
  GetBaseUrl,
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js'
import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
export default {
  name: 'settings-page',
  components: {
    ListItemSkeleton,
  },
  data: () => ({
    form_data: null,
    loading: true,
    oauths: {
      github: null,
      google: null,
      microsoft: null,
      sso: null,
    },
    oauths_link: {
      github: '',
      google: '',
      microsoft: '',
      sso: '',
    },
    sso_client_main_name: '',
    delete_loading_id: null,
  }),
  methods: {
    SwitchClientTheme(val) {
      if (SwitchClientTheme(val)) {
        window.location.reload()
      }
    },
    async GetThemeData() {
      this.loading = true
      this.form_data = null
      var user_token = this.$G_GetUserToken()
      const res = await GetThemeData({
        user_token: user_token,
      })
      if (res.data.is_get) {
        this.form_data = res.data.form_data
        this.$forceUpdate()
        this.loading = false
      } else {
        this.loading = false
      }
    },
    async GetOauths() {
      // if (this.$route.name!='settings'||this.$route.name!='lang-settings') {
      //   return
      // }

      if (!this.userStore.getIsLogin) {
        return
      }

      this.oauths_link.github = await GetOauthLink('github')
      this.oauths_link.google = await GetOauthLink('google')
      this.oauths_link.microsoft = await GetOauthLink('microsoft')
      this.oauths_link.sso = await GetOauthLink('sso')

      var user_token = this.$G_GetUserToken()
      const res = await GetOauths({
        user_token: user_token,
      })
      if (res.data.is_get) {
        this.oauths = res.data.data
        this.sso_client_main_name = res.data.data.sso_client_main_name
        console.log(this.sso_client_main_name)
        this.$forceUpdate()
      }
    },
    async DeleteOauth(oauth_id) {
      this.delete_loading_id = oauth_id
      var user_token = this.$G_GetUserToken()
      const res = await DeleteOauth({
        user_token: user_token,
        oauth_id: oauth_id,
      })
      if (res.data.is_delete) {
        this.delete_loading_id = null
        this.GetOauths()
      } else {
        this.delete_loading_id = null
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'settings' || val.name == 'lang-settings') {
        this.$G_UpdateWebTitleAndAppbarSubTitle(
          this.$t('Message.Components.DevDialog.Setting'),
          this.$t('Message.Components.DevDialog.Setting'),
        )
      }
    },
  },
  computed: {
    // RouteIsAdmin() {
    //   //如果路由包含admin
    //   return this.$route.path.includes('admin')
    // },
    IsTauri() {
      return IsTauri()
    },
    IsElectron() {
      return IsElectron()
    },
    IsMobileApp() {
      return IsMobileApp()
    },
    ReturnGetIsLogin() {
      return this.userStore.getIsLogin
    },
  },
  created() {
    this.GetThemeData()
    this.GetOauths()
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    '$route.path'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(val)
      // this.GetOauths()
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnGetIsLogin(val) {
      if (val) {
        this.GetOauths()
      } else {
        this.oauths = {
          github: null,
          google: null,
          microsoft: null,
          sso: null,
        }
      }
    },
  },
}
</script>
<style lang="less">
#page-settings {
  max-width: 800px;
  margin: auto;
}
</style>
