<template>
  <mdui-dialog
    ref="dialog"
    class="login-dialog"
    close-on-overlay-click
    @close.self="
      () => {
        dialogStore.setLoginDialog(false)
      }
    "
  >
    <!-- :headline="$t('Message.Components.Account.Login')" -->

    <div slot="headline" style="width: 100%">
      <div style="display: flex">
        <span>
          {{ $t('Message.Components.Account.Login') }}
        </span>
        <div class="flex-grow"></div>
        <!-- <SsoButton /> -->
        <GithubButton v-if="oauthList.github == true" />
        <GoogleButton v-if="oauthList.google == true" />
        <MicrosoftButton v-if="oauthList.microsoft == true" />
      </div>
    </div>

    <form :style="!mainStore.getMobile ? 'width: 300px;' : ''">
      <FieldName
        :label="$t('Message.Components.Account.UserNameOrEMail')"
        @cinput="
          (val) => {
            UserNameOrEMail = val
          }
        "
      />
      <br />
      <br />
      <FieldPassword
        :label="$t('Message.Components.Account.Password')"
        @cinput="
          (val) => {
            Password = val
          }
        "
      />
      <br />
      <br />
      <FieldCaptcha
        :label="$t('Message.Components.Account.ImageCode')"
        v-if="ErrorCount >= 3"
        @cinput="
          (val) => {
            Captcha = val
          }
        "
      />
      <br v-if="ErrorCount >= 3" />
      <br v-if="ErrorCount >= 3" />
      <!-- <mdui-checkbox :checked="CanUseCookie" @input="CanUseCookie = !CanUseCookie">
        {{ $t('Message.Components.Account.AgreeToUseCookieToKeepLoggedIn') }}
      </mdui-checkbox> 使用Cookie对话框替代了选项-->
      <br />
      <!-- :disabled="!CanUseCookie" -->
      <Submit
        :text="$t('Message.Components.Account.Login')"
        :loading="is_loading"
        @submit_click="OnSubmit"
      />
      <br />
      <FieldMore
        v-if="show_field_more && !persistent"
        :dialog="model"
        :items="FieldMoreItems"
        @item_select="item_select"
      />
    </form>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'
import FieldName from '@/components/account/components/field-name.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldCaptcha from '@/components/account/components/field-captcha.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import SsoButton from './components/oauth/sso-button.vue'
import GithubButton from './components/oauth/github-button.vue'
import GoogleButton from './components/oauth/google-button.vue'
import MicrosoftButton from './components/oauth/microsoft-button.vue'
import { Login, SetUserToken, GetUserToken, RemoveUserToken, Auto_Login } from '@/api/global.js'
import { dialog } from 'mdui'
export default {
  name: 'login-dialog',
  props: {
    persistent: {
      type: Boolean,
      default: false,
    },
    show_field_more: {
      type: Boolean,
      default: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
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
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    userStore: useUserStore(),
    snackbarStore: useSnackbarStore(),
    CanUseCookie: false,
    UserNameOrEMail: '',
    Password: '',
    Captcha: '',
    ErrorCount: 0,
    is_loading: false,
    FieldMoreItems: [
      {
        text: 'Message.Components.Account.ForgetPassword',
        value: 'ForgetPassword',
      },
      {
        text: 'Message.Components.Account.Register',
        value: 'Register',
      },
    ],
    model: false,
  }),
  methods: {
    item_select(value) {
      if (this.persistent && !this.userStore.getIsLogin) {
        return
      }
      this.dialogStore.setLoginDialog(false)
      switch (value) {
        case 'ForgetPassword':
          this.dialogStore.setResetDialog(true)
          break
        case 'Register':
          this.dialogStore.setRegisterDialog(true)
          break
      }
    },
    validate() {
      return (
        this.UserNameOrEMail != '' &&
        this.Password != '' &&
        (this.ErrorCount < 3 || this.Captcha != '')
      )
    },
    async OnSubmit() {
      RemoveUserToken()
      if (this.validate()) {
        this.is_loading = true
        const response = await Login({
          username_or_email: this.UserNameOrEMail,
          password: this.Password,
          image_capthca: this.Captcha,
        })
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
      this.userStore.setIsLogin(false)
      this.userStore.setUserToken('')
      this.userStore.setUser(this.userStore.getDefaultUser)
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
          this.userStore.setIsLogin(true)
          this.userStore.setUserToken(token)
          this.userStore.setUser(response.data.user)
          this.snackbarStore.addMessage({
            text: this.$t('Message.Components.Account.XWelcomeBack', {
              value: response.data.user.username,
            }),
          })
          this.ErrorCount = 0
          this.Captcha = ''
          this.is_loading = false
          this.dialogStore.setLoginDialog(false)
        } else {
          this.is_loading = false
          this.BackAndOutLogin()
        }
      }
    },
    async GetLoginData() {
      if (!this.userStore.getIsLogin) {
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
        for (var key in this.userStore.getUser) {
          if (this.userStore.getUser[key] != user[key]) {
            this.userStore.setUser(user)
          }
        }
      }
    },
  },
  created() {
    if (this.persistent) {
      this.dialogStore.setLoginDialog(true)
    }
  },
  mounted() {
    this.Auto_Login()
  },
  computed: {
    oauthList() {
      return this.mainStore.getAppBaseInfo?.oauth_list || {}
    },
    hasOauth() {
      return this.oauthList.github || this.oauthList.google || this.oauthList.microsoft
    },
    Store_Dialog_LoginDialog() {
      return this.dialogStore.getLoginDialog
    },
  },
  watch: {
    $route(to, from) {
      this.GetLoginData()
    },
    Store_Dialog_LoginDialog(val) {
      this.$refs.dialog.open = val
      this.model = val
    },
    model(val) {
      if (!val) {
        this.dialogStore.setLoginDialog(false)
      }
    },
  },
}
</script>
