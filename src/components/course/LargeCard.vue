<template>
    <div class="columns">
        <div class="column is-3">
            <div class="image is-2by2">
                <img src="http://c.blog.xuite.net/c/4/3/e/21538578/blog_1389428/txt/35690516/0.jpg">
            </div>
        </div>
        <div class="column is-7 is-offset-1">
           <div class="title is-2">
                <span class="tag is-success is-large">{{ course.status }}</span>
                     {{ course.name }}
            </div>
            <div class="title is-4">
                <span><i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;上課時間：{{ course.dayofweek }}&nbsp;{{ course.time }}</span>
                &nbsp; &nbsp; &nbsp;
                <span><i class="fa fa-calendar" aria-hidden="true"></i> 開課日期：{{ course.startDate }}</span>
                 
            </div>
            <div class="title is-4">
               <span>課程費用：3600元&nbsp;/&nbsp;30小時&nbsp;(15週) </span>
                
                &nbsp; &nbsp; &nbsp;
               <a class="button is-info is-outlined  is-focused">線上報名</a>
                
            </div>
            <hr>
            <p style="font-size:18px">
                {{ course.description }}
            </p> 
        
        </div>    
    </div>

</template>

<script>
export default {
    props:{
         course:{
            name:'',
            status:'',
            dayofweek:'',
            startDate:'',
            cost: 0,
            time:'',
            hours: 0,
            period:'',
            weeks: 0,
            teacher:{ name:'' ,parent:0},
            center:{name:''},
             
          },
    }



}
</script>