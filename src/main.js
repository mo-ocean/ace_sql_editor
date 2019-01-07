// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ace from 'ace-builds'
import componentsInstall from './components/install'
import axios from 'axios'
import MAceEditor from 'vue-m-ace-editor'

Vue.use(MAceEditor) // 注册 m-ace-editor 组件
Vue.use(ace)
Vue.use(componentsInstall)
Vue.prototype.$http = axios;
// $http.get('/', function () {});
// $http.post('/', function () {});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
