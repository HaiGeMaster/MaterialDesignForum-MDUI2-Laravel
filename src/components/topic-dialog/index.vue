<template>
  <mdui-dialog
    close-on-overlay-click
    :fullscreen="$store.getters.GetBreakpoint == 'xs'"
    ref="topics_dialog"
    @close="vmodel = false"
    class="topics-dialog"
    style="margin: auto"
    :headline="$t('Message.Components.TopicsDialog.NewTopic')"
    :description="$t('Message.Components.TopicsDialog.TopicImage')"
  >
    <mdui-button-icon slot="icon" class="close" @click="vmodel = !vmodel">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>
    <div :style="!$store.getters.GetMobile ? 'min-width: 500px;' : ''">
      <form ref="form">
        <div class="cover-wrapper" @click="handleFileSelect()">
          <div class="content">
            <img
              v-show="TopicCover != ''"
              :src="TopicCover"
              id="topic_dialog_preview_image"
              ref="topic_dialog_preview_image"
            />
            <div
              class="placeholder"
              :title="$t('Message.Components.TopicsDialog.ClickToUploadTopicImage')"
              @click=""
            >
              <mdi-icon icon="mdi-camera" />
            </div>
          </div>
        </div>
        <br />
        <br />

        <mdui-text-field
          :label="$t('Message.Components.TopicsDialog.TopicName')"
          :value="TopicTitle"
          @input="TopicTitle = $event.target.value"
          maxlength="20"
        ></mdui-text-field>
        <br />
        <br />

        <mdui-text-field
          :label="$t('Message.Components.TopicsDialog.TopicDescription')"
          :value="TopicDescription"
          @input="TopicDescription = $event.target.value"
          maxlength="1000"
          autosize
          min-rows="2"
          max-rows="5"
        ></mdui-text-field>
        <br />
        <br />
      </form>
    </div>

    <mdui-button slot="action" variant="tonal" @click="vmodel = !vmodel" :disabled="is_loading">
      {{ $t('Message.Components.OptionsButton.Cancel') }}
    </mdui-button>
    <mdui-button
      slot="action"
      @click="OnSubmit"
      :loading="is_loading"
      :disabled="TopicTitle == '' || TopicDescription == '' || TopicCover == ''"
    >
      {{ $t('Message.Components.OptionsButton.Submit') }}
    </mdui-button>
  </mdui-dialog>
</template>
<script>
import { AddTopic, EditTopic } from '@/api/global.js'
export default {
  name: 'topics-dialog',
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'new',
    },
    edit_topic: {
      type: Object,
      default: null,
    },
  },
  components: {},
  data: () => ({
    vmodel: false,
    TopicTitle: '',
    TopicDescription: '',
    TopicCover: '',
    is_loading: false,

    has_new_cover: false,
  }),
  methods: {
    //   const file = e.target.files[0];
    //       this.TopicCover = event.target.result;
    handleFileSelect() {
      this.has_new_cover = true // const fileInput = this.$refs.topic_dialog_input
      const fileInput = document.createElement('input')
      fileInput.type = 'file'
      // fileInput.accept = 'image/png';
      // 支持png,jpg,jpeg,gif图片格式
      // fileInput.accept = 'image/png,image/jpg,image/jpeg,image/gif';
      fileInput.accept = 'image/png,image/jpg,image/jpeg'
      fileInput.style.display = 'none'
      document.body.appendChild(fileInput)

      const previewImg = this.$refs.topic_dialog_preview_image
      const _this = this
      fileInput.onchange = function (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = function (event) {
          previewImg.src = event.target.result
          _this.TopicCover = event.target.result
          _this.$forceUpdate()
        }
        reader.readAsDataURL(file)
      }
      fileInput.click()
    },
    async OnSubmit() {
      // if (this.$refs.form.validate()) {
      if (this.TopicTitle != '' && this.TopicDescription != '' && this.TopicCover != '') {
        this.is_loading = true
        if (this.mode == 'new') {
          const response = await AddTopic({
            name: this.TopicTitle,
            description: this.TopicDescription,
            cover: this.$refs.topic_dialog_preview_image.src,
            user_token: this.$G_GetUserToken(),
          })
          if (response.data.is_add == true) {
            this.$emit('add_topic', response.data.topic)
            this.is_loading = false
            this.vmodel = false
          } else {
            this.is_loading = false
          }
        } else if (this.mode == 'edit') {
          // console.log(this.TopicTitle)
          // return
          const img_cover_src = this.$refs.topic_dialog_preview_image.src
          const response = await EditTopic({
            topic_id: this.edit_topic.topic_id,
            name: this.TopicTitle,
            description: this.TopicDescription,
            cover: img_cover_src.indexOf('covers') != -1 ? '' : img_cover_src,
            // cover: this.TopicCover.indexOf('covers') != -1 ? '' : this.$refs.topic_dialog_preview_image.src,
            // cover:this.has_new_cover?this.$refs.topic_dialog_preview_image.src:'',
            user_token: this.$G_GetUserToken(),
          })
          if (response.data.is_edit == true) {
            this.$emit('edit_topic', response.data.topic)
            this.has_new_cover = false
            this.is_loading = false
            this.vmodel = false
          } else {
            this.is_loading = false
          }
          this.has_new_cover = false
        }
      }
    },
  },
  watch: {
    model(val) {
      if (val == true) {
        this.vmodel = true
        this.$refs.topics_dialog.open = true
      }
    },
    vmodel(val) {
      if (val == false) {
        this.TopicTitle = ''
        this.TopicDescription = ''
        this.TopicCover = ''
        this.$refs.topics_dialog.open = false
        this.$emit('model', false)
      }
    },
    edit_topic: {
      handler(val) {
        if (val != null) {
          this.TopicTitle = val.name
          this.TopicDescription = val.description
          this.TopicCover = this.$G_ImgHandle(val.cover.original)
        }
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
<style lang="less">
@import '../../vendor/variable.less';

.cover-wrapper {
  margin-top: 4px;

  .title {
    padding-bottom: 8px;
    font-size: 16px;
    transform: scale(0.75) translateY(0);
    transform-origin: left;
  }

  .content {
    position: relative;
    width: 100%;
    padding-bottom: 56%;

    .v-image__image,
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }

    .placeholder {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(134, 134, 134, 0.42);
      border-radius: 8px;
      cursor: pointer;
      transition:
        border,
        box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      i {
        padding: 12px;
        color: #fff;
        font-size: 36px;
        background-color: rgba(0, 0, 0, 0.26);
        border-radius: 50%;
        transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
      }

      &.selected i {
        color: #fff !important;
        background-color: rgba(0, 0, 0, 0.26) !important;
      }

      &:hover {
        border-color: rgba(136, 136, 136, 0.87);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.87);
      }

      .mdui-theme-dark & {
        border-color: rgba(255, 255, 255, 0.7);

        i {
          color: rgba(255, 255, 255, 0.56);
          background-color: rgba(255, 255, 255, 0.26);
        }

        &:hover {
          border-color: #fff;
          box-shadow: 0 0 0 1px #fff;

          i {
            color: #fff;
          }
        }
      }
    }
  }

  .error {
    height: 28px;
    color: rgba(255, 23, 68, 0.87);
    font-size: 12px;
    line-height: 28px;
  }

  &.invalid {
    .title {
      color: #ff1744 !important;
    }

    .placeholder {
      border-color: #ff1744 !important;
      box-shadow: 0 0 0 1px #ff1744 !important;
    }
  }
}
</style>
