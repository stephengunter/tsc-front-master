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
    
   
    getPhoto() {
        
        let photo_id = this.profile.photo_id
        let url =Helper.getUrl('/api/photoes/');
        if (photo_id) {
            url += photo_id
        } else {
            url += 'defaultProfile'
        }

        axios.get(url)
            .then(response => {
                this.setPhoto(response.data.photo)
            })
            .catch(function(error) {
                console.log(error)
            })
    }

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
            let user = this.id
            let url =Helper.getUrl('/api/users/' + user + '/updatePhoto')
           
            photoForm.put(url)
                .then(result => {
                    if(photo){
                         this.profile.photo_id=photo.id
                    }else{
                        this.profile.photo_id=null 
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