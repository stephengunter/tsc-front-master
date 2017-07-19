<template>
<div>
    <div v-show="!hasSelected">
        <h1 class="title">公告訊息</h1>
        
        <notice-table :latest="noticeTable.latest" @selected="onSelected"></notice-table> 

        
            
      
        
    </div>

    <div v-show="hasSelected">
        {{ noticeTable.selected }}
    </div>
    



</div>

</template>

<script>

    import NoticeTable from '../../components/notice/table.vue'
  
    export default {
        name:'NoticeIndexView',
        components:{
            'notice-table':NoticeTable
        },
        beforeMount(){
            
        },
        data(){
            return{
                
                noticeTable:{
                    selected:0,
                    latest:false
                },
                
            }
        },
        computed: {
            hasSelected() {
               let id=Number(this.noticeTable.selected)
               return id > 0 
            }
        },
        methods:{
            
            
            onSelected(id){
                this.noticeTable.selected=id
            }
        },
        
    }
</script>