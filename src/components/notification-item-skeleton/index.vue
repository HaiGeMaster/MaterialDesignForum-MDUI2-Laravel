<template>
  <mdui-card
    :variant="mainStore.getIsDark ? 'filled' : 'elevated'"
    style="width: 100%"
    class="skeleton-background"
  >
    <mdui-list-item nonclickable headline-line="1" description-line="2">
      <div class="skeleton-item-circle" slot="icon" style="margin: 0"></div>
      <div class="skeleton-item" style="width: 25%; margin-bottom: 4px; height: 20px"></div>
      <div slot="description">
        <span>
          <p>
            <span>
              <div class="skeleton-item" style="width: 50%; margin: 0; height: 16px"></div>
            </span>
          </p>
          <p>
            <span>
              <div class="skeleton-item" style="width: 50%; margin: 0; height: 16px"></div>
            </span>
          </p>
        </span>
      </div>
      <div
        class="skeleton-item"
        style="width: 100px; margin: 0; height: 40px"
        slot="end-icon"
      ></div>
    </mdui-list-item>
  </mdui-card>
</template>
<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'notification-item-skeleton',
  data: () => ({
    mainStore: useMainStore(),
  }),
}
</script>
