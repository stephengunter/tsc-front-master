<template>
    <show v-if="readOnly"  :id="id" :can_edit="can_edit"   
       @edit="beginEdit" >              
    </show>

   <!--  <edit v-else :id="id" 
       @saved="onSignupSaved"   @canceled="cancelEdit" >                 
    </edit> -->
</template>


<script>
  import Show from './show.vue'
  // import Edit from './edit.vue'
  export default {
     name:'Signup',
     components: {
            Show,
            // Edit,
     },
     props: {
        id: {
          type: Number,
          default: 0
        },
        can_edit:{
           type: Boolean,
           default: true
        },   
           
     },
     data(){
       return {
          readOnly:true
       }
     },
     methods:{
        init(){
            
        },  
        beginEdit(){
            this.readOnly=false
        },
        cancelEdit(){
            this.readOnly=true
        },
        onSignupSaved(){
             this.readOnly=false
        }
        
     }
  }

    
</script>


<style>

</style>