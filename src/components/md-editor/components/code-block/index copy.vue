<template>
  <node-view-wrapper class="code-block">
    

    <div style="display: flex;">
      
      <div class="flex-grow"></div>

      <mdui-dropdown>
        <mdui-button slot="trigger" variant="tonal">
          {{ selectedLanguage || 'language' }}
          <mdi-icon slot="end-icon" icon="mdi-chevron-down"/>
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
  </node-view-wrapper>
</template>
<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props:{
    nodeViewProps,
  },
  data() {
    return {
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
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 2px;
  margin-bottom: 16px;
  background-color: #fdfcff;
  .mdui-theme-dark & {
    border: #ffffff dashed 1px;
    background-color: #00000030;
  }
}
</style>