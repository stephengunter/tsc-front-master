<template>
<div class="columns is-vcentered login">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              登入
            </h1>
            <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
            <div class="box">

               <label class="label">Email</label>
               <p class="control">
                <input class="input" type="text" v-model="form.username" >
                <p class="help is-danger" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></p>
               </p>
               <label class="label">密碼</label>
                <p class="control">
                  <input class="input" type="password" v-model="form.password" >
                  <p class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
                </p>
                <hr>
                <p class="control">
                  <button type="submit" class="button is-primary">確認送出</button>                
                  <p class="help is-danger" v-if="form.errors.has('error')" >登入失敗</p>
                </p>

            </div>
            </form>
            <p class="has-text-centered" style="margin-top: 20px;">
            還沒有帳號?&nbsp;
              <a href="register.html">註冊</a>&nbsp;|&nbsp;<a href="#">無法登入?</a> 
              
              
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
            init() {
               let data=Helper.getLoginFormData()
               this.form=new Form(data)
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
            getToken(){
                return new Promise((resolve, reject) => {
                     let url=Helper.getUrl('/oauth/token') 
                     this.form.post(url)
                     .then(response => {
                       
                        let token=response.access_token
                        let expiration=response.expires_in + Date.now()
                        let refreshToken=response.refresh_token
                        this.$auth.setToken(token , expiration,refreshToken)
                        axios.defaults.headers.common.Authorization='Bearer ' + this.$auth.getToken()

                        resolve(true);
                     })
                     .catch(error => {
                         reject(error.response);
                          this.$notify.open({content: '登入失敗', type: 'danger'});
                         Helper.BusEmitError(error,'登入失敗')
                     })
                });
            },
            onSubmit(){
               this.$notify.open({
                      content: '登入成功',
                      type: 'success',
                      placement: 'top-center',
                      duration: 1500,
                    })
               // this.$notify.open({content: '登入失敗', type: 'danger'});
               return
                this.checkInput()
               
                if(this.form.errors.any()) {
                   return false
                }

               let url=Helper.getUrl('/oauth/token') 
                   this.form.post(url)
                   .then(response => {
                     
                      let token=response.access_token
                      let expiration=response.expires_in + Date.now()
                      let refreshToken=response.refresh_token
                      this.$auth.setToken(token , expiration,refreshToken)
                      axios.defaults.headers.common.Authorization='Bearer ' + this.$auth.getToken()

                      this.$notify.open({content: '登入成功', type: 'success',placement: 'top-center',});

                   })
                   .catch(error => {
                       reject(error.response);
                        this.$notify.open({content: '登入失敗', type: 'danger',placement: 'top-center',});
                       Helper.BusEmitError(error,'登入失敗')
                   })
            }
            
            
           
        },


  }
</script>


<style scoped>
   
   .login{
     font-size: 16px;
   }
</style>

