<template>
  <div v-if="loaded">  
     <show  v-if="readonly"
       :user="user" :teacher="teacher"
       @begin-edit="onBeginEdit"></show>    
     
     <edit v-else :user="user" :teacher="teacher"
       @saved="onSaved">
         
     </edit>    
  </div>
</template>

<script>
    import TeacherShow from '../../components/teacher/show.vue'
    import TeacherEdit from '../../components/teacher/edit.vue'
    export default {
        name:'TeacherIndexView',
        components:{
           'show':TeacherShow,
           'edit':TeacherEdit
        },
        beforeMount(){
            this.init()
        },
        data(){
            return{
                loaded:false,
                readonly:true,
                user:{},
                teacher:{},
                
            }
        },
        computed: {
            
        },
        methods:{
            init(){
                this.readonly=true
                this.loaded=false
                this.user={}
                this.teacher={}

                this.fetchData()
            },
            onBeginEdit(){
                this.init()
                this.readonly=false
            },
            onSaved(){
                this.init()
                this.readonly=true
            },
            fetchData(){
                 let getData =Teacher.index()  
                 getData.then(data => {
                     this.user =new User(data.user)
                     this.teacher=data.teacher

                     if(data.menus){
                        Bus.$emit('menu-loaded',data.menus)
                     } 
                    
                     this.loaded=true
                })
                .catch(error=> {
                     if(error.response.data.code==401){
                        let msg=error.response.data.msg
                        
                        this.$router.push({ name: 'errors', params: { msg: msg }})
                     }else{   
                        Bus.$emit('errors',error)
                     }
                })

            }
                 
        },
        
    }
</script>