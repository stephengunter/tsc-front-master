<template>
<div v-if="loaded">
    <div v-if="submitted">
        <div v-if="success">
            <article class="message is-success">
                <div class="message-body">
                    <p class="title is-3">
                       系統已發送會員認證信到您的電子信箱 <span v-text="user.email" ></span>
                    </p>
                     
                    <p style="line-height:2;">
                        <em style="color:blue;">驗證碼於24小時內有效</em>，驗證成功即成為本站會員。
                    </p>
                </div>
            </article>
             
        </div>
        <div v-else>
            <article class="message is-danger">
                <div class="message-body title">
                    <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                    重發認證信失敗  
                </div>
            </article>
           
        </div>
       
    </div> 
    <div v-else>
        <article class="message is-warning">
                <div class="message-body">
                    <p class="title is-3">
                       您的會員帳號尚未完成Email認證
                    </p>
                     
                    <p style="line-height:2;font-size:1.2em">
                      請至您註冊的電子信箱 <span v-text="user.email" ></span> 開啟我們mail給您的會員認證信來完成認證。
                    </p>
                    <p style="line-height:2;color:red;font-size:1.2em" >
                      ※您必須完成Email認證才可開通會員權限
                    </p>
                    <p >
                        <form v-if="user.email"  @submit.prevent="onSubmit">
                          <button type="submit" class="button is-info">重發認證信</button>
                        </form>
                    </p>
                </div>
        </article>
   
    </div>

</div>


</template>

<script>


    export default {
        name:'EmailConfirmation',
        beforeMount(){
           this.init()
        },
        data(){
            return{
                loaded:false,
                user:{
                    email:'',
                    phone:''
                },
                submitted:false,   
                success:false
            }
        },
        
        methods:{
            init(){
                if(this.$route.query){
                    let email=this.$route.query.email
                    if(email){
                        this.user.email=email
                    }else{
                        let phone=this.$route.query.phone
                        this.user.phone=phone
                    }
                  
                    this.loaded=true
                   
                }
                
                
            },
            redirect(){
               this.$router.push('/')
            },
            onSubmit(){
               let send=Register.sendMail(this.user.email)
               
               send.then(response => {
                  this.submitted=true
                  this.success=true
               })
               .catch(error => {
                    this.submitted=true
                    this.success=false
               })
               
            },
        },
        
    }
</script>