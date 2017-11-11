<template>
    <div class="container">
        <nav class="nav">
            <div class="nav-left">
                <router-link to="/" class="nav-item">     
                    <img :src="logoSrc" alt=""> 
                </router-link>
            </div>
            <div class="nav-center is-hidden-mobile" >
                <router-link v-for="(item,index) in menuItems" :key="index" 
                    :to="item.id" class="nav-item is-tab">     
                    <i v-if="item.icon" :class="getIconClass(item)" aria-hidden="true"></i>&nbsp; {{ item.text }} 
                </router-link>
                
            </div>
            <span @click.prevent="toggleMobileMenu" id="nav-toggle" :class="[navClass,activeClass]" >
                <span></span>
                <span></span>
                <span></span>
            </span>
            <div  v-if="isAuth"  id="nav-menu"  class="nav-right nav-menu nav-item"> 
                <!-- <drop-menu :items="userMenuItems" :default_id="0" 
                    @itemSelectChanged="menuItemClicked" :static="true">                    
                </drop-menu> -->
                
            </div>
            <div v-else id="nav-menu"  class="nav-right nav-menu">
                <router-link  v-for="(item,index) in visitorMenuItems" :key="index" 
                    :to="item.id" class="nav-item is-tab">     
                    <i v-if="item.icon" :class="getIconClass(item)" aria-hidden="true"></i>&nbsp; {{ item.text }} 
                </router-link>
                
            </div>
        </nav>
      

        <!-- <div class="menu" v-if="showMobileMenu"  style="width:65%">
            <menus>
           
                <menu-item  v-for="(item,index) in menuItems" :key="index" 
                 :id="item.id"  :click="mobileNavClicked.bind(null,item.id)" :icon="item.icon" >{{ item.name }}
                </menu-item>

                <menu-item v-show="!isAuth" v-for="(item,index) in visitorMenuItems" :key="index"  
                 :id="item.id"  :icon="item.icon" :click="mobileNavClicked.bind(null,item.id)"  >{{ item.name }}
                </menu-item>

                <menu-item  v-show="isAuth" icon="fa fa-user-circle-o">
                    <span>{{  username }}</span>
                    <menus  slot="sub">
                        <menu-item v-for="(item,index) in userFuctions" :key="index"
                        :id="item.id"  :icon="item.icon" :click="mobileNavClicked.bind(null,item.id)" >{{ item.name }}
                        </menu-item>
                    </menus>
                </menu-item>
            </menus>
        </div> -->
     
    </div>
</template>

<script>
    import DropMenu from "./DropMenu.vue"
    export default {
        name: "TopHeader",
        components: {
            "drop-menu": DropMenu
        },
        data(){
            return  {
                Menu:new Menu(),
                isAuth: false,
                username: "",
                logoSrc: require("../assets/logo.gif"),
                showMobileMenu: false,
                navClass: "nav-toggle",
                
                menuItems:[],
                visitorMenuItems: [],
                userMenuItems:[],
                

            }
        },
        watch:{
            $route() {
                this.init()
            }
        },
        beforeMount() {
            this.init()
        },
        created() {
            Bus.$on("authChanged", this.setAuth)
        },
        computed: {
            activeClass() {
                if (this.showMobileMenu) return "is-active"
                return ""
            }
        },
        methods:{
            test(val){
                alert(val)
            },
            init() {
                this.menuItems=this.Menu.getMenuItems()
                this.visitorMenuItems=this.Menu.getVisitorMenuItems()
                this.setAuth(this.$auth.hasToken())
            },
            setAuth(isAuth) {
                if (isAuth) {
                    this.setUserName(this.$auth.username())
                } else {
                    this.setUserName('')
                }
                this.isAuth = isAuth
            },
            setUserName(name) {
                this.username = name
                if(!this.userMenuItems.length){
                    this.userMenuItems=this.Menu.getUserMenuItems(name)
                }else{
                  
                    this.userMenuItems[0].text = name
                }
                
            },
            getIconClass(item){
                return Menu.getIconClass(item.icon)
            },
            menuItemClicked(id) {
                if (id == "logout") {
                    this.logout();
                } else {
                    this.$router.push("/" + id)
                }
            },
            mobileNavClicked(id) {
                this.toggleMobileMenu()
                this.menuItemClicked(id)
            },
            toggleMobileMenu() {
                this.showMobileMenu = !this.showMobileMenu
                this.$emit("mobileMenuChanged", this.showMobileMenu)
            },
            
            logout() {
                this.$auth.logout();
                this.setAuth(false);
                Bus.$emit("okmsg", "您已成功登出")
                if (this.$route.meta.forAuth) {
                    this.$router.push("/")
                }
            }
        },
    }
</script>