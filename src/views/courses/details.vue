<template>
<div>
    <large-card :course="course"></large-card>
     <h1 class="title">課程資訊</h1>
     <info></info>

     <h1 class="title">師資介紹</h1>
     <teacher></teacher>

     <h1 class="title">課程進度</h1>
      <table class="table" style="font-size:17px;">
          <tbody>
              <tr v-for="schedule in course.schedule">
                <td class="order-td">
                  {{schedule.lesson}}
                </td>
                <td>
                  {{schedule.content}}
                </td>
              </tr>              
            </tbody>
      </table>

      <h1 class="title">公告事項</h1>
      <li v-for="notice in course.notices" v-text="notice" style="font-size:17px;"></li>
     <!--  <li>台積電藝術總監</li>
      <li>社區展望協會主任委員</li> -->
</div>
</template>

<script>
import LargeCard from  '../../components/course/LargeCard.vue'
import Info from  '../../components/course/Info.vue'
import Teacher from  '../../components/course/Teacher.vue'

export default {

   name:'details',
   components:{
      'large-card':LargeCard,
      'info':Info,
      'teacher':Teacher
   },
   data(){
     return {
        course:{}
     }
   },
   beforeMount(){
       this.fetchData()
   },
   methods:{
        fetchData(){
          let schedule=[
            { lesson:'1' , content:'針氈－認識羊毛氈初步說明、圓球吊飾製作'},
            { lesson:'2' , content: '針氈－小小布盒蓋〈布料針氈〉'},
            { lesson:'3' , content:'針氈－接合技法、大頭狗製作'},
            { lesson:'4' , content:'針氈－蛋糕技法、蛋糕磁鐵製作'},
            { lesson:'5' , content:'針氈－四肢活動、小小熊熊鑰匙圈製作'},
          ]
          let notices=[
              '颱風日臨時放假將擇期補課',
               '學員需自備交通工具'
          ]
            let course={
                name:'可愛羊毛氈手做',
                status:'招生中',
                dayofweek:'星期六',
                cost: 3000,
                time:'10:00 ~ 12:00',
                hours: 32,
                startDate:'2017-3-16',
                period:'2017-3-16 ~ 2017-6-30',
                weeks: 16,
                description:'羊毛在炎熱的台灣或許會給人酷熱的印象，但羊毛氈卻可利用簡單的工具與技巧，變化出非常實用的袋物或家居用品，甚至是可愛的人偶，是非常值得一試的療癒系手做。',
                teacher:{ name:'林阿福' ,parent:0},
                center:{name:'花蓮中心'},
                schedule:schedule,
                notices:notices
            }
            this.course=course
        }
   },


}
</script>


<style>
.course-info {
    font-size:17px;
}
.order-td{
    width: 10%;
    text-align: center;
}
    
</style>

