<template>
    <div>
        <h1 v-if="show_title" class="title" v-text="title"></h1>
        <p v-if="show_title"></p>
        <h2 class="subtitle">
            {{ notice.date }}
        </h2>
        <hr>
        <div class="content" style="font-size:1.2em;" >
            {{ notice.content }}
        </div>
        <div style="clear: both;text-align:right;">
             <a @click.prevent="onBack" class="button is-primary is-outlined">
                <span class="icon is-small">
                 <i class="fa fa-angle-double-left">
                </span>
                <span>返回</span>
             </a>
           
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
                title:'公告訊息',
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
                    this.title='公告訊息：' + this.notice.title
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