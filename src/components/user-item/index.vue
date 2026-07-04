
<template>
  <div class="item-inner">
    <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'"
      @click.stop="$router.push($G_UrlHeaderLang() + `/users/${user.user_id}`)" clickable class="item"
      style="width: 100%;">
      <div class="mdui-ripple info">
        <div class="avatar" :style="`background-image: url(${$G_ImgHandle(user.avatar.large)});`" >
          
          <mdui-badge 
          v-show="user.user_group.user_group_icon_show || false" 
          :style="`background-color: ${user.user_group.user_group_color || ''};`" 
          style="
            margin-left: 80%;
          ">
            <span :class="`mdi ${user.user_group.user_group_icon || 'mdi-bell'}`" style="height: 5px;"></span>
          </mdui-badge>
        </div>
        <div class="username">
          {{ user.username }}
        </div>
        <div class="headline">
          {{ user.headline }}
        </div>
      </div>

      <div class="actions">
        <FollowButton :show="user.user_id != $G_GetUserID()" :followable_type="'user'" :followable_id="user.user_id"
          :is_follow="user.is_follow" />
        <div class="flex-grow" />
        <OptionsButton v-if="user != null" type="user" :item="user" />
      </div>
    </mdui-card>
  </div>
</template>
<script>
import FollowButton from '@/components/follow-button/index.vue';
import OptionsButton from '@/components/options-button/index.vue';
export default {
  name: 'user-item',
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  components: {
    FollowButton,
    OptionsButton,
  },
}
</script>
<style lang="less">
@import "./index.less";
</style>