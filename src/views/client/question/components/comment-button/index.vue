<template>
    <mdui-button-icon :variant="variant">
        <mdi-icon icon="mdi-message-reply-text" />
    </mdui-button-icon>
</template>
<script>
export default {
    name: 'comment-button',
    props:{
        variant:{
            type:String,
            default:'standard'
        },
    },
    components: {
    },
    data() {
        return {
                    };
    },
};
</script>

<style lang="less">
@import './index.less';
</style>