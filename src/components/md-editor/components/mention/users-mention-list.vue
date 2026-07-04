<template>
  <!-- v-show="items.length>0" -->
  <mdui-menu dense class="dropdown-menu" style="z-index: 2002;" selects="single" :value="selectedIndex">
    <template v-if="items.length > 0">

      <mdui-menu-item v-for="(item, index) in items" :key="index" :value="index" @click="selectItem(index)">

        <img slot="icon" :src="$G_ImgHandle(item.avatar.small)" style="width: 24px; height: 24px; border-radius: 50%;">

        {{ item.username }}
      </mdui-menu-item>

    </template>

  </mdui-menu>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        // this.command({ id: item ,type:'user'})
        // this.command({ data: item ,id:'user'})

        // this.command({class:'user'})
        // this.command({id:item})
        this.command({
          id: {
            type: 'user',
            data: item
          }
        })

      }
    },
  },
}
</script>

<!-- <script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
      users: null,
      IsLoading: false,
      pagination: {
        page: 0,
        per_page: 20,
        total: 0,
        pages: 0,
        previous: 0,
        next: 1
      },
    }
  },
  watch: {
    items() {
      this.selectedIndex = 0
    },
  },
  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },
    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length
    },
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },
    enterHandler() {
      this.selectItem(this.selectedIndex)
    },
    selectItem(index) {
      const item = this.items[index]
      if (item) {
        // this.command({ id: item })
        this.command({ id: item })
      }
    },
  },
}
</script> -->

<style lang="less">
/* Dropdown menu */
.dropdown-menu {
  // background: white;
  // border: 1px solid var(--gray-1);
  // border-radius: 0.7rem;
  // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  // display: flex;
  // flex-direction: column;
  // gap: 0.1rem;
  // overflow: auto;
  // padding: 0.4rem;
  // position: relative;

  // button {
  //   align-items: center;
  //   background-color: transparent;
  //   display: flex;
  //   gap: 0.25rem;
  //   text-align: left;
  //   width: 100%;

  //   &:hover,
  //   &:hover.is-selected {
  //     background-color: gray;
  //   }

  //   &.is-selected {
  //     background-color: gray;
  //   }
  // }
}
</style>