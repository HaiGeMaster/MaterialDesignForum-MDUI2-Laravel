
<template>

  <mdui-list-item @click="$router.push(to)">
    {{ text }}
    <mdi-icon slot="end-icon" :icon="icon" />
  </mdui-list-item>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Text',
    },
    icon: {
      type: String,
      default: 'mdi-arrow-right',
    },
    icon_color: {
      type: String,
      default: 'primary',
    },
    to: {
      type: String,
      default: '/topics',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>