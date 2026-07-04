<template>

  <mdui-card 
    v-show="vmodel == 'open' ||
            vmodel == 'maximize' ||
            vmodel == 'moderate'
            " 
          :class="[
            'mc-fab-dialog',
            'glass-container',
            {
              'maximize': $store.getters.GetBreakpoint != 'xs' && vmodel == 'maximize',
              'minimize': vmodel == 'minimize',
            }
          ]" class="mdui-card-variant-color-border" ref="card_name_id" :id="name_id" :elevation="vmodel == 'maximize'
            ? ($store.getters['FabDialog/GetFabDialogName'] == name_id ? elevation : elevation - 4)
            : (
              vmodel == 'minimize'
                ? ($store.getters['FabDialog/GetFabDialogName'] == name_id ? elevation - 4 : elevation - 8)
                : ($store.getters['FabDialog/GetFabDialogName'] == name_id ? elevation - 8 : elevation - 16)
            )"  @focus="onFocus()"
            
            :style="`${$store.getters['FabDialog/GetFabDialogName'] == name_id?'box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 25px;':'box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 25px;'}`"

            :variant="$store.getters.GetDark ? 'filled' : 'elevated'"
            >

    <div :class="['header', 'glass-container']">

      <div ref="header_title" :class="[
            'header-title',
            {
              'white--text': $store.getters.GetDark,
              'black--text': !$store.getters.GetDark,
            }
          ]" @dblclick="vmodel == 'moderate' ? EditorStateUpdate('maximize') : EditorStateUpdate('moderate')"
        @click="onFocus()">


        <mdi-icon v-if="icon.indexOf('mdi-') != -1" :icon="icon"></mdi-icon>

        <img v-else :src="icon" :style="{
            'width': '24px',
            'height': '24px',
            'margin-right': '8px',
          }" />
        &nbsp;
        {{
            title.indexOf('Message') == -1
              ?
              title
              :
              $t(title)
          }}
      </div>

      <div class="header-actions" style="margin-top: 8px;">

        <mdui-tooltip :content="$t('Message.Components.Editor.Minimize')" placement="bottom">
          <mdui-button-icon @click="vmodel == 'minimize' ? vmodel = 'maximize' : vmodel = 'minimize'" style="width: 28px;height: 28px;">
            <!-- <mdi-icon :icon="'mdi-window-minimize'"
              @click="vmodel == 'minimize' ? vmodel = 'maximize' : vmodel = 'minimize'"></mdi-icon> -->
            <mdi-icon :icon="'mdi-circle'"  span_style="color:#4caf50;"
              ></mdi-icon>
              
          </mdui-button-icon>
        </mdui-tooltip>

        <mdui-tooltip :content="$t('Message.Components.Editor.Maximize')" placement="bottom">
          <mdui-button-icon v-show="$store.getters.GetBreakpoint != 'xs'" style="width: 28px;height: 28px;"
            @click="vmodel == 'maximize' ? EditorStateUpdate('moderate') : EditorStateUpdate('maximize')">
            <!-- <mdi-icon :icon="vmodel == 'maximize' ? 'mdi-circle-outline' : 'mdi-border-radius'"></mdi-icon> -->
            <mdi-icon icon="mdi-circle" span_style="color:#ff9800;"></mdi-icon>
          </mdui-button-icon>
        </mdui-tooltip>

        <mdui-tooltip :content="$t('Message.Components.Editor.Close')" placement="bottom">
          <mdui-button-icon @click="vmodel = 'close'" style="width: 28px;height: 28px;">
            <!-- <mdi-icon :icon="'mdi-close'"></mdi-icon> -->
            <mdi-icon :icon="'mdi-circle'" span_style="color:#f44336;"></mdi-icon>
          </mdui-button-icon>
        </mdui-tooltip>

      </div>

    </div>
    <div class="body" @focus="onFocus()">
      <slot></slot>
    </div>
  </mdui-card>

</template>
<script>
export default {
  name: 'fab-dialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: 'close',
    },
    icon: {
      type: String,
      default: 'mdi-message-text',
    },
    name_id: {
      type: String,
      default: '',
    },
    route_update_close: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  data: () => ({
    vmodel: 'close',
    elevation: 20,
  }),
  mounted() {
    const headerTitle = this.$refs.header_title;
    var selfs = this;
    headerTitle.addEventListener('touchstart', function (event) {
      if (selfs.$store.getters.GetMobile) {
        return
      }
      event.preventDefault();
      const initialX = event.touches[0].clientX;
      const initialY = event.touches[0].clientY;
      const fab_dialog = document.getElementById(selfs.name_id);
      const fab_dialogRect = fab_dialog.getBoundingClientRect();
      const initialEditorX = fab_dialogRect.left;
      const initialEditorY = fab_dialogRect.top;
      document.addEventListener('touchmove', touchMoveHandler);
      document.addEventListener('touchend', touchEndHandler);
      function touchMoveHandler(event) {
        selfs.onFocus()
        const deltaX = event.touches[0].clientX - initialX;
        const deltaY = event.touches[0].clientY - initialY;
        fab_dialog.style.left = `${initialEditorX + deltaX}px`;
        fab_dialog.style.top = `${initialEditorY + deltaY}px`;
      }
      function touchEndHandler() {
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', touchEndHandler);
      }
    });
    headerTitle.addEventListener('mousedown', function (event) {
      event.preventDefault();
      const initialX = event.clientX;
      const initialY = event.clientY;
      const fab_dialog = document.getElementById(selfs.name_id);
      const fab_dialogRect = fab_dialog.getBoundingClientRect();
      const initialEditorX = fab_dialogRect.left;
      const initialEditorY = fab_dialogRect.top;
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      function mouseMoveHandler(event) {
        selfs.onFocus()
        if (selfs.$store.getters.GetMobile) {
          fab_dialog.style.left = '0px';
          fab_dialog.style.top = '0px';
          return
        }
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        fab_dialog.style.left = `${initialEditorX + deltaX}px`;
        fab_dialog.style.top = `${initialEditorY + deltaY}px`;
      }
      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      }
    });
  },
  methods: {
    onFocus() {
      this.$store.dispatch('FabDialog/Set_FabDialogName', this.name_id)
      const card_name_id = document.getElementById(this.name_id);

      const mdui_layout_main = document.querySelector('mdui-layout-main');
      mdui_layout_main.appendChild(card_name_id);
    },
    ResetEditorPos() {
      if (
        this.vmodel == 'minimize' ||
        this.vmodel == 'close'
      ) {
        return
      }
      const fab_dialog = document.getElementById(this.name_id);
      fab_dialog.style.left = '0px';
      fab_dialog.style.top = '0px';
    },
    EditorStateUpdate(v) {
      if (v == 'moderate') {
        this.vmodel = 'close'
        setTimeout(() => {
          this.vmodel = 'moderate'
        }, 700);
      } else if (v == 'maximize') {
        this.vmodel = 'close'
        setTimeout(() => {
          this.vmodel = 'maximize'
        }, 500);
      }
    },
  },
  watch: {
    model(v) {
      this.vmodel = v
      this.$store.dispatch('FabDialog/Set_FabDialogName', this.name_id)
    },
    vmodel(v) {
      console.log('vmodel', v)
      this.$emit('model', v)
    },
    '$route'(to, from) {
      if (this.route_update_close) {
      }
    },
    '$store.getters.GetMobile': {
      handler: function (val, oldVal) {
        if (val) {
          this.ResetEditorPos()
        }
      },
      immediate: true,
    },
    ReturnFabDialogGetFabDialogName(val) {
      if (val == this.name_id) {
        this.elevation = 24
      } else {
        this.elevation = 8
      }
    },
  },
  computed: {
    ReturnFabDialogGetFabDialogName() {
      return this.$store.getters['FabDialog/GetFabDialogName']
    },
  },
}
</script>
<style lang="less">
.white--text {
  color: #fff;
}

.black--text {
  color: #000;
}

@import '../../../vendor/variable.less';

.mc-fab-dialog {
  // animation: fadeIn 0.5s forwards !important; /* 添加淡入效果 */
  // animation: slideUp 0.8s ease-out forwards;
  //   animation: slideUp 0.5s ease-out forwards;

  // .maximize,
  // .moderate{
  //   animation: slideUp 0.5s ease-out forwards;
  // }

  // .minimize,
  // .close{
  //   animation: slideDown 0.5s ease-out forwards;
  // }

  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 608px;
  overflow: hidden;
  // border-radius: 8px 8px 0 0;

  .header {
    display: flex;
    align-items: center;
    height: 40px;
    user-select: none;
  }

  .header-title {
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    padding-left: 16px;
    // color: #fff;
  }

  .header-title:hover {
    cursor: move;
  }

  .header-actions {
    padding-right: 8px;
    padding-left: 8px;
  }

  &.maximize:not(.minimize) {
    right: calc(~'(100% - 736px)/2');
    bottom: 4vh;
    width: 100%;
    max-width: 736px;
    height: 92vh;

    @media (max-width: 736px) {
      right: 0;
      bottom: 0;
      height: 100vh;
    }
  }

  &.minimize {
    width: 260px;
    height: 40px;
  }

  .body {
    flex: 1;
    overflow: hidden;
  }

  @media (max-width: @screen-xs-max) {
    right: 0;
    bottom: 0;
    // bottom: 80px;
    width: 100%;
    height: 100vh;
    // height: calc(100vh - 144px);

    &.minimize {
      width: 100%;
      height: 56px;
    }

    .header {
      height: 56px;
    }

    .header-actions {
      i {
        padding: 8px;
        font-size: 20px;

        &:nth-child(2) {
          display: none;
        }
      }
    }

    .icon-maximize {
      display: none;
    }
  }
}
</style>