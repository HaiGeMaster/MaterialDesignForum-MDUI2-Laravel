<template>
  <input name="fkname" :autocomplete="autocomplete" :type="type" :class="[
      'rounded-textbox',
      classes
    ]
    " :placeholder="placeholder" :value="model" @input="input" :style="{
    'border-radius': border_radius,
    'width': width
  }" @keydown.enter="model_enter">
</template>
<script>

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
    }
  },
  data() {
    return {
      v_text: '',
      fkname: ''
    }
  },
  methods: {
    input(e) {
      this.v_text = e.target.value
      // console.log(e.target.value)
      // this.$emit('model', e.target.value)

        this.$emit('model', e.target.value)

      // if (this.$store.getters.GetPc) {
      //   this.$emit('model', e.target.value)
      // }

      //   this.$emit('model_enter', e.target.value)
    },
    model_enter(e) {
      // console.log(e.target.value)
      // this.v_text = e.target.value
      // this.$emit('model_enter', e.target.value)
      
      // this.$store.dispatch('FabDialog/Set_SearchFabDialog', {
      //   value: false,
      //   model: 'close',
      // })
    }
  },
  mounted() {
    this.fkname = '88888888888'
  }
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