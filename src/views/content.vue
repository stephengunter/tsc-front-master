<template>
    <div>
      <p v-html="content.text"></p>

      
    </div>
</template>

<script>
export default {
    name:'ContentView',
    props: {
        model:{
            type: Object,
            default: {}
        },
        
    },
    data(){
        return{
            content:{
                title:'',
                text:''
            }
        }
    },
    watch: {
        model: {
            handler(){
                this.fetchData()                  
            },
            deep: true
        },
    },
    beforeMount(){   
        this.init()
    },
    methods:{
        init(){
            this.fetchData()
        },
        fetchData(){
            let viewId=this.model.viewing
            if(!viewId){
                this.content=this.model.contents[0]
            }else{
                this.content=this.model.contents.find((item)=>{
                        return item.id == viewId
                    })
            } 
            

        },
       
    },
  
}
</script>

