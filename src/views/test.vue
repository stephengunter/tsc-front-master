<template>
   
<importor></importor>
</template>

<script>
    import Importor from '../components/teacher/schedule/import.vue'

    export default {
        name:'TestPage',
        components: {
             Importor,
    
        },
        beforeMount(){
           this.init()
        },
        data(){
            return{
                
                loaded:false,
            }
        },
        
        methods:{
            init(){
        
                
                
            },

           
        },
        
    }
</script>