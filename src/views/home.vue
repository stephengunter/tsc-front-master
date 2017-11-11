<template>
<div>
    
    

    <div v-show="hasNotices">
        <h1 class="title">公告訊息</h1>

        <notice-table :latest="noticeTable.latest" 
          @loaded="onNoticesLoaded"
          @selected="onNoticesSelected">
              
        </notice-table> 

        <div style="clear: both;text-align:right;">
            <a @click.prevent="moreNotices" class="button is-primary is-outlined">
                <span class="icon is-small">
                 <i class="fa fa-angle-double-right"></i>
                </span>
                <span>更多訊息</span>
            </a>
        </div>
            
      
        
    </div>
    <div style="margin-top: 10px;" >
        <h1 class="title">最新課程</h1>
        <div class="columns is-multiline">

            <div v-for="(course,index) in courses" :key="index" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
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
        beforeMount(){
           
        },
        methods:{
            test(){
              
            },
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
            },
            onNoticesSelected(id){
                this.$router.push('/notices/' + id)
            }
        },
        
    }
</script>


<style>

.notifications {
  position: fixed;
  top: 20px;
  right: 0;
  z-index: 1024 + 233;
  pointer-events: none;

  &.top-center{
    right: 0;
    left: 0;
    margin: 0 auto;
  }
  &.top-left{
    right: auto;
    left: 0;
  }
  &.bottom-left{
    top: auto;
    bottom: 20px;
    right: auto;
    left: 0;
  }
  &.bottom-center{
    top: auto;
    bottom: 20px;
    right: 0;
    left: 0;
    margin: 0 auto;
  }
  &.bottom-right{
    top: auto;
    bottom: 20px;
  }

  @include tablet() {
    max-width: 320px;
  }

  .notification {
    margin: 10px;
    &.has-icon{
      padding-left: 45px;
    }
    &.is-default{
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      background-color: #fff;
    }
    .close{
      float: right;
      margin: -13px -14px 0 20px;
    }
  }
}
</style>
