import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Form from './utilities/Form';
// import Moment from 'moment'
// import MomentTimeZone from 'moment-timezone'



window.Vue = Vue;
Vue.use(VueRouter);

window.axios = axios;

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

window.Form = Form;

// window.Pager = Pager;

// window.Moment = Moment;

// window.MomentTimeZone = MomentTimeZone;

