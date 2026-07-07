<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo / 品牌区 -->
      <div class="login-brand">
        <div class="login-logo">
          <img src="/favicon.png" alt="Logo" class="login-favicon" />
        </div>
        <h1 class="login-title">
          <!-- mainStore.getAppBaseInfo.option_list.site_name +
            ' - ' + -->
          {{ $t('Message.Components.Account.Login') }}
        </h1>
        <!-- <p class="login-subtitle">{{ $t('Message.Components.Account.XWelcomeBack') }}</p> -->
      </div>

      <!-- 表单区 -->
      <div class="login-form">
        <FieldName
          :label="$t('Message.Components.Account.UserNameOrEMail')"
          @cinput="
            (val) => {
              UserNameOrEMail = val
            }
          "
        />

        <div class="login-spacer" />

        <FieldPassword
          :label="$t('Message.Components.Account.Password')"
          @cinput="
            (val) => {
              Password = val
            }
          "
        />

        <div v-if="ErrorCount >= 3" class="login-spacer" />

        <FieldCaptcha
          v-if="ErrorCount >= 3"
          :label="$t('Message.Components.Account.ImageCode')"
          @cinput="
            (val) => {
              Captcha = val
            }
          "
        />

        <div class="login-spacer" />
        <div class="login-spacer" />

        <Submit
          :text="$t('Message.Components.Account.Login')"
          :loading="is_loading"
          @submit_click="OnSubmit"
        />
      </div>

      <!-- 底部链接 -->
      <div class="login-links">
        <mdui-button variant="text" @click="dialogStore.setResetDialog(true)">
          {{ $t('Message.Components.Account.ForgetPassword') }}
        </mdui-button>
        <mdui-button variant="text" @click="dialogStore.setRegisterDialog(true)">
          {{ $t('Message.Components.Account.Register') }}
        </mdui-button>
      </div>

      <!-- OAuth 第三方登录 -->
      <div class="login-oauth">
        <div class="login-divider">
          <span class="login-divider-line" />
          <span class="login-divider-text">{{
            $t('Message.Components.Account.ThirdPartyAccounts')
          }}</span>
          <span class="login-divider-line" />
        </div>
        <div class="login-oauth-buttons">
          <GithubButton />
          <GoogleButton />
          <MicrosoftButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'
import { useDialogStore } from '@/stores/dialog'
import FieldName from '@/components/account/components/field-name.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldCaptcha from '@/components/account/components/field-captcha.vue'
import Submit from '@/components/account/components/submit.vue'
import GithubButton from '@/components/account/components/oauth/github-button.vue'
import GoogleButton from '@/components/account/components/oauth/google-button.vue'
import MicrosoftButton from '@/components/account/components/oauth/microsoft-button.vue'
import { Login, SetUserToken, GetUserToken, RemoveUserToken, Auto_Login } from '@/api/global.js'

export default {
  name: 'LoginPage',
  components: {
    FieldName,
    FieldPassword,
    FieldCaptcha,
    Submit,
    GithubButton,
    GoogleButton,
    MicrosoftButton,
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      snackbarStore: useSnackbarStore(),
      dialogStore: useDialogStore(),
      UserNameOrEMail: '',
      Password: '',
      Captcha: '',
      ErrorCount: 0,
      is_loading: false,
    }
  },
  methods: {
    validate() {
      return (
        this.UserNameOrEMail != '' &&
        this.Password != '' &&
        (this.ErrorCount < 3 || this.Captcha != '')
      )
    },
    async OnSubmit() {
      RemoveUserToken()
      if (!this.validate()) return
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
    },
    async Auto_Login() {
      const token = GetUserToken()
      if (!token) {
        this.is_loading = false
        return
      }
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
        this.is_loading = false
        this.$router.push(this.$G_UrlHeaderLang() + '/')
      } else {
        this.is_loading = false
        this.userStore.setIsLogin(false)
        this.userStore.setUserToken('')
        this.userStore.setUser(this.userStore.getDefaultUser)
        RemoveUserToken()
      }
    },
  },
  mounted() {
    this.Auto_Login()
  },
  watch: {
    $route(to) {
      if (to.name == 'login' || to.name == 'lang-login') {
        this.mainStore.setDrawer(false)
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 240px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.login-container {
  width: 100%;
  max-width: 380px;
}

/* 品牌区 */
.login-brand {
  text-align: center;
  margin-bottom: 40px;
}

.login-logo {
  margin-bottom: 16px;
}

.login-favicon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
}

.login-title {
  font-size: 28px;
  font-weight: 400;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
  color: var(--mdui-color-on-surface);
}

.login-subtitle {
  font-size: 16px;
  margin: 0;
  color: var(--mdui-color-on-surface-variant);
}

/* 表单区 */
.login-form {
  margin-bottom: 24px;
}

.login-spacer {
  height: 20px;
}

/* 底部链接 */
.login-links {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

/* OAuth 区 */
.login-oauth {
  text-align: center;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.login-divider-line {
  flex: 1;
  height: 1px;
  background: var(--mdui-color-outline-variant);
}

.login-divider-text {
  font-size: 13px;
  color: var(--mdui-color-on-surface-variant);
  white-space: nowrap;
}

.login-oauth-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
}
</style>
