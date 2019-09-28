import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 按需引入
import {
    Button, Input,
    Select, Option, OptionGroup,
    Table, TableColumn,
    Form, FormItem,
} from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
