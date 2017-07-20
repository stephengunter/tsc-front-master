<template>
<div v-if="isAuth">
    <div v-if="isReadonly" class="panel">
      <div class="panel-heading panel-title heading" >
        個人資訊
        <a class="button is-info is-outlined" @click.prevent="beginEdit">
           <span class="icon">
             <i class="fa fa-pencil fa-1" aria-hidden="true"></i>
           </span> 
           <span>修改</span>
        </a>
      </div>
       <div  class="panel-block info">
            <div class="columns is-multiline" style="width:100%">                
                <div :class="columnClass">
                     姓名：{{  user.profile.fullname }}           
                </div>
                 <div :class="columnClass">
                     性別： {{  user.genderText }}        
                </div>
                <div :class="columnClass">
                     電話： {{  user.phone }}    
                </div>
                
                <div :class="columnClass">
                     生日： {{ user.profile.dob }}  
                </div>
            </div>
       </div>
      
    </div>   <!--  end panel -->
    
   <modal :width="1000"  :show-footer="false"  :is-show="showConfirm" @close="endEdit">     
        <edit-profile :id="user.id" v-if="!isReadonly" @cencel="endEdit"
           :edit_photo="false" @saved="onUserSaved" >
             
         </edit-profile>
   </modal>
   
         
</div>   
</template>


<script>
    import EditProfile from  '../../components/profile/edit.vue'
    export default {
        name:'SignupProfile',
        components:{
           'edit-profile':EditProfile,
        },        
        data(){
            return{
                user:{},
                isAuth:false,
                isReadonly:true,
                showConfirm:false,
                columnClass:'column is-one-quater-mobile is-half-tablet is-half-desktop'
            }
        },
        beforeMount() {
         this.init()
        }, 
        methods:{
            init(){
               this.isAuth=false
               this.getUser()
            },
            getUser(){
                let user_id=Number(this.$auth.user_id())
                if(!user_id) {
                   this.isAuth=false
                   return false
                }

                let getData=User.show(user_id) 
                getData.then(data => {
                    this.setUser(data.user)
                    this.isAuth=true
                })
                .catch(error => {
                   this.isAuth=false
                   this.$emit('error')
                })
              
            },
            setUser(user){
                this.user =new User(user)
            },
            beginEdit(){
                this.showConfirm=true
                this.isReadonly=false
            },
            endEdit(){
                this.showConfirm=false
                this.isReadonly=true
            },
            onUserSaved(user){
               this.setUser(user)
               this.endEdit()
            }
           

        }
    }  
</script>
