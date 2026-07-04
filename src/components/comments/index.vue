<template>
  <div class="mc-comments">
    <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'"
      style="width: 100%;"
      :class="[
        'comments-wrapper',
        {
          'glass-container': need_glass_container,
          'layout-colourless': !need_glass_container,
        }
      ]"
      :outlined="need_outlined"
      :rounded="!need_rounded||$store.getters.GetMobile?'0':'xxl'"
      :elevation="card_list_elevation"
      >

      <!-- <div style="max-height: 50%;overflow: auto;"> -->

        <template v-for="(item, index) in data">
          <mdui-divider v-if="index != 0"></mdui-divider>
          <CommentItem :classes="item_classes" :comment="item"
            @update_comment_reply_count="(count) => { data[index].reply_count = count }" />
        </template>
      <!-- </div> -->
      
        
      <Loading :empty="data==null"
        :loading="is_loading" 
        :pagination="pagination"
        @autoload="GetComments"
      />

      
    </mdui-card>
      
    <NewCommentOrReply
      :dialog_mode="dialog_mode"
      :show="show_new_comment"
      :new_comment_reply_need_glass_container="new_comment_reply_need_glass_container"
      :new_comment_reply_rounded_t_or_b="new_comment_reply_rounded_t_or_b" 
      :new_comment_reply_elevation="'10'"
      :commentable_type="commentable_type"
      :commentable_id="commentable_id" 
      @return_update_comments="return_update_comments" 
    />
  </div>
</template>
<script>
import CommentItem from './components/comment-item/index.vue'
import Loading from '@/components/loading/index.vue'

import NewCommentOrReply from './components/new-comment-or-reply/index.vue'
import {
  GetComments,
  Get_G_ARTICLE_COMMENTS,
} from '@/api/global.js'
export default {
  name: 'comments',
  props: {
    show_new_comment: {
      type: Boolean,
      default: true,
    },
    external_loading: {
      type: Boolean,
      default: false,
    },
    need_glass_container: {
      type: Boolean,
      default: true,
    },
    need_rounded: {
      type: Boolean,
      default: true,
    },
    need_outlined: {
      type: Boolean,
      default: true,
    },
    new_comment_reply_need_glass_container: {
      type: Boolean,
      default: true,
    },
    new_comment_reply_rounded_t_or_b: {
      type: String,
      default: 't',
    },
    item_classes: {
      type: String,
      default: 'glass-container'
    },
    commentable_type: {
      type: String,
      default: 'question',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    order: {
      type: String,
      default: '-update_time',
    },
    card_list_elevation: {
      type: String,
      default: '0',
    },
    dialog_mode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CommentItem,
    Loading,
        NewCommentOrReply,
  },
  computed:{
    ReturnUpdateGetCommentUpdate(){
      return this.$store.getters['Update/GetCommentUpdate']
    }
  },
  data() {
    return {
      is_loading: false,
      data: null,
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
  methods: {
    async GetComments() {
      const ARTICLE_COMMENTS = Get_G_ARTICLE_COMMENTS()
            if (ARTICLE_COMMENTS !== null) {
        this.data = ARTICLE_COMMENTS.data
        this.pagination = ARTICLE_COMMENTS.pagination
        return
      }

      if (this.is_loading || this.commentable_id==0) {
        return
      }
      this.is_loading = true
      const response = await GetComments({
        commentable_id: this.commentable_id,
        commentable_type: this.commentable_type,
        order: this.order,
        page: this.pagination.next,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('comment_id', this.data, response.data.data)
        this.pagination = response.data.pagination
        this.is_loading = false
      } else {
        this.is_loading = false
      }
    },
    return_update_comments(comment) {
      this.ResetData()
      this.GetComments()
                        //   this.data.unshift(comment)
            this.$emit('return_update_comments', comment)
      this.$forceUpdate()
    },
    ResetData(){
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
  },
  created() {
    if(window.G_ARTICLE_COMMENTS!=null){
      this.data = window.G_ARTICLE_COMMENTS.data
      this.pagination = window.G_ARTICLE_COMMENTS.pagination
    }else{
      this.GetComments()
    }
  },
  watch: {
    order(val) {
      if (val != '') {
        this.ResetData()
        this.GetComments()
      }
    },
    commentable_id(val) {
      if (val != 0) {
        this.ResetData()
        this.GetComments()
      }
    },
    commentable_type(val) {
      if (val != '') {
        this.ResetData()
        this.GetComments()
      }
    },
    ReturnUpdateGetCommentUpdate(val){
      
      this.ResetData()
      this.GetComments()
                  //   for(var i=0;i<this.data.length;i++){
      //     if(this.data[i].comment_id == val.comment_id){
                                                          }
  }
}
</script>
<style lang="less">
@import "../../vendor/variable.less";
.mc-comments {
  .comments {
    min-height: 148px;
    @media (max-width: @screen-xs-max) {
      border-right: none;
      border-left: none;
      border-radius: 0;
    }
  }
}
</style>