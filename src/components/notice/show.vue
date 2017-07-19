<template>
    <div>
       
        <div>
            
        </div>
      
        <div style="clear: both;text-align:right;">
            <a href="#" style="font-size:1.2em;" v-text="back"></a>
        </div>
    </div>

</template>

<script>
  
    export default {
        name:'ShowNotice',
        props: {
            id: {
              type: Number,
              default: 0
            },
        },
        beforeMount(){
            this.fetchData()
        },
        data(){
            return{
                notice:{},
                back:'<<返回'
                
            }
        },
        methods:{
            fetchData(){
                if(!this.id) return
                let getData=Notice.show(this.id)
                getData.then(data => {
                    this.notice=data.notice  
                    this.$emit('loaded',this.notice)               
                })
                .catch(error=> {
                    Bus.$emit('errors')                      
                })

            },
            
            onSelected(id){
                this.noticeTable.selected=id
            }
        },
        
    }
</script>