<template>
  <FabDialog :model="vmodel" :route_update_close="true" @model="vmodel = $event" :title="vtitle" :icon="vicon"
    name_id="mc-editor" :class="[
      {
        'maximize': $store.getters.GetBreakpoint != 'xs' && vmodel == 'maximize',
        'minimize': vmodel == 'minimize',
        'with-title': vhas_title,
        'with-topics': vhas_topic,
      }
    ]">



    <input type="text" class="editor-title-input" :placeholder="$t('Message.Components.Editor.PleaseEnterATitle')"
      v-show="vhas_title" :value="vmd_title" @input="vmd_title = $event.target.value" style="
      " />

    <div v-show="has_topic" class="editor-topics" @click="">

      <template v-for="(item, index) in vmd_topics">
        <!-- elevated -->
        <mdui-chip  v-if="index < (vmodel == 'maximize' ? 6 : 3)" :key="`${index}chip`" style="background-color: transparent;">
          <mdui-avatar slot="icon">
            <img :src="$G_ImgHandle(item.cover.small)">
            </img>
          </mdui-avatar>
          {{
          item.name
          }}
        </mdui-chip>
        <span v-if="index === (vmodel == 'maximize' ? 6 : 3)" class="grey--text text-caption">
          (+{{ vmd_topics.length - (vmodel == 'maximize' ? 6 : 3) }})
        </span>
      </template>

      <span class="placeholder" :title="$t('Message.Components.Editor.ClickToAddATopic')"
        @click="$store.dispatch('Dialog/Set_TopicSelectorDialog', true)">
        {{
        vmd_topics.length == 0 ? $t('Message.Components.Editor.PleaseSelectAtLeast1Topic') : ''
        }}
      </span>

      <mdui-button-icon class="add" @click.prevent.stop="$store.dispatch('Dialog/Set_TopicSelectorDialog', true)"
        :title="$t('Message.Components.Editor.ClickToAddATopic')">
        <mdi-icon icon="mdi-plus" />
      </mdui-button-icon>


    </div>

    <div v-show="!table_menu" class="editor-toolbar">

      <mdui-dropdown>
        <mdui-button-icon :loading="image_is_loading"
          :style="{ 'width': model == 'maximize' ? '40px' : '28px', 'height': model == 'maximize' ? '40px' : '28px', }"
          slot="trigger">
          <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.More')">
            <mdi-icon icon="mdi-plus-circle-outline" />
          </mdui-tooltip>
        </mdui-button-icon>

        <!-- 暂时不限制高度 -->
        <mdui-menu dense>
          <mdui-menu-item @click="table_menu = !table_menu">
            <mdi-icon icon="mdi-table" slot="icon" />
            {{ $t('Message.Components.Editor.Table') }}
          </mdui-menu-item>
          
          <mdui-menu-item @click="addImage()">
            <mdi-icon icon="mdi-image" slot="icon" />
            {{ $t('Message.Components.Editor.AddImage') }}
          </mdui-menu-item>

          <mdui-menu-item @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
            <mdi-icon icon="mdi-link-variant" slot="icon" />
            {{ $t('Message.Components.Editor.AddLink') }}
          </mdui-menu-item>

          <mdui-menu-item :disabled="!editor.isActive('link')"
          @click="editor.chain().focus().unsetLink().run()">
            <mdi-icon icon="mdi-link-variant-off" slot="icon" />
            {{ $t('Message.Components.Editor.UnsetLink') }}
          </mdui-menu-item>

          <mdui-menu-item @click="editor.chain().focus().setHorizontalRule().run()">
            <mdi-icon icon="mdi-minus" slot="icon" />
            {{ $t('Message.Components.Editor.HorizontalRule') }}
          </mdui-menu-item>

          <mdui-menu-item @click="editor.chain().focus().setHardBreak().run()">
            <mdi-icon icon="mdi-arrow-down-right" slot="icon" />
            {{ $t('Message.Components.Editor.HardBreak') }}
          </mdui-menu-item>

          <mdui-menu-item @click="editor.chain().focus().unsetAllMarks().run()">
            <mdi-icon icon="mdi-format-clear" slot="icon" />
            {{ $t('Message.Components.Editor.ClearMarks') }}
          </mdui-menu-item>

          <mdui-menu-item @click="editor.chain().focus().clearNodes().run()">
            <mdi-icon icon="mdi-close-network-outline" slot="icon" />
            {{ $t('Message.Components.Editor.ClearNodes') }}
          </mdui-menu-item>

          
          <mdui-menu-item @click="editor.chain().focus().setDetails().run()" :disabled="!editor.can().setDetails()">
            <mdi-icon icon="mdi-details" slot="icon" />
            {{ $t('Message.Components.Editor.SetDetails') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().unsetDetails().run()" :disabled="!editor.can().unsetDetails()">
            <mdi-icon icon="mdi-details" slot="icon" />
            {{ $t('Message.Components.Editor.UnsetDetails') }}
          </mdui-menu-item>

        </mdui-menu>
      </mdui-dropdown>

      <!-- <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.Table')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Table')" @click="table_menu = !table_menu">
          <mdi-icon icon="mdi-table" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.AddImage')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.AddImage')" @click="addImage" :loading="image_is_loading">
          <mdi-icon icon="mdi-image" />
        </mdui-button-icon>
      </mdui-tooltip> -->

      <ColorSelect :model="vmodel" @color="color =>{
          editor.chain().focus().setColor(color).run()
        }" @clear="editor.chain().focus().unsetColor().run()" />


      <mdui-dropdown>
        <mdui-button-icon
          :style="{ 'width': model == 'maximize' ? '40px' : '28px', 'height': model == 'maximize' ? '40px' : '28px', }"
          slot="trigger">
          <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.HTitleGroup')">
            <mdi-icon icon="mdi-format-header-equal" />
          </mdui-tooltip>
        </mdui-button-icon>
        <mdui-menu dense>
          <mdui-menu-item @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            <mdi-icon icon="mdi-format-header-1" slot="icon" />
            {{ $t('Message.Components.Editor.H1') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            <mdi-icon icon="mdi-format-header-2" slot="icon" />
            {{ $t('Message.Components.Editor.H2') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            <mdi-icon icon="mdi-format-header-3" slot="icon" />
            {{ $t('Message.Components.Editor.H3') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
            <mdi-icon icon="mdi-format-header-4" slot="icon" />
            {{ $t('Message.Components.Editor.H4') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
            <mdi-icon icon="mdi-format-header-5" slot="icon" />
            {{ $t('Message.Components.Editor.H5') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
            <mdi-icon icon="mdi-format-header-6" slot="icon" />
            {{ $t('Message.Components.Editor.H6') }}
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>


      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.BulletList')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.BulletList')" @click="editor.chain().focus().toggleBulletList().run()"
          :variant="editor.isActive('bulletList')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-list-bulleted" />
        </mdui-button-icon>
      </mdui-tooltip>

      <!-- 其他按钮也加上 tooltip -->
      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.OrderedList')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.OrderedList')" @click="editor.chain().focus().toggleOrderedList().run()"
          :variant="editor.isActive('orderedList')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-list-numbered" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-dropdown>
        <mdui-button-icon
          :style="{ 'width': model == 'maximize' ? '40px' : '28px', 'height': model == 'maximize' ? '40px' : '28px', }"
          slot="trigger">
          <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.TextAlign')">
            <mdi-icon icon="mdi-format-align-center" />
          </mdui-tooltip>
        </mdui-button-icon>
        <mdui-menu dense>
          <mdui-menu-item @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          >
            <mdi-icon icon="mdi-format-align-left" slot="icon" />
            {{ $t('Message.Components.Editor.LeftAlign') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          >
            <mdi-icon icon="mdi-format-align-center" slot="icon" />
            {{ $t('Message.Components.Editor.CenterAlign') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          >
            <mdi-icon icon="mdi-format-align-right" slot="icon" />
            {{ $t('Message.Components.Editor.RightAlign') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          >
            <mdi-icon icon="mdi-align-vertical-distribute" slot="icon" />
            {{ $t('Message.Components.Editor.JustifyAlign') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
          >
            <mdi-icon icon="mdi-align-vertical-distribute" slot="icon" />
            {{ $t('Message.Components.Editor.ToggleRightAlign') }}
          </mdui-menu-item>
          <mdui-menu-item @click="editor.chain().focus().unsetTextAlign().run()">
            <mdi-icon icon="mdi-format-align-justify" slot="icon" />
            {{ $t('Message.Components.Editor.UnsetAlign') }}
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>

      <!-- <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.AddLink')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.AddLink')" @click="setLink"
          :variant="editor.isActive('link')?'tonal':'standard'">
          <mdi-icon icon="mdi-link-variant" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.UnsetLink')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.UnsetLink')" @click="editor.chain().focus().unsetLink().run()"
          :disabled="!editor.isActive('link')">
          <mdi-icon icon="mdi-link-variant-off" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.HorizontalRule')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.HorizontalRule')"
          @click="editor.chain().focus().setHorizontalRule().run()">
          <mdi-icon icon="mdi-minus" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.HardBreak')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.HardBreak')" @click="editor.chain().focus().setHardBreak().run()">
          <mdi-icon icon="mdi-arrow-down-right" />
        </mdui-button-icon>
      </mdui-tooltip> -->

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.Undo')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Undo')" @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()">
          <!-- <mdi-icon icon="mdi-undo" /> -->
          <mdi-icon icon="mdi-arrow-u-left-top" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.Redo')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Redo')" @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()">
          <!-- <mdi-icon icon="mdi-undo" /> -->
          <mdi-icon icon="mdi-arrow-u-right-top" />
        </mdui-button-icon>
      </mdui-tooltip>

    </div>

    <div v-show="table_menu" class="editor-toolbar">

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.ExitTable')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.ExitTable')" @click="table_menu = false" variant="tonal">
          <mdi-icon icon="mdi-chevron-left" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.InsertTable')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.InsertTable')"
          @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
          <mdi-icon icon="mdi-table-plus" />
        </mdui-button-icon>
      </mdui-tooltip>

      <!-- <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.InsertHTMLTable')">
        <mdui-button-icon :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.InsertHTMLTable')" 
          @click="editor.chain().focus().insertContent(tableHTML, { parseOptions: { preserveWhitespace: false } }).run()"
        >
          <mdi-icon icon="mdi-table-edit" />
        </mdui-button-icon>
      </mdui-tooltip> -->

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.AddColumnLeft')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.AddColumnLeft')" @click="editor.chain().focus().addColumnBefore().run()"
          :disabled="!editor.can().addColumnBefore()">
          <mdi-icon icon="mdi-table-column-plus-before" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.AddColumnRight')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.AddColumnRight')" @click="editor.chain().focus().addColumnAfter().run()"
          :disabled="!editor.can().addColumnAfter()">
          <mdi-icon icon="mdi-table-column-plus-after" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.AddRowAbove')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.AddRowAbove')" @click="editor.chain().focus().addRowBefore().run()"
          :disabled="!editor.can().addRowBefore()">
          <mdi-icon icon="mdi-table-row-plus-before" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.AddRowBelow')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.AddRowBelow')" @click="editor.chain().focus().addRowAfter().run()"
          :disabled="!editor.can().addRowAfter()">
          <mdi-icon icon="mdi-table-row-plus-after" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.MergeCells')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.MergeCells')" @click="editor.chain().focus().mergeCells().run()"
          :disabled="!editor.can().mergeCells()">
          <mdi-icon icon="mdi-table-merge-cells" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.SplitCell')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.SplitCell')" @click="editor.chain().focus().splitCell().run()"
          :disabled="!editor.can().splitCell()">
          <mdi-icon icon="mdi-table-split-cell" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="bottom" :content="$t('Message.Components.Editor.MergeOrSplitCell')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.MergeOrSplitCell')" @click="editor.chain().focus().mergeOrSplit().run()"
          :disabled="!editor.can().mergeOrSplit()">
          <mdi-icon icon="mdi-table-pivot" />
        </mdui-button-icon>
      </mdui-tooltip>

    </div>

    <EditorContent class="editor-content" style="overflow: auto;" :editor="editor" />

      <!-- <drag-handle v-if="editor" :editor="editor">
        <div class="custom-drag-handle" />
      </drag-handle> -->
    
    <!-- <div class="editor-content"  style="overflow: auto;">
      <EditorContent :editor="editor"/>
      <drag-handle :editor="editor">
        <div class="custom-drag-handle" />
      </drag-handle>
    </div> -->

    <div v-show="!table_menu" class="editor-toolbar">

      <mdui-button :loading="is_loading" :title="$t('Message.Components.Editor.Release')" @click="OnEditorSubmit()"
        :disabled="ReleaseButtonDisabled">
        {{ vsubmit_text||
        $t('Message.Components.Editor.Release')
        }}
      </mdui-button>

      <div class="flex-grow"></div>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Bold')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Bold')" @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :variant="editor.isActive('bold')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-bold" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Italic')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Italic')" @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :variant="editor.isActive('italic')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-italic" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Strike')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Strike')" @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :variant="editor.isActive('strike')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-strikethrough" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Code')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Code')" @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :variant="editor.isActive('code')?'tonal':'standard'">
          <mdi-icon icon="mdi-code-tags" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Paragraph')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Paragraph')" @click="editor.chain().focus().setParagraph().run()"
          :variant="editor.isActive('paragraph')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-paragraph" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.CodeBlock')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.CodeBlock')" @click="editor.chain().focus().toggleCodeBlock().run()"
          :variant="editor.isActive('codeBlock')?'tonal':'standard'">
          <mdi-icon icon="mdi-code-braces" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Blockquote')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Blockquote')" @click="editor.chain().focus().toggleBlockquote().run()"
          :variant="editor.isActive('blockquote')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-quote-close" />
        </mdui-button-icon>
      </mdui-tooltip>

      <!-- <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.ClearMarks')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.ClearMarks')" @click="editor.chain().focus().unsetAllMarks().run()"
          :variant="editor.isActive('code')?'tonal':'standard'">
          <mdi-icon icon="mdi-format-clear" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.ClearNodes')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.ClearNodes')" @click="editor.chain().focus().clearNodes().run()"
          :variant="editor.isActive('code')?'tonal':'standard'">
          <mdi-icon icon="mdi-close-network-outline" />
        </mdui-button-icon>
      </mdui-tooltip> -->

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.Delete')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.Delete')" @click="DeleteContentFromLocal"
          :variant="editor.isActive('blockquote')?'tonal':'standard'">
          <mdi-icon icon="mdi-delete" />
        </mdui-button-icon>
      </mdui-tooltip>
    </div>

    <div v-show="table_menu" class="editor-toolbar">

      <div class="flex-grow"></div>

      <!-- 转换为mdui风格的表格操作按钮 -->

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.ToggleHeaderColumn')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.ToggleHeaderColumn')"
          @click="editor.chain().focus().toggleHeaderColumn().run()" :disabled="!editor.can().toggleHeaderColumn()">
          <mdi-icon icon="mdi-table-column-width" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.ToggleHeaderRow')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.ToggleHeaderRow')"
          @click="editor.chain().focus().toggleHeaderRow().run()" :disabled="!editor.can().toggleHeaderRow()">
          <mdi-icon icon="mdi-table-row-height" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.ToggleHeaderCell')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.ToggleHeaderCell')"
          @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
          <mdi-icon icon="mdi-table-settings" />
        </mdui-button-icon>
      </mdui-tooltip>

      <!-- <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.SetCellProperties')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.SetCellProperties')"
          @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()"
          :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
          <mdi-icon icon="mdi-table-cog" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.FixTable')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.FixTable')" @click="editor.chain().focus().fixTables().run()"
          :disabled="!editor.can().fixTables()">
          <mdi-icon icon="mdi-table-alert" />
        </mdui-button-icon>
      </mdui-tooltip> -->

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.MoveToNextCell')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.MoveToNextCell')" @click="editor.chain().focus().goToNextCell().run()"
          :disabled="!editor.can().goToNextCell()">
          <mdi-icon icon="mdi-table-arrow-right" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.MoveToPreviousCell')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.MoveToPreviousCell')"
          @click="editor.chain().focus().goToPreviousCell().run()" :disabled="!editor.can().goToPreviousCell()">
          <mdi-icon icon="mdi-table-arrow-left" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.DeleteRow')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.DeleteRow')" @click="editor.chain().focus().deleteRow().run()"
          :disabled="!editor.can().deleteRow()">
          <mdi-icon icon="mdi-table-row-remove" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.DeleteColumn')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.DeleteColumn')" @click="editor.chain().focus().deleteColumn().run()"
          :disabled="!editor.can().deleteColumn()">
          <mdi-icon icon="mdi-table-column-remove" />
        </mdui-button-icon>
      </mdui-tooltip>

      <mdui-tooltip placement="top" :content="$t('Message.Components.Editor.DeleteTable')">
        <mdui-button-icon
          :style="{'width': model == 'maximize' ? '40px' : '28px','height': model == 'maximize' ? '40px' : '28px',}"
          :title="$t('Message.Components.Editor.DeleteTable')" @click="editor.chain().focus().deleteTable().run()"
          :disabled="!editor.can().deleteTable()">
          <mdi-icon icon="mdi-table-remove" />
        </mdui-button-icon>
      </mdui-tooltip>

    </div>

  </FabDialog>
</template>
<script>
import 'highlight.js/styles/github.css';
import { all, createLowlight } from 'lowlight'
import { Placeholder } from '@tiptap/extensions'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { StarterKit } from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'

import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'

import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Mention } from '@tiptap/extension-mention'
import suggestion from './components/mention/suggestion.js'

import { Details, DetailsContent, DetailsSummary } from '@tiptap/extension-details'

// import { DragHandle } from '@tiptap/extension-drag-handle-vue-3'
// import NodeRange from '@tiptap/extension-node-range'

import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import { mergeAttributes } from '@tiptap/core'

import ColorSelect from './components/color-select/index.vue'
import CodeBlockComponent from './components/code-block/index.vue'
import FabDialog from '@/components/fab-dialog/common-fab-dialog/index.vue'

import {
  AddQuestion,
  AddArticle,
  AddAnswer,
  EditQuestion,
  EditArticle,
  EditAnswer,
  UploadImage,
  GetBaseUrl,
  IsTauri,
  IsElectron,
  IsMobileApp,
} from '@/api/global.js'

const lowlight = createLowlight(all)
export default {
  props:{
    model:{
      type:String,
      default:'close'//,close
    },
    title:{
      type:String,
      default:''
    },
    icon:{
      type:String,
      default:'mdi-pencil-outline'
    },
    has_title:{
      type:Boolean,
      default:true
    },
    has_topic:{
      type:Boolean,
      default:true
    },
    submit_text:{
      type:String,
      default:''
    },
    edit_type:{
      type:String,
      default:'article'
    },
    edit_mode:{
      type:String,
      default:'new'
    },
    edit_mode_id:{
      type:Number,
      default:0
    },
    answer_to_question_id:{
      type:Number,
      default:0
    },
    md_title:{
      type:String,
      default:''
    },
    md_topics:{
      type:Array,
      default:[]
    },
    md_content:{
      type:String,
      default:''
    },
  },
  components: {
    EditorContent,
    // TopicSelectorDialog,
    FabDialog,
    ColorSelect,
    // CustomInput,
    // DragHandle,
  },
  data: () => ({
    vmodel: 'close',//maximize
    vtitle: '',
    vicon: 'mdi-pencil-outline',
    vhas_title: true,
    vhas_topic: true,
    vsubmit_text: '',
    vedit_type: 'article',
    vedit_mode: 'new',
    vedit_mode_id: 0,
    vanswer_to_question_id: 0,
    vmd_title:'',
    vmd_topics: [],
    vmd_content:'',
    editor: null,
    topic_selector_dialog: false,
    is_loading: false,
    image_is_loading: false,
    table_menu: false,
    tableHTML: `
      <table style="width:100%">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>`,
  }),
  computed:{
    ReleaseButtonDisabled(){
      const editor_content = this.editor.getText()
      switch(this.vedit_type){
        case 'article':
          return this.vmd_title == '' || editor_content == '' || this.vmd_topics.length == 0 || this.vmd_title.length > 40
        case 'question':
          return this.vmd_title == '' || editor_content== '' || this.vmd_topics.length == 0 || this.vmd_title.length > 40
        case 'answer':
          return editor_content == ''
      }
    }
  },
  // mounted() {
  // },
  created() {
    this.editor = new Editor({
      extensions: [
        Placeholder.configure({
          // Use a placeholder:
          placeholder: this.$t('Message.Components.Editor.PleaseAbideByTheLawsAndRegulationsOfYourLocationWhenPostingContent')
          // Use different placeholders depending on the node type:
          // placeholder: ({ node }) => {
          //   if (node.type.name === 'heading') {
          //     return 'What’s the title?'
          //   }

          //   return 'Can you add some further context?'
          // },
        }),
        Link.configure({
          openon_click: false,
          autolink: true,
          linkOnPaste: true,
        }),
        Image,
        StarterKit,
        Color,
        TextStyle,
        CodeBlockLowlight.extend({
          addNodeView() {
            return VueNodeViewRenderer(CodeBlockComponent)
          },
        }).configure({ lowlight }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Document,
        Paragraph,
        Text,
        Heading,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Typography,
        Details.configure({
          persist: true,
          HTMLAttributes: {
            class: 'details',
          },
        }),
        DetailsSummary,
        DetailsContent,
        Mention.configure({
          // suggestions: [
          //   {
          //     char: '@',
          //     // Other options of the Suggestion utility
          //   },
          //   {
          //     char: '#',
          //     // Other options of the Suggestion utility
          //   },
          // ],
          HTMLAttributes: {
            class: 'mention',
          },
          renderHTML({ options, node }) {
            // return [
            //   'a',
            //   mergeAttributes({ href:` /users/${node.attrs.id.user_id}` }, options.HTMLAttributes),
            //   `${node.attrs.label ?? node.attrs.id.username}`,
            //   // `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
            // ]

            //可以从此处记录回调保存用户为数组，发布内容成功后再通知被@的用户

            if(node.attrs.id.type=='user'){
              return [
                'a',
                mergeAttributes({ href:` /users/${node.attrs.id.data.user_id}` }, options.HTMLAttributes),
                `@${node.attrs.id.data.username}`,
              ]

              // <mdui-chip>Chip</mdui-chip>

              // return [
              //   'mdui-chip',
              //   mergeAttributes({ href:` /users/${node.attrs.id.data.user_id}` }, options.HTMLAttributes),
              //   `@${node.attrs.id.data.username}`,
              // ]
            }else if(node.attrs.id.type=='topic'){
              return [
                'a',
                mergeAttributes({ href:` /topics/${node.attrs.id.data.topic_id}` }, options.HTMLAttributes),
                `#${node.attrs.id.data.name}`,
              ]
            }
          },
          suggestions:suggestion,
        }),
        // NodeRange.configure({
        //   // allow to select only on depth 0
        //   // depth: 0,
        //   key: null,
        // }),
      ],
      // content: this.vmd_content,
      onUpdate: ({ editor }) => {
        // console.log(editor.getHTML())
        this.SaveContentToLocal()
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    // 封装单张图片上传逻辑（复用你的 UploadImage 方法）
    async uploadSingleImage(file) {
      try {
        // 1. 读取文件为 Base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        await new Promise(resolve => reader.onload = resolve) // 等待读取完成

        const base64data = reader.result.split(',')[1]

        // 2. 调用上传接口
        const response = await UploadImage({
          user_token: this.$G_GetUserToken(),
          type: this.vedit_type,
          image: base64data,
        })

        // 3. 返回上传结果
        if (response.data.is_upload) {
          return { success: true, url: response.data.upload_url }
        } else {
          return { success: false, error: '上传失败' }
        }
      } catch (error) {
        console.error('单张图片上传失败:', error)
        return { success: false, error: error.message }
      }
    },
    colorHandler(color) {
      this.editor.commands.setColor(color)
    },
    async addImage() {
      // 创建文件选择器
      const input = document.createElement('input');
      input.type = 'file';
      // input.accept = 'image/png'; // 可以根据需要更改文件类型限制
      // input.accept = 'image/png,image/jpg,image/jpeg,image/gif'; // 可以根据需要更改文件类型限制
      input.accept = 'image/png,image/jpg,image/jpeg'; // 可以根据需要更改文件类型限制
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // 使用 FileReader 读取文件数据并转换为 base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {

          this.image_is_loading = true

          const base64data = reader.result.split(',')[1]; // 获取 base64 格式的图片数据

          try {
            // 使用 Axios 发送 POST 请求上传图片
            const response = await UploadImage({
              user_token: this.$G_GetUserToken(),
              type: this.vedit_type,
              image: base64data, // 直接发送 base64 数据
            });

            // console.log('Upload image response:', response.data);

            // //只捕获从{到}的内容
            // const ress = response.data.match(/\{([^}]+)\}/g)
            // console.log('ress',ress)
            // //转换为json对象
            // const res = JSON.parse(ress[0])
            // console.log('res',res)

            // 如果成功获取到链接，则插入到编辑器中
            if (response.data.is_upload) {
              this.editor.chain().focus().setImage({ src: this.$G_ImgHandle(response.data.upload_url) }).run();
              this.image_is_loading = false
            } else {
              alert('Failed to upload image or get image URL');
              this.image_is_loading = false
            }
          } catch (error) {
            // console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
            this.image_is_loading = false
          }
        };
        reader.onerror = error => {
          // console.error('Error reading file:', error);
          alert('Error reading file. Please try again.');
          this.image_is_loading = false
        };
      };

      // 模拟点击文件选择器
      input.click();
    },
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)
      if (url === null) {
        return
      }
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()
        return
      }
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
    SaveAsDraftAndClose() {
      if (this.editor.getText() != '') {
        this.SaveContentToLocal()
        this.vmodel = 'minimize'
      } else {
        this.vmodel = 'close';
      }
    },
    SaveContentToLocal() {
      // console.log(this.editor.getJSON())
      // console.log(this.editor.getHTML())
      // console.log(this.editor.getText())
      if (this.editor.getText() != '') {
        var editor_type = this.vedit_type
        var json = JSON.stringify(this.editor.getJSON())
        if (editor_type == 'article') {
          localStorage.setItem('article_cache', json)
        } else if (editor_type == 'question') {
          localStorage.setItem('question_cache', json)
        } else if (editor_type == 'answer') {
          localStorage.setItem('answer_cache', json)
        }
      }
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
    DeleteContentFromLocal() {
      var editor_type = this.vedit_type
      if (editor_type == 'article') {
        localStorage.removeItem('article_cache')
      } else if (editor_type == 'question') {
        localStorage.removeItem('question_cache')
      } else if (editor_type == 'answer') {
        localStorage.removeItem('answer_cache')
      }
      this.editor.commands.setContent('')
      this.vmodel = 'close'
    },
    ResetEditorPos() {
      if (
        this.vmodel == 'minimize' ||
        this.vmodel == 'close'
      ) {
        return
      }
      const editor = document.getElementById('com-editor');
      editor.style.left = '0px';
      editor.style.top = '0px';
    },
    async OnEditorSubmit() {
      this.is_loading = true
      const question_id = this.vanswer_to_question_id
      const title = this.vmd_title
      const topics = this.vmd_topics.map((item) => item.topic_id)
      // const content_markdown = this.editor.getText()
      // const content_rendered = this.editor.getHTML()
      //进行转义
      const content_markdown = encodeURIComponent(this.editor.getText())
      let content_rendered = this.editor.getHTML()//encodeURIComponent(this.editor.getHTML())


      console.log('content_rendered1', content_rendered)
      if(IsTauri()||IsMobileApp()){//适配
        //把_content里面的 GetBaseUrl() + '/public/static/' 替换为 /public/static/
          const regex = '/public/static/';
          const newBaseUrl = GetBaseUrl() + '/public/static/';
          // 执行替换
        content_rendered = content_rendered.replaceAll(newBaseUrl, regex)
        console.log('content_rendered2', content_rendered)
      }
      content_rendered = encodeURIComponent(content_rendered)
      console.log('content_rendered3', content_rendered)


      // const content_rendered = this.editor.getJSON()//使用JSON存储
      const user_token = this.$G_GetUserToken()
        // this.is_loading = false//防止卡死
      if(this.vedit_mode=='new'){
        switch(this.edit_type){
          case 'article':
            this.AddArticle(title,topics,content_markdown,content_rendered,user_token)
            break
          case 'question':
            this.AddQuestion(title,topics,content_markdown,content_rendered,user_token)
            break
          case 'answer':
            this.AddAnswer(question_id,content_markdown,content_rendered,user_token)
            break
        }
      }else if(this.vedit_mode=='edit'){
        switch(this.edit_type){
          case 'article':
            this.EditArticle(this.vedit_mode_id,title,topics,content_markdown,content_rendered,user_token)
            break
          case 'question':
            this.EditQuestion(this.vedit_mode_id,title,topics,content_markdown,content_rendered,user_token)
            break
          case 'answer':
            this.EditAnswer(this.vedit_mode_id,content_markdown,content_rendered,user_token)
            break
        }
      }
    },
    async AddArticle(title,topics,content_markdown,content_rendered,user_token){
      const response = await AddArticle({
        title:title,
        topics:topics,
        content_markdown:content_markdown,
        content_rendered:content_rendered,
        user_token:user_token,
      })
      if(response.data.is_add == true){
        this.is_loading = false
        this.$emit('add_article',response.data.article)
        this.vmodel = 'close'
      }else{
        this.is_loading = false
      }
    },
    async AddQuestion(title,topics,content_markdown,content_rendered,user_token){
      const response = await AddQuestion({
        title:title,
        topics:topics,
        content_markdown:content_markdown,
        content_rendered:content_rendered,
        user_token:user_token,
      })
      if(response.data.is_add == true){
        this.is_loading = false
        this.$emit('add_question',response.data.question)
        this.vmodel = 'close'
      }else{
        this.is_loading = false
      }
    },
    async AddAnswer(question_id,content_markdown,content_rendered,user_token){
      const response = await AddAnswer({
        question_id:question_id,
        content_markdown:content_markdown,
        content_rendered:content_rendered,
        user_token:user_token,
      })
      if(response.data.is_add == true){
        this.is_loading = false
        this.$emit('add_answer',response.data.answer)
        this.vmodel = 'close'
      }else{
        this.is_loading = false
      }
    },
    async EditArticle(article_id,title,topics,content_markdown,content_rendered,user_token){
      const response = await EditArticle({
        article_id:article_id,
        title:title,
        topics:topics,
        content_markdown:content_markdown,
        content_rendered:content_rendered,
        user_token:user_token,
      })
      if(response.data.is_edit == true){
        this.is_loading = false
        this.$emit('edit_article',response.data.article)
        this.vmodel = 'close'
      }else{
        this.is_loading = false
      }
    },
    async EditQuestion(question_id,title,topics,content_markdown,content_rendered,user_token){
      const response = await EditQuestion({
        question_id:question_id,
        title:title,
        topics:topics,
        content_markdown:content_markdown,
        content_rendered:content_rendered,
        user_token:user_token,
      })
      if(response.data.is_edit == true){
        this.is_loading = false
        this.$emit('edit_question',response.data.question)
        this.vmodel = 'close'
      }else{
        this.is_loading = false
      }
    },
    async EditAnswer(answer_id,content_markdown,content_rendered,user_token){
      const response = await EditAnswer({
        answer_id:answer_id,
        content_markdown:content_markdown,
        content_rendered:content_rendered,
        user_token:user_token,
      })
      if(response.data.is_edit == true){
        this.is_loading = false
        this.$emit('edit_answer',response.data.answer)
        this.vmodel = 'close'
      }else{
        this.is_loading = false
      }
    },
    UpdateData(){
      this.vmodel = this.model
      this.vtitle = this.title
      this.vicon = this.icon
      this.vhas_title = this.has_title
      this.vhas_topic = this.has_topic
      this.vsubmit_text = this.submit_text
      this.vedit_type = this.edit_type
      this.vedit_mode = this.edit_mode
      this.vedit_mode_id = this.edit_mode_id
      this.vanswer_to_question_id = this.answer_to_question_id
      this.vmd_title = this.md_title
      this.vmd_topics = this.md_topics
    }
  },
  watch:{
    model(val){
      this.UpdateData()
    },
    md_topics(val){
      // console.log('md_topics',val)
      this.vmd_topics = null
      this.vmd_topics = val
    },
    md_content(val){
      this.vmd_content = val
      this.editor.commands.setContent(this.vmd_content)

      //使用JSON存储
      // if (val) {
      //   try {
      //     const value = JSON.parse(val)
      //     this.editor.commands.setContent(value)
      //   } catch (error) {
      //     console.error('Error parsing content:', error)
      //     this.editor.commands.setContent(val)
      //   }
      // }
    },
    vmodel(val){
      if(val == 'close'){
        this.$emit('model',val)
      }
    },
    '$route':{
      handler(val){
        this.vmodel = 'close'
      },
      immediate:true,
    },
  }
}
</script>
<style lang="less">
@import '../../vendor/variable.less';
@import '../tiptap-editor/index.less';
#mc-editor {
  .body {
    flex: 1;
    padding: 0 16px;
    overflow: hidden;
    .submit {
      min-width: 76px;
      margin-right: 10px;
    }
  }
  .editor-title-input{
    font-size: large;
    border-radius: 8px;
    width: 100%;
    height: 46px;
    padding: 10px;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid rgb(var(--mdui-color-secondary-container));
  }
  .editor-title {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 48px;
    font-size: 16px;
    line-height: 34px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    outline: none;
    .mdui-theme-dark & {
      border-color: rgba(255, 255, 255, .12);
    }
  }
  .editor-topics {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    .mdui-theme-dark & {
      border-color: rgba(255, 255, 255, .12);
    }
    .placeholder,
    .chip-wrapper {
      display: flex;
      flex: 1;
      align-items: center;
      height: 100%;
      user-select: none;
    }
    .placeholder {
      color: rgba(0, 0, 0, .42);
      cursor: pointer;
      .mdui-theme-dark & {
        color: rgba(255, 255, 255, .42);
      }
    }
  }
  .editor-toolbar {
    overflow-x: hidden;
    display: flex;
    align-items: center;
    padding: 12px 0;
    box-shadow: inset 0 1px 0 0 rgba(100, 121, 143, 0.122);
    .mdui-theme-dark & {
      .editor-toolbar-menu-active {
        background-color: #565656 !important;
      }
      i {
        color: #fff;
      }
    }
  }
  .editor-content {
    // #tippy-2{
    //   inset: 0 0 auto 10px;
    // }
    // height: calc(~'100% - 112px');
    height: calc(~'100% - 136px');
    padding: 10px 0;
    // &::before {
    //   .mdui-theme-dark & {
    //     color: rgba(255, 255, 255, .42);
    //   }
    // }

    // img {
    //   // max-width: 100%;
    //   max-width: 96%;
    //   margin: 8px;
    //   height: auto;
    //   border-radius: 8px;

    //   &.ProseMirror-selectednode {
    //     outline: 3px solid rgb(var(--mdui-color-primary));
    //     // .theme--dark & {
    //     // outline: 3px solid var(--v-dark-accent);
    //     // }
    //   }
    // }
    // code {
    //   background-color: rgba(223, 223, 223, 0.5);
    //   .mdui-theme-dark & {
    //     background-color: rgba(66, 66, 66, 0.7);
    //   }
    // }
    // pre {
    //   outline: none;
    //   box-shadow: none;
    //   font-family: 'JetBrainsMono', monospace;
    //   code {
    //     background-color: rgba(247, 247, 249, 0) !important;
    //     padding-left: 6px;
    //     padding-right: 6px;
    //     background: none;
    //     font-size: 0.8rem;
    //   }
    //   .hljs-comment,
    //   .hljs-quote {
    //     color: #616161;
    //   }
    //   .hljs-variable,
    //   .hljs-template-variable,
    //   .hljs-attribute,
    //   .hljs-tag,
    //   .hljs-name,
    //   .hljs-regexp,
    //   .hljs-link,
    //   .hljs-name,
    //   .hljs-selector-id,
    //   .hljs-selector-class {
    //     color: #F98181;
    //   }
    //   .hljs-number,
    //   .hljs-meta,
    //   .hljs-built_in,
    //   .hljs-builtin-name,
    //   .hljs-literal,
    //   .hljs-type,
    //   .hljs-params {
    //     color: #FBBC88;
    //   }
    //   .hljs-string,
    //   .hljs-symbol,
    //   .hljs-bullet {
    //     color: #B9F18D;
    //   }
    //   .hljs-keyword,
    //   .hljs-selector-tag {
    //     color: #70CFF8;
    //   }
    //   .hljs-emphasis {
    //     font-style: italic;
    //   }
    //   .hljs-strong {
    //     font-weight: 700;
    //   }
    // }
    
  }


  &.with-title,
  &.with-topics {
    .editor-content {
      height: calc(~'100% - 208px');
    }
  }
  &.with-title.with-topics {
    .editor-content {
      // height: calc(~'100% - 230px');
      // height: calc(~'100% - 220px');
      height: calc(~'100% - 230px');
    }
  }
  &.with-title.with-topics.maximize {
    .editor-content {
      height: calc(~'100% - 242px');
    }
  }
  &.maximize,
  &.rounded-xxl.maximize {
    .editor-content {
      // height: calc(~'100% - 124px');
      height: calc(~'100% - 148px');
    }
  }
  .editor-toolbar-menu-italic,
  .editor-toolbar-menu-code,
  .editor-toolbar-menu-ol,
  .editor-toolbar-menu-ul {
    display: none;
  }
  .editor-toolbar-menu {
    width: 36px;
    min-width: 36px;
    height: 36px;
    line-height: 36px;
    i {
      font-size: 22px;
    }
  }
}
</style>