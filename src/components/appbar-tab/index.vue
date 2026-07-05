<template>
  <div class="home">
    <mdui-tabs value="tab-1" full-width v-if="mainStore.getMobile" top variant="primary">
      <mdui-tab value="tab-1">Tab 1</mdui-tab>
      <mdui-tab value="tab-2">Tab 2</mdui-tab>
      <mdui-tab value="tab-3">Tab 3</mdui-tab>

      <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
    </mdui-tabs>
    <mdui-tabs value="tab-1" v-else top variant="primary">
      <mdui-tab value="tab-1">Tab 1</mdui-tab>
      <mdui-tab value="tab-2">Tab 2</mdui-tab>
      <mdui-tab value="tab-3">Tab 3</mdui-tab>

      <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
      <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
    </mdui-tabs>
    <h1>{{ $route.path }}</h1>
    <template v-for="i in 100">
      <br />
      Test {{ i }}
    </template>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'appbar-tab',
  data: () => ({
    mainStore: useMainStore(),
  }),
  components: {},
}
</script>
