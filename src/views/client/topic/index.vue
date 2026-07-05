<template>
  <div
    id="page-topic"
    :style="{
      padding: mainStore.getMobile ? '0' : '16px',
    }"
  >
    <ReturnButton />
    <Topic :topic="topic" />
    <Contexts :topic="topic" />
  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useUpdateStore } from '@/stores/update'
import ReturnButton from '@/components/return-button/index.vue'
import Topic from './components/topic/index.vue'
import Contexts from './components/contexts/index.vue'
import { GetTopic, Get_G_TOPIC } from '@/api/global.js'
export default {
  name: 'topic',
  components: {
    ReturnButton,
    Topic,
    Contexts,
  },
  data: () => ({
    mainStore: useMainStore(),
    updateStore: useUpdateStore(),
    topic: null,
  }),
  computed: {
    ReturnUpdateGetTopicUpdate() {
      return this.updateStore.getTopicUpdate
    },
  },
  methods: {
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'topic' || val.name == 'lang-topic') {
        this.$G_UpdateWebTitleAndAppbarSubTitle(
          this.$t('Message.Client.Topic.WebSubTitle'),
          this.$t('Message.Client.Topic.WebSubTitle'),
        )
        if (this.topic == null) {
          this.GetTopic()
        } else if (this.topic.topic_id != this.$route.params.topic_id) {
          this.GetTopic()
        }
      }
    },
    async GetTopic() {
      this.topic = null
      const TOPIC = Get_G_TOPIC()
      if (TOPIC !== null) {
        this.topic = TOPIC.topic
        return
      }

      const response = await GetTopic({
        topic_id: this.$route.params.topic_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get) {
        this.topic = response.data.topic
      }
    },
  },
  created() {
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    $route(val) {
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    },
    ReturnUpdateGetTopicUpdate(val) {
      this.topic = val
    },
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
