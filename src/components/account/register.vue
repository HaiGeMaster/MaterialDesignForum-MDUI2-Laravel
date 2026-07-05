<template>
  <mdui-dialog
    ref="dialog"
    class="register-dialog"
    close-on-overlay-click
    @close.self="
      () => {
        dialogStore.setRegisterDialog(false)
      }
    "
  >
    <!-- :headline="$t('Message.Components.Account.Register')" -->

    <div slot="headline" style="width: 100%">
      <div style="display: flex">
        <span>
          {{ $t('Message.Components.Account.Register') }}
        </span>
        <div class="flex-grow"></div>
        <!-- <SsoButton /> -->
        <GithubButton />
        <GoogleButton />
        <MicrosoftButton />
      </div>
    </div>

    <!-- margin-top:50%; -->
    <form :style="!mainStore.getMobile ? 'width: 300px;' : ''">
      <FieldEMail
        :show="!NextStep"
        key="Register-FieldEMail"
        :label="$t('Message.Components.Account.EMail')"
        @cinput="
          (val) => {
            EMail = val
          }
        "
      />
      <br v-if="!NextStep" />
      <br v-if="!NextStep" />
      <FieldPassword
        :show="!NextStep"
        key="Register-Password"
        :label="$t('Message.Components.Account.Password')"
        @cinput="
          (val) => {
            Password = val
          }
        "
      />
      <br v-if="!NextStep" />
      <br v-if="!NextStep" />
      <FieldEmailCode
        :show="!NextStep"
        :email="EMail"
        @cinput="
          (val) => {
            EmailCode = val
          }
        "
        :label="$t('Message.Components.Account.EMailCode')"
      />
      <br v-if="!NextStep" />
      <FieldName
        v-if="NextStep"
        key="Register-FieldName"
        :label="$t('Message.Components.Account.UserName')"
        @cinput="
          (val) => {
            UserName = val
          }
        "
      />
      <br v-if="NextStep" />
      <br v-if="NextStep" />
      <Submit
        :text="$t('Message.Components.Account.NextStep')"
        :show="!NextStep"
        colors="secondary"
        @submit_click="OnNextStep"
      />
      <br v-if="!NextStep" />
      <Submit
        :text="$t('Message.Components.Account.BackStep')"
        :show="NextStep"
        classes="more-option"
        :is_text="true"
        colors="secondary"
        @submit_click="NextStep = !NextStep"
      />
      <br v-if="NextStep" />
      <Submit
        :text="$t('Message.Components.Account.Register')"
        :show="NextStep"
        colors="secondary"
        @submit_click="OnSubmit"
        :loading="is_loading"
      />
      <FieldMore
        :items="FieldMoreItems"
        :dialog="model"
        :show="!NextStep"
        @item_select="item_select"
      />
    </form>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useUserStore } from '@/stores/user'
import FieldName from '@/components/account/components/field-name.vue'
import FieldEMail from '@/components/account/components/field-email.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldEmailCode from '@/components/account/components/field-email-code.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import SsoButton from './components/oauth/sso-button.vue'
import GithubButton from './components/oauth/github-button.vue'
import GoogleButton from './components/oauth/google-button.vue'
import MicrosoftButton from './components/oauth/microsoft-button.vue'
import { AddUser } from '@/api/global.js'
export default {
  name: 'register-dialog',
  components: {
    FieldName,
    FieldEMail,
    FieldPassword,
    FieldEmailCode,
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
    is_loading: false,
    NextStep: false,
    EMail: '',
    UserName: '',
    Password: '',
    EmailCode: '',
    FieldMoreItems: [
      {
        text: 'Message.Components.Account.ForgetPassword',
        value: 'ForgetPassword',
      },
      {
        text: 'Message.Components.Account.Login',
        value: 'Login',
      },
    ],
    CookieServer: false,
    model: false,
  }),
  methods: {
    item_select(value) {
      this.dialogStore.setRegisterDialog(false)
      switch (value) {
        case 'ForgetPassword':
          this.dialogStore.setResetDialog(true)
          break
        case 'Login':
          this.dialogStore.setLoginDialog(true)
          break
      }
    },
    validate() {
      return this.EMail != '' && this.Password != '' && this.EmailCode != ''
    },
    OnNextStep() {
      if (!this.validate()) {
        return
      }
      this.NextStep = true
    },
    async OnSubmit() {
      const response = await AddUser({
        email: this.EMail,
        password: this.Password,
        email_captcha: this.EmailCode,
        username: this.UserName,
        language: this.$i18n.locale,
      })
      if (response.data.is_add == true) {
        this.loading = false
        this.dialogStore.setRegisterDialog(false)
      } else {
        this.loading = false
      }
    },
  },
  computed: {
    Store_DialogSetRegisterDialog() {
      return this.dialogStore.getRegisterDialog
    },
  },
  watch: {
    Store_DialogSetRegisterDialog(val) {
      this.$refs.dialog.open = val
      this.model = val
    },
    model(val) {
      if (!val) {
        this.dialogStore.setRegisterDialog(val)
      }
    },
  },
}
</script>
