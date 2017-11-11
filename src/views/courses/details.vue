<template>
    <div v-if="loaded">

        <large-card :course="course"></large-card>

        
        <div class="back-btn" >    
            <a @click.prevent="onBack"  class="button is-primary is-outlined">
                <span class="icon is-small">
                    <i class="fa fa-angle-double-left"></i>
                </span>
                <span>返回</span>
            </a>
        </div>

        <h1 class="title" >課程資訊</h1>
        <course-info :course="course"></course-info>

        <div v-show="teachers.length > 0" style="padding-top: 1cm;">
            <h1 class="title" >師資介紹</h1>
            <teacher-card v-for="(teacher,index) in teachers" :key="index" :teacher="teacher"></teacher-card>
        </div>

       
        <div v-show="course.schedules.length > 0" style="padding-top: 1cm;">
            <h1 class="title">課程進度</h1>
            <course-schedule :schedules="course.schedules"></course-schedule>
        </div>

        <div v-show="cautions.length > 0">
            <h1 class="title">注意事項</h1>
                <ul style="list-style-type:disc;">
                <!-- <li v-for="notice, in course.notices" v-text="item"></li> -->
            </ul>

        </div>
        
        
    </div>
</template>


<script>
import LargeCard from  '../../components/course/large-card.vue'
import TeacherCard from  '../../components/course/teacher.vue'
import CourseInfo from  '../../components/course/info.vue'
import CourseSchedule from  '../../components/course/schedule.vue'

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
            cautions:[],
            loaded:false

        }
    },
    beforeMount(){
        this.init()
    },
    watch: {
        '$route': 'init',
        'id': 'init'
    },
    methods:{
        init(){
           
            this.loaded=false

            this.course={}
            this.teachers=[]

            if(this.id){
                this.fetchData(this.id)
            }else{
                this.fetchData(this.$route.params.id)
            }
            
        },
        fetchData(course_id){
            let getData=Course.show(course_id)  
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



