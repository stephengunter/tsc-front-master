class Notice {
    constructor(notice) {
       
        for (let property in notice) {
            this[property] = notice[property];
        }
        
    }
    static source(){
        return '/notices'
    }
    
    static showUrl(id){
         return this.source() + '/' + id
    }
    static index(page,per_page){
        return new Promise((resolve, reject) => {
            let url = Helper.getApiUrl(this.source()) 
            let params={
                page:page,
                per_page:per_page
            }
            url=Helper.buildQuery(url, params)
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
    static latest(){
        return new Promise((resolve, reject) => {
            let count=8
            let url =Helper.getApiUrl('/latest-notices')
            url+='?count=' + count 
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


export default Notice;