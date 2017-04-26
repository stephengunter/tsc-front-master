
export default function(Vue){
    Vue.auth={
        login(username,password){
            return new Promise((resolve, reject) =>{
                let token = this.passwordLogin(username,password)
                token.then(() => {
                    let user=this.getUser()
                    user.then(() => {
                       resolve(true)
                    }).catch(error => {
                       reject(error)
                    })
                   
                }).catch(error => {
                     reject(error) 
                })
            })
            
        },
        passwordLogin(username,password){
             return new Promise((resolve, reject) => {
                     let form=new Form({
                        grant_type: 'password',
                        client_id: 2,
                        client_secret: 'AzUbjsNJMkKvLBrI59d4hOVxdQDVxma35i2EvHjH',

                        username: username,
                        password: password,
                        scope: ''
                     })
                     let url=Helper.getUrl('/oauth/token') 
                     form.post(url)
                     .then(response => {
                        let token=response.access_token
                        let expiration=response.expires_in + Date.now()
                        let refreshToken=response.refresh_token
                        this.setToken(token , expiration,refreshToken)
                       
                        resolve(true)
                     })
                     .catch(error => {
                        this.logout()
                        reject(error.response)
                     })
                });
        },
        getUser(){
            return new Promise((resolve, reject) => {
                    
                     let url=Helper.getUrl('/api/user') 
                     axios.get(url)
                     .then(response => {
                        let user=response.data
                        this.setAuthenticatedUser(user)
                        resolve(true);
                     })
                     .catch(error => {
                        this.logout()
                        reject(error.response);
                     })
                });
        },
        setToken(token , expiration , refresh_token) {
            localStorage.setItem('token' , token)
            localStorage.setItem('refresh_token' , refresh_token)
            localStorage.setItem('expiration' , expiration)
            
            axios.defaults.headers.common.Authorization='Bearer ' + token

        },
        getToken() {
            let token= localStorage.getItem('token')
            let expiration=localStorage.getItem('expiration')
            if(!token || !expiration)
                 return null

              return token

        },
        refreshToken(){
              return new Promise((resolve, reject) => {
                             let refreshToken=this.getRefreshToken()
                             let form=new Form({
                                grant_type: 'refresh_token',
                                client_id: 2,
                                client_secret: 'AzUbjsNJMkKvLBrI59d4hOVxdQDVxma35i2EvHjH',

                                refresh_token: refreshToken,
                                scope: ''
                             })
                             let url=Helper.getUrl('/oauth/token') 
                             form.post(url)
                             .then(response => {

                                let token=response.access_token
                                let expiration=response.expires_in + Date.now()
                                let refreshToken=response.refresh_token
                                this.setToken(token , expiration,refreshToken)
                                axios.defaults.headers.common.Authorization='Bearer ' + token

                                resolve(true);
                             })
                             .catch(error => {
                                reject(error.response);
                             })
                        });
            },
        getRefreshToken(){
           return localStorage.getItem('refresh_token')
        },
        destroyToken() {
            
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('expiration')
        },
        hasToken(){
            if(!this.getToken())  return false
                return true
        },
        isAuthenticated() {
            if(!this.getToken())  return false
            var token = this.refreshToken()
            token.then(() => {
                 return true
             }).catch(error => {
                    return false
             })
        },

        setAuthenticatedUser(user){
            localStorage.setItem('username' , user.name)
            localStorage.setItem('user_id' , user.id)
            localStorage.setItem('email' , user.email)
        },

        email(){
           return localStorage.getItem('email')
        },
        username(){
           return localStorage.getItem('username')
        },
        user_id(){
           return localStorage.getItem('user_id')
        },
        
        logout(){
            this.destroyToken()
            localStorage.removeItem('username')
            localStorage.removeItem('user_id')
            localStorage.removeItem('email')
            axios.defaults.headers.common.Authorization=null
        }
    }
   

    Object.defineProperties(Vue.prototype, {
        $auth:{
            get:()=>{
                return Vue.auth
            }
        }
    })
}