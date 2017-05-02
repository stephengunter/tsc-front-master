import './bootstrap'
import router from './routes'

import App from './App.vue'

router.beforeEach(
    (to, from, next)=>{

        let hasToken=Vue.auth.hasToken()
        if(to.matched.some(record=>record.meta.forVisitors)){

            if(hasToken){
                next({
                    path: '/'
                })
            }else next()

        }else if(to.matched.some(record=>record.meta.forAuth)){

            if(!hasToken){
                next({
                    path: '/login',                    
                })
            }else{
                let authenticated=Vue.auth.isAuthenticated()
                authenticated.then(() => {
                    next()
                }).catch(error => {
                    Vue.auth.logout()
                    next({
                        path: '/login',                    
                     })
                })
               
            }

        }
        else{
           next()
        } 
           
    }
        
)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})