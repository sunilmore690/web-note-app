import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from 'element-ui/lib/locale/lang/en'
import './assets/theme.css' // Import our theme CSS

Vue.use(ElementUI,{locale});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
