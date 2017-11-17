<template>
    <table class="table is-striped">
          
        <tbody>
            <tr v-for="(item,index) in downloads" :key="index">
                <td style="width:50px">
                    <a class="button is-primary is-small" :href="item.url">
                        <span class="icon is-small">
                            <i class="fa fa-download"></i>
                        </span>
                        <span>下載</span>
                     </a>
                </td>
                <td class="txt-medium" v-text="getFileName(item)">

                </td>
            </tr>
            
        </tbody>
    </table>
</template>

<script>
export default {
    name:'DownloadsIndexView',
    data(){
        return {
            downloads:[]
        }
    },
    beforeMount(){
        this.fetchData()
    },
    methods:{
        fetchData(){ 
            let getData=Download.index()
            getData.then(data => {
                    this.downloads = data.downloads
                })
                .catch(error=> {
                    Bus.$emit('errors')                 
                   
                })
        },
        getFileName(download){
            return download.title + '.' + download.type
        }
      
    }
}
</script>
