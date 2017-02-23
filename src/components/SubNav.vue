<template>

<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
          
          <a href="#" v-for="item in items" @click.prevent="subNavSelected(item.name,item.id)" 
            v-bind:class="['nav-item is-tab' ,{ 'is-active': item.id==selected } ]"
             v-html="getText(item.title,item.icon)">           
          </a>
        
          
     
    </div>
  </div>
</nav>


</template>


<script>
export default {
  name: 'subnav',
  props:{
    items:{}
  },
  data () {
     return {
      selected:3
    }
  },
  computed:{
    isActive(id){
      return id==this.selected
    }
  },
  methods:{
    subNavSelected(name,id){
       this.selected=id
    },
    getText(title,icon){
        if(icon){
          return icon + '&nbsp;' + title
        }else{
          return '&nbsp;' + title
        }
        
    }
  },  //end methods
  

}
</script>