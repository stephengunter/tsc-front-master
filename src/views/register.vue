<template>
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
                    
                  </p>
                </form>
            </div>
            
      </div>
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
              
            }
        },
        methods: {
            clearErrorMsg(name) {
                this.form.errors.clear(name);
            },
            onSubmit(){

                let url=Helper.getUrl('/api/users/register')
               
                this.form.post(url)
                .then((user) => {
                     this.$notify.open({
                        content: '成功建立新帳號',
                        type: 'success',
                        placement: 'top-center',
                        duration: 1500,
                      })

                      this.redirect()
                     
                }).catch(error => {
                   let errors={
                      login:['註冊失敗']
                   }
                  
                   this.form.onFail(errors)
                })
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