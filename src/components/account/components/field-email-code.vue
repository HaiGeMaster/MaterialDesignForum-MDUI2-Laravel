<template>
  <div class="send-email-field" v-show="show">
    

    <mdui-text-field :label="label || $t('Message.Components.Account.EMailCode')" :value="value"
      @input="value = $event.target.value">
      
      

      <mdui-button variant="tonal" slot="end-icon" :loading="is_loading" class="send-email" @click="OnSendEmailClick()"
      :disabled="Loading_Time>0||!TestMail"
      >
        
        <mdi-icon slot="icon" icon="mdi-email-sync" />
        {{ Loading_Time }}
        
      </mdui-button>
    </mdui-text-field>
  </div>
</template>
<script>
import {
  GetEmailCaptcha,
} from '@/api/global.js';
export default {
  name: "common-account-field-email-code",
  props: {
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
    email: {
      type: String,
      default: ""
    },
  },
  data: () => ({
    value: "",
    show_resend_countdown: false,
    is_loading: false,
    Loading_Time: 0,
  }),
  computed: {
    TestMail() {
      return /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(this.email)
    }
  },
  methods: {
    async OnSendEmailClick() {
            // if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(this.email)) {
            
      console.log(this.email)
      this.is_loading = true
      this.Loading_Time = 60
      const response = await GetEmailCaptcha(this.email, this.$i18n.locale)
      if (response.data.is_send == true) {
        this.is_loading = false
              } else {
        this.is_loading = false
        this.Loading_Time = 0
      }
    }
  },
  watch: {
    value(val) {
      const v = val.toString()
      this.$emit("cinput", v);
    },
    Loading_Time: function (val) {
                              if (val != 0) {
                                        setTimeout(() => {
          this.Loading_Time = val - 1
        }, 1000);
      } else {
        this.is_loading = false
      }
    }
  }
}
</script>
<style></style>