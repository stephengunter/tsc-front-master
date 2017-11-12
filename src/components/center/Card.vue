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
                            <li class="title-item">
                                <span v-text="center.name"></span>
                                <!-- <span v-if="isTrue(center.oversea)" v-text="center.name"></span>
                                <a v-else @click="$router.push('/courses?center=' + center.id)"> 
                                    {{ center.name}}
                                </a> -->
                            </li>                      
                            <li v-show="addressText(center.contactInfo)"  class="item">
                                <i class="fa fa-map-marker fa-fw" aria-hidden="true"> </i>
                               
                                <span v-text="addressText(center.contactInfo)"></span>
                            </li>
                            <li v-show="telText(center.contactInfo)" class="item">
                                <i class="fa fa-volume-control-phone fa-fw" aria-hidden="true"> </i>
                               
                                <span v-text="telText(center.contactInfo)"></span>
                            </li>
                        </ul>   

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CenterCard',
    props:{
        center :{
            type:Object,
            default:null
        }, 
    },
    data(){
        return {
            loaded:false,
            photo: {
                path: '' 
            },
        }
    },
    computed: {
        hasTel(){
            if(!this.schedules) return false
            return this.schedules.length > 0
        },
    },
    beforeMount() {
        this.init()

    },
    methods:{
        init(){
            this.getPhoto()                
        },  
        isTrue(val){
            return Helper.isTrue(val)
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
            let path=Center.getPhotoUrl(this.center.photo.path)
            this.photo={
                path:  path
            }   
        }  
    } 
}
</script>

<style scoped>
    
    ul.info {
        list-style-type:none;        
    }
    li.title-item {
        font-size: 1.75em;
        font-weight: normal;
        margin-bottom: 0.5714em;
    }
    li.item {
        font-size: 1.125em;
        margin-bottom: 0.8888em;
    }
</style>

