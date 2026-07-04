<template>
  <div id="page-users" :style="{
    'padding': $store.getters.GetMobile ? '0' : '16px',
  }">
    

    

    <mdui-tabs :value="tab_item" :full-width="$store.getters.GetMobile">
      <mdui-tab value="followees" v-if="$store.getters['User/GetIsLogin']" :style="$store.getters.GetPc ? 'margin-left: auto;' : ''"
      @click="$router.push($G_UrlHeaderLang() + `/users#followees`)"
      >
        {{ $t('Message.Client.Users.PeopleIFollow', { value: 0 }) }}
      </mdui-tab>
      <mdui-tab value="followers" v-if="$store.getters['User/GetIsLogin']" :style="!$store.getters['User/GetIsLogin']?'margin-right: auto;':''"
      @click="$router.push($G_UrlHeaderLang() + `/users#followers`)"
      >
        {{ $t('Message.Client.Users.MyFollowers', { value: 0 }) }}
      </mdui-tab>
      <mdui-tab value="recommended" v-show="$store.getters['User/GetIsLogin']" style="margin-right: auto;"
      @click="$router.push($G_UrlHeaderLang() + `/users#recommended`)"
      >
        {{ $t('Message.Client.Users.RecommendedHeaderTitle') }}
      </mdui-tab>

      <mdui-tab-panel style="margin-top: 8px;" slot="panel" value="followees" class="items-wrapper" v-if="$store.getters['User/GetIsLogin']">
        <UserItem v-for="(user, index) in followees_data" :key="index" :user="user" />
        <UserItemSkeleton v-if="followees_loading" v-for="i in 20"/>
      </mdui-tab-panel>

      <mdui-tab-panel style="margin-top: 8px;" slot="panel" value="followers" class="items-wrapper" v-if="$store.getters['User/GetIsLogin']">
        <UserItem v-for="(user, index) in followers_data" :key="index" :user="user" />
        <UserItemSkeleton v-if="followers_loading" v-for="i in 20"/>
      </mdui-tab-panel>

      <mdui-tab-panel style="margin-top: 8px;" slot="panel" value="recommended" class="items-wrapper">
        <UserItem v-for="(user, index) in recommended_data" :key="index" :user="user" />
        <UserItemSkeleton v-if="recommended_loading" v-for="i in 20"/>
      </mdui-tab-panel>
    </mdui-tabs>

    <Loading v-if="tab_item == 'followees'" :empty="followees_data == null" :loading="followees_loading"
      :pagination="followees_pagination" @autoload="GetUsersFollowees" />
    <Loading v-if="tab_item == 'followers'" :empty="followers_data == null" :loading="followers_loading"
      :pagination="followers_pagination" @autoload="GetUsersFollowers" />
    <Loading v-if="tab_item == 'recommended'" :empty="recommended_data == null" :loading="recommended_loading"
      :pagination="recommended_pagination" @autoload="GetUsersRecommended" />
  </div>
</template>
<script>
// '##::::'##::::'###::::'####::'######:::'########:'##::::'##::::'###:::::'######::'########:'########:'########::
//  ##:::: ##:::'## ##:::. ##::'##... ##:: ##.....:: ###::'###:::'## ##:::'##... ##:... ##..:: ##.....:: ##.... ##:
//  ##:::: ##::'##:. ##::: ##:: ##:::..::: ##::::::: ####'####::'##:. ##:: ##:::..::::: ##:::: ##::::::: ##:::: ##:
//  #########:'##:::. ##:: ##:: ##::'####: ######::: ## ### ##:'##:::. ##:. ######::::: ##:::: ######::: ########::
//  ##.... ##: #########:: ##:: ##::: ##:: ##...:::: ##. #: ##: #########::..... ##:::: ##:::: ##...:::: ##.. ##:::
//  ##:::: ##: ##.... ##:: ##:: ##::: ##:: ##::::::: ##:.:: ##: ##.... ##:'##::: ##:::: ##:::: ##::::::: ##::. ##::
//  ##:::: ##: ##:::: ##:'####:. ######::: ########: ##:::: ##: ##:::: ##:. ######::::: ##:::: ########: ##:::. ##:
// ..:::::..::..:::::..::....:::......::::........::..:::::..::..:::::..:::......::::::..:::::........::..:::::..::
import {
  GetFollows,
  GetUsers,
  Get_G_USERS_RECOMMENDED,
} from '@/api/global.js'

import UserItem from '@/components/user-item/index.vue';
import UserItemSkeleton from '@/components/user-item-skeleton/index.vue'
import Loading from '@/components/loading/index.vue'
export default {
  components: {
    UserItem,
    Loading,
    UserItemSkeleton,
      },
  data: () => ({
    tab_item: 'recommended',
    followees_loading: false,
    followees_data: null,
    followees_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    followers_loading: false,
    followers_data: null,
    followers_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    recommended_loading: false,
    recommended_data: null,
    recommended_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    has_seo: false,
  }),
  computed: {
    ReturnUserIsLogin() {
      return this.$store.getters['User/GetIsLogin']
    }
  },
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'users' || val.name == 'lang-users') {
        if (this.$store.getters['User/GetIsLogin'] && (val.hash == '#followees' || val.hash == '')) {
          this.tab_item = 'followees'
        } else if (this.$store.getters['User/GetIsLogin'] && val.hash == '#followers') {
          this.tab_item = 'followers'
        } else if (val.hash == '#recommended' || val.hash == '') {
          this.tab_item = 'recommended'
        }
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'users' || val.name == 'lang-users') {
        // this.ResetData()
        if (this.$store.getters['User/GetIsLogin'] && (val.hash == '#followees' || val.hash == '')) {
          this.ResetData()
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Users.PeopleIFollow'),
            this.$t('Message.Client.Users.WebSubTitle')
          )
          this.GetUsersFollowees()
        } else if (this.$store.getters['User/GetIsLogin'] && val.hash == '#followers') {
          this.ResetData()
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Users.MyFollowers'),
            this.$t('Message.Client.Users.WebSubTitle')
          )
          this.GetUsersFollowers()
        } else if (val.hash == '#recommended' || val.hash == '') {
          if(!this.has_seo){
            this.ResetData()
          }
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Users.RecommendedHeaderTitle'),
            this.$t('Message.Client.Users.WebSubTitle')
          )
          this.GetUsersRecommended()
        }
      }
    },
    async GetUsersFollowees() {
      if (this.followees_loading) {
        return
      }
      this.followees_loading = true
      // console.log(this.followees_pagination)
      const response = await GetFollows({
        modes: 'followees',
        type: 'user',
        followable_id: this.$G_GetUserID(),
        page: this.followees_pagination.next,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get) {
        var keys = `user_id`
        this.followees_data == null ? this.followees_data = response.data.data : this.$G_FilterSameItems(keys, this.followees_data, response.data.data)
        this.followees_pagination = response.data.pagination
      }
      this.followees_loading = false
    },
    async GetUsersFollowers() {
      if (this.followers_loading) {
        return
      }
      this.followers_loading = true
      // console.log(this.followers_pagination)
      const response = await GetFollows({
        modes: 'followers',
        type: 'user',
        followable_id: this.$G_GetUserID(),
        page: this.followers_pagination.next,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get) {
        var keys = `user_id`
        this.followers_data == null ? this.followers_data = response.data.data : this.$G_FilterSameItems(keys, this.followers_data, response.data.data)
        this.followers_pagination = response.data.pagination
      }
      this.followers_loading = false
    },
    async GetUsersRecommended() {
      const USERS_RECOMMENDED = Get_G_USERS_RECOMMENDED()
            if (USERS_RECOMMENDED !== null) {
        this.recommended_data = USERS_RECOMMENDED.data
        this.recommended_pagination = USERS_RECOMMENDED.pagination
        this.has_seo = true
        return
      }

      if (this.recommended_loading) {
        return
      }
      this.recommended_loading = true
      const response = await GetUsers({
        order: '+user_id',
        page: this.recommended_pagination.next,
        per_page: this.recommended_pagination.per_page,
        type: 'recommended',
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get) {
        var keys = `user_id`
        this.recommended_data == null ? this.recommended_data = response.data.data : this.$G_FilterSameItems(keys, this.recommended_data, response.data.data)
        this.recommended_pagination = response.data.pagination
      }
      this.recommended_loading = false
    },
    ResetData() {
      this.followees_data = null
      this.followees_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.followers_data = null
      this.followers_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      this.recommended_data = null
      this.recommended_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    }
  },
  created() {
    this.UpdateTabItems(this.$route)
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    '$route'(val) {
      this.UpdateTabItems(val)
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
        this.UpdateWebTitleAndAppbarSubTitle(this.$route)
      }
    }
  },
};
</script>
<style lang="less">
// @import "./index.less";
@import "../topics/index.less";

// @import '../../../views/client/topics/index.less';</style>