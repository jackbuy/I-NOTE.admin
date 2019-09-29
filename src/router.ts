import Vue from 'vue';
import Router from 'vue-router';
const Page403 = () => import(/* webpackChunkName: "403" */ './views/Page403.vue');
const Page404 = () => import(/* webpackChunkName: "404" */ './views/Page404.vue');
const Tag = () => import(/* webpackChunkName: "tag" */ './views/Tag.vue');
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');

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
        {
            path: '/404',
            name: 'Page404',
            component: Page404,
            meta: { title: '404' },
        },
        {
            path: '/403',
            name: 'Page403',
            component: Page403,
            meta: { title: '403' },
        },
        // 路由重定向404
        {
            path: '*',
            redirect: '/404',
        },
    ],
});
