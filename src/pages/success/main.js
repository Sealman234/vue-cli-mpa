import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';

import '@/assets/scss/helpers/reset.css';
import '@/assets/scss/payment-success.scss';

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
