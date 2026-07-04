<template>
  <mdui-dialog close-on-overlay-click :fullscreen="$store.getters.GetMobile" ref="users_dialog" @close="vmodel = false"
    style="margin: auto;"
    :headline="modes == 'followers' ? $t('Message.Components.UsersDialog.FollowersN', { value: pagination.total }) : $t('Message.Components.UsersDialog.FolloweesN', { value: pagination.total })">

    <mdui-button-icon class="close" @click="vmodel = !vmodel" slot="icon">
      <mdi-icon icon="mdi-close" />
    </mdui-button-icon>

    <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'" 
      :style="!$store.getters.GetMobile ? 'min-width: 500px;' : 'width:100%;'" style="overflow-x: hidden;">
      <mdui-list :style="!$store.getters.GetMobile ? 'min-width: 480px;' : ''">
        <mdui-list-item v-for="(user,index) in data" 
          :key="index" 
          @click="GoUserID(user.user_id)"
          :headline="user.username"
          >
          <!-- @click="GoUserID()$router.push(`${$G_UrlHeaderLang()}/users/${user.user_id}`)" -->
          <mdui-avatar slot="icon" :src="$G_ImgHandle(user.avatar.small)"></mdui-avatar>
          <Follow slot="end-icon" v-if="$store.getters['User/GetUser'].user_id != user.user_id"
            :followable_id="user.user_id" followable_type="user" :is_follow="user.is_follow" />
        </mdui-list-item>
      </mdui-list>

      <Loading :empty="!data==null" :need_margin_bottom="false" :loading="is_loading" :pagination="pagination"
        @autoload="GetFollows" />
    </mdui-card>
    
  </mdui-dialog>
</template>
<script>
import Loading from '@/components/loading/index.vue'
import Follow from '@/components/follow-button/index.vue'
import {
  GetFollows
} from '@/api/global.js';
export default {
  name: 'users-dialog',
  props: {
    id: {
      Number,
      default: 0
    },
    type: {
      String,
      default: '',
    },
    modes: {
      String,
      default: 'followers',
    },
    model: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loading,
        Follow,
      },
  data: () => ({
    vmodel: false,
    is_loading: false,
    is_empty: true,
    data: null,
    pagination: {
      page: 0,
      per_page: 20,
      total: 0,
      pages: 0,
      previous: 0,
      next: 1
    },
  }),
  methods: {
    GoUserID(id) {
      this.$router.push(`${this.$G_UrlHeaderLang()}/users/${id}`)
      // this.$store.dispatch('FabDialog/Set_SearchFabDialog', {
      //     value: false,
      //     model: 'close',
      //   })
      this.vmodel = false
    },
    async GetFollows() {
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      const response = await GetFollows({
        modes: this.modes,
        followable_type: this.type,
        followable_id: this.id,
        page: this.pagination.next,
        user_token: this.$G_GetUserToken(),
      })
      if (response.data.is_get == true) {
        this.data == null ? this.data = response.data.data : this.$G_FilterSameItems('user_id', this.data, response.data.data)
        this.pagination = response.data.pagination
        if (response.data.pagination.total == 0 || response.data.pagination.total == null) {
          this.is_empty = true
        } else {
          this.is_empty = false
        }
      }
      this.is_loading = false
    },
    ResetData() {
      this.data = null
      this.pagination = {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      }
    }
  },
  watch: {
    model(val) {
      this.ResetData()
      if (val) {
        this.GetFollows()
        this.vmodel = val
        this.$refs.users_dialog.open = true
      }
    },
    vmodel(val) {
      if (!val) {
        this.$refs.users_dialog.open = false
        this.$emit('model', val)
      }
    },
    '$route'() {
      this.vmodel = false
    },
  },
}
</script>
<style lang="less">
@import '../../vendor/variable.less';

.mc-users-dialog {
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

  .item {
    position: relative;
  }

  .list-item {
    padding: 8px 24px;
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