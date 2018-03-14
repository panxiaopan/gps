<template>
  <el-row class='loginConteiner'>
            <el-row>
               <div class="huatologin">
                   <i class="huatologo"></i>
                   <span class="huatoPPCLoud">华图云平台</span>
               </div>
            </el-row>
        <el-row class="loginConteinerminddle">
               <el-col :span="12" style="height: 100%;"  class="loginConteinerminddleleft">
                    <i class="huatostyleicon"></i>
                </el-col>
                  <el-col :span="12"  style="height: 100%;" class="loginConteinerminddleright">
                      <div class="loginform">
                        <div style="height: 80px; line-height: 80px; font-size:26px; color:#008ce5; text-align: center;font-weight: bold;">用户登录</div>
                         <el-form label-width="100px" :model='userLogin' :rules='loginRules' ref='loginForm'>
                            <el-form-item label='用户名:' prop='userName' :error='showError' >
                                <el-input v-model='userLogin.userName' @change='showError = null'></el-input>
                            </el-form-item>
                            <el-form-item label='密码:'  prop='userPass' :error='showError'>
                                <el-input type="password"  v-model='userLogin.userPass' @change='showError = null' @keyup.enter.native="submitForm()" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click='submitForm' type="primary" class="Register">登录</el-button>
                            </el-form-item>
                         </el-form>
                       </div>
                  </el-col>  
         </el-row>
           <el-row> 
            <div class="loginConteinerbuttom">CopyRight©2008-2016,深圳市华图测控系统有限公司,粤ICP备08032186号</div>
           </el-row>
  </el-row>
</template>
<script>
import { userLogin } from '@/api/api';
import axios from 'axios';
import qs from 'qs';
import {getIp} from '@/assets/js/getIp';

export default {
  data () {
      return {
          userLogin: {
              userName: '',
              userPass: '',
              loginIp: ''
          },
        loginRules: {
              userName: [
                { required: true, message: '请输入用户名', trigger: 'blur'}
              ],
              userPass: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
           },
            showError: null
      }
  },
  methods: {
      submitForm () {
         var _this = this;
         this.showError = null;
         let user = { name: this.userLogin.userName }
         this.$refs['loginForm'].validate((valid) =>{
                        console.log("打印IP")
                       console.log(this.userLogin)
                 if(valid){
                      userLogin(qs.stringify(this.userLogin)).then(res=>{
                     

                         if(res.State==1){
                           sessionStorage.setItem('user', JSON.stringify(user));
                            this.$router.push('/Homepage')
                          }else{
                              this.showError = '用户名或密码错误';
                              this.$refs['loginForm'].validateField('userName')  
                           }
                      })
                  }
            })      

        }
  },
      mounted() {
   
      // 获取真实ip
      getIp((ip) => {
         console.log("ip地址")
         console.log(ip);
         this.userLogin.loginIp = ip;
        })

      }
}
</script>
<style lang="scss" scoped>
        .loginConteiner{
          height: 100%;
          .huatologin{
             height: 100px;
             line-height: 100px;
             .huatologo{
                 display:inline-block; 
                 width: 186px;
                 height: 39px;
                 background: url(../../assets/img/icon.png) no-repeat  2px -1245px;
                 vertical-align: middle;
                 margin-left: 360px;
              }
              .huatoPPCLoud{
                display: inline-block;
                 border-left:4px solid #e8e8e8;
                 width: 200px;
                 height: 35px;
                 line-height:35px;
                 color:#008ce5;
                 font-size: 26px;
                 font-family: "Microsoft Yahei" !important;
                 padding-left: 10px;
                 vertical-align: middle;
              }
           }
            .loginConteinerminddle{
                 height: calc(100% - 200px);
                  background: url(../../assets/img/login_bg.png);
               .loginConteinerminddleleft{
                     display: flex;
                     align-items: center;
                     justify-content: flex-end;
                }
               .loginConteinerminddleright{
                     display: flex;
                     align-items: center;
                }
                .loginform{
                        height: 360px;
                        width: 480px;
                        border:1px solid #d7d7d7;
                        border-radius: 5px;
                        background: #fff;
                        margin-left: 75px;
                      .Register{
                          width: 320px;
                      }
                 }  
                 .huatostyleicon{
                   display: inline-block;
                   width: 400px;
                   height: 400px;
                   background: url(../../assets/img/login_pic.png);
                   margin-right: 75px;
                 }

            }
            .loginConteinerbuttom{
                height: 90px;
                 text-align: center;
                 line-height: 100px;
                 font-size: 14px;
                 color: #999999;
                 font-family: "Microsoft Yahei" !important;
            }

        }
</style>
 <style type="text/css">
      .loginform .el-input__inner{
        width: 320px;
      }

 </style>

