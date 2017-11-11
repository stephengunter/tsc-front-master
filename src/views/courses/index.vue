<template>
  

    <details-view  v-if="selected" :id="selected" @back="onBack"></details-view>
    
    
    <div v-else class="columns is-multiline">

        <div v-for="(course,index) in courses" :key="index" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
            <course-card :entity="course"
                @selected="onSelected">
            </course-card>
        </div>
    
    </div>




</template>

<script>

    import CourseCard from '../../components/course/card.vue'
    import Details from './details.vue'

    export default {
        name:'CourseIndex',
        props: {
            params:{
                type: Object,
                default: {}
            },
            model:{
                type: Object,
                default: {}
            },
        },
        components:{
            'course-card' : CourseCard,
            'details-view' : Details
        },
        watch: {
            params: {
                handler(){
                   
                    this.refresh()                  
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
            if(this.model && this.model.hasOwnProperty('courses')){
                this.courses=this.model.courses
            }else{
                this.fetchData()
            } 
            
        },
        methods:{
            refresh(){
                this.selected=0
                this.courses=[]
                this.fetchData()
            },
            fetchData(){
                
                let params={
                    category:this.params.category,
                    center:this.params.center
                }
                
                let getData=Course.index(this.params)
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
                this.refresh()
            }
        },
       
    }
</script>