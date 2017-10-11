<template>

 <div class="panel">
    <div class="panel-heading panel-title heading" >
        教師資訊
        <a class="button is-info is-outlined" @click.prevent="beginEdit">
           <span class="icon">
             <i class="fa fa-pencil fa-1" aria-hidden="true"></i>
           </span> 
           <span>修改</span>
        </a>
    </div>
    <div class="panel-block">
        <div class="tile is-ancestor">
            <div class="tile is-vertical">
                <div class="tile">
                    <div class="column is-one-quarter text-center " >
                        <figure class="image  is-128x128 img-center">
                           <img :src="user.photo.path"> 
                        </figure>
                        <div style="margin-top:12px;">
                          <h5>個人相片</h5>
                        </div>
                    </div>
                    
                    <div class="tile is-parent is-vertical show-data">
                        <!--  End Row -->
                        <div class="columns" >
                            <div class="column" >
                                <label class="label label-title">姓名</label>
                                <p>
                                    {{ user.profile.fullname }}
                                </p>
                                
                            </div>
                            <div class="column" >
                               <label class="label label-title">性別</label>
                                <p>
                                    {{ user.genderText }}
                                </p>
                                
                            </div>
                            <div class="column" >
                                <label class="label label-title">生日</label>
                                <p>
                                    {{ user.profile.dob }}
                                </p>
                            </div>
                        </div>  <!--  End Row -->
                        <div class="columns" >
                          <div class="column" >
                              <label class="label label-title">身分證號</label>
                              <p>
                                  {{ user.profile.SID }}
                              </p>
                          </div>
                          <div class="column" >
                             <label class="label label-title">Email</label>
                              <p>
                                  {{ user.email }}
                              </p>
                          </div>
                          <div class="column" >
                              <label class="label label-title">電話</label>
                              <p>
                                  {{ user.phone }}
                              </p>
                              
                          </div>
                        </div>  <!--  End Row -->
                        <div class="columns" >
                          <div class="column" >
                              <label class="label label-title">專長</label>
                              <p>
                                  {{ teacher.specialty }}
                              </p>
                          </div>
                          <div class="column" >
                             <label class="label label-title">最高學歷</label>
                              <p>
                                  {{ teacher.education }}
                              </p>
                          </div>
                          <div class="column" >
                              <label class="label label-title">教師證書號</label>
                              <p>
                                  {{ teacher.certificate }}
                              </p>
                              
                          </div>
                        </div>  <!--  End Row -->
                        <div class="columns" >
                          <div class="column" >
                              <label class="label label-title">現職</label>
                              <p>
                                  {{ teacher.job }}
                              </p>
                          </div>
                          <div class="column" >
                             <label class="label label-title">職稱</label>
                              <p>
                                  {{ teacher.jobtitle }}
                              </p>
                          </div>
                          <div class="column" >
                             <label class="label label-title">狀態</label>
                              <p v-html="$options.filters.reviewedLabel(teacher.reviewed)">                       
                    </p>
                          </div>
                        </div>  <!--  End Row -->
                        <div class="columns" >
                          <div class="column" >
                              <label class="label label-title">學經歷</label>
                              <p v-html="teacher.experiences">
                              
                              </p>
                          </div>
                          <div class="column" >
                             <label class="label label-title">個人簡介</label>
                              <p  v-html="teacher.description">
                                 
                              </p>
                          </div>
                          
                        </div>  <!--  End Row -->
                        
                    </div>
                   
            
                </div>    
            </div>
        </div>
    </div>
  

</div>
</template>


<script>
  export default {
     name:'ShowTeacher',
     props: {
            user:{
               type: Object,
               default: null
            },
            teacher:{
               type: Object,
               default: null
            },
            
           
     },
     data(){
       return {
        
       }
     },
     beforeMount() {
         this.init()
     }, 
     methods:{
        init(){ 
        
        },  
        beginEdit(){
           this.$emit('begin-edit')
        }, 
        
     }
  }

    
</script>


<style>

</style>