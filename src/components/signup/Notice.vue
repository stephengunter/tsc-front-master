<template>

<div>
    <h3 class="title is-3">報名方式</h3>
    
    <p class="info-description">本網站農業入門班於開課前二個月起於農民學院接受網路報名，至開課前一個月截止報名，各訓練課程開放報名時間事先公告於農民學院。於非規定之報名時間及非透過農民學院報名系統所報名之訓練課程，皆不具報名資格。
    </p>

    <hr>

    <h3 class="title is-3">繳費須知</h3>
    
    <p class="info-description">若您為正取學員，於公佈錄取名單後，會收到「正取與繳費通知信Email」、「通知簡訊」及「繳費單」，請自行列印使用。若您未收到通知信與繳費單，亦可登入本網後進入「學員專區」，點選「<a href="#">報名繳費記錄</a>」即可於網頁列印繳費單，
    若您未於繳費期限內繳費，則視同放棄報名資格，將由備取人員遞補。
       
        <ul style="list-style-type: disc;margin-left: 0; padding-left: 20px;">
           <li>繳費方式：台灣銀行臨櫃∕郵局∕ATM轉帳∕超商（7-11、OK、全家、萊爾富）繳款。</li>
           <li>繳費期限：發出繳費通知信後開始計算，第4天為繳款期限。</li>         
        </ul>
      
    <br>完成繳費後系統將直接匯入您的繳費狀況，但為保護您的上課權利，請保留您的繳費單據至訓練課程開辦前。
    建議您於繳費後，登入本網進入「學員專區」，點選「報名繳費記錄」以確認您的繳費情況。若您已完成繳費，但系統卻顯示未入帳，請您填入繳費管道、繳費日期及帳號後5碼（ATM轉帳適用），我們將再度確認，若確實沒收到款項，農民學院將主動與您聯絡。
   
    </p>

    <hr>

    <h3 class="title is-3">退費方式</h3>
    <p class="info-description">請於開課前 10天親至開課中心辦理取消報名，或洽客服專線： (02)2301-2308
       <!-- <br>若因個人因素於報名繳費後取消報名者： -->
       
        <ul style="list-style-type: disc;margin-left: 0; padding-left: 20px;">
           <li>開課前10天以上取消者，收取全額20%手續費後並退費。</li>
           <li>開課前3天～9天取消者，收取全額30%手續費後並退費。</li>         
        </ul>
    </p>

     <hr>
     <a @click.prevent="nextStep"  class="button is-primary is-medium">了解，進行下一步</a>
     &nbsp;&nbsp;&nbsp;
     <a class="button is-outlined is-medium" @click.prevent="cancel">取消</a>
   
</div>



</template>

<script>
    export default {
        name:'SignupNotice',
        methods:{
            nextStep(){
                this.$emit('nextStep')
            },
            cancel(){
                this.$emit('cancel')
            }


        }
    }  
</script>


<style>
.info-description {
    font-size:17px;
}

    
</style>