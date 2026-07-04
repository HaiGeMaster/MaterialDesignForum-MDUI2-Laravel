<template>
  <!-- :fullscreen="$store.getters.GetMobile" -->
  <mdui-dialog ref="dialog" class="reset-dialog" close-on-overlay-click
    @close.self="() => { $store.dispatch('Dialog/Set_ResetDialog', false) }"
    :headline="$t('Message.Components.Account.Reset')">

    <!-- <mdui-button-icon slot="icon" v-if="$store.getters.GetMobile"
      @click="() => { $store.dispatch('Dialog/Set_ResetDialog', false) }">
      <mdi-icon icon="mdi-close"></mdi-icon>
    </mdui-button-icon> -->

    <!-- margin-top:50%; -->
    <form :style="!$store.getters.GetMobile ? 'width: 300px;' : ''">
      <FieldEMail :show="!NextStep" key="Reset-FieldEMail" @cinput="(val) => { EMail = val }"
        :label="$t('Message.Components.Account.EMail')" />
      <br v-if="!NextStep" />
      <br v-if="!NextStep" />
      <FieldEmailCode :email="EMail" :show="!NextStep" key="Reset-FieldEmailCode" @cinput="(val) => { EmailCode = val }"
        :label="$t('Message.Components.Account.EMailCode')" />
      <br v-if="!NextStep" />
      <FieldPassword v-if="NextStep" :label="$t('Message.Components.Account.Password')" key="Reset-FieldPassword"
        @cinput="(val) => { Password = val }" />
      <br v-if="NextStep" />
      <br v-if="NextStep" />
      <Submit :text="$t('Message.Components.Account.NextStep')" :show="!NextStep" colors="accent"
        @submit_click="OnNextStep" />
      <br v-if="!NextStep" />
      <Submit :text="$t('Message.Components.Account.BackStep')" :show="NextStep" classes="more-option" :is_text="true"
        colors="accent" @submit_click="NextStep = !NextStep" />
      <br v-if="NextStep" />
      <Submit :text="$t('Message.Components.Account.Reset')" :show="NextStep" colors="accent" @submit_click="OnSubmit"
        :loading="is_loading" />
      <br v-if="NextStep" />
      <FieldMore :items="FieldMoreItems" :show="!NextStep" @item_select="item_select" />
    </form>

  </mdui-dialog>
</template>
<script>
import FieldEMail from '@/components/account/components/field-email.vue'
import FieldEmailCode from '@/components/account/components/field-email-code.vue'
import FieldPassword from '@/components/account/components/field-password.vue'
import FieldMore from '@/components/account/components/field-more.vue'
import Submit from '@/components/account/components/submit.vue'
import {
  Reset
} from '@/api/global.js'
export default {
  name: "reset-dialog",
  data: () => ({
    is_loading: false,
    EMail: "",
    Password: "",
    EmailCode: "",
    NextStep: false,
    FieldMoreItems: [
      {
        text: "Message.Components.Account.Login",
        value: "Login"
      },
      {
        text: "Message.Components.Account.Register",
        value: "Register"
      }
    ],
    model: false,
  }),
  components: {
    FieldEMail,
    FieldEmailCode,
    FieldPassword,
    FieldMore,
    Submit,
  },
  methods: {
    item_select(value) {
      this.$store.dispatch('Dialog/Set_ResetDialog', false)
      switch (value) {
        case "Login":
          this.$store.dispatch('Dialog/Set_LoginDialog', true)
          break;
        case "Register":
          this.$store.dispatch('Dialog/Set_RegisterDialog', true)
          break;
      }
    },
    OnNextStep() {
      if (!this.EMail && !this.EmailCode) {
        return
      }
      this.NextStep = true
    },
    async OnSubmit() {
      if (!this.validate()) {
        return
      }
      this.is_loading = true
      const response = await Reset({
        email: this.EMail,
        password: this.Password,
        email_captcha: this.EmailCode,
      })
      if (response.data.is_reset == true) {
        this.loading = false
        this.$store.dispatch('Dialog/Set_ResetDialog', false)
      } else {
        this.loading = false
      }
      this.loading = false
    },
    validate() {
      return this.EMail && this.Password && this.EmailCode
    },
  },
  computed: {
    Store_DialogGetResetDialog() {
      return this.$store.getters['Dialog/GetResetDialog']
    }
  },
  watch: {
    Store_DialogGetResetDialog(val) {
      this.$refs.dialog.open = val
      this.model = val
    },
    model(val) {
      if (!val) {
        this.$store.dispatch('Dialog/Set_ResetDialog', false)
      }
    }
  }
}
</script>