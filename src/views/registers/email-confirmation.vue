<template>
<div v-if="loaded">
    <div v-if="confirmed">
        <article class="message is-success">
            <div class="message-body">
                <p class="title is-3">
                   <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                   您已通過Email驗證. 歡迎您成為本站會員! 
                </p>
                 
                <p style="line-height:2;">
                本視窗將在 <em v-text="seconds"  style="color:blue;"></em> 後重新導向至首頁 
                </p>
            </div>
        
        </article>
            
    </div>
    <div v-else>
        <article class="message is-danger">
            <div class="message-body title">
                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                驗證失敗  
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
                confirmed:false,

                count:3, 
            }
        },
        computed:{
            seconds(){
                return this.count + ' 秒'
            }
        },
        methods:{
            init(){

                if(this.$route.query){
                    let token=this.$route.query.token
                    let user_id=this.$route.query.user
                    let confirm=Register.confirmEmail(user_id,token)

                    confirm.then(result => {
                        this.loaded=true
                        this.confirmed=true
                        this.countDown()
                    })
                    .catch(error => {
                        this.loaded=true
                        this.confirmed=false
                       
                    })

                   
                }
                
                
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