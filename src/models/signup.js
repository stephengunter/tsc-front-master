class Signup {
    constructor(data) {

        for (let property in data) {
            this[property] = data[property];
        }

        let course=data.course

        this.formatedCourseName = course.name + ' &nbsp (編號 ' + course.number + ' )'

        this.formatedTuition=this.formatTuition()

        this.statusText=this.getStatusText()

        this.date=Helper.tpeDate(this.created_at)

        this.courseDetailsUrl=Helper.getCourseDetailsUrl(this.course_id)
        

    }
    static source(){
        return '/signups'
    }
    static showUrl(id){
         return this.source() + '/' + id
    }
    static storeUrl(){
         return this.source()
    }
    static createUrl(){
        return '/signups/create'
    }
    static deleteUrl(id){
         return this.source() + '/' + id
    }
    static create(course,user){
         return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.createUrl()) 
            let params={
                course:course,
                user:0
            }
            if(user) params.user=user

            url= Helper.buildQuery(url,params)
           
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
        return new Promise((resolve, reject) => {
             axios.post(url, form)
                .then(response => {
                     resolve(response.data);
                })
                .catch(error => {
                     reject(error);
                })
          
        })
    }
    static show(id){
        return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.showUrl(id)) 
           
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    static records(){
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
    static delete(id) {
        return new Promise((resolve, reject) => {
            let url =Helper.getApiUrl(this.deleteUrl(id) ) 
            let form = new Form()
            form.delete(url)
                .then(response => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
    formatTuition(){
        let formated_tuition = Helper.formatMoney(this.tuition) + ' 元'
        if(!this.discount) return formated_tuition

        formated_tuition +=' &nbsp ( ' 
        formated_tuition += this.discount  + ' &nbsp  ' 
        formated_tuition += this.points  + ' 折優惠' 
        formated_tuition +=' )'

        return formated_tuition
        
    }

    getStatusText(){
        let status=parseInt(this.status)
        if(status==0) return '待繳費'
        if(status==1) return '已完成'

            return ''
    }
    
    
   

    

}


export default Signup;