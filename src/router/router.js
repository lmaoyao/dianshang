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
  let arr = window.sessionStorage.getItem('pathlist')
  let str = to.path;
  let num = arr.split(',').findIndex(item=>{
      return item == str; 
  });
  if(num==-1){
    window.alert("抱歉，您没有权限！！！")
    return next(false)
  }
  let cookie = window.sessionStorage.getItem('name');
  if(!cookie){
    return next('/login')
  }
  next()
})
export default router