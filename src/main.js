import Vue from 'vue'
import App from './App.vue'
import VueLogger from 'vuejs-logger';
import router from './routes'

Vue.config.productionTip = false


const options = {
  isEnabled: true,
  logLevel : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : false,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
