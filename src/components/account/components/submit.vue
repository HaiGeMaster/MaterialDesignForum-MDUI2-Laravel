<template>

  <!-- <mdui-button v-show="show" full-width :loading="loading" @click="$emit('submit_click')" :disabled="disabled"
      :class="[classes]"
      >{{
        text || $t('Message.Components.Account.Login') }}</mdui-button> -->
<!-- v-if="!oauth_button" -->
  <mdui-button  v-show="show" full-width :loading="loading" @click="$emit('submit_click')"
    :disabled="disabled" :class="[classes]">{{
      text || $t('Message.Components.Account.Login') }}</mdui-button>

  <!-- <div v-else v-show="show" style="display: flex; justify-content: center; align-items: center; height: 100%;">

    <mdui-button full-width :loading="loading" @click="$emit('submit_click')" :disabled="disabled" :class="[classes]"
      style="width: 73%;">{{
        text || $t('Message.Components.Account.Login') }}</mdui-button>

    <mdui-tooltip placement="top" :content="$t('Message.Components.Account.LoginWithGithub')" @closed.self="">

      <mdui-button-icon variant="tonal" :href="oauths_link.github" :disabled="!oauths_link.github" style="width: 13%;">
        <img :src="$G_ImgHandle('/assets/fixed_content/github.png')" style="width: 24px;height: 24px;" />
      </mdui-button-icon>
    </mdui-tooltip>
    <mdui-tooltip placement="top" :content="$t('Message.Components.Account.LoginWithMicrosoft')">

      <mdui-button-icon variant="tonal" :href="oauths_link.microsoft" :disabled="!oauths_link.microsoft"
        style="width: 13%;">
        <img :src="$G_ImgHandle('/assets/fixed_content/microsoft.png')" style="width: 24px;height: 24px;" />
      </mdui-button-icon>
    </mdui-tooltip>
  </div> -->
</template>
<script>
// import { GetOauthLink } from '@/api/global.js';
export default {
  name: "common-account-dialog-action-btn",
  props: {
    // oauth_button: {
    //   type: Boolean,
    //   default: false
    // },
    text: {
      type: String,
      default: '',
    },
    colors: {
      type: String,
      default: "primary"
    },
    is_text: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: "action-btn"
    },
    show: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      // oauths_link: {
      //   github: '',
      //   microsoft: '',
      // },
    };
  },
  methods: {
    // async GetOauthLink() {
    //   this.oauths_link.github = await GetOauthLink('github')
    //   this.oauths_link.microsoft = await GetOauthLink('microsoft')
    //   this.$forceUpdate();
    // }
  },
  // created(){
  //   this.GetOauthLink();
  // },
  watch: {
    // dialog(val) {
    //   if (val && this.oauth_button) {
    //     this.GetOauthLink();
    //   }
    // }
  }
}
</script>