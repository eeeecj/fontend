import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import VueResource from "vue-resource";
import axios from "axios";
import animated from "animate.css";

window.Vue = Vue;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(animated);
Vue.http.options.root = "http://localhost:3000/";
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
//自定义按键修饰符
Vue.config.keyCodes.f2 = 113;


var vm=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
