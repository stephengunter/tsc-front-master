<template>
<div class="panel">
    <div class="panel-heading panel-title heading" >
        教師課程
        
    </div>
    <div class="panel-block">

        <table v-show="loaded" class="table">
            <thead>
                <tr>
                    <th style="width:7%"></th>
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
                    <td>
                        <a class="button is-small is-info is-outlined" @click.prevent="onSelected(course.id)">
                           <span class="icon">
                             <i class="fa fa-pencil" aria-hidden="true"></i>
                           </span> 
                          
                        </a>
                    </td>
                    <td>{{ course.center.name }}</td>
                    <td>{{ course.number }}</td>
                    <td>{{ course.name }}</td>
                    <td>{{ course.period }}</td>
                    <td v-html="course.classTimesText()"></td>
                    <td v-html="classLabel(course)"></td>
                </tr>
            </tbody>
        </table>
    </div>
 </div>    
</template>

<script>
    export default {
        name:'TeacherCoursesList',
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
                this.courses=[]
                let getData=Teacher.courses()
                getData.then(data=>{
                    if(data.menus){
                        Bus.$emit('menu-loaded', data.menus)
                    } 
                    for(let i=0; i<data.courses.length;i++){
                        this.courses.push( new Course(data.courses[i]) )
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
            },
            classLabel(course){
                return CourseStatus.getClassLabel(course.status)
            },
            onSelected(id){
                this.$emit('selected',id)
            }
        }
    }
</script>