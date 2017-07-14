class Password {
   static test(){
    alert('ppp')
   }
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

    

    

}


export default Password;