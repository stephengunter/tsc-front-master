<template>
<div class="columns is-multiline is-mobile">

    <div v-for="item in items" class="column is-two-thirds-mobile is-half-tablet is-half-desktop">
      
      <center-card :id="item.id" :title="item.title" :address="item.address" 
      :tel="item.tel" :photo="item.photo">
        
      </center-card>
     
    </div>
    
  </div>




</template>


<script>

import Card from '../../components/center/Card.vue'
    
 export default{
    name:'CenterIndex',
    data(){
      return {
        items: {}
      }
    },
    beforeMount(){
        this.fetchData()
    },
    methods:{
      fetchData(){         
            this.items=[
             { id:1 , title: '台北分社' , address:'台北市敦化南路二段200號' , tel:'(02) 278877655' ,photo:'https://s-media-cache-ak0.pinimg.com/736x/fa/e5/aa/fae5aa46fe50dbf870e6483517f4390d.jpg'},
              { id:2 , title: '台北分社' , address:'台北市敦化南路二段200號' , tel:'(02) 278877655' ,photo:'https://s-media-cache-ak0.pinimg.com/736x/fa/e5/aa/fae5aa46fe50dbf870e6483517f4390d.jpg'},
              { id:3 ,title: '台北分社' , address:'台北市敦化南路二段200號' , tel:'(02) 278877655' ,photo:'https://s-media-cache-ak0.pinimg.com/736x/fa/e5/aa/fae5aa46fe50dbf870e6483517f4390d.jpg'},
               {id: 4, title: '台北分社' , address:'台北市敦化南路二段200號' , tel:'(02) 278877655' ,photo:'https://s-media-cache-ak0.pinimg.com/736x/fa/e5/aa/fae5aa46fe50dbf870e6483517f4390d.jpg'},
              { id:5 ,title: '台北分社' , address:'台北市敦化南路二段200號' , tel:'(02) 278877655' ,photo:'https://s-media-cache-ak0.pinimg.com/736x/fa/e5/aa/fae5aa46fe50dbf870e6483517f4390d.jpg'},
             { id:6 ,title: '台北分社' , address:'台北市敦化南路二段200號' , tel:'(02) 278877655' ,photo:'https://s-media-cache-ak0.pinimg.com/736x/fa/e5/aa/fae5aa46fe50dbf870e6483517f4390d.jpg'},
              ]
      }

      
    },
    components:{
       'center-card':Card
    }
    

 }

</script>