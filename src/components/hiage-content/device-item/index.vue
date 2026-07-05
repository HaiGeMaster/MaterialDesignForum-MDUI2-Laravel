<template>
  <div class="mc-device-item item-inner">
    <mdui-card
      :variant="mainStore.getDark ? 'filled' : 'elevated'"
      class="item"
      clickable
      :title="title"
    >
      <!-- variant="outlined" -->
      <mdui-card
        class="mdui-ripple info"
        style="background-size: cover; background-position: center; background-repeat: no-repeat"
        :style="{
          backgroundImage: `url('${$G_ImgHandle(image)}')`,
        }"
        @click=""
        :href="href"
        :target="href ? '_blank' : ''"
      >
        <div class="name mdui-text-color-theme-text"></div>
      </mdui-card>

      <div class="actions">
        <!-- {{ summaryText(title) }} -->
        <!-- <mdui-list> -->
        <!-- <mdui-list-item headline="Headline"></mdui-list-item> -->
        <mdui-list-item
          style="width: 100%"
          :headline="`￥${price}`"
          :description="summaryText(title)"
        ></mdui-list-item>
        <!-- </mdui-list> -->
      </div>
    </mdui-card>
  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'device-item-item',
  props: {
    image: {
      type: String,
      default: 'https://vitejs.cn/vite3-cn/logo.svg',
    },
    title: {
      type: String,
      default: 'title',
    },
    href: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    mainStore: useMainStore(),
  }),
  methods: {
    summaryText(text) {
      return text.length > 20 ? text.slice(0, 20) + '...' : text
    },
  },
}
</script>
<style lang="less">
@import './index.less';
</style>
