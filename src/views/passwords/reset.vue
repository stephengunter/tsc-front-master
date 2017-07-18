<template>
<div v-if="loaded" >
    <div v-if="submitted">
        
    </div>
    <div v-else class="columns is-vcentered register">
      <div class="column is-4 is-offset-4">
            <h1 class="title">
              重設密碼
            </h1>
            <div class="box">              
               <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
                  <label class="label">Email</label>
                  <p class="control">
                      <input type="email" name="email" class="input" v-model="form.email">
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
                      <p class="help is-danger" v-if="failed" >重設密碼失敗</p>
                  </p>

                </form>
            </div>
            
      </div>
    </div>





</div>

</template>

<script>


    export default {
        name:'ResetPassword',
        beforeMount(){
           this.init()
        },
        data(){
            return{
               
                form:{},
                submitted:false,
                failed:false,

                count:3, 
            }
        },
        watch: {
           '$route': 'init'
        },
        computed:{
            seconds(){
                return this.count + ' 秒'
            },
            loaded(){
                if(!this.form.user_id) return false 
                if(!this.form.token) return false 
                return true
            }
        },
        methods:{
            init(){
               
                this.form=new Form({
                         user_id: '',
                         token: '',
                         email:'',
                         password:'',
                         password_confirmation:'',
                    })
                if(this.$route.query){
                    let token=this.$route.query.token
                    let user_id=this.$route.query.user
                    this.form.user_id=user_id
                    this.form.token=token
                }
                
                
            },
            clearErrorMsg(name) {
                this.form.errors.clear(name)
                this.failed = this.form.errors.any()
            },
            countDown(){
                window.setInterval(() => {
                    if (this.count > 1) {
                        this.count--;
                    } else {
                        let url=Helper.getHomeUrl()
                         document.location = url
                    }
                },1000);
               
            },
            onSubmit() {
                  let url=Helper.getApiUrl('/reset-password')
        let method='post'
        this.form.submit(method,url)
                .then(data => {
                   
                })
                .catch(error => {
                    console.log(error)
                   
                })
                return false
                //this.submitForm()
            },
            submitForm(){
                
                let store=Password.reset(this.form)
                
                store.then(data => {
                   
                })
                .catch(error => {
                    alert('err')
                    // if(error.status==422){
                    //     alert('422')
                    // }else{
                    //     alert('damn')
                    // }
                })
               
            },
            redirect(){
               this.$router.push('/')
            }
        },
        
    }
</script>