<template>
    <div id="app">

        <top-header @mobileMenuChanged="toggleMobileMenu"></top-header>
    
        <section v-show="!mobileMenu" class="hero is-primary"> 

            <hero></hero>

            <navbar v-show="mainNav.items.length" 
                :key_name="mainNav.key" :default_id="mainNav.selected" 
                :items="mainNav.items" :router_link="mainNav.router_link"
                @selected="onMainNavSelected" >
            </navbar>

        </section>
        
        <!-- Categories -->
        <subnav v-show="subNav.items.length" 
            :default_id="subNav.selected" :items="subNav.items"
            @itemSelected="categorySelected" >
            
        </subnav>

        <section class="section">
            
            <div class="container">
        
                <!-- <level-bar v-if="levelNav.show" :centers="levelNav.centers" :default_center="levelNav.default_center"
                :categories="levelNav.categories" :default_category="levelNav.default_category">
                
                </level-bar> -->

                <router-view v-if="loaded" :params="params" :model="model"> -->
                        
                </router-view>
        
            </div>  
        </section>
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <span style="font-size: 1.2em">慈濟大學社會教育推廣中心</span> <br>
                    <span>地址：花蓮市中央路三段701號</span> <span style="padding-left: 2em">電話：03-8565301轉1703、1704</span>


                </div>
            </div>
        </footer>
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
                key:'',
                selected:0,
                items:[],
                router_link:false
            },
            subNav:{
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
            },

            model:{},
            contents:[],
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
            
            let routeName=this.$route.name ? this.$route.name : ''
            

            if(routeName == 'courses'){
                this.loadCourseMenus(routeName)
            }else if(routeName == 'about'){
                this.loadContentMenues(routeName)
                
            }else if(routeName == 'faq'){
                this.loadContentMenues(routeName)
            }else{

                let key=''
                let items=[]
                let selected=0
                this.setMainNav(key,items,selected)
                this.setSubNav(key,items,selected)
            
                this.params={
                    center:0,
                    category:0,
                    course:0
                }
                
                this.loaded=true
            
            }  
        
        },
        loadCourseMenus(keyName){
           
            this.mainNav.router_link=false

            let centerId=this.$route.query.center ? this.$route.query.center : 0 
            let params={
                category:0,
                center:centerId,               
            }
            let getData=Course.index(params)
            getData.then(data => {
                this.model={
                    courses:data.courses
                }  

                let setCenters=this.setCenters(data.centers , centerId , keyName)

                let setCategories= this.setCategories(data.categories,keyName)
               
                Promise.all([setCenters, setCategories]).then(values=>{
                    this.params.center=values[0]
                    this.params.category=values[1]
                    
                    this.loaded=true
                })

            }).catch(error=>{
                
                this.onErrors(error)
            })
        },
        setCenters(centers, centerId , keyName){
            return new Promise((resolve, reject) => {
                let items=centers.map(center=>{
                    return {
                               name:center.name,
                               id:center.id
                           }
                })

               
                let selected=items[0].id
                if(centerId) {
                    let center = this.mainNav.items.find((item)=>{
                        return item.id == centerId
                    })

                    if(center)  selected=center.id
                    
                }

                this.setMainNav(keyName,items,selected)

                resolve(selected)

            })
            
        },
        setCategories(categories,keyName){
            return new Promise((resolve, reject) => {
                let items=categories.map(category=>{
                return {
                            name:category.name,
                            id:category.id,
                            icon:category.icon,
                        }
                })

                
                let selected=items[0].id

                this.setSubNav(keyName,items,selected)

                resolve(selected)
            })
            
            

            // this.levelNav.categories=items
            // this.levelNav.default_category=items[0].id

            
        },
        loadContentMenues(key_name){
            this.params={
                    center:0,
                    category:0,
                    course:0
                }
            let getData=Content.index(key_name)
            getData.then(data => {
                let contents=data.contents
                this.model={
                    contents:contents,
                    viewing:''
                }

                let items=contents.map(content=>{
                    return {
                               name:content.title,
                               id:content.id
                           }
                })

                
                let selected=items[0].id

                this.setMainNav(key_name,items,selected)

                this.setSubNav('',[],0)

                this.loaded=true

            }).catch(error=>{
                
                this.onErrors(error)
            })
        },
        setMainNav(key,items,selected){
            this.mainNav.key=key
            this.mainNav.items=items
            this.mainNav.selected=selected
        },
        setSubNav(key,items,selected){
            this.subNav.key=key
            this.subNav.items=items
            this.subNav.selected=selected
        },
        onMenuLoaded(items){    
            alert('onMenuLoaded')
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
           
        },
        onMainNavSelected(id,itemkey){
            let key=this.mainNav.key
           
            if(key=='courses'){
                this.$router.push('/courses?center=' + id)
            }else{
                this.model.viewing=id
            }
        },
        categorySelected(id){
            this.params.category=id
        },
        toggleMobileMenu(val){
            this.mobileMenu=val
        },

        // Bus Event Handlers
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

