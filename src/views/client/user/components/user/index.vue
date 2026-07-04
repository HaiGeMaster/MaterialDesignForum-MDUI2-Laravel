<template>
  <mdui-card :variant="$store.getters.GetDark ? 'filled' : 'elevated'" class="user" style="width: 100%;">
    <!-- data-fancybox="gallery"  -->
    <div v-if="user" class="cover" ref="cover" :style="`background-image: url(${$G_ImgHandle(user.cover.large)
    })`">
      <div class="mc-cover-upload" v-if="$G_GetUserID() == user.user_id">
        <mdui-button-icon variant="tonal" @click="handleFileSelectCover()" :loading="upload_cover_loading">
          <mdi-icon icon="mdi-camera" />
        </mdui-button-icon>

      </div>
      <div style="padding: 16px;">
        <!-- :style="
          'background-color: ' + user.user_group.user_group_color + ';'"
        " -->
        <mdui-chip>
          <mdi-icon slot="icon" :styles="`color:${user.user_group.user_group_color};`"
            :icon="user.user_group.user_group_icon" />
          {{ $t(user.user_group.user_group_name) }}
        </mdui-chip>
      </div>
    </div>
    <div v-else class="cover skeleton-background">

    </div>

    <div v-if="user" class="info">
      <div class="avatar-box">
        <div class="mc-avatar-upload" v-if="$G_GetUserID() == user.user_id">
          <mdui-button-icon variant="tonal" class="upload-btn glass-container" @click="handleFileSelectAvatar()"
            :loading="upload_avatar_loading">
            <mdi-icon icon="mdi-camera" />
          </mdui-button-icon>
        </div>

        <img :src="$G_ImgHandle(user.avatar.large)" class="avatar" ref="avatar" />
      </div>
      <div class="profile" :class="[{
    fold: profile_fold,
  }]">
        <div class="meta username">
          {{ user.username }}
        </div>
        <div class="meta" v-if="user.headline">
          <mdui-tooltip :content="$t('Message.Client.User.User.OneSentenceIntroduction')" placement="left">
            <span class="mdi mdi-account-circle"></span>
            <span style="font-size: 18px;margin-left: 4px;">{{ user.headline }}</span>
          </mdui-tooltip>
        </div>
        <div class="meta" v-if="user.blog">
          <mdui-tooltip :content="$t('Message.Client.User.User.PersonalHomepage')" placement="left">
            <span class="mdi mdi-link"></span>
            <span style="font-size: 18px;margin-left: 4px;">{{ user.blog }}</span>
          </mdui-tooltip>
        </div>
        <div class="meta" v-if="user.company">
          <mdui-tooltip :content="$t('Message.Client.User.User.AffiliatedSchoolOrEnterprise')" placement="left">
            <span class="mdi mdi-city"></span>
            <span style="font-size: 18px;margin-left: 4px;">{{ user.company }}</span>
          </mdui-tooltip>
        </div>
        <div class="meta" v-if="user.location">
          <mdui-tooltip :content="$t('Message.Client.User.User.Location')" placement="left">
            <span class="mdi mdi-map-marker"></span>
            <span style="font-size: 18px;margin-left: 4px;">{{ user.location }}</span>
          </mdui-tooltip>
        </div>
        <div class="meta" v-if="user.bio">
          <mdui-tooltip :content="$t('Message.Client.User.User.PersonalIntroduction')" placement="left">
            <span class="mdi mdi-file-document"></span>
            <span style="font-size: 18px;margin-left: 4px;">{{ user.bio }}</span>
          </mdui-tooltip>
        </div>
        <mdui-button class="fold-button" variant="elevated" v-if="ComputedFoldButtonRule"
          @click="profile_fold = !profile_fold">
          <mdi-icon slot="icon" :icon="profile_fold ? 'mdi-chevron-down' : 'mdi-chevron-up'" />
          {{ profile_fold ? $t('Message.Client.User.User.ShowDetail') : $t('Message.Client.User.User.CollapseDetails')
          }}
        </mdui-button>
      </div>
    </div>
    <div v-else class="info">
      <div class="avatar-box skeleton-item-circle"></div>
      <div class="profile">
        <div class="meta username skeleton-item" style="margin: auto;max-width: 150px;"></div>
        <div class="meta skeleton-item">
        </div>
        <div class="skeleton-item" style="margin: auto;width: 150px;height: 40x;"></div>
      </div>
    </div>

    <div v-if="user" class="actions">
      <EditInfoButton
        v-if="$store.getters['User/GetIsLogin'] && $store.getters['User/GetUser'].user_group['ability_edit_own_info']"
        :user="user" />
      <FollowButton v-if="$store.getters['User/GetUser'].user_id != user.user_id" :followable_type="'user'"
        :followable_id="user.user_id" :is_follow="user.is_follow" />


      <div class="follow">
        <mdui-button variant="tonal" class="followers" @click="
    $store.dispatch('Dialog/Set_UsersDialog', {
      id: user.user_id,
      type: 'user',
      modes: 'followers',
      model: true,
    })
    ">
          {{ $t('Message.Client.User.User.NPeopleFollowing', {
    value: user.follower_count
  }) }}
        </mdui-button>
        <div class="divider" />
        <mdui-button variant="tonal" class="followees" @click="
    $store.dispatch('Dialog/Set_UsersDialog', {
      id: user.user_id,
      type: 'user',
      modes: 'followees',
      model: true,
    })">

          {{ $t('Message.Client.User.User.FollowNPeople', {
    value: user.followee_count
  }) }}
        </mdui-button>
      </div>

      <div class="flex-grow" />

      <OptionsButton v-if="user" type="user" :item="user" @reset_avatar="(user) => {
    $store.dispatch('Update/Set_UserUpdate', user)
  }" @reset_cover="(user) => {
    $store.dispatch('Update/Set_UserUpdate', user)
  }" />

    </div>
    <div v-else class="actions">
      <div class="mc-follow skeleton-item-circle" slot="icon" style="margin: 0 58px 0 0;"></div>
      <div class="follow">
        <div class="skeleton-item followers" style="margin: auto;width: 150px;height: 40x;"></div>
        <div class="skeleton-item followees" style="margin: auto;width: 150px;height: 40x;"></div>
      </div>
      <div class="flex-grow" />
      <div class="mc-follow skeleton-item-circle" slot="icon" style="margin: 0;"></div>
    </div>

    <!-- <div style="padding: 16px;">
      
      <DeviceList v-if="user != null&&user.user_id==1"/>
    </div> -->

  </mdui-card>
</template>
<script>
import {
  UploadAvatar,
  UploadCover,
} from '@/api/global.js';
import FollowButton from '@/components/follow-button/index.vue';
import OptionsButton from '@/components/options-button/index.vue';
import EditInfoButton from '@/components/dialog/edit-info-dialog/edit-info-button.vue';
// import DeviceList from '@/components/hiage-content/device-list/index.vue'
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
  },
  components: {
    FollowButton,
    OptionsButton,
    EditInfoButton,
    // DeviceList,
  },
  data: () => ({
    profile_fold: true,
    upload_avatar_loading: false,
    upload_cover_loading: false,
  }),
  computed: {
    ComputedFoldButtonRule() {
      // v-if="user.blog!=null || user.company!=null || user.location!=null || user.bio!=null"
      let a = 0
      let b = 0
      if (this.user.headline) {
        a++
      }
      if (this.user.blog) {
        b++
      }
      if (this.user.company) {
        b++
      }
      if (this.user.location) {
        b++
      }
      if (this.user.bio) {
        b++
      }
      if (a == 1 && b == 0) {
        return false
      } else if (a == 0 && b >= 1) {
        return false
      } else if (a == 0 && b == 0) {
        return false
      } else {
        return true
      }
    },
    ReturnGetScrollValue() {
      return this.$store.getters.GetScrollValue;
    },
  },
  methods: {
    SetCover() {
      const _this = this;
      setTimeout(() => {
        window.addEventListener('scroll', () => {
          console.log('scroll', window.scrollY);
          window.requestAnimationFrame(() => {
            if (_this.$refs.cover==null||_this.$refs.cover==undefined) {
              return;
            }
            _this.$refs.cover.style['background-position-y'] = `${window.scrollY / 2}px`;
          });
        });
        if(_this.$refs.cover){
          window.scrollTo(0, _this.$refs.cover.offsetWidth * 0.56 * 0.58);
        }
      });
    },
    handleFileSelectCover() {
      // if(!this.$refs.cover){
      //   return
      // }
      // const fileInput = this.$refs.cover_input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      // fileInput.accept = 'image/png';
      // 支持png,jpg,jpeg,gif图片格式
      // fileInput.accept = 'image/png,image/jpg,image/jpeg,image/gif';
      fileInput.accept = 'image/png,image/jpg,image/jpeg';
      fileInput.style.display = 'none';
      const previewImg = this.$refs.cover
      document.body.appendChild(fileInput);

      const cover = this.$refs.cover
      const _this = this;
      fileInput.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
          previewImg.src = event.target.result;
          cover.style['background-image'] = `url(${event.target.result})`;
          _this.UploadCover(previewImg.src);
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    },
    async UploadCover(src) {
      this.upload_cover_loading = true
      const response = await UploadCover({
        user_token: this.$G_GetUserToken(),
        cover: src,
      })
      if (response.data.is_upload) {
        this.upload_cover_loading = false
      } else {
        this.upload_cover_loading = false
      }
    },
    handleFileSelectAvatar() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      // fileInput.accept = 'image/png';
      // 支持png,jpg,jpeg,gif图片格式
      // fileInput.accept = 'image/png,image/jpg,image/jpeg,image/gif';
      fileInput.accept = 'image/png,image/jpg,image/jpeg';
      fileInput.style.display = 'none';
      const avatar = this.$refs.avatar
      const _this = this;
      fileInput.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
          avatar.src = event.target.result;
          _this.UploadAvatar(
            avatar.src
          );
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    },
    async UploadAvatar(src) {
      this.upload_avatar_loading = true
      const response = await UploadAvatar({
        user_token: this.$G_GetUserToken(),
        avatar: src,
      })
      if (response.data.is_upload) {
        this.upload_avatar_loading = false
      } else {
        this.upload_avatar_loading = false
      }
    },
  },
  watch: {
    // user(val){
    //   if(val!=null){
    //     this.SetCover();
    //   }
    // },
    ReturnGetScrollValue(val) {
      if (this.$refs.cover) {
        window.requestAnimationFrame(() => {
          this.$refs.cover.style['background-position-y'] = `${val / 2}px`;
        });
      }
    },
  },
  created() {
    // if(this.user){
    //   this.SetCover();
    // }
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>