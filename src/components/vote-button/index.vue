<template>
  <div class="mc-vote" v-if="!$store.getters['User/GetIsLogin']||
  ($store.getters['User/GetIsLogin']&&$store.getters['User/GetUser'].user_group['ability_vote'])">
    
    <mdui-tooltip :content="$t('Message.Components.VoteButton.Up')" placement="bottom">
      <mdui-button variant="tonal"
        :loading="up_is_loading"
        @click.stop.prevent="Vote(vote.votable_id, vote.votable_type, 'up')"
      >
        <mdi-icon slot="icon" :icon="up_value ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"></mdi-icon>
        
        {{ up_count }}
        
        
      </mdui-button>
    </mdui-tooltip>
    <mdui-tooltip :content="$t('Message.Components.VoteButton.Down')" placement="bottom">
      <mdui-button variant="tonal"
        style="margin-left: 8px;"
        :loading="down_is_loading"
        @click.stop.prevent="Vote(vote.votable_id, vote.votable_type, 'down')"
      >
        <mdi-icon slot="icon" :icon="down_value ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"></mdi-icon>
        
        {{ down_count }}
        
        
      </mdui-button>
    </mdui-tooltip>
  </div>
</template>
<script>
import {
  Vote
} from '@/api/global.js'
export default {
  name: 'vote',
  components: {
  },
  props: {
    vote: {
      type: Object,
      default: null,
    },
    vote_down_count: {
      type: Number,
      default: 0,
    },
    vote_up_count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      up_is_loading: false,
      down_is_loading: false,
      up_count: 0,
      down_count: 0,
      up_value: false,
      down_value: false,
    };
  },
  methods: {
    async Vote(votable_id, votable_type, type) {
      if (!this.$store.getters['User/GetIsLogin']) {
        this.$store.dispatch('Dialog/Set_LoginDialog', true)
        this.$store.dispatch('Snackbar/Show_Snackbar', {
          text: this.$t('Message.Components.Account.YouMustLoginToUseThisFeature'),
        })
        return
      }
      if (type == 'up') {
        this.up_is_loading = true;
      } else if (type == 'down') {
        this.down_is_loading = true;
      }
      const response = await Vote({
        user_token: this.$G_GetUserToken(),
        votable_id: votable_id,
        votable_type: votable_type,
        type: type,
      });
      this.up_count = response.data.vote.up.count
      this.down_count = response.data.vote.down.count
      this.up_value = response.data.vote.up.value
      this.down_value = response.data.vote.down.value
      this.up_is_loading = false;
      this.down_is_loading = false;
      this.$forceUpdate();
    }
  },
  watch: {
    vote: {
      handler(val) {
        this.up_count = val.up.count
        this.down_count = val.down.count
        this.up_value = val.up.value
        this.down_value = val.down.value
      },
      immediate: true,
      deep: true
    },
  }
}
</script>