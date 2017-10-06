<template>
<div v-if="loaded">
 <div class="panel">
    <div class="panel-heading panel-title heading" >
        教師基本資料
    </div>
    <div class="panel-block">
        <div class="tile is-ancestor">
            <div class="tile is-vertical">
                <div class="tile">
                    <div v-show="edit_photo" class="column is-one-quarter text-center " >
                        <figure class="image  is-128x128 img-center">
                           <img :src="user.photo.path"> </img> 
                        </figure>
                        <div style="margin-top:12px;">
                          <h5>個人相片</h5>
                        </div> 
                        <div style="margin-top:8px;">
                        <a @click="photoUploadSettings.show=true" class="button is-small is-info">
                          <span class="icon is-small">
                            <i class="fa fa-pencil"></i>
                          </span>
                        </a> &nbsp;&nbsp;
                        <a  @click="showConfirm=true" v-show="hasPhoto" class="button is-danger is-small">
                            <span class="icon is-small">
                              <i class="fa fa-trash"></i>
                            </span>
                         </a>
                        </div>
                    </div>
                    
                    <div class="tile is-parent is-vertical show-data">
                        <form @submit.prevent="onSubmit" @keydown="clearErrorMsg($event.target.name)">
                       
                        <div class="columns" >
                            <div class="column" >
                                <label class="label label-title">姓名</label>
                                <p class="control">
                                  <input name="user.profile.fullname" v-model="form.user.profile.fullname" class="input" type="text" >
                                  <p class="help is-danger" v-if="form.errors.has('user.profile.fullname')" v-text="form.errors.get('user.profile.fullname')"></p>
                                </p>
                            </div>
                            <div class="column" >
                               <label class="label label-title">性別</label>
                                <p class="control" >
                                  <radio-group  v-model="form.user.profile.gender">
                                    <radio-button val="1" >男</radio-button>
                                    <radio-button val="0" >女</radio-button>
                                  </radio-group>
                                </p>
                            </div>
                            <div class="column" >
                                <label class="label label-title">生日</label>
                                
                                <p class="control">
                                    <datepicker  v-model="form.user.profile.dob" :options="datePickerOption" class="is-grouped"></datepicker>
                                    <p class="help is-danger" v-if="form.errors.has('user.profile.dob')" v-text="form.errors.get('user.profile.dob')"></p>
                                </p>
                            </div>
                        </div>  <!--  End Row -->
                        <div class="columns" >
                          <div class="column" >
                              <label class="label label-title">身分證號</label>
                              <p class="control">
                                  <input name="user.profile.SID" v-model="form.user.profile.SID" class="input" type="text" >
                                  <p class="help is-danger" v-if="form.errors.has('user.profile.SID')" v-text="form.errors.get('user.profile.SID')"></p>
                              </p>
                          </div>
                          <div class="column" >
                             <label class="label label-title">Email</label>
                             
                              <p class="control">
                                  <input name="user.email" v-model="form.user.email"  class="input" type="text" :disabled="!canEditEmail">
                                 
                                  <p class="help is-danger" v-if="form.errors.has('user.email')" v-text="form.errors.get('user.email')"></p>
                              </p>
                              
                          </div>
                          <div class="column" >
                              <label class="label label-title">電話</label>
                             
                              <p class="control">
                                  <input name="user.phone" v-model="form.user.phone"  class="input" type="text" :disabled="!canEditPhone">
                                  <p class="help is-danger" v-if="form.errors.has('user.phone')" v-text="form.errors.get('user.phone')"></p>
                              </p>
                          </div>
                        </div>  <!--  End Row -->
                        <div class="columns" >
                           <div class="column" >
                              <label class="label label-title">專長</label>
                             
                              <p class="control">
                                  <input type="text" name="teacher.specialty"  class="input"  v-model="form.teacher.specialty"  >
                                  <p class="help is-danger" v-if="form.errors.has('teacher.specialty')" v-text="form.errors.get('teacher.specialty')"></p>
                              </p>
                           </div>
                           <div class="column" >
                              <label class="label label-title">最高學歷</label>
                             
                              <p class="control">
                                  <input type="text" name="teacher.education"  class="input"  v-model="form.teacher.education"  >
                                  <p class="help is-danger" v-if="form.errors.has('teacher.education')" v-text="form.errors.get('teacher.education')"></p>
                              </p>
                           </div>
                           <div class="column" >
                              <label class="label label-title">教師證書號</label>
                             
                              <p class="control">
                                  <input type="text" name="teacher.certificate"  class="input"  v-model="form.teacher.certificate"  >
                                  <p class="help is-danger" v-if="form.errors.has('teacher.certificate')" v-text="form.errors.get('teacher.certificate')"></p>
                              </p>
                           </div>
                        </div>  <!--  End Row -->
                        <div class="columns">
                            <div class="column" >
                              <label class="label label-title">現職</label>
                             
                              <p class="control">
                                  <input type="text" name="teacher.job"  class="input"  v-model="form.teacher.job"  >
                                  <p class="help is-danger" v-if="form.errors.has('teacher.job')" v-text="form.errors.get('teacher.job')"></p>
                              </p>
                            </div>
                            <div class="column" >
                              <label class="label label-title">職稱</label>
                             
                              <p class="control">
                                  <input type="text" name="teacher.jobtitle"  class="input"  v-model="form.teacher.jobtitle"  >
                                  <p class="help is-danger" v-if="form.errors.has('teacher.jobtitle')" v-text="form.errors.get('teacher.jobtitle')"></p>
                              </p>
                            </div>
                            <div class="column">
                              <!-- <label class="label label-title">學經歷</label>
                             
                              <p class="control">
                                  <input type="text" name="teacher.experiences"  class="input"  v-model="form.teacher.experiences"  >
                                  <p class="help is-danger" v-if="form.errors.has('teacher.experiences')" v-text="form.errors.get('teacher.experiences')"></p>
                              </p> -->
                            </div>
                        </div>  <!--  End Row -->
                        <div class="columns">
                           <div class="column">
                              <label class="label label-title">學經歷</label>
                               <p class="control">
                                  <textarea type="text" name="teacher.experiences"  class="textarea"  v-model="form.teacher.experiences"  >
                                  </textarea>
                                  <p class="help is-danger" v-if="form.errors.has('teacher.experiences')" v-text="form.errors.get('teacher.experiences')"></p>
                                  <p v-else class="help">多項經歷請換行分隔</p>
                              </p> 
                           </div> 
                           <div class="column">
                              <label class="label label-title">個人簡介</label>
                               <p class="control">
                                  <textarea name="teacher.description"  class="textarea"  v-model="form.teacher.description"  >
                                  </textarea>
                                  <p  v-if="form.errors.has('teacher.description')" class="help is-danger" v-text="form.errors.get('teacher.description')"></p>
                                 
                              </p> 
                           </div> 
                        </div>  <!--  End Row -->
                        <div class="columns">
                          <div class="column" >
                              <button type="submit" class="button is-primary" :disabled="form.errors.any()">確定送出</button>
                              &nbsp;
                              <a v-if="allow_cancel" @click.prevent="cencelEdit" class="button is-outlined">取消</a>
                              
                          </div>
                          
                        </div>  <!--  End Row -->
                        </form>
                    </div>
                   
            
                </div>    
            </div>
        </div>
    </div>
  

  </div>
  <modal title="上傳圖片" :show-footer="false" :is-show="photoUploadSettings.show" @close="photoUploadSettings.show=false">     
      <photo-upload :width="photoUploadSettings.width"
         :height="photoUploadSettings.height" 
         :user_id="id" @uploaded="onPhotoUploaded">
      </photo-upload>
  </modal>
  <modal  :show-header="false"  :is-show="showConfirm" :on-ok="deletePhoto" ok-text="確定" cancel-text="取消" @close="showConfirm=false">     
       <article class="message is-danger">
          <div class="message-header">
              <p style="font-weight: bold;font-size:19px">
              <i class="fa fa-exclamation-triangle"></i>
                  警告
              </p>
          </div>
          <div class="message-body info">
             確定要刪除個人相片？
          </div>
        </article>
  </modal>
</div>
</template>


<script>
  import { zh } from 'flatpickr/dist/l10n/zh';
  import PhotoUpload from  '../../components/photo/upload.vue'
  export default {
    name:'EditTeacher',
    components:{
         PhotoUpload
    },
    props: {
            id: {
              type: Number,
              default: 0
            },
            edit_photo:{
               type: Boolean,
               default: true
            },   
            allow_cancel:{
               type: Boolean,
               default: true
            },   
           
     },
     data(){
       return {
          loaded:false,
          user:{},
          form:{},
         
          datePickerOption: {
             locale: zh,
             wrap: true, 
          },

          photoUploadSettings:{
              width:200,
              height:200,
              show:false,
          },

          canEditEmail:false,
          canEditPhone:true,

          
          showConfirm:false
          
       }
     },
     beforeMount() {
         this.init()
     }, 
     computed: {
            hasPhoto() {
                return this.user.hasPhoto()
            },
            hasDOB(){
                if(!this.form.user.profile) return false
                if(!this.form.user.profile.dob) return false
                return true
            }
     },
     watch:{
        form: {
              handler: function () {
                 if(this.hasDOB){
                    this.clearErrorMsg('user.profile.dob')
                 }
              },
              deep: true
            },

     },
     methods:{
        init(){
           this.form = new Form({
               user:{},
               teacher:{}
           })

           this.canEditEmail=false
           this.canEditPhone=true

           this.loaded=false

           this.fetchData()
                
        },
        fetchData() {
            let getData =Teacher.edit(this.id)                
           
            getData.then(data => {
                this.form.user=data.user
                this.form.teacher=data.teacher

                if(data.user.email){

                }else{
                   this.canEditEmail=true
                   this.canEditPhone=false
                }

                this.user =new User(data.user)
                this.loaded=true
            })
            .catch(error=> {
               Bus.$emit('errors',error)
            })
        },  
        
        cencelEdit(){
           this.$emit('cencel')
        },
       
        onPhotoUploaded(photo) {
           let updatePhoto=this.user.updatePhoto(photo)
           updatePhoto.then(result => {
                    this.photoUploadSettings.show = false
                 })
                 .catch(error => {
                     Bus.$emit('errors',error)
                 })
           
        },
        clearErrorMsg(name) {
            this.form.errors.clear(name)
        },
        onSubmit(){
            let save=null 
            let id=this.form.teacher.user_id
          
            if( Helper.isTrue(id)){
               save=Teacher.update( this.form, id)
            }else{
               save=Teacher.store( this.form)
            }
            
            save.then(user => {
              alert('ok')
               // this.$auth.setAuthenticatedUser(user)
             
               // this.$emit('saved',user)
               // Bus.$emit('okmsg','存檔成功')
               // Bus.$emit('authChanged', true)               
               
            })
            .catch(error => {
                Bus.$emit('errors',error,'存檔失敗')
            })
        },
        deletePhoto() {
           let photo=this.user.updatePhoto()
           photo.then(result => {
                     this.showConfirm = false
                 })
                 .catch(error => {
                     Bus.$emit('errors',error)
                 })
           
           
        },
     }
  }

    
</script>


<style>

</style>