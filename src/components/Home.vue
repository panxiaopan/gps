<template>
  
    <el-container class="huatocontainer">
        <el-header class="huatologoheader">
            <i class="logocion" ></i> 
            <span class="PPCloud">云平台</span>

            <span class="loginusername">
                <i class="smallbell"></i>
                <span class="userName">{{userName}}</span>
                <el-button type="primary" size="mini"  style="font-size: 16px" @click='userLayout'>{{$t('m.Exit')}}</el-button>
                <el-button type="primary" size="mini" style="border:1px solid #fff;border-radius: 4px;font-size: 16px;"  @click="changeLangEvent()">
                       {{$t('m.language')}}
               </el-button>
           </span>
        </el-header>
        <el-container>
         <div style="height: 37px; position: absolute; width: 198px; border-right: 1px solid #d7d7d7">
             <i class="replicate" :class='{"openmenu":this.isCollapse==false,"closemenu":this.isCollapse==true}' @click="Clickfold"></i>
             </div> 
            <el-aside :width="Collapsing" >
                <el-menu
                    :collapse="isCollapse"
                    background-color='#f7f7f7'
                    text-color="#666666"
                    active-text-color="#fff"
                    :default-active='$route.path'
                    :unique-opened="true"
                     router>
                 <el-menu-item index='/Homepage'>
                   <i class="icon-el iconhome"></i>
                        <span>{{$t('m.Homepage')}}</span>
                  </el-menu-item>
                   <el-submenu index='1'>
                        <template slot='title'>
                             <i class="icon-el  RealTime"></i>
                            <span>{{$t('m.RealTimeMonitoring')}}</span>
                        </template>
                        <el-menu-item index='/GraphPresentation' >
                           <span class="fontpadding">{{$t('m.GraphResentation')}}</span>
                        </el-menu-item>
                        <el-menu-item index='/MapShow'>
                          <span class="fontpadding"> {{$t('m.MapShow')}} </span> 
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index='2'>
                        <template slot='title'>
                            <i class="icon-el  recordscenter"></i>
                            <span>{{$t('m.DataCentre')}}</span>
                        </template>
                        <el-menu-item index='/HistoricalData'>
                           <span class="fontpadding"> {{$t('m.HistoryMemory')}}</span>
                        </el-menu-item>
                        <el-menu-item index='/AlarmRecord'>
                           <span class="fontpadding">{{$t('m.AlarmRecord')}}</span>
                        </el-menu-item>
                       <el-menu-item index='/MapTrajectory' >
                           <span class="fontpadding">{{$t('m.LocusFree')}}</span>
                        </el-menu-item>
                    </el-submenu>
                   <el-menu-item index='/SystemManagement'>
                       <i class="icon-el systemmanagement"></i>
                        <span>{{$t('m.SystemManagement')}}</span>
                    </el-menu-item>
                     <el-menu-item index='/PersonalCenter'>
                        <i class="icon-el personalcenter"></i>
                        <span>{{$t('m.PersonalCenter')}}</span>
                    </el-menu-item>
                       <el-menu-item index='/Logaudit'>
                        <i class="icon-el ConLog"></i>
                        <span>{{$t('m.LOG')}}</span>
                      </el-menu-item> 
                </el-menu>
            </el-aside>
            
            <el-main>
                <router-view :changeLang='lang' ></router-view>
            </el-main>
            
        </el-container>
    </el-container>

</template>
<script>
export default {
    data () {
        return {
              lang:'',
              isCollapse:false,
              activeIndex:'0',
              userName:'',//登录时候显示的用户名称
              Collapsing: '200px',
           }
       },
    methods:{
              userLayout() { 
                  // 退出登录
                  this.$confirm( this.$t('m.Determinea') ,this.$t('m.Determineb') , {
                    confirmButtonText: this.$t('m.YES') ,
                    cancelButtonText: this.$t('m.NO'),
                    type: 'warning'
                  }).then(() => {
                    sessionStorage.removeItem('user');
                    this.$router.push('/Login');
                    location.reload()
                  }).catch(() => {
                    return false;
                   }) 
                },
              Clickfold(){
                    if(this.isCollapse){
                      this.isCollapse = false;
                       this.Collapsing=200+'px';
                       
                    }else{
                        this.isCollapse = true
                        this.Collapsing=60+'px';
                    }
              },
             /**
            * 切换语言 */ 
            changeLangEvent() {
             if ( this.lang === 'zh-CN' ) {
                  this.lang = 'en-US';
                  this.$i18n.locale = this.lang;
                }else {
                  this.lang = 'zh-CN';
                  this.$i18n.locale = this.lang;
                }
            },
          //刚进页面时候判断
    },
    mounted(){
            let user = JSON.parse(sessionStorage.getItem('user'));
            this.userName = user.name;
            let  languagejudgment = String(sessionStorage.getItem('languagejudgment'));
            this.lang=languagejudgment
            this.$i18n.locale = this.lang;       
    } 
}
</script>
<style lang="scss" scoped>
.huatocontainer {
    height: 100%;
    background-color:rgb(247,247,247);
     .huatologoheader{
       height: 66px !important;
          .PPCloud{
              font-size: 22px;
              color: #fff;
              font-family: "Microsoft YaHei" !important;
              font-weight:800;
          }
         .loginusername{
            display: inline-block; 
            height: 64px;
            width:280px;
            float:  right;
            .userName{
              display: inline-block;
               width: 100px;
               height: 24px;
               line-height: 24px;
               text-align: center;
               border-right:  1px solid #fff;
               font-size: 16px;
               font-family: "Microsoft YaHei" !important;
               color: #fff;
               overflow: hidden;
               vertical-align: middle;

            }
           .smallbell{
               display: inline-block;
               width:31px;
               height: 40px;
               vertical-align: middle;
               background: url(../assets/img/icon.png) no-repeat -10px -46px;
               }
         }
       }
    .el-main{
        padding: 0px;
        background: #eaedf1;
    }
    .el-header, .el-footer {
        background-color: #549cec;
        color: #333;
        line-height: 66px;
        height: 66px;
    }
    .el-aside {
        height: 100%;
        .el-menu {
            height: 100%;
        }
    }
   .icon-el{
       display: inline-block;
        width: 48px;
        height: 30px;
    }
   .logocion{
      display: inline-block;
      width: 144px;
      height:40px;
      vertical-align: middle;
      background: url(../assets/img/icon.png) no-repeat -12px -15px ;
   }
    .iconhome{
         background: url(../assets/img/icon.png) no-repeat -5px -108px ;
    }
    .RealTime{
         background: url(../assets/img/icon.png) no-repeat -5px -139px ;
    }
    .recordscenter{
        background: url(../assets/img/icon.png) no-repeat -5px -171px ;
    }
    .systemmanagement{
        background: url(../assets/img/icon.png) no-repeat -5px -202px ;
    }
    .personalcenter{
        background: url(../assets/img/icon.png) no-repeat -5px -237px ;
    }
    .ConLog{
      background: url(../assets/img/record.png)  no-repeat 15px 3px;
    }
     .is-active{
          background-color: #549cec  ! important;
       }
 
  .el-menu{
    .el-menu{
         .el-menu-item{
                    padding-left: 55px;
                 }
         }
      }
      .fontpadding{
        margin-left: 30px;
      }
      .el-aside{
      height: calc(100% - 160px);
           margin-top: 40px;
         .el-menu{
          height:calc(100% - 80px);
          

         } 
      }
      .replicate{
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 35px;
        background: url(../assets/img/icon.png) no-repeat 2px -75px ;
        cursor: pointer;
      }
    .openmenu{
      margin-left: 116px;

    }
   .closemenu{
      margin-left: 0px;
   }

}

</style>

