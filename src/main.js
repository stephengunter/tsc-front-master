import './bootstrap'
import router from './routes'

import App from './App.vue'

router.beforeEach(
    (to, from, next)=>{

        let hasToken=Vue.auth.hasToken()
        if(to.matched.some(record=>record.meta.forVisitors)){

            if(hasToken){
                next({
                    path: '/',
                  
                })
            }else next()

        }else if(to.matched.some(record=>record.meta.forAuth)){

            if(!hasToken){
                next({
                    path: '/login',       
                    query:{ return:to.path}             
                })
            }else{
                let authenticated=Vue.auth.isAuthenticated()
                authenticated.then(() => {
                    next()
                }).catch(error => {
                    Vue.auth.logout()
                    next({
                        path: '/login',     
                        query:{ return:to.path}                     
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