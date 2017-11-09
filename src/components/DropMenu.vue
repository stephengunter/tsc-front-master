<template>
    <dropdown v-if="hasData">
        <a @click.prevent="setItems"  class="button is-outlined is-primary">
            <i  :class="selectedItem.icon" v-if="selectedItem.icon"></i>
            &nbsp;{{ selectedItem.name }}
            <span class="icon is-small">
                <i class="fa fa-angle-down"></i>
            </span>
        </a>
        <div slot="content">
            <menus>
                <menu-item v-for="(item,index) in otherItems" :key="index" 
                 :id="item.id" :icon="item.icon" 
                 @clicked="itemSelected"> {{ item.name }}
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
            otherItems: []
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
        itemSelected(id) {
            if (!this.static) {
                let item = this.otherItems.find(item => {
                    return item.id == id
                });
                this.selectedItem = item
                this.selectedId = id
            }
            this.otherItems = []

            this.$emit("itemSelectChanged", id)
        }
    }
}
</script>
