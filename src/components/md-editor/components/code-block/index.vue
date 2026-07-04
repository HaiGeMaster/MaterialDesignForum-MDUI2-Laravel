<template>
  <node-view-wrapper class="code-block">


    <div style="display: flex;">


      <mdui-button-icon style="width: 28px;height: 28px;" disabled>
        <mdi-icon :icon="'mdi-circle'" span_style="color:#f44336;"></mdi-icon>
      </mdui-button-icon>

      <mdui-button-icon style="width: 28px;height: 28px;" disabled>
        <mdi-icon icon="mdi-circle" span_style="color:#ff9800;"></mdi-icon>
      </mdui-button-icon>

      <mdui-button-icon style="width: 28px;height: 28px;" disabled>
        <mdi-icon :icon="'mdi-circle'" span_style="color:#4caf50;"></mdi-icon>
      </mdui-button-icon>


      <div class="flex-grow"></div>

      <!-- <mdui-button-icon @click="copy(node.attrs.language)" 
        v-show="!editor.isEditable"
        variant="tonal"
      >
        <mdi-icon icon="mdi-content-copy"></mdi-icon>
      </mdui-button-icon> -->

      <mdui-dropdown>
        <!-- :disabled="!editor.isEditable" -->
        <mdui-button slot="trigger" variant="tonal" >
          {{ selectedLanguage || 'language' }}
          <mdi-icon slot="end-icon" icon="mdi-chevron-down" />
        </mdui-button>
        <mdui-menu style="max-height: 500px;overflow: auto;">
          <mdui-menu-item v-for="language in languages" :key="language" @click="selectedLanguage = language">
            {{ language }}
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>

    </div>

    <pre>
      <code>
        <node-view-content />
      </code>
    </pre>

    <!-- <div class="code-container">
      <div class="ios-buttons">
        <div class="ios-button red"></div>
        <div class="ios-button yellow"></div>
        <div class="ios-button green"></div>

        <div class="flex-grow"></div>

        <mdui-dropdown>
          <mdui-button slot="trigger" variant="tonal">
            {{ selectedLanguage || 'language' }}
            <mdi-icon slot="end-icon" icon="mdi-chevron-down" />
          </mdui-button>
          <mdui-menu style="max-height: 500px;overflow: auto;">
            <mdui-menu-item v-for="language in languages" :key="language" @click="selectedLanguage = language">
              {{ language }}
            </mdui-menu-item>
          </mdui-menu>
        </mdui-dropdown>

      </div>
      <pre>
        <code>
          <node-view-content />
        </code>
      </pre>
    </div> -->

  </node-view-wrapper>
</template>
<script>
// import copy from 'copy-to-clipboard';
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: {
    nodeViewProps,
    // the editor instance
    editor: {
      type: Object,
    },
    // the current node
    node: {
      type: Object,
    },
    // an array of decorations
    decorations: {
      type: Array,
    },
    // `true` when there is a `NodeSelection` at the current node view
    selected: {
      type: Boolean,
    },
    // access to the node extension, for example to get options
    extension: {
      type: Object,
    },
    // get the document position of the current node
    getPos: {
      type: Function,
    },
    // update attributes of the current node
    updateAttributes: {
      type: Function,
    },
    // delete the current node
    deleteNode: {
      type: Function,
    },
  },
  data() {
    return {
      // copy,
      languages: this.extension.options.lowlight.listLanguages(),
    }
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language
      },
      set(language) {
        this.updateAttributes({ language })
      },
    },
  },
}
</script>
<style lang="less">
.code-block {
  position: relative;
  border-radius: 10px;
  // border: #303030 dashed 1px;
  // padding-top: 24px;
  // padding-left: 16px;
  // padding-right: 16px;
  // padding-bottom: 2px;
  padding: 16px;

  margin-bottom: 16px;
  background-color: #fdfcff;
  // background-color: #292b2d;
  // color: white;

  .mdui-theme-dark & {
    // border: #ffffff dashed 1px;
    background-color: #00000030;
  }
}

// .code-container {
//   position: relative;
//   width: 80%;
//   max-width: 600px;
//   background-color: #1e1e1e;
//   border-radius: 12px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
//   overflow: hidden;


//   .ios-buttons {
//     position: absolute;
//     top: 12px;
//     left: 12px;
//     display: flex;
//     gap: 6px;
//   }

//   .ios-button {
//     width: 12px;
//     height: 12px;
//     border-radius: 50%;
//   }

//   .ios-button.red {
//     background-color: #ff3b30;
//   }

//   .ios-button.yellow {
//     background-color: #ffcc00;
//   }

//   .ios-button.green {
//     background-color: #4cd964;
//   }
// }</style>