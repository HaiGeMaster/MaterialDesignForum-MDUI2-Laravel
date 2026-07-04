<template>
  <div id="page-topics" :style="{
    'padding': $store.getters.GetMobile ? '0' : '16px',
  }">
    <mdui-tabs :value="tab_item" :full-width="$store.getters.GetMobile">
      <mdui-tab v-if="$store.getters['User/GetIsLogin']" value="following"
        @click="$router.push($G_UrlHeaderLang() + `/topics#following`)"
        :style="$store.getters.GetPc ? 'margin-left: auto;' : ''">{{
    $t('Message.Components.Appbar.Tabbars.TopicsItems.Following') }}</mdui-tab>

      <mdui-tab v-show="$store.getters['User/GetIsLogin']" value="recommended"
        @click="$router.push($G_UrlHeaderLang() + `/topics${$store.getters['User/GetIsLogin'] ? '#recommended' : ''}`)"
        style="margin-right: auto;">{{ $t('Message.Components.Appbar.Tabbars.TopicsItems.Recommended') }}</mdui-tab>

      <mdui-tab-panel v-if="$store.getters['User/GetIsLogin']" style="margin-top: 8px;" slot="panel" value="following" class="items-wrapper">
        <TopicItem v-for="(topic, index) in following_data" :key="index" :topic="topic" />
        <TopicItemSekeleton v-if="following_loading" v-for="i in 30" :key="i" />
      </mdui-tab-panel>
      <mdui-tab-panel style="margin-top: 8px;" slot="panel" value="recommended" class="items-wrapper">
        <TopicItem v-for="(topic, index) in recommended_data" :key="index" :topic="topic" />

        <TopicItemSekeleton v-if="recommended_loading" v-for="i in 30" :key="i" />

      </mdui-tab-panel>
    </mdui-tabs>

    <Loading v-if="tab_item == 'following'" key="following" :empty="following_data == null" :loading="following_loading"
      :pagination="following_pagination" @autoload="GetTopicsFollowing" />

    <Loading v-if="tab_item == 'recommended'" key="recommended" :empty="recommended_data == null"
      :loading="recommended_loading" :pagination="recommended_pagination" @autoload="GetTopicsRecommended" />
  </div>
</template>
<script>
import {
  GetTopics,
  Get_G_TOPICS_RECOMMENDED,
} from '@/api/global.js'

import Loading from '@/components/loading/index.vue'
import TopicItem from '@/components/topic-item/index.vue'
import TopicItemSekeleton from '@/components/topic-item-skeleton/index.vue'
export default {
  components: {
    TopicItem,
    TopicItemSekeleton,
    Loading,
      },
  data: () => ({
    tab_item: 'recommended',
    following_loading: false,
    following_data: null,
    following_pagination: {
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
  }),
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'topics' || val.name == 'lang-topics') {
        if (this.$store.getters['User/GetIsLogin'] && (val.hash == '' || val.hash == '#following')) {
          this.tab_item = 'following'
                  } else if (val.hash == '#recommended' || val.hash == '') {
          this.tab_item = 'recommended'
                  }
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'topics' || val.name == 'lang-topics') {
        if (this.$store.getters['User/GetIsLogin'] && (val.hash == '' || val.hash == '#following')) {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Topics.TheTopicIAmFollowing'),
            this.$t('Message.Client.Topics.WebSubTitle')
          )
        } else if (val.hash == '#recommended' || val.hash == '') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Topics.HeaderTitle'),
            this.$t('Message.Client.Topics.WebSubTitle')
          )
        }
      }
    },
    async GetTopicsFollowing() {
      if (this.following_loading) {
        return
      }
      this.following_loading = true
      const response = await GetTopics({
        order: '-create_time',
        page: this.following_pagination.next,
        per_page: this.following_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `topic_id`
        this.following_data == null ? this.following_data = response.data.data : this.$G_FilterSameItems(keys, this.following_data, response.data.data)
        this.following_pagination = response.data.pagination
      }
      this.following_loading = false
      this.$forceUpdate()
    },
    async GetTopicsRecommended() {
      const TOPICS_RECOMMENDED = Get_G_TOPICS_RECOMMENDED()
            if (TOPICS_RECOMMENDED !== null) {
        this.recommended_data = TOPICS_RECOMMENDED.data
        this.recommended_pagination = TOPICS_RECOMMENDED.pagination
        return
      }

      if (this.recommended_loading) {
        return
      }
      this.recommended_loading = true
      const response = await GetTopics({
        order: '-create_time',
        page: this.recommended_pagination.next,
        per_page: this.recommended_pagination.per_page,
        user_token: this.$G_GetUserToken()
      })
      if (response.data.is_get == true) {
        var keys = `topic_id`
        this.recommended_data == null ? this.recommended_data = response.data.data : this.$G_FilterSameItems(keys, this.recommended_data, response.data.data)
        this.recommended_pagination = response.data.pagination
      }
      this.recommended_loading = false
      this.$forceUpdate()
    },
    ResetData() {
      this.following_data = null
      this.following_pagination = {
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
  computed: {
    ReturnUserIsLogin() {
      return this.$store.getters['User/GetIsLogin']
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
    },
    tab_item(val) {
                  //   this.$router.push(this.$G_UrlHeaderLang()+`/topics#following`)
                  //   this.$router.push(this.$G_UrlHeaderLang()+`/topics#recommended`)
          }
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>