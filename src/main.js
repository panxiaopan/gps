// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import './components/changeTheme/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css'
/*import './assets/css/index.scss' //公用css样式*/
import BaiduMap from 'vue-baidu-map'
import VCharts from 'v-charts'//折线图
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)//折线图
/* eslint-disable no-new */
Vue.use(BaiduMap, {//百度密钥
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'UiGHNfWON4wXTdWrou8Ada28mNnEPFcB&callback=initialize'
})
router.beforeEach((to, from, next ) => {
  console.log(to)
  if(to.path == '/Login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.stringify(sessionStorage.getItem('user'))
  console.log(user == 'null')
  if(user == 'null' && to.path != '/Login') {
    next({path: '/Login'})
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
