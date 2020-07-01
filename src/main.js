import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Element from 'element-ui'
import "./assets/css/global.css"
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(Element);
import axios from "axios";
axios.defaults.baseURL="/api";
Vue.prototype.$http=axios;
Vue.filter('dateFormat',(originVal)=>{
  let dt = Date.parse(new Date(originVal));
  console.log(dt);
  const y = dt.getFullYear()
  const m = (dt.getMonth()+1+'').padStart(2,'0');
  const d = (dt.getDate()+'').padStart(2,'0');
  const hh = (dt.getHours()+"").padStart(2,"0");
  const mm = (dt.getMinutes()+"").padStart(2,"0");
  const ss = (dt.getSeconds()+"").padStart(2,"0");
  // console.log( `${y}-${m}-${d} ${hh}:${mm}:${ss}`);
  
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
