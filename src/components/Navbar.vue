<template>
  

  <div class="hero-foot">
    <div class="container">
      <nav class="tabs is-boxed">
        <ul>
        <li v-for="item in items" :class="{'is-active': item.id==selected}">
           <a href="#" @click.prevent="navSelected(item.name , item.id)"  v-text="item.title"></a>
        </li>
       
        </ul>
      </nav>
    </div>
  </div>


</template>


<script>


export default {
  name: 'navbar',
  
  props:{
       items:{},
  },
  data () {
    return {
        selected : 1,

    }
  },
  methods:{
    navSelected(name , id){
        this.selected=id
    },
    
  },
  beforeMount(){
     if(this.$route.name=='center-courses'){
            this.selected=this.$route.params.id
         }
  }

}

</script>