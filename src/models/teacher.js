class Teacher {
    constructor(teacher) {
        this['photo']={
            path:''
        }
       
        for (let property in teacher) {
            this[property] = teacher[property];
        }

        this.experiences = this.experiences.split('<br>')      

        this.getPhoto()
       
    }
    
   
    getPhoto() {
        let path=this.photo.path
        this.photo={
             path: Config.apiUrl() +  path 
        } 
    }
    
    

    

    

}


export default Teacher;