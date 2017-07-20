<template>
<div v-show="loaded">
  <h2 class="title is-3">報名繳費紀錄</h2>
  <div v-if="!noData">
     <card v-for="signup in signupList" :entity="signup"
      @cencel="onCancelClick">
     </card>
  </div>
  <div v-show="noData" class="box">
        <div class="columns is-multiline info" style="width:100%">
            <div :class="columnClass">
                  查無資料
            </div>
            
        </div>
  </div>

  
    <modal  :show-header="false"  :is-show="confirmSettings.show" 
           :on-ok="cancelSignup" ok-text="確定" cancel-text="取消"
            @close="confirmSettings.show=false">     
         <article class="message is-danger">
            <div class="message-header">
                <p style="font-weight: bold;font-size:19px">
                <i class="fa fa-exclamation-triangle"></i>
                    警告
                </p>
            </div>
            <div class="message-body info">
               確定要取消報名『{{ confirmSettings.msg  }}』？
            </div>
          </article>
    </modal>
  
</div>
</template>


<script>
  import Card from  '../../components/signup/card.vue'
  export default {
    name:'SignupIndex',
    components:{
       Card
    },
    data(){
       return {
          loaded:false,
          userId:0,
          deleteId:0,
          signupList:[],

          confirmSettings:{
            show:false,
            msg:''
          },
          columnClass:'column is-one-quater-mobile is-half-tablet is-half-desktop'
         


       }
    },
    computed:{
        noData(){
            return this.signupList.length < 1
        },
            
    },
    beforeMount() {
         this.init()
    }, 
    methods:{
        init(){
            this.showConfirm=false
            this.signupList=[]
            this.deleteId=0

            this.userId=this.$auth.user_id()
            if(!this.userId){
                this.authFailed()
            }else{
               
               this.fetchData()
            }

                
        },
        authFailed(){
            this.$auth.logout()
            let returnUrl=this.$route.path
            this.$router.push('/login?return=' + returnUrl)
        },
        fetchData() {
            let getData=Signup.records()
            getData.then(data => {
                this.signupList=data.signupList
                this.loaded=true
            })
            .catch(error=> {
               Bus.$emit('errors',error)
            })
        },  
        
        checkAuth(){
            return new Promise((resolve, reject) =>{
                let authenticated=this.$auth.isAuthenticated()
                authenticated.then(()=>{
                    resolve(true)
                     
                }).catch(error => {
                      reject(error) 
                })
            
            })
        },
        cencelEdit(){
           this.$emit('cencelEdit')
        },
        onCancelClick(values) {

           this.deleteId=values.id
           this.confirmSettings.msg=values.name
           this.confirmSettings.show=true
        },
        cancelSignup(){
            let checkAuth=this.checkAuth()
            checkAuth.then(() => {
                 let cancel =Signup.delete(this.deleteId)                 
                 cancel.then(result => {
                    this.init()
                    Bus.$emit('okmsg','報名已取消')
                 })
                 .catch(error => {
                    let msg='取消報名失敗. '
                    if(error.response.data.msg){
                       msg += error.response.data.msg
                    }
                    Bus.$emit('errors',error, msg)
                       
                 })
            }).catch(error => {
                this.authFailed()
            })

            
        },
        
        
     }
  }

    
</script>


<style>

</style>