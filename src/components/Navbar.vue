<template>
  
<div  class="hero-foot is-hidden-mobile">
    <div class="container">
        <nav v-if="hasData"  class="tabs is-boxed">
            <ul v-if="router_link">
              <li v-for="item in items" :class="{'is-active': item.active }">
                 <router-link :to="item.to" style="font-size:16px" >     
                   {{  item.text  }} 
                 </router-link>
              </li>
               
            </ul>
            <ul v-else>
              <li v-for="item in items" :class="{'is-active': item.id==selected}">
                 <a herf="#" @click.prevent="itemSelected(item.id)" style="font-size:16px">{{ item.name }}</a>
              </li>
               
            </ul>
        </nav>
    </div>
</div>


</template>


<script>

export default {
  name: 'Navbar',  
  props: {
            items: {
               type: Array,
               default: []
            },
            default_id:{
               type: Number,
               default: 0
            },
            router_link:{
                type:Boolean,
                default:false
            }
  },
  
  data () {
      return {
          selected : this.default_id,
      }
  },
  computed:{
    hasData(){
       return this.items.length
    },
  },
  beforeMount(){
     
  },
  watch: {
      default_id () {
          this.selected=this.default_id
      }
  },
  methods:{
      itemSelected(id){
          this.selected=id
          this.$router.push('/courses?center=' + id)
      },
    
  },
  

}

</script>