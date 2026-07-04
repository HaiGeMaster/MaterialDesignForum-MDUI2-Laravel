<template>
  <!-- :fullscreen="$store.getters.GetMobile" -->
  <mdui-dialog ref="dialog" class="login-dialog" close-on-overlay-click
    @close.self="() => { $store.dispatch('Dialog/Set_LoginDialog', false) }">
    <!-- :headline="$t('Message.Components.Account.Login')" -->

    <div slot="headline" style="width: 100%;">
      <div style="display: flex;">
        <span>
          {{ $t('Message.Components.Account.Login') }}
        </span>
        <div class="flex-grow"></div>
        <!-- <SsoButton /> -->
        <GithubButton />
        <GoogleButton />
        <MicrosoftButton />
      </div>
    </div>

    <!-- <mdui-top-app-bar slot="header">
      <mdui-top-app-bar-title>
        {{ $t('Message.Components.Account.Login') }}
      </mdui-top-app-bar-title>
      <GithubButton />
      <MicrosoftButton />
    </mdui-top-app-bar> -->

    <!-- <mdui-button-icon slot="icon" v-if="$store.getters.GetMobile"
      @click="() => { $store.dispatch('Dialog/Set_LoginDialog', false) }">
      <mdi-icon icon="mdi-close"></mdi-icon>
    </mdui-button-icon> -->

    <!-- margin-top:50%; -->
    <form :style="!$store.getters.GetMobile ? 'width: 300px;' : ''">
      <FieldName :label="$t('Message.Components.Account.UserNameOrEMail')"
        @cinput="(val) => { UserNameOrEMail = val }" />
      <br />
      <br />
      <FieldPassword :label="$t('Message.Components.Account.Password')" @cinput="(val) => { Password = val }" />
      <br />
      <br />
      <FieldCaptcha :label="$t('Message.Components.Account.ImageCode')" v-if="ErrorCount >= 3"
        @cinput="(val) => { Captcha = val }" />
      <br v-if="ErrorCount >= 3" />
      <br v-if="ErrorCount >= 3" />
      <!-- <mdui-checkbox :checked="CanUseCookie" @input="CanUseCookie = !CanUseCookie">
        {{ $t('Message.Components.Account.AgreeToUseCookieToKeepLoggedIn') }}
      </mdui-checkbox> 使用Cookie对话框替代了选项-->
      <br />
      <!-- :disabled="!CanUseCookie" -->
      <Submit :text="$t('Message.Components.Account.Login')" :loading="is_loading" @submit_click="OnSubmit" />
      <br />
      <FieldMore v-if="show_field_more && !persistent" :dialog="model" :items="FieldMoreItems"
        @item_select="item_select" />
    </form>

  </mdui-dialog>
</template>
<script>
import FieldName from '@/components/account/components/field-name.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldCaptcha from '@/components/account/components/field-captcha.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import SsoButton from './components/oauth/sso-button.vue'
import GithubButton from './components/oauth/github-button.vue'
import GoogleButton from './components/oauth/google-button.vue'
import MicrosoftButton from './components/oauth/microsoft-button.vue'
import {
  Login,
  SetUserToken,
  GetUserToken,
  RemoveUserToken,
  Auto_Login,
} from '@/api/global.js';
export default {
  name: "login-dialog",
  props: {
    persistent: {
      type: Boolean,
      default: false
    },
    show_field_more: {
      type: Boolean,
      default: true
    },
    is_admin: {
      type: Boolean,
      default: false
    },
  },
  components: {
    FieldName,
    FieldPassword,
    FieldCaptcha,
    FieldMore,
    Submit,
    SsoButton,
    GithubButton,
    GoogleButton,
    MicrosoftButton,
  },
  data: () => ({
    CanUseCookie: false,
    UserNameOrEMail: "",
    Password: "",
    Captcha: "",
    ErrorCount: 0,
    is_loading: false,
    FieldMoreItems: [
      {
        text: "Message.Components.Account.ForgetPassword",
        value: "ForgetPassword"
      },
      {
        text: "Message.Components.Account.Register",
        value: "Register"
      }
    ],
    model: false,
  }),
  methods: {
    item_select(value) {
      if (this.persistent && !this.$store.getters['User/GetIsLogin']) {
        return
      }
      this.$store.dispatch('Dialog/Set_LoginDialog', false)
      switch (value) {
        case "ForgetPassword":
          this.$store.dispatch('Dialog/Set_ResetDialog', true)
          break;
        case "Register":
          this.$store.dispatch('Dialog/Set_RegisterDialog', true)
          break;
      }
    },
    validate() {
      return this.UserNameOrEMail != '' && this.Password != '' && (this.ErrorCount < 3 || this.Captcha != '')
    },
    async OnSubmit() {
      RemoveUserToken()
      if (this.validate()) {
        this.is_loading = true
        const response = await Login(
          {
            username_or_email: this.UserNameOrEMail,
            password: this.Password,
            image_capthca: this.Captcha,
          }
        )
        if (response.data.is_login == true) {
          this.is_loading = false
          SetUserToken(response.data.token)
          this.Auto_Login()
        } else {
          this.is_loading = false
          this.ErrorCount++
        }
      }
    },
    BackAndOutLogin() {
      this.$store.dispatch('User/Set_IsLogin', false)
      this.$store.dispatch('User/Set_UserToken', '')
      this.$store.dispatch('User/Set_User', this.$store.getters['User/GetDefaultUser'])
      RemoveUserToken()
      if (this.$route.path !== `${this.$G_UrlHeaderLang()}/`) {
        this.$router.push(`${this.$G_UrlHeaderLang()}/`)
      }
    },
    async Auto_Login() {

      var token = GetUserToken()
      if (token != null && token != '') {
        this.is_loading = true
        const response = await Auto_Login(token)
        if (response.data.is_login == true) {
          this.$store.dispatch('User/Set_IsLogin', true)
          this.$store.dispatch('User/Set_UserToken', token)
          this.$store.dispatch('User/Set_User', response.data.user)
          this.$store.dispatch('Snackbar/Show_Snackbar', {
            text: this.$t('Message.Components.Account.XWelcomeBack', {
              value: response.data.user.username,
            }),
          })
          this.ErrorCount = 0
          this.Captcha = ''
          this.is_loading = false
          this.$store.dispatch('Dialog/Set_LoginDialog', false)
        } else {
          this.is_loading = false
          this.BackAndOutLogin()
        }
      }
    },
    async GetLoginData() {
      if (!this.$store.getters['User/GetIsLogin']) {
        return
      }
      if (GetUserToken() == '') {
        return
      }
      const response = await Auto_Login(GetUserToken())
      if (response.data.is_login == true) {
        var user = response.data.user
        if (user == null) {
          this.BackAndOutLogin()
          return
        }
        for (var key in this.$store.getters['User/GetUser']) {
          if (this.$store.getters['User/GetUser'][key] != user[key]) {
            this.$store.dispatch('User/Set_User', user)
          }
        }
      }
    },
  },
  created() {
    if (this.persistent) {
      this.$store.dispatch('Dialog/Set_LoginDialog', true)
    }
  },
  mounted() {
    this.Auto_Login()
  },
  computed: {
    Store_Dialog_LoginDialog() {
      return this.$store.getters['Dialog/GetLoginDialog']
    }
  },
  watch: {
    '$route'(to, from) {
      this.GetLoginData()
    },
    Store_Dialog_LoginDialog(val) {
      this.$refs.dialog.open = val
      this.model = val
    },
    model(val) {
      if (!val) {
        this.$store.dispatch('Dialog/Set_LoginDialog', false)
      }
    },
  }
}
</script>
