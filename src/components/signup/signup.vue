<template>

 <div class="panel">
    <div class="panel-heading panel-title heading" >
        報名紀錄
        <a v-show="canEdit" class="button is-info is-outlined" @click.prevent="beginEdit">
           <span class="icon">
             <i class="fa fa-pencil fa-1" aria-hidden="true"></i>
           </span> 
           <span>修改</span>
        </a>
    </div>
    <div  class="panel-block info">
            <div class="columns is-multiline" style="width:100%">                
                <div :class="columnClass">
                     報名課程：<span v-html="signup.formatedCourseName"></span>         
                </div>
                <div :class="columnClass">
                     課程費用： <span v-html="signup.formatedTuition"></span>    
                </div>
                <div :class="columnClass">
                     報名日期： {{  signup.date }}    
                </div>
                
                <div :class="columnClass">
                     狀態： {{  signup.statusText }}  
                </div>
            </div>
      </div>
  

</div>
</template>


<script>
  export default {
     name:'Signup',
     props:['signup','disable_edit'],
     data(){
       return {
          canEdit:true,
          columnClass:'column is-one-quater-mobile is-half-tablet is-half-desktop'
       }
     },
     beforeMount() {
         this.init()
     }, 
     methods:{
        init(){
             if(this.disable_edit) this.canEdit=false      
        },  
        beginEdit(){
          this.$emit('beginEdit')
        }, 
        
     }
  }

    
</script>


<style>

</style>