<template>
<div>
    <div v-show="hasNotices">
        <h1 class="title">公告訊息</h1>
        <table class="table is-striped">
            <tbody>
              <tr>
                <td>81</td>
                <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
              </tr>
             
            </tbody>
        </table>
        <div style="clear: both;text-align:right;">
            <a href="#" style="font-size:1.2em;">>>更多訊息</a>
        </div>
            
      
        
    </div>
    <div style="margin-top: 10px;" >
        <h1 class="title">最新課程</h1>
        <div class="columns is-multiline">

            <div v-for="course in courses" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
               <course-card :entity="course"></course-card>
            </div>
        
        </div>

    </div>



</div>

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
                hasNotices:true,
                courses:[]
            }
        },
        methods:{
            fetchData(){
                this.getCourses()

            },
            getCourses(){
                this.courses=[]
                let getData=Course.latest()
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