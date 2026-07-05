<template>
  <mdui-dialog
    :fullscreen="mainStore.getBreakpointName == 'xs'"
    scrollable
    style="overflow: hidden"
    ref="topic_selector_dialog"
    @close="vmodel = !vmodel"
    @overlay-click="vmodel = !vmodel"
    :headline="
      $t('Message.Components.TopicSelectDialog.TopicSelect') + '(' + selector_indexs.length + ')'
    "
  >
    <mdui-button-icon class="close" @click="vmodel = !vmodel" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>

    <mdui-card
      style="overflow: hidden; width: auto"
      :style="!mainStore.getMobile ? 'min-width: 500px;' : 'width:100%;'"
    >
      <br />

      <mdui-text-field
        variant="outlined"
        style="padding-left: 16px; padding-right: 16px"
        :label="$t('Message.Components.Search.Search')"
        :value="search_text"
        @input="search_text = $event.target.value"
      ></mdui-text-field>

      <mdui-list style="overflow: auto">
        <!-- <mdui-list-item v-for="(item, index) in data" :key="item.topic_id" :headline="item.name"
          :description="item.description" :active="selector_indexs.includes(index)"
          @click="selector_indexs.includes(index) ? selector_indexs.splice(selector_indexs.indexOf(index), 1) : selector_indexs.push(index)">

          <mdui-card slot="icon">
            <img :src="$G_ImgHandle(item.cover.middle)" style="max-width: 120px;" />
          </mdui-card>

          <mdui-checkbox slot="end-icon"
          @input="selector_indexs.includes(index) ? selector_indexs.splice(selector_indexs.indexOf(index), 1) : selector_indexs.push(index)"
          :checked="selector_indexs.includes(index)"></mdui-checkbox>

        </mdui-list-item> -->

        <mdui-list-item
          v-for="(item, index) in data"
          :key="item.topic_id"
          :headline="item.name"
          :description="item.description"
          :active="selector_indexs.includes(index)"
          @click="SwitchSelector(index)"
        >
          <mdui-card slot="icon">
            <img :src="$G_ImgHandle(item.cover.middle)" style="max-width: 120px" />
          </mdui-card>

          <mdui-checkbox
            slot="end-icon"
            @input="SwitchSelector(index)"
            :checked="selector_indexs.includes(index)"
          ></mdui-checkbox>
        </mdui-list-item>
      </mdui-list>

      <Loading
        :empty="data == null"
        :loading="is_loading"
        :pagination="pagination"
        :need_margin_bottom="false"
        @autoload="GetTopics"
      />
    </mdui-card>

    <mdui-button slot="action" variant="text" @click="vmodel = false">
      {{ $t('Message.Components.TopicSelectDialog.Cancel') }}
    </mdui-button>
    <mdui-button
      slot="action"
      variant="tonal"
      @click="OnTopicSelectorDialogClose()"
      :disabled="selector_indexs.length == 0"
    >
      {{ $t('Message.Components.TopicSelectDialog.Confirm') }}
    </mdui-button>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import Loading from '@/components/loading/index.vue'
import { GetTopics } from '@/api/global.js'
export default {
  name: 'topic-selector-dialog',
  props: {
    pre_selected_topics: {
      Array,
      default: () => [],
    },
    model: {
      Boolean,
      default: false,
    },
  },
  components: {
    Loading,
  },
  data: () => ({
    mainStore: useMainStore(),
    vmodel: false,
    selector_indexs: [],
    selector_topics: [],
    is_loading: false,
    search_keywords: '',
    search_text: '',
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1,
    },
  }),
  methods: {
    async GetTopics() {
      try {
        this.is_loading = true
        const response = await GetTopics({
          search_keywords: this.search_keywords,
          order: '-update_time',
          following: false,
          page: this.pagination.next,
          user_token: this.$G_GetUserToken(),
        })
        if (response.data.is_get == true) {
          this.data == null
            ? (this.data = response.data.data)
            : this.$G_FilterSameItems('topic_id', this.data, response.data.data)
          this.pagination = response.data.pagination
          if (this.pre_selected_topics.length > 0) {
            for (var i = 0; i < this.pre_selected_topics.length; i++) {
              for (var j = 0; j < this.data.length; j++) {
                if (this.pre_selected_topics[i].topic_id == this.data[j].topic_id) {
                  this.selector_indexs.push(j)
                  break
                }
              }
            }
          }
        }
        this.is_loading = false
      } catch (error) {
        this.is_loading = false
      }
    },
    ResetData() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1,
      }
      this.selector_indexs = []
      this.selector_topics = []
    },
    OnTopicSelectorDialogClose() {
      // this.selector_topics = []
      // for (var i = 0; i < this.selector_indexs.length; i++) {
      //   this.selector_topics.push(this.data[this.selector_indexs[i]])
      // }
      this.vmodel = false
    },
    SwitchSelector(index) {
      if (this.selector_indexs.includes(index)) {
        //如果已选中，则取消选中
        this.selector_indexs.splice(this.selector_indexs.indexOf(index), 1) //
      } else {
        this.selector_indexs.push(index) //
      }
      console.log(this.selector_indexs)
      const val = this.selector_indexs

      this.selector_topics = []
      for (var i = 0; i < val.length; i++) {
        // this.selector_topics.push(this.data[val[i]])
        //去重复复制
        if (!this.selector_topics.includes(this.data[val[i]])) {
          this.selector_topics.push(this.data[val[i]])
        }
      }
      console.log(this.selector_topics)
      // this.$emit('model', false, this.selector_topics)
    },
    // CloseDialog() {
    //   this.$emit('model', false, this.selector_topics)
    //   this.vmodel = false
    // },
  },
  created() {},
  watch: {
    search_text(val) {
      this.search_keywords = val
      this.ResetData()
      this.GetTopics()
    },
    // selector_indexs(val) {
    //   console.log(val)
    //   // return

    //   this.selector_topics = []
    //   for (var i = 0; i < val.length; i++) {
    //     // this.selector_topics.push(this.data[val[i]])
    //     //去重复复制
    //     if (!this.selector_topics.includes(this.data[val[i]])) {
    //       this.selector_topics.push(this.data[val[i]])
    //     }
    //   }
    //   console.log(this.selector_topics)
    //   this.$emit('model', false, this.selector_topics)
    // },
    model(val) {
      if (val) {
        console.log('open')
        this.$refs.topic_selector_dialog.open = true
        this.vmodel = val
      }
    },
    vmodel(val) {
      console.log(this.selector_topics)
      if (!val) {
        console.log('close')
        this.$emit('model', val, this.selector_topics)
        this.$refs.topic_selector_dialog.open = false
      } else {
        this.ResetData()
        this.GetTopics()
      }
    },
  },
}
</script>
<style lang="less">
.mc-topic-selector-dialog {
  max-width: 530px;
  height: 94% !important;
  max-height: 720px !important;

  .dialog-title {
    padding: 16px 24px;
    line-height: 36px;
    font-size: 20px;
  }

  .dialog-content,
  .list {
    padding: 0;
  }

  .list-item {
    padding-right: 24px;
    padding-left: 24px;
  }

  .list-item-avatar {
    overflow: hidden;

    img {
      width: auto;
      margin-left: -16px;
      border-radius: 0;
    }
  }

  .close {
    display: none;
  }

  .selected {
    padding: 0 24px 8px;
    line-height: 1;

    .chip {
      margin-right: 8px;
    }
  }

  @media (max-width: 599px) {
    .dialog-title {
      padding: 10px 8px 10px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);

      .mdui-theme-dark & {
        border-bottom-color: rgba(255, 255, 255, 0.12);
      }
    }

    .selected {
      padding-top: 12px;
    }

    .close {
      display: inline-block;
      margin-right: 16px;
    }
  }
}
</style>
