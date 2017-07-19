<template>
    <show-notice v-if="id" :id="id"
     @back="onBack" >
     
        
    </show-notice>

</template>

<script>

    import ShowNotice from '../../components/notice/show.vue'
  
    export default {
        name:'NoticeDetailsView',
        components:{
             'show-notice':ShowNotice
        },
        data(){
            return{
                id:0,

            }
        },
        watch: {
            '$route': 'init'
        },
        beforeMount(){
            this.init()
        },
        methods:{
            init(){
                this.id=0
                let id=this.$route.params.id
                if(id)this.id=Number(id)
                
               
            },  
            onBack(){
                 this.$router.push('/notices')
            }
           
        },
        
    }
</script>