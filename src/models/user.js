class User {
    constructor(user) {
        this['photo']={
            path:''
        }
       
        for (let property in user) {
            this[property] = user[property];
        }

        this.genderText='女'
        if( parseInt(user.profile.gender)>0 ) this.genderText='男'

        this.getPhoto()
       
    }
    static source(){
        return '/users'
    }
    static showUrl(id){
         return this.source() + '/' + id
    }
    static editUrl(id){
         return this.showUrl(id) +  '/edit'
    }
    static updateUrl(id){
        return this.showUrl(id)
    }
    static show(id){
        return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.showUrl(id) )
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    static edit(id){
        let url =Helper.getApiUrl(this.editUrl(id) ) 
     
        return new Promise((resolve, reject) => {
            
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    static update(form , id){
         let url =Helper.getApiUrl(this.updateUrl(id)) 
         let method='put'
        return new Promise((resolve, reject) => {
            form.submit(method,url)
                .then(user => {
                    resolve(user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    getPhoto() {
        if(this.profile.photo){
             let path=this.profile.photo.path
            this.photo={
                 path: Config.apiUrl() +  path 
            } 
        }else{
            this.photo={}
        }
       
    }
   
    // getPhoto() {
        
    //     let photo_id = this.profile.photo_id
    //     let url =Helper.getUrl('/api/photoes/');
    //     if (photo_id) {
    //         url += photo_id
    //     } else {
    //         url += 'defaultProfile'
    //     }

    //     axios.get(url)
    //         .then(response => {
    //             this.setPhoto(response.data.photo)
    //         })
    //         .catch(function(error) {
    //             console.log(error)
    //         })
    // }

    setPhoto(photo){
          this.photo = photo
          if(photo){
            this.photo.path= Helper.getBackUrl() + photo.path  
          }
          
    }
    hasPhoto(){
        return !this.photo.default
    }

    updatePhoto(photo){
        return new Promise((resolve, reject) =>{
            let photoForm = new Form({
                    photo_id: ''
                })
            if(photo){
                photoForm.photo_id=photo.id
            }
           
            let url =Helper.getApiUrl(User.updateUrl(this.id) + '/update-photo') 
           
            photoForm.put(url)
                .then(result => {
                    if(photo){
                         this.profile.photo_id=photo.id
                          this.profile.photo=photo
                    }else{
                         this.profile.photo_id=null 
                          this.profile.photo=null
                    }

                    this.getPhoto()
                    resolve(true)

                })
                .catch(error => {
                   reject(error)                    
                })
                
        }) 
     
    }
    
    

    

    

}


export default User;