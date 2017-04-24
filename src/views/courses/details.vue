<template>
<div v-if="loaded">
    <large-card :course="course"></large-card>
    <h1 class="title">課程資訊</h1>
    <div class="course-info">
        <div class="columns">
          <div class="column">
               上課地點：<span v-html="course.formatLocation()"></span>          
          </div>
          <div class="column">
               聯絡電話：{{ course.center.contactInfo.tel }}
          </div>
          
        </div>

        <div class="columns">
            <div class="column">
                 課程分類：<span v-html="course.formatCategories(course.privateCategories)"></span>               
            </div>
            <div class="column">
                 課程編號：{{ course.number }}
            </div>
        </div>
        <div class="columns">
            <div class="column">
                 上課時間：<span v-html="course.classTimesText()"></span>             
            </div>
            <div class="column">
                 課程期間：<span v-html="course.period"></span>
            </div>
          
        </div>
        <div class="columns">
            <div class="column">                          
                 課程費用：<span v-html="course.formatCostDetails()"></span>         
            </div>
            <div v-if="course.credit_count>0" class="column">                          
                 學分數：{{ course.credit_count }}       
            </div>
            
        </div>
        <div class="columns">
            <div class="column">
                 課程時數：{{  course.hoursText }}&nbsp;{{  course.weeksText }}              
            </div>
            <div class="column">
                 招生對象：<span v-html="course.formatTarget()"></span>  
            </div>
          
        </div>
        <div class="columns">
            <div class="column">
                 報名期間：{{ course.open_date }} 起至 {{ course.close_date }} 止&nbsp;&nbsp;
                 <span v-if="course.canJoin" class="tag is-success">招生中</span>          
            </div>
            <div class="column">
                 上限人數：{{ course.limit }}人
            </div>
          
        </div>
      <div>  <!--  End Course-Info -->
     

     <h1 class="title">師資介紹</h1>
     <teacher-card v-for="teacher in teachers" :teacher="teacher"></teacher-card>

    <div v-show="course.schedules.length" id="course-schedules">
     <h1 class="title">課程進度</h1>
      <table class="table" style="width: 95%;font-size:17px;">
          <thead> 
              <tr> 
                  <th></th> 
                  <th style="width:45%">課目大綱</th> 
                  <th style="width:45%">內容</th>                   
              </tr> 
          </thead>
          <tbody>
              <tr v-for="schedule in course.schedules">
                <td class="order-td">
                  {{schedule.order}}
                </td>
                <td>
                  {{schedule.title}}
                </td>
                <td>
                  {{schedule.content}}
                </td>
              </tr>              
            </tbody>
      </table>
    </div> 
   <!--  <h1 class="title">公告事項</h1>
    <ul style="list-style-type:disc;">
       <li v-for="notice in course.notices" v-text="item"></li>
    </ul> -->
    
     
</div>
</template>

<script>
import LargeCard from  '../../components/course/LargeCard.vue'
import TeacherCard from  '../../components/course/Teacher.vue'

export default {
   name:'CourseDetails',
   components:{
      'large-card':LargeCard,
      'teacher-card':TeacherCard
   },
   data(){
     return {
        id:0,
        course:{},
        teachers:[],
        loaded:false

     }
   },
   beforeMount(){
      this.init()
   },
   watch: {
      '$route': 'init'
   },
   methods:{
     init(){
        this.id=this.$route.params.id
        this.course={}
        this.teachers=[]
        this.loaded=false

        this.fetchData()
      },
      fetchData(){
        let url=Helper.getUrl('/api/courses/details/' + this.id)          
          axios.get(url)
              .then(response => {
                  this.course = new Course(response.data.course)
                
                  for (var i = 0; i < this.course.teachers.length; i++) {
                      this.teachers.push(new Teacher(this.course.teachers[i]))
                  }
                 
                  this.loaded=true
              })
              .catch(function(error) {
                  console.log(error)
              })
      }
     
   },


}
</script>


<style>
.course-info {
    font-size:17px;
}
.order-td{
    width: 10%;
    text-align: center;
}
    
</style>

