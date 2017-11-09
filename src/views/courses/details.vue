<template>
    <course-view v-if="loaded" :id="id" @back="onBack"></course-view>
</template>

<script>

import CourseView from  '../../components/course/view.vue'

export default {
    name:'CourseDetails',
    components:{
       'course-view':CourseView
    },
    data(){
        return {
            id:0,
            loaded:false

        }
    },
    beforeMount(){
        this.init()
    },
    watch: {
        '$route': 'init'
    },
    methods:{
        init(){
            this.id=0
            if(this.$route.params.id){
                this.id=Number(this.$route.params.id)
            }
         
            this.loaded=true
        },
      
        onBack(){
            this.$router.push('/courses')
        }
     
    },


}
</script>



