class Center {
    constructor(data) {
       
        for (let property in data) {
            this[property] = data[property];
        }

        this.addressText=''
        if(data.contactInfo){
            this.addressText=data.contactInfo.addressA
        }

    }
    static title(){
       return 'Centers'
    }
    static source(){
        return '/centers'
    }
    
    static showUrl(id){
         return this.source() + '/' + id
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
        return new Promise((resolve, reject) => {
            let url = this.showUrl(id) 
            axios.get(url)
                .then(response => {
                   resolve(response.data)
                })
                .catch(error=> {
                     reject(error);
                })
           
        })
    }
    static getPhotoUrl(path){
        return Config.apiUrl() +  path
    }
   
    

}


export default Center;