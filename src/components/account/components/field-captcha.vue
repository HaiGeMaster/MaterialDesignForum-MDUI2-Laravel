<template>
  <div class="captcha-field" v-show="show">
    

    <mdui-text-field :label="label || $t('Message.Components.Account.ImageCode')" :value="value"
      @input="value = $event.target.value">
      <img slot="end-icon" class="captcha-image" :src="`${$G_ImgHandle('/api/user/image_captcha/')}${img_time}`"
        @click="OnImgClick" :title="$t('Message.Components.Account.RefreshImageCode')" />
    </mdui-text-field>
  </div>
</template>
<script>
export default {
  name: "common-account-field-captcha",
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
  },
  data: () => ({
    value: "",
    img: "",
    img_time: 0,
    is_loading: false,
  }),
  methods: {
    async OnImgClick() {
      this.is_loading = true
            // this.img = this.$axios.defaults.baseURL + '/api/user/image_captcha/' + new Date().getTime();
      this.img_time = new Date().getTime()
      setTimeout(() => {
        this.is_loading = false
      }, 5000);
    },
              },
  watch: {
    value(val) {
      const v = val.toString()
      this.$emit("cinput", v);
    }
  }
}
</script>
<style></style>