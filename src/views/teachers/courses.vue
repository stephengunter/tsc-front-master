<template>
   <course-list v-if="!selected" @selected="onCourseSelected"></course-list>  
   <div v-else >
      <div class="panel">
        <div class="panel-heading panel-title heading" >
            課程資訊
            <a @click.prevent="selected=0" class="button is-info is-outlined">
              <span class="icon">
                <i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
              </span> 
              <span>返回</span>
            </a>
            
        </div>
        <show-course :id="selected" @loaded="onCourseLoaded"></show-course>
             
      </div>
      <div class="panel">
        <div class="panel-heading panel-title heading" >
            <div class="tabs is-medium">
              <ul>
                 <li v-for="item in tabs" :class="{ 'is-active': item.id==tabIndex }">
                     <a @click.prevent="tabIndex=item.id">{{ item.text }}</a>
                 </li>
                
                
              </ul>
            </div>
            
        </div>
        
        <div v-if="loaded" class="panel-block">
            <div style="width:99%"> 
                <schedule-view v-if="tabIndex==1" :course_id="selected"></schedule-view>
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
                tabIndex:1,
                loaded:false,
                tabs:[
                   { id:1 ,  text:'預定進度' },
                   { id:2 ,  text:'課堂紀錄表' },
                ],
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