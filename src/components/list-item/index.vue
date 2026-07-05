<template>
  <!-- style="min-height: 60px;" -->
  <mdui-list-item
    class="list-item"
    style="min-height: 60px"
    headline-line="1"
    description-line="1"
    :headline="title"
    :description="
      mainStore.getMobile ? `${action_subtitle}  ${action_time}` : `${subtitle ? subtitle : ''}`
    "
    @mouseover="mouseover = true"
    @mouseleave="mouseover = false"
    @click="$router.push(to)"
    :class="{ 'mdui-list-item--no-padding': no_padding }"
    :nonclickable="nonclickable"
  >
    <UserPopover slot="icon" :user="UserPopoverUser" />
    <div slot="end-icon" v-if="!mainStore.getMobile">
      {{ mouseover ? `${action_time}` : '' }}

      <br v-if="mouseover" />
      <br v-if="mouseover" />
      <br v-if="mouseover" />

      {{ action_subtitle }}
    </div>
  </mdui-list-item>
</template>
<script>
import { useMainStore } from '@/stores/main'
import UserPopover from '@/components/user-popover/index.vue'
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'title',
    },
    subtitle: {
      type: String,
      default: 'subtitle',
    },
    action_time: {
      type: String,
      default: '2024-5-9',
    },
    action_subtitle: {
      type: String,
      default: 'action_subtitle',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'questions',
    },
    to: {
      type: String,
      default: '/',
    },

    no_padding: {
      type: Boolean,
      default: false,
    },
    nonclickable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UserPopover,
  },
  data: () => ({
    mainStore: useMainStore(),
    mouseover: false,
  }),
  computed: {
    UserPopoverUser() {
      return this.type == 'users' ? this.item : this.item.user
    },
  },
}
</script>

<style lang="less">
@import './index.less';
</style>
