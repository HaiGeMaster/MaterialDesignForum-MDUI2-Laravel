
<template>
  <div id="page-question"
    :style="!$store.getters.GetMobile ? 'padding:16px;' : ''">
    
    <ReturnButton />
    <mdui-card v-if="question" :variant="$store.getters.GetDark ? 'filled' : 'elevated'" class="question" style="width: 100%;"
      >
      <h1 class="title">
        {{ question.title }}

        <!-- <div class="flex-grow" />
        <mdui-button @click="
          $store.dispatch('FabDialog/Set_EditorFabDialog', {
            title:$t('Message.Components.Editor.EditQuestion'),
            icon:'mdi-forum',
            has_title:true,
            has_topic:true,
            submit_text:$t('Message.Components.Editor.Release'),
            edit_type:'question',
            edit_mode:'edit',
            edit_mode_id:question.question_id,
            md_title:question.title,
            md_topics:question.topics,
            md_content:question.content_rendered,
            model:'moderate',
          })
        " style="margin: auto;">
          <mdi-icon slot="icon" icon="mdi-pencil"></mdi-icon>
          {{ $t('Message.Components.OptionsButton.EditQuestion') }}
        </mdui-button> -->
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
          $store.dispatch('Dialog/Set_CommentsDialog', {
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

    <!-- <CommentsDialog :title="$store.getters['Dialog/GetCommentsDialog'].title"
      :model="$store.getters['Dialog/GetCommentsDialog'].model"
      :external_loading="$store.getters['Dialog/GetCommentsDialog'].external_loading"
      :commentable_id="$store.getters['Dialog/GetCommentsDialog'].commentable_id"
      :commentable_type="$store.getters['Dialog/GetCommentsDialog'].commentable_type"
      :comment_count="$store.getters['Dialog/GetCommentsDialog'].comment_count"
      @close_comments_dialog="$store.dispatch('Dialog/Set_CommentsDialog', { model: false })" @return_update_comments="(comment) => {
    $store.getters['Dialog/GetCommentsDialog'].return_update_comments(comment)
  }" /> -->

  </div>
</template>
<script>
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
    question: null,
  }),
  computed: {
    ReturnUpdateGetQuestionUpdate() {
      return this.$store.getters['Update/GetQuestionUpdate']
    },
    ReturnGetScrollValue() {
      return this.$store.getters.GetScrollValue
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
      this.$store.dispatch('Set_ReadTitle','');
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
        this.$store.dispatch('Set_ReadTitle',this.question.title);
      }else{
        this.$store.dispatch('Set_ReadTitle','');
      }
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>