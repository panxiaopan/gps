<template>
 <el-row  class="PersonalCenter">
   <el-row>
      <el-col :span='24' class="CurrentPosition">
        <div class="NowPositon"><i class="el-icon-location"></i><span>{{$t('m.Location')}}</span><i class="el-icon-arrow-right"><span class="currentcolor">{{$t('m.usercenter')}}</span></i></div> 
      </el-col>
   </el-row>
    <el-row class="PersonalMessage">
       <el-col :span="8" class="HuatoMessage">
		       	<div class="grid-content bg-purple ">
	                  <div class="Icon_height">
			       		  <i  class="huatoIcon"></i> 
	                  </div>
	                  <el-row >
		                  <el-col :span="24">
		                     <el-form :label-position="labelPosition" status-icon label-width="120px" :rules='PersonnalRules' ref='personnalRule' :model="PersonalMessagelable" class="PersonalMessagelable">
								  <el-form-item :label="$t('m.Company')">
								       <el-input  v-model="PersonalMessagelable.CompanyName" class="borderNone" :readonly="true"></el-input>
								  </el-form-item>
								  <el-form-item :label="$t('m.UserName')">
								     <el-input  v-model="PersonalMessagelable.UserName" class="borderNone" :readonly="true"></el-input>
								  </el-form-item>
								  <el-form-item :label="$t('m.StaffName')" prop="RealName">
								       <el-input v-model="PersonalMessagelable.RealName" :readonly="readtrue"></el-input>
								  </el-form-item>
		 						  <el-form-item :label="$t('m.PhoneNO')" prop="CellPhone">
								       <el-input v-model="PersonalMessagelable.CellPhone" :readonly="readtrue"></el-input>
								  </el-form-item>
		                            <el-form-item :label="$t('m.Emaial')" prop="Mailbox">
								       <el-input v-model="PersonalMessagelable.Mailbox" :readonly="readtrue"></el-input>
								  </el-form-item>
		                          <el-form-item :label="$t('m.WeChat')" v-show="weixinshow" class="weixinfrom">
								       <el-input v-model="UserWx" :disabled="true"></el-input>
								        <el-button type="primary" size="small"  @click="GainWechat" v-if="WexinButton">{{$t('m.Gain')}}</el-button>
								  </el-form-item>
								  <el-form-item :label="$t('m.AlarmType')" v-show="alarmshow" class="AlarmI">
		                                    <el-tooltip class='item' effect='light' :content="$t('m.NOALARMtype')" v-show="DeviceSafety">
								        	    <i class="fa-chevron-down"></i>
		                                    </el-tooltip>
								        	<el-tooltip class='item' effect='light' :content="$t('m.Overrun')" v-show='Ultralimit'>
								        		<i class="Ultralimit"></i>
								        	</el-tooltip>
		                                    <el-tooltip class='item' effect='light' :content="$t('m.Dropped')" v-show="LostConnection">
								        	    <i class="LostConnection"></i>
		                                    </el-tooltip>
								  </el-form-item>
								  <el-form-item  v-show="EditSureshow">
								       <el-button type="primary" size="mini" @click="EditSubmission">{{$t('m.YES')}}</el-button><el-button  size="mini" @click="AbolishEdit">{{$t('m. NO')}}</el-button>
								  </el-form-item>
		                    </el-form>
			                 <div class="Edit" v-show="EditHideshow">
		                    	<el-button type="primary" size="mini" @click="editMessage">{{$t('m.Edit')}}</el-button>
		                    	<el-button type="primary" size="mini" @click="PassDialogVisible = true">{{$t('m.ChangePassword')}}</el-button>
		                    	<el-button type="primary" size="mini">{{$t('m.AddalarmReceiver')}}</el-button>
		                    </div>
		                </el-col>
                    </el-row>
		       	</div>
       </el-col>
       <el-col :span="16" class="Loginrecord">
	       	<div class="grid-content bg-purple">
	       	   <div class="NowLogin">{{$t('m.Recentlylogin')}}</div>
			          <el-form :inline="true" :model="formInline" class="demo-form-inline  userfrom">
	                    <el-form-item  :label="$t('m.UserName')">
						    <el-select v-model="formInline.selectvalue" :placeholder="$t('m.SelectUsername')" @change="checkedvalue">
	                             <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value"
							      >
							    </el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item :label="$t('m.TimePeriod')">
						        <div class="block">
								    <el-date-picker
								          value-format="yyyy-MM-dd"
									      v-model="valueTime"
									       type="daterange"
									       :picker-options='disabledDate'
									      range-separator="至"
									      :start-placeholder="$t('m.StartTime')"
									      :end-placeholder="$t('m.EndTime')">
								    </el-date-picker>
								</div>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="LoginInquire">{{$t('m.Search')}}</el-button>
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
						      :label="$t('m.UserName')"
						      width="180">
						    </el-table-column>
						    <el-table-column
						      :label="$t('m.UserRating')"
						      width="180">
	                            <template slot-scope="scope">
	                                <span  v-if='tableDataList[scope.$index].UserRole==1' >{{$t('m.Administrator')}}</span>
	                                <span  v-if='tableDataList[scope.$index].UserRole==2' >{{$t('m.Conventional')}}</span>
	                            </template>
						    </el-table-column>
						    <el-table-column
						      prop="IPaddress"
						      :label="$t('m.IPaddress')">
						    </el-table-column>
                        	 <el-table-column
						        prop="logTime"
						       :label="$t('m.Logintime')">
						    </el-table-column>
                            <el-table-column
						        prop="UserLoginRemark"
						      :label="$t('m.loggingStatus')">
						    </el-table-column>
                             <el-table-column
						       :label="$t('m.LoginInstructions')">
                               <template slot-scope="scope">
                               	    <span  v-if='tableDataList[scope.$index].UserLoginType==1' >{{$t('m.WebClient')}}</span>
	                                <span  v-if='tableDataList[scope.$index].UserLoginType==2' >{{$t('m.MobileAPP')}}</span>
	                                <span  v-if='tableDataList[scope.$index].UserLoginType==null' >{{$t('m.Abnormal')}}</span>
                               </template>
						    </el-table-column>
					      </el-table>
                  </div>
	       </div>
	   </el-col>
     </el-row>
     <el-row :span="24" v-if="ChildUsers" class="ManageUser">
     	  <div class=" bg-purple">
     	  	 <el-form :inline="true"  class="demo-form-inline  Submenufrom"  label-width="100px" >
	                    <el-form-item :label="$t('m.UserName')">
                             <el-input    v-model="ChilderVal"></el-input>
						  </el-form-item>
						  <el-form-item :label="$t('m.TimePeriod')">
						        <div class="block">
								    <el-date-picker
								          value-format="yyyy-MM-dd"
								           v-model="valueTimeSub"
								          @change="SuberUserInquireval"
									      type="daterange"
									      :picker-options='disabledDate'
									      range-separator="至"
									      :start-placeholder="$t('m.StartTime')"
									      :end-placeholder="$t('m.EndTime')">
								    </el-date-picker>
								</div>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="SubUserInquire">{{$t('m.Search')}}</el-button>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="UserCreation" >{{$t('m.CreatUser')}}</el-button>
						  </el-form-item>
			      </el-form>
                  	 <div class="blockTable SubUserTable">
	                	   <el-table
						    :data="SubUserDataList"
						    height="190"
						    border
						    style="width: 100%"
						    >
						    <el-table-column
						      prop="Username"
						      :label="$t('m.UserName')"
						      width="180"
						      >
						    </el-table-column>
						    <el-table-column
						      :label="$t('m.UserRating')"
						      width="180"
						      >
                 	          <template slot-scope="scope">
	                                <span  v-if='SubUserDataList[scope.$index].UserLevel==1' >{{$t('m.Administrator')}}</span>
	                                <span  v-if='SubUserDataList[scope.$index].UserLevel==2' >{{$t('m.Conventional')}}</span>
	                          </template>
						    </el-table-column>
						    <el-table-column
						      prop="Ucompany"
						      :label="$t('m.Company')">
						    </el-table-column>
                        	 <el-table-column
						      prop="UrecordDate"
						      :label="$t('m.ApplyData')">
						    </el-table-column>
                          	 <el-table-column
						      prop="Uvalidity"
						      :label="$t('m.Periodvalidity')">
						    </el-table-column>
                            <el-table-column
						      prop="AlarmType"
						      :label="$t('m.AlarmType')">
                             <template slot-scope="scope">
                                   <span v-if='SubUserDataList[scope.$index].AlarmType==1'>
							        	<el-tooltip class='item' effect='light' :content="$t('m.Overrun')" >
							        		<i class="Ultralimit"></i>
							        	</el-tooltip>
                                    </span>
                                    <span v-if='SubUserDataList[scope.$index].AlarmType==2'>
	                                    <el-tooltip class='item' effect='light' :content="$t('m.Dropped')"  >
							        	    <i class="LostConnection"></i>
	                                    </el-tooltip>
                                    </span>
                                    <span v-if='SubUserDataList[scope.$index].AlarmType==3' >
                                    	<el-tooltip class='item' effect='light' :content="$t('m.Overrun')" >
							        		<i class="Ultralimit"></i>
							        	</el-tooltip>
							         <el-tooltip class='item' effect='light' :content="$t('m.Dropped')"  >
							        	    <i class="LostConnection"></i>
	                                   </el-tooltip>
                                    </span>
                              </template> 
						    </el-table-column>
                            <el-table-column
                              width='150'
						      :label="$t('m.Operation')">
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
		   :title="$t('m.ChangePassword')"
		  :visible.sync="PassDialogVisible"
		  width="30%"
		  @close='closeUpdatePass'
		  center>
		     <el-form 
		       :model="PasswordForm" status-icon 
		        ref="passwordRules" 
		        :rules="passwordRule" 
		         class="demo-ruleForm" 
	             label-width="180px"
		         >
		         <el-form-item :label="$t('m.OriginalPassword')" prop="Oldpassword" >
				     <el-input type="password" v-model="PasswordForm.Oldpassword"></el-input>
				  </el-form-item>
				  <el-form-item :label="$t('m.NewPassword')" prop="Newpass">
				     <el-input type="password" v-model="PasswordForm.Newpass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item :label="$t('m.ConfirmNewPassword')"  prop="ConfirmPass">
				     <el-input type="password" v-model="PasswordForm.ConfirmPass" auto-complete="off"></el-input>
				  </el-form-item> 
		     </el-form>
		      <span slot="footer" class="dialog-footer">
                      <el-button @click="PassDialogVisible = false" size="small" >{{$t('m.NO')}}</el-button>
				      <el-button type="primary" @click="PassWordSend" size='small'>{{$t('m.YES')}}</el-button>
		       </span>
		</el-dialog>
        <el-dialog
			  :title="$t('m.CreatUser')"
			  :visible.sync="CreateDialogVisible"
			  width="30%"
			  @close='closeCreate'
			  center>
			<el-form :model="CreateruleForm" status-icon  :rules="CreateRules" ref="CreateRule" label-width="150px" class="demo-ruleForm" >
					  <el-form-item :label="$t('m.UserName')" prop="UserName">
					        <el-input  v-model="CreateruleForm.UserName"></el-input>
					  </el-form-item>
					  <el-form-item :label="$t('m.RealName')" prop="UserTrueName">
					         <el-input  v-model="CreateruleForm.UserTrueName" ></el-input>
					  </el-form-item>
					  <el-form-item :label="$t('m.Password')"  prop="UserPassword">
					         <el-input type="password" v-model="CreateruleForm.UserPassword"></el-input>
					  </el-form-item>
					  <el-form-item :label="$t('m.ConfirmPassword')"  prop="ConfirmUserPassword">
					         <el-input type="password"  v-model="CreateruleForm.ConfirmUserPassword" ></el-input>
					  </el-form-item>
					  <el-form-item :label="$t('m.PhoneNO')" prop="UserPhone">
					         <el-input  v-model="CreateruleForm.UserPhone" ></el-input>
					  </el-form-item>
					   <el-form-item :label="$t('m.Emaial')" prop="UserEmail">
					         <el-input v-model="CreateruleForm.UserEmail"></el-input>
					  </el-form-item>
					   <el-form-item :label="$t('m.AlarmType')">
					        <el-checkbox-group v-model="CheckList" @change="handleCheckedCitiesChange">
								    <el-checkbox label="1"> 
	                                  	<el-tooltip class='item' effect='light' :content="$t('m.Overrun')" >
								        		<i class="Ultralimit"></i>
								        </el-tooltip>
								    </el-checkbox>
								    <el-checkbox label="2">
								    	   <el-tooltip class='item' effect='light' :content="$t('m.Dropped')"  >
								        	    <i class="LostConnection"></i>
		                                   </el-tooltip>
								    </el-checkbox>
							 </el-checkbox-group>
					  </el-form-item>
                      <el-form-item :label="$t('m.LanguageSelection')">
                      	     <el-radio-group v-model="UserLanguage ">
								    <el-radio :label="1">{{$t('m.Chinese')}}</el-radio>
								    <el-radio :label="2">{{$t('m.English')}}</el-radio>
							 </el-radio-group>
                      </el-form-item>
			  </el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="CreateDialogVisible = false" size="small">{{$t('m.NO')}}</el-button>
			    <el-button type="primary" @click="CreateSend" size="small">{{$t('m.YES')}}</el-button>
			  </span>
		</el-dialog>
         <el-dialog
              class="EditDialogcent"
			  :title="$t('m.EditUser')"
			  :visible.sync="EditDialog"
			  width="35%"
			  center>
			<div  class="Editmiddlelog" style="height: 450px">
			  <el-col :span="8">
			    	<div class="PartitionLight Partition  ">
			  	          <el-checkbox-group  v-model="checkedPartion"  @change='checkPositionval'>
	                            <el-checkbox  v-for='item in PositionList' :key='item.Id' :label="item.Id" style="display: block;">{{item.GroupName}}</el-checkbox >
						  </el-checkbox-group> 
				    </div>
			 </el-col>
             <el-col :span="16">
			   <div class="PartitionRight Partition" >
                  <el-form :model="EditPartition"  label-width="120px" class=" demo-dynamic" :rules="EditPartitionRules" ref="EditPartitionRules">
					  <el-form-item  :label="$t('m.StaffName')"  prop="UserTrueName" >
					    <el-input v-model="EditPartition.UserTrueName"></el-input>
					  </el-form-item>
                      <el-form-item :label="$t('m.Password')"  prop="UserPassword">
					    <el-input v-model="EditPartition.UserPassword"></el-input>
					  </el-form-item >
                       <el-form-item :label="$t('m.PhoneNO')"  prop="UserPhone">
					    <el-input v-model="EditPartition.UserPhone"></el-input>
					  </el-form-item>
                       <el-form-item :label="$t('m.Emaial')"  prop="UserEmail">
					    <el-input v-model="EditPartition.UserEmail"></el-input>
					   </el-form-item>
                      <el-form-item :label="$t('m.Periodvalidity')" prop="Uvalidity" >
					        <el-date-picker
						      v-model="EditPartition.Uvalidity"
						      type="date"
						      :placeholder="$t('m.SelectDate')"
						      value-format="yyyy-MM-dd">
						    </el-date-picker>
					  </el-form-item>
					   <el-form-item :label="$t('m.AlarmType')">
					        <el-checkbox-group v-model="SuberUserCheckList" @change="EdithandChange">
								    <el-checkbox label="1"> 
	                                  	<el-tooltip class='item' effect='light' :content="$t('m.Overrun')" >
								        		<i class="Ultralimit"></i>
								        </el-tooltip>
								    </el-checkbox>
								    <el-checkbox label="2">
								    	   <el-tooltip class='item' effect='light' :content="$t('m.Dropped')"  >
								        	    <i class="LostConnection"></i>
		                                   </el-tooltip>
								    </el-checkbox>
							 </el-checkbox-group>
					  </el-form-item>
                        <el-form-item :label="$t('m.LanguageSelection')">
                      	     <el-radio-group v-model="EditPartition.UserLanguageeit">
								    <el-radio :label="1">{{$t('m.Chinese')}}</el-radio>
								    <el-radio :label="2">{{$t('m.English')}}</el-radio>
							 </el-radio-group>
                      </el-form-item>
                 </el-form>
                  
               </div>
			 </el-col>
			 </div>
              <span slot="footer" class="dialog-footer">
			    <el-button @click="EditDialog = false" size='mini'>{{$t('m.NO')}}</el-button>
			    <el-button type="primary" size="mini" @click="EditSubSend">{{$t('m. YES')}}</el-button>
			 </span>
		</el-dialog>
  </el-row>
</template>
<script>
import qs from 'qs';
 import{ GetPersonalCenter,GetUserManageComboBoxData,GetUserLogSelect,UpdateUser,LoginUpdateUser,UpdateUserPass,InsertUser,DeleteUserManage,GetUserSelect,GetUserManageTop1,GetGroupData,GetUserWechatData}from '@/api/api';
     import{SevenDay,timeFormattershow}from'@/assets/js/common';
export default {
    data(){
               //  表单验证规则---自定义的
    var checkName = (rule, value, callback) => {
	      if(value === '') {
	        callback(new Error(this.$t('m.RealNameenter')));
	      }
	      callback();
	    };
	 var checkPhone = (rule, value, callback) => {
	      if(value !== '' && !(/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/).test(value)) {
	        callback(new Error(this.$t('m.PhoneNumber')));
	      } else if (value == '') {
	        callback(new Error(this.$t('m.PhoneNumber')));
	      }
	      callback();
	    }; 
	var checkMailbox =(rule,value,callback)=>{
		 if(value !== '' && !(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(value)) {
	        callback(new Error(this.$t('m.CorrectMailbox')));
	      } else if (value == '') {
	        callback(new Error(this.$t('m.CorrectMailbox')));
	      }
	      callback();
	} 
        //密码验证规则
     var checkOldpassword =(rule,value,callback)=>{
       	 if(value === '') {
		        callback(new Error(this.$t('m.EnterOriginalPassword')));
		      }
	  	      callback();
       }
      var checkNewpassword = (rule,value,callback)=>{
           if(value === ''){
           	  callback(new Error(this.$t('m.EnterNEWpassword')));
           } 
           	    callback();   
      }

     //修改密码时候的判断.
     var checkConfirmPasshost=(rule,value,callback)=>{
	      if(value === '') {
	          callback(new Error(this.$t('m.Passwordagain')));
	        } else if (value !== this.PasswordForm.Newpass) {
	          callback(new Error(this.$t('m.passwordsinconsistent')));
	        }else{
	        	 callback();   
	        }   
     }
    //验证新建用户名规则
     var   checkUserName=(rule,value,callback)=>{
     	   if(value===''){
     	   	 callback(new Error(this.$t('m.Createusername')))
     	   }
     	   callback(); 
     }
      var  checkUserpassword=(rule,value,callback)=>{
      	  if (value==='') {
      	  	 callback(new Error(this.$t('m.CreatePassword')))
      	  }
      	  callback(); 
      }
      var  checkConfirmPass=(rule,value,callback)=>{
	      if(value === '') {
	          callback(new Error(this.$t('m.Passwordagain')));
	        } else if (value !== this.CreateruleForm.UserPassword) {
	          callback(new Error(this.$t('m.passwordsinconsistent')));
	        } 
	       callback();   
      }
        //用户编辑的日期验证.
      var checkData=(rule,value,callback)=>{
      	   if(value===''){
     	   	 callback(new Error(this.$t('m.Validdate')))
     	   }
     	   callback(); 
      }
     return{
     	    UserLanguage:1,
		    disabledDate: {
		          disabledDate(time) {
		              return time.getTime() > Date.now();
		          }
		      },
     	     ChildUsers:false,//子用户列表显示
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
                 Uvalidity:'',
                 UserLanguageeit:''      
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
         passwordRule:{//修改自己密码的时候.
              Oldpassword:[
		          { validator: checkOldpassword, trigger: 'blur' }
		        ],
               Newpass:[
		          { validator: checkNewpassword, trigger: 'blur' }
		        ],
		       ConfirmPass:[
		          { validator: checkConfirmPasshost, trigger: 'blur' }
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
      	   	WexinButton:false,
      	   	UserWx:'',//微信的获取值
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
      	     valueTime: [ timeFormattershow(new Date(SevenDay(new Date()))),timeFormattershow(new Date()) ],
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
                   sessionStorage.setItem('UserLevel', JSON.stringify(res.Data[0]));
                   this.UserWx=res.Data[0].UserWx
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
                   	   	    logTime:item.UserLoginTime,
                   	   	    UserLoginRemark:item.UserLoginRemark,
                   	   	    UserLoginType:item.UserLoginType
                   	   })
                   }
                
                if(res.Data[0].UserLevel==1){//判断是管理员登录的时候显示
                	this.ChildUsers=true;//子用户显示列表
                  for(let item of res.Data[0].ListUser){//子用户
                   if( item.UserLevel==2){
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
                  }

          	  }) 
          },
          GainWechat(){//获取微信
            var params={
            	userCode:this.Id.toString(),//数字类型,转化字符串
            	userPhone:this.PersonalMessagelable.CellPhone
            } 
		     GetUserWechatData(qs.stringify(params)).then(res=>{
		                   if(JSON.stringify(res.State)==1){ 
		                   	   this.UserWx=null;//清空以前的
		                   	   this.UserWx=res.Data.touser
		                   }else {
		                      this.$message({
		                           type:'error',
		                           message:this.$t('m.Failure')
		                          })
		                   }
		             }) 
          },
       checkedvalue(val){//选中查询一次
          this.LoginInquire()
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
                        this.formInline.selectvalue=this.options[0].value
                       }
          	     })
          },
	      editMessage(){//打开编辑
	         	     this.readtrue=false;//打开可编辑
	                 this.EditHideshow=false;
	                 this.alarmshow=false;
	                 this.weixinshow=true;
	                 this.EditSureshow=true;
	                 this.WexinButton=true;
	         },
	       AbolishEdit(){//编辑取消
	                 this.readtrue=true;//打开可编辑
	                 this.EditHideshow=true;
	                 this.alarmshow=true;
	                 this.weixinshow=false;
	                 this.EditSureshow=false; 
	                 this.WexinButton=false;
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
		                           message:this.$t('m.EidtSuccess')
		                          }) 
				                 this.readtrue=true;//打开可编辑
				                 this.EditHideshow=true;
				                 this.alarmshow=true;
				                 this.weixinshow=false;
				                 this.EditSureshow=false;  
				                 
		                        }else{
		                        this.$message({
		                           type:'error',
		                           message:this.$t('m.Editfailure')
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
		     this.$confirm(this.$t('m.Delect') + this.SubUserDataList[index].Username+',', this.$t('m.Determineb'), {
		          confirmButtonText: this.$t('m.YES'),
		          cancelButtonText: this.$t('m.NO'),
		          type: 'warning'
		        }).then(() => {
             DeleteUserManage(qs.stringify(params)).then(res=>{
                          if(res.State==1){
                          	        this.$message({
						            type: 'success',
						            message: this.$t('m.SuccessfullyDelete')
						          });
                              }
                              this.Gutuser()//调用函数刷新列表
                         })
			        }).catch(() => {
/*			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          }); */         
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
	                        		message:this.$t('m.Relogin')
	                        	})
	                        this.PassDialogVisible=false;//密码弹框关闭
							this.$router.push('/Login');//登录页面
	                        }else{
	                        	this.$message({
	                        		type:'error',
	                        		message:this.$t('m.Modifyfailure')
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
	               	  AlarmType:this.CreateruleForm.AlarmType,
	               	  UserLanguage:this.UserLanguage
	               }
	            // const a = this.prototype
	         this.$refs['CreateRule'].validate((valid)=>{
	         	 if(valid){
	          InsertUser(user).then(res=>{
	                     if(res.State==1){
	                     	this.$message({
	                     		type:'success',
	                     		message:this.$t('m.CreatingSuccessful')
	                     	})
	                    this.CreateDialogVisible=false;

	                     this.$refs['CreateRule'].resetFields();
	                     this.Gutuser()//重新请求一边函数
	                     	}else{
	                     		this.$message({
	                     			type:'error',
	                     			message:this.$t('m.CreateFailure')
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
         LoginInquire(){//登录时候查询的
          	var parms={
                  condition:this.formInline.selectvalue,
                  staDate:this.valueTime ==null ? undefined : this.valueTime[0],
                  endDate:this.valueTime ==null ? undefined : this.valueTime[1]
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
        	this.SubUserDataList=[]//如果一条数据都没有,清空  
           GetUserSelect(qs.stringify(parms)).then(res=>{ 
                  for(let item of res.Data){//子用户
                   if(item.UserLevel==2)  {
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
	             	/*this.checkedPartion=[];//清空选中*/
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
                          	  AlarmType:res.Data.AlarmType,
                          	  UserLanguageeit:res.Data.UserLanguage
                          }

	             })
            },
         checkPositionval(val){//分区选中的值.
            	  this.EditZone=val;
            	
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
          	       let Selected=[];
                   for(let i=0; i<this.checkedPartion.length;i++){
                   	   Selected.push({
                   	   	 id:this.checkedPartion[i]
                   	   })
                   }

                 var user={
                      UserEmail:this.EditPartition.UserEmail,
                      UserTrueName:this.EditPartition.UserTrueName,
                  	  UserPassword:this.EditPartition.UserPassword,
                  	  UserPhone:this.EditPartition.UserPhone,
                  	  Uvalidity:this.EditPartition.Uvalidity,
                  	  Id:this.EditPartition.Id,//点击的时候,把ID拿过来
                  	  AlarmType:this.EditPartition.AlarmType,
                  	  ListGroup:Selected,
                  	  UserLanguage:this.EditPartition.UserLanguageeit,
                 }
          this.$refs['EditPartitionRules'].validate((valid) =>{
		         if(valid){
	           UpdateUser(user).then(res=>{
		                         if(res.State==1){
		                              	 this.$message({
			                     			type:'success',
			                     			message:this.$t('m.EidtSuccess')
			                     		})
                                       this.EditDialog=false;
                                       this.$refs['EditPartitionRules'].resetFields();
                                       this.Gutuser();//刷新数据

		                         }else{
		                              this.$message({
		                              	type:'error',
		                              	message:this.$t('m.Editfailure')
		                              })
		                         }
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
          height: calc(100% - 10px);
           min-width: 1246px;
    	.HuatoMessage{
    		.el-form-item{
    			margin-bottom: 10px;
    		}

    	}
		  .bg-purple {
		    background: #fefefe;
		    margin:10px;
		  }
		  .grid-content {
		    border-radius: 4px;
		    height: 536px;

		  }
		  .row-bg {
		    padding: 10px 0;
		  
		  } 
		  .el-table__row {
		  	.el-table td{
		  		padding: 3px 0;
		  	}
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
	     	margin:  0px 100px 0px 72px;
	     	height:302px;
	     	min-width: 320px;
	     }
		  .Ultralimit{
	       	  cursor: pointer;
		  	  display: inline-block;
		  	  width: 36px;
		  	  height:30px;
		  	background: url(../assets/img/icon.png)  no-repeat -22px -1157px ;
		  }
	     .LostConnection{
	     	 cursor: pointer;
		  	  display: inline-block;
		  	  width: 36px;
		  	  height:30px;
		  	background: url(../assets/img/icon.png)  no-repeat -81px -1157px ;
		  }
	      .Edit{
	      	line-height: 38px;
	      	height:38px;
	        text-align: center;
	      }
	      .NowLogin{
	      	font-size: 20px;
	      	padding-left: 20px;
	      	height: 60px;
	      	line-height: 60px;
	      }
	      .userfrom{
	      	margin-left: 20px;
            .el-input__inner{
            	height: 35px !important;
            } 
            .el-range-editor.el-input__inner{
            	padding: 1px 10px;
            }
	      }
	      .blockTable{
	      	margin: 10px;
	      	text-align: center;
	      }
	      .Submenufrom{
	            padding: 15px 15px 0px 15px;
	            .el-input__inner{
                   height: 35px;
	            }
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
         .weixinfrom{
              .el-input{
              	width:74%;
              }
         }

  
  }

</style>
	<style type="text/css"  >
        .blockTable .cell{
		      	text-align: center;
		      }
   .el-checkbox .el-checkbox__label{
     	vertical-align: middle;
     }
    .PersonalCenter .el-table td{
     	padding: 3px 0px  !important;
     }
 
/*       .ManageUser .el-table td, .el-table th{
    		padding: 0px 0px  !important;
    	}*/
        .HuatoMessage .el-input__inner{
              height: 34px !important;
        }
       .userfrom .el-input__inner{
        	height: 35px;
        }
        .Submenufrom .el-input__inner{
             height: 35px;
        } 
        .PersonalMessagelable .el-form-item__error{
        	padding-top: 0px;
        }
	</style>