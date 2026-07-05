<template>
  <mdui-dialog
    close-on-overlay-click
    @close="vmodel = false"
    style="margin: auto"
    ref="report_dialog"
    :headline="$t('Message.Components.OptionsButton.Report')"
    :description="report_preview_text"
  >
    <mdui-button-icon @click="vmodel = false" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>

    <div>
      <!-- <code style="margin: auto;">{{ report_preview_text }}</code> -->
      <mdui-card :style="!mainStore.getMobile ? 'min-width: 450px;' : 'width:100%;'">
        <!-- <mdui-card style="width:100px;"> -->
        <!-- <mdui-card > -->
        <mdui-radio-group :value="radio_group">
          <template v-for="n in radio_group_item">
            <br />
            <mdui-radio :value="n.value" @click="radio_group = n.value">{{
              $t(n.text)
            }}</mdui-radio>
          </template>
        </mdui-radio-group>
        <mdui-text-field
          :value="other_reasons"
          @input="other_reasons = $event.target.value"
          style="padding: 8px"
          v-if="radio_group == 'Message.Components.OptionsButton.OtherReasons'"
          :label="$t('Message.Components.OptionsButton.OtherReasons')"
        ></mdui-text-field>
      </mdui-card>
    </div>

    <mdui-button slot="action" variant="text" @click="vmodel = false">
      {{ $t('Message.Components.OptionsButton.Cancel') }}
    </mdui-button>
    <mdui-button slot="action" variant="tonal" @click="AddReport()">
      {{ $t('Message.Components.OptionsButton.Submit') }}
    </mdui-button>
  </mdui-dialog>
</template>
<script>
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { useDialogStore } from '@/stores/dialog'
import { useSnackbarStore } from '@/stores/snackbar'
import { AddReport } from '@/api/global'
export default {
  name: 'report-dialog',
  components: {
    // Confirm,
  },
  props: {
    model: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: '',
    },
    report_preview_text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mainStore: useMainStore(),
      userStore: useUserStore(),
      dialogStore: useDialogStore(),
      snackbarStore: useSnackbarStore(),
      vmodel: false,
      radio_group: null,
      radio_group_item: [
        {
          text: 'Message.Components.OptionsButton.GarbageAdvertisingInformation',
          value: 'Message.Components.OptionsButton.GarbageAdvertisingInformation',
        },
        {
          text: 'Message.Components.OptionsButton.UnfriendlyBehavior',
          value: 'Message.Components.OptionsButton.UnfriendlyBehavior',
        },
        {
          text: 'Message.Components.OptionsButton.HarmfulInformation',
          value: 'Message.Components.OptionsButton.HarmfulInformation',
        },
        {
          text: 'Message.Components.OptionsButton.SuspectedInfringement',
          value: 'Message.Components.OptionsButton.SuspectedInfringement',
        },
        {
          text: 'Message.Components.OptionsButton.InducingApprovalAndAttention',
          value: 'Message.Components.OptionsButton.InducingApprovalAndAttention',
        },
        {
          text: 'Message.Components.OptionsButton.OtherReasons',
          value: 'Message.Components.OptionsButton.OtherReasons',
        },
      ],
      other_reasons: '',
    }
  },
  methods: {
    AddReport() {
      if (!this.userStore.getIsLogin) {
        this.dialogStore.setLoginDialog(true)
        this.snackbarStore.addMessage({
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      this.StartAddReport()
    },
    async StartAddReport() {
      var user_token = this.$G_GetUserToken()
      var reportable_id =
        this.type == 'topic'
          ? this.item.topic_id
          : this.type == 'question'
            ? this.item.question_id
            : this.type == 'article'
              ? this.item.article_id
              : this.type == 'answer'
                ? this.item.answer_id
                : this.type == 'comment'
                  ? this.item.comment_id
                  : this.type == 'reply'
                    ? this.item.reply_id
                    : this.type == 'user'
                      ? this.item.user_id
                      : 0
      const response = await AddReport({
        user_token: user_token,
        reportable_type: this.type,
        reportable_id: reportable_id,
        reason: this.other_reasons || this.radio_group,
      })
      if (response.data.is_add == true) {
        this.vmodel = false
      } else {
      }
    },
  },
  watch: {
    model(val) {
      if (val == true) {
        this.$refs.report_dialog.open = true
        this.vmodel = val
      }
    },
    vmodel(val) {
      if (val == false) {
        this.$refs.report_dialog.open = false
        this.$emit('model', val)
      }
    },
    radio_group(val) {
      console.log(val)
    },
  },
}
</script>
