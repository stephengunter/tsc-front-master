class Teacher {
    constructor(teacher) {
        this['photo']={
            path:''
        }
       
        for (let property in teacher) {
            this[property] = teacher[property];
        }

        this.experiences = this.experiences.split("\n")      

        this.getPhoto()
       
    }
    
   
    getPhoto() {
        
        let photo_id = this.photo_id
        let url =Helper.getUrl('/api/photoes/');
        if (photo_id) {
            url += photo_id
        } else {
            url += 'defaultProfile'
        }

        axios.get(url)
            .then(response => {
                let photo=response.data.photo
                this['photo'] = response.data.photo
                this.photo.path=Helper.getBackUrl() + photo.path
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    
    

    

    

}


export default Teacher;