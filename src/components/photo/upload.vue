<template>

 <div class="panel">
    
    <div class="panel-block" style="padding: 15px;">
        <div class="columns is-multiline imageupload" style="width:100%"> 
                <div class="file-tab  column is-one-quater-mobile is-half-tablet is-half-desktop">
                    <form  v-if="!hasImage()" method="post" enctype="multipart/form-data" action="" >
                       <label class="button is-info btn-file">
                            <span>選擇檔案</span>
                            <input type="file" id="image_file" name="image_file" @change="onFileChange">
                       </label>
                    </form>
                    
                         
                    <img class="thumbnail" :style="getImageStyle()" :src="image"></img>
                      
                    
                    <div v-show="hasImage()" style="margin-top:12px;">
                        <button @click="submitImage" :enable="submitting"  class="button is-success" type="button">確認送出</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <button @click="removeImage" :enable="submitting"  type="button" class="button is-danger" >刪除</button>
               
                    </div>
                        
                       
                </div>               
               
                
                
        </div>
    </div>
  

</div>
</template>


<script>
    export default {
        props: ['width', 'height', 'user'],
        data() {
            return {
                image: '',
                files: [],
                title: '',
                description: '',
                err: [],
                submitting: false
            }
        },
        methods: {
            getImageStyle() {
                return 'max-width:' + this.width + 'px; max-height:' + this.height + 'px'
            },
            hasImage() {
                if (this.image) {
                    return true;
                }
                return false
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.files = e.target.files;

                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage(e) {
                this.image = ''
                this.files = []
                this.title = ''
                this.description = ''
            },
            submitImage() {
                this.submitting = true
                let form = new FormData();
                form.append('width',this.width);
                form.append('height',this.height);
                if(this.user){
                    form.append('user_id',this.user);
                }

                for (let i = 0; i < this.files.length; i++) {
                    form.append('image_file', this.files[i]);
                }

                let url=Helper.getUrl('/api/photoes')
                axios.post(url, form)
                    .then(response => {
                        let photo = response.data
                        this.$emit('uploaded', photo)
                        this.removeImage()
                        this.submitting = false
                    })
                    .catch(error => {
                        this.removeImage()
                        Bus.$emit('errors',error)
                        this.submitting = false
                    })
            }
        }

    }
</script>


<style>
    .imageupload .alert,
    .imageupload .file-tab .thumbnail {
        margin-bottom: 10px
    }
    
    .imageupload.imageupload-disabled {
        cursor: not-allowed;
        opacity: .6
    }
    
    .imageupload.imageupload-disabled>* {
        pointer-events: none
    }
    
    .imageupload .panel-title {
        margin-right: 15px;
        padding-top: 8px
    }
    
    .imageupload .btn-file {
        overflow: hidden;
        position: relative
    }
    
    .imageupload .btn-file input[type=file] {
        cursor: inherit;
        display: block;
        font-size: 100px;
        min-height: 100%;
        min-width: 100%;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: right;
        top: 0
    }
    
    .imageupload .url-tab .thumbnail {
        margin: 10px 0
    }
</style>