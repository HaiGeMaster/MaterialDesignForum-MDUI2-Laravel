<template>
  
  <mdui-text-field v-show="show" :label="label || $t('Message.Components.Account.Password')" :value="value" type="password"
      @input="value = $event.target.value"
      name="password">
    </mdui-text-field>
</template>
<script>
export default {
  name: "common-account-field-password",
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
    showt: false,
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
