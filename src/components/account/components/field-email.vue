<template>
  
  <mdui-text-field v-show="show" :label="label || $t('Message.Components.Account.EMail')" type="email" :value="value" 
      @input="value = $event.target.value"
      name="mail">
      
    </mdui-text-field>
</template>
<script>
export default {
  name: "common-account-field-email",
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
  methods:{
    test(e){
      console.log(e)
    }
  },
  watch: {
    value(val) {
      const v = val.toString()
      this.$emit("cinput", v);
    },
  }
}
</script>
<style></style>