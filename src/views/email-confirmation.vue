<template>
<div v-if="loaded">
    <div v-if="confirmed">
        <h1 class="title is-3">
            <i class="fa fa-check-circle-o" aria-hidden="true"></i>
            您已通過Email驗證. 歡迎您成為本站會員!
        </h1>

        <h3 class="title is-5">
            本視窗將在 <a @click.prevent="redirect" class="is-info" v-text="seconds"></a> 後重新導向至登入頁面
        </h3>
            
    </div>
    <div v-else>
        <h1 class="title is-3">
            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
            驗證失敗   
        </h1>
    </div>
</div>




</template>

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
                    let form=new Form({
                        id:user_id,
                        token:token
                    })

                    this.loaded=true
                    this.confirmed=false
                }
                
                
            },
            redirect(){
               this.$router.push('/')
            }
        },
        
    }
</script>