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
       

         <div id="nav-menu" class="nav-right nav-menu"> 
            
               <router-link  v-if="!isAuth" to="/login" class="nav-item is-tab">               
                 <i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp; 登入          
               </router-link>
               <router-link  v-if="!isAuth" to="/register" class="nav-item is-tab">               
                 <i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;註冊         
               </router-link>
            
              
              <div v-if="isAuth" class="nav-item">

                  <drop-menu :items="userFuctions" :default_id="0" 
                     @itemSelectChanged="userFuctionSelected" :static="true">                    
                  </drop-menu>
         

                <!-- <dropdown>
                  <button class="button is-outlined is-primary">{{ username }}</button>
                  <div slot="content">
                    <menus>
                      <menu-item  icon="fa fa-sign-out"  to="/register">登出</menu-item>
                      <menu-item  icon="fa fa-id-card"  to="/register">個人資訊</menu-item>
                      <menu-item  icon="fa fa-key"  to="/register">變更密碼</menu-item>
                    </menus>
                  </div>
                </dropdown> -->
              </div>
        </div>
        
    </nav>
   
      <div v-show="showMobileMenu" class="menu" style="width:65%">
         <menus>
            <menu-item @clicked="mobileNavClicked" id="centers" :click="true" icon="fa fa-university"  >開課中心</menu-item>
            <menu-item @clicked="mobileNavClicked" icon="fa fa-book" :click="true"   id="courses">課程總覽</menu-item>
            <menu-item  icon="fa fa-sign-in"  to="/login">登入</menu-item>
            <menu-item  icon="fa fa-user-plus"  to="/register">註冊</menu-item>
            <menu-item icon="fa fa-user-circle-o">
            <span v-show="isAuth">{{  username }}</span>
            <menus v-show="isAuth" slot="sub">
              <menu-item  icon="fa fa-sign-out" :click="true" @clicked="logout">登出</menu-item>
              <menu-item  icon="fa fa-id-card"  to="/register">個人資訊</menu-item>
              <menu-item  icon="fa fa-key"  to="/register">變更密碼</menu-item>
            </menus>
          </menu-item>
        </menus>
      </div>
     
  
</div> 
</template>



<script>
import DropMenu from './DropMenu.vue'
export default {
  name: 'top-header',
  components: {
    'drop-menu':DropMenu
  },
  data () {
    return {
        isAuth:false,
        username:'',
        src: require('../assets/logo.gif'),
        showMobileMenu:false,
        navClass: 'nav-toggle',
        userFuctions:[
          { id:0, name:'', icon:'fa fa-user-circle-o' },
          { id:1, name:'登出', icon:'fa fa-sign-out' },
          { id:2, name:'個人資訊', icon:'fa fa-id-card' },
          { id:3, name:'變更密碼', icon:'fa fa-key' }
        ]
       
       
    }
  },
  watch: {
    $route () {
        this.init()
    }
  },
  beforeMount(){   
     this.init()
  },
  created() {
      Bus.$on('authChanged',this.setAuth) 
  },
  computed:{
    activeClass(){
        if(this.showMobileMenu) return 'is-active'
        return ''    
    }
  },
  methods:{
    init(){
        this.isAuth=this.$auth.isAuthenticated()   
        if(this.isAuth){
          this.setUserName(this.$auth.username())
          var token = this.refreshToken()
                token.then(() => {
                
          })
        }
       
    },
    refreshToken(){
      return new Promise((resolve, reject) => {
                     let refreshToken=this.$auth.getRefreshToken()
                     let data=Helper.getRefreshTokenFormData(refreshToken)
                     let form=new Form(data)
                     let url=Helper.getUrl('/oauth/token') 
                     form.post(url)
                     .then(response => {
                    
                        let token=response.access_token
                        let expiration=response.expires_in + Date.now()
                        let refreshToken=response.refresh_token
                        this.$auth.setToken(token , expiration,refreshToken)
                        axios.defaults.headers.common.Authorization='Bearer ' + this.$auth.getToken()

                        this.isAuth=true
                        resolve(true);
                     })
                     .catch(error => {
                        reject(error.response);
                     })
                });
    },
    setUserName(name){
      this.username=name
       this.userFuctions[0].name=name
    },
    checkAuth(){
       
    },
    mobileNavClicked(id){
        this.toggleMobileMenu()
        this.$router.push('/' + id)
    },
    toggleMobileMenu(){
      this.showMobileMenu=!this.showMobileMenu
      this.$emit('mobileMenuChanged',this.showMobileMenu)
    },
    setAuth(isAuth){
        if(isAuth){
          this.setUserName(this.$auth.username())
        }
        this.isAuth=isAuth
    },
    userFuctionSelected(id){
        if(id==1){
           this.logout()
        }else if(id==2){
           this.$router.push('/user/profiles')
        }else if(id==3){
           this.$router.push('/user/change-password')
        }
    },
    logout(){
       this.$auth.logout()
       this.isAuth=false
       this.$notify.open({
                        content: '您已成功登出',
                        type: 'success',
                        placement: 'top-center',
                        duration: 1500,
                      })
    }
  }

}
</script>

<style>
  .nav-item{
    font-size: 16px;
  }
</style>