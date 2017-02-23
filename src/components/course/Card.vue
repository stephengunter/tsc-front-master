<template>
<div class="card">
   
    <div class="box">

        <div class="media">
             <div class="media-left">
                 <div class="status">
                      <span class="tag is-success">{{ course.status }}</span>
                  </div>
                  <figure class="image is-128x128">
                  <a>
                    <img src="http://livingthelanguage.ca/wp-content/uploads/2014/10/photodune-9069093-learn-spanish-vintage-background-concept-s-300x200.jpg">
                  </a>
                  </figure>

              </div>
              <div class="media-content">
                
                      <ul class="info">                    
                          <li class="title">
                             <a @click="$router.push('/courses/' + course.id)"> 
                                {{ course.name}}&nbsp;&nbsp;{{ course.teacher.name }} 老師
                             </a>
                          </li> 
                          <li class="item">上課時間：{{ course.dayofweek}} &nbsp; {{ course.time }} </li>
                          <li class="item">開課日期：2017-3-1</li>
                          <li class="item">報名期間：2017-1-16 起至 2017-2-18 止</li>
                          <li class="item">學費：{{course.cost}}元&nbsp;/&nbsp;{{ course.hours }}小時 &nbsp;({{course.weeks}}週)</li>
                      </ul> 
                       <!-- <p>{{ course.description }}</p> -->
                          
                          
                  
              </div>
             
        </div>
    </div> <!--  end box -->
       
</div>    <!--  end Card -->
</template>

<script>
  export default {
      props:{
          course:{
            name:'',
            status:'',
            dayofweek:'',
            cost: 0,
            time:'',
            hours: 0,
            period:'',
            weeks: 0,
            teacher:{ name:'' ,parent:0},
            center:{name:''},
             
          },
          showCenter:false,          
      },
      data(){
        return{

            lessson:{}
        }
      }



  }


</script>


<style scoped>
.status{
  text-align:center;
  padding-bottom:10px;
}
.course-title{
font-size: 1.125em;
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