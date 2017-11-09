<template>
    <table v-show="hasData" class="table" style="width: 95%;font-size:17px;">
        <thead> 
            <tr> 
                <th></th> 
                <th style="width:45%">課目大綱</th> 
                <th style="width:45%">內容</th>                   
            </tr> 
        </thead>
        <tbody>
            <tr v-for="(schedule,index) in schedules" :key="index">
                <td class="order-td">
                    {{ schedule.order }}
                </td>
                <td>
                    {{  schedule.title  }}
                </td>
                <td>
                    {{  schedule.content  }}
                </td>
            </tr>              
        </tbody>
    </table>
</template>

<script>
    export default {
        name:'CourseSchedule',
        props: {
            schedules:{
                type: Array,
                default: null
            },
        },
        computed: {
            hasData(){
                if(!this.schedules) return false
                return this.schedules.length > 0
            },
        },
    }
</script>


<style scoped>
.order-td{
    width: 10%;

}
  
</style>