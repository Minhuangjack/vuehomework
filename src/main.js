// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
// import Veelidate from 'vee-validate';        // Vee-validate 2.X 使用方式
// import zhTWValidate from 'vee-validate/dist/locale/zh_TW'; // Vee-validate 2.X 使用方式

// Vee-validate 3.X 使用方式
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import { Validator } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';


import App from './App'
import router from './router';
import './bus';
import currencyFilter from './filters/currency';;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// Vee-validate 2.X 使用方式
// Vue.use(Veelidate);
// Veelidate.Validator.localize('zh_TW', zhTWValidate);

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', TW);

extend("required", {
  validate: value => ({ required: true, valid: !!value }), // the validation function
  message:  "此欄位為必填", // the error message
  computesRequired: true
});




Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

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