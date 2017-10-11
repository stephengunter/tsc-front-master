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
    
    static source(){
        return '/teachers'
    }
    static createUrl(){
        return this.source() + '/create' 
    }
    static storeUrl(){
         return this.source()
    }
    static editUrl(id){
        return this.source() + '/' + id +  '/edit' 
    }
    static updateUrl(id){
        return this.showUrl(id)
    }
    static edit(id){
        return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.editUrl(id))
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    static index(){
        
         return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.source())
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    
    static store(form){
        let url =Helper.getApiUrl(this.storeUrl())
        
        let method='post'
        return new Promise((resolve, reject) => {
            form.submit(method,url)
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
    static courses(){
        let url=this.source() + '/courses'
         return new Promise((resolve, reject) => {
            url =Helper.getApiUrl(url)
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }

    static showCourse(id){
        let url=this.source() + '/courses'
        url += '?id=' + id
         return new Promise((resolve, reject) => {
            url =Helper.getApiUrl(url)
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    
   
    getPhoto() {
        let path=this.photo.path
        this.photo={
             path: Config.apiUrl() +  path 
        } 
    }
    
    

    

    

}


export default Teacher;