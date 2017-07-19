<template>
    <div>
       
        <!-- <div>
            
        </div> -->
        <h1 v-if="show_title" class="title">{{ notice.title }}</h1>
        <h2 class="subtitle">
            {{ notice.date }}
        </h2>
        <div style="clear: both;text-align:right;">
            <a @click.prevent="onBack" style="font-size:1.2em;" v-text="back"></a>
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
            show_title:{
              type: Boolean,
              default: true
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
            
            onBack(){
                this.$emit('back')    
            }
        },
        
    }
</script>