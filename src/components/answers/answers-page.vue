<template>
  <div class="mc-answers-page">
    <ListHeader v-if="question != null && answer == null"
      :title="$t('Message.Client.Question.NAnswers', { value: pagination.total })" type="topics"
      @menu_order_item_select="menu_order_item_select" @OnInit="(val) => { order = val }" />
    <mdui-button v-show="answer != null&&question.answer_count!=1" full-width 
    style="margin-top: 16px;" 
      :href="`${$G_UrlHeaderLang()}/questions/${question.question_id}`">
      {{
      $t('Message.Client.Question.LookAllNAnswers', { value: question.answer_count })
    }}
    </mdui-button>
    <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'"
    style="width: 100%;"
    :class="[
        'glass-container',
        'answers',
      ]" :rounded="$store.getters.GetMobile ? '0' : 'xxl'" outlined :style="{
      'margin-top': !$store.getters.GetMobile ? '20px' : '10px',
    }">
      <template v-for="(item, index) in data">
        <mdui-divider v-if="index != 0"></mdui-divider>
        <AnswersItem :answer="item" :question="question" />
      </template>
      <AnswersItem v-if="answer != null" :answer="answer" :question="question" />

      <Loading :empty="data==null" :loading="is_loading" :pagination="pagination" @autoload="GetAnswers" />
      
    </mdui-card>

    
  </div>
</template>
<script>
import AnswersItem from '@/components/answers/components/item/index.vue'
import ListHeader from '@/components/list-header/index.vue'
import Loading from '@/components/loading/index.vue'
import {
  GetAnswers,
  GetAnswer,
  Get_G_QUESTION_ANSWERS,
} from '@/api/global.js'
export default {
  name: 'answers-page',
  components: {
    AnswersItem,
    ListHeader,
    Loading,
      },
  props: {
    question: {
      type: Object,
      default: null,
    }
  },
  data: () => ({
    is_loading: false,
    is_empty: false,
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
    order: '-update_time',
    answer: null,
  }),
  methods: {
    menu_order_item_select(item, order) {
      this.order = order
      this.ResetData()
      this.GetAnswers()
    },
    ResetData() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    },
    async GetAnswers() {
      const QUESTION_ANSWERS = Get_G_QUESTION_ANSWERS()
            if (QUESTION_ANSWERS !== null) {
        this.data = QUESTION_ANSWERS.data
        this.pagination = QUESTION_ANSWERS.pagination
        return
      }

      if (this.$route.params.answer_id != null) {
        return
      }
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      const response = await GetAnswers({
        question_id: this.question.question_id,
        order: this.order,
        page: this.pagination.next,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('answer_id', this.data, response.data.data)
        this.pagination = response.data.pagination
      }
      this.is_loading = false
    },
    async GetAnswer() {
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      const response = await GetAnswer({
        answer_id: this.$route.params.answer_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.answer = response.data.answer
      }
      this.is_loading = false
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
    },
    StartEvent(){
      if (this.$route.params.answer_id != null) {
        this.GetAnswer()
      } else {
        this.ResetData()
        this.GetAnswers()
      }
    }
  },
  computed: {
    ReturnUpdateGetAnswerUpdate() {
      return this.$store.getters['Update/GetAnswerUpdate']
    }
  },
  created() {
    this.StartEvent()
  },
  watch: {
    ReturnUpdateGetAnswerUpdate(val) {
            if (this.$route.params.answer_id != null) {
        this.$router.push(`${this.$G_UrlHeaderLang()}/questions/${this.question.question_id}`)
        return
      }
      this.ResetData()
      this.GetAnswers()

                  //   for (var i = 0; i < this.data.length; i++) {
      //     if (this.data[i].answer_id == val.answer_id) {
                                    //   // this.data.unshift(val)
                
                      },
    question(val) {
      this.StartEvent()
    }
  }
}
</script>