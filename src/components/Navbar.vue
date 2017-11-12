<template>
  
<div  class="hero-foot is-hidden-mobile">
    <div class="container">
        <nav v-if="hasData"  class="tabs is-boxed">
            <ul v-if="router_link">
                <li @click="itemSelected(item.id, item.key)" v-for="(item,index) in items" :key="index" :class="{'is-active': item.id==selected }">
                    <router-link :to="item.to" style="font-size:16px" >     
                        {{  item.text  }} 
                    </router-link>
                </li>
               
            </ul>
            <ul v-else>
                <li v-for="(item,index) in items" :key="index" :class="{'is-active': item.id==selected}">
                    <a href="#" @click.prevent="itemSelected(item.id)" style="font-size:16px">{{ item.name }}</a>
                </li>
               
            </ul>
        </nav>
    </div>
</div>


</template>


<script>

export default {
    name: 'Navbar',  
    props: {
        key_name:{
            type:String,
            default:''
        },
        items: {
            type: Array,
            default: []
        },
        default_id:{
            type: Number,
            default: 0
        },
        router_link:{
            type:Boolean,
            default:false
        }
    },
  
    data () {
        return {
            selected : this.default_id,
        }
    },
    computed:{
        hasData(){
        return this.items.length
        },
    },
    beforeMount(){
        this.init()
    },
    watch: {
        default_id () {
            this.selected=this.default_id
        }
    },
    methods:{
        init(){

        },
        fetchData(){

        }, 
        itemSelected(id,key){
           
            this.selected=id
            this.$emit('selected', id, key)
            // if(!key){
            //     this.$router.push('/courses?center=' + id)
            // }
        },
    
  },
  

}

</script>