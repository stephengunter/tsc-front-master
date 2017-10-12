<template>
<tr v-if="readOnly" >
     <th scope="row" v-text="entity.order"></th> 
     <td  v-text="entity.title"></td> 
     <td  v-text="entity.content"></td>
     <td  v-text="entity.materials"></td>
       
     <td>
       
        <a class="button is-small is-info is-outlined" @click.prevent="beginEdit()">
           <span class="icon">
             <i class="fa fa-pencil" aria-hidden="true"></i>
           </span> 
                          
        </a>
        <a class="button is-small is-danger" @click.prevent="btnDeleteClicked()">
           <span class="icon">
             <i class="fa fa-trash" aria-hidden="true"></i>
           </span> 
                          
        </a>
        
     </td> 
</tr>
<tr v-else>
    <td v-if="loaded">
        <select  v-model="schedule.order"  class="form-control" >
             <option v-for="item in orderOptions" :value="item.value" v-text="item.text"></option>
        </select>
    </td>
    <td v-if="loaded">
        <input type="text" name="schedule.title" @keydown="clearErrorMsg('schedule.title')" class="form-control" v-model="schedule.title">
        <small class="text-danger" v-if="form.errors.has('schedule.title')" v-text="form.errors.get('schedule.title')"></small>
    </td>  
    <td v-if="loaded">
          <textarea rows="5" cols="50" class="form-control" name="schedule.content"  v-model="schedule.content">
          </textarea>
    </td> 
    <td v-if="loaded">
         <textarea rows="5" cols="50" name="schedule.materials" class="form-control" v-model="schedule.materials"> </textarea>
    </td>
    
   
    <td v-if="loaded">
         
        <!-- <button @click.prevent="onSubmit"  class="btn btn-success btn-xs">
            <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
        </button>  
         <button  class="btn btn-default btn-xs" @click.prevent="cancelEdit">
             <span aria-hidden="true" class="glyphicon glyphicon-refresh"></span>
        </button> -->
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
            editting:{
               type: Boolean,
               default: false
            }
            
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
                if(this.schedule){
                    this.readOnly=true                  
                }else{
                    this.loaded=false
                    this.readOnly=false
                     
                    this.fetchData()
                } 
                          
            },
            fetchData(){
                this.orderOptions= Helper.numberOptions(1,60)  
                let getData=null
                let id=this.getId()
                if(id){
                    getData=Schedule.edit(id)
                }else{
                    getData=Schedule.create(this.course_id)
                }
                getData.then(data => {
                    let schedule= data.schedule
                 
                    this.form=new Form({
                        schedule: schedule
                    }) 
                   
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

                this.$emit('editting', this.schedule.id)
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
                let save = null
                let id=this.getId()
                if(id){
                    save=Schedule.update(this.form, id)
                }else{
                    save=Schedule.store(this.form)
                }
             
                save.then(result => {
                   Helper.BusEmitOK()
                   this.readOnly=true;
                  
                   this.$emit('saved')
                })
                .catch(error => {
                    Helper.BusEmitError(error,'存檔失敗')
                })
            },
            
            
        },

    }
</script>
