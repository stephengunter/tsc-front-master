<template>
<div v-if="loaded">
    <large-card :course="course"></large-card>
    <div style="clear: both;text-align:right;">
         <a @click.prevent="onBack"  class="button is-primary is-outlined">
            <span class="icon is-small">
             <i class="fa fa-angle-double-left"></i>
            </span>
            <span>返回</span>
         </a>
           
    </div>
    <h1 class="title">課程資訊</h1>
    <course-info :course="course"></course-info>

    <h1 class="title">師資介紹</h1>
    <teacher-card v-for="(teacher,index) in teachers" :key="index" :teacher="teacher"></teacher-card>

    
    <h1 class="title">課程進度</h1>
    <course-schedule :course="course"></course-schedule>
    
   <!--  <h1 class="title">公告事項</h1>
    <ul style="list-style-type:disc;">
       <li v-for="notice in course.notices" v-text="item"></li>
    </ul> -->
    
     
</div>
</template>

<script>
import LargeCard from  './large-card.vue'
import TeacherCard from  './teacher.vue'
import CourseInfo from  './info.vue'
import CourseSchedule from  './schedule.vue'

export default {
   name:'CourseView',
   components:{
      'large-card':LargeCard,
      'teacher-card':TeacherCard,
      'course-info':CourseInfo,
      'course-schedule':CourseSchedule
   },
   props: {
      id:{
        type: Number,
        default: 0
      },
   },
   data(){
     return {
        course:{},
        teachers:[],
        loaded:false

     }
   },
   beforeMount(){
      this.init()
   },
   watch: {
      'id': 'init'
   },
   methods:{
     init(){
       
        this.course={}
        this.teachers=[]
        this.loaded=false

        this.fetchData()
      },
      fetchData(){
            let getData=Course.show(this.id)  
            getData.then(data => {
                this.course = new Course(data.course)
              
                for (var i = 0; i < this.course.teachers.length; i++) {
                    this.teachers.push(new Teacher(this.course.teachers[i]))
                }
               
                this.loaded=true
            })
            .catch(error=> {
                Bus.$emit('errors',error)
            })
      },
      onBack(){
          this.$emit('back')    
      }
     
   },


}
</script>


