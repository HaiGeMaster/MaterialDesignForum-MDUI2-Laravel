<template>

  <mdui-dialog 
    close-on-overlay-click 
    :fullscreen="$store.getters.GetMobile" 
    ref="comments_dialog"
    @close.self="dialog = false" 
    class="mc-comments-dialog" 
    style="margin: auto;"
    >


    <ListHeader slot="header" :show_close="true" :title="title" :total="comment_count" :show_total="true" type="topics"
      class="mc-list-header" @list_header_close_click="dialog = !dialog"
      @menu_order_item_select="menu_order_item_select" />

    <div :style="!$store.getters.GetMobile ? 'min-width: 500px;' : ''">
      <Comments :order="order" :dialog_mode="true" :need_glass_container="false" :need_rounded="false"
        :need_outlined="false" :commentable_id="commentable_id" :commentable_type="commentable_type"
        card_list_elevation="0" item_classes="layout-colourless" new_comment_reply_rounded_t_or_b="b"
        @list_header_close_click="dialog = false"
        @return_update_comments="(comment) => { $emit('return_update_comments', comment) }" />
    </div>


  </mdui-dialog>
</template>
<script>
import ListHeader from '@/components/list-header/index.vue'
import Comments from '@/components/comments/index.vue'
export default {
  name: 'comments-dialog',
  components: {
    ListHeader,
    Comments,
  },
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    commentable_type: {
      type: String,
      default: 'question',
    },
    commentable_id: {
      type: Number,
      default: 0,
    },
    comment_count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialog: false,
      order: '-update_time',
      list_header: [
        {
          order: '-update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromLateToEarly',
        },
        {
          order: '+update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromEarlyToLate',
        },
        {
          order: '-vote_count',
          name: 'Message.Client.Topic.Contexts.Hottest',
        },
      ],
    }
  },
  methods: {
    menu_order_item_select(item, order) {
      this.order = order
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$refs.comments_dialog.open = false
        this.$emit('close_comments_dialog')
      }
      //   this.$refs.comments_dialog.open = true
    },
    model(val) {
      if (val) {
        this.dialog = val
        this.$refs.comments_dialog.open = true
      }
    }
  }
}
</script>
<style lang="less">
@import "../../vendor/variable.less";

.mc-comments-dialog {

  .panel {
    border-radius: 14px !important;
  }

  position: fixed;
  top: 3%;
  z-index: 2001;
  max-width: 750px;
  width: 94%;
  height: 100vh;
  max-height: 94%;

  @media (max-width: @screen-xs-max) {
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    border-radius: 0;
  }

  .mc-comments {
    // height: 100%;
    .item{
      padding: 16px;
      // .content {
      //   padding: 16px;
      // }
      // .actions {
      //   display: flex;
      // }
    }
  }

  .mc-list-header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 60px;
    margin: 0 !important;
    padding: 0 16px;
    border-bottom: 1px solid rgba(0, 0, 0, .12);

    .close {
      display: none;
    }

    button {
      padding-right: 0;
    }

    .mdui-theme-dark & {
      border-bottom-color: #494949
    }

    @media (max-width: @screen-sm-max) {
      height: 56px;
    }

    @media (max-width: @screen-xs-max) {
      padding-left: 8px;

      .close {
        display: inline-block;
        margin-right: 16px;
      }
    }
  }

  .comments-wrapper {
    height: calc(~'100% - 120px');
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    @media (max-width: @screen-sm-max) {
      height: calc(~'100% - 116px');
    }

    .mc-loaded {
      margin-bottom: 24px !important;
    }
  }

  .comments {
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 0;
  }

  .mc-comments>.new-comment {
    // position: absolute;//mdui2不要这个
    // .mdui-theme-dark & {
  }

  .comments>.item,
  // .mc-comments>.item,
  .mc-comments>.new-comment {
    padding-right: 24px;
    padding-left: 24px;

    @media (max-width: @screen-xs-max) {
      padding-right: 16px;
      padding-left: 16px;
    }
  }
}
</style>