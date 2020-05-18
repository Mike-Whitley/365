import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Users from './Users.vue'
import Petitions from './Petitions.vue'
import axios from 'axios';
import VueAxios from "vue-axios";
import VueRouter from 'vue-router';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(VueAxios, axios)
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/users/:userId", //this is the URL
    name: "user", // this is the name we use to call it inside the function
    component: Users //this is the Vue file name
  },
  {
    path: "/users",
    name:'users', // this is the name when we say <router-link :to="{name: 'users'}">Back to Users</router-link> that we return to
    component: Users
  },
  {
    path: "/petitions",
    name:'petitions',
    component: Petitions
  },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
