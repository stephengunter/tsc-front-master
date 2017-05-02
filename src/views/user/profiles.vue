<template>
    <div v-if="isAuth">
        
          <profile :user="user"  v-if="isReadonly"  @beginEdit="isReadonly=false"></profile>
          <edit-profile :id="user.id" v-if="!isReadonly" @cencelEdit="isReadonly=true"
            @saved="onUserSaved" @photoChanged="onPhotoChanged"></edit-profile>
         
          
    </div>  
</template>


<script>
  import Profile from  '../../components/user/profile.vue'
  import EditProfile from  '../../components/user/edit-profile.vue'
  export default {
      name:'ProfilesView',
      components:{
         Profile,
         'edit-profile':EditProfile,
         
      },
      beforeMount() {
          this.init()
      },
      data(){
          return{
              isAuth:false,
              isReadonly:true,
              user:{},
          }
      },
      methods:{
          init(){
              this.isReadonly=true
              this.isAuth=false
              this.getUser()
          },
          getUser(){
                let user=this.$auth.getUser()
                user.then(()=>{
                      let user_id=this.$auth.user_id()
                      let url=Helper.getUrl('/api/users/') + user_id + '/edit'          
                      axios.get(url)
                      .then(response => {
                          this.user =new User(response.data.user)
                          this.isAuth=true
                      })
                      .catch(function(error) {
                         this.isAuth=false
                        
                      })
                     
                }).catch(error => {
                      this.isAuth=false
                    
                })
              
            },
          beginEdit(){
              this.isReadonly=false
          },
          onSubmit(){

          },
          onPhotoChanged(photo){
               let updatePhoto=this.user.updatePhoto(photo)
                updatePhoto.then(result => {
                   
                 })
                 .catch(error => {
                   
                 })
          },
          onUserSaved(user){
             this.init()
          }
         

      }
  }  
</script>


<style>
.info-description {
    font-size:17px;
}
.panel-title{
  font-size: 1.7rem;
}

.info {
    font-size:17px;
}
.order-td{
    width: 10%;
    text-align: center;
}
.heading {
    display: -webkit-box;
    display: -ms-flexbox;
   display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
     -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

    
</style>