<template>
  <!-- :trigger="!$store.getters.GetMobile?'hover':'click'" 由于mdui组件不能正确检测其下拉框里面的内容导致有bug -->
  <mdui-dropdown class="mc-user-popover" v-if="user">



    <div slot="trigger" @click.stop="null">

      <mdui-avatar :src="$G_ImgHandle(user.avatar.middle || '')">

      </mdui-avatar>
      <mdui-badge v-show="user.user_group.user_group_icon_show || false" 
      :style="
      {
        'background-color': user.user_group.user_group_color || '',
        'position': 'absolute',
        'top': '4px',
        'left': '40px',
      }
      "
      >
        <span :class="`mdi ${user.user_group.user_group_icon || 'mdi-bell'}`" style="height: 5px;"></span>
        <!-- <mdi-icon :icon="user.user_group.user_group_icon" span_style="width: 16px;height:16px;" /> -->
      </mdui-badge>

    </div>

    <mdui-menu class="popover" style="background-color: rgba(0, 0, 0, 0);box-shadow: none;">

      <mdui-card variant="outlined" style="width: 300px;" class="mdui-card-variant-color-border">
        <mdui-list-item :headline="user.username" :description="user.headline"
          @click.prevent.stop="$router.push(`${$G_UrlHeaderLang()}/users/${user.user_id}`)">

          <!-- <mdui-avatar slot="icon" :src="$G_ImgHandle(user.avatar.small)">
          </mdui-avatar> -->

          <div slot="icon" @click.stop="null">

            <mdui-avatar :src="$G_ImgHandle(user.avatar.small || '')">

            </mdui-avatar>

            <mdui-badge 
            v-show="user.user_group.user_group_icon_show || false" 
            :style="
            {
              'background-color': user.user_group.user_group_color || '',
              'position': 'absolute',
              'top': '4px',
              'left': '40px',
            }
            ">
              <span :class="`mdi ${user.user_group.user_group_icon || 'mdi-bell'}`" style="height: 5px;"></span>
              <!-- <mdi-icon :icon="user.user_group.user_group_icon" span_style="width: 16px;height:16px;" /> -->
            </mdui-badge>

          </div>


        </mdui-list-item>
        <div class="stats">
          <mdui-segmented-button-group :full-width="true" style="width: 100%;">

            <mdui-segmented-button
              @click.prevent.stop="$router.push(`${$G_UrlHeaderLang()}/users/${user.user_id}#answers`)">{{
                $t('Message.Components.UserPopover.Answer') }} {{ user.answer_count }}</mdui-segmented-button>
            <mdui-segmented-button
              @click.prevent.stop="$router.push(`${$G_UrlHeaderLang()}/users/${user.user_id}#articles`)">{{
                $t('Message.Components.UserPopover.Article') }} {{ user.article_count }}</mdui-segmented-button>
            <mdui-segmented-button @click.prevent.stop="$store.dispatch('Dialog/Set_UsersDialog', {
              id: user.user_id,
              type: 'user',
              modes: 'followers',
              model: true,
            })">{{ $t('Message.Components.UserPopover.Followers') }} {{ user.follower_count }}</mdui-segmented-button>
          </mdui-segmented-button-group>
        </div>
        <div class="bottom">
          <FollowButton :followable_type="'user'" :followable_id="user.user_id" :is_follow="user.is_follow"
            :show="user.user_id != $G_GetUserID()" />
          <div class="flex-grow" />
          <OptionsButton type="user" :item="user" />
        </div>
      </mdui-card>
    </mdui-menu>
  </mdui-dropdown>

</template>
<script>
import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
  },
  components: {
    FollowButton,
    OptionsButton,
  },
  data: () => ({
    user_popover: false,
  }),
};
</script>
<style lang="less">
@import "./index.less";

// .user-popover-badge {
//   position: absolute;
//   top: 4px;
//   left: 40px;
// }
</style>