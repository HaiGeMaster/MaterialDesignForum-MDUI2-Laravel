<template>
  <mdui-card variant="outlined" class="contexts mdui-card-variant-color-border" style="width: 100%">
    <mdui-tabs :value="tab_item">
      <mdui-tab
        value="questions"
        @click="$router.push(`${$G_UrlHeaderLang()}/topics/${topic.topic_id}#questions`)"
      >
        {{ $t('Message.Client.Topic.Contexts.Questions') }}
      </mdui-tab>
      <mdui-tab
        value="articles"
        @click="$router.push(`${$G_UrlHeaderLang()}/topics/${topic.topic_id}#articles`)"
      >
        {{ $t('Message.Client.Topic.Contexts.Articles') }}
      </mdui-tab>
      <mdui-tab
        value="following_questions"
        v-if="ReturnUserIsLogin"
        @click="$router.push(`${$G_UrlHeaderLang()}/topics/${topic.topic_id}#following_questions`)"
      >
        {{ $t('Message.Client.Topic.Contexts.FollowingQuestions') }}
      </mdui-tab>
      <mdui-tab
        value="following_articles"
        v-if="ReturnUserIsLogin"
        @click="$router.push(`${$G_UrlHeaderLang()}/topics/${topic.topic_id}#following_articles`)"
      >
        {{ $t('Message.Client.Topic.Contexts.FollowingArticles') }}
      </mdui-tab>

      <mdui-tab-panel slot="panel" value="questions">
        <ListItem
          v-for="(item, index) in question_data"
          :key="index"
          :item="item"
          :title="item.title"
          :subtitle="item.content_markdown"
          :action_time="$G_UserTimeStampToDateTime(item.create_time)"
          :action_subtitle="
            $t('Message.Client.Question.NAnswers', {
              value: item.answer_count,
            })
          "
          :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`"
        />

        <ListItemSkeleton v-if="question_loading && !question_data" v-for="i in 20" />
      </mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="articles">
        <ListItem
          v-for="(item, index) in article_data"
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

        <ListItemSkeleton v-if="article_loading && !article_data" v-for="i in 20" />
      </mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="following_questions">
        <ListItem
          v-for="(item, index) in following_question_data"
          :key="index"
          :item="item"
          :title="item.title"
          :subtitle="item.content_markdown"
          :action_time="$G_UserTimeStampToDateTime(item.create_time)"
          :action_subtitle="
            $t('Message.Client.Question.NAnswers', {
              value: item.answer_count,
            })
          "
          :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`"
        />

        <ListItemSkeleton
          v-if="following_question_loading && !following_question_data"
          v-for="i in 20"
        />
      </mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="following_articles">
        <ListItem
          v-for="(item, index) in following_article_data"
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

        <ListItemSkeleton
          v-if="following_article_loading && !following_article_data"
          v-for="i in 20"
        />
      </mdui-tab-panel>
    </mdui-tabs>
    <Loading
      v-if="tab_item == 'questions'"
      :empty="question_data == null"
      :loading="question_loading"
      :pagination="question_pagination"
      @autoload="GetQuestions"
    />
    <Loading
      v-if="tab_item == 'articles'"
      :empty="article_data == null"
      :loading="article_loading"
      :pagination="article_pagination"
      @autoload="GetArticles"
    />
    <Loading
      v-if="tab_item == 'following_questions'"
      :empty="following_question_data == null"
      :loading="following_question_loading"
      :pagination="following_question_pagination"
      @autoload="GetFollowingQuestions"
    />
    <Loading
      v-if="tab_item == 'following_articles'"
      :empty="following_article_data == null"
      :loading="following_article_loading"
      :pagination="following_article_pagination"
      @autoload="GetFollowingArticles"
    />
  </mdui-card>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { GetQuestions, GetArticles } from '@/api/global.js'

import ListItem from '@/components/list-item/index.vue'
import Loading from '@/components/loading/index.vue'
import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
export default {
  props: {
    topic: {
      type: Object,
      default: null,
    },
  },
  components: {
    ListItem,
    Loading,
    ListItemSkeleton,
  },
  data() {
    return {
      userStore: useUserStore(),
      tab_item: 'questions',
      question_loading: false,
      question_data: null,
      question_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      },
      article_loading: false,
      article_data: null,
      article_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      },
      following_question_loading: false,
      following_question_data: null,
      following_question_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      },
      following_article_loading: false,
      following_article_data: null,
      following_article_pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      },
    }
  },
  methods: {
    async GetQuestions() {
      if (this.question_loading) {
        return
      }
      this.question_loading = true
      // console.log(this.topic)
      const response = await GetQuestions({
        order: '-create_time',
        page: this.question_pagination.next,
        per_page: this.question_pagination.per_page,
        user_token: this.$G_GetUserToken(),
        // specify_topic_id: this.topic.topic_id,
        specify_topic_id: this.$route.params.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.question_data == null
          ? (this.question_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.question_data, response.data.data)
        this.question_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.question_loading = false
    },
    async GetArticles() {
      if (this.article_loading) {
        return
      }
      this.article_loading = true
      // console.log(this.topic)
      const response = await GetArticles({
        order: '-create_time',
        page: this.article_pagination.next,
        per_page: this.article_pagination.per_page,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.article_data == null
          ? (this.article_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.article_data, response.data.data)
        this.article_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.article_loading = false
    },
    async GetFollowingQuestions() {
      if (this.following_question_loading) {
        return
      }
      this.following_question_loading = true
      const response = await GetQuestions({
        order: '-create_time',
        page: this.following_question_pagination.next,
        per_page: this.following_question_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `question_id`
        this.following_question_data == null
          ? (this.following_question_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.following_question_data, response.data.data)
        this.following_question_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.following_question_loading = false
    },
    async GetFollowingArticles() {
      if (this.following_article_loading) {
        return
      }
      this.following_article_loading = true
      const response = await GetArticles({
        order: '-create_time',
        page: this.following_article_pagination.next,
        per_page: this.following_article_pagination.per_page,
        following: true,
        user_token: this.$G_GetUserToken(),
        specify_topic_id: this.topic.topic_id,
      })
      if (response.data.is_get == true) {
        var keys = `article_id`
        this.following_article_data == null
          ? (this.following_article_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.following_article_data, response.data.data)
        this.following_article_pagination = response.data.pagination
        this.$forceUpdate()
      }
      this.following_article_loading = false
    },
    UpdateTabItems(val) {
      var hash = val.hash
      if (hash == '') {
        this.tab_item = 'questions'
      } else {
        hash = hash.replace('#', '')
        this.tab_item = hash
      }

      // console.log('this.tab_item', this.tab_item)

      switch (this.tab_item) {
        case 'questions':
          this.GetQuestions()
          break
        case 'articles':
          this.GetArticles()
          break
        case 'following_questions':
          this.GetFollowingQuestions()
          break
        case 'following_articles':
          this.GetFollowingArticles()
          break
        default:
          this.GetQuestions()
          break
      }
    },
    ResetData() {
      this.tab_item = 'questions'
      this.question_loading = false
      this.question_data = null
      this.question_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.article_loading = false
      this.article_data = null
      this.article_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.following_question_loading = false
      this.following_question_data = null
      this.following_question_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.following_article_loading = false
      this.following_article_data = null
      this.following_article_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
    },
  },
  computed: {
    ReturnUserIsLogin() {
      return this.userStore.getIsLogin
    },
  },
  created() {
    this.UpdateTabItems(this.$route)
  },
  watch: {
    $route(val) {
      this.UpdateTabItems(val)
    },
    ReturnUserIsLogin(val) {
      if (val) {
        this.UpdateTabItems(this.$route)
        // this.UpdateWebTitleAndAppbarSubTitle(this.$route)
      }
    },
    topic(val) {
      this.ResetData()
    },
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
