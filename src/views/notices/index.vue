<template>
<div>
    <h1 class="title">{{ title }}</h1>
    <h2 class="subtitle">
      A single class to handle WYSIWYG generated content, where only <strong>HTML tags</strong> are available
    </h2>
    <div v-show="!hasSelected">
        

        <notice-table :latest="noticeTable.latest" @selected="onSelected"></notice-table> 

        
            
      
        
    </div>

    <show-notice v-if="hasSelected" :id="noticeTable.selected"
     :show_title="noticeDetails.show_title" 
     @back="noticeTable.selected=0"
     @loaded="onNoticeLoaded">
        
    </show-notice>
   
    



</div>

</template>

<script>

    import NoticeTable from '../../components/notice/table.vue'
    import ShowNotice from '../../components/notice/show.vue'
    export default {
        name:'NoticeIndexView',
        components:{
            'notice-table':NoticeTable,
             'show-notice':ShowNotice
        },
        beforeMount(){
            
        },
        data(){
            return{
                title:'公告訊息',
                noticeTable:{
                    selected:0,
                    latest:false
                },

                noticeDetails:{
                    show_title:false
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
            },
            onNoticeLoaded(notice){
                this.title='公告訊息：' + notice.title
            }
        },
        
    }
</script>