<template>
  <div class='mc-empty' key="mc-empty" v-show="show">
    <div class="title">{{
    title ? title : $t('Message.Components.Empty.Title')
  }}</div>
    <div class="description">{{
      description ? description : $t('Message.Components.Empty.Description')
    }}</div>
    
    <mdui-button @click="$emit('on_click')" v-show="action_show">{{
    action_text ? action_text : $t('Message.Components.Empty.BackHome')
  }}</mdui-button>
  </div>
</template>
<script>
export default {
  name: 'empty',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    action_text: {
      type: String,
      default: '',
    },
    action_show: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
  }),
  created() {
  },
}
</script>
<style lang="less">
.mc-empty {
  animation: fadeIn 2s forwards !important; /* 添加淡入效果 */

  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  margin-top: 50px;
  padding: 108px 16px 64px;
  text-align: center;
  background-image: url("./following_empty.png");
  background-repeat: no-repeat;
  background-position: center top;

  .title {
    margin-bottom: 20px;
        font-size: 18px;

    .mdui-theme-dark & {
      color: rgba(255, 255, 255, .87);
    }
  }

  .description {
    margin-bottom: 20px;
        font-size: 15px;
    line-height: 24px;

    .mdui-theme-dark & {
          }
  }
}
</style>