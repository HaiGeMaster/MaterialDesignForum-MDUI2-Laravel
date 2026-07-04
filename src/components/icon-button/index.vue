<template>
  

  <mdui-tooltip :content="text" placement="bottom">
    <mdui-button @click.stop.prevent="$emit('icon_button_click')" >
      <mdi-icon slot="icon" :icon="icon"></mdi-icon>
      <span>{{ count }}</span>
    </mdui-button>
  </mdui-tooltip>
</template>
<script>
export default {
  name: 'icon-button',
  props: {
    icon: String,
    text: String,
    count: {
      type: Number,
      default: 0,
    },
    smalls: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    Count(){
      if(this.count > 99){
        return '99+'
      }else if(this.count < 0){
        return '0'
      }else{
        return `${this.count}`
      }
    }
  },
}
</script>
<style lang="less"></style>