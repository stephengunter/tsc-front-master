<template>
    <div class="box">
        <div class="columns is-multiline info" style="width:100%">
            <div :class="columnClass">
                 報名課程：
                 <a :href="signup.courseDetailsUrl" target="blank">
                     <span v-html="signup.formatedCourseName"></span>    
                 </a>   
            </div>
            <div :class="columnClass">
                 課程費用： <span v-html="signup.formatedTuition"></span>    
            </div>
            <div :class="columnClass">
                 報名日期： {{  signup.date }}    
            </div>
            
            <div :class="columnClass">
                 狀態： {{  signup.statusText }}    &nbsp;&nbsp;

               <!--  <a v-if="signup.canCancel" @click.prevent="cancel" class="button is-small is-danger is-outlined">
                    <span>取消</span>
                    <span class="icon is-small">
                      <i class="fa fa-times"></i>
                    </span>
                </a> -->
                <a  @click.prevent="cancel" class="button is-small is-danger is-outlined">
                    <span>取消</span>
                    <span class="icon is-small">
                      <i class="fa fa-times"></i>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>  


<script>
  
  export default {
        name:'SignupCard',
        props:{
            entity:{
                type:Object,
                default:{}
            }
        },
        data(){
           return {
               columnClass:'column is-one-quater-mobile is-half-tablet is-half-desktop',
               signup:{}
           }
        },
        beforeMount() {
           this.init()
        }, 
        methods: {
            init(){
                this.signup=new Signup(this.entity)
            },
            cancel(){
                let values={
                    id:this.signup.id,
                    name:this.signup.course.name
                }
                this.$emit('cencel',values)
            }
        }
  }

    
</script>