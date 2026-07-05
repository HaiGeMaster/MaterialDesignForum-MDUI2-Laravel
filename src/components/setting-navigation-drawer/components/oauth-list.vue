<template>
  <mdui-list>
    <mdui-list-subheader>{{
      $t('Message.Components.Account.ThirdPartyAccounts')
    }}</mdui-list-subheader>

    <mdui-list-item
      v-if="userStore.getIsLogin"
      @click="!oauths.github && (window.location.href = $G_CrossDomain() + '/auth/github/redirect')"
    >
      <img
        slot="icon"
        :src="$G_ImgHandle('/assets/fixed_content/github.png')"
        style="width: 24px; height: 24px; border-radius: 50%"
      />
      {{ $t('Message.Components.Account.GithubAccount') }}
      <div v-if="oauths.github == null" slot="description">
        {{
          $t('Message.Components.Account.SssociatedNLogin', {
            value: $t('Message.Components.Account.GithubAccount'),
          })
        }}
      </div>
      <div v-else slot="description">
        {{
          $t('Message.Components.Account.AlreadySssociated') +
          oauths.github.oauth_user_email +
          '(' +
          oauths.github.oauth_user_name +
          ')'
        }}
      </div>
      <mdi-icon v-if="oauths.github == null" slot="end-icon" icon="mdi-open-in-new" />
      <mdui-tooltip
        v-else
        slot="end-icon"
        :content="$t('Message.Components.Account.Disassociation')"
      >
        <mdui-button-icon
          @click.stop="DeleteOauth(oauths.github.oauth_id)"
          :disabled="delete_loading_id == oauths.github.oauth_id"
          :loading="delete_loading_id == oauths.github.oauth_id"
        >
          <mdi-icon icon="mdi-link-off" />
        </mdui-button-icon>
      </mdui-tooltip>
    </mdui-list-item>

    <mdui-list-item
      v-if="userStore.getIsLogin"
      @click="
        !oauths.microsoft && (window.location.href = $G_CrossDomain() + '/auth/microsoft/redirect')
      "
    >
      <img
        slot="icon"
        :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')"
        style="width: 24px; height: 24px; border-radius: 50%"
      />
      {{ $t('Message.Components.Account.MicrosoftAccount') }}
      <div v-if="oauths.microsoft == null" slot="description">
        {{
          $t('Message.Components.Account.SssociatedNLogin', {
            value: $t('Message.Components.Account.MicrosoftAccount'),
          })
        }}
      </div>
      <div v-else slot="description">
        {{
          $t('Message.Components.Account.AlreadySssociated') +
          oauths.microsoft.oauth_user_email +
          '(' +
          oauths.microsoft.oauth_user_name +
          ')'
        }}
      </div>
      <mdi-icon v-if="oauths.microsoft == null" slot="end-icon" icon="mdi-open-in-new" />
      <mdui-tooltip
        v-else
        slot="end-icon"
        :content="$t('Message.Components.Account.Disassociation')"
      >
        <mdui-button-icon
          @click.stop="DeleteOauth(oauths.microsoft.oauth_id)"
          :disabled="delete_loading_id == oauths.microsoft.oauth_id"
          :loading="delete_loading_id == oauths.microsoft.oauth_id"
        >
          <mdi-icon icon="mdi-link-off" />
        </mdui-button-icon>
      </mdui-tooltip>
    </mdui-list-item>

    <mdui-list-item
      v-if="userStore.getIsLogin"
      @click="!oauths.google && (window.location.href = $G_CrossDomain() + '/auth/google/redirect')"
    >
      <img
        slot="icon"
        :src="$G_ImgHandle('/assets/fixed_content/google.png')"
        style="width: 24px; height: 24px; border-radius: 50%"
      />
      {{ $t('Message.Components.Account.GoogleAccount') }}
      <div v-if="oauths.google == null" slot="description">
        {{
          $t('Message.Components.Account.SssociatedNLogin', {
            value: $t('Message.Components.Account.GoogleAccount'),
          })
        }}
      </div>
      <div v-else slot="description">
        {{
          $t('Message.Components.Account.AlreadySssociated') +
          oauths.google.oauth_user_email +
          '(' +
          oauths.google.oauth_user_name +
          ')'
        }}
      </div>
      <mdi-icon v-if="oauths.google == null" slot="end-icon" icon="mdi-open-in-new" />

      <mdui-tooltip
        v-else
        slot="end-icon"
        :content="$t('Message.Components.Account.Disassociation')"
      >
        <mdui-button-icon
          @click.stop="DeleteOauth(oauths.google.oauth_id)"
          :disabled="delete_loading_id == oauths.google.oauth_id"
          :loading="delete_loading_id == oauths.google.oauth_id"
        >
          <mdi-icon icon="mdi-link-off" />
        </mdui-button-icon>
      </mdui-tooltip>
    </mdui-list-item>
  </mdui-list>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import {
  IsTauri,
  IsElectron,
  IsMobileApp,
  SwitchClientTheme,
  // GetThemeData,
  GetUserOauthBindings,
  DeleteOauth,
  // GetOauthLink,
  AddBodyClass_UseGlassMorphism,
  AddBodyClass_UseGlassMorphismAppbar,
  AddBodyClass_UseGlassMorphismBottomNav,
} from '@/api/global.js'
export default {
  data() {
    return {
      // drawer: true,
      mainStore: useMainStore(),
      userStore: useUserStore(),
      oauths: {
        github: null,
        microsoft: null,
        google: null,
        sso: null,
      },
      // oauths_link: {
      //   github: '',
      //   microsoft: '',
      //   google: '',
      //   sso: '',
      // },
      sso_client_main_name: '',
      delete_loading_id: null,
    }
  },
  computed: {
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    },
  },
  methods: {
    async GetUserOauthBindings() {
      // if (this.$route.name!='settings'||this.$route.name!='lang-settings') {
      //   return
      // }
      if (!this.userStore.getIsLogin) {
        return
      }

      // this.oauths_link.github = await GetOauthLink('github')
      // this.oauths_link.google = await GetOauthLink('google')
      // this.oauths_link.microsoft = await GetOauthLink('microsoft')
      // this.oauths_link.sso = await GetOauthLink('sso')

      var user_token = this.$G_GetUserToken()
      const res = await GetUserOauthBindings({
        user_token: user_token,
      })
      if (res.data.is_get) {
        // this.oauths = res.data.data
        // this.oauths = res.data.data

        this.oauths.github = res.data.data.github ?? null
        this.oauths.microsoft = res.data.data.microsoft ?? null
        this.oauths.google = res.data.data.google ?? null
        this.oauths.sso = res.data.data.sso ?? null

        this.sso_client_main_name = res.data.data.sso_client_main_name
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
        this.GetUserOauthBindings()
      } else {
        this.delete_loading_id = null
      }
    },
  },
  watch: {
    ReturnUserIsLogin(newVal, oldVal) {
      if (newVal) {
        this.GetUserOauthBindings()
      }
    },
  },
  mounted() {
    this.GetUserOauthBindings()
  },
}
</script>
