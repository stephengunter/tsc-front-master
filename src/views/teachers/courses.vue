<template>
   <course-list v-if="!selected" @selected="onCourseSelected"></course-list>  
   <div v-else class="panel">
      <div class="panel-heading panel-title heading" >
          課程資訊
      </div>
      <course-view :id="selected"></course-view>
        
   </div>

 </div>    
</template>

<script>
    import CoursesList from '../../components/teacher/course-list.vue'
    import CoursesView from '../../components/teacher/course.vue'
    export default {
        name:'TeacherCoursesView',
        components:{
           'course-list':CoursesList,
           'course-view':CoursesView,
        },
        data(){
            return {
                selected:0,
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
            }
           
        }
    }
</script>