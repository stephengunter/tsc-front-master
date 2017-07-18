<template>
    <div class="box">
        <div>
           <span class="course-center"  >
              <i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp; {{ course.center.name }}
           </span>
        </div>
        <div class="media">
             <div class="media-left is-hidden-mobile">
                 <div class="status">
                      <span v-if="course.canJoin" class="tag is-success">招生中</span> 
                  </div>
                  <figure class="image is-128x128">
                    <a>
                      <img :src="course.photo.path">
                    </a>
                  </figure>

              </div>
              <div class="media-content">
               
                      <ul class="info">                    
                          <li class="title">
                            <a @click="$router.push('/courses/' + course.id)"> 
                            {{ course.name}}
                            </a>
                          </li> 
                          <li class="item">上課時間：<span v-html="course.classTimesText()"></span>  </li>
                          <li class="item">開課日期：{{ course.begin_date }}</li>
                          <li class="item">課程時數：{{  course.hoursText }}&nbsp;{{  course.weeksText }}</li>
                          <li class="item">課程費用：<span v-html="course.formatCost()"></span> </li>
                      </ul> 
                       <!-- <p>{{ course.description }}</p> -->
                          
                          
                  
              </div>
             
        </div>
    </div>  <!-- end box -->
</template>

<script>
  export default {
      name:'CourseFullCard',
      props: {
          entity:{
             type: Object,
             default: {}
          },
      },
      data () {
        return {
            course:{}
        }
      },
      beforeMount(){
           this.course=new Course(this.entity)
      },
  }


</script>
   

<style scoped>
.course-center{
   display: flex;
   align-items: center;
   font-size:1.2em
}
.status{
  text-align:center;
  padding-bottom:10px;
}
.course-title{
font-size: 1.325em;
 padding-left: 10px;
}
ul.info {
    list-style-type:none;
}
li.title {
  font-size: 1.45em;
  font-weight: normal;
  margin-bottom: 0.5714em;
}
li.item {
    font-size: 1.125em;
    margin-bottom: 0.3714em;

}
  
</style>