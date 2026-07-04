<template>
  <div id="page-user" :style="{
    'padding': $store.getters.GetMobile ? '0' : '0px 16px 16px 16px',
  }">
    <User :user="user" />

    <!-- <mdui-list v-if="ShowAssetList">
      <mdui-collapse accordion>
        <mdui-collapse-item>
          <mdui-list-item rounded slot="header">
            资产列表/Asset List
            
          <mdi-icon slot="end-icon" icon="mdi-dots-horizontal" />

          </mdui-list-item>
          <DeviceList />
        </mdui-collapse-item>
      </mdui-collapse>
    </mdui-list> -->

    <Contexts :user="user" />
    <!-- <EditInfoDialog :user="$store.getters['Dialog/GetEditInfoDialog'].user" :model="$store.getters['Dialog/GetEditInfoDialog'].model"
      @model="val => $store.dispatch('Dialog/Set_EditInfoDialog', {
        model: val,
        user: null
      })" @edit_user="
    GetUser()
    " /> -->
  </div>
</template>
<script>
import {
  GetUser,
  Get_G_USER,
} from '@/api/global.js';
import User from './components/user/index.vue'
import Contexts from './components/contexts/index.vue'
// import EditInfoDialog from '@/components/dialog/edit-info-dialog/index.vue'
import DeviceList from '@/components/hiage-content/device-list/index.vue'
export default {
  components: {
    User,
    Contexts,
    // EditInfoDialog,
    DeviceList,
  },
  data: () => ({
    tab_item: 'question',
    user: null,
  }),
  computed: {
    ReturnUpdateGetUserUpdate() {
      return this.$store.getters['Update/GetUserUpdate']
    },
    ReturnGetIsLogin(){
      return this.$store.getters['User/GetIsLogin']
    },
    ShowAssetList() {
      //需要域名中包含xbedrock.com且用户ID为1
      return window.location.href.includes('xbedrock.com') && this.user != null && this.user.user_id == 1;
    },
  },
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'user' || val.name == 'lang-user') {
        if (val.hash == '#article') {
          this.tab_item = 'article'
        } else if (val.hash == '#question' || val.hash == '') {
          this.tab_item = 'question'
        } else if (val.hash == '#answer') {
          this.tab_item = 'answer'
        }
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (this.user == null) {
        return;
      }
      if (val.name == 'user' || val.name == 'lang-user') {
        if (val.hash == '#article') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.User.NPersonalHomepage', { value: this.user.username }),
            this.$t('Message.Client.User.NPersonalHomepage', { value: this.user.username })
          )
        } else if (val.hash == '#question' || val.hash == '') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.User.NPersonalHomepage', { value: this.user.username }),
            this.$t('Message.Client.User.NPersonalHomepage', { value: this.user.username })
          )
        } else if (val.hash == '#answer') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.User.NPersonalHomepage', { value: this.user.username }),
            this.$t('Message.Client.User.NPersonalHomepage', { value: this.user.username })
          )
        }
      }
    },
    async GetUser() {
      this.user = null
      // this.$forceUpdate()
      const USER = Get_G_USER()
      if (USER !== null) {
        this.user = USER.user
        return
      }

      const response = await GetUser({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.user = response.data.user
      }
    }
  },
  created() {
    this.UpdateTabItems(this.$route)
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    this.GetUser()
  },
  watch: {
    '$route'(val) {
      this.UpdateTabItems(val)
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$route.params.user_id'(val) {
      this.GetUser()
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    user(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUpdateGetUserUpdate(val) {
      this.GetUser()
    },
    ReturnGetIsLogin(val) {//让其在登录时重新请求，以免用户编辑时出现字段空缺
      this.GetUser()
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>