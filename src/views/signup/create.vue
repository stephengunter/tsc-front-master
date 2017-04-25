<template>

<div>
    <h2 class="title is-2">課程報名</h2>
   
    <steps :show-footer="false" :current="currentStep" type="pills">
        <step title="報名須知"  >
            <notice @nextStep="nextStep" @cancel="cenceled"></notice>
        </step>
        <step title="確認資料">
            <confirm :course="course" :active="confirmActive" @nextStep="nextStep" @cancel="cenceled"></confirm>
        </step>
        <step title="完成報名" >
           
        </step>
    </steps>

    <button @click="showModal=true">cc</button>

    <modal :show-header="false" :show-footer="false" :on-cancel="cenceled"  :is-show="showModal" @close="showModal=false">
     
          <article class="message is-danger">
          <div class="message-header">
              <p>
                  <strong>此課程目前無法報名</strong>
              </p>
          </div>
          <div class="message-body">
             您所查詢的課程：<strong>咖啡鑑賞班</strong>
             <p>
               目前無法報名，請查詢其他課程。
             </p>
          </div>
        </article>
    </modal>
</div>



</template>

<script>
    import SignupNotice from  '../../components/signup/Notice.vue'
    import SignupConfirm from  '../../components/signup/Confirm.vue'
    export default {
        name:'CreateSignup',
        components:{
          'notice':SignupNotice,
          'confirm':SignupConfirm
        },
        watch: {
            '$route': 'init',
        },
        data(){
            return{
                course:{},
                currentStep:0,
                showModal:false,
            }
        },
        beforeMount(){
           this.init()
        },
        computed: {
            confirmActive() {
                return this.currentStep==1
            },
            
        },
        methods:{
            test(){
                alert('canceled')
            },
            getCourseId(){
                if(this.course) return this.course.id
                    return 0
            },
            nextStep(){
                this.currentStep += 1
            },
            init(){
              let courseId=this.$route.query.course
              if(!courseId) {
                 this.$router.push('/courses')
                 return false
              }

              this.currentStep=0

              let url=Helper.getUrl('/api/courses/details/' + courseId )          
                axios.get(url)
                .then(response => {
                    let course=response.data.course
                    if(!course.canSignup){
                         this.showModal=true
                    }else{
                        this.course=course
                    }
                })
                .catch(function(error) {
                   this.cenceled()
                })
           
            },
            cenceled(){
                let courseId=this.getCourseId()
                if(courseId){
                     this.$router.push('/courses/' + courseId)
                }else{
                    this.$router.push('/courses' )
                }
               
            },
            
        },
       
    }
</script>