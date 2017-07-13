<template>

<div>
    <h1 class="title">最新課程</h1>
    <div class="columns is-multiline">

        <div v-for="course in courses" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
           <course-card :course="course"></course-card>
        </div>
    
    </div>

</div>




</template>

</template>

<script>

import FullCard from '../components/course/full-card.vue'

    export default {
        name:'Home',
        components:{
            'course-card':FullCard
        },
        beforeMount(){
            this.fetchData()
        },
        data(){
            return{
                courses:[]
            }
        },
        methods:{
            fetchData(){
                

            }
        },
        
    }
</script>