import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import './style/theme/index.css'
//import './styles/index.scss' // global css
import Vant from 'vant'
import 'vant/lib/index.css'
import './utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
