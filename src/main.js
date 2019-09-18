// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store';
// import MeScroll from 'mescroll.js'
// import 'mescroll.js/mescroll.min.css'
import 'lib-flexible/flexible.js'

// Vue.use(MeScroll)
Vue.use(Vant);
// Vue.use(Dialog);
// Vue.use(PullRefresh);

Vue.config.productionTip = false
Vue.use(ElementUI);

import axios from 'axios'
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
