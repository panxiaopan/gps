import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = "http://localhost:19412";
axios.defaults.baseURL = "/";
//登录
export const userLogin = (params) => { 
    return axios
        .post('/User/UserLogin', params)
        .then(res => res.data)
    };
//首页个人中心显示
   export const GetPersonalCenter = () => {
        return axios
           .get("/User/GetPersonalCenter")
           .then(res => res.data);
       };

   //首页下拉=登录名称显示
   export const GetUserManageComboBoxData = () => {
        return axios
           .get("/User/GetUserManageComboBoxData")
           .then(res => res.data);
       };
   //登录日志按条件查询接口
   export const GetUserLogSelect = (params) => { 
    return axios
        .post('/User/GetUserLogSelect', params)
        .then(res => res.data)
    };

    //用户修改密码接口
    export const  UpdateUserPass =(params)=>{
    	return axios
    	.post('/User/UpdateUserPass',params)
    	.then(res=>res.data)

    }
//新增子用户
    export const  InsertUser =(params)=>{
      return axios
      .post('/User/InsertUser',params)
      .then(res=>res.data)
    }
//删除用户接口
     export const  DeleteUserManage =(params)=>{
      return axios
      .post('/User/DeleteUserManage',params)
      .then(res=>res.data)
    }
//子用户查询条件
   export const  GetUserSelect =(params)=>{
      return axios
      .post('/User/GetUserSelect',params)
      .then(res=>res.data)
    }
  //用户,分区
  export const  GetUserManageTop1 =(params)=>{
      return axios
      .post('/User/GetUserManageTop1',params)
      .then(res=>res.data)
    }
 //分区的接口.总分区显示
    export const GetGroupData = () => {
        return axios
           .get("/SystemManage/GetGroupData")
           .then(res => res.data);
   };
  //页面登录编辑时候的接口
     export const LoginUpdateUser = (params) => { 
    return axios
        .post('User/UpdateUser', params)
        .then(res => res.data)
    };



    //分区编辑用户接口
   export const UpdateUser = (params) => { 
    return axios
        .post('User/UpdateUserManage', params)
        .then(res => res.data)
    };