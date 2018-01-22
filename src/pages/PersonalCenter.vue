<template>
 <el-row  class="Container PersonalCenter">
   <el-row>
      <el-col :span='24' class="CurrentPosition">
        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">个人中心</i></div> 
      </el-col>
   </el-row>
    <el-row class="PersonalMessage">
       <el-col :span="8">
		       	<div class="grid-content bg-purple ">
	                  <div class="Icon_height">
			       		  <i  class="huatoIcon"></i> 
	                  </div>
                     <el-form :label-position="labelPosition" status-icon label-width="80px" :rules='PersonnalRules' ref='personnalRule' :model="PersonalMessagelable" class="PersonalMessagelable">
						  <el-form-item label="公司:">
						       <el-input  v-model="PersonalMessagelable.CompanyName" class="borderNone" :readonly="true"></el-input>
						  </el-form-item>
						  <el-form-item label="用户名:">
						     <el-input  v-model="PersonalMessagelable.UserName" class="borderNone" :readonly="true"></el-input>
						  </el-form-item>
						  <el-form-item label="真实姓名:" prop="RealName">
						       <el-input v-model="PersonalMessagelable.RealName" :readonly="readtrue"></el-input>
						  </el-form-item>
 						  <el-form-item label="手机:" prop="CellPhone">
						       <el-input v-model="PersonalMessagelable.CellPhone" :readonly="readtrue"></el-input>
						  </el-form-item>
                            <el-form-item label="邮箱:" prop="Mailbox">
						       <el-input v-model="PersonalMessagelable.Mailbox" :readonly="readtrue"></el-input>
						  </el-form-item>
                          <el-form-item label="微信:" v-show="weixinshow">
						       <el-input v-model="PersonalMessagelable.Mailbox" :disabled="true"><i class="fa fa-check-circle-o" ></i></el-input>
						  </el-form-item>
						  <el-form-item label="报警类型:" v-show="alarmshow" class="AlarmI">
                                    <el-tooltip class='item' effect='light' content="暂无报警类型" v-show="DeviceSafety">
						        	    <i class="fa-chevron-down"></i>
                                    </el-tooltip>
						        	<el-tooltip class='item' effect='light' content="超限" v-show='Ultralimit'>
						        		<i class="Ultralimit"></i>
						        	</el-tooltip>
                                    <el-tooltip class='item' effect='light' content="掉线" v-show="LostConnection">
						        	    <i class="LostConnection"></i>
                                    </el-tooltip>
						  </el-form-item>
						  <el-form-item  v-show="EditSureshow">
						       <el-button type="primary" size="mini" @click="EditSubmission">确定</el-button><el-button  size="mini" @click="AbolishEdit">取消</el-button>
						  </el-form-item>

                    </el-form>
	                    <div class="Edit" v-show="EditHideshow">
	                    	<el-button type="primary" size="mini" @click="editMessage">编辑</el-button>
	                    	<el-button type="primary" size="mini" @click="PassDialogVisible = true">修改密码</el-button>
	                    	<el-button type="primary" size="mini">添加报警接受人</el-button>
	                    </div>
		       	</div>
       </el-col>
       <el-col :span="16">
	       	<div class="grid-content bg-purple">
	       	   <div class="NowLogin">最近登录</div>
			          <el-form :inline="true" :model="formInline" class="demo-form-inline  userfrom">
	                    <el-form-item label="用户名:">
						    <el-select v-model="formInline.selectvalue" placeholder="选择用户名">
	                             <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value"
							      >
							    </el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item label="时间段:">
						        <div class="block">
								    <el-date-picker
								          value-format="yyyy-MM-dd"
								          @change="logTimeInquire"
									      v-model="valueTime"
									      type="daterange"
									      range-separator="至"
									      start-placeholder="开始日期"
									      end-placeholder="结束日期">
								    </el-date-picker>
								</div>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="LoginInquire">查询</el-button>
						  </el-form-item>
			      </el-form>
			         <div class="blockTable">
	                	   <el-table
						    :data="tableDataList"
						    height="400"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="Username"
						      label="用户名"
						      width="180">
						    </el-table-column>
						    <el-table-column
						      label="用户角色"
						      width="180">
	                            <template slot-scope="scope">
	                                <span  v-if='tableDataList[scope.$index].UserRole==1' >管理员</span>
	                                <span  v-if='tableDataList[scope.$index].UserRole==2' >普通用户</span>
	                            </template>
						    </el-table-column>
						    <el-table-column
						      prop="IPaddress"
						      label="IP地址">
						    </el-table-column>
                        	 <el-table-column
						      prop="logTime"
						      label="登录时间">
						    </el-table-column>
					      </el-table>
                  </div>
	       </div>
	   </el-col>
     </el-row>
     <el-row :span="24">
     	  <div class=" bg-purple">
     	  	 <el-form :inline="true"  class="demo-form-inline  Submenufrom" >
	                    <el-form-item label="用户名:">
                             <el-input  placeholder="请输入内容" v-model="ChilderVal"></el-input>
						  </el-form-item>
						  <el-form-item label="时间段:">
						        <div class="block">
								    <el-date-picker
								          value-format="yyyy-MM-dd"
								           v-model="valueTimeSub"
								          @change="SuberUserInquireval"
									      type="daterange"
									      range-separator="至"
									      start-placeholder="开始日期"
									      end-placeholder="结束日期">
								    </el-date-picker>
								</div>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="SubUserInquire">查询</el-button>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="UserCreation" >创建用户</el-button>
						  </el-form-item>
			      </el-form>
                  	 <div class="blockTable">
	                	   <el-table
						    :data="SubUserDataList"
						    height="150"
						    border
						    style="width: 100%">
						    <el-table-column
						      prop="Username"
						      label="用户名"
						      width="180">
						    </el-table-column>
						    <el-table-column
						      label="用户角色"
						      width="180">
	                            <template slot-scope="scope">
	                                <span  v-if='SubUserDataList[scope.$index].UserLevel==1' >管理员</span>
	                                <span  v-if='SubUserDataList[scope.$index].UserLevel==2' >普通用户</span>
	                            </template>
						    </el-table-column>
						    <el-table-column
						      prop="Ucompany"
						      label="公司名称">
						    </el-table-column>
                        	 <el-table-column
						      prop="UrecordDate"
						      label="申请日期">
						    </el-table-column>
                          	 <el-table-column
						      prop="Uvalidity"
						      label="有效期">
						    </el-table-column>
                            <el-table-column
						      prop="AlarmType"
						      label="报警类型">
                             <template slot-scope="scope">
                                   <span v-if='SubUserDataList[scope.$index].AlarmType==1'>
							        	<el-tooltip class='item' effect='light' content="超限" >
							        		<i class="Ultralimit"></i>
							        	</el-tooltip>
                                    </span>
                                    <span v-if='SubUserDataList[scope.$index].AlarmType==2'>
	                                    <el-tooltip class='item' effect='light' content="掉线"  >
							        	    <i class="LostConnection"></i>
	                                    </el-tooltip>
                                    </span>
                                    <span v-if='SubUserDataList[scope.$index].AlarmType==3' >
                                    	<el-tooltip class='item' effect='light' content="超限" >
							        		<i class="Ultralimit"></i>
							        	</el-tooltip>
							         <el-tooltip class='item' effect='light' content="掉线"  >
							        	    <i class="LostConnection"></i>
	                                   </el-tooltip>
                                    </span>
                              </template> 
						    </el-table-column>
                            <el-table-column
                              prop="Uvalidity"
                              width='150'
						      label="操作">
						       <template slot-scope="scope">
						      	  <i class="fa fa-edit fa-2x" @click="EditorUser(scope.$index)" ></i>
						      	  <i class="fa fa-trash-o fa-2x" @click="DelectUser(scope.$index)" ></i>
						      </template>
						    </el-table-column>
					      </el-table>
                  </div>
			   </div>
     </el-row>
      <el-dialog
		  title="修改密码"
		  :visible.sync="PassDialogVisible"
		  width="25%"
		  @close='closeUpdatePass'
		  center>
		     <el-form 
		       :model="PasswordForm" status-icon 
		        label-width="100px"  
		        ref="passwordRules" 
		        :rules="passwordRule" 
	         class="demo-ruleForm" >
		         <el-form-item label="原始密码:" prop="Oldpassword" >
				     <el-input type="password" v-model="PasswordForm.Oldpassword"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" prop="Newpass">
				     <el-input type="password" v-model="PasswordForm.Newpass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认新密码" prop="ConfirmPass">
				     <el-input type="password" v-model="PasswordForm.ConfirmPass" auto-complete="off"></el-input>
				  </el-form-item> 
		     </el-form>
		      <span slot="footer" class="dialog-footer">
                      <el-button @click="PassDialogVisible = false" size="small" >取 消</el-button>
				      <el-button type="primary" @click="PassWordSend" size='small'>确 定</el-button>
		       </span>
		</el-dialog>
        <el-dialog
			  title="创建用户"
			  :visible.sync="CreateDialogVisible"
			  width="30%"
			  @close='closeCreate'
			  center>
			<el-form :model="CreateruleForm" status-icon  :rules="CreateRules" ref="CreateRule" label-width="100px" class="demo-ruleForm" >
					  <el-form-item label="用户名:" prop="UserName">
					        <el-input  v-model="CreateruleForm.UserName"></el-input>
					  </el-form-item>
					  <el-form-item label="真实姓名" prop="UserTrueName">
					         <el-input  v-model="CreateruleForm.UserTrueName" ></el-input>
					  </el-form-item>
					  <el-form-item label="密码"  prop="UserPassword">
					         <el-input type="password" v-model="CreateruleForm.UserPassword"></el-input>
					  </el-form-item>
					  <el-form-item label="确认密码"  prop="ConfirmUserPassword">
					         <el-input type="password"  v-model="CreateruleForm.ConfirmUserPassword" ></el-input>
					  </el-form-item>
					  <el-form-item label="联系电话" prop="UserPhone">
					         <el-input  v-model="CreateruleForm.UserPhone" ></el-input>
					  </el-form-item>
					   <el-form-item label="邮箱" prop="UserEmail">
					         <el-input v-model="CreateruleForm.UserEmail"></el-input>
					  </el-form-item>
					   <el-form-item label="报警类型">
					        <el-checkbox-group v-model="CheckList" @change="handleCheckedCitiesChange">
								    <el-checkbox label="1"> 
	                                  	<el-tooltip class='item' effect='light' content="超限" >
								        		<i class="Ultralimit"></i>
								        </el-tooltip>
								    </el-checkbox>
								    <el-checkbox label="2">
								    	   <el-tooltip class='item' effect='light' content="掉线"  >
								        	    <i class="LostConnection"></i>
		                                   </el-tooltip>
								    </el-checkbox>
							 </el-checkbox-group>
					  </el-form-item>
			  </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="CreateDialogVisible = false" size="small">取 消</el-button>
			    <el-button type="primary" @click="CreateSend" size="small">确 定</el-button>
			  </span>
		</el-dialog>
         <el-dialog
              class="EditDialogcent"
			  title="用户编辑"
			  :visible.sync="EditDialog"
			  width="30%"
			  center>
			  <el-col :span="8">
			    	<div class="PartitionLight Partition  ">
			  	          <el-checkbox-group  v-model="checkedPartion"  @change='checkPositionval'>
	                            <el-checkbox  v-for='item in PositionList' :key='item.Id' :label="item.Id">{{item.GroupName}}</el-checkbox >
						  </el-checkbox-group> 
				    </div>
			 </el-col>
             <el-col :span="16">
			   <div class="PartitionRight Partition" >
                  <el-form :model="EditPartition"  label-width="80px" class=" demo-dynamic" :rules="EditPartitionRules">
					  <el-form-item  label="真实姓名:"  prop="UserTrueName" >
					    <el-input v-model="EditPartition.UserTrueName"></el-input>
					  </el-form-item>
                      <el-form-item  label="密码:"  prop="UserPassword">
					    <el-input v-model="EditPartition.UserPassword"></el-input>
					  </el-form-item >
                       <el-form-item label="手机:"  prop="UserPhone">
					    <el-input v-model="EditPartition.UserPhone"></el-input>
					  </el-form-item>
                       <el-form-item label="邮箱:"  prop="UserEmail">
					    <el-input v-model="EditPartition.UserEmail"></el-input>
					   </el-form-item>
                      <el-form-item label="有效期:" prop="Uvalidity" >
					        <el-date-picker
						      v-model="EditPartition.Uvalidity"
						      type="date"
						      placeholder="选择日期"
						      value-format="yyyy-MM-dd">
						    </el-date-picker>
					  </el-form-item>
					   <el-form-item label="报警类型:">
					        <el-checkbox-group v-model="SuberUserCheckList" @change="EdithandChange">
								    <el-checkbox label="1"> 
	                                  	<el-tooltip class='item' effect='light' content="超限" >
								        		<i class="Ultralimit"></i>
								        </el-tooltip>
								    </el-checkbox>
								    <el-checkbox label="2">
								    	   <el-tooltip class='item' effect='light' content="掉线"  >
								        	    <i class="LostConnection"></i>
		                                   </el-tooltip>
								    </el-checkbox>
							 </el-checkbox-group>
					  </el-form-item>

                 </el-form>
                  
               </div>
			 </el-col>
              <span slot="footer" class="dialog-footer">
			    <el-button @click="EditDialog = false" size='mini'>取 消</el-button>
			    <el-button type="primary" size="mini" @click="EditSubSend">确 定</el-button>
			 </span>
		</el-dialog>
  </el-row>
</template>
<script>
import qs from 'qs';
 import{ GetPersonalCenter,GetUserManageComboBoxData,GetUserLogSelect,UpdateUser,LoginUpdateUser,UpdateUserPass,InsertUser,DeleteUserManage,GetUserSelect,GetUserManageTop1,GetGroupData}from '@/api/api';
export default {
      data(){
               //  表单验证规则---自定义的
    var checkName = (rule, value, callback) => {
	      if(value === '') {
	        callback(new Error('请输入真实姓名'));
	      }
	      callback();
	    };
	 var checkPhone = (rule, value, callback) => {
	      if(value !== '' && !(/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/).test(value)) {
	        callback(new Error('请输入正确的联系电话'));
	      } else if (value == '') {
	        callback(new Error('请输入联系电话'));
	      }
	      callback();
	    }; 
	var checkMailbox =(rule,value,callback)=>{
		 if(value !== '' && !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(value)) {
	        callback(new Error('请输入正确的邮箱'));
	      } else if (value == '') {
	        callback(new Error('请输入邮箱'));
	      }
	      callback();
	} 
        //密码验证规则
     var checkOldpassword =(rule,value,callback)=>{
       	 if(value === '') {
		        callback(new Error('请输入原始密码'));
		      }
	  	      callback();
       }
      var checkNewpassword = (rule,value,callback)=>{
           if(value === ''){
           	  callback(new Error('请输入新密码'));
           }
          callback(); 
      }
     var checkConfirmPass=(rule,value,callback)=>{
	      if(value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.PasswordForm.Newpass) {
	          callback(new Error('两次输入密码不一致!'));
	        } 
	       callback();   
     }
    //验证新建用户名规则
     var   checkUserName=(rule,value,callback)=>{
     	   if(value===''){
     	   	 callback(new Error('请输入创建用户名'))
     	   }
     	   callback(); 
     }
      var  checkUserpassword=(rule,value,callback)=>{
      	  if (value==='') {
      	  	 callback(new Error('请输入创建密码'))
      	  }
      	  callback(); 
      }
      var  checkConfirmPass=(rule,value,callback)=>{
	      if(value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.CreateruleForm.UserPassword) {
	          callback(new Error('两次输入密码不一致!'));
	        } 
	       callback();   
      }
        //用户编辑的日期验证.
      var checkData=(rule,value,callback)=>{
      	   if(value===''){
     	   	 callback(new Error('请输入有效日期'))
     	   }
     	   callback(); 
      }


     return{
     	     //发送子分区选中的值
     	     ListGroup:[],
            //子用户编辑时候选中的分区,
              EditZone:[],
     	     //子用户编辑的报警状态
     	     EditSub:[],
            //用户编辑的时候选择
            SuberUserCheckList:[],
     	   //编辑时候子用户
     	   EditPartition:{
                 UserTrueName:'',
                 UserPassword:'',
                 UserPhone:'',
                 UserEmail:'',
                 Uvalidity:''      
     	    },
         //编辑的表格验证
           EditPartitionRules:{
               UserTrueName:[
		          { validator: checkName, trigger: 'blur' }
		        ],
            UserPassword:[
		          { validator: checkUserpassword, trigger: 'blur' }
		        ],
		    UserPhone:[
		          { validator: checkPhone, trigger: 'blur' }
		        ],
			 UserEmail:[
			          { validator: checkMailbox, trigger: 'blur' }
			        ],
			 Uvalidity:[
			          { validator: checkData, trigger: 'blur' }
			        ],
           },
          //选中的值
          checkedPartion:[],
           //城市列表
           PositionList:[],
     	   //编辑的时候弹框
     	   EditDialog:false,
     	  //子用户查询输入的值
     	  ChilderVal:'',
     	  //子用户查询
          SuberUser:[],
            //登录的时候查询
          LoginInquireval:[],
      	 	//复选框
      	  CheckList:[],
            //创建用户
           CreateruleForm:{
                UserName:'',
                UserTrueName:'',
                UserPassword:'',
                UgroupGuid:'',
                UserEmail:'',
                UserPhone:'',
                AlarmType:''
            }, 
        CreateRules:{
              UserName:[
		          { validator: checkUserName, trigger: 'blur' }
		        ], 
               UserTrueName:[
		          { validator: checkName, trigger: 'blur' }
		        ],
            UserPassword:[
		          { validator: checkUserpassword, trigger: 'blur' }
		        ],
            UserPhone:[
		          { validator: checkPhone, trigger: 'blur' }
		        ],
            UserEmail:[
		          { validator: checkMailbox, trigger: 'blur' }
		        ],  
           ConfirmUserPassword:[
               { validator: checkConfirmPass, trigger: 'blur' }   
           ], 
   
        },
         passwordRule:{
              Oldpassword:[
		          { validator: checkOldpassword, trigger: 'blur' }
		        ],
               Newpass:[
		          { validator: checkNewpassword, trigger: 'blur' }
		        ],
		       ConfirmPass:[
		          { validator: checkConfirmPass, trigger: 'blur' }
		        ],
           },
           PasswordForm:{//修改密码
              Oldpassword:'',
              Newpass:'',
              ConfirmPass:''
           },
           CreateDialogVisible:false,//创建用户
      	  	PassDialogVisible:false,//密码弹框
            PersonnalRules: {   //输入框验证规则
			        RealName:[
			          { validator: checkName, trigger: 'blur' }
			        ],
			        CellPhone: [
			          { validator: checkPhone, trigger: 'blur' }
			        ],
			       Mailbox: [
			          { validator: checkMailbox, trigger: 'blur' }
			        ],
			      }, 
      	   	Id:'',
      	   	UgroupGuid:'',//管理员用户UserGuid
      	   	Checkedarml:[],
      	   	DeviceSafety:false,
      	   	LostConnection:false,//掉线
      	   	Ultralimit:false,//超限
      	   	readtrue:true,//只读
      	   	EditHideshow:true,//点击编辑,隐藏添加的的按钮
            EditSureshow:false,//编辑去确定的按钮
      	    alarmshow:true,//报警类型
      	    weixinshow:false,//微信显示的
      	   	 tableDataList:[],
      	   	 SubUserDataList:[],//子用户
      	     valueTime:'',
      	     valueTimeSub:'',
      	     options:[], 
	           formInline: {
		           selectvalue:'' 
		        },
              labelPosition:"right", 
              PersonalMessagelable: {
                CompanyName:'',//公司名称
		          UserName: '',
		          RealName: '',
		          CellPhone: '',
		          Mailbox:''
		        }
      	   }
      },
      methods:{
          Gutuser(){
          	 GetPersonalCenter().then(res=>{
                   console.log(res)
                   this.Id=res.Data[0].Id//编辑的时候要穿ID
                   this.UgroupGuid=res.Data[0].UserGuid//创建用的时候要传
                  this.tableDataList=[]//调用前清空.
                  this.SubUserDataList=[]
                  switch(res.Data[0].AlarmType){//判断有没有出问题,报警类型
                     case'0':
                    	this.DeviceSafety=true;
                     case'1':
                         this.Ultralimit=true;
                         break;
                     case'2':
                         this.LostConnection=true;
                         break;                        
                  	 case '3':
	                     this.Ultralimit=true;
	                     this.LostConnection=true;
                      break;
                     default:
                  }
          	 	  this.PersonalMessagelable={
		          	 	  	CompanyName:res.Data[0].Ucompany,
		                    UserName:res.Data[0].UserName,
		                    RealName:res.Data[0].UserTrueName,
		                    CellPhone:res.Data[0].UserPhone,
		                    Mailbox:res.Data[0].UserEmail
          	 	    }
                   for(let item of res.Data[0].ListLog){
                   	   this.tableDataList.push({
                   	   	    Username:item.UserName,
                   	   	    IPaddress:item.UserLoginIp,
                   	   	    UserRole:item.UserLevel,
                   	   	    logTime:item.UserLoginTime
                   	   })
                   }
                
                if(res.Data[0].UserLevel==1){//判断是管理员登录的时候显示
                  for(let item of res.Data[0].ListUser){//子用户
                     this.SubUserDataList.push({
                            Username:item.UserName,
                            UserLevel:item.UserLevel,
                            Ucompany:item.Ucompany,
                            UrecordDate:item.UrecordDate,
                            Uvalidity:item.Uvalidity,
                            AlarmType:item.AlarmType,
                            Id:item.Id
                         }) 
                    }

                  }

          	  }) 
          },
          SelectTable(){
          	   GetUserManageComboBoxData().then(res=>{
                      let options=[]
                      options=this.options
                      if(res.Data!==0){
                          for(let i=0;i<res.Data.length;i++){
                          	options.push({
                          		value:res.Data[i].UserName,
                          		label:res.Data[i].UserName
                          	 })
                          }
                       }else{
                       	 //没有下拉时候,显示无数据.
                       }
          	     })
          },
	      editMessage(){//打开编辑
	         	     this.readtrue=false;//打开可编辑
	                 this.EditHideshow=false;
	                 this.alarmshow=false;
	                 this.weixinshow=true;
	                 this.EditSureshow=true;
	         	     console.log("编辑")
	         },
	       AbolishEdit(){//编辑取消
	                 this.readtrue=true;//打开可编辑
	                 this.EditHideshow=true;
	                 this.alarmshow=true;
	                 this.weixinshow=false;
	                 this.EditSureshow=false; 
	       },
	      EditSubmission(){//编辑提交登录时候用户的编辑
	      	let user={};
	      	    user={
	                Id:this.Id,
	                UserEmail:this.PersonalMessagelable.Mailbox,
	                UserTrueName: this.PersonalMessagelable.RealName,
	                UserPhone:this.PersonalMessagelable.CellPhone
	      	    }
		      this.$refs['personnalRule'].validate((valid) => {
		        if(valid){
		          LoginUpdateUser(user).then(res=>{
		                   if(res.State==1){
		                        this.$message({
		                           type:'success',
		                           message:'编辑成功'
		                          }) 
				                 this.readtrue=true;//打开可编辑
				                 this.EditHideshow=true;
				                 this.alarmshow=true;
				                 this.weixinshow=false;
				                 this.EditSureshow=false;  
				                 
		                        }else{
		                        this.$message({
		                           type:'error',
		                           message:'编辑失败'
		                          })
		                        }
			              })  
				       }
				     })
		      },  
		   DelectUser(index){
                 var params={
                 	  userCode:this.SubUserDataList[index].Id
                 }
		     this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
             DeleteUserManage(qs.stringify(params)).then(res=>{
                          if(res.State==1){
                          	        this.$message({
						            type: 'success',
						            message: '删除成功!'
						          });
                              }
                              this.Gutuser()//调用函数刷新列表
                         })
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
		   },
	       PassWordSend(){//修改密码发送
		   	    var params = {
		   	    	  originalPass:this.PasswordForm.Oldpassword,
		   	    	  userPass:this.PasswordForm.ConfirmPass
		   	    } 
	       this.$refs['passwordRules'].validate((valid)=>{
	       	  if(valid){
	              UpdateUserPass(qs.stringify(params)).then(res=>{
	                        if (res.State==1) {
	                        	this.$message({
	                        		type:'success',
	                        		message:'修改成功,请重新登录!'
	                        	})
	                        this.PassDialogVisible=false;//密码弹框关闭
							this.$router.push('/Login');//登录页面
	                        }else{
	                        	this.$message({
	                        		type:'error',
	                        		message:'修改失败'
	                        	})
	                        }
	       	         })
	       	     }
	         })
	     },
	     closeUpdatePass (){
	     	 this.PasswordForm={//修改密码
	              Oldpassword:'',
	              Newpass:'',
	              ConfirmPass:''
	           }
	      		this.$refs['passwordRules'].resetFields();
	      	}, 
         UserCreation(){//创建用户
         	this.CreateDialogVisible=true;   
         },
         handleCheckedCitiesChange(val){//选中时候调用函数
               this.Checkedarml=val
              console.log(this.Checkedarml);
	               switch(Number(this.Checkedarml[0])){
	               	case 1:
	               		this.CreateruleForm.AlarmType=1;
	               		break;
	               	case 2:
	               	    this.CreateruleForm.AlarmType=2;
	               }
	               if (this.Checkedarml.length == 2) {
	               	   this.CreateruleForm.AlarmType=3;
	               }else if(this.Checkedarml.length==0){
                      this.CreateruleForm.AlarmType=0;
	               }
         },
	       CreateSend(){
	            let user={};
	               user={
	               	  UserName:this.CreateruleForm.UserName,
	               	  UserTrueName:this.CreateruleForm.UserTrueName,
	               	  UserPassword:this.CreateruleForm.UserPassword,
	               	  UserPhone:this.CreateruleForm.UserPhone,
	               	  UgroupGuid:this.UgroupGuid,
	               	  UserEmail:this.CreateruleForm.UserEmail,
	               	  AlarmType:this.CreateruleForm.AlarmType
	               }
	            // const a = this.prototype
	         this.$refs['CreateRule'].validate((valid)=>{
	         	 if(valid){
	          InsertUser(user).then(res=>{
	                     if(res.State==1){
	                     	this.$message({
	                     		type:'success',
	                     		message:'创建成功'
	                     	})
	                    this.CreateDialogVisible=false;
	                     this.$refs['CreateRule'].resetFields();
	                     	}else{
	                     		this.$message({
	                     			type:'error',
	                     			message:'创建失败'
	                     		})
	                     }
	              })
	           }
	         })  
	       },
	       closeCreate(){
	             this.CreateruleForm={
		                UserName:'',
		                UserTrueName:'',
		                UserPassword:'',
		                UgroupGuid:'',
		                UserEmail:'',
		                UserPhone:'',
		                AlarmType:''
	                }
	               this.CheckList=[] 
	               this.$refs['CreateRule'].resetFields();
	            }, 
          logTimeInquire(val){//登录时候查询的
          	 if (val==null) {
                  this.LoginInquireval[0]=undefined;
                  this.LoginInquireval[1]=undefined;
          	 }else{
               this.LoginInquireval=val;
               }
          },
         LoginInquire(){//登录时候查询的
          	var parms={
                  condition:this.formInline.selectvalue,
                  staDate:this.LoginInquireval[0],
                  endDate:this.LoginInquireval[1]
          	   }
         	GetUserLogSelect(qs.stringify(parms)).then(res=>{
               if(res.State==1){
               	 this.tableDataList=[];
                 for(let item of res.Data){
                   	   this.tableDataList.push({
                   	   	    Username:item.UserName,
                   	   	    IPaddress:item.UserLoginIp,
                   	   	    UserRole:item.UserLevel,
                   	   	    logTime:item.UserLoginTime
                   	   })
                     }
              
                   }else if(res.State==0){
                     this.tableDataList=[];
                   }  
         	})
          },
          SuberUserInquireval(val){//子用户查询时间的值
           if (val==null) {
                 this.SuberUser[0]=undefined;//删除时间的时候,赋空值过去
                 this.SuberUser[1]=undefined;
          	 }else{
                  this.SuberUser=val;
               }
           },
        SubUserInquire(){
        	var parms={
        		 condition:this.ChilderVal,
				 staDate:this.SuberUser[0],
				 endDate: this.SuberUser[1]
        	}
           GetUserSelect(qs.stringify(parms)).then(res=>{ 
           	console.log(res)
                      if(res.TotalNumber==0){
                          this.SubUserDataList=[]//如果一条数据都没有,清空   
                      }else {
                   for(let item of res.Data){//子用户
                       this.SubUserDataList=[]//如果一条数据都没有,清空  
                     this.SubUserDataList.push({
                            Username:item.UserName,
                            UserLevel:item.UserLevel,
                            Ucompany:item.Ucompany,
                            UrecordDate:item.UrecordDate,
                            Uvalidity:item.Uvalidity,
                            AlarmType:item.AlarmType,
                            Id:item.Id
                       }) 
                    }
                 }
           })    
        },
        PartitionRequest(){//用户分区列表显示
        	GetGroupData().then(res=>{
        		 if(res.State==1){
	        		 this.PositionList=res.Data;
	        		 }
        	})
        },
        EditorUser(index){//编辑穿值显示到页面,
               this.EditDialog=true;
            var parms={
            	  userName:this.SubUserDataList[index].Username
                    }
	             GetUserManageTop1(qs.stringify(parms)).then(res=>{
	             	console.log(res)
	             	this.checkedPartion=[];//清空选中
	             	this.SuberUserCheckList=[]//右边的报警状态
                   for(var i=0;  i<res.Data.ListGroup.length;i++){
                         this.checkedPartion.push(
                                res.Data.ListGroup[i].Id
                         	)
                   } 
                  switch(res.Data.AlarmType){//报警时候的选中显示,
                     case'1':
                     	this.SuberUserCheckList=['1'] 
                     	break;
                     case'2':
                     	this.SuberUserCheckList=['2'] 
                     	break;
                     case'3':
                        this.SuberUserCheckList=['1','2']
                        break;
                     }
                     this.EditPartition={
                          	  UserTrueName:res.Data.UserTrueName,
                          	  UserPassword:res.Data.UserPassword,
                          	  UserPhone:res.Data.UserPhone,
                          	  UserEmail:res.Data.UserEmail,
                          	  Uvalidity:res.Data.Uvalidity,
                          	  Id:res.Data.Id,//点击的时候,把ID拿过来
                          	  AlarmType:res.Data.AlarmType
                          }

	             })
            },
         checkPositionval(val){//分区选中的值.
            	 this.EditZone=val;
            	  this.ListGroup=[];
            	for(var i=0; i<this.EditZone.length;i++){
            		  this.ListGroup.push({
            		  	Id:Number(this.EditZone[i])
            		  })
            	}
            },
          EdithandChange(val){//编辑的时候
          	  this.EditSub=val
             if( this.EditSub.length==0){//不选的时候传值为0;
             	this.EditPartition.AlarmType=0;
             }
              switch(Number(this.EditSub[0])){
	               	case 1:
	               		this.EditPartition.AlarmType=1;
	               		break;
	               	case 2:
	               	    this.EditPartition.AlarmType=2;
	               }
	               if (this.EditSub.length == 2) {
	               	 this.EditPartition.AlarmType=3;
	               }
            },
          EditSubSend(){
                 var user={
                      UserEmail:this.EditPartition.UserEmail,
                      UserTrueName:this.EditPartition.UserTrueName,
                  	  UserPassword:this.EditPartition.UserPassword,
                  	  UserPhone:this.EditPartition.UserPhone,
                  	  Uvalidity:this.EditPartition.Uvalidity,
                  	  Id:this.EditPartition.Id,//点击的时候,把ID拿过来
                  	  AlarmType:this.EditPartition.AlarmType,
                  	  ListGroup:this.ListGroup
                 }
         	   UpdateUser(user).then(res=>{
                         if(res.State==1){
                              	 this.$message({
	                     			type:'success',
	                     			message:'编辑成功'
	                     		})
                         }else{
                              this.$message({
                              	type:'error',
                              	message:'编辑失败'
                              })
                         }
          	   }) 
          },
	    },
	   mounted(){
	              this.Gutuser();//调用函数.
	              this.SelectTable();//下拉列表
	              this.PartitionRequest();//分区显示列表
	      },
	    deactivated() {
			this.$destroy(true);
		}
}
</script>
<style lang="scss" scoped>
    .PersonalCenter{
    	.CurrentPosition{
    		height: 40px;
    		background:#f7f7f7; 
    		.NowPositon{
              line-height: 40px;
              margin-left: 15px;
    		}
    	}
		  .bg-purple {
		    background: #fefefe;
		    margin:10px;
		  }
		  .grid-content {
		    border-radius: 4px;
		    min-height:580px;

		  }
		  .row-bg {
		    padding: 10px 0;
		  
		  }  
		  .Icon_height{
		  	height: 160px;
		  	text-align: center;
		  		  } ;
         .huatoIcon{
           margin-top: 20px;
         	display: inline-block;
         	width: 125px;
         	height: 125px;
         	background: url(../assets/img/icon.png)  no-repeat -20px -974px ;
         }
	     .PersonalMessagelable{
	     	width: 60%;
	     	margin-left: 10%;
	     	height: 365px;
	     }

		  .Ultralimit{
	       	  cursor: pointer;
		  	  display: inline-block;
		  	  width: 35px;
		  	  height:43px;
		  	background: url(../assets/img/icon.png)  no-repeat -20px -1150px ;
		  }
	     .LostConnection{
	     	 cursor: pointer;
		  	  display: inline-block;
		  	  width: 35px;
		  	  height:43px;
		  	background: url(../assets/img/icon.png)  no-repeat -78px -1150px ;
		  }
	      .Edit{
	      	line-height: 50px;
	      	height:50px;
	      	margin-left: 10%;
	      }
	      .NowLogin{
	      	font-size: 20px;
	      	padding-left: 20px;
	      	height: 60px;
	      	line-height: 60px;
	      }
	      .userfrom{
	      	margin-left: 20px;
	      }
	      .blockTable{
	      	margin: 10px;
	      	text-align: center;
	      }
	      .Submenufrom{
	            padding: 15px 15px 0px 15px;
	      }
		 .el-form-item{
			 	margin-bottom: 18px;
			 }
	     .fa {
	     	cursor: pointer;
	     	margin: 6px;
	     }
/*   .el-checkbox+.el-checkbox{
         margin-left: 16px;
   }*/
		   .Partition{
		   	overflow:auto ;
		    padding: 20px;
		   	border: 1px solid #f2f2f2;
		   	height:400px;
		   }
		   .Partition {
		   	   .el-checkbox+.el-checkbox{
		   	   	margin-left: 0px;
		   	    }
		     }
  }

</style>
	<style type="text/css" lang='scss' >
        .blockTable .cell{
		      	text-align: center;
		      }
/*	.borderNone .el-input__inner{
      	border: none;
      }*/
   .el-checkbox .el-checkbox__label{
     	vertical-align: middle;
     }
	</style>