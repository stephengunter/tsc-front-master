<template>

<div>
       
    <div class="panel">
       <div class="panel-heading panel-title heading" >
        課程資訊
       </div>
      
       <div class="panel-block info">
            <div class="columns is-multiline" style="width:100%">
                <div :class="columnClass">
                     課程名稱：{{ course.name }} 
                </div>
                <div :class="columnClass">
                     課程編號：{{ course.number }}
                </div>
                <div :class="columnClass">
                     上課地點：<span v-html="course.formatLocation()"></span>  
                </div>
                <div :class="columnClass">
                     聯絡電話：{{ course.center.contactInfo.tel }}
                </div>
                <div :class="columnClass">
                     上課時間：<span v-html="course.classTimesText()"></span>             
                </div>
                <div :class="columnClass">
                     課程期間：<span v-html="course.period"></span>
                </div>
                <div :class="columnClass">                        
                     課程費用：<span v-html="course.formatCostDetails()"></span>         
                </div>
                <div v-if="course.credit_count>0" :class="columnClass">                          
                     學分數：{{ course.credit_count }}       
                </div>
                <div :class="columnClass">        
                     課程時數：{{  course.hoursText }}&nbsp;{{  course.weeksText }}              
                </div>
                 <div :class="columnClass">        
                     招生對象：<span v-html="course.formatTarget()"></span>  
                </div>
            </div>

       </div>
    </div>   <!--  end panel -->
    <div v-if="isAuth">
         <profiles @onError="onError" ></profiles>
         
         <div style="margin-top: 12px;">
            <form @submit.prevent="onSubmit">
                <h2 class="title is-3">是否符合以下優惠條件</h2>
                <div class="columns is-multiline info">
                   
                    <div @click="discountSelected(item.id)" :class="columnClass" v-for="item in discountOptions">
                       <label v-bind:class="[ item.selected ? 'radio blu-radio on is-primary' :  'radio blu-radio  is-primary']"  >
                            <input type="radio" :value="item.id"> <span>{{ item.name }}</span>
                        </label>
                    </div>    
                          
               
                </div>
               
                <hr>
                <button type="submit" :disabled="form.errors.any()"class="button is-primary is-medium">確認報名</button>
                &nbsp;&nbsp;&nbsp;
                <a class="button is-outlined is-medium" @click.prevent="cancel">取消</a>
          
             </form> 
          </div>  
    </div>   
  </div>

</template>

<script>
    import Profiles from  '../../components/signup/Profiles.vue'
    export default {
        name:'SignupConfirm',
        props:['active','course','discounts'],
        components:{
           Profiles
        },
        data(){
            return{
                discountId:0,
                discountOptions:[],
                form: new Form({
                  signup:{
                     id:0,
                     discount:this.discountId,
                  }
                }),
                isAuth:false,
                columnClass:'column is-one-quater-mobile is-half-tablet is-half-desktop'
            }
        },
        watch: {
          'active': 'init'
        },
        methods:{
           init(){
                if(!this.active) return false
                if(!this.discounts.length)  this.onError()
                let checkAuth=this.checkAuth()
                checkAuth.then(() => {
                   this.isAuth=true
                }).catch(error => {
                   this.isAuth=false
                   this.$auth.logout()
                   let returnUrl="/signup/create?course=" + this.course.id
                   this.$router.push('/login?return=' + returnUrl)
                })

              
                let emptyItem={ name:'無' , id:'', selected:true }
                this.discountOptions.push(emptyItem)
                for (var i = 0; i < this.discounts.length; i++) {

                  let item={
                             name: this.discounts[i].name , 
                             id: this.discounts[i].id, 
                             selected:false 
                           }
                  this.discountOptions.push(item)
                
                }
               
                
              
            },
            checkAuth(){
                return new Promise((resolve, reject) =>{
                    let authenticated=this.$auth.isAuthenticated()
                    authenticated.then(()=>{
                        resolve(true)
                         
                    }).catch(error => {
                          reject(error) 
                    })
                
                })
            },
            
            discountSelected(id){ 
               
                this.discountId=id
                for (var i = 0; i < this.discountOptions.length; i++) {
                    let item=this.discountOptions[i]
                    if(item.id==id){
                      item.selected=true
                    }else{
                       item.selected=false
                    }
                }
            },
            getCourseId(){
                if(this.course) return this.course.id
                    return 0
            },
            onSubmit(){
                this.form.signup.course_id = this.course.id
				this.form.signup.user_id = this.this.$auth.user_id()
                this.form.signup.discount_id= this.discountId
                let url = Helper.getUrl('/api/signups')
                this.form.post(url)
                    .then(signup => {
                        
                       this.$emit('created',signup)

                       Bus.$emit('okmsg','線上報名成功')
                       
                       
                    })
                    .catch(error => {
                        let msg='線上報名失敗. '
                         if(error.msg){
                            msg += error.msg
                         }
                       
                        Bus.$emit('errors',error, msg)
                    })

            },
            
            cancel(){
                this.$emit('cancel')
            },
            onError(){
                this.isAuth=false
                this.$notify.open({
                        content: '系統暫時無回應，請稍後再試',
                        type: 'danger',
                        placement: 'top-center',
                        duration: 1500,
                      })
                this.cancel()
            }

        }
    }  
</script>

