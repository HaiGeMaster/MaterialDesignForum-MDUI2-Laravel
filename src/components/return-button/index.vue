<template>
  

  <mdui-tooltip :content="only_icon?(text || $t('Message.Components.BackButton.Back')):''
  " placement="bottom">
    <mdui-button 
      @click="$router.go(-1)"
      :style="`${no_margin?'margin:0':'margin: 16px 0;'}`"
      variant="text"
    >
      <mdi-icon slot="icon"
      :icon="icon || 'mdi-arrow-left'"></mdi-icon>

      <!-- {{ !only_icon?(text || $t('Message.Components.BackButton.Back')):'' }} -->
      {{ text || $t('Message.Components.BackButton.Back') }}
    </mdui-button>

    <!-- <mdui-button-icon v-else
      @click="$router.go(-1)"
      :style="`${no_margin?'margin:0':'margin: 16px 0;'}`"
      variant="text"
    >
      <mdi-icon slot="icon"
      :icon="'mdi-arrow-left'" />
    </mdui-button-icon> -->
  </mdui-tooltip>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    only_icon: {
      type: Boolean,
      default: false
    },
    no_margin: {
      type: Boolean,
      default: false
    }
  }
};
</script>