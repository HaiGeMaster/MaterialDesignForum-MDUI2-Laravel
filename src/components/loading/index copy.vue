<template>
  <div
    id="loading"
    :style="{
      'margin-bottom':
        mainStore.getScrollValue != 0 && need_margin_bottom
          ? mainStore.getMobile && need_margin_bottom
            ? '176px'
            : need_margin_bottom
              ? '120px'
              : '0px'
          : mainStore.getMobile && need_margin_bottom
            ? '176px'
            : need_margin_bottom
              ? '0px'
              : '0px',
    }"
  >
    <Loaded v-if="show_text" :show="!loading" />
    <LoadingRing v-if="show_ring" :show="loading" />
  </div>
</template>
<script>
import { useMainStore } from '@/stores/main'
import Loaded from '@/components/loaded/index.vue'
import LoadingRing from '@/components/loading-ring/index.vue'
export default {
  name: 'loading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    show_text: {
      type: Boolean,
      default: true,
    },
    show_ring: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: null,
    },
    pagination: {
      type: Object,
      default: null,
    },
    need_margin_bottom: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
    }
  },
  components: {
    Loaded,
    LoadingRing,
  },
  mounted() {
    const options = {
      root: null,
      threshold: 0.5,
    }
    const observer = new IntersectionObserver(this.handleIntersection, options)
    observer.observe(this.$el)
  },
  methods: {
    async handleIntersection(entries) {
      this.$forceUpdate()
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if (this.pagination == null || this.pagination.next == null || this.loading) {
            return
          }
          this.$emit('autoload')
        }
      })
    },
  },
  watch: {
    loading(val) {},
    pagination(val) {},
  },
}
</script>
