<template>
<div class="tile is-ancestor">
    <div class="tile is-vertical">
        <div class="tile">
            <div class="column is-one-quarter">
                <figure class="image is-2by2">
                    <img :src="course.photo.path">
                </figure>
            </div>
            
            <div class="tile is-parent is-vertical">
                <div class="title is-2">
                    {{ course.name }}
                     <a v-show="course.canNetSignup()" style="margin-top: 5px;" 
                        @click.prevent="$router.push('/signup/create?course=' + course.id)" 
                         class="button is-info is-outlined  is-focused">線上報名
                     </a>
                  
                </div>
                <div class="title item-title" v-if="course.hasClassTimes()">
                    上課時間：<span v-html="course.classTimesText()"></span> 
                </div>
                <div class="title item-title">
                   
                    開課日期：{{ course.begin_date }}
                </div>
                <div class="title item-title">
                    
                    課程時數：{{  course.hoursText }}&nbsp;{{  course.weeksText }}
                </div>
                <div class="title item-title">
                   
                    報名期間：{{  course.open_date }}&nbsp;起至&nbsp;{{ course.close_date }} &nbsp;止
                </div>
                <div class="title item-title">
                    
                    課程費用：<span v-html="course.formatTuition()"></span> 
                </div>
                <div v-if="course.hasCost()" class="title item-title">
                   
                    教材費用：<span v-html="course.formatCost()"></span> 
                </div>
                <div >
                    
                    <p class="content" style="font-size:17px;">{{ course.description.trim() }}
                    </p>
               
                </div>
            </div>
           
        </div>    
    </div>
       
</div>
</template>

<script>
export default {
    name:'CourseLargeCard',
    props: {
        course:{
            type: Object,
            default: {}
        },
    },
    
    
}
</script>

<style scoped>
.item-title{
    font-size: 20px;
    line-height: 0.9em
}
</style>
