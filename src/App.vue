<template>
  <div id="app">

    <top-header @mobileMenuChanged="toggleMobileMenu"></top-header>
   
        <section v-show="!mobileMenu" class="hero is-primary"> 

          <hero></hero>

          <navbar v-if="mainNav.show" :default_id="mainNav.selected" 
          :items="mainNav.items" :router_link="mainNav.router_link"></navbar>

        </section>
    
        <subnav v-if="subNav.show" :default_id="subNav.selected" :items="subNav.items"
          @itemSelected="categorySelected" >
          
        </subnav>

        <section class="section">
         
           <div class="container">
       
             <level-bar v-if="levelNav.show" :centers="levelNav.centers" :default_center="levelNav.default_center"
               :categories="levelNav.categories" :default_category="levelNav.default_category">
               
             </level-bar>
             <router-view v-if="loaded" :params="params"></router-view>


        
          </div>  
        </section>
   
  </div>
</template>

<script>

import TopHeader from './components/TopHeader.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import SubNav from './components/SubNav.vue'
import LevelBar from './components/LevelBar.vue'

export default {
  name: 'app',
  data () {
    return {
       loaded:false,
       mobileMenu:false,
       mainNav:{
          show:false,
          key:'',
          selected:0,
          items:[],
          router_link:false
       },
       subNav:{
          show:false,
          key:'',
          selected:0,
          items:[]
       },
       levelNav:{
          show:false,
          centers:[],
          default_center:0,
          categories:[],
          default_category:0
       },
       params:{
         center:0,
         category:0,
         course:0
       }
    }
  },
  components:{
    'top-header' : TopHeader,
    'navbar' : Navbar,
    'hero':  Hero,
    'subnav' : SubNav,
    'level-bar' : LevelBar

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
      Bus.$on('errors',this.showErrorMsg)
      Bus.$on('okmsg',this.showSuccessMsg)
      Bus.$on('auth-failed',this.onAuthFailed)
      Bus.$on('re-login',this.onReLogin) 
      Bus.$on('menu-loaded',this.onMenuLoaded)       
  },
  methods:{
      init(){
         this.loaded=false
         this.subNav={
            show:false,
            key:'',
            selected:0,
            items:[]
          }
         this.params={
           center:0,
           category:0,
           course:0
         }

         if(this.$route.name=='courses'){
             this.loadCourseMenus()
         }else{
         
             this.mainNav={
              show:false,
              key:'',
              selected:0,
              items:[]
            }

            this.levelNav={
              show:false,
              centers:[],
              default_center:0,
              categories:[],
              default_category:0
            }
            
            this.loaded=true
           
         }  
       
      },
      
      loadCourseMenus(){
          this.mainNav.show=true
          this.mainNav.router_link=false
          this.mainNav.key='courses'

          this.levelNav.show=true

          this.getCenters().then((items) => {
             this.mainNav.items=items
             this.levelNav.centers=items
           

             let centerId=this.$route.query.center
             if(centerId) {
                 let center = this.mainNav.items.find((item)=>{
                     return item.id == centerId
                 })
                if(center){
                  this.mainNav.selected=center.id
                   this.levelNav.default_center=center.id
                }else{
                  this.mainNav.selected=items[0].id
                  this.levelNav.default_center=items[0].id
                } 
                 
             }else{
                 this.mainNav.selected=items[0].id
                 this.levelNav.default_center=items[0].id
             }

             this.getCategories().then((items)=>{
                this.subNav.items=items
                this.subNav.selected=items[0].id
                this.subNav.show=true
                this.subNav.key='categories'

                this.levelNav.categories=items
                this.levelNav.default_category=items[0].id

                this.params.center=this.mainNav.selected
                this.params.category=this.subNav.selected

                this.loaded=true
               
             })

          })
      },
      onMenuLoaded(items){          
          this.mainNav.router_link=true
          this.mainNav.items=items
          this.mainNav.show=true
      },
      
      getCenters(){
        return new Promise((resolve, reject) => {
               let url =Helper.getApiUrl('/centers') 
               axios.get(url)
                    .then(response => {
                        let centers = response.data.centers
                        let items=[]
                        for(let i=0; i<centers.length; i++){
                           let item={
                               name:centers[i].name,
                               id:centers[i].id
                           }
                            items.push(item)
                        }
                        resolve(items);
                    })
                    .catch(error => {
                        reject(error.response);
                    })
          })   //End Promise
        
            
      },
      getCategories(){
         return new Promise((resolve, reject) => {
              let url =Helper.getApiUrl('/categories') 
              axios.get(url)
              .then(response => {
                  let items=[]
                  let categories = response.data.categories
                  for(let i=0; i<categories.length; i++){
                     let item={
                         name:categories[i].name,
                         id:categories[i].id,
                         icon:categories[i].icon,
                     }
                     items.push(item)
                  }
                  resolve(items);
              })
              .catch(error => {
                  reject(error.response);
              })
          })   //End Promise
     },
     categorySelected(id){
        this.params.category=id
     },
     toggleMobileMenu(val){
        this.mobileMenu=val
     },
     showErrorMsg(error,msg) {
          console.log(error)
          if(!msg){
             msg='系統暫時無回應，請稍後再試'
          }
           this.$notify.open({
                          content: msg,
                          type: 'danger',
                          placement: 'top-center',
                          duration: 1500,
                       }) 
      },
      showSuccessMsg(msg) {
           this.$notify.open({
                          content: msg,
                          type: 'success',
                          placement: 'top-center',
                          duration: 1500,
                       }) 
      },
      onAuthFailed(returnUrl){
          this.$auth.logout()
          this.$router.push('/login?return=' + returnUrl)
      },
      onReLogin(user,url){
          this.$auth.logout()
          let login=this.$auth.login(user.email,user.password)
          login.then(() => {
               Bus.$emit('authChanged', true) 
               
               this.$router.push(returnUrl)
               
          }).catch(error => {
               this.$router.push('/login')
             
          })
      }

      
  }///end methods



}
</script>

<style>
  .section {
    background-color: white;
    padding: 1rem 1.5rem;
}
</style>

