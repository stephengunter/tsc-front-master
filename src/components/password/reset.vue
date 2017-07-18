<template>
    <div class="column is-4 is-offset-4">
            <h1 class="title">
              重設密碼
            </h1>
            <div class="box">              
               <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
                  <label class="label">Email</label>
                  <p class="control">
                      <input type="email" name="email" class="input" v-model="form.email">
                      <p class="help is-danger" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></p>
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
                     
                  </p>

                </form>
            </div>
            
      </div>
</template>

<script>


    export default {
        name:'ResetPassword',
        props: {
            user_id: {
              type: String,
              default: ''
            },
            token:{
               type: String,
               default: ''
            },          
           
        },
        beforeMount(){
           this.init()
        },
        data(){
            return{
                form:{}
            }
        },
        methods:{
            init(){

                 this.form=new Form({
                         user_id: this.user_id,
                         token: this.token,
                         email:'',
                         password:'',
                         password_confirmation:'',
                    })
                
                
            },
            clearErrorMsg(name) {
                this.form.errors.clear(name)
                this.failed = this.form.errors.any()
            },
            onSubmit() {
                this.submitForm()
            },
            submitForm(){
                
                let store=Password.reset(this.form)
                
                store.then(data => {
                    this.$emit('success',data)
                })
                .catch(error => {
                    if(Helper.inputsError(error)){

                    }else{
                         this.$emit('failed')
                    }
                    
                })
               
            },
           
        },
        
    }
</script>