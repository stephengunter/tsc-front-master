<template>
     <div class="columns is-vcentered register">
          <div class="column is-4 is-offset-4">
            <h1 class="title has-text-centered">
              註冊
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
              <label class="label">確認密碼</label>
              <p class="control">
                <input class="input" type="password" placeholder="Password Confirmation">
              </p>
               <hr>
              <label class="label">使用者名稱</label>
              <p class="control">
                <input class="input" type="text" placeholder="User Name">
              </p>
              <label class="label">手機號碼</label>
              <p class="control">
                <input class="input" type="text" placeholder="Phone Number">
              </p>
              <hr>
              <p class="control">
                <button class="button is-primary">確認送出</button>
                &nbsp;  &nbsp;
                <button class="button is-default">取消</button>
              </p>
            </div>
            <p class="has-text-centered">
             已經有帳號了? <a href="login.html">登入</a>
             
            </p>
          </div>
      </div>
</template>


<script>
    export default{
        name:'register',
        data(){
            return {

            }
        }



    }
</script>

<style scoped>
   
   .register{
     font-size: 16px;
   }
</style>