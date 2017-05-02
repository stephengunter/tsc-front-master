<template>

<div>
   <div class="columns is-multiline">

    <div v-for="course in courses" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
       <course-card :course="course"></course-card>
    </div>
    
    </div>

</div>



</template>

<script>

import Card from '../../components/course/card.vue'

    export default {
        name:'CourseIndex',
        props: ['params'],
        components:{
            'course-card':Card
        },
        watch: {
            '$route': 'init'
        },
        data(){
            return{
                center:0,
                category:0,
                courses:[]
            }
        },
        beforeMount(){
           this.init()
        },
        methods:{
            init(){
                let query=this.$route.query
                this.center=query.center
                this.category=query.category
              
                this.courses=[]
                this.fetchData()
           
            },
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