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
            <router-link to="/students" class="nav-item is-tab">     
               <i class="fa fa-user-o" aria-hidden="true"></i>&nbsp; 學員專區 
            </router-link>
            <router-link to="/teacher" class="nav-item is-tab">     
               <i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp; 教師專區 
            </router-link>
            <router-link to="/wanted" class="nav-item is-tab">     
               <i class="fa fa-address-card-o" aria-hidden="true"></i>&nbsp; 徵才訊息 
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

                  <drop-menu :items="userMenuItems" :default_id="0" 
                     @itemSelectChanged="menuItemClicked" :static="true">                    
                  </drop-menu>
                
              </div>
        </div>
        
    </nav>
   
      <div v-show="showMobileMenu" class="menu" style="width:65%">
         <menus>
           
            <menu-item v-for="item in menuItems" @clicked="mobileNavClicked" :id="item.id" :click="true" :icon="item.icon" >{{ item.name }}</menu-item>


            <menu-item v-show="!isAuth" v-for="item in visitorMenuItems" @clicked="mobileNavClicked" :id="item.id" :click="true" :icon="item.icon" >{{ item.name }}</menu-item>

            <menu-item  v-show="isAuth" icon="fa fa-user-circle-o">
              <span>{{  username }}</span>
              <menus  slot="sub">
                  <menu-item v-for="item in userFuctions" @clicked="mobileNavClicked" :id="item.id" :click="true" :icon="item.icon" >{{ item.name }}</menu-item>

             
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
        menuItems:[
           { id:'centers', name:'開課中心', icon:'fa fa-university' },
           { id:'courses', name:'課程總覽', icon:'fa fa-book' },
           
        ],
        visitorMenuItems:[
           { id:'login', name:'登入', icon:'fa fa-sign-in' },
           { id:'register', name:'註冊', icon:'fa fa-user-plus' },
        ],
        userMenuItems:[
           { id:0, name:'', icon:'fa fa-user-circle-o' },
        ],
        userFuctions:[
          { id:'logout', name:'登出', icon:'fa fa-sign-out' },
          { id:'user/signups', name:'報名紀錄', icon:'fa fa-file-text-o' },
          { id:'user/profiles', name:'個人資訊', icon:'fa fa-id-card' },
          { id:'user/change-password', name:'變更密碼', icon:'fa fa-key' }
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
       this.setAuth(this.$auth.hasToken())
       
       if(this.userMenuItems.length==1){
           this.userMenuItems = this.userMenuItems.concat(this.userFuctions);
       }
    },
    setUserName(name){
       this.username=name
       this.userMenuItems[0].name=name
    },
    menuItemClicked(id){
        if(id=='logout'){
           this.logout()
        }else{
           this.$router.push('/' + id)
        }
        
    },    
    mobileNavClicked(id){
        this.toggleMobileMenu()
        this.menuItemClicked(id)
    },
    toggleMobileMenu(){
      this.showMobileMenu=!this.showMobileMenu
      this.$emit('mobileMenuChanged',this.showMobileMenu)
    },
    setAuth(isAuth){
        if(isAuth){
           this.setUserName(this.$auth.username())
        }else{
           this.setUserName('')
        }
        this.isAuth=isAuth
    },
    logout(){
       this.$auth.logout()
       this.setAuth(false)
       Bus.$emit('okmsg','您已成功登出')
       if(this.$route.meta.forAuth){
          this.$router.push('/')
       }
    }
  }

}
</script>

<style>
  .nav-item{
    font-size: 16px;
  }
</style>