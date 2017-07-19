
import VueRouter from 'vue-router'

Vue.use(VueRouter)
 
let routes = [        
        {
            path:'/',
            component: require('./views/home.vue'),
            name: 'home',
        },
        {
            path:'/notices',
            component: require('./views/notices/index.vue'),
            name: 'notices',
        },
        {
            path:'/notices/:id',
            name: 'notice-details',
            component: require('./views/notices/details.vue'),
        },
        {
            path:'/centers',
            component: require('./views/centers/index.vue'),
            name: 'centers',
        },
        {
            path:'/courses',
            name: 'courses',
            component: require('./views/courses/index.vue'),
            meta: { 'nav':'centers' , 'subNav' : 'categories' },
        },
        // {
        //     path:'/courses',
        //     name: 'center-courses',
        //     component: require('./views/courses/index.vue'),
        //     meta: { 'nav':'centers' , 'subNav' : 'categories' },
        // },
        {
            path:'/courses/:id',
            name: 'course-details',
            component: require('./views/courses/details.vue'),
            meta: { 'nav':'centers' , 'subNav' : 'categories' },
        },
        {
            path:'/signup/create',
            name: 'signup-create',
            component: require('./views/signup/create.vue'),
        },           
        {
            path:'/register',
            component: require('./views/registers/store.vue'),
            name: 'register',
            meta: { 'forVisitors':true },
        },
        {
            path:'/email-confirmation',
            component: require('./views/registers/email-confirmation.vue'),
            name: 'email-confirmation',
            meta: { 'forVisitors':true },
        },
        {
            path:'/register-unconfirmed',
            component: require('./views/registers/unconfirmed.vue'),
            name: 'register-unconfirmed',
            meta: { 'forVisitors':true },
        },
        {
            path:'/login',
            component: require('./views/login.vue'),
            name: 'login',
            meta: { 'forVisitors':true },
        },
        {
            path:'/user/profiles',
            component: require('./views/users/profiles.vue'),
            name: 'profiles',
            meta: { 'forAuth':true },
           
        },
        {
            path:'/user/change-password',
            component: require('./views/passwords/change.vue'),
            name: 'change-password',
            meta: { 'forAuth':true },
           
        },
        {
            path:'/forgot-password',
            component: require('./views/passwords/forgot.vue'),
            name: 'forgot-password',
            meta: { 'forVisitors':true },
           
        },
        {
            path:'/reset-password',
            component: require('./views/passwords/reset.vue'),
            name: 'reset-password',
            meta: { 'forVisitors':true },
        },
        {
            path:'/user/signups',
            component: require('./views/users/signups.vue'),
            name: 'signups',
            meta: { 'forAuth':true },
           
        },

    ]


export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'

});