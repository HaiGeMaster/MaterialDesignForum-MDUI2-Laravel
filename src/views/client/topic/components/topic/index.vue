<template>
  <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'" class="topic" style="width: 100%;">
    <div class="info" v-if="topic">
      <div class="cover" :style="`background-image: url(${$G_ImgHandle(topic.cover.middle)})`" />
      <div class="main">

        <div class="name">
          {{ topic.name }}
        </div>

        <div class="meta mdui-text-color-theme-secondary">
          <span>
            {{
              $t('Message.Client.Topic.Topic.NQuestions', {
                value: topic.question_count
              })
            }}
          </span>
          <span>
            {{
              $t('Message.Client.Topic.Topic.NArticles', {
                value: topic.article_count
              })
            }}
          </span>
        </div>

        <div class="description mdui-text-color-theme-secondary">
          {{
            topic.description
          }}
        </div>

      </div>
    </div>

    <div class="info" v-else>
      <div class="cover skeleton-background"  style="margin: 0;"/>
      <div class="main">

        <div class="name">
          <div class="skeleton-item" style="margin: 0;width: 90px;"></div>
        </div>

        <div class="meta mdui-text-color-theme-secondary">
            <div class="skeleton-item" style="margin: 0;width: 60px;"></div>
        </div>

        <div class="description mdui-text-color-theme-secondary">
          <div class="skeleton-item" style="margin: 0;width: 160px;"></div>
        </div>

      </div>
    </div>

    <div class="actions" v-if="topic">
      <FollowButton :followable_type="'topic'" :followable_id="topic.topic_id" :is_follow="topic.is_follow" />

      <mdui-chip style="margin-top: 4px;
    margin-left: 8px;" @click="
    $router.push(
      `${$G_UrlHeaderLang()}/users/${topic.user.user_id}`
    )
    ">
        <mdui-avatar slot="icon" :src="$G_ImgHandle(topic.user.avatar.small)" height="24px"></mdui-avatar>
        {{
    topic.user.username
  }}
      </mdui-chip>

      <div class="flex-grow" />
      <OptionsButton type="topic" :item="topic" />
    </div>

    <div class="actions" v-else>
      <div class="skeleton-item-circle" style="margin: 0;"></div>
      <div class="skeleton-item" style="margin: auto auto auto 16px;width: 100px;"></div>
      <div class="flex-grow" />
      <div class="skeleton-item-circle" style="margin: 0;"></div>
    </div>

  </mdui-card>
</template>
<script>

import FollowButton from '@/components/follow-button/index.vue'
import OptionsButton from '@/components/options-button/index.vue'
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  components: {
    FollowButton,
    OptionsButton,
  },
  methods: {
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>