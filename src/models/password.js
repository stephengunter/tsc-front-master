class Password {
   
   static change(form){
        let url=Helper.getApiUrl('/change-password')
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
    static forgot(form){
        let url=Helper.getApiUrl('/forgot-password')
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

    static reset(form){
        let url=Helper.getApiUrl('/reset-password')
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

    

    

}


export default Password;