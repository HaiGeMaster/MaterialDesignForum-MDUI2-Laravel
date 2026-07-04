<template>
  <!-- 请求谷歌登录超时！！！！！！！！！！ -->
  <!-- 请求谷歌登录超时！！！！！！！！！！ -->
  <!-- 请求谷歌登录超时！！！！！！！！！！ -->
  <mdui-tooltip placement="top" :content="$t('Message.Components.Account.LoginWithGoogle')" @closed.self="">
<!--  -->
    <mdui-button-icon  @click="Onclick" style="width: 36px;height: 36px;">
      <img :src="$G_ImgHandle('/assets/fixed_content/google.png')" style="width: 24px;height: 24px;" />
    </mdui-button-icon>

  </mdui-tooltip>
</template>
<script>
export default {
  name: "common-account-components-oauth-v1-google-button",
  methods: {
    Onclick() {
      window.open(this.$G_CrossDomain() + '/auth/google/redirect');
    }
  },
}
</script>
