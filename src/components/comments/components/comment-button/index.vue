<template>
  
  <IconButton 
  icon="mdi-message-reply-text" 
  :text="$t('Message.Client.Question.CommentButton.Comment')" 
  :count="count"
    @icon_button_click="$emit('comment_button_click')">

  </IconButton>
</template>
<script>
import IconButton from '@/components/icon-button/index.vue'
export default {
  components: {
    IconButton,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      is_followed: false,
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>