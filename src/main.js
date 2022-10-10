import Vue from 'vue'
import App from './views/HomePage.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.prototype.$feng = axios
axios.defaults.baseURL = 'http://localhost:6060'
Vue.use(axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
