<template>
  <nav class="level app-levelbar is-hidden-desktop">
    <div class="level-left">
     <!--  <div  class="level-item"> -->
        <drop-menu :items="centers" :default_id="default_center"></drop-menu>
        &nbsp;&nbsp;
    <!--   </div> -->
      <!-- <div  class="level-item"> -->
        <drop-menu :items="categories" :default_id="default_category"></drop-menu>
        
      <!-- </div> -->

    </div>

      


      
   
  </nav>
</template>

<script>

import DropMenu from './DropMenu.vue'

export default {
  name: 'Levelbar',  
  props: ['centers','default_center',"categories",'default_category'],
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
