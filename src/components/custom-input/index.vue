<template>
  <input
    name="fkname"
    :autocomplete="autocomplete"
    :type="type"
    :class="['rounded-textbox', classes]"
    :placeholder="placeholder"
    :value="model"
    @input="input"
    :style="{
      'border-radius': border_radius,
      width: width,
    }"
    @keydown.enter="model_enter"
  />
</template>
<script>
import { useMainStore } from '@/stores/main'
export default {
  name: 'custom-input',
  props: {
    model: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '搜索',
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    classes: {
      type: String,
      default: '',
    },
    border_radius: {
      type: String,
      default: '100px',
    },
    width: {
      type: String,
      default: '300px',
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
      v_text: '',
      fkname: '',
    }
  },
  methods: {
    input(e) {
      if (!this.mainStore.getDesktop) {
        return
      }
      this.v_text = e.target.value
      this.$emit('model', e.target.value)
    },
    model_enter(e) {
      this.$emit('enter', e.target.value)
    },
  },
  mounted() {
    this.fkname = '88888888888'
  },
}
</script>
<style lang="less" scoped>
.rounded-textbox {
  height: 2.5rem;
  background-color: rgb(var(--mdui-color-surface-container-low));
  border: 1px solid rgb(var(--mdui-color-secondary-container));
  padding: 10px;
  box-sizing: border-box;
}
</style>
