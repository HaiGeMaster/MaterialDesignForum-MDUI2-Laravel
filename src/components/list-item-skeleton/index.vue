<template>
    <mdui-list-item nonclickable class="list-item">
        <div class="skeleton-item-circle" slot="icon" style="margin: 0;"></div>
        <div class="skeleton-item" style="width: 25%;margin-bottom: 4px;height: 18px;" ></div>
        <div class="skeleton-item" style="width: 50%;margin: 0;height: 16px;" slot="description"></div>
        <div class="skeleton-item" style="width: 15%;margin: 0;" slot="end-icon"></div>
    </mdui-list-item>
</template>
<script>
export default{
    name: 'list-item-skeleton',
}
</script>
<style lang="less">
@import '../list-item/index.less';
</style>