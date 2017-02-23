<template>

<div>
<h1 class="title">最新課程</h1>
    <div class="columns is-multiline is-mobile">

    <div v-for="course in courses" class="column is-two-thirds-mobile is-half-tablet is-half-desktop">
       <course-card :course="course"></course-card>
    </div>
    
    </div>

</div>




</template>

</template>

<script>

import FullCard from '../components/course/FullCard.vue'

    export default {
        name:'CourseIndex',
        components:{
            'course-card':FullCard
        },

        data(){
            return{
                courses:[]
            }
        },
        methods:{
            fetchData(){
                let center={ name:'花蓮中心' }
                let teacher={ name:'林阿福' , parent:0 }
                let course={
                    id: 1,
                    name:'西班牙語初級班',
                    status:'招生中',
                    dayofweek:'星期一',
                    cost: 3000,
                    time:'18:00-20:00',
                    hours: 30,
                    period:'2017/2/3-2017/5/22',
                    weeks: 15,
                    description:'課程包括問路、對時、找工作、氣候和季節、服裝與健康，文法和會話的部分則依讀本的進度調整。課程包括問路、對時、找工作、氣候和季節、服裝與健康，文法和會話的部分則依讀本的進度調整。',
                    center:center,
                    teacher:teacher
                }
                let courseList=[
                    course,
                    course,
                    course,
                    course,
                ]
                this.courses=courseList

            }
        },
        beforeMount(){
            this.fetchData()
        }
    }
</script>