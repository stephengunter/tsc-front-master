class Resume {
    constructor(resume) {
        this['photo']={
            path:''
        }
       
        for (let property in resume) {
            this[property] = resume[property];
        }

        this.experiences = this.experiences.split('<br>')      

        this.getPhoto()
       
    }
    static source(){
        return '/resumes'
    }
    static createUrl(){
        return this.source() + '/create' 
    }
    static storeUrl(){
         return this.source()
    }
   
    static index(){
        return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.source())
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error)
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
    
   
    getPhoto() {
        let path=this.photo.path
        this.photo={
             path: Config.apiUrl() +  path 
        } 
    }
    
    

    

    

}


export default Resume;