import './bootstrap'
import router from './routes'

import App from './App.vue'

router.beforeEach(
    (to, from, next)=>{
        if(to.matched.some(record=>record.meta.forVisitors)){

            if(Vue.auth.hasToken()){
                next({
                    path: '/'
                })
            }else next()

        }else if(to.matched.some(record=>record.meta.forAuth)){

            if(!Vue.auth.hasToken()){
                next({
                    path: '/login'
                })
            }else next()

        }
        else next()
           
    }
        
)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})