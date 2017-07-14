<template>
<div>
  <h2 class="title is-3">報名繳費紀錄</h2>
  <card v-for="signup in signupList" :signup="signup" @cencel="confirmCancellation"></card>
  
  <div v-show="noData" class="box">
        <div class="columns is-multiline info" style="width:100%">
            <div :class="columnClass">
                  查無資料
            </div>
            
        </div>
  </div>

  <div>
    <modal  :show-header="false"  :is-show="showConfirm" :on-ok="cancelSignup" ok-text="確定" cancel-text="取消" @close="showConfirm=false">     
         <article class="message is-danger">
            <div class="message-header">
                <p style="font-weight: bold;font-size:19px">
                <i class="fa fa-exclamation-triangle"></i>
                    警告
                </p>
            </div>
            <div class="message-body info">
               確定要取消報名？
            </div>
          </article>
    </modal>
  </div>
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
          userId:0,
          deleteId:0,
          signupList:[],
          noData:false,
          showConfirm:false,
          columnClass:'column is-one-quater-mobile is-half-tablet is-half-desktop'
         
       }
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
            let url =Helper.getUrl('/api/signups/getByUser/' + this.userId)                
            axios.get(url)
                .then(response => {
                    let signupList = response.data.signupList
                    this.signupList=[]
                    for (var i = 0; i < signupList.length; i++) {
                       this.signupList.push(new Signup(signupList[0]))
                    }
                    this.checkData()
                })
                .catch(function(error) {
                   Bus.$emit('errors',error)
                })
        },  
        checkData(){
            if(this.signupList.length) this.noData=false
              else this.noData=true
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
        confirmCancellation(id) {
           this.deleteId=id
           this.showConfirm=true
           
        },
        cancelSignup(){
            let checkAuth=this.checkAuth()
            checkAuth.then(() => {
                 let url = Helper.getUrl('/api/signups/' + this.deleteId)
                 let form=new Form()
                 form.delete(url)
                 .then(result => {
                    this.init()
                    Bus.$emit('okmsg','報名已取消')
                 })
                 .catch(error => {
                    let msg='取消報名失敗. '
                    if(error.msg){
                       msg += error.msg
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