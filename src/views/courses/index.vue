<template>
  

    <course-view  v-if="selected" :id="selected" @back="onBack"></course-view>
    
  
    <div v-else class="columns is-multiline">

      <div v-for="course in courses" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
         <course-card :entity="course"
             @selected="onSelected">
         </course-card>
      </div>
    
    </div>




</template>

<script>

    import CourseCard from '../../components/course/card.vue'
    import CourseView from  '../../components/course/view.vue'

    export default {
        name:'CourseIndex',
        props: ['params'],
        components:{
            'course-card':CourseCard,
            'course-view':CourseView
        },
        watch: {
            params: {
              handler: function () {
                 this.init()                  
              },
              deep: true
            },
        },
        data(){
            return{
                courses:[],
                selected:0,
            }
        },
        beforeMount(){
           this.init()
        },
        methods:{
            init(){
                this.selected=0
                this.fetchData()
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
            },
            onSelected(id){
                this.selected=id
            },
            onBack(){
                this.init()
            }
        },
       
    }
</script>