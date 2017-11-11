<template>
    <dropdown v-if="hasData">
        <a @click.prevent="setItems"  class="button is-outlined is-primary">
            <i  :class="getIconClass(selectedItem)" v-if="selectedItem.icon"></i>
            &nbsp;{{ selectedItem.text }}
            <span class="icon is-small">
                <i class="fa fa-angle-down"></i>
            </span>
        </a>
        <div  slot="content">
            <menus>
                <menu-item v-for="(item,index) in otherItems" :key="index" 
                 :to="item.id" :icon="item.icon"  > 
                <!-- <span id="hide_link" v-text="item.id" style="display:none;"></span> -->
                 {{ item.text }}
                </menu-item>
            </menus>
        </div>
    </dropdown>
</template>

<script>
export default {
    name: "DropMenu",
    props: {
        items: {
            type: Array,
            default: []
        },
        default_id: {
            type: Number,
            default: 0
        },
        static: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedId: 0,
            selectedItem: null,
            otherItems: [],

            test:[],
        };
    },
    watch: {
        default_id() {
            this.init();
        }
    },
    beforeMount() {
        this.init();
    },
    computed: {
        hasData() {
            if (!this.items) return false
            if (this.items.length) return true
            return false
        }
    },
    methods: {
        init() {
            this.selectedId = this.default_id
            this.selectedItem = null
            this.otherItems = []
            this.setItems()
        },
        getIconClass(item){
           return Menu.getIconClass(item.icon)
        },
        setItems() {
            if (this.otherItems.length) return

            for (var i = 0; i < this.items.length; i++) {
                let item = this.items[i]
                if (item.id == this.selectedId) {
                    if (!this.selectedItem) this.selectedItem = item;
                } else {
                    this.otherItems.push(item);
                }
            }
        },
        itemSelected(e) {
            let id=''
            let children=e.target.childNodes
            for (var i = 0; i < children.length; i++) {
                if(children[i].id=='hide_link') {
                    id=children[i].innerText
                    break
                }
                
            }

            if (!this.static) {
                let item = this.otherItems.find(item => {
                    return item.id == id
                })
                this.selectedItem = item
                this.selectedId = id
            }
            this.otherItems = []

           

            this.$emit("itemSelectChanged", id)
           
           
        }
    }
}
</script>
