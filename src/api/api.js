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
    export const GetGroupData = (params) => {
        return axios
           .get("/SystemManage/GetGroupData",{params:params})
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
        //拉取微信信息接口
   export const GetUserWechatData= (params) => { 
    return axios
        .post('/User/GetUserWechatData',params)
        .then(res => res.data)
    };
    //系统管理分区编辑
   export const UpdateGroupManage= (params) => { 
    return axios
        .post('/SystemManage/UpdateGroupManage',params)
        .then(res => res.data)
    };
    //系统管理分区新增
  export const InsertGroupManage= (params) => { 
    return axios
        .post('/SystemManage/InsertGroupManage',params)
        .then(res => res.data)
    };
  //系统管理分区删除
  export const DeleteGroupManage= (params) => { 
    return axios
        .post('/SystemManage/DeleteGroupManage',params)
        .then(res => res.data)
    };
  //系统管理仪器数据
     export const GetInstrumentData = (params) => {
        return axios
           .get("/SystemManage/GetInstrumentData",{params:params})
           .then(res => res.data);
       };
  //删除仪器
  export const DeleteLoggerInfo= (params) => { 
    return axios
        .post('/SystemManage/DeleteLoggerInfo',params)
        .then(res => res.data)
    };
    //仪器类型数据接口
        export const GetLoggerInfoType = () => {
        return axios
           .get("/SystemManage/GetLoggerInfoType")
           .then(res => res.data);
   };
   //设备类型数据接口
      export const GetLoggerInfoWarehouseType = () => {
        return axios
           .get("/SystemManage/GetLoggerInfoWarehouseType")
           .then(res => res.data);
   };
   //仪器开关接口
 export const UpdateLoggerInfoState= (params) => { 
    return axios
        .get('/SystemManage/UpdateLoggerInfoState',{params:params})
        .then(res => res.data)
    };


   //新增仪器接口
    export const InsertLoggerInfo= (params) => { 
    return axios
        .post('/SystemManage/InsertLoggerInfo',params)
        .then(res => res.data)
    };
    //点击编辑的按钮发送设备ID,拿到对应的数据
 export const GetInstrumentDataTop1= (params) => { 
    return axios
        .get('/SystemManage/GetInstrumentDataTop1',{params:params})
        .then(res => res.data)
    };
    //仪器编辑修改参数
    export const UpdateLoggerInfo= (params) => { 
    return axios
        .post('/SystemManage/UpdateLoggerInfo',params)
        .then(res => res.data)
    };
    //实时地图展示左侧菜单数据请求接口
   export const GetMapShowsGroupLoggerInfoData= (params) => { 
    return axios
        .get('/RealTimeMonitoringManage/GetMapShowsGroupLoggerInfoData',{params:params})
        .then(res => res.data)
    };
    