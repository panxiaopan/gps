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
import './assets/css/index.scss' //公用css样式*/
import BaiduMap from 'vue-baidu-map'
import VCharts from 'v-charts'//折线图
// import 'babel-polyfill'//在package.json添加所需的依赖(非dev)babel-plugin-transform-xxx*/

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)//折线图
/* eslint-disable no-new */
Vue.use(BaiduMap, {//百度密钥
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'UiGHNfWON4wXTdWrou8Ada28mNnEPFcB&callback=initialize'
})
import VueI18n from 'vue-i18n'//中英文切换
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./components/lang/zh'),   // 中文语言包
      'en-US': require('./components/lang/en')    // 英文语言包
    }
})

router.beforeEach((to, from, next ) => {
  if(to.path == '/Login') {
     sessionStorage.removeItem('user')
     sessionStorage.removeItem('languagejudgment')
  }
  let user = JSON.stringify(sessionStorage.getItem('user'))
  console.log(user == 'null')
  if(user == 'null' && to.path != '/Login') {
    sessionStorage.removeItem('languagejudgment')
    next({path: '/Login'})
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  i18n,  // 不要忘记
  router,
  template: '<App/>',
  components: { App }
})
