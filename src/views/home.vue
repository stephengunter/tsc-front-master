<template>
<div>
    <div v-show="hasNotices">
        <h1 class="title">公告訊息</h1>

        

        <notice-table :latest="noticeTable.latest" @loaded="onNoticesLoaded"></notice-table> 

        <div style="clear: both;text-align:right;">
            <a @click.prevent="moreNotices" style="font-size:1.2em;">>>更多訊息</a>
        </div>
            
      
        
    </div>
    <div style="margin-top: 10px;" >
        <h1 class="title">最新課程</h1>
        <div class="columns is-multiline">

            <div v-for="course in courses" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
               <course-card :entity="course"></course-card>
            </div>
        
        </div>

    </div>



</div>

</template>

<script>

    import FullCard from '../components/course/full-card.vue'
    import NoticeTable from '../components/notice/table.vue'

    export default {
        name:'Home',
        components:{
            'course-card':FullCard,
            'notice-table':NoticeTable
        },
        beforeMount(){
            this.fetchData()
        },
        data(){
            return{
                
                noticeTable:{
                    rows:0,
                    latest:true
                },
                courses:[]
            }
        },
        computed: {
          hasNotices() {
              let rows=Number(this.noticeTable.rows)
              return rows > 0 
          }
        },
        methods:{
            fetchData(){
                this.getCourses()

            },
            getCourses(){
                this.courses=[]
                let getData=Course.latest()
                getData.then(data => {
                    this.courses=data.courses                 
                })
                .catch(error=> {
                    Bus.$emit('errors')
                })
            },
            onNoticesLoaded(rows){
                this.noticeTable.rows=rows
            },
            moreNotices(){
                 this.$router.push('/notices')
            }
        },
        
    }
</script>