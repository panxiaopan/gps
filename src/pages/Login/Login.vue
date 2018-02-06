<template>
  <el-row class='loginConteiner'>
      <el-form>
          <el-form-item label='用户名'>
              <el-input v-model='LoginForm.userName'   ></el-input>
          </el-form-item>
          <el-form-item label='密码' >
              <el-input v-model='LoginForm.userPass' ></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click='submitForm' type="primary">登录</el-button>
          </el-form-item>
      </el-form>
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
          LoginForm: {
              userName: '',
              userPass: '',
              loginIp:''
          }
      }
  },
  methods: {
      submitForm () {
          let user = { name: this.LoginForm.userName }
        
      console.log(this.LoginForm)
       userLogin(qs.stringify(this.LoginForm)).then(res=>{
        console.log("登录")
             console.log(this.LoginForm)
             console.log(qs.stringify(this.LoginForm))
           if(res.State==1){
             sessionStorage.setItem('user', JSON.stringify(user));
              this.$router.push('/')
            }else{
               
            }
       })
/*          if(this.LoginForm.userName !== '') {
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$router.push('/')
          }*/
      }
  },
      mounted() {
      var _this = this;//代表上面的函数,点击.
      // 获取真实ip
      getIp((ip) => {
        /*console.log(ip);*/
        this.LoginForm.loginIp = ip;
      })

    }
}
</script>
<style lang="scss" scoped>

</style>


