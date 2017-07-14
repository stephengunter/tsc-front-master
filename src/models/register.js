class Register {
    static unConfirmedUrl(){
        return '/register-unconfirmed'
    }
    static store(form){
        let url=Helper.getApiUrl('/register')
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
    static confirmEmail(user_id,token){
        let form=new Form({
                        id:user_id,
                        token:token
                    })
        let url=Helper.getApiUrl('/email-confirmation')
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

    static sendMail(email){
        let form=new Form({
                        email:email,
                    })
        let url=Helper.getApiUrl('/send-confirmation-mail')
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


export default Register;