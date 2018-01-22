<template>
  
    <el-container>
        <el-header >
            <i class="logocion"></i> 
            <span class="">云平台</span>
            <i></i>
            <span class="userName">{{userName}}</span>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    background-color='#D3DCE6'
                    :default-active='$router.path'
                    text-color='#333'
                    router>
                 <el-menu-item index='/Homepage'>
                        首页
                    </el-menu-item>
                    <el-submenu index='1'>
                        <template slot='title'>
                            <span>实时监测</span>
                        </template>
                        <el-menu-item index='/GraphPresentation' >
                            图形展示
                        </el-menu-item>
                        <el-menu-item index='/MapShow' >
                            地图展示
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index='2'>
                        <template slot='title'>
                            <span>数据中心</span>
                        </template>
                        <el-menu-item index='/HistoricalData' >
                            历史记录
                        </el-menu-item>
                        <el-menu-item index='/AlarmRecord' >
                            报警记录
                        </el-menu-item>
                       <el-menu-item index='/MapTrajectory' >
                            地图轨迹
                        </el-menu-item>
                    </el-submenu>
                   <el-menu-item index='/SystemManagement'>
                        系统管理
                    </el-menu-item>
                     <el-menu-item index='/PersonalCenter'>
                        个人中心
                    </el-menu-item>
                </el-menu>
            </el-aside>
            
            <el-main>
                <router-view></router-view>
            </el-main>
            
        </el-container>
    </el-container>

</template>
<script>
export default {
    data () {
        return {
              userName:'',//登录时候显示的用户名称
          }
    },
    methods:{
         
    },
    mounted(){
          let user = JSON.parse(sessionStorage.getItem('user'));
          this.userName = user.name;
          console.log( this.userName)
    }
  
}
</script>
<style lang="scss" scoped>
.el-container {
    height: 100%;

    .el-main{
        padding: 0px;
       background: #eaedf1;
    }
    .el-header, .el-footer {
        background-color: #549cec;
        color: #333;
        text-align: center;
        line-height: 80px;
    }
    .el-aside {
        height: 100%;
        .el-menu {
            height: 100%;

        }
    }
}
</style>


