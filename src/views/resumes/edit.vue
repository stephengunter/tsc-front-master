<template>
  <div>
    

    <edit-resume @cencel="onCancel" @saved="onSaved"></edit-resume>
    
    <modal title="您的履歷已存檔" :backdrop-closable="false"  :width="confirmSettings.width" 
        :is-show="confirmSettings.show" transition="fadeDown" @close="onConfirmClosed"
         ok-text="確定" :show-cancel="false">
         <p class="title is-5">如果我們有符合您專才的課程需求，我們會盡快與您聯繫！</p>
     
    </modal>
     
  </div> 
</template>


<script>
  import EditResume from '../../components/resume/edit.vue'
 
  
  export default {
      name:'ResumeView',
      components:{
         'edit-resume':EditResume         
      },
      beforeMount() {
          
      },
      data(){
          return{
             
              confirmSettings:{
                   show:false,
                   width:600,
              },
             
          }
      },
      methods:{
          init(){
              
          },
          onCancel(){
              this.$router.push('/wanted')
          },
          onSaved(){
            this.confirmSettings.show=true
          },
          onConfirmClosed(){
              this.confirmSettings.show=false
              this.$router.push('/')
          },
          
      }
  }  
</script>


<style>
    
</style>