import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import Form from './utilities/Form'
import Helper from './helper.js'

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.css'




import Auth from './packages/auth/Auth.js'

import Course from './scripts/course.js'
import Teacher from './scripts/teacher.js'

// require('font-awesome/css/font-awesome.css');
 //require('./assets/css/bulma.css')



Vue.use(VueRouter)
Vue.use(VueBlu)
Vue.use(Auth)

window.Vue = Vue;

window.Bus = new Vue({});

window.axios = axios;

// window.axios.defaults.headers.common = {   
//     'X-Requested-With': 'XMLHttpRequest' 
// };

window.axios.defaults.headers.common = {   
    'Authorization' : 'Bearer ' + Vue.auth.getToken() ,
    'X-Requested-With': 'XMLHttpRequest' 
};

window.Form = Form;

window.Helper = Helper

window.Course = Course
window.Teacher = Teacher
