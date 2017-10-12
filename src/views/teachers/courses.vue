<template>
   <course-list v-if="!selected" @selected="onCourseSelected"></course-list>  
   <div v-else >
      <div class="panel">
        <div class="panel-heading panel-title heading" >
            課程資訊
        </div>
        <show-course :id="selected" @loaded="onCourseLoaded"></show-course>
             
      </div>
      <div class="panel">
        <div class="panel-heading panel-title heading" >
            <div class="tabs is-medium">
              <ul>
                <li class="is-active"><a>預定進度</a></li>
                <li><a>Music</a></li>
                <li><a>Videos</a></li>
                <li><a>Documents</a></li>
              </ul>
            </div>
            
        </div>
        
        <div v-if="loaded" class="panel-block">
            <div style="width:99%"> 
                <schedule-view :course_id="selected"></schedule-view>
            </div>
           

              
        </div>     
      </div>
   </div>    
</template>

<script>
    import CoursesList from '../../components/teacher/courses/list.vue'
    import ShowCourse from '../../components/teacher/courses/show.vue'
    import ScheduleView from '../../components/teacher/schedule/view.vue'
    export default {
        name:'TeacherCoursesView',
        components:{
           'course-list':CoursesList,
           'show-course':ShowCourse,
           'schedule-view':ScheduleView,
        },
        data(){
            return {
                selected:0,
                loaded:false,
            }
        },
        beforeMount() {
            this.init()
        },
        methods:{
            init(){
                this.selected=0
            },
            onCourseSelected(id){
                this.selected=id
            },
            onCourseLoaded(course){
                this.loaded=true
            },
           
        }
    }
</script>