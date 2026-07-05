<template>
  <div class="mc-topic-item item-inner">
    <mdui-card :variant="mainStore.getIsDark ? 'filled' : 'elevated'" class="item">
      <div class="skeleton-background" style="height: 135px"></div>
      <div class="mdui-ripple info" style="padding: 0">
        <div class="name mdui-text-color-theme-text">
          <div
            class="skeleton-item"
            style="width: 50%; right: 0; height: 20px; margin: 0 0 0 8px"
          ></div>
        </div>
      </div>
      <div class="actions">
        <div class="skeleton-item-circle" style="margin: 0"></div>
        <div
          class="skeleton-item"
          style="width: 50%; right: 12px; height: 24px; margin: 8px 0 0 0"
        ></div>
      </div>
    </mdui-card>
  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'topic-item-skeleton',
  data: () => ({
    mainStore: useMainStore(),
  }),
}
</script>
<style lang="less">
@import '../topic-item/index.less';
</style>
