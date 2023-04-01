import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";

//使用Element
Vue.use(ElementUI);
// Vue.prototype.$ws=new WebSocket("ws://localhost:8080")


Vue.config.productionTip = false

Vue.prototype.$axios = axios


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = 'http://127.0.0.1:8080';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const list = ["user/login", "/user/send_code"]
  // 在发送请求之前做些什么
  if (!list.includes(config.url)) {
    // config.headers=localStorage.getItem("token")
    console.log(localStorage.getItem("token"))
    // config.headers.token=localStorage.getItem("token")
    config.headers.token = `${localStorage.getItem("token")}`
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  // return Promise.reject(error);
});

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response;
//
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
