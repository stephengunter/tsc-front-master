<template>

<div>
    
    <h3 class="title is-3" style="color:green;"> 
        <i class="fa fa-check-circle-o" aria-hidden="true"></i> 您已完成線上報名
    </h3>
    
    
    <p class="msg info">請於 2017-5-29 前完成繳費。完成繳費後系統將直接匯入您的繳費狀況，但為保護您的上課權利，請保留您的繳費單據至訓練課程開辦前。
   
    </p>

    
    <p class="msg info">建議您於繳費後，登入本網進入「學員專區」，點選「報名繳費記錄」以確認您的繳費情況。
    </p>

    <p class="msg info">若您已完成繳費，但系統卻顯示未入帳，請您填入繳費管道、繳費日期及帳號後5碼（ATM轉帳適用），我們將再度確認，若確實沒收到款項，農民學院將主動與您聯絡。</p>

    <hr>

    <signup v-if="hasSignup" :id="signup_id" 
    :can_edit="can_edit">
    </signup>

   

   
</div>



</template>

<script>
    import Signup from  '../../components/signup/signup.vue'
    export default {
        name:'SignupCompleted',
        components:{
           Signup
        },
        props: {
            signup_id: {
              type: Number,
              default: 0
            },
            
        },
        data(){
           return {
              can_edit:false
           }
        },
        computed:{
            hasSignup(){
                return this.signup_id > 0
            },
           
        },
        methods:{
            


        }
    }  
</script>

