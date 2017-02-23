<template>
  <div id="app">

    <top-header></top-header>

    <section class="hero is-primary"> 

    <hero></hero>

    <navbar v-if="showNav" :items="navItems"></navbar>

    </section>
    
    <subnav v-if="showSubNav" :items="subNavItems"></subnav>

    <section class="section">
      <div class="container">

        <router-view></router-view>


    
      </div>  
    </section>

  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import SubNav from './components/SubNav.vue'

export default {
  name: 'app',
  data () {
    return {
      navItems: {},
      subNavItems:{},
      


    }
  },
  components:{
    'top-header' : TopHeader,
    'navbar' : Navbar,
    'hero':  Hero,
    'subnav' : SubNav

  },
  // watch: {
  //   $route () {
  //     alert('watch!!');
     
  //   }
  // },
  beforeMount(){     
     this.getNavItems()
     this.getSubNavItems()
  },
  computed:{
    showNav(){
      if(this.$route.meta.nav) return true 
      return false;
    },
    showSubNav(){
      if(this.$route.meta.subNav) return true 
      return false;
    }
  },
  methods:{
      getNavItems(){
        this.navItems=[        
            {name:'centers' ,title:'花蓮中心' , id: 1 , },
            {name:'centers' ,title:'高雄中心' , id: 2 , },
            {name:'centers' ,title:'台北中心' , id: 3 , },
            {name:'centers' ,title:'新竹中心' , id: 4 , },
            {name:'centers' ,title:'台南中心' , id: 5 , },
            {name:'centers' ,title:'宜蘭中心' , id: 6 , },
            {name:'centers' ,title:'桃園中心' , id: 7 , },
        ]
      },
      getSubNavItems(){
        this.subNavItems=[        
            {name:'categories' ,title:'最新課程' , id: 1 , icon:''},
            {name:'categories' ,title:'推薦課程' , id: 2 , icon:''},
            {name:'categories' ,title:'全部課程' , id: 3 , icon:''},
            {name:'categories' ,title:'語言' , id: 4 , icon:'<i class="fa fa-language" aria-hidden="true"></i>'},
            {name:'categories' ,title:'人文' , id: 5 , icon:'<i class="fa fa-leanpub" aria-hidden="true"></i>' },            
            {name:'categories' ,title:'生活' , id: 6 , icon:'<i class="fa fa-smile-o" aria-hidden="true"></i>'},
            {name:'categories' ,title:'藝術' , id: 7 , icon:'<i class="fa fa-ravelry" aria-hidden="true"></i>' },
            {name:'categories' ,title:'體育' , id: 8 , icon:'<i class="fa fa-dribbble" aria-hidden="true"></i>'},
            {name:'categories' ,title:'電腦' , id: 9 , icon:'<i class="fa fa-laptop" aria-hidden="true"></i>' },
            {name:'categories' ,title:'兒童' , id: 10 , icon:'<i class="fa fa-child" aria-hidden="true"></i>'},
            {name:'categories' ,title:'學分班' , id: 11 , icon:'<i class="fa fa-graduation-cap" aria-hidden="true"></i>'},
        ]
      },
  }



}
</script>

<style>
html *
{
  
   font-family: "微軟正黑體", "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
