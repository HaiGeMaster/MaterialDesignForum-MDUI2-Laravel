<template>


  <mdui-dialog close-on-overlay-click :fullscreen="$store.getters.GetMobile" @close="vmodel = false"
    style="margin: auto;" ref="edit_info_dialog" :headline="$t('Message.Components.EditInfoDialog.EditInfo')">
    <mdui-button-icon class="close" @click="vmodel = false" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>

    <div :style="!$store.getters.GetMobile ? 'min-width: 450px;' : ''">
      <mdui-text-field :value="UserName" @input="UserName = $event.target.value"
        :label="$t('Message.Components.EditInfoDialog.UserName')" maxlength="100" counter="100">
      </mdui-text-field>

      <mdui-text-field :value="OneSentenceIntroduction" @input="OneSentenceIntroduction = $event.target.value"
        :label="$t('Message.Components.EditInfoDialog.OneSentenceIntroduction')" maxlength="40" counter="40">
      </mdui-text-field>

      <mdui-text-field :value="PersonalHomepage" @input="PersonalHomepage = $event.target.value"
        :label="$t('Message.Components.EditInfoDialog.PersonalHomepage')" maxlength="40" counter="40">
      </mdui-text-field>

      <mdui-text-field :value="AffiliatedSchoolOrEnterprise" @input="AffiliatedSchoolOrEnterprise = $event.target.value"
        :label="$t('Message.Components.EditInfoDialog.AffiliatedSchoolOrEnterprise')" maxlength="80" counter="80">
      </mdui-text-field>

      <mdui-text-field :value="Location" @input="Location = $event.target.value"
        :label="$t('Message.Components.EditInfoDialog.Location')" maxlength="80" counter="80">
      </mdui-text-field>


      <mdui-text-field autosize min-rows="2" max-rows="5" :value="PersonalIntroduction"
        @input="PersonalIntroduction = $event.target.value"
        :label="$t('Message.Components.EditInfoDialog.PersonalIntroduction')" maxlength="160" counter="160">
      </mdui-text-field>
    </div>


    <mdui-button slot="action" variant="text" @click="vmodel = false">
      {{ $t('Message.Components.OptionsButton.Cancel') }}
    </mdui-button>
    <mdui-button slot="action" variant="tonal" @click="OnSubmitEditInfo()" :loading="is_loading">
      {{ $t('Message.Components.OptionsButton.Submit') }}
    </mdui-button>
  </mdui-dialog>
</template>
<script>

import OptionsButton from '@/components/options-button/index.vue'
import {
  EditInfo,
  GetUserGroups,
} from '@/api/global.js'
export default {
  name: 'edit-info-dialog',
  props: {
    user: {
      type: Object,
      default: null,
    },
    model: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    vmodel: false,
    EMail: '',
    UserName: '',
    UserGroupID: '',
    OneSentenceIntroduction: '',
    PersonalHomepage: '',
    AffiliatedSchoolOrEnterprise: '',
    Location: '',
    PersonalIntroduction: '',
    is_loading: false,
    search_user_group: null,
    search_user_group_value: '',
    search_user_group_data: [],
    search_user_group_is_loading: false,
  }),
  components: {
    OptionsButton,
  },
  watch: {
    user: {
      handler: function (val, oldVal) {
        if (val != null) {
          this.EMail = val.email;
          this.UserName = val.username;
          this.UserGroupID = val.user_group_id;
          this.OneSentenceIntroduction = val.headline;
          this.PersonalHomepage = val.blog;
          this.AffiliatedSchoolOrEnterprise = val.company;
          this.Location = val.location;
          this.PersonalIntroduction = val.bio;
          console.log(val)
        }
      },
      deep: true
    },
    model(val) {
      if (val == true) {
        this.$refs.edit_info_dialog.open = true
        this.vmodel = val
      }
    },
    vmodel(val) {
      if (val == false) {
        this.$refs.edit_info_dialog.open = false
        this.$emit('model', val)
      }
    },
    search_user_group_value(val) {
      this.GetUserGroups()
      console.log(this.UserGroupID)
    }
  },
  methods: {
    async OnSubmitEditInfo() {
      if (this.is_loading) {
        return
      }
      this.is_loading = true;
      // if (this.$refs.form.validate() == false || this.user == null) {
      if (this.EMail == '' ||
        this.UserName == '' ||
        this.UserGroupID == '') {
        this.is_loading = false;
        return
      }
      const response = await EditInfo({
        email: this.EMail,
        username: this.UserName,
        user_group_id: this.UserGroupID,
        headline: this.OneSentenceIntroduction || '',
        blog: this.PersonalHomepage || '',
        company: this.AffiliatedSchoolOrEnterprise || '',
        location: this.Location || '',
        bio: this.PersonalIntroduction || '',
        edit_target_user_id: this.user.user_id,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_edit) {
        this.$emit('edit_user', response.data.user)
        this.vmodel = false
      }
      this.is_loading = false;
    },
    async GetUserGroups() {
      this.search_user_group_is_loading = true
      const response = await GetUserGroups({
        order: '+user_group_id',
        page: 1,
        user_token: this.$G_GetUserToken(),
        search_keywords: this.search_user_group_value || '',
      })
      if (response.data.is_get) {
        // console.log(response.data)
        // response.data.data.map((item) => {
        //   // item.text = item.user_group_name
        //   // item.value = item.user_group_id
        //   this.search_user_group_data.push({

        this.search_user_group_data = []
        this.$forceUpdate()

        for (let i = 0; i < response.data.data.length; i++) {
          this.search_user_group_data.push({
            text: response.data.data[i].user_group_name,
            value: response.data.data[i].user_group_id,
          })
        }
        // console.log(this.search_user_group_data)
        this.$forceUpdate()

        this.search_user_group_is_loading = false
      }
      this.search_user_group_is_loading = false
    },
  },
}
</script>
<style lang="less">
@import '../../../vendor/variable.less';

.edit-info-dialog {
  max-width: 530px;
  height: 94% !important;
  max-height: 720px !important;

  form {
    padding: 0 40px 62px;

    .v-text-field {
      padding-bottom: 28px;
    }
  }

  .dialog-title {
    padding: 16px 24px;
    line-height: 36px;
    font-size: 20px;
  }

  .dialog-content {
    padding: 0;
  }

  .dialog-content {
    padding-bottom: 62px;
  }

  .close {
    display: none;
  }

  @media (max-width: @screen-xs-max) {
    .dialog-title {
      padding: 10px 8px;
      font-size: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);

      .theme-layout-dark & {
        border-bottom-color: rgba(255, 255, 255, .12);
      }
    }

    .list-item {
      padding-right: 16px;
      padding-left: 16px;
    }

    .close {
      display: inline-block;
      margin-right: 16px;
    }
  }
}
</style>
