<template>
<div>
<div class="panel">
    <div class="panel-heading panel-title heading" >
        課程預定進度
        <div>
            <a :disabled="!indexMode"  class="button is-primary" @click.prevent="beginImport">
               <span class="icon">
                 <i class="fa fa-upload" aria-hidden="true"></i>
               </span> 
               <span>匯入</span>
            </a>
            <a :disabled="!indexMode"  class="button is-info is-outlined" @click.prevent="beginCreate">
               <span class="icon">
                 <i class="fa fa-plus" aria-hidden="true"></i>
               </span> 
               <span>新增</span>
            </a>
        </div>
    </div> 
    <div class="panel-block">   
        <table class="table">
            <thead>
                <tr>
                    <th style="width:5%">順序</th>
                    <th>課目標題</th>
                    <th>內容</th>
                    <th>教材</th>
                    <th style="width:8%"></th>
                </tr>
            </thead>
            <tbody v-if="loaded">
                <edit v-if="creating" :course_id="course_id"  @saved="onCreated" 
                       @canceled="onCreateCanceled" > 
                </edit>  

                <edit  v-for="schedule in scheduleList"  :entity="schedule" 
                    :can_edit="indexMode"
                    @editting="onEditting" @canceled="onEditCanceled"
                    @saved="onUpdated"  @btn-delete-clicked="beginDelete" >
                </edit>
            </tbody>
        </table> 
    </div>   
 </div>      


<modal  :is-show="deleteConfirm.show" :show-header="false"  
:on-ok="deleteSchedule" ok-text="確定" cancel-text="取消" @close="deleteConfirm.show=false">     
   <article class="message is-danger">
      <div class="message-header">
          <p style="font-weight: bold;font-size:19px">
          <i class="fa fa-exclamation-triangle"></i>
              警告
          </p>
      </div>
      <div class="message-body info">
         {{ deleteConfirm.msg }}
      </div>
    </article>
</modal>
<modal  :is-show="importSettings.show" :show-header="true" :show-footer="false" 
 :width="importSettings.width" @close="importSettings.show=false">     

    <importor v-if="importSettings.show" :course_id="course_id" @success="onImportSuccess" @failed="onImportFailed"></importor>
</modal>
</div>
</template>

<script>
    import Edit from './edit.vue'
    import Importor from './import.vue'
    export default {
        name: 'ScheduleView',
        components: {
             Edit,
             Importor
        },
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
            indexMode(){
                if(this.creating) return false
                if( Helper.isTrue(this.editting)){
                    return false
                }
               
                    return true
            }
        },
        data() {
            return {
                loaded:false,
                creating:false,
                editting:0,
                scheduleList:[],

                deleteConfirm:{
                    id:0,
                    show:false,
                    msg:'',

                },

                importSettings:{
                    course_id:0,
                    show:false,
                    width:1000,
                }
               
            }
        },
        methods: {
            init() {
                this.loaded=false

                this.creating=false
                this.editting=0
                
                this.deleteConfirm={
                    id:0,
                    show:false,
                    msg:''
                }

                this.importSettings={
                    course_id:0,
                    show:false,
                    width:1000,
                }

                this.scheduleList=[]
                this.fetchData()
            },
            fetchData() {
                let getData=Schedule.index(this.course_id)
                    getData.then(data => {
                       this.scheduleList=data.scheduleList
                       this.loaded = true
                        
                    })
                    .catch(error => {
                        Helper.BusEmitError(error)
                    })
            },
            
            beginCreate(){
                this.creating=true

            },
            endCreate(){
                 this.creating=false
            },
            onEditting(id){
                this.editting=id
            },
            OnEditCanceled(){
                this.editting=0
            },
            cancelCreate(){
               this.creating=false
               
            },
            
            beginDelete(values){
                this.deleteConfirm.msg='確定要刪除進度『 ' + values.name + ' 』嗎？'
                this.deleteConfirm.id=values.id
                this.deleteConfirm.show=true                
            },
            onDeleteCanceled(){
                this.deleteConfirm.show=false
            },
            deleteSchedule(){
                let id = this.deleteConfirm.id 
                let remove= Schedule.delete(id)
                remove.then(result => {
                    Bus.$emit('okmsg','刪除成功')                   
                    this.init()
                    
                })
                .catch(error => {
                    Bus.$emit('errors',error,'存檔失敗')
                    this.closeConfirm()   
                })
            },

            onCreated(schedule){    
                this.init()
               
            },
            onCreateCanceled(){
                this.init()
            },
            onEditCanceled(){
                this.init()
            },
            onUpdated(schedule){ 
                 this.init()
                 
            },
            beginImport(){
                
                this.importSettings.course_id=this.course_id
                this.importSettings.show=true
            },
            importCanceled(){
                this.importSettings.show=false
            },
            onImportSuccess(){
                this.importSettings.show=false
                Bus.$emit('okmsg','匯入成功')
                this.init()
            },
            onImportFailed(error,msg){
               this.importSettings.show=false
               let message='匯入失敗'
               if(msg) message= msg
               Bus.$emit('errors',error,message)
            },
            
           
        },

    }
</script>