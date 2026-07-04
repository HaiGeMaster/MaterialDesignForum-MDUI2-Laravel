<template>
   

   <mdui-button-icon class="edit" variant="filled"
      v-show="$G_GetUserID() == user.user_id" 
      @click="Set_EditInfoDialog" 
      :disabled="!$store.getters['User/GetUser'].user_group['ability_edit_own_info']"
   >
      <mdi-icon 
         :icon="!$store.getters['User/GetUser'].user_group['ability_edit_own_info']?
         'mdi-pencil-off' : 'mdi-pencil'"
      />

   </mdui-button-icon>
</template>
<script>
export default {
   props: {
      user: {
         type: Object,
         default: null
      }
   },
   methods:{
      Set_EditInfoDialog(){
         if(!this.$store.getters['User/GetUser'].user_group['ability_edit_own_info']){
            return
         }
         
         this.$store.dispatch('Dialog/Set_EditInfoDialog', {
            model: true,
            user: this.user
         })
      }
   }
}
</script>