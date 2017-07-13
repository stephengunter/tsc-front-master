<template>
  <nav class="level app-levelbar is-hidden-desktop">
    <div class="level-left">
    
        <drop-menu :items="centers" :default_id="default_center"></drop-menu>
        &nbsp;&nbsp;
  
        <drop-menu :items="categories" :default_id="default_category"></drop-menu>
        
   

    </div>

      


      
   
  </nav>
</template>

<script>

import DropMenu from './DropMenu.vue'

export default {
  name: 'Levelbar',  
  props: {
      centers: {
         type: Array,
         default: []
      },
      default_center:{
         type: Number,
         default: 0
      },
      categories: {
         type: Array,
         default: []
      },
      default_category:{
         type: Number,
         default: 0
      },
  },
  
  components: {
    'drop-menu':DropMenu
  },

  data () {
    return {
      
    }
  },
  methods: {
   
    
  },

  
}
</script>
