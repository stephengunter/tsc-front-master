<template>
<table class="table">
    <tbody>
      <tr>
        <td>81</td>
        <td>Qualification for the <a href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage" title="2016–17 UEFA Champions League">Champions League group stage</a></td>
      </tr>
     
    </tbody>
</table>


</template>

<script>
    export default {
        name:'NoticeTable',
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
                notices:[]
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
                   getData=Notice.index()
                }
                getData.then(data => {
                    this.notices=data.notices                 
                })
                .catch(error=> {
                    Bus.$emit('errors')
                })
            }
        },
        
    }
</script>