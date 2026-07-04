<template>
  <mdui-dropdown ref="colordn">
    <mdui-button-icon slot="trigger" @click="colordn.open = !colordn.open"
      :style="{ 'width': model == 'maximize' ? '40px' : '28px', 'height': model == 'maximize' ? '40px' : '28px', }"
      :title="$t('Message.Components.Editor.Color')">
      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.Color')">
        <mdi-icon icon="mdi-palette-outline" />
        <!-- <mdi-icon icon="mdi-invert-colors" /> -->
      </mdui-tooltip>
    </mdui-button-icon>
    <mdui-menu>
      <!-- <label for="colorPicker">{{ $t('Message.Components.Editor.Color') }}</label>
      <input type="color" id="colorPicker" ref="colorPicker" v-model="selectedColor"> -->
      <mdui-menu-item>
        <mdi-icon icon="mdi-invert-colors" slot="icon"/>
        <!-- 选择颜色 -->
        <input type="color" id="colorPicker" ref="colorPicker" v-model="selectedColor">
      </mdui-menu-item>
      <mdui-menu-item @click="$emit('clear')">
        <mdi-icon icon="mdi-invert-colors-off" slot="icon"/>
        {{ $t('Message.Components.Editor.ClearColor') }}
      </mdui-menu-item>
    </mdui-menu>
  </mdui-dropdown>
</template>
<script>
export default {
  props: {
    model: {
      type: String,
      default: 'maximize',
    },
  },
  data: () => ({
    selectedColor: '#FF00FF', // Default color value
  }),
  watch: {
    selectedColor(newColor) {
      console.log('Selected color:', newColor);
      this.$emit('color', newColor);
    },
  },
}
</script>