import Vue from 'vue';
import Router from 'vue-router';
import Layout from '_c/layout/index.vue';
const Page403 = () => import(/* webpackChunkName: "403" */ './views/Page403.vue');
const Page404 = () => import(/* webpackChunkName: "404" */ './views/Page404.vue');
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue');
const Tag = () => import(/* webpackChunkName: "tag" */ './views/Tag.vue');
const User = () => import(/* webpackChunkName: "user" */ './views/User.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    redirect: '/home',
                },
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                    meta: { title: '首页' },
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: Tag,
                    meta: { title: '标签管理' },
                },
                {
                    path: '/user',
                    name: 'user',
                    component: User,
                    meta: { title: '用户管理' },
                },
            ],
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
