<template>

    <div class="box">    
        <div class="media">
            <div class="media-left">
               <figure class="image is-128x128">
                 <a @click="aclick()"> <img :src="photo"> </a>
               </figure>
            </div>

            <div class="media-content">            
                <div class="content">
                    <ul class="info">                    
                      <a @click="aclick()"><li class="title" v-text="title"></li></a>
                      <li class="item"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;  {{ address }}</li>
                      <li class="item"><i class="fa fa-volume-control-phone" aria-hidden="true"></i>&nbsp;{{ tel }}</li>
                   </ul>         
            </div>
        </div>
      </div>
   </div>   <!--  end box -->
   

</template>

<script>
  export default {
     name:'center-card',
     props:[
        'id' , 'title', 'address' , 'tel' , 'photo'
     ],
     methods:{
         aclick(id){
         this.$router.push('/courses/center/' + this.id)
       }
     }
  }

    
</script>

<style scoped>
ul.info {
    list-style-type:none;
    
}
li.title {
  font-size: 1.75em;
  font-weight: normal;
  margin-bottom: 0.5714em;
}
li.item {
  font-size: 1.125em;
  margin-bottom: 0.8888em;
}
</style>
