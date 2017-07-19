<template>
    <div>
        <h1 class="title">公告訊息</h1>

        <notice-table :latest="noticeTable.latest" @selected="onSelected"></notice-table> 

        <div style="clear: both;text-align:right;">
            <a href="#" style="font-size:1.2em;">>>更多訊息</a>
        </div>
    </div>

</template>

<script>

    import NoticeTable from '../../components/notice/table.vue'
  
    export default {
        name:'NoticeDetailsView',
        components:{
            'notice-table':NoticeTable
        },
        beforeMount(){
            this.fetchData()
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
            fetchData(){
                this.getCourses()

            },
            
            onSelected(id){
                this.noticeTable.selected=id
            }
        },
        
    }
</script>