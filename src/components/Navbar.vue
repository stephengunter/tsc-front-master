<template>
  
<div  class="hero-foot is-hidden-mobile">
    <div class="container">
        <nav v-if="hasData"  class="tabs is-boxed">
            <ul>
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
  props: ['items',"default_id"],
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
          this.$router.push('/courses?center=' + id);
      },
    
  },
  

}

</script>