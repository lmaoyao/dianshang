import Vue from "vue"
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './routes'
const router = new VueRouter({
  routes
})
//挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path ==='/login'){
    return next()
  }
  let cookie = window.sessionStorage.getItem('name');
  if(!cookie){
    return next('/login')
  }
  next()
})
export default router