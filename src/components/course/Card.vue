<template>
    <div class="card"> 
        <div class="card-content">
            <div class="media">
                <div class="media-left is-hidden-mobile">
                    <figure class="image is-128x128">
                        <img :src="course.photo.path">
                    </figure>
                </div>
                <div class="media-content">
                    <div>
                        <ul class="info">                    
                            <li class="title-item">
                                <span v-if="course.canJoin" class="tag is-success">招生中</span> 
                                <a @click="onSelected"> 
                                    {{ course.name}}
                                </a>
                            </li> 
                            <li class="item">上課時間：<span v-html="course.classTimesText()"></span>  </li>
                            <li class="item">開課日期：{{ course.begin_date }}</li>
                            <li class="item">課程時數：{{  course.hoursText }}&nbsp;{{  course.weeksText }}</li>
                            <li class="item">課程費用：<span v-html="course.formatTuition()"></span> </li>
                        </ul> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CourseCard',
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
    methods:{
        onSelected(){
            this.$emit('selected',this.course.id)
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
li.title-item {
    font-size: 1.45em;
    font-weight: normal;
    margin-bottom: 0.5714em;
}
li.item {
    font-size: 1.125em;
    margin-bottom: 0.3714em;

}
  
</style>