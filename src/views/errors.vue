<template>
   <article v-show="loaded" class="message is-danger">
        <div class="message-body title">
            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
            {{ msg  }}  
        </div>
       
   </article>

</template>

<script>
    export default {
        name:'ErrorPage',
        
        beforeMount(){
           this.init()
        },
        data(){
            return{
                msg:'系統暫時無回應，請稍後再試',
                loaded:false,
            }
        },
        
        methods:{
            init(){
        
                if(this.$route.params){
                    let msg=this.$route.params.msg
                    if(msg) this.msg=msg 
                   
                }

                  this.loaded=true
                
            },

           
        },
        
    }
</script>