
<template>
  <div id="page-article"
    :style="!mainStore.getMobile ? 'padding:16px;' : ''"
  >
    <ReturnButton />
    <mdui-card :variant="mainStore.getIsDark ? 'filled' : 'elevated'" class="article" style="width: 100%;"
      v-if="article != null">
      <h1 class="title">
        {{ article.title }}

      </h1>
      <UserLine :user="article.user" :time="$G_UserTimeStampToDateTime(article.update_time)"></UserLine>
      <TiptapEditor class="content" :editable="false" :content="article.content_rendered" />
      <div class="mc-topics-bar">
        <template v-for="topic in article.topics">
          <mdui-chip  style="background-color: transparent;margin: 4px;" slot="icon"
          @click="$router.push(`${$G_UrlHeaderLang()}/topics/${topic.topic_id}`)"
          >
            <mdui-avatar slot="icon">
            <img :src="$G_ImgHandle(topic.cover.small)">
            </img>
          </mdui-avatar>
              {{
              topic.name
            }}
          </mdui-chip>
        </template>
      </div>
      <div class="actions">
        <VoteButton
          :vote="article.vote"
          :vote_up_count="article.vote_up_count"
          :vote_down_count="article.vote_down_count"
        />
        <FollowButton followable_type="article" :followable_id="article.article_id" :is_follow="article.is_follow" />

        <div class="flex-grow" />
        <OptionsButton type="article" :item="article" />
      </div>
    </mdui-card>


    <!-- 骨架屏卡片 -->
    <mdui-card class="article" style="width: 100%;" v-else>
      <h1 class="title">
        <div class="skeleton-item"></div>
      </h1>
      <ListItemSkeleton/>
      <div class="content">
        <div class="skeleton-item" v-for="i in 15" ></div>
      </div>
      <div class="mc-topics-bar" style="display: flex;">
        <div class="skeleton-item" style="width: 100px; height: 24px; margin-right: 8px;" v-for="i in 5"></div>
      </div>
    </mdui-card>

    <CommentsPage v-if="article != null"
      :external_loading="true"
      :commentable_type="'article'"
      :commentable_id="article.article_id"
      :list_header_title="$t('Message.Client.Article.NComment',{
        value: article.comment_count
      })"
    />
  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
import {
  GetArticle,
  Get_G_ARTICLE,
} from '@/api/global.js'
import ReturnButton from '@/components/return-button/index.vue'
import TiptapEditor from '@/components/tiptap-editor/index.vue'
import FollowButton from '@/components/follow-button/index.vue'
import VoteButton from '@/components/vote-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import UserLine from '@/components/user-line/index.vue'
import CommentsPage from '@/components/comments/comments-page.vue'
import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
export default {
  components: {
    ReturnButton,
    TiptapEditor,
    FollowButton,
    VoteButton,
    OptionsButton,
    UserLine,
    CommentsPage,
    ListItemSkeleton,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    article: null,
  }),
  computed: {
    ReturnUpdateGetArticleUpdate() {
      return this.updateStore.getArticleUpdate
    },
    ReturnGetScrollValue() {
      return this.mainStore.getScrollValue
    },
  },
  methods: {
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'article' || val.name == 'lang-article' ||
        val.name == 'article-answer' || val.name == 'lang-article-answer'
      ) {
        this.$G_UpdateWebTitleAndAppbarSubTitle(
          this.$t('Message.Client.Article.WebSubTitle'),
          this.$t('Message.Client.Article.WebSubTitle')
        )
        this.GetArticle()
      }
    },
    async GetArticle() {
      this.article = null
      const ARTICLE = Get_G_ARTICLE()
            if (ARTICLE !== null) {
        this.article = ARTICLE.article
        return
      }

      const response = await GetArticle({
        article_id: this.$route.params.article_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.article = response.data.article
        this.$forceUpdate()
      }
    },
  },
  created() {
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    '$route.path'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(val)
      this.mainStore.setReadTitle('');
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUpdateGetArticleUpdate(val) {
      this.article = val
    },
    ReturnGetScrollValue(val) {
      // console.log('GetScrollValue', val);
      const path = this.$route.name
      if(val>=4&&(path=='article'||path=='lang-article')){
        this.mainStore.setReadTitle(this.article.title);
      }else{
        this.mainStore.setReadTitle('');
      }
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>
