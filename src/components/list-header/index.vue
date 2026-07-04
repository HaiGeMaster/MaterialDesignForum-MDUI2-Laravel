<template>
  <div class='mc-list-header'>
    <mdui-button icon v-if="show_close" class="close" @click="list_header_close_click()">
      <mdi-icon icon="mdi-close"></mdi-icon>
    </mdui-button>
    <div class="title">
      {{ title }}
    </div>
    <div class="flex-grow"></div>
    <mdui-dropdown>
      <mdui-button slot="trigger" variant="tonal">
        {{ $t(menu_title) }}
        <mdi-icon 
        slot="end-icon"
        icon="mdi-menu-down"></mdi-icon>
      </mdui-button>
      <mdui-menu>
        <mdui-menu-item v-for="items in item[type]" :key="item.name" @click="menu_order_item_select(items)"
          :active="menu_title == items.name"
          >
          <mdi-icon
            :icon="items.icon"
            slot="icon"
            ></mdi-icon>
            {{ $t(items.name) }}
        </mdui-menu-item>
      </mdui-menu>
    </mdui-dropdown>
  </div>
</template>
<script>
export default {
  name: 'list-header',
  props: {
    title: {
      type: String,
      default: 'Test',
    },
    show_close: {
      Boolean,
      default: false
    },
    show_menu: {
      Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'answers',
    }
  },
  data: () => ({
    menu_title: '',
    item: {
      topics: [
        {
          order: '-update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromLateToEarly',
          icon: 'mdi-sort-clock-descending-outline',
        },
        {
          order: '+update_time',
          name: 'Message.Client.Topic.Contexts.UpdateTimeFromEarlyToLate',
          icon: 'mdi-sort-clock-ascending-outline',
        },
        {
          order: '-vote_count',
          name: 'Message.Client.Topic.Contexts.Hottest',
          icon: 'mdi-fire',
        },
      ],
      users_1: [
        {
          order: '-update_time',
          name: 'Message.Client.User.Contexts.UpdateTimeFromLateToEarly',
          icon: 'mdi-sort-clock-descending-outline',
        },
        {
          order: '+update_time',
          name: 'Message.Client.User.Contexts.UpdateTimeFromEarlyToLate',
          icon: 'mdi-sort-clock-ascending-outline',
        },
      ],
      users_2: [
        {
          order: '-create_time',
          name: 'Message.Client.User.Contexts.ReleaseTimeFromLateToEarly',
          icon: 'mdi-sort-clock-descending-outline',
        },
        {
          order: '-create_time',
          name: 'Message.Client.User.Contexts.ReleaseTimeFromEarlyToLate',
          icon: 'mdi-sort-clock-ascending-outline',
        },
        {
          order: '-vote_count',
          name: 'Message.Client.User.Contexts.MostPopular',
          icon: 'mdi-fire',
        },
      ],
    },
    select_icon: 'mdi-sort-clock-descending-outline',
  }),
  methods: {
    menu_order_item_select(items) {
      this.menu_title = items.name
      this.select_icon = items.icon
      this.$emit('menu_order_item_select', items.name, items.order)
    },
    list_header_close_click() {
      this.$emit('list_header_close_click')
    }
  },
  created() {
    this.menu_title = this.item[this.type][0].name
  },
  watch: {
    type(val) {
      this.menu_title = this.item[this.type][0].name
      this.$emit('OnInit', this.item[this.type][0].order)
    }
  }
};
</script>
<style lang="less">
@import "../../vendor/variable.less";

.mc-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 18px;
    margin: 8px;
  }

  .menu {
    width: 236px;
  }

  @media (max-width: @screen-xs-max) {
    .title {
      font-size: 16px;
      margin: 4px;
    }
  }
}
</style>