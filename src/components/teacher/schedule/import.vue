<template>
    <div class="panel">
        <div class="panel-heading heading">
           <span class="panel-title">匯入課程預定進度</span> 

            <div class="control">
                 <span class="select">
                      <select @change="getSchedules" v-model="selectedCourse" >
                         <option v-for="item in courseOptions" :value="item.value" v-text="item.text"></option>
                      </select>
                 </span>
                 
        
                <a :disabled="!isValid" @click.prevent="onSubmit" class="button is-primary is-medium" >
               
                   確定送出
               </a>

            </div>
            
        </div>
        <div class="panel-block">
            <table class="table">
             <thead> 
                <tr> 
                    <th style="width:7%">#</th> 
                    <th style="width:35%">課目標題</th> 
                    <th style="width:35%">內容</th> 
                    <th style="width:20%">材料</th>
                   
                </tr> 
            </thead>
            <tbody> 
               
                <tr v-for="schedule in scheduleList"> 
                    <th scope="row" v-text="schedule.order"></th> 
                    <td v-text="schedule.title"></td> 
                    <td v-text="schedule.content"></td>
                    <td v-text="schedule.materials"></td>                     
                </tr> 
                
            </tbody> 
            </table>
        </div>
        
    </div>
</template>



<script>
     export default {
        name: 'ScheduleImportor',
        props: {
           
            course_id: {
                type: Number,
                default: 0
            },  
        },
        beforeMount() {
           this.init()
        },
        computed:{
            hasData(){
                if(this.scheduleList.length) return true
                return false    
            },
            isValid(){
                if(Helper.tryParseInt(this.selectedCourse) <1 ) return false
                return this.hasData
            }
        },
        data() {
            return {
                
                
                courseOptions:[],             
                scheduleList:[],    

                selectedCourse:0,            
            
                form:{},
                import:{},
               

               
             
            }
        },
        methods: {
            init(){

                this.selectedCourse=0
                this.courseOptions=[]  
                this.scheduleList=[]  
                this.import={}
                this.form=new Form({
                    import:{}
                })   

                this.fetchData()

            },
            fetchData(){
                let url = '/import-schedules/create?to=' + this.course_id 
                 url =Helper.getApiUrl(url)
                 axios.get(url)
                .then(response => {
                    this.import=response.data.import
                    this.setCourseOptions(response.data.courseOptions)
                    this.scheduleList=response.data.scheduleList
                    
                })
                .catch(error => {
                    Bus.$emit('errors',error)
                })
            },
            getSchedules(){
                let course=this.selectedCourse
                if(!course) return false

                let url = '/import-schedules/create?course=' +  course
                 url =Helper.getApiUrl(url)
                 axios.get(url)
                .then(response => {
                    
                    this.scheduleList=response.data.scheduleList
                })
                .catch(error => {
                    Bus.$emit('errors',error)
                })
            },
          
            setCourseOptions(options){
                if(!options.length){
                    let err={
                        response:{
                            data:{}
                        }
                    }
                   
                    let msg='無舊資料可匯入'
                    this.$emit('failed',err,msg)
                  
                    return false
                }
                for(let i = options.length-1; i>=0; i--){

                   if (options[i].value == this.course_id ) {
                  
                          options.splice(i, 1);
                   }                           
                }
                this.selectedCourse=options[0].value
                this.courseOptions=options

               
            },

            onSubmit(){
                this.import.from_course=this.selectedCourse
                this.import.to_course=this.course_id
                this.form.import= this.import
                this.submitImport()
            },
            submitImport(){
                let url = '/import-schedules'
                url =Helper.getApiUrl(url)
                this.form.post(url)
                    .then(result => {
                         
                         this.$emit('success')
                    })
                    .catch(error => {     
                         this.$emit('failed',error,'匯入失敗')
                    })
            }
        }
     }
</script>