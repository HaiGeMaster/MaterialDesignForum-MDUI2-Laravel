<template>
  <div id="loading" :style="{
    'margin-bottom': $store.getters.GetScrollValue > 1 && need_margin_bottom
      ?
      (
        $store.getters.GetMobile && need_margin_bottom
          ?
          '176px'
          :
          (need_margin_bottom) ? '120px' : '0px'
      )
      :
      (
        $store.getters.GetMobile && need_margin_bottom
          ?
          '176px'
          :
          (need_margin_bottom) ? '0px' : '0px'
      ),
  }
    ">
    <Empty v-if="show_empty_icon" :show="!loading && empty" />
    <Loaded :show="!loading" />
    <LoadingRing ref="loading_ring" :show="pagination.next != null && (loading || !empty)" />
  </div>
</template>
<script>
import Empty from '@/components/empty/index.vue';
import Loaded from '@/components/loaded/index.vue';
import LoadingRing from '@/components/loading-ring/index.vue';
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
    empty: {
      type: Boolean,
      default: true,
    },
    show_empty_icon: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: () => ({
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }),
    },
    need_margin_bottom: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      init_loading: true,
    }
  },
  components: {
    Empty,
    Loaded,
    LoadingRing,
  },
  mounted() {
    const options = {
      root: null,
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(this.handleIntersection, options);
    observer.observe(this.$refs.loading_ring.$el);


  },
  created() {
    this.$emit('autoload')
  },
  methods: {
    async handleIntersection(entries) {
      this.$forceUpdate()
      const _this = this
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          if (_this.pagination.next == null || _this.loading
          ) {
            return
          }
          _this.$emit('autoload')
        }
      });
    },
  },
  watch: {
    loading(val) {
    },
    pagination(val) {
    },
  }
}
</script>