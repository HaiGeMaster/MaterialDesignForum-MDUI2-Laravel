
<template>
  <div id="page-question"
    :style="!mainStore.getMobile ? 'padding:16px;' : ''">

    <ReturnButton />
    <mdui-card v-if="question" :variant="mainStore.getIsDark ? 'filled' : 'elevated'" class="question" style="width: 100%;"
      >
      <h1 class="title">
        {{ question.title }}

      </h1>
      <UserLine :user="question.user" :time="$G_UserTimeStampToDateTime(question.update_time)"
      />
      <TiptapEditor class="content" :editable="false" :content="question.content_rendered" />
      <div class="mc-topics-bar">
        <template v-for="topic in question.topics">
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
        <FollowButton followable_type="question" :followable_id="question.question_id"
          :is_follow="question.is_follow" />
        <div style="margin-left: 8px;"></div>

        <CommentButton :count="question.comment_count" @comment_button_click="
          dialogStore.setCommentDialog({
            model: true,
            title: $t('Message.Client.Article.NComment', { value: question.comment_count }),
            commentable_id: question.question_id,
            commentable_type: 'question',
            comment_count: question.comment_count,
            return_update_comments: (comment) => {
              question.comment_count++
            }
          })
        " />

        <div class="flex-grow" />
        <OptionsButton v-if="question != null" type="question" :item="question" />
      </div>
    </mdui-card>

    <!-- 骨架屏卡片 -->
    <mdui-card class="question" style="width: 100%;" v-else>
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

    <AnswersPage v-if="question != null" :question="question" />

  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useDialogStore } from '@/stores/dialog'
import { useUpdateStore } from '@/stores/update'
import {
  GetQuestion,
  Get_G_QUESTION,
} from '@/api/global.js'
import ReturnButton from '@/components/return-button/index.vue'
import TiptapEditor from '@/components/tiptap-editor/index.vue'
import FollowButton from '@/components/follow-button/index.vue'
import CommentButton from '@/components/comments/components/comment-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
import UserLine from '@/components/user-line/index.vue'
import AnswersPage from '@/components/answers/answers-page.vue'
// import CommentsDialog from '@/components/comments/dialog.vue'
import ListItemSkeleton from '@/components/list-item-skeleton/index.vue'
export default {
  components: {
    ReturnButton,
    TiptapEditor,
    FollowButton,
    CommentButton,
    OptionsButton,
    UserLine,
    AnswersPage,
    // CommentsDialog,
    ListItemSkeleton,
  },
  data: () => ({
    mainStore: useMainStore(),
    dialogStore: useDialogStore(),
    updateStore: useUpdateStore(),
    question: null,
  }),
  computed: {
    ReturnUpdateGetQuestionUpdate() {
      return this.updateStore.getQuestionUpdate
    },
    ReturnGetScrollValue() {
      return this.mainStore.getScrollValue
    },
  },
  methods: {
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'question' || val.name == 'lang-question' ||
        val.name == 'question-answer' || val.name == 'lang-question-answer'
      ) {
        this.$G_UpdateWebTitleAndAppbarSubTitle(
          this.$t('Message.Client.Question.WebSubTitle'),
          this.$t('Message.Client.Question.WebSubTitle')
        )
        this.GetQuestion()
      }
    },
    async GetQuestion() {
      this.question = null
      const QUESTION = Get_G_QUESTION()
            if (QUESTION !== null) {
        this.question = QUESTION.question
        return
      }

      const response = await GetQuestion({
        question_id: this.$route.params.question_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.question = response.data.question
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
    ReturnUpdateGetQuestionUpdate(val) {
      this.question = val
    },
    ReturnGetScrollValue(val) {
      // console.log('GetScrollValue', val);
      const path = this.$route.name
      if(val>=4&&(path=='question'||path=='lang-question')){
        this.mainStore.setReadTitle(this.question.title);
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
