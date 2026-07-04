<template>

  <!-- <mdui-dropdown>
    <mdui-button v-show="show" style="width: 100%;" variant="tonal" slot="trigger">
      {{ $t('Message.Components.Account.MoreOption') }}
    </mdui-button>
    <mdui-menu>
      <mdui-menu-item v-for="(item, index) in items" :key="`common-account-field-more-${index}`"
        @click="$emit('item_select', item.value)">
        {{ $t(item.text) }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown> -->

  <!-- <div v-else v-show="show" style="display: flex; justify-content: center; align-items: center; height: 100%;">

    <mdui-dropdown>
      <mdui-button v-show="show" style="width: 73%;" variant="tonal" slot="trigger">
        {{ $t('Message.Components.Account.MoreOption') }}
      </mdui-button>
      <mdui-menu>
        <mdui-menu-item v-for="(item, index) in items" :key="`common-account-field-more-${index}`"
          @click="$emit('item_select', item.value)">
          {{ $t(item.text) }}
        </mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>

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
 <!-- v-if="!oauth_button" -->
  <mdui-dropdown>
    <mdui-button v-show="show" style="width: 100%;" variant="tonal" slot="trigger">
      {{ $t('Message.Components.Account.MoreOption') }}
    </mdui-button>
    <mdui-menu>
      <mdui-menu-item v-for="(item, index) in items" :key="`common-account-field-more-${index}`"
        @click="$emit('item_select', item.value)">
        {{ $t(item.text) }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown>

  <!-- <div v-else v-show="show" style="display: flex; justify-content: center; align-items: center; height: 100%;">

    <mdui-dropdown>
      <mdui-button v-show="show" style="width: 73%;" variant="tonal" slot="trigger">
        {{ $t('Message.Components.Account.MoreOption') }}
      </mdui-button>
      <mdui-menu>
        <mdui-menu-item v-for="(item, index) in items" :key="`common-account-field-more-${index}`"
          @click="$emit('item_select', item.value)">
          {{ $t(item.text) }}
        </mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>

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
  name: "common-account-field-more",
  props: {
    // oauth_button: {
    //   type: Boolean,
    //   default: false
    // },
    items: Array,
    show: {
      type: Boolean,
      default: true
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
    //   if(!this.oauth_button&&!this.dialog){
    //     return
    //   }
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