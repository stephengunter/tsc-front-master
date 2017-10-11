import Moment from 'moment'
import MomentTimeZone from 'moment-timezone'


import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';

import Form from './utilities/Form'
import Config from './config.js'
import Helper from './helper.js'

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.css'

//Vue.component('pager', require('./components/Pager') )


import Auth from './packages/auth/Auth.js'

import TimeService from './services/time.js'
import CommonService from './services/common.js'

import Password from './models/password.js'
import Course from './models/course.js'
import CourseStatus from './models/course-status.js'
import Teacher from './models/teacher.js'
import User from './models/user.js'
import Register from './models/register.js'
import Signup from './models/signup.js'
import Center from './models/center.js'
import Notice from './models/notice.js'
import Photo from './models/photo.js'
import Resume from './models/resume.js'

// require('font-awesome/css/font-awesome.css');
// require('./assets/css/bulma.css')

require('./assets/css/site.css')



Vue.use(VueRouter)
Vue.use(VueBlu)
Vue.use(Auth)

window.Vue = Vue
window.Config = Config
window.Moment = Moment;
window.MomentTimeZone = MomentTimeZone;

window.Bus = new Vue({});

window.axios = axios
window.axios.defaults.headers.common = {   
    'Authorization' : 'Bearer ' + Vue.auth.getToken() ,
    'X-Requested-With': 'XMLHttpRequest' 
}

window.Form = Form
window.Helper = Helper

window.TimeService = TimeService
window.CommonService = CommonService


window.Password=Password
window.Course = Course
window.CourseStatus = CourseStatus
window.Teacher = Teacher
window.User = User
window.Register=Register
window.Signup = Signup
window.Center=Center
window.Notice=Notice
window.Photo=Photo
window.Resume = Resume


Vue.filter('reviewedLabel', function (reviewed) {
    
     let style='tag is-danger'
     let text='未審核'
    if (parseInt(reviewed)){
        style = 'tag is-success'
        text='已審核'
    } 
   
    return `<span class="${style}" > ${text} </span>`
})
Vue.filter('activeLabel', function (active) {
    
     let style='tag is-danger'
     let text='已下架'
    if (parseInt(active)){
        style = 'tag is-success'
        text='上架中'
    } 
   
    return `<span class="${style}" > ${text} </span>`
})