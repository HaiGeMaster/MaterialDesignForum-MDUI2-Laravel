<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
        <!-- color="red" -->
        <mdi-icon styles="font-size: 250px;" icon="mdi-account-alert"></mdi-icon>
        <h1>{{ $t('Message.App.InsufficientPermissions') }}</h1>
        <h3>{{ $t('Message.App.YouNeedToLogInToAccessThisPage') }}</h3>
        <!-- <a
          href="/admin/options"
        >{{ $t('Message.App.InTheManagementPanelSettingsAbout') }}</a> -->
      </div>
</template>
<script>
export default {
    name: 'NeedLoginAccess',
}
</script>