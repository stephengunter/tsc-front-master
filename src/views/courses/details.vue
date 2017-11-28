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

        <div style="padding-top: 1cm;">
            <h1 class="title">折扣優惠</h1>
            <table class="table is-bordered is-striped">
                <thead>
                    <tr>
                        <th> </th>
                        <th> 10/11 前完成繳費 </th>
                        <th> 10/11 後 </th>
                        <th> </th>
                    </tr>
                   
                </thead>
                <tbody>
                    <tr>
                        <td>新生</td>
                        <td>9折</td>
                        <td>無折扣</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>同時報名兩科以上</td>
                        <td>85折</td>
                        <td>無折扣</td>
                        <td></td>
                    </tr>
                    
                    <tr>
                        <td>舊生、各級學校在校生、慈濟志業體同仁(含慈誠、委員、榮董)</td>
                        <td>85折</td>
                        <td>無折扣</td>
                        <td>開學後備相關證明辦理</td>
                    </tr>
                    <tr>
                        <td>持中國信託蓮花卡刷卡繳費</td>
                        <td>9折</td>
                        <td>9折</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>銀髮族65歲以上、身心障礙朋友</td>
                        <td>8折</td>
                        <td>8折</td>
                        <td>開學後備相關證明辦理</td>
                    </tr>
                    <tr>
                        <td>低收入戶</td>
                        <td>5折</td>
                        <td>5折</td>
                        <td>開學後備相關證明辦理</td>
                    </tr>
                    <tr>
                        <td>宗教師</td>
                        <td>5折</td>
                        <td>5折</td>
                        <td>開學後備相關證明辦理</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-show="teachers.length > 0" style="padding-top: 1cm;">
            <h1 class="title" >師資介紹</h1>
            <teacher-card v-for="(teacher,index) in teachers" :key="index" :teacher="teacher"></teacher-card>
        </div>

       
        <div v-show="course.schedules.length > 0" style="padding-top: 1cm;">
            <h1 class="title">課程進度</h1>
            <course-schedule :schedules="course.schedules"></course-schedule>
        </div>

        <div v-if="false">
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



