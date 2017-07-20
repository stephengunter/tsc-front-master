<template>
  <div v-if="loaded">
      <h2 class="title is-3">課程報名</h2>
     
      <steps :show-footer="false" :current="currentStep" type="pills">
          <step title="報名須知"  >        
              <notice @nextStep="nextStep" @cancel="cenceled"></notice>
          </step>
          <step title="確認資料">
              <confirm :course="course" :discounts="discounts" :active="confirmActive" 
              @created="onSignupCreated" @cancel="cenceled"></confirm>
         
          </step>
          <step title="完成報名" >
          
             <completed :signup_id="signup.id"></completed>
          </step>
      </steps>

      <modal title="此課程目前無法報名" :backdrop-closable="false"  :width="confirmSettings.width" 
        :is-show="confirmSettings.show" transition="fadeDown" @close="cenceled"
         ok-text="確定" :show-cancel="false">
         <p class="title is-5">您所查詢的課程： <strong>{{ course.number }}&nbsp;{{ course.name }}</strong>  目前無法報名，請查詢其他課程。</p>
     
      </modal>
  </div>
 
</template>

<script>
    import SignupNotice from  '../../components/signup/notice.vue'
    import SignupConfirm from  '../../components/signup/confirm.vue'
    import SignupCompleted from  '../../components/signup/completed.vue'
   
    export default {
        name:'CreateSignup',
        components:{
          'notice':SignupNotice,
          'confirm':SignupConfirm,
          'completed' : SignupCompleted
        },
        watch: {
            '$route': 'init',
        },
        data(){
            return{
                loaded:false,
                course:{},
                discounts:[],
                signup:{
                  id:0
                },
                currentStep:0,

                confirmSettings:{
                   show:false,
                   width:600,
                   user:{}
               }
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

                this.fetchData(courseId)

                this.currentStep=0

             
           
            },
            fetchData(courseId){
                let userId=0
                let getData=Signup.create(courseId,userId) 
               
                getData.then(data => {
                    let course=data.course
                    this.course = new Course(course)

                    this.discounts=data.discounts
                    this.loaded=true
                    // if(!course.canSignup){
                    //      this.confirmSettings.show=true
                    // }
                })
                .catch( error => {
                    this.onError(error)
                })
            },
            
           
            onSignupCreated(signup){
                this.signup = signup
                this.nextStep()
            },
            cenceled(){
                let courseId=this.getCourseId()
                if(courseId){
                     this.$router.push('/courses/' + courseId)
                }else{
                    this.$router.push('/courses' )
                }
               
            },
            onError(error){
                Bus.$emit('errors',error)
                this.cenceled()
            },
            
            
        },
       
    }
</script>