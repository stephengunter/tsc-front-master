<template>
    <div v-if="loaded" class="panel-block">
        <div class="show-data" style="width:99%" >
            <div class="columns">
                 <div class="column">
                    <label class="label label-title">課程名稱</label>
                    <p>
                       {{ course.name }}
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">開課中心</label>
                    <p>
                       {{ course.center.name }}
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">學期</label>
                    <p>
                       {{ course.term.name }}
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">教師</label>
                    <p v-html="course.teachersText()">
                       
                    </p>
                 </div>
            </div>
            <div class="columns">
                 <div class="column">
                    <label class="label label-title">課程編號</label>
                    <p>
                       {{ course.number }}
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">課程日期</label>
                    <p>
                       {{ course.period }}
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">上課時間</label>
                    <p v-html="course.classTimesText()">
                      
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">學分數</label>
                    <p>
                      {{ course.credit_count }}
                    </p>
                 </div>
            </div>  
              <div class="columns">
                 <div class="column">
                    <label class="label label-title">週數</label>
                    <p>
                       {{ course.weeks }}
                    </p>
                 </div>
                 <div class="column">
                    <label class="label label-title">時數</label>
                    <p>
                       {{ course.hours }}
                    </p>
                 </div>
                 <div class="column">
                    
                 </div>
                 <div class="column">
                    
                 </div>
            </div>   
            <div class="columns">
                <div class="column">
                    <label class="label label-title">上架狀態</label>
                    <p v-html="$options.filters.activeLabel(course.active)">
                    
                    </p>
                </div> 
                <div class="column">
                    <label class="label label-title">審核狀態</label>
                    <p v-html="$options.filters.reviewedLabel(course.reviewed)">
                    
                    </p>
                </div> 
                <div class="column">
                    <label class="label label-title">註冊狀態</label>
                    <p v-html="registerLabel()">
                    
                    </p>
                </div> 
                <div class="column">
                    <label class="label label-title">開課狀態</label>
                    <p v-html="classLabel()">
                    
                    </p>
                </div>
            </div>   
        </div>  
    </div>
</template>


<script>
  export default {
     name:'ShowTeacherCourse',
     props: {
          id:{
             type: Number,
             default: 0
          },
           
     },
     data(){
       return {
          loaded:false,
          course:{}
       }
     },
     beforeMount() {
         this.init()
     }, 
     methods:{
        init(){ 
            this.loaded=false
            this.fetchData()
        },  
        fetchData(){
            let getData=TeacherCourses.show(this.id)
            getData.then(data=>{
                 this.course=new Course(data.course)               
                 this.loaded=true
                 this.$emit('loaded',this.course)
            }).catch(error => {
                 Bus.$emit('errors',error)
            })
        },
        registerLabel(){
           return CourseStatus.getRegisterLabel(this.course.status)
        },
        classLabel(){
             return CourseStatus.getClassLabel(this.course.status)

        },
        beginEdit(){
           this.$emit('begin-edit')
        }, 
        
     }
  }

    
</script>


<style>

</style>