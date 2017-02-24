<template>
<div class="container">
    <nav class="nav">
        <div class="nav-left">
           <router-link to="/" class="nav-item is-tab">     
             <img :src="src" alt=""> 
           </router-link>
           
        </div>

        <div class="nav-center">
            <router-link to="/centers" class="nav-item is-tab">     
             <i class="fa fa-university" aria-hidden="true" exact></i>&nbsp; 開課中心 
             </router-link>
              <router-link to="/courses" class="nav-item is-tab">     
             <i class="fa fa-book" aria-hidden="true"></i>&nbsp; 課程總覽 
               </router-link>
        </div>


        <span id="nav-toggle" class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </span>


         <div id="nav-menu" class="nav-right nav-menu"> 
           
             <router-link to="/login" class="nav-item is-tab">               
               <i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp; 登入          
             </router-link>
             <router-link to="/register" class="nav-item is-tab">               
               <i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;註冊         
             </router-link>

            
    
            <span class="nav-item">
               
            </span>
    
        </div>
    </nav>
</div> 
</template>



<script>
export default {
  name: 'top-header',
  data () {
    return {
        src: require('../assets/logo.gif'),
    }
  },

}
</script>