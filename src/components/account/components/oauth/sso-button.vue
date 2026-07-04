
<template>
  <mdui-tooltip placement="top" :content="DisabledRule?
    $t('Message.App.TheCurrentEnvironmentIsUnavailable'):
    (sso_client_main_name?$t('Message.Components.Account.LoginWithValue',{value:sso_client_main_name}) :$t('Message.Components.Account.LoginWithSSO') )">

    <mdui-button-icon  @click="Onclick" style="width: 36px;height: 36px;">
      <img :src="$G_ImgHandle('/assets/fixed_content/sso.png')" style="width: 24px;height: 24px;" />
    </mdui-button-icon>

  </mdui-tooltip>
</template>
<script>
import {
  // GetOauthLink,
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js';
export default {
  name: "common-account-components-oauth-sso-button",
  data: () => ({
    oauths_link: '',
    sso_client_main_name: '',
  }),
  computed: {
    DisabledRule() {
      return IsTauri() || IsElectron() || IsMobileApp()
    }
  },
  methods: {
    async GetOauthLink() {
      this.oauths_link = await GetOauthLink('sso')
      this.sso_client_main_name = window.sso_client_main_name;
      console.log(this.sso_client_main_name);
      this.$forceUpdate();
    },
    Onclick() {
      if (this.DisabledRule) {
        return;
      }
      window.open(this.oauths_link, '_blank');
    }
  },
  created() {
    this.GetOauthLink();
  }
}
</script>
