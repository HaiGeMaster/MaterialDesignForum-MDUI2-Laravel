
<template>
  <div class="mc-topic-item item-inner" :key="topic.topic_id">
    <mdui-card :variant="$store.getters.GetDark?'filled':'elevated'" 
    class="item" clickable 
    @click="$router.push(`${$G_UrlHeaderLang()}/topics/${topic.topic_id}`)"
    :style="{
      backgroundImage: `url('${$G_ImgHandle(topic.cover.middle)}')`,
    }">
      <div class="mdui-ripple info">
        <div class="name mdui-text-color-theme-text">
          {{ summaryText(topic.name) }}
        </div>
      </div>
      <div class="actions">
        <FollowButton
          :followable_type="'topic'"
          :followable_id="topic.topic_id"
          :is_follow="topic.is_follow"
        />
        <mdui-button class="followers" variant="standard"
        @click.prevent.stop="
          $store.dispatch('Dialog/Set_UsersDialog', {
            id: topic.topic_id,
            type: 'topic',
            modes: 'followers',
            model: true,
          })
        "
        >
          {{ 
            $t('Message.Components.TpoicItem.Followers', {
              value: topic.follower_count,
            })
          }}
        </mdui-button>
      </div>
    </mdui-card>
  </div>
</template>
<script>
import FollowButton from '@/components/follow-button/index.vue';
export default {
  name: 'topic-item',
  props: {
    topic: {
      type: Object,
      default: () => ({
        topic_id: 0,
        name: 'topic',
        cover: {
          small: 'https://vitejs.cn/vite3-cn/logo.svg',
        },
        follower_count: 0,
      }),
    },
    type: String,
    actions: Object,
  },
      //     return text.length > 20 ? text.slice(0, 20) + '...' : text;
            components: {
    FollowButton,
  },
  methods: {
    summaryText(text) {
      return text.length > 20 ? text.slice(0, 20) + '...' : text;
    },
  },
};
</script>
<style lang="less">
@import './index.less';
</style>