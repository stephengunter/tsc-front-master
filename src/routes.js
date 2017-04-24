
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
            path:'/register',
            component: require('./views/register.vue'),
            name: 'register',
            meta: { 'forVisitors':true },
        },
        {
            path:'/login',
            component: require('./views/login.vue'),
            name: 'login',
            meta: { 'forVisitors':true },
        },
        {
            path:'/feed',
            component: require('./views/feed.vue'),
            name: 'feed',
            meta: { 'forAuth':true },
           
        },

    ]


export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'

});