
import VueRouter from 'vue-router'

Vue.use(VueRouter)
 
let routes = [        
        {
            path:'/',
            component: require('./views/home.vue'),
            name: 'home',
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
            component: require('./views/register.vue'),
            name: 'register',
            meta: { 'forVisitors':true },
        },
        {
            path:'/email-confirmation',
            component: require('./views/email-confirmation.vue'),
            name: 'email-confirmation',
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
            component: require('./views/user/profiles.vue'),
            name: 'profiles',
            meta: { 'forAuth':true },
           
        },
        {
            path:'/user/change-password',
            component: require('./views/user/change-password.vue'),
            name: 'change-password',
            meta: { 'forAuth':true },
           
        },
        {
            path:'/user/signups',
            component: require('./views/user/signups.vue'),
            name: 'signups',
            meta: { 'forAuth':true },
           
        },

    ]


export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'

});