<template>
  <mdui-snackbar
    ref="snackbar"
    :auto-close-delay="4000"
    @closed="onClosed"
  >
    {{ currentMessage?.text }}
  </mdui-snackbar>
</template>

<script>
import { useSnackbarStore } from '@/stores/snackbar'

export default {
  name: 'Snackbar',
  data() {
    return {
      snackbarStore: useSnackbarStore(),
    }
  },
  computed: {
    currentMessage() {
      return this.snackbarStore.messages[0] ?? null
    },
  },
  watch: {
    'snackbarStore.messages': {
      handler(messages) {
        if (messages.length > 0) {
          this.$nextTick(() => {
            this.$refs.snackbar.open = true
          })
        }
      },
      deep: true,
    },
  },
  methods: {
    onClosed() {
      this.snackbarStore.deleteMessage(0)
    },
  },
}
</script>
