<template>
    <div class="columns is-vcentered login">
        <div class="column is-4 is-offset-4">
            <h1 class="title">
              登入
            </h1>
            <div class="box">
                <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
             
                    <label class="label">Email</label>
                    <p class="control">
                      <input name="username" class="input" type="text" v-model="form.username" >
                      <p class="help is-danger" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></p>
                    </p>
                    <label class="label">密碼</label>
                    <p class="control">
                      <input name="password" class="input" type="password" v-model="form.password" >
                      <p class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
                    </p>
                    <hr>
                    <p class="control">
                      <button type="submit" class="button is-primary" :disabled="form.errors.any()">確定</button>
                                    
                      <p class="help is-danger" v-if="form.errors.has('login')" >登入失敗</p>
                    </p>

              
                </form>
            </div>
            <p class="has-text-centered" style="margin-top: 20px;">
            還沒有帳號?&nbsp;
              <a @click="$router.push('/register')">註冊</a>&nbsp;|&nbsp;<a href="#">無法登入?</a> 
              
              
            </p>
          </div>
  </div>

</template>

<script>
  export default {
      name: 'Login',
      data() {
          return {
              form:{}
          }
      },
      beforeMount() {          
          this.init()
      },
      methods: {
            init(){ 
               this.form=new Form({
                    username:'',
                    password:''
                })
            }, 
            clearErrorMsg(name) {
                this.form.errors.clear(name);
               
                if(this.form.errors.has('password')) return
                if(this.form.errors.has('username')) return

                this.form.errors.clear()

            },
            checkInput(){
                let errors={}
                if(!this.form.username){
                   errors.username=['必須輸入Email']
                }
                if(!this.form.password){
                   errors.password=['必須輸入密碼']
                }
                this.form.onFail(errors)
            },
           
            onSubmit(){
                this.checkInput()
               
                if(this.form.errors.any()) {
                   return false
                }
                let username=this.form.username
                let password=this.form.password

                let login=this.$auth.login(username,password)
                login.then(() => {
                     Bus.$emit('authChanged', true) 
                    
                     this.$notify.open({
                        content: '登入成功',
                        type: 'success',
                        placement: 'top-center',
                        duration: 1500,
                      })

                     this.redirect()
                     
                }).catch(error => {
                   let errors={
                      login:['登入失敗']
                   }
                  
                   this.form.onFail(errors)
                   
                })
            },
            redirect(){
               let returnUrl=this.$route.query.return
               if(returnUrl){
                  this.$router.push('/' + returnUrl)
               }else{
                  this.$router.push('/')
               }
            }
        },


  }
</script>


<style scoped>
   
   .login{
     font-size: 16px;
   }
</style>

