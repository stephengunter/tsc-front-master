<template>

   <div class="columns is-multiline">

      <div v-for="course in courses" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
         <course-card :entity="course"></course-card>
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
            params: {
              handler: function () {
                 if(this.ready) this.fetchData() 
                 
              },
              deep: true
            },
            $route: function () {
               this.init()
            }
           
        },
       
        data(){
            return{
                ready:false,
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

                this.ready=true
           
            },
            fetchData(){
                this.courses=[]
                let params={
                    category:this.params.category,
                    center:this.params.center
                }
                let getData=Course.index(params)
                getData.then(data => {
                    this.courses=data.courses                 
                })
                .catch(error=> {
                    Bus.$emit('errors')
                })
            }
        },
       
    }
</script>