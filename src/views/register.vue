<template>
<div>
   <div class="columns is-vcentered register">
      <div class="column is-4 is-offset-4">
            <h1 class="title">
              註冊 - 建立新帳號
            </h1>
            <div class="box">              
               <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
                  <label class="label">Email</label>
                  <p class="control">
                      <input name="user.email" class="input" type="text" v-model="form.user.email" >
                      <p class="help is-danger" v-if="form.errors.has('user.email')" v-text="form.errors.get('user.email')"></p>
                  </p>
                 
                  <label class="label">密碼</label>
                  <p class="control">
                      <input name="user.password" class="input" type="password" v-model="form.user.password" >
                      <p class="help is-danger" v-if="form.errors.has('user.password')" v-text="form.errors.get('user.password')"></p>
                  </p>
                  <label class="label">確認密碼</label>
                  <p class="control">
                      <input name="user.confirmation" class="input" type="password" v-model="form.user.confirmation" >
                      <p class="help is-danger" v-if="form.errors.has('user.confirmation')" v-text="form.errors.get('user.confirmation')"></p>
                  </p>
                   <hr>
                  <label class="label">使用者名稱</label>
                  <p class="control">
                      <input name="user.name" class="input" type="text"  placeholder="例如：阿水" v-model="form.user.name" >
                      <p class="help is-danger" v-if="form.errors.has('user.name')" v-text="form.errors.get('user.name')"></p>
                  </p>
                  <label class="label">手機號碼</label>
                  <p class="control">
                      <input name="user.phone" class="input" type="text"  v-model="form.user.phone" >
                      <p class="help is-danger" v-if="form.errors.has('user.phone')" v-text="form.errors.get('user.phone')"></p>
                  </p>
                  <hr>
                  <p class="control">
                    <button type="submit" class="button is-primary" :disabled="form.errors.any()">確認送出</button>
                    <p class="help is-danger" v-if="failed">建立新帳號失敗</p>
                  </p>
                </form>
            </div>
            
      </div>
    </div>

    <modal title="為確保您的Email正確無誤，系統已發送會員認證信到您的電子信箱" :backdrop-closable="false"  :width="confirmSettings.width" 
        :is-show="confirmSettings.show" transition="fadeDown" @close="onConfirmed"
         ok-text="確定" :show-cancel="false">
     
      
      <p class="title is-5">請至您註冊的電子信箱 <span v-text="confirmSettings.user.email"></span> 開啟我們mail給您的會員認證信來完成認證.</p>
      <p class="title is-5 help is-info">※您必須完成Email認證才可開通會員權限</p>
    </modal>
</div>    
</template>


<script>
    export default{
        name:'Register',
        data(){
            return {
              form: new Form({
                    user: {
                        email:'',
                        password:'',
                        phone:'',
                        name:'',
                        confirmation:''
                    },
                    
                }),
               failed:false,
               confirmSettings:{
                   show:false,
                   width:600,
                   user:{}
               }
               
            }
        },
       
        methods: {
            clearErrorMsg(name) {
                this.form.errors.clear(name)
                this.failed = this.form.errors.any()
            },
            onSubmit(){
                
                let url=Helper.getApiUrl('/register')
                this.form.post(url)
                .then((user) => {
                    this.confirmSettings.user=user
                    Bus.$emit('okmsg','成功建立新帳號')
                    this.confirmSettings.show=true
                     
                }).catch(error => {
                    this.failed=true
                })
            },
            onConfirmed(){
              this.redirect()
              //this.confirmSettings.show=false
            },
            redirect(){
               this.$router.push('/')
            }
        },



    }
</script>

<style scoped>
   
   .register{
     font-size: 16px;
   }
</style>