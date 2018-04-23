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
  //实时数据图形展示
   export const GetGraphicPresentation = (params) => {
        return axios
           .get("/RealTimeMonitoringManage/GetGraphicPresentation",{params:params})
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
//地图轨迹设备下拉,
   export const GetMapShowsGroupLoggerInfoDatass= (params) => { 
    return axios
        .get('/DataCentreManage/GetMapShowsGroupLoggerInfoDatass',{params:params})
        .then(res => res.data)
    };
    //地图展示右侧数据请求接口
   export const GetMapShowsLoggerInfoData= (params) => { 
    return axios
        .get('/RealTimeMonitoringManage/GetMapShowsLoggerInfoData',{params:params})
        .then(res => res.data)
    };
    //报警记录分区联动查找
     export const GetGroupAndLogger = () => {
        return axios
           .get("/SystemManage/GetGroupAndLogger")
           .then(res => res.data);
       };
//报警分区联动加了一个全部
     export const GetGroupAndLoggerAlarm = () => {
        return axios
           .get("/SystemManage/GetGroupAndLoggerAlarm")
           .then(res => res.data);
       };
    //报警历史记录查询接口
   export const GetAlarmRecordData= (params) => { 
    return axios
        .get('/DataCentreManage/GetAlarmRecordData',{params:params})
        .then(res => res.data)
    };

    //报警处理数据接口
  export const UpdateAlarmState= (params) => { 
    return axios
        .post('/DataCentreManage/UpdateAlarmState',params)
        .then(res => res.data)
    }; 
  ///报警记录数据导出PDF
    export const ExportAlarmRecordDataPdf= (params) => { 
    return axios
        .post('/DataCentreManage/ExportAlarmRecordDataPdf',params)
        .then(res => res.data)
    }; 
////报警记录数据导出Execl
      export const ExportAlarmRecordDataExecl= (params) => { 
      return axios
        .post('/DataCentreManage/ExportAlarmRecordDataExecl',params)
        .then(res => res.data)
    }; 
  



 //地图轨迹数据导出
    export const ExportMapTrackDataPdf= (params) => { 
    return axios
        .post('/DataCentreManage/ExportMapTrackDataPdf',params)
        .then(res => res.data)
    }; 

    //地图轨迹数据接口
  export const GetMapTrackData= (params) => { 
    return axios
        .post('/DataCentreManage/GetMapTrackData',params)
        .then(res => res.data)
    };
   
  //历史数据接口
    export const GetHistoryData= (params) => { 
    return axios
        .get('/DataCentreManage/GetHistoryData',{params:params})
        .then(res => res.data)
    };
  //历史记录数据导出
  export const ExportHistoryDataPdf= (params) => { 
    return axios
        .post('/DataCentreManage/ExportHistoryDataPdf',params)
        .then(res => res.data)
    };
   //历史导出Exec.文件
  export const ExeclHistoryData= (params) => { 
    return axios
        .post('/DataCentreManage/ExeclHistoryData',params)
        .then(res => res.data)
    };

  //首页分区统计图
       export const GetGroupStatisticsData = () => {
        return axios
           .get("/HomePage/GetGroupStatisticsData")
           .then(res => res.data);
       };
 //首页分类数据统计图接口
       export const GetloggerInfoTypeStatisticsData = () => {
        return axios
           .get("/HomePage/GetloggerInfoTypeStatisticsData")
           .then(res => res.data);
       };
  //登录日志查询接口
   export const GetUserNameOplogData= (params) => { 
       return axios
        .get('/SystemManage/GetUserNameOplogData',{params:params})
        .then(res => res.data)
    }
 
