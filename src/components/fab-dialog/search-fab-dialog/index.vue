<template>
  <FabDialog name_id="search_fab_dialog" :model="vmodel" @model="vmodel = $event" icon="mdi-magnify"
    :title="$t('Message.Components.Search.SearchTooltop') + `(${pagination.total})`">
    

    <mdui-linear-progress
      v-if="IsLoading"
      
    ></mdui-linear-progress>

    <mdui-tabs :value="tab"
    style="height: 100%;overflow-y: scroll;"
    >
      <mdui-tab v-for="(item, i) in tab_items" :key="`tab_${i}`" :value="item.value"
      @click="tab = item.value" inline
      >
      
        <mdi-icon slot="icon" :icon="item.icon" ></mdi-icon>
        {{ item.text }}
      </mdui-tab>

      <mdui-tab-panel slot="panel" value="topics">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="topics != null" v-for="(item, i) in topics" :key="`topics_${i}`"
            @click="$router.push(`${$G_UrlHeaderLang()}/topics/${item.topic_id}`)"
            :headline="item.name"
            :description="item.description"
            >
            

            <mdui-card slot="icon">
              <img :src="$G_ImgHandle(item.cover.middle)" style="max-width: 120px;"/>
            </mdui-card>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="questions">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="questions != null" v-for="(item, i) in questions" :key="`questions_${i}`"
            @click="$router.push(`${$G_UrlHeaderLang()}/questions/${item.question_id}`)"
            :headline="item.title"
            :description="item.content_markdown"
            headline-line="1"
            description-line="1"
            >
            <mdui-avatar slot="icon" :src="$G_ImgHandle(item.user.avatar.small)"></mdui-avatar>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="articles">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="articles != null" v-for="(item, i) in articles" :key="`articles_${i}`"
            @click="$router.push(`${$G_UrlHeaderLang()}/articles/${item.article_id}`)"
            :headline="item.title"
            :description="item.content_markdown"
            headline-line="1"
            description-line="1"
            >
            <mdui-avatar slot="icon" :src="$G_ImgHandle(item.user.avatar.small)"></mdui-avatar>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="answers">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="answers != null" v-for="(item, i) in answers" :key="`answers_${i}`"
            @click="$router.push(`${$G_UrlHeaderLang()}/questions/${item.question_id}/answers/${item.answer_id}`)"
            :headline="item.content_markdown"
            :description="item.user.username"
            headline-line="1"
            description-line="1"
            >
            <mdui-avatar slot="icon" :src="$G_ImgHandle(item.user.avatar.small)"></mdui-avatar>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="comments">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="comments != null" v-for="(item, i) in comments" :key="`comments_${i}`"
            @click="$router.push(item.commentable_type == 'question' ?
              `${$G_UrlHeaderLang()}/questions/${item.commentable_id}` :
              item.commentable_type == 'answer' ?
                `${$G_UrlHeaderLang()}/questions/${item.commentable_id}/answers/${item.commentable_id}` :
                item.commentable_type == 'article' ?
                  `${$G_UrlHeaderLang()}/articles/${item.commentable_id}` :
                  ''
              )"
            :headline="item.content"
            :description="item.user.username"
            headline-line="1"
            description-line="1"
            >
            <mdui-avatar slot="icon" :src="$G_ImgHandle(item.user.avatar.small)"></mdui-avatar>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="replys">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="replys != null" v-for="(item, i) in replys" :key="`replys_${i}`"
            @click="$router.push(item.replyable_parent_type == 'question' ?
              `${$G_UrlHeaderLang()}/questions/${item.replyable_parent_id}` :
              item.replyable_parent_type == 'article' ?
                `${$G_UrlHeaderLang()}/articles/${item.replyable_parent_id}` :
                ''
              )"
            :headline="item.content"
            :description="item.user.username"
            headline-line="1"
            description-line="1"
            >
            <mdui-avatar slot="icon" :src="$G_ImgHandle(item.user.avatar.small)"></mdui-avatar>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>

      <mdui-tab-panel slot="panel" value="users">
        <mdui-list>
          <mdui-list-subheader>
            {{
              $t('Message.Components.Search.SearchTooltop')
              + ': ' + value
            }}
          </mdui-list-subheader>
          <mdui-list-item v-if="users != null" v-for="(item, i) in users" :key="`users_${i}`"
            @click="$router.push(`${$G_UrlHeaderLang()}/users/${item.user_id}`)"
            :headline="item.username"
            :description="item.headline"
            headline-line="1"
            description-line="1"
            >
            <mdui-avatar slot="icon" :src="$G_ImgHandle(item.avatar.small)"></mdui-avatar>
          </mdui-list-item>
        </mdui-list>
      </mdui-tab-panel>



    </mdui-tabs>
  </FabDialog>
</template>
<script>
import FabDialog from '@/components/fab-dialog/common-fab-dialog/index.vue'
import {
  GetDatas
} from '@/api/global.js'
export default {
  name: 'search-fab-dialog',
  components: {
    FabDialog
  },
  props: {
    model: {
      type: String,
      default: 'close',    },
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      tab: 'topics',
      vmodel: 'close',
      topics: null,
      questions: null,
      articles: null,
      answers: null,
      comments: null,
      replys: null,
      users: null,
      IsLoading: false,
      pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
    }
  },
  computed: {
    tab_items() {
      return [
        {
          text: this.$t('Message.Components.DrawerNavigation.Topics'),
          icon: 'mdi-book-variant',
          value: 'topics'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Questions'),
          icon: 'mdi-forum',
          value: 'questions'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Articles'),
          icon: 'mdi-file-document',
          value: 'articles'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Answers'),
          icon: 'mdi-message-reply',
          value: 'answers'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Comments'),
          icon: 'mdi-message-reply-text',
          value: 'comments'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.Replts'),
          icon: 'mdi-reply-all',
          value: 'replys'
        },
        {
          text: this.$t('Message.Components.DrawerNavigation.User'),
          icon: 'mdi-account-multiple',
          value: 'users'
        },
      ]
    }
  },
  methods: {
    // OnClick(item) {
    //   this.$emit('model', 'close')
    //   this.$router.push(item.link)
    // },
    async GetData(type) {
      try {
        this.IsLoading = true
        var token = this.$G_GetUserToken()
        const response = await GetDatas(type, {
          order: '-update_time',
          page: this.pagination.next,
          type:'',
          question_id: '',
          commentable_id: '',
          commentable_type: '',
          replyable_comment_id: '',
          user_token: token != '' ? token : '',
          search_keywords: this.value
        })
        if (response.data.is_get == true) {
          var keys = type == 'articles' ?
            'article_id' : type == 'questions' ?
              'question_id' : type == 'answers' ?
                'answer_id' : type == 'messages' ?
                  'message_id' : type == 'users' ?
                    'user_id' : ''
          switch (type) {
            case 'topics':
              this.topics = response.data.data
              break
            case 'questions':
              this.questions = response.data.data
              break
            case 'articles':
              this.articles = response.data.data
              break
            case 'answers':
              this.answers = response.data.data
              break
            case 'comments':
              this.comments = response.data.data
              break
            case 'replys':
              this.replys = response.data.data
              break
            case 'users':
              this.users = response.data.data
              break
          }
          this.pagination.total = response.data.pagination.total
          this.pagination.pages = response.data.pagination.pages
          this.pagination.previous = response.data.pagination.previous
          this.pagination.next = response.data.pagination.next
          this.pagination.page = response.data.pagination.page
          this.pagination.per_page = response.data.pagination.per_page
          this.$forceUpdate()
          this.IsLoading = false
        } else {
          this.IsLoading = false
        }
      } catch (error) {
        this.IsLoading = false
      }
    },
    StartSearch() {
      if(this.value == '') {
        this.vmodel = 'close'
        return
      }
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
      // console.log('StartSearch', this.tab)
            // console.log('StartSearch', this.tab_items[this.tab].value)

      //找到 this.tab_items 对象中的value==this.tab的对象
      // const item = this.tab_items.find(item => item.value == this.tab)
      // switch (this.tab_items[this.tab].value) {
      switch (this.tab) {
        case 'topics':
          this.topics = null
          this.GetData('topics')
          break
        case 'questions':
          this.questions = null
          this.GetData('questions')
          break
        case 'articles':
          this.articles = null
          this.GetData('articles')
          break
        case 'answers':
          this.answers = null
          this.GetData('answers')
          break
        case 'comments':
          this.comments = null
          this.GetData('comments')
          break
        case 'replys':
          this.replys = null
          this.GetData('replys')
          break
        case 'users':
          this.users = null
          this.GetData('users')
          break
      }
    },
  },
  watch: {
    value(val) {
      if (val == ''){
        this.vmodel = 'close'
        return
      }
      this.StartSearch()
    },
    vmodel(val) {
      if (val == 'close') {
        this.$emit('model', val)
      }
    },
    model(val) {
      this.vmodel = val
    },
    tab(val) {
      this.StartSearch()
    },
    '$route'(to, from) {
      if (!this.$store.getters.GetPc) {
        this.vmodel = 'close'
      }
    }
  }
}
</script>