class TeacherCourses {
   
    
    static source(){
        return '/teacher/courses'
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
    
   
    static show(id){
        let url=this.source() + '/' + id
      
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
    
   
    
    

}


export default TeacherCourses;