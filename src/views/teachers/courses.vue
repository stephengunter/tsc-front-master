<template>
    <table v-show="loaded" class="table">
        <thead>
            <tr>
                <th>開課中心</th>
                <th>編號</th>
                <th>名稱</th>
                <th>課程日期</th>
                <th>上課時間</th>
                <th>狀態</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="course in courses">
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name:'TeacherCoursesView',
        data(){
            return {
                loaded:false,
                courses:[]
            }
        },
        beforeMount() {
            this.init()
        },
        methods:{
            init(){
                this.fetchData()
            },
            fetchData(){
                let getData=Teacher.courses()
                getData.then(data=>{
                    if(data.menus){
                        Bus.$emit('menu-loaded',data.menus)
                     } 
                    this.loaded=true
                }).catch(error => {
                     if(error.response.data.code==401){
                        let msg=error.response.data.msg
                        
                        this.$router.push({ name: 'errors', params: { msg: msg }})
                     }else{   
                        Bus.$emit('errors',error)
                     }
                })
            }
        }
    }
</script>