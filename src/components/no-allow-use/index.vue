<template>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
        <span class="mdi mdi-cloud-alert" style="font-size: 250px;color:red;"></span>

        <h1 style="margin: 0;">{{ $t('Message.App.TheCurrentDomainNameIsNotAvailable') }}</h1>
        <h3 style="margin: 0;">{{ $t('Message.App.PleaseContactYourApplicationServiceProvider') }}</h3>
        <a
          href="/admin/options"
        >{{ $t('Message.App.InTheManagementPanelSettingsAbout') }}</a>
      </div>
</template>
<script>
export default {
    name: 'NoAllowUse',
}
</script>