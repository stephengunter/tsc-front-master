<template>
<div class="columns is-vcentered login">
          <div class="column is-4 is-offset-4">
            <h1 class="title has-text-centered">
              登入
            </h1>
            <div class="box">
              <label class="label">Email</label>
              <p class="control">
                <input class="input" type="text" placeholder="Email">
              </p>
              <label class="label">密碼</label>
              <p class="control">
                <input class="input" type="password" placeholder="Password">
              </p>
              <hr>
              <p class="control">
                <button class="button is-primary">確認送出</button>
                
              </p>
            </div>
            <p class="has-text-centered">
            還沒有帳號?
              <a href="register.html">註冊</a>
              | 
              <a href="#">無法登入?</a>
            </p>
          </div>
        </div>

</template>

<script>
  export default {
      name:'login',
      data(){
        return {
          
        }
      }


  }
</script>


<style scoped>
   
   .login{
     font-size: 16px;
   }
</style>

