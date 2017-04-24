<template>
<div class="container">
    <nav class="nav">
        <div class="nav-left">
         <!--  <a class="nav-item  is-hidden-tablet">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a> -->
           <router-link to="/" class="nav-item">     
             <img :src="src" alt=""> 
           </router-link>
           
        </div>

        <div class="nav-center is-hidden-mobile" >
            <router-link to="/centers" class="nav-item is-tab">     
               <i class="fa fa-university" aria-hidden="true" exact></i>&nbsp; 開課中心 
            </router-link>
            <router-link to="/courses" class="nav-item is-tab">     
               <i class="fa fa-book" aria-hidden="true"></i>&nbsp; 課程總覽 
            </router-link>
        </div>

        <span @click.prevent="toggleMobileMenu" id="nav-toggle" :class="[navClass,activeClass]" >
          <span></span>
          <span></span>
          <span></span>
        </span>
        <!-- <span id="nav-toggle" class="nav-toggle is-active">
          <span></span>
          <span></span>
          <span></span>
        </span> -->

        
        <!-- <div id="nav-menu" class="nav-right nav-menu">
          <router-link to="/login" class="nav-item is-tab">               
             <i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp; 登入          
          </router-link>
          <router-link to="/register" class="nav-item is-tab">               
             <i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;註冊         
          </router-link>
          

        <div class="nav-item">
          <div class="field is-grouped">
            <p class="control">
              <a id="twitter" class="button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;url=http://bulma.io&amp;via=jgthms">
                <span class="icon">
                  <i class="fa fa-twitter"></i>
                </span>
                <span>Tweet</span>
              </a>
            </p>
            
          </div>
        </div>
       </div> -->

         <div id="nav-menu" class="nav-right nav-menu"> 
           
             <router-link to="/login" class="nav-item is-tab">               
               <i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp; 登入          
             </router-link>
             <router-link to="/register" class="nav-item is-tab">               
               <i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;註冊         
             </router-link>
    
        </div>
    </nav>
   
      <div v-show="showMobileMenu" class="menu" style="width:65%">
         <menus>
            <menu-item @clicked="mobileNavClicked" id="centers" :click="true" icon="fa fa-university"  >開課中心</menu-item>
            <menu-item @clicked="mobileNavClicked" icon="fa fa-book" :click="true"   id="courses">課程總覽</menu-item>
            <menu-item  icon="fa fa-sign-in"  to="/login">登入</menu-item>
            <menu-item  icon="fa fa-user-plus"  to="/register">註冊</menu-item>
            <menu-item icon="fa fa-user-circle-o">
            <span>阿水</span>
            <menus slot="sub">
              <menu-item  icon="fa fa-sign-out"  to="/register">登出</menu-item>
              <menu-item  icon="fa fa-id-card"  to="/register">個人資訊</menu-item>
              <menu-item  icon="fa fa-key"  to="/register">變更密碼</menu-item>
            </menus>
          </menu-item>
        </menus>
      </div>
     
  
</div> 
</template>



<script>
export default {
  name: 'top-header',
  data () {
    return {
        src: require('../assets/logo.gif'),
        showMobileMenu:false,
        navClass: 'nav-toggle'
    }
  },
  computed:{
    activeClass(){
        if(this.showMobileMenu) return 'is-active'
        return ''    
    }
    
  },
  methods:{
    mobileNavClicked(id){
        this.toggleMobileMenu()
        this.$router.push('/' + id)
    },
    toggleMobileMenu(){
      this.showMobileMenu=!this.showMobileMenu
      this.$emit('mobileMenuChanged',this.showMobileMenu)
    }
  }

}
</script>

<style>
  .nav-item{
    font-size: 16px;
  }
</style>