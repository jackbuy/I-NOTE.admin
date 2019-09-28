import Vue from 'vue';
import Router from 'vue-router';
const Tag = () => import(/* webpackChunkName: "about" */ './views/Tag.vue');
const Login = () => import(/* webpackChunkName: "about" */ './views/Login.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'tag',
      component: Tag,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
