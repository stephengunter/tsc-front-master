<template>
    <nav class="nav has-shadow is-hidden-mobile">
    <div class="container">
        <div v-if="hasData"  class="nav-left">
          
            <a href="#" v-for="(item,index) in items" :key="index"
                v-bind:class="['nav-item is-tab' ,{ 'is-active': item.id==selected } ]"
                v-html="getText(item.name,item.icon)"
                @click.prevent="itemSelected(item.id)"   >  
              
                     
            </a>
     
        </div>
    </div>
</nav>

</template>


<script>
    export default {
        name:'SubNav',
        props:{
            items: {
                type: Array,
                default: []
            },
            default_id: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                selected: 0
            }
        },
        beforeMount(){
            this.selected=this.default_id
        },
        computed:{
            hasData() {
                return this.items.length;
            },
            isActive(id) {
                return id == this.selected;
            }
        },
        watch: {
            default_id() {
                this.selected = this.default_id
            }
        },
        methods: {
            itemSelected(id) {
                this.selected = id;
                this.$emit("itemSelected", id)
            },
            getText(name, icon) {
                if (icon) {
                    return (
                    '<i class="' + icon + '"  aria-hidden="true"></i>' + "&nbsp;" + name
                    );
                }else{
                    return name
                }
            }
        } //end methods
    }
</script>