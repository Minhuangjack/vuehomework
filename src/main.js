// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App'
import router from './router';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//rou
router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next)
  if (to.meta.requiresAuth) {
    // 去檢查是否有登入
    const api = `${process.env.APIPATH}/api/user/check`

    axios.post(api).then((resopnse) => {
      console.log(resopnse);
      console.log(resopnse.data);
      if (resopnse.data.success) {
        next();
      } else{
        next({
          path: '/login',
        });
      }
    })
  } else {
    // 不用檢查
    next();
  }

})