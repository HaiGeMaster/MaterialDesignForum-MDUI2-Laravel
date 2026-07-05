<template>
  <div>
    <div id="page-notifications-setting" v-if="userStore.getIsLogin">
      <mdui-top-app-bar style="position: relative">
        <mdui-button variant="tonal" @click="$router.go(-1)">
          <mdi-icon icon="mdi-arrow-left" slot="icon"></mdi-icon>
          {{ $t('Message.Components.BackButton.Back') }}
        </mdui-button>

        <div style="flex-grow: 1"></div>

        <span style="font-size: var(--mdui-typescale-title-large-size)">
          {{ $t('Message.Client.Notification.NotificationSetting') }}
        </span>

        <div style="flex-grow: 1"></div>
        <mdui-button @click="SetUserOption()" :loading="loading">
          {{ $t('Message.Admin.Options.Save') }}
          <mdi-icon icon="mdi-send" slot="end-icon"></mdi-icon>
        </mdui-button>
      </mdui-top-app-bar>

      <span style="margin: 0 16px 0 16px; color: rgb(var(--mdui-color-on-surface-variant))">
        {{ $t('Message.Client.Notification.YouCanManageYourNotificationSettingsHere') }}
      </span>

      <div class="mdui-table">
        <table>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('Message.Client.Notification.NotificationItem') }}
              </th>
              <th class="text-left">
                {{ $t('Message.Client.Notification.SiteNotification') }}
              </th>
              <th class="text-left">
                {{ $t('Message.Client.Notification.EmailNotification') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in desserts" :key="item.name">
              <td>{{ $t(`Message.Client.Notification.NotificationType.${item.name}`) }}</td>
              <td>
                <mdui-switch
                  :checked="item.web_message"
                  @input="
                    ($event) => {
                      // console.log(!$event.target.checked)
                      item.web_message = !$event.target.checked
                    }
                  "
                ></mdui-switch>
              </td>
              <!-- disabled -->
              <td>
                <mdui-switch
                  :checked="item.email_message"
                  @input="
                    ($event) => {
                      // console.log(!$event.target.checked)
                      item.email_message = !$event.target.checked
                    }
                  "
                ></mdui-switch>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <NeedLoginAccess v-else />
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
import ReturnButton from '@/components/return-button/index.vue'
import NeedLoginAccess from '@/components/need-login-access/index.vue'

import { SetUserOption, GetUserOption } from '@/api/global.js'
export default {
  name: 'notifications-page-setting',
  components: {
    ReturnButton,
    NeedLoginAccess,
  },
  data() {
    return {
      userStore: useUserStore(),
      web_message_all: false, // 全部站内通知开关
      email_message_all: false, // 全部邮件通知开关
      desserts: [
        { name: 'user_follow', web_message: true, email_message: false },
        { name: 'topic_follow', web_message: true, email_message: false },
        { name: 'topic_delete', web_message: true, email_message: false },
        { name: 'question_follow', web_message: true, email_message: false },
        { name: 'question_comment', web_message: true, email_message: false },
        { name: 'question_answer', web_message: true, email_message: false },
        { name: 'question_delete', web_message: true, email_message: false },
        { name: 'article_follow', web_message: true, email_message: false },
        { name: 'article_comment', web_message: true, email_message: false },
        { name: 'article_like', web_message: true, email_message: false },
        { name: 'article_delete', web_message: true, email_message: false },
        { name: 'answer_comment', web_message: true, email_message: false },
        { name: 'answer_like', web_message: true, email_message: false },
        { name: 'answer_delete', web_message: true, email_message: false },
        { name: 'comment_like', web_message: true, email_message: false },
        { name: 'comment_reply', web_message: true, email_message: false },
        { name: 'comment_delete', web_message: true, email_message: false },
        { name: 'reply_like', web_message: true, email_message: false },
        { name: 'reply_reply', web_message: true, email_message: false },
        { name: 'reply_delete', web_message: true, email_message: false },
        { name: 'follow_user_update', web_message: true, email_message: false },
        { name: 'follow_topic_update', web_message: true, email_message: false },
        { name: 'follow_question_update', web_message: true, email_message: false },
        { name: 'follow_article_update', web_message: true, email_message: false },
      ],
      loading: false,
    }
  },
  methods: {
    async SetUserOption() {
      this.loading = true
      // console.log(this.desserts)
      const res = await SetUserOption({
        user_token: this.$G_GetUserToken(),
        name: 'notifications',
        value: this.desserts,
      })
      if (res.data.is_set) {
        this.loading = false
      } else {
        this.loading = false
      }
    },
    async GetUserOption() {
      const res = await GetUserOption({
        user_token: this.$G_GetUserToken(),
        name: 'notifications',
      })
      if (res.data.is_get) {
        // this.desserts = []
        this.$forceUpdate()
        //先将res.data.data.value里的对象的"false"和"true"转为布尔值
        for (let i = 0; i < res.data.data.value.length; i++) {
          res.data.data.value[i].web_message = res.data.data.value[i].web_message === 'true'
          res.data.data.value[i].email_message = res.data.data.value[i].email_message === 'true'
        }
        const server_data = res.data.data.value
        //对比server_data和this.desserts，根据name作为判断值，如果name相同，就用server_data的对象替换this.desserts的对象
        //这样子就解决了客户端新增的通知类型，服务端没有的问题
        for (let i = 0; i < server_data.length; i++) {
          for (let j = 0; j < this.desserts.length; j++) {
            if (server_data[i].name === this.desserts[j].name) {
              this.desserts[j] = server_data[i]
            }
          }
        }
        this.$forceUpdate()
        // console.log(this.desserts)
      }
    },
  },
  created() {
    this.GetUserOption()
  },
  watch: {
    desserts: {
      handler(newValue) {
        // console.log('新值:', newValue);
        // this.SetUserOption()
      },
      deep: true, // 深度监听
    },
  },
}
</script>
<style lang="less">
#page-notifications-setting {
  max-width: 830px;
  margin: auto;
  padding: 16px;
}

.mdui-table {
  width: 100%;
  overflow-x: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  border: 0.0625rem solid rgb(var(--mdui-color-surface-variant));
  border-radius: var(--mdui-shape-corner-large);
}

.mdui-table table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
