
export default function(Vue){
    let authenticatedUser={}
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
            if(this.getToken()) 
                return true
            return false
        },

        setAuthenticatedUser(data){
            authenticatedUser=data
        },

        getAuthenticatedUser(){
           return authenticatedUser
        },
        username(){
            if(!authenticatedUser) return ''
                 return authenticatedUser.name
        },
        
        logout(){
            this.destroyToken()
            this.setAuthenticatedUser(null)
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