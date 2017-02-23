
import VueRouter from 'vue-router'

Vue.use(VueRouter)
 
let routes = [        
        {
            path:'/',
            component: require('./views/home.vue'),
            name: 'home',
            //meta: { 'nav':false  },
        },
        {
            path:'/centers',
            component: require('./views/centers/index.vue'),
            name: 'centers',
            meta: { 'nav': false },
        },
        {
            path:'/courses',
            name: 'courses',
            component: require('./views/courses/index.vue'),
            meta: { 'nav':'centers' , 'subNav' : 'categories' },
        },
        {
            path:'/courses/center/:id',
            name: 'center-courses',
            component: require('./views/courses/index.vue'),
            meta: { 'nav':'centers' , 'subNav' : 'categories' },
        },
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
            //meta: { 'root':true },
        },
        {
            path:'/login',
            component: require('./views/login.vue'),
            name: 'login',
            //meta: { 'root':true },
        },

    ]


export default new VueRouter({
    routes,
    linkActiveClass: 'is-active'

});