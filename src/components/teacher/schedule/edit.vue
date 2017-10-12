<template>
<tr v-if="readOnly" >
     <th scope="row" v-text="entity.order"></th> 
     <td  v-text="entity.title"></td> 
     <td  v-text="entity.content"></td>
     <td  v-text="entity.materials"></td>
       
     <td>
       
        <a v-show="can_edit" class="button is-small is-info is-outlined" @click.prevent="beginEdit">
           <span class="icon">
             <i class="fa fa-pencil" aria-hidden="true"></i>
           </span> 
                          
        </a>
        <a v-show="can_edit" class="button is-small is-danger" @click.prevent="btnDeleteClicked">
           <span class="icon">
             <i class="fa fa-trash" aria-hidden="true"></i>
           </span> 
                          
        </a>
        
     </td> 
</tr>
<tr v-else>
    <td  v-if="loaded">
        <div class="control">
          <div class="select">
            <select v-model="schedule.order" >
               <option v-for="item in orderOptions" :value="item.value" v-text="item.text"></option>
            </select>
          </div>
        </div>
    </td>
    <td v-if="loaded">
        <textarea name="schedule.title" class="textarea" v-model="schedule.title"></textarea>
        <p class="help is-danger" v-if="form.errors.has('schedule.title')" v-text="form.errors.get('schedule.title')"> </p>
        
    </td>  
    <td v-if="loaded">
        
         <textarea name="schedule.content" class="textarea" v-model="schedule.content"></textarea>
        
    
    </td> 
    <td v-if="loaded">
        <textarea name="schedule.materials" class="textarea" v-model="schedule.materials"></textarea>
        
    
    </td> 
    <td v-if="loaded">
         
        <a @click.prevent="onSubmit" :disabled="form.errors.any()"  class="button is-small is-success is-outlined" >
           <span class="icon">
             <i class="fa fa-floppy-o" aria-hidden="true"></i>
           </span> 
                          
        </a>
        <a @click.prevent="cancelEdit"  class="button is-small is-light" >
           <span class="icon">
             <i class="fa fa-refresh" aria-hidden="true"></i>
           </span> 
                          
        </a>
    </td> 
</tr>  
</template>


<script>
    export default {
        name: 'EditSchedule',
        props: {
            entity: {
               type: Object,
               default: null
            },
            course_id:{
               type:Number,
               default:0
            },
            can_edit:{
               type:Boolean,
               default:true
            },
            
            
        },
        data() {
            return {
                readOnly:true,
                loaded:false,

                schedule:{},                
                form:{},
             
                orderOptions: []
           
            }
        },
        computed:{
            creating(){
                let id=this.getId()
                if(id) return  false
                return true     
            }
        },
        
        beforeMount() {
           this.init();
        },
        methods: {
            getId(){
                if(this.entity) return Helper.tryParseInt(this.entity.id)
                return 0
            },            
            init(){  
                if(this.entity){
                    this.readOnly=true                  
                }else{
                    this.loaded=false
                    this.readOnly=false
                     
                    this.fetchData()
                } 
                          
            },
            fetchData(){
                this.form=new Form({
                    schedule:{}
                })
                this.orderOptions= Helper.numberOptions(1,60)  
                let getData=null
                let id=this.getId()
                if(id){
                    getData=Schedule.edit(id)
                }else{
                    getData=Schedule.create(this.course_id)
                }
                getData.then(data => {
                    this.schedule = data.schedule
                    this.loaded=true                    
                })
                .catch(error=> {
                    Helper.BusEmitError(error)
                })
            },
            
            beginEdit(){
              
                this.loaded=false
                this.readOnly=false
                this.fetchData()

                this.$emit('editting', this.getId())
            },
            cancelEdit(){
                this.$emit('canceled')
               
            },      
            btnDeleteClicked(){

                let values={
                    id:this.getId(),
                    name:this.entity.title
                }
             
                this.$emit('btn-delete-clicked' , values)
            },
            clearErrorMsg(name) {
                this.form.errors.clear(name)
            },
            onSubmit() {
                this.submitForm()
            },
            submitForm() {
                this.form.schedule=this.schedule
                let save = null
                let id=this.getId()
                if(id){
                    save=Schedule.update(this.form, id)
                }else{
                    save=Schedule.store(this.form)
                }
             
                save.then(result => {
                   Bus.$emit('okmsg','存檔成功')
                   this.readOnly=true;
                  
                   this.$emit('saved')
                })
                .catch(error => {
                    Bus.$emit('errors',error,'存檔失敗')
                })
            },
            
            
        },

    }
</script>
