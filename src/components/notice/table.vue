<template>

<div>
   
  <table v-if="hasNotices" class="table" style="font-size:1.2em">
      <tbody>
        <tr v-for="notice in model.data">
          <td>{{ notice.date }}</td>
          <td>
            <a @click.prevent="onSelected(notice.id)" :title="notice.title">
               {{ notice.title }}
            </a>
          </td>
        </tr>
       
      </tbody>
      
  </table>
  
  <pager v-if="!latest" :total="model.total" :page_size="model.per_page"
      @page-change="onPageChanged">
    
  </pager>
</div>
</template>

<script>
    import Pager from '../../components/Pager.vue'
    export default {
        name:'NoticeTable',
        components:{
            'pager':Pager
        },
        props: {
          latest:{
             type: Boolean,
             default: false
          },
        },
        beforeMount(){
            this.fetchData()
        },
        data(){
            return{
                current_page:1,
                model:{
                   total:0,
                   per_page:10,

                }
            }
        },
        computed: {
            hasNotices() {
               
               return this.model.total > 0 
            }
        },
        methods:{
            fetchData(){
                this.getNotices()

            },
            getNotices(){
                this.notices=[]
                let getData=null
                if(this.latest){
                   getData=Notice.latest()
                }else{
                   getData=Notice.index(this.current_page,this.model.per_page)
                }
                getData.then(data => {
                    this.model=data.model  
                    this.$emit('loaded',this.model.total)               
                })
                .catch(error=> {
                    Bus.$emit('errors')
                    this.$emit('loaded',0)    
                })
            },
            onPageChanged(page){
               this.current_page=page
               this.getNotices()
            },
            onSelected(id){
               this.$emit('selected',id)    
            }
        },
        
    }
</script>
