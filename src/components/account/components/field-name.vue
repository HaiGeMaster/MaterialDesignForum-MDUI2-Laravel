<template>
  
  <mdui-text-field v-show="show" :label="label || $t('Message.Components.Account.EMail')" :value="value"
      @input="value = $event.target.value"
      name="username"
      >
    </mdui-text-field>
</template>
<script>
export default {
  name: "common-account-field-name",
  props:{
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    value: "",
  }),
  watch: {
    value(val) {
      const v = val.toString()
      this.$emit("cinput", v);
    },
  }
}
</script>
<style></style>