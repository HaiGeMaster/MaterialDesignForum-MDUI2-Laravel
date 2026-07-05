<template>
  <mdui-card
    variant="outlined"
    class="contexts glass-container mdui-card-variant-color-border"
    :rounded="mainStore.getMobile ? '0' : 'xxl'"
    style="width: 100%; min-height: 350px"
  >
    <mdui-tabs :value="tab_item">
      <mdui-tab value="question" @click="$router.push({ hash: '#questions' })">
        {{
          $t('Message.Client.User.Contexts.TabNAskingQuestions', {
            value: user ? user.question_count : 0,
          })
        }}
      </mdui-tab>
      <mdui-tab value="answer" @click="$router.push({ hash: '#answers' })">
        {{
          $t('Message.Client.User.Contexts.TabNAnswer', {
            value: user ? user.answer_count : 0,
          })
        }}
      </mdui-tab>
      <mdui-tab value="article" @click="$router.push({ hash: '#articles' })">
        {{
          $t('Message.Client.User.Contexts.TabNArticle', {
            value: user ? user.article_count : 0,
          })
        }}
      </mdui-tab>

      <mdui-tab-panel slot="panel" value="question">
        <mdui-list>
          <ListItem
            v-for="(item, index) in question_data"
            :key="index"
            type="questions"
            :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}`"
            :item="item"
            :title="item.title"
            :subtitle="item.content_markdown"
            :action_time="$G_UserTimeStampToDateTime(item.create_time)"
            :action_subtitle="
              $t('Message.Client.Question.NAnswers', {
                value: item.answer_count,
              })
            "
          />
        </mdui-list>

        <ListItemSkeleton v-if="question_loading" v-for="i in 20" />

        <Loading
          :empty="question_data == null"
          :loading="question_loading"
          :pagination="question_pagination"
          @autoload="GetUserQuestions"
          :need_margin_bottom="false"
        />
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="answer">
        <mdui-list>
          <ListItem
            v-for="(item, index) in answer_data"
            :key="index"
            type="answers"
            :to="`${$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`"
            :item="item"
            :title="item.content_markdown"
            :subtitle="item.question_title"
            :action_time="`${$G_UserTimeStampToDateTime(item.create_time)}`"
            :action_subtitle="
              $t('Message.Client.Article.NComment', {
                value: item.comment_count,
              })
            "
          />

          <ListItemSkeleton v-if="answer_loading" v-for="i in 20" />
        </mdui-list>
        <Loading
          :empty="answer_data == null"
          :loading="answer_loading"
          :pagination="answer_pagination"
          @autoload="GetUserAnswers"
          :need_margin_bottom="false"
        />
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="article">
        <mdui-list>
          <ListItem
            v-for="(item, index) in article_data"
            :key="index"
            type="articles"
            :to="`${$G_UrlHeaderLang()}/articles/${item.article_id}`"
            :item="item"
            :title="item.title"
            :subtitle="item.content_markdown"
            :action_time="$G_UserTimeStampToDateTime(item.create_time)"
            :action_subtitle="
              $t('Message.Client.Article.NComment', {
                value: item.comment_count,
              })
            "
          />

          <ListItemSkeleton v-if="article_loading" v-for="i in 20" />
        </mdui-list>
        <Loading
          :empty="article_data == null"
          :loading="article_loading"
          :pagination="article_pagination"
          @autoload="GetUserArticles"
          :need_margin_bottom="false"
        />
      </mdui-tab-panel>
    </mdui-tabs>
  </mdui-card>
</template>
<script>
import { useMainStore } from '@/stores/main'
import {
  GetUserQuestions,
  GetUserAnswers,
  GetUserArticles,
  Get_G_USER_QUESTIONS,
  Get_G_USER_ANSWERS,
  Get_G_USER_ARTICLES,
} from '@/api/global.js'

import ListItem from '@/components/list-item/index.vue'
import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
import Loading from '@/components/loading/index.vue'
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
    help_tab_item: {
      type: String,
      default: 'question',
    },
  },
  components: {
    ListItem,
    Loading,
    ListItemSkeleton,
  },
  data() {
    return {
      mainStore: useMainStore(),
      tab_item: 'question',
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
      answer_loading: false,
      answer_data: null,
      answer_pagination: {
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
    }
  },
  methods: {
    async GetUserQuestions() {
      const USER_QUESTIONS = Get_G_USER_QUESTIONS()
      if (USER_QUESTIONS !== null) {
        this.question_data = USER_QUESTIONS.data
        this.question_pagination = USER_QUESTIONS.pagination
        return
      }

      if (this.question_loading) return
      this.question_loading = true
      const response = await GetUserQuestions({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
        page: this.question_pagination.next,
        order: '-create_time',
      })
      if (response.data.is_get) {
        var keys = `question_id`
        this.question_data == null
          ? (this.question_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.question_data, response.data.data)
        this.question_pagination = response.data.pagination
      }
      this.question_loading = false
    },
    async GetUserAnswers() {
      const USER_ANSWERS = Get_G_USER_ANSWERS()
      if (USER_ANSWERS !== null) {
        this.answer_data = USER_ANSWERS.data
        this.answer_pagination = USER_ANSWERS.pagination
        return
      }

      if (this.answer_loading) return
      this.answer_loading = true
      const response = await GetUserAnswers({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
        page: this.answer_pagination.next,
        order: '-create_time',
      })
      if (response.data.is_get) {
        var keys = `answer_id`
        this.answer_data == null
          ? (this.answer_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.answer_data, response.data.data)
        this.answer_pagination = response.data.pagination
      }
      this.answer_loading = false
    },
    async GetUserArticles() {
      const USER_ARTICLES = Get_G_USER_ARTICLES()
      if (USER_ARTICLES !== null) {
        this.article_data = USER_ARTICLES.data
        this.article_pagination = USER_ARTICLES.pagination
        return
      }

      if (this.article_loading) return
      this.article_loading = true
      const response = await GetUserArticles({
        user_id: this.$route.params.user_id,
        user_token: this.$G_GetUserToken(),
        page: this.article_pagination.next,
        order: '-create_time',
      })
      if (response.data.is_get) {
        var keys = `article_id`
        this.article_data == null
          ? (this.article_data = response.data.data)
          : this.$G_FilterSameItems(keys, this.article_data, response.data.data)
        this.article_pagination = response.data.pagination
      }
      this.article_loading = false
    },
    ResetData() {
      this.question_data = null
      this.question_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.answer_data = null
      this.answer_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.article_data = null
      this.article_pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.$forceUpdate()
    },
    tab_itemchange(val) {
      this.$emit('tab_item', val)
    },
  },
  created() {
    // this.GetUserQuestions()
    // this.GetUserAnswers()
    // this.GetUserArticles()
  },
  watch: {
    user(val) {
      if (val != null) {
        // console.log(this.user)
        this.$forceUpdate()
        this.ResetData()
        this.GetUserQuestions()
        this.GetUserAnswers()
        this.GetUserArticles()
      }
    },
    tab_item(val) {
      this.$emit('tab_item', val)
    },
    $route(val) {
      // console.log(this.user)
      this.$forceUpdate()
      console.log('route', val.hash)
      if (val.hash == '#questions') {
        this.tab_item = 'question'
        this.GetUserQuestions()
      } else if (val.hash == '#answers') {
        this.tab_item = 'answer'
        this.GetUserAnswers()
      } else if (val.hash == '#articles') {
        this.tab_item = 'article'
        this.GetUserArticles()
      } else {
        this.tab_item = 'question'
        this.GetUserQuestions()
      }
    },
  },
}
</script>
<style lang="less">
@import '../../../topic/components/contexts/index.less';
</style>
