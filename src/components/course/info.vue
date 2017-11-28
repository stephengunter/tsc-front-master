<template>
    <div class="course-info">
        <div class="columns">
            <div class="column">
                上課地點：<span v-html="course.formatLocation()"></span>          
            </div>
            <div class="column">
                <span>
                    聯絡電話：{{ course.askTel() }}
                </span>
                
                
            </div>
          
        </div>

        <div class="columns">
            <div class="column">
                 課程編號：{{ course.number }}
            </div>
            <div class="column">
                 課程分類：<span v-html="course.formatCategories(course.privateCategories)"></span>               
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
                 課程費用：{{ course.formatTuition() }}         
            </div>
            <div v-if=" course.hasCost()" class="column">                          
                 材料費：{{ course.formatCostDetails() }}       
            </div>
            
        </div>
        <div v-if="course.hasCreditCount()"  class="columns">
            
            <div class="column">                          
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
    </div>  <!--  End Course-Info -->
</template>

<script>
    export default {
        name:'CourseInfo',
        props: {
            course:{
                type: Object,
                default: {}
            },
      },
      
      
  }


</script>

<style>
.course-info {
    font-size:17px;
}
    
</style>