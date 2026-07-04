<template>
  <div class="mc-comments-page">
    <ListHeader :title="list_header_title" type="topics" @menu_order_item_select="
      (name, _order) => {
        order = _order
      }
    " @OnInit="(val) => { order = val }" />
    <Comments :order="order" :show_new_comment="false" :external_loading="external_loading" :need_glass_container="true"
      item_classes="layout-colourless" :commentable_id="commentable_id" :commentable_type="commentable_type"
      @return_update_comments="(comment) => { $emit('return_update_comments', comment) }" />
    <div :class="[
      'new-comment-fixed',
    ]" :style="{
        'max-width': '846px',
        'width': '100%',
        'transition': 'transform 0.3s ease, opacity 0.3s ease',
        // 'margin-left': $store.getters.GetPc && $store.getters.GetComponents.drawer_navigation
        //     $store.getters.GetPad && $store.getters.GetComponents.drawer_navigation
        // 'bottom': $store.getters.GetMobile ? '56px' : '0',

        //   'margin-right': $store.getters.GetPc && $store.getters.GetComponents.drawer_navigation
        //   ?
        //   '256px'
        //   :
        //   (
        //     $store.getters.GetPad && $store.getters.GetComponents.drawer_navigation
        //       ?
        //       '86px'
        //       :
        //       ''
        //   )
        // ,

        'bottom': $store.getters.GetMobile ? '80px' : '0',
        'transform': $store.getters.GetScrollMode == 'down' && !$store.getters.GetSelect ? 'translateY(100%)' : 'none',
        'opacity': $store.getters.GetScrollMode == 'down' && !$store.getters.GetSelect ? '0' : '',
      }">
      <div class="container">
        <NewCommentOrReply :new_comment_reply_elevation="'10'" :label="$t(
          'Message.Components.Comments.NewCommentOrReply.WriteYourComment'
        )" @return_update_comments="
            (comment) => {
              $emit('return_update_comments', comment);
              $store.dispatch('Update/Set_CommentUpdate', comment)
            }" :commentable_id="commentable_id" :commentable_type="commentable_type" :show="true"
          card_list_elevation="10" @on_focus="$store.dispatch('NewCommentReply/Set_Select', true)"
          @on_blur="$store.dispatch('NewCommentReply/Set_Select', false)" />
      </div>
    </div>
  </div>
</template>
<script>
import Comments from './index.vue'
import ListHeader from '@/components/list-header/index.vue'
import NewCommentOrReply from './components/new-comment-or-reply/index.vue'
export default {
  props: {
    external_loading: {
      type: Boolean,
      default: false,
    },
    commentable_type: {
      type: String,
      default: 'question',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    list_header_title: {
      type: String,
      default: '',
    },
  },
  components: {
    Comments,
    ListHeader,
    NewCommentOrReply,
  },
  data: () => ({
    show_self_new_comment: false,
    order: '-update_time',
  }),
  watch: {
    '$route.path': {
      handler(newVal, oldVal) {
        this.$store.dispatch('Set_ScrollMode', 'up')
      },
      immediate: true
    }
  }
}
</script>
<style lang="less">
@import "../../vendor/variable.less";

.mc-comments-page {
  .mc-list-header {
    margin-top: 32px;
    margin-bottom: 20px;

    @media (max-width: @screen-xs-max) {
      margin-top: 20px;
      margin-bottom: 12px;
      padding: 0 16px;
    }
  }

  .comments-wrapper {
    margin-bottom: 16px;
    overflow: hidden;

    .mc-loaded {
      margin-bottom: 24px !important;
    }

    @media (max-width: @screen-xs-max) {
      border-right: none;
      border-left: none;
      border-radius: 0;
    }
  }

  .comments {
    border: none;
  }

  .new-comment-fixed {
    position: fixed;

    .container {
      max-width: 846px;
      padding-top: 0;
      padding-bottom: 0;

      @media (max-width: @screen-xs-max) {
        padding: 0;
      }
    }

    .new-comment {

      box-sizing: border-box;
      padding-right: 64px !important;
      padding-left: 64px !important;
      // border-top-left-radius: 8px;
      // border-top-right-radius: 8px;
      border-top-left-radius: var(--mdui-shape-corner-extra-large);
      border-top-right-radius: var(--mdui-shape-corner-extra-large);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      // @media (max-width: @screen-xs-max) {
      @media (max-width: @screen-sm-max) {
        padding-right: 16px !important;
        padding-left: 16px !important;
        border-right: none;
        border-left: none;
        border-radius: 0;

        
        // border-top-left-radius: var(--mdui-shape-corner-extra-large);
        // border-top-right-radius: var(--mdui-shape-corner-extra-large);
        // border-bottom-left-radius: 0;
        // border-bottom-right-radius: 0;

        // width: calc(100% - 86px);
      }

      //min-width: @screen-sm-min且max-width: @screen-sm-max
      @media (min-width: @screen-sm-min) and (max-width: 940px) {
        width: calc(100% - 86px);
        
      }
      
    }

    // @media (max-width: @screen-sm-max) {
    // }
  }
}
</style>