 require('font-awesome/css/font-awesome.css');
 require('./assets/css/site.css')

 import Moment from 'moment'
 import MomentTimeZone from 'moment-timezone'


 import Vue from 'vue'
 import VueRouter from 'vue-router'
 import axios from 'axios'

 import VueBlu from 'vue-blu'
 import 'vue-blu/dist/css/vue-blu.min.css'



 import Auth from './packages/auth/Auth.js'


 Vue.use(VueRouter)
 Vue.use(VueBlu)
 Vue.use(Auth)






 import Form from './utilities/Form'
 import Config from './config.js'
 import Helper from './helper.js'




 //Vue.component('pager', require('./components/Pager') )







 import TimeService from './services/time.js'
 import CommonService from './services/common.js'

 import Menu from './models/menu.js'
 import Password from './models/password.js'
 import Course from './models/course.js'
 import CourseStatus from './models/course-status.js'
 import Teacher from './models/teacher.js'
 import Schedule from './models/schedule.js'
 import TeacherCourses from './models/teacher-courses.js'
 import User from './models/user.js'
 import Register from './models/register.js'
 import Signup from './models/signup.js'
 import Center from './models/center.js'
 import Category from './models/category.js'
 import Notice from './models/notice.js'
 import Photo from './models/photo.js'
 import Resume from './models/resume.js'




 window.Vue = Vue
 window.Config = Config
 window.Moment = Moment;
 window.MomentTimeZone = MomentTimeZone;

 window.Bus = new Vue({});

 window.axios = axios
 window.axios.defaults.headers.common = {
     'Authorization': 'Bearer ' + Vue.auth.getToken(),
     'X-Requested-With': 'XMLHttpRequest'
 }

 window.Form = Form
 window.Helper = Helper

 window.TimeService = TimeService
 window.CommonService = CommonService

 window.Menu = Menu
 window.Password = Password
 window.Course = Course
 window.CourseStatus = CourseStatus
 window.Teacher = Teacher
 window.Schedule = Schedule
 window.TeacherCourses = TeacherCourses
 window.User = User
 window.Register = Register
 window.Signup = Signup
 window.Center = Center
 window.Category = Category
 window.Notice = Notice
 window.Photo = Photo
 window.Resume = Resume


 Vue.filter('reviewedLabel', reviewed => {

     let style = 'tag is-danger'
     let text = '未審核'
     if (parseInt(reviewed)) {
         style = 'tag is-success'
         text = '已審核'
     }

     return `<span class="${style}" > ${text} </span>`
 })
 Vue.filter('activeLabel', active => {

     let style = 'tag is-danger'
     let text = '已下架'
     if (parseInt(active)) {
         style = 'tag is-success'
         text = '上架中'
     }

     return `<span class="${style}" > ${text} </span>`
 })