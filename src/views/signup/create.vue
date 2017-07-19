<template>

<div v-if="loaded">
    <h2 class="title is-3">課程報名</h2>
   
    <!-- <steps :show-footer="false" :current="currentStep" type="pills">
        <step title="報名須知"  >        
            <notice @nextStep="nextStep" @cancel="cenceled"></notice>
        </step>
        <step title="確認資料">
            <confirm :course="course" :discounts="discounts" :active="confirmActive" 
            @created="signupCreated" @cancel="cenceled"></confirm>
       
        </step>
        <step title="完成報名" >
        
           <completed :signup="signup"></completed>
        </step>
    </steps> -->

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
                signup:{},
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
                //this.getDiscounts()

                this.currentStep=0

             
           
            },
            fetchData(courseId){
                let userId=0
                let getData=Signup.create(courseId,userId) 
               
                getData.then(data => {
                    let course=data.course
                    if(!course.canSignup){
                         this.showModal=true
                    }else{
                       this.course = new Course(course)
                       this.loaded=true
                    }
                })
                .catch( error => {
                    this.onError(error)
                })
            },
            
            getDiscounts(){
                let url=Helper.getUrl('/api/discounts/active-discounts')          
                axios.get(url)
                .then(response => {
                  this.discounts=response.data.discountList
                 
                 
                })
                .catch(error => {
                   this.onError()
                })
            },
            signupCreated(signup){
                this.signup = new Signup(signup)
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
            }
            
        },
       
    }
</script>