import babelpolyfill from 'babel-polyfill';
import Cookies from 'js-cookie';
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
import store from './vuex/store';
import Vuex from 'vuex';
import routes from './routes';
import 'font-awesome/css/font-awesome.min.css';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {

  if (!Cookies.get('JSESSIONID')) {
    if (to.name === 'login') {
      next();
    } else {
      next({
        name: 'login'
      });
    }
  } else {
    next();
  }

});
router.beforeResolve((to, from, next) => {
  next();
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

