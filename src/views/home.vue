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

import FullCard from '../components/course/FullCard.vue'

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
                let url=Helper.getUrl('/api/courses/details/2' )          
                axios.get(url)
                .then(response => {
                  let course=response.data.course
                  for (var i = 0; i < 6; i++) {
                      this.courses.push(new Course(course))
                  }
                 
                  this.loaded=true
                })
                .catch(function(error) {
                  console.log(error)
                })

            }
        },
        
    }
</script>