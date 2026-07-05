<template>
  <div class="item-inner">
    <mdui-card
      :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
      class="item skeleton-background"
      style="width: 100%"
    >
      <div class="mdui-ripple info">
        <div class="avatar">
          <div
            class="skeleton-item-circle"
            slot="icon"
            style="margin: 0; width: 100%; height: 100%"
          ></div>
        </div>
        <div class="username">
          <div class="skeleton-item" style="margin: auto; width: 30%"></div>
        </div>
        <div class="headline">
          <div class="skeleton-item" style="margin: auto; width: 50%"></div>
        </div>
      </div>
      <div class="actions">
        <div class="skeleton-item-circle" slot="icon" style="margin: 0"></div>
        <div class="flex-grow" />
        <div class="skeleton-item-circle" slot="icon" style="margin: 0"></div>
      </div>
    </mdui-card>
  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'user-item-skeleton',
  data: () => ({
    mainStore: useMainStore(),
  }),
}
</script>
<style lang="less">
@import '../user-item/index.less';
</style>
