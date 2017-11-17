<template>
    <div v-show="loaded">
    
    <div class="columns is-multiline">
        <div v-for="(center,index) in centers" :key="index"  class="column is-one-quater-mobile is-half-tablet is-half-desktop">
            <center-card :center="center"></center-card>
        </div>
    </div>

    

    <h1 v-show="overseas.length" class="title">海外</h1>
    <div class="columns is-multiline">
        <div v-for="(center,index) in overseas" :key="index"  class="column is-one-quater-mobile is-half-tablet is-half-desktop">
            <center-card :center="center"></center-card>
        </div>
    </div>

    </div>
    
</template>

<script>
import Card from '../../components/center/card.vue'
export default {
    name:'CenterIndexView',
    components:{
       'center-card':Card
    },
    data(){
        return {
            err:{},
            loaded:false,
            centers: [],
            overseas:[]
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
                    this.overseas = data.centers.filter(item=>{
                        
                        return Helper.isTrue(item.oversea) 
                    })
                    this.centers = data.centers.filter(item=>{
                        
                        return !Helper.isTrue(item.oversea) 
                    })
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

