<template>

   <div class="columns is-multiline">

      <div v-for="center in centers" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
         <center-card :center="center"></center-card>
      </div>
    
    </div>



</template>


<script>

import Card from '../../components/center/Card.vue'
    
 export default{
    name:'CenterIndex',
    components:{
       'center-card':Card
    },
    data(){
      return {
        loaded:false,
        centers: []
      }
    },
    beforeMount(){
        this.fetchData()
    },
    methods:{
      fetchData(){   
          
          let url=Helper.getUrl('/api/centers/activeCenters') 
          axios.get(url)
              .then(response => {
                  this.centers = response.data.centers
                  
                  this.loaded=true
               
              })
              .catch(function(error) {
                  console.log(error)
              })
      }

      
    }
    
    

 }

</script>