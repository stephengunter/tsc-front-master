<template>
    
    
      <show-profile v-if="readonly"  :id="user_id"   @edit="readonly=false"></show-profile>
      <edit-profile v-else :id="user_id"  @cencel="readonly=true"
        @saved="onUserSaved" ></edit-profile>
         
          
   
</template>


<script>
  import ShowProfile from '../../components/profile/show.vue'
  import EditProfile from '../../components/profile/edit.vue'
  
  export default {
      name:'ProfilesView',
      components:{
         'show-profile':ShowProfile,
         'edit-profile':EditProfile,
         
      },
      beforeMount() {
          this.init()
      },
      data(){
          return{
             
              readonly:true,
              user_id:0
          }
      },
      methods:{
          init(){
              this.readonly=true
              
              let userId=this.$auth.user_id()
              if(userId){
                  this.user_id=Number(userId)
              }
          },
          
          beginEdit(){
              this.isReadonly=false
          },
          onUserSaved(user){
             this.readonly=true
          }
         

      }
  }  
</script>


<style>
    
</style>