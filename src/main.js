import './bootstrap'
import router from './routes'

import App from './App.vue'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})