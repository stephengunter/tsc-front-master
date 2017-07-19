<template>
    <nav v-show="total" class="pagination is-right">
        <a class="pagination-previous" v-show="maxPage>1"  :disabled="interCurrent==1">上一頁</a>
        <a class="pagination-next" v-show="maxPage>1" :disabled="interCurrent<maxPage">下一頁</a>
        <ul class="pagination-list">
            <li><a class="pagination-link">1</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a class="pagination-link">45</a></li>
            <li><a class="pagination-link is-current">46</a></li>
            <li><a class="pagination-link">47</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a class="pagination-link">86</a></li>
        </ul>
    </nav>
</template>


<script>
    export default {
        name:'Pager',
        props: {
            page_size: {
              type: Number,
              default: 10,
            },
            current: {
              type: Number,
              default: 1,
            },
            total:{
              type: Number,
              default: 0,
            },
            size: String,
            simple: {
              type: Boolean,
              default: false,
            },
            layout: {
              type: String,
              default: 'total, pager, sizer, jumper',
            },
        },
        beforeMount(){
          //  this.init()
        },
        data(){
            return{
                interCurrent: 1,
                interPageSize: 10,
                pageCount:0,
                maxPage:0,

                items:[],
            }
        },
        watch: {
            current(val) {
               if (val !== this.interCurrent) {
                  this.handleChangePage(val);
               }
            },
            page_size(val) {
               if (val !== this.interPageSize) {
                  // this.handleChangePage(val);
               }
          
            },
        },
        mounted() {
            this.interPageSize=this.page_size
            this.interCurrent=this.current
            this.maxPage=this.calcTotalPage()
            //this.handleChangePage(this.current);

            this.items=[]
            for(let i=0; i<5; i++){
                let className='pagination-link'
                let item={
                    class:className,
                }
            }
        },
        computed: {
            showFirstPage(){
                return false
            },
            hasNextPage() {
               return true
            },
        },
        methods:{
            fetchData(){
                this.getNotices()

            },
            calcTotalPage() {
               return Math.floor((this.total - 1) / this.interPageSize) + 1;
            },
            handleChangePage(p) {
                  if (p !== this.interCurrent) {
                    this.interCurrent = p;
                    //this.change(p);
                  }
            },
            hasPrev() {
              return this.interCurrent > 1;
            },
            hasNext() {
              return this.interCurrent < this.totalPage;
            },
            handlePrev() {
              this.handleChangePage(this.interCurrent - 1);
            },
            handleNext() {
              this.handleChangePage(this.interCurrent + 1);
            },
        },
        
    }

</script>