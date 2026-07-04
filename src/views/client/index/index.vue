<template>
  <div id="page-index" :style="{
    'padding': $store.getters.GetMobile ? '0' : '16px',
  }">

    <!-- <MDT/> -->

    <TextPlay />
    <Carousel/>


    <Header :text="$t('Message.Client.Index.HeaderTitle')" :to="$store.getters['User/GetIsLogin']
        ?
        `${$G_UrlHeaderLang()}/topics#recommended`
        :
        `${$G_UrlHeaderLang()}/topics`
      " />
    <Topics style="padding-top: 8px;" />

    <div class="items-wrapper">
      <Items :title="$t('Message.Client.Index.LatestQuestions')" :type="'questions'" :order="'-update_time'"
        :title_url="`${$G_UrlHeaderLang()}/questions`" />
      <Items :title="$t('Message.Client.Index.RecentlyPopularQuestions')" :type="'questions'" :order="'-vote_count'"
        :title_url="`${$G_UrlHeaderLang()}/questions#popular`" />
    </div>
    <div class="items-wrapper">
      <Items :title="$t('Message.Client.Index.LatestArticles')" :type="'articles'" :order="'-update_time'"
        :title_url="`${$G_UrlHeaderLang()}/articles`" />
      <Items :title="$t('Message.Client.Index.RecentlyPopularArticles')" :type="'articles'" :order="'-vote_count'"
        :title_url="`${$G_UrlHeaderLang()}/articles#popular`" />
    </div>
    <div class="items-wrapper">
      <Items :title="$t('Message.Client.Index.NewlyJoinedPeople')" :type="'users'" :users_type="'recommended'"
        :order="'-create_time'" title_icon="mdi-new-box" title_icon_color="orange" />
      <Items :title="$t('Message.Client.Index.TheMostPopularPerson')" :type="'users'" :users_type="'recommended'"
        :order="'-follower_count'" title_icon="mdi-fire" title_icon_color="red" />
    </div>
    <Loading :show_empty_icon="false" />
  </div>
</template>
<script>
import TextPlay from './components/text-play/index.vue'
import Header from './components/header/index.vue'
import Topics from './components/topics/index.vue'
import Items from './components/items/index.vue'
import Loading from '@/components/loading/index.vue'
// import MDT from '@/components/mdt/index.vue'
import Carousel from '@/components/mdt/carousel.vue'
export default {
  components: {
    TextPlay,
    Header,
    Topics,
    Items,
    Loading,
    // MDT,
    Carousel,
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
    UpdateWebTitleAndAppbarSubTitle(val) {
      if (val.name == 'home' || val.name == 'lang-home') {
        this.$G_UpdateWebTitleAndAppbarSubTitle(
          this.$t('Message.Client.Index.WebSubTitle'),
          this.$t('Message.Client.Index.WebSubTitle')
        )
      }
    }
  },
  created() {
    this.UpdateWebTitleAndAppbarSubTitle(this.$route)
  },
  watch: {
    '$route'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(val)
    },
    '$i18n.locale'(val) {
      this.UpdateWebTitleAndAppbarSubTitle(this.$route)
    }
  },
};
</script>
<style lang="less">
@import "./index.less";

/* ---------------------------------------------------------- */

</style>