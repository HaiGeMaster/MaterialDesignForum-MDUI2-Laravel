<template>
  <mdui-snackbar ref="snackbar" :auto-close-delay="$store.getters['Snackbar/GetTimeout']" class="snackbar-close-delay"
    @closed.self="vmodel = false">
    {{ $store.getters['Snackbar/GetText'] }}
    <mdui-button slot="action" variant="text" v-if="$store.getters['Snackbar/GetTimeout'] === 0">
      {{ $t('Message.Components.Snackbar.Close') }}
    </mdui-button>
  </mdui-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  data() {
    return {
      vmodel: false,
    }
  },
  computed: {
    ReturnStoreModel() {
      return this.$store.getters['Snackbar/GetModel']
    }
  },
  watch: {
    ReturnStoreModel(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.vmodel = newVal
      // if (newVal) {
      this.$refs.snackbar.open = newVal
      // }
    },
    vmodel(newVal, oldVal) {
      if (!newVal) {
        console.log(newVal, oldVal)
        this.$store.dispatch('Snackbar/Hide_Snackbar')
      }
    }
  }
}
</script>