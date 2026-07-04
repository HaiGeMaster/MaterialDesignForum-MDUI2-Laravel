import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import { IsTauri, IsElectron, IsMobileApp } from '@/api/global.js'

import Home from '@/views/client/index/index.vue'
import Topics from '@/views/client/topics/index.vue'
import Topic from '@/views/client/topic/index.vue'
import Questions from '@/views/client/questions/index.vue'
import Question from '@/views/client/question/index.vue'
import Articles from '@/views/client/articles/index.vue'
import Article from '@/views/client/article/index.vue'
import User from '@/views/client/user/index.vue'
import Users from '@/views/client/users/index.vue'
import Notifications from '@/views/client/notifications/index.vue'
import NotificationsSetting from '@/views/client/notifications/setting/index.vue'
import Settings from '@/views/client/settings/index.vue'
import NullPage404 from '@/views/404.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/topics', name: 'topics', component: Topics },
  { path: '/topics/:topic_id', name: 'topic', component: Topic },
  { path: '/questions', name: 'questions', component: Questions },
  { path: '/questions/:question_id', name: 'question', component: Question },
  {
    path: '/questions/:question_id/answers/:answer_id',
    name: 'question-answer',
    component: Question,
  },
  { path: '/articles', name: 'articles', component: Articles },
  { path: '/articles/:article_id', name: 'article', component: Article },
  { path: '/users', name: 'users', component: Users },
  { path: '/users/:user_id', name: 'user', component: User },
  { path: '/notifications', name: 'notifications', component: Notifications },
  {
    path: '/notifications/setting',
    name: 'notifications-setting',
    component: NotificationsSetting,
  },
  { path: '/settings', name: 'settings', component: Settings },
  // { path: '/mc', name: 'mc', component: MC },

  { path: '/:lang([a-z]{2}_[A-Z]{2})', name: 'lang-home', component: Home },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/topics', name: 'lang-topics', component: Topics },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/topics/:topic_id', name: 'lang-topic', component: Topic },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/questions', name: 'lang-questions', component: Questions },
  {
    path: '/:lang([a-z]{2}_[A-Z]{2})/questions/:question_id',
    name: 'lang-question',
    component: Question,
  },
  {
    path: '/:lang([a-z]{2}_[A-Z]{2})/questions/:question_id/answers/:answer_id',
    name: 'lang-question-answer',
    component: Question,
  },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/articles', name: 'lang-articles', component: Articles },
  {
    path: '/:lang([a-z]{2}_[A-Z]{2})/articles/:article_id',
    name: 'lang-article',
    component: Article,
  },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/users', name: 'lang-users', component: Users },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/users/:user_id', name: 'lang-user', component: User },
  {
    path: '/:lang([a-z]{2}_[A-Z]{2})/notifications',
    name: 'lang-notifications',
    component: Notifications,
  },
  {
    path: '/:lang([a-z]{2}_[A-Z]{2})/notifications/setting',
    name: 'lang-notifications-setting',
    component: NotificationsSetting,
  },
  { path: '/:lang([a-z]{2}_[A-Z]{2})/settings', name: 'lang-settings', component: Settings },
  // { path: '/:lang([a-z]{2}_[A-Z]{2})/mc', name: 'lang-mc', component: MC },
  { path: '/:pathMatch(.*)*', name: '404', component: NullPage404 },
]

const router =
  IsTauri() || IsElectron() || IsMobileApp()
    ? createRouter({
        history:
          import.meta.env.MODE === 'development'
            ? createWebHistory(import.meta.env.BASE_URL) // 开发环境使用 BASE_URL
            : createWebHashHistory('/'),
        // history: createWebHashHistory('/'),
        routes,
      })
    : createRouter({
        // 根据环境选择不同的路由配置
        history:
          import.meta.env.MODE === 'development'
            ? createWebHistory(import.meta.env.BASE_URL) // 开发环境使用 BASE_URL
            : createWebHistory('/'), // 生产环境使用根路径
        routes,
      })

export default router
