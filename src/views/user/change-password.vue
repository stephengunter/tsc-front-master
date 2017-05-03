<template>
  
 <div class="columns is-vcentered register">
      <div class="column is-4 is-offset-4">
            <h1 class="title">
              變更密碼
            </h1>
            <div class="box">              
               <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
                  <label class="label">舊密碼</label>
                  <p class="control">
                      <input type="password" name="current_password"  class="input" v-model="form.current_password">
                      <p class="help is-danger" v-if="form.errors.has('current_password')" v-text="form.errors.get('current_password')"></p>
                  </p>
                 
                  <label class="label">新密碼</label>
                  <p class="control">
                      <input name="password" class="input" type="password" v-model="form.password" >
                      <p class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
                  </p>
                  <label class="label">確認新密碼</label>
                  <p class="control">
                      <input name="password_confirmation" class="input" type="password" v-model="form.password_confirmation" >
                      <p class="help is-danger" v-if="form.errors.has('password_confirmation')" v-text="form.errors.get('password_confirmation')"></p>
                  </p>
                 
                  <hr>
                  <p class="control">
                    <button type="submit" class="button is-primary" :disabled="form.errors.any()">確認送出</button>
                      <p class="help is-danger" v-if="form.errors.has('submit')" >變更失敗</p>
                  </p>
                </form>
            </div>
            
      </div>
  </div>
          
         
          
 
</template>


<script>
  export default {
      name:'ChangePassword',
      beforeMount() {
          this.init()
      },
      data(){
          return{
            form:{}
          }
      },
      methods:{
          init() {
               this.form=new Form({
                     current_password:'',
                     password:'',
                     password_confirmation:'',
               })
          }, 
          clearErrorMsg(name) {
                this.form.errors.clear(name);

                if(this.form.errors.has('password')) return
                if(this.form.errors.has('current_password')) return
                if(this.form.errors.has('password_confirmation')) return

                this.form.errors.clear()
          },
          checkAuth(){
              return new Promise((resolve, reject) =>{
                  let authenticated=this.$auth.isAuthenticated()
                  authenticated.then(()=>{
                      resolve(true)
                       
                  }).catch(error => {
                        reject(error) 
                  })
              
              })
          },
          onSubmit(){
               let checkAuth=this.checkAuth()
               checkAuth.then(() => {
                    this.postForm()
                })
                .catch(error => {
                   this.authFailed()
                       
                })
           
          },
          authFailed(){
            this.$auth.logout()
            let returnUrl=this.$route.path
            this.$router.push('/login?return=' + returnUrl)
          },
          postForm(){
              let method='post'
              let url=Helper.getUrl('/api/password/change')  
              let password=this.form.password
              this.form.submit(method,url)
                  .then(user => {
                     let username=user.email
                     this.$auth.logout()
                     Bus.$emit('okmsg', '密碼已變更')

                     this.login(username,password)
                  })
                  .catch(error => {
                      let errors={
                        submit:['變更失敗']
                      }
                  
                      this.form.onFail(errors)
                    
                         
                  })
          },
          login(username,password){
                let login=this.$auth.login(username,password)
                login.then(() => {
                     Bus.$emit('authChanged', true) 
                     
                     this.redirect()
                     
                }).catch(error => {
                   this.$router.push('/login')
                   
                })
          },
          redirect(){
              this.$router.push('/')
          }
        
         

      }
  }  
</script>


<style>
    
</style>