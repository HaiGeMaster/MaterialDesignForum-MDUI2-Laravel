<template>
  <mdui-dropdown placement="bottom-end">

    <mdui-button-icon slot="trigger" style="margin-left: 4px;margin-right: 4px;">
      <mdui-avatar :src="$G_ImgHandle($store.getters['User/GetUser'].avatar.small)">
      </mdui-avatar>
    </mdui-button-icon>

    <mdui-card variant="outlined" class="mdui-card-variant-color-border" style="padding: 8px;">
      <mdui-list>
        <mdui-list-item nonclickable :headline="$store.getters['User/GetUser'].username">

          <div slot="description">
            {{ $t('Message.Components.Avatar.UserID') }}{{ $G_GetUserID() }}
            <br />
            {{ $t('Message.Components.Avatar.Mailbox') }}{{ $store.getters['User/GetUser'].email }}
          </div>

          <mdui-avatar slot="icon" style="width: 48px;height: 48px;"
            :src="$G_ImgHandle($store.getters['User/GetUser'].avatar.large)"></mdui-avatar>
          <mdui-button slot="end-icon" variant="outlined"
            @click="$router.push(`${$G_UrlHeaderLang()}/users/${$G_GetUserID()}`)">
            {{ $t('Message.Components.Avatar.PersonalData') }}
          </mdui-button>
        </mdui-list-item>
      </mdui-list>
      <mdui-divider></mdui-divider>
      <div style="display: flex; justify-content: space-between;padding: 8px;">

        <mdui-tooltip placement="bottom"
        v-if="IsTauri && $store.getters['User/GetUser'].user_group.ability_admin_login"
        :content="$t('Message.App.TheCurrentEnvironmentIsUnavailable')"
        >
          <mdui-button variant="filled" 
          >
          <mdi-icon icon="mdi-shield-crown" slot="icon" />
            {{
              is_admin ?
                $t('Message.Components.Avatar.UserPanel') :
                $t('Message.Components.Avatar.ManagementPanel')
            }}
          </mdui-button>
        </mdui-tooltip>

        <mdui-button variant="filled" 
          v-else-if="IsElectron && $store.getters['User/GetUser'].user_group.ability_admin_login"
          @click="is_admin ?
          _OnWindowOpen('window-open-home') :
          _OnWindowOpen('window-open-admin')">
          <mdi-icon icon="mdi-shield-crown" slot="icon" />
          {{
            is_admin ?
              $t('Message.Components.Avatar.UserPanel') :
              $t('Message.Components.Avatar.ManagementPanel')
          }}
        </mdui-button>

        <mdui-button variant="filled"
          v-else-if="IsMobileApp && $store.getters['User/GetUser'].user_group.ability_admin_login"
          :href="`${is_admin ? 'file:///android_asset/index.html' : 'file:///android_asset/admin.html'}`">
          <mdi-icon icon="mdi-shield-crown" slot="icon" />
          {{
            is_admin ?
              $t('Message.Components.Avatar.UserPanel') :
              $t('Message.Components.Avatar.ManagementPanel')
          }}
        </mdui-button>

        <mdui-button variant="filled" :href="`${is_admin ? '/' : '/admin'}`"
          v-else-if="$store.getters['User/GetUser'].user_group.ability_admin_login">
          <mdi-icon icon="mdi-shield-crown" slot="icon" />
          {{
            is_admin ?
              $t('Message.Components.Avatar.UserPanel') :
              $t('Message.Components.Avatar.ManagementPanel')
          }}
        </mdui-button>

        <slot name="action"></slot>

        <mdui-button-icon @click="$router.push(`${$G_UrlHeaderLang()}/settings`)"
          style="margin-right: 4px;margin-left: 4px;">
          <mdi-icon icon="mdi-cog" />
        </mdui-button-icon>

        <div class="flex-grow"></div>
        <mdui-button variant="tonal" @click="OnLogout">
          {{ $t('Message.Components.Avatar.Logout') }}
        </mdui-button>
      </div>
    </mdui-card>

  </mdui-dropdown>
</template>
<script>
import {
  RemoveUserToken,
  IsTauri,
  IsElectron,
  IsMobileApp,
  OnWindowOpen,
} from '@/api/global.js'
export default {
  name: 'avatar',
  props: {
    is_admin: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
  },
  components: {
  },
  computed: {
    IsTauri() {
      return IsTauri()
    },
    IsElectron() {
      return IsElectron()
    },
    IsMobileApp() {
      return IsMobileApp()
    },
  },
  data: () => ({
    ThemeMenu: false,
  }),
  created() {
  },
  methods: {
    _OnWindowOpen(type) {
      OnWindowOpen(type);
    },
    OnLogout() {
      this.$store.dispatch('User/Set_IsLogin', false)
      this.$store.dispatch('User/Set_UserToken', '')
      this.$store.dispatch('User/Set_User', this.$store.getters['User/GetDefaultUser'])
      RemoveUserToken()
    },
    OnAvatarClick() {
      if (this.$route.path != `${this.$G_UrlHeaderLang()}/users/${this.$G_GetUserID()}`) {
        this.$router.push({
          path: `${this.$G_UrlHeaderLang()}/users/${this.$G_GetUserID()}`,
        })
      }
    }
  },
  watch: {
  }
}
</script>
<style lang="less">
#avatar-item {
  .mc-avatar-upload {
    display: none;
  }

  &:hover .mc-avatar-upload {
    display: block;
  }

  .upload-btn {
    display: block;
    width: 48px;
    min-width: 48px;
    height: 48px;
    background-color: rgba(0, 0, 0, .26) !important;
  }
}
</style>