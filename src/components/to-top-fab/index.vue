<template>

  <!-- :style="{ 'bottom': $store.getters.GetMobile ? '96px' : '16px' }"  -->

  <mdui-tooltip :content="$t('Message.Components.ToTopButton.ToTop')">
    <<mdui-fab 
  class="fade-anm" v-show="$store.getters.GetScrollValue > 1" @click.prevent.stop="ToTop" :style="{
    'bottom': HandleBottom,
  }
    " style="right:20px;position: absolute;">
      <mdi-icon slot="icon" icon="mdi-chevron-up" />
      </mdui-fab>
  </mdui-tooltip>
</template>
<script>
export default {
  data: () => ({
    WindowWidth: ''
  }),
  methods: {
    ToTop() {

      const layout_main = document.querySelector('.layout-main')
      if (layout_main) {
        layout_main.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
  },
  computed: {
    HandleBottom() {
      if (this.$store.getters.GetMobile) {
        if (this.$store.getters.GetScrollMode == 'up' &&
          (this.$route.name == 'article' || this.$route.name == 'lang-article')
        ) {
          return '188px'
        }
        return '96px'
      } else {
        if (this.$store.getters.GetScrollMode == 'up' &&
          (this.$route.name == 'article' || this.$route.name == 'lang-article') &&
          (this.WindowWidth < 1150 && this.WindowWidth > 600)
        ) {
          var bottom_min = 16
          var bottom_max = 86
          var window_width_min = 1000
          var a = (bottom_max - (bottom_max - bottom_min) * (this.WindowWidth - window_width_min) / 150)
          if (a > bottom_max) {
            return '96px'
          }
          // console.log(a)
          return a + 'px'
        } else if (this.WindowWidth < 600) {
          return '16px'
        } else{
          return '16px'
        }
      }
    },
  },
  mounted() {
    // this.WindowWidth = window.innerWidth;
    // this.WindowWidth = window.innerWidth;
    const handleResize = () => {
      this.WindowWidth = window.innerWidth;
    };
    this.WindowWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
  }
}
</script>