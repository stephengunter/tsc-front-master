
export default function(Vue){
    Vue.auth={
        setToken(token , expiration , refresh_token) {
          
            localStorage.setItem('token' , token)
            localStorage.setItem('refresh_token' , refresh_token)
            localStorage.setItem('expiration' , expiration)

        },
        getToken() {
            let token= localStorage.getItem('token')
            let expiration=localStorage.getItem('expiration')
            if(!token || !expiration)
                 return null

              return token

        },
        getRefreshToken(){
           return localStorage.getItem('refresh_token')
        },
        destroyToken() {
            
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('expiration')
        },
        isAuthenticated() {
            if(!this.getToken())  return false
            return true
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