<template>
  <!-- rgb(var(--mdui-color-primary)) -->
  <mdui-list>
    <!-- :headline="
        !is_reply ? user.username : (
          user.username + $t('Message.Components.Comments.Item.Reply') + (reply_user != null ? reply_user.username : '')
        )
      " -->
    <mdui-list-item
      nonclickable
      style="padding-left: 0"
      :class="userStore.getUser.user_id === user.user_id ? 'is_self' : ''"
      :headline="
        !is_reply
          ? user.username
          : user.username +
            $t('Message.Components.Comments.Item.Reply') +
            (reply_user != null ? reply_user.username : '')
      "
      :description="!is_reply ? user.headline : ''"
    >
      <!-- <span slot="headline">
          <span v-if="user != null"
            :class="
              user.user_id==$G_GetUserID()?'primary--text':''
            "
            @click="$router.push(`${$G_UrlHeaderLang()}/users/${user.user_id}`)"
            style="text-decoration:none;cursor: pointer;"
            >{{ user.username }}
          </span>
          <span class="grey--text"> {{ is_reply ? $t('Message.Components.Comments.Item.Reply') : ''  }} </span>
          <span v-if="is_reply && reply_user != null"
            :class="
              reply_user.user_id==$G_GetUserID()?'primary--text':''
            "
            @click="$router.push(`${$G_UrlHeaderLang()}/users/${reply_user.user_id}`)"
            style="text-decoration:none;cursor: pointer;"
            >{{ reply_user.username }}
          </span>
      </span> -->

      <UserPopover slot="icon" :user="user" :small_avatar="small_avatar" :is_reply="is_reply" />

      <span slot="end-icon">
        {{ time }}
      </span>
    </mdui-list-item>
  </mdui-list>
</template>
<script>
import { useUserStore } from '@/stores/user'
import UserPopover from '@/components/user-popover/index.vue'
export default {
  name: 'user-line',
  props: {
    user: {
      type: Object,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
    is_reply: {
      type: Boolean,
      default: false,
    },
    reply_user: {
      type: Object,
      default: null,
    },
    small_avatar: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserPopover,
  },
  data() {
    return {
      userStore: useUserStore(),
      gradientColors: ['#ff0000', '#00ff00'],
      gradientIndex: 0,
    }
  },
}
</script>
<style lang="less" scoped>
// @import "./index.less";
</style>
