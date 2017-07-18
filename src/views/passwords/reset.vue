<template>
<div>
    <reset-password v-if="loaded" v-show="!submitted"
     :user_id="user_id"  :token="token"
     @success="onSuccess" @failed="onFailed">
      
    </reset-password>
    <div v-if="submitted">
       
        <article  v-if="success" class="message is-success">
             <div class="message-body title">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                重設密碼成功。 

                <p style="line-height:2;font-size:0.8em">
                 本視窗將在 <em v-text="seconds"  style="color:blue;"></em> 後重新導向至首頁
                </p> 
              </div>
          
        
         </article>
     
       
        
          <article v-else class="message is-danger">
              <div class="message-body title">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                驗證失敗 

                <p style="line-height:2;font-size:0.8em">
                可能的失敗原因：您輸入的Email錯誤 或 驗證碼已過期
                </p> 
              </div>
           </article>
         
     
    </div>





</div>
</template>

<script>
    import ResetPassword from '../../components/password/reset.vue'
   
    export default {
        name:'ResetPasswordView',
        components:{
         'reset-password':ResetPassword,
         
        },
        beforeMount(){
           this.init()
        },
        data(){
            return{
                user_id:'',
                token:'',
                
                submitted:false,
                success:false,

                count:3, 
            }
        },
        watch: {
           '$route': 'init'
        },
        computed:{
            seconds(){
                return this.count + ' 秒'
            },
            loaded(){
                if(!this.user_id) return false 
                if(!this.token) return false 
                return true
            }
        },
        methods:{
            init(){
                this.user_id=''
                this.token=''
                this.submitted=false
                this.success=false
                this.count=3 
                
                if(this.$route.query){
                    let token=this.$route.query.token
                    let user_id=this.$route.query.user
                    this.user_id=user_id
                    this.token=token
                }
                
            },
            onSuccess(user){
               this.submitted=true
               this.success=true
               this.countDown()
            },
            onFailed(){
               this.submitted=true
               this.success=false
            },
            countDown(){
                window.setInterval(() => {
                    if (this.count > 1) {
                        this.count--;
                    } else {
                        let url=Helper.getHomeUrl()
                         document.location = url
                    }
                },1000);
               
            },
            
            redirect(){
               this.$router.push('/')
            }
        },
        
    }
</script>