import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 按需引入
import {
    Button, Input,
    Select, Option, OptionGroup,
    Table, TableColumn,
    Form, FormItem,
    Dialog,
    Loading,
    Message,
    MessageBox,
    Container,
    Header,
    Aside,
    Main,
} from 'element-ui';

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Loading.directive);

Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 };
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
        localStorage.clear();
        next();
    }
    const userData = localStorage.getItem('token');
    if ((!userData && to.path !== '/login')) {
        next({ path: '/login' });
    }
    next();
});

router.afterEach((transition) => {
    NProgress.done();
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
