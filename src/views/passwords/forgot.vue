<template>
<div> 
  <div class="columns is-vcentered register">
      <div class="column is-4 is-offset-4">
            <h1 class="title">
              忘記密碼
            </h1>
            <div class="box">              
               <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
                  <label class="label">Email</label>
                  <p class="control">
                      <input type="email" name="email"  class="input" v-model="form.email">
                      <p class="help is-danger" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></p>
                  </p>
                 
                  <hr>
                  <p class="control">
                    <button type="submit" class="button is-primary" :disabled="form.errors.any()">啟動密碼重設程序</button>
                      <p class="help is-danger" v-if="failed" >啟動密碼重設程序失敗</p>
                  </p>

                </form>
            </div>
            
      </div>
  </div>
  <modal title="已為您啟動密碼重設程序" :backdrop-closable="false"  :width="confirmSettings.width" 
        :is-show="confirmSettings.show" transition="fadeDown" @close="onConfirmed"
         ok-text="確定" :show-cancel="false">
     
      
      <p style="line-height:2;font-size:1.2em">系統已發送驗證信到您的電子信箱 <span v-text="confirmSettings.user.email"></span> </p>
      <p style="line-height:2;font-size:1.2em">
           <em style="color:blue;">驗證碼於24小時內有效</em>，驗證成功即可重新設定您的密碼。
      </p>
  </modal>
</div>           
         
          
 
</template>


<script>
  export default {
      name:'ForgotPassword',
      beforeMount() {
          this.init()
      },
      data(){
          return{
             form:{},
             failed:false,
             
             confirmSettings:{
                   show:false,
                   width:600,
                   user:{}
             },
             
          }
      },
      methods:{
          init() {
               this.form=new Form({
                     email:'',
               })
          }, 
          clearErrorMsg(name) {
                this.form.errors.clear(name)
                this.failed = this.form.errors.any()
          },
          onSubmit(){
                let store=Password.forgot(this.form)
                store.then(result => {
                    this.confirmSettings.user.email=this.form.email    
                    this.confirmSettings.show=true                
                })
                .catch(error => {
                      this.failed=true
                })
          },
          onConfirmed(){
            this.$router.push('/')
          },
      }
  }  
</script>


<style>
    
</style>