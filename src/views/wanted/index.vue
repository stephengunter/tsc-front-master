<template>
<div>
    <h1 class="title">{{ title }}</h1>
    <p class="info-description">誠徵教師：慈濟大學社會教育推廣中心廣邀天下善士，只要您身懷各式專才，或曾在學校或相關機構授課，擁有豐富的教學經驗。
    </p>
     <!-- <p class="info-description">目前我們有以下六大系列課程：
        <ul style="list-style-type: disc;">
            <li>語言：英語、日語、韓語、法語、德語…等各國語言，或手語等特殊語言。</li>
            <li>語言：英語、日語、韓語、法語、德語…等各國語言，或手語等特殊語言。</li>
        </ul>
    </p> -->
   <p v-show="!teacherInit" class="info-description">意者請
    <a href="#" @click.prevent="wantTeacher">點此填寫《教師基本資料》</a>。
       
   </p>
    
    <div v-show="teacherInit" class="panel">
       <div class="panel-heading panel-title heading" >
           教師基本資料
        </div>
    </div>

    <modal title="請先登入" :backdrop-closable="false"  :width="confirmSettings.width" 
        :is-show="confirmSettings.show" transition="fadeDown" @close="onAuthFailed"
         ok-text="確定" :show-cancel="false">
         <p class="title is-5">填寫《教師基本資料》需要登入，若您還沒有帳號可以註冊新帳號。</p>
     
    </modal>

</div>

</template>

<script>

    
    export default {
        name:'WantedIndexView',
        components:{
            
        },
        beforeMount(){
            this.init()
        },
        data(){
            return{
                title:'徵才訊息',
                confirmSettings:{
                   show:false,
                   width:600,
                },
                teacherInit:false

                
            }
        },
        computed: {
            
        },
        methods:{
            init(){
                
            },
            wantTeacher(){
                let auth=this.$auth.hasToken()
                if(auth){
                   this.$router.push('/resumes')
                }else{
                    this.confirmSettings.show=true
                }
            },
            onAuthFailed(){
                
                this.$auth.logout()
                let returnUrl="/wanted"
                    this.$router.push('/login?return=' + returnUrl)
                
            },     
        },
        
    }
</script>