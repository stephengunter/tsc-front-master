<template>

 <div class="panel">
    <div class="panel-heading panel-title heading" >
        個人資訊
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
                        <div class="columns" >
                          <div class="column" >
                              <label class="label label-title">使用者名稱</label>
                              <p>
                                  {{ user.name }}
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
                  
                        </div>   <!--  End Row -->
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
                              
                          </div>
                          <div class="column" >
                              
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
     name:'Profile',
     props:['user'],
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
          this.$emit('beginEdit')
        }, 
        getPhoto() {
           
        },
     }
  }

    
</script>


<style>

</style>