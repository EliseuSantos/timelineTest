import Vue from 'vue'
import App from './App'
import router from './router'
import VueSimpleSVG from 'vue-simple-svg'

Vue.config.productionTip = false
Vue.use(VueSimpleSVG)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
