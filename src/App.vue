<template>
    <div id="app">

        <top-header @mobileMenuChanged="toggleMobileMenu"></top-header>
    
        <section v-show="!mobileMenu" class="hero is-primary"> 

            <hero></hero>

            <navbar v-if="mainNav.show" 
                :default_id="mainNav.selected" 
                :items="mainNav.items" :router_link="mainNav.router_link">
            </navbar>

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
import NavBar from './components/NavBar.vue'
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
        'navbar' : NavBar,
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
        Bus.$on('errors',this.onErrors)
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

            let getCenters=Center.index()

            getCenters.then(data => {
                let centers = data.centers
                let items=centers.map(center=>{
                    return {
                               name:center.name,
                               id:center.id
                           }
                })

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

                let getCategories=Category.index()

                getCategories.then(data=>{
                    let categories = data.categories
                    let items=categories.map(category=>{
                    return {
                                name:category.name,
                                id:category.id,
                                icon:category.icon,
                           }
                    })
                 

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
            if(!items.length) return   

            this.mainNav.router_link=true
            let selectedItem=items.find((item)=>{
                if(Helper.isTrue(item.active)){
                    return item
                }
            })
            if(selectedItem){
                this.mainNav.selected=selectedItem.id
            }else{
                this.mainNav.selected=items[0].id
            }
            this.mainNav.items=items
            this.mainNav.show=true
        },
        categorySelected(id){
            this.params.category=id
        },
        toggleMobileMenu(val){
            this.mobileMenu=val
        },
        onErrors(error,msg){
           
            console.log(error)
            if(!msg){
                msg='系統暫時無回應，請稍後再試'
            }

            
            if(error &&  error.response && error.response.data.code==401){
                if(error.response.data.error) msg=error.response.data.error
                this.$router.push({ name: 'errors', params: { msg: msg }})
            }else{   
                this.$notify.open({
                            content: msg,
                            type: 'danger',
                            placement: 'top-center',
                            duration: 1500,
                        }) 
            }
            
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

