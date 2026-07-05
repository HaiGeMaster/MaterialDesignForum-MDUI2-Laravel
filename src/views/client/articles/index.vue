<template>
  <div
    id="page-articles"
    :style="{
      padding: mainStore.getMobile ? '0' : '16px',
    }"
  >
    <mdui-tabs :value="tab_item" :full-width="mainStore.getMobile">
      <mdui-tab
        value="recent"
        @click="$router.push($G_UrlHeaderLang() + `/articles#recent`)"
        :style="mainStore.getDesktop ? 'margin-left: auto;' : ''"
        >{{ $t('Message.Components.Appbar.Tabbars.QuestionsItems.Recent') }}</mdui-tab
      >

      <mdui-tab
        value="popular"
        @click="$router.push($G_UrlHeaderLang() + `/articles#popular`)"
        :style="!userStore.getIsLogin ? 'margin-right: auto;' : ''"
        >{{ $t('Message.Components.Appbar.Tabbars.QuestionsItems.Popular') }}</mdui-tab
      >

      <mdui-tab
        v-if="userStore.getIsLogin"
        value="following"
        @click="$router.push($G_UrlHeaderLang() + `/articles#following`)"
        style="margin-right: auto"
        >{{ $t('Message.Components.Appbar.Tabbars.QuestionsItems.Following') }}</mdui-tab
      >

      <mdui-tab-panel slot="panel" value="recent" class="items-wrapper">
        <mdui-card
          v-if="recent_data"
          :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
          style="width: 100%; margin-top: 8px"
        >
          <mdui-list>
            <ListItem
              v-for="(item, index) in recent_data"
              type="articles"
              :key="index"
              :item="item"
              :title="item.title"
              :subtitle="item.content_markdown"
              :action_time="$G_UserTimeStampToDateTime(item.create_time)"
              :action_subtitle="
                $t('Message.Client.Article.NComment', {
                  value: item.comment_count,
                })
              "
              :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`"
            />

            <!-- <ListItemSkeleton v-if="!recent_data && recent_loading" v-for="i in 20" /> -->
          </mdui-list>
        </mdui-card>

        <mdui-card
          v-else-if="recent_loading"
          :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
          style="width: 100%; margin-top: 8px"
        >
          <mdui-list>
            <ListItemSkeleton v-for="i in 20" />
          </mdui-list>
        </mdui-card>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="popular" class="items-wrapper">
        <mdui-card
          v-if="popular_data"
          :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
          style="width: 100%; margin-top: 8px"
        >
          <mdui-list>
            <ListItem
              v-for="(item, index) in popular_data"
              type="articles"
              :key="index"
              :item="item"
              :title="item.title"
              :subtitle="item.content_markdown"
              :action_time="$G_UserTimeStampToDateTime(item.create_time)"
              :action_subtitle="
                $t('Message.Client.Article.NComment', {
                  value: item.comment_count,
                })
              "
              :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`"
            />

            <!-- <ListItemSkeleton v-if="!popular_data && popular_loading" v-for="i in 20" /> -->
          </mdui-list>
        </mdui-card>

        <mdui-card
          v-else-if="popular_loading"
          :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
          style="width: 100%; margin-top: 8px"
        >
          <mdui-list>
            <ListItemSkeleton v-for="i in 20" />
          </mdui-list>
        </mdui-card>
      </mdui-tab-panel>

      <mdui-tab-panel
        v-if="userStore.getIsLogin"
        slot="panel"
        value="following"
        class="items-wrapper"
      >
        <mdui-card
          v-if="following_data"
          :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
          style="width: 100%; margin-top: 8px"
        >
          <mdui-list>
            <ListItem
              v-for="(item, index) in following_data"
              type="articles"
              :key="index"
              :item="item"
              :title="item.title"
              :subtitle="item.content_markdown"
              :action_time="$G_UserTimeStampToDateTime(item.create_time)"
              :action_subtitle="
                $t('Message.Client.Article.NComment', {
                  value: item.comment_count,
                })
              "
              :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`"
            />

            <!-- <ListItemSkeleton v-if="!following_data && following_loading" v-for="i in 20" /> -->
          </mdui-list>
        </mdui-card>

        <mdui-card
          v-else-if="following_loading"
          :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
          style="width: 100%; margin-top: 8px"
        >
          <mdui-list>
            <ListItemSkeleton v-for="i in 20" />
          </mdui-list>
        </mdui-card>
      </mdui-tab-panel>
    </mdui-tabs>

    <Loading
      v-if="tab_item == 'recent'"
      key="recent"
      :empty="recent_data == null"
      :loading="recent_loading"
      :pagination="recent_pagination"
      @autoload="GetArticlesRecent"
    />

    <Loading
      v-if="tab_item == 'popular'"
      key="popular"
      :empty="popular_data == null"
      :loading="popular_loading"
      :pagination="popular_pagination"
      @autoload="GetArticlesPopular"
    />

    <Loading
      v-if="tab_item == 'following'"
      key="following"
      :empty="following_data == null"
      :loading="following_loading"
      :pagination="following_pagination"
      @autoload="GetArticlesFollowing"
    />
  </div>
</template>
<script>
import { GetArticles, Get_G_ARTICLES_RECENT, Get_G_ARTICLES_POPULAR } from '@/api/global.js'

import Loading from '@/components/loading/index.vue'
import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
import { useUserStore } from '@/stores/user'

export default {
  components: {
    ListItem,
    Loading,
    ListItemSkeleton,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    userStore: useUserStore(),
    tab_item: 'recent',
    recent_loading: false,
    recent_data: null,
    recent_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1,
    },
    popular_loading: false,
    popular_data: null,
    popular_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1,
    },
    following_loading: false,
    following_data: null,
    following_pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1,
    },
  }),
  computed: {},
  methods: {
    UpdateTabItems(val) {
      if (val.name == 'articles' || val.name == 'lang-articles') {
        if (this.userStore.getIsLogin && val.hash == '#following') {
          this.tab_item = 'following'
          this.GetArticlesFollowing()
        } else if (val.hash == '#recent' || val.hash == '') {
          this.tab_item = 'recent'
          this.GetArticlesRecent()
        } else if (val.hash == '#popular') {
          this.tab_item = 'popular'
          this.GetArticlesPopular()
        }
      }
    },
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'articles' || val.name == 'lang-articles') {
        if (this.userStore.getIsLogin && val.hash == '#following') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Articles.LastestArticles'),
            this.$t('Message.Client.Articles.WebSubTitle'),
          )
        } else if (val.hash == '#recent' || val.hash == '') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Articles.RecentlyPopularArticles'),
            this.$t('Message.Client.Articles.WebSubTitle'),
          )
        } else if (val.hash == '#popular') {
          this.$G_UpdateWebTitleAndAppbarSubTitle(
            this.$t('Message.Client.Articles.ArticlesIAmFollowing'),
            this.$t('Message.Client.Articles.WebSubTitle'),
          )
        }
      }
    },
    async GetArticlesRecent() {
      const QUESTIONS_RECENT = Get_G_ARTICLES_RECENT()
      if (QUESTIONS_RECENT !== null) {
        this.recent_data = QUESTIONS_RECENT.data
        this.recent_pagination = QUESTIONS_RECENT.pagination
        return
      }

      if (this.recent_loading) {
        return
      }
      this.recent_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.recent_pagination.next,
        per_page: this.recent_pagination.per_page,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.recent_data == null
          ? (this.recent_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.recent_data, response.data.data)
        this.recent_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.recent_loading = false
    },
    async GetArticlesPopular() {
      const QUESTIONS_POPULAR = Get_G_ARTICLES_POPULAR()
      if (QUESTIONS_POPULAR !== null) {
        this.popular_data = QUESTIONS_POPULAR.data
        this.popular_pagination = QUESTIONS_POPULAR.pagination
        return
      }

      if (this.popular_loading) {
        return
      }
      this.popular_loading = true
      const response = await GetArticles({
        order: '-follower_count',
        page: this.popular_pagination.next,
        per_page: this.popular_pagination.per_page,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.popular_data == null
          ? (this.popular_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.popular_data, response.data.data)
        this.popular_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.popular_loading = false
    },
    async GetArticlesFollowing() {
      if (this.following_loading) {
        return
      }
      this.following_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.following_pagination.next,
        per_page: this.following_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.following_data == null
          ? (this.following_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.following_data, response.data.data)
        this.following_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.following_loading = false
    },
  },
  created() {
    this.UpdateTabItems(this.$route)
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    $route(val) {
      this.UpdateTabItems(val)
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
