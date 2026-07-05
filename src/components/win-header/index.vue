<template>
  <div
    class="window-header"
    :style="{
      'background-color':
        mainStore.getScrollValue == 0
          ? 'rgb(var(--mdui-color-surface))'
          : 'rgb(var(--mdui-color-surface-container))',
    }"
  >
    <div class="window-title" style="-webkit-app-region: drag; -webkit-user-select: none">
      <!-- <div class="window-icon"> -->
      <img class="window-icon" :src="$G_ImgHandle('/assets/fixed_content/md3_icon.png')" />
      <!-- </div> -->
    </div>
    <div
      class="flex-grow"
      v-if="mainStore.getDesktop"
      style="-webkit-app-region: drag; -webkit-user-select: none"
    />

    <div class="window-name" style="-webkit-app-region: drag; -webkit-user-select: none">
      {{ title }}
    </div>

    <div class="flex-grow" style="-webkit-app-region: drag; -webkit-user-select: none" />

    <div class="window-controls">
      <!-- <button class="control-btn minimize-btn" title="最小化"></button>
            <button class="control-btn maximize-btn" title="最大化"></button>
            <button class="control-btn close-btn" title="关闭"></button> -->

      <mdui-tooltip
        :content="
          !top_window
            ? $t('Message.Components.SystemBar.TopWindow')
            : $t('Message.Components.SystemBar.CancelTopWindow')
        "
      >
        <mdui-button-icon
          @click="top_window = !top_window"
          style="height: 16px; width: 16px; margin: 0 4px 0 4px"
        >
          <mdi-icon
            :icon="!top_window ? 'mdi-brightness-1' : 'mdi-radiobox-marked'"
            span_style="color: #9e9e9e;"
          ></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip :content="$t('Message.Components.Editor.Minimize')">
        <mdui-button-icon
          @click="_OnWindowOpen('window-min')"
          style="height: 16px; width: 16px; margin: 0 4px 0 4px"
        >
          <mdi-icon icon="mdi-brightness-1" span_style="color: #64af4b;"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip :content="$t('Message.Components.Editor.Maximize')">
        <mdui-button-icon
          @click="_OnWindowOpen('window-max')"
          style="height: 16px; width: 16px; margin: 0 4px 0 4px"
        >
          <mdi-icon icon="mdi-brightness-1" span_style="color: #f09800;"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip :content="$t('Message.Components.Editor.Close')">
        <mdui-button-icon
          @click="_OnWindowOpen('window-close')"
          style="height: 16px; width: 16px; margin: 0 4px 0 4px"
        >
          <mdi-icon icon="mdi-brightness-1" span_style="color: #e1423b;"></mdi-icon>
        </mdui-button-icon>
      </mdui-tooltip>

      <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="green"
              @click="_OnWindowOpen('window-min')">mdi-brightness-1</v-icon>
          </template>
          <span>{{ $t('Message.Components.Editor.Minimize') }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="orange"
              @click="_OnWindowOpen('window-max')">mdi-brightness-1</v-icon>
          </template>
          <span>{{ $t('Message.Components.Editor.Maximize') }}</span>
        </v-tooltip><v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="red"
              @click="_OnWindowOpen('window-close')">mdi-brightness-1</v-icon>
          </template>
          <span>{{ $t('Message.Components.Editor.Close') }}</span>
        </v-tooltip> -->
    </div>
  </div>
</template>
<script>
// import { ipcRenderer } from 'electron';
import { useMainStore } from '@/stores/main'
import { OnWindowOpen } from '@/api/global.js'
export default {
  props: {
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    mainStore: useMainStore(),
    title: 'Material Design Forum',
    max: false,
    top_window: false,
  }),
  computed: {
    Time() {
      const date = new Date()
      return date.toLocaleString()
    },
  },
  methods: {
    UpdateTitle() {
      const _this = this
      document.querySelector('title').addEventListener('DOMSubtreeModified', () => {
        _this.title = document.querySelector('title').innerText
      })
    },
    _OnWindowOpen(type) {
      OnWindowOpen(type)
    },
  },
  // created() {
  //   this.UpdateTitle();
  // },
  mounted() {
    this.UpdateTitle()
  },
  watch: {
    $route(v) {
      // this.UpdateTitle();
      // this.title = document.querySelector('title').innerText;
    },
    max(val) {
      this._OnWindowOpen('max')
    },
    top_window(val) {
      this._OnWindowOpen(val ? 'window-top' : 'window-top-cancel')
    },
  },
}
</script>
<style lang="less">
.window-header {
  height: 32px;
  background-color: rgb(var(--mdui-color-surface));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  -webkit-app-region: drag;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
}

.window-title {
  display: flex;
  align-items: center;
  gap: 8px;
  -webkit-app-region: no-drag;
}

.window-icon {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  flex-shrink: 0;
}

.window-name {
  // color: #323232;
  font-weight: 500;
  margin-left: 8px;
}

.window-controls {
  display: flex;
  gap: 1px;
  -webkit-app-region: no-drag;
  /* 控制按钮不可拖拽 */
}

.control-btn {
  width: 46px;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.1s ease;
}

.control-btn:hover {
  background-color: #e1e1e1;
}

.control-btn:active {
  background-color: #d1d1d1;
}

/* 最小化按钮 */
.minimize-btn {
  border-radius: 0 0 0 3px;
}

.minimize-btn:hover {
  background-color: #e3f1fd;
}

.minimize-btn:active {
  background-color: #cce7f7;
}

.minimize-btn::before {
  content: '';
  width: 8px;
  height: 2px;
  background-color: #5f5f5f;
  border-radius: 1px;
}

/* 最大化/还原按钮 */
.maximize-btn {
  border-radius: 0;
}

.maximize-btn:hover {
  background-color: #e3f1fd;
}

.maximize-btn:active {
  background-color: #cce7f7;
}

.maximize-btn::before {
  content: '';
  width: 8px;
  height: 8px;
  border: 2px solid #5f5f5f;
  border-bottom: none;
  border-right: none;
  background-color: transparent;
}

/* 关闭按钮 */
.close-btn {
  border-radius: 0 0 3px 0;
}

.close-btn:hover {
  background-color: #e81123;
}

.close-btn:active {
  background-color: #c50f1f;
}

.close-btn::before,
.close-btn::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 2px;
  background-color: #ffffff;
  border-radius: 1px;
}

.close-btn::before {
  transform: rotate(45deg);
}

.close-btn::after {
  transform: rotate(-45deg);
}
</style>
