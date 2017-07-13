<template>

   <div class="columns is-multiline">

      <div v-for="center in centers" class="column is-one-quater-mobile is-half-tablet is-half-desktop">
         <center-card :center="center"></center-card>
      </div>
    
    </div>



</template>


<script>

import Card from '../../components/center/card.vue'
    
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
          let getData=Center.index()
          getData.then(data => {
                    this.centers = data.centers
                    this.loaded=true
                    
                })
                .catch(error=> {
                    Bus.$emit('errors')                 
                    this.loaded=false
                })
      }

      
    }
    
    

 }

</script>