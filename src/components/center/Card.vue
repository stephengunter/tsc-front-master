<template>

  <div class="card"> 
    <div class="card-content">
       <div class="media">
          <div class="media-left is-hidden-mobile">
            <figure class="image is-128x128">
                 <a @click="$router.push('/courses?center=' + center.id)"> <img :src="photo.path"> </a>
            </figure>
          </div>
        
          <div class="media-content">
            <div>
              <ul class="info">   
                  <li class="title">
                     <a @click="$router.push('/courses?center=' + center.id)"> 
                        {{ center.name}}
                     </a>
                  </li>                      
                      <li class="item"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;  {{ addressText(center.contactInfo) }}</li>
                      <li class="item"><i class="fa fa-volume-control-phone" aria-hidden="true"></i>&nbsp;{{ telText(center.contactInfo) }}</li>
                   </ul>   

            </div>
          </div>
      </div>
    </div>
  </div>

   

</template>

<script>
  export default {
     name:'center-card',
     props:[ 'center' ],
     data(){
      return {
        loaded:false,
        photo: {
          path: '' 
        },
      }
     },
     beforeMount() {
            this.init()

     }, 
     methods:{
       init(){
            this.getPhoto()                
       },  
       addressText(contactInfo) {
                    if(!contactInfo) return ''
                     if(!contactInfo.addressA) return ''
                    return contactInfo.addressA.fullText
       },
       telText(contactInfo) {
          if(!contactInfo) return ''
          return contactInfo.tel
       },
       faxText(contactInfo){
          if(!contactInfo) return ''
          return contactInfo.fax
       },
       
       getPhoto() {
            let photo_id = this.center.photo_id
            let url =Helper.getUrl('/api/photoes/');
            if (photo_id) {
                url += photo_id
            } else {
                url += 'defaultCenter'
            }

            axios.get(url)
                .then(response => {
                    this.photo = response.data.photo
                    this.photo.path=Helper.getBackUrl() + this.photo.path
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
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
