import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/pages/Login/Login'
import GraphPresentation from '@/pages/GraphPresentation'
import MapShow from '@/pages/MapShow'
import Homepage from '@/pages/Homepage'
import HistoricalData from '@/pages/HistoricalData'
import AlarmRecord from '@/pages/AlarmRecord'
import MapTrajectory from '@/pages/MapTrajectory'
import PersonalCenter from '@/pages/PersonalCenter'
import SystemManagement from '@/pages/SystemManagement'

Vue.use(Router)
export default new Router({
  routes: [
      {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: 'GraphPresentation', name: 'GraphPresentation', component: GraphPresentation },//图形展示
        { path: 'MapShow', name: 'MapShow', component: MapShow },//地图展示
        { path: 'Homepage', name: 'Homepage', component: Homepage },//首页
        { path: 'HistoricalData', name: 'HistoricalData', component: HistoricalData },//历史记录
        { path: 'AlarmRecord', name: 'AlarmRecord', component: AlarmRecord },//报警记录
        { path: 'MapTrajectory', name: 'MapTrajectory', component: MapTrajectory },//地图轨迹
        { path: 'SystemManagement', name: 'SystemManagement', component: SystemManagement },//系统管理
        { path: 'PersonalCenter', name: 'PersonalCenter', component: PersonalCenter },//个人中心
      ] 
    },

  ]
})
