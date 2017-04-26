<template>

    <div>
        <h1 class="title">課程資訊</h1>
        <div class="course-info box">
            <div class="columns">
                <div class="column">
                    課程名稱：{{ course.name }}          
                </div>
                <div class="column">
                    課程編號：{{ course.number }}
                </div>
            </div>
            <div class="columns">
                <div class="column">
                   上課地點：<span v-html="course.formatLocation()"></span>          
                </div>
                <div class="column">
                   聯絡電話：{{ course.center.contactInfo.tel }}
                </div>
            </div>
            <div class="columns">
                <div class="column">
                     上課時間：<span v-html="course.classTimesText()"></span>             
                </div>
                <div class="column">
                     課程期間：<span v-html="course.period"></span>
                </div>
              
            </div>
            <div class="columns">
                <div class="column">                          
                     課程費用：<span v-html="course.formatCostDetails()"></span>         
                </div>
                <div v-if="course.credit_count>0" class="column">                          
                     學分數：{{ course.credit_count }}       
                </div>
            </div>
            <div class="columns">
                <div class="column">
                     課程時數：{{  course.hoursText }}&nbsp;{{  course.weeksText }}              
                </div>
                <div class="column">
                     招生對象：<span v-html="course.formatTarget()"></span>  
                </div>
              
            </div>
        </div>  <!--  End Course-Info -->

        <h1 class="title">個人資料</h1>
        <div class="course-info">
            <div class="columns">
                <div class="column">
                     姓名：{{  course.hoursText }}&nbsp;{{  course.weeksText }}              
                </div>
                <div class="column">
                     性別： <span v-html="course.formatTarget()"></span>  
                </div>
              
            </div>
            <div class="columns">
                <div class="column">
                     Email：{{  course.hoursText }}&nbsp;{{  course.weeksText }}              
                </div>
                <div class="column">
                     電話： <span v-html="course.formatTarget()"></span>  
                </div>
              
            </div>
        </div>
      
    </div>

</template>

<script>
    export default {
        name:'SignupConfirm',
        props:['active','course'],
        data(){
            return{
                isAuth:false
            }
        },
        watch: {
          'active': 'init'
        },
        methods:{
           init(){
                if(this.active){
                    this.checkAuth()

                }
              
            },
            checkAuth(){
                this.isAuth=this.$auth.isAuthenticated()
                if(!this.isAuth){
                    let returnUrl="signup/create?course=" + this.course.id
                    this.$router.push('/login?return=' + returnUrl)
                }
            },
            getCourseId(){
                if(this.course) return this.course.id
                    return 0
            },
            nextStep(){
                this.$emit('nextStep')
            },
            cancel(){
                this.$emit('cancel')
            }

        }
    }  
</script>


<style>
.info-description {
    font-size:17px;
}

.course-info {
    font-size:17px;
}
.order-td{
    width: 10%;
    text-align: center;
}

    
</style>