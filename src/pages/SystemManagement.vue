<template>
  <el-row class="SystemManagement">
    <el-row>
	    <el-col :span='24'>
		    <el-row>
		      <el-col :span='24' class="CurrentPosition">
		        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">系统管理</i></div> 
		      </el-col>
		   </el-row>
	   </el-col>
  </el-row>
   <el-row class="SystemManagementCoent">
		  <el-col :span="6" class="lightZone">
			  	<div class="grid-content bg-purple-light">
			  		 <div class="AreaSearch">
				  		   <el-input
				  		    class="Seach"
						    placeholder="请输入分区名称"
						    suffix-icon="el-icon-search"
						    v-model="groupNameSeach"
						    @keyup.enter.native="PartitionRequest()"
						     >
						  </el-input> 
					  </div>
					 <div class="AddPartition"> 
					 	<el-button type="primary" icon="fa fa-plus-circle" size='small' @click="AddDialogVisible = true"> 添加分区</el-button>
                        <el-button type="danger" icon="fa fa-trash" size='small' @click='DelectZone'> 删除分区</el-button>
					 </div>
                   <div>
                     <el-radio-group v-model="radio2"  class="Selectpatation">
                       <el-form >
　　　　　　　　　　　　　<el-form-item v-for='(item,index) in PositionList' :key='item.Id' size="small">
			                        <div class="PartitionList"  >
                                          <el-radio-group v-model="SelectDelete">
                                             <template slot-scope="scope">
					                        	<el-radio :label="item.Id" @change="DeletePartition">
					                        		<el-input v-model="item.GroupName"  :readonly="item.readtrue"></el-input>
					                                  <i class="fa fa-pencil-square-o   fa-2x"  @click="EditPartion(index)" v-show="item.EditIcon"></i> 
					                                   <el-button type="primary" size="mini" v-show="item.EditSend" @click="EditZoning(index)" class="Edit">确定</el-button>  
					                        	</el-radio>
                                             </template>
                                           </el-radio-group>
			                        </div> 
                                  <hr  class="hr" />
	                  　　</el-form-item>
                       </el-form>
                       </el-radio-group>
                    </div>
			  	</div>
		  </el-col>
		  <el-col :span="18">
			  	<div class="grid-content bg-purple-right">
			  	     <div class="AddEquipments"> 
					 	<el-button type="primary" icon="fa fa-plus-circle" size='small' @click="AddDevice">添加设备</el-button>
                        <el-button type="danger" icon="fa fa-trash" size='small' @click="BatchRemove" > 批量删除</el-button>
                        <div class="SearchAreaSearch">
                          <el-input
						    placeholder="请输入分区名称"
						    suffix-icon="el-icon-search"
						    v-model="SeachPartation"
						     @keyup.enter.native='GetEquipmentList()'
						     >
						  </el-input> 
                        </div>
					 </div> 
                     <div class="EquipmentsTable">
                       <el-table
					    ref="multipleTable"
					    :data="EquipmentList"
					    tooltip-effect="dark"
					    style="width: 100%"
					    border
					    @selection-change="handleSelectionChange">
					    <el-table-column
					       type="selection"
					       label="全选"
					       width="55">
					    </el-table-column>
					     <el-table-column
                            label="序号"
							type="index"
							width="50">
						 </el-table-column>
					    <el-table-column
					      prop='LoggerName'
					      label="设备名称"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      label="设备ID"
					      prop='LoggerSn'
					      width="120">
					    </el-table-column>
					    <el-table-column
					      label="实时数据"
					      >
					    </el-table-column>
                         <el-table-column
					      label="更新时间"
					      prop="LogsTime"
					      >
					    </el-table-column>
                        <el-table-column
					      label="设备状态"
					      >
					      	<template slot-scope="scope">
					      	    <el-switch
					      	     @change="swicthFacility(scope.$index,$event)"
								  v-model="EquipmentList[scope.$index].LoggerState"
								  active-color="#13ce66"
								  inactive-color="#ff4949">
								</el-switch>
					      </template>
					    </el-table-column>
                        <el-table-column
					      label="操作"
					      >
                          	  <template slot-scope="scope">
						      	  <i class="fa fa-edit fa-2x" @click="EditFacility(scope.$index)"></i>
						      	  <i class="fa fa-trash-o fa-2x" @click="DelectFacility(scope.$index)"></i>
						      </template>
					    </el-table-column>
					  </el-table>
                   </div>
                <div class="myPagination"><!-- 组件翻页 -->
				      <el-pagination
				        background
				        layout="prev, pager, next,  total"
				        :total="totalNumber" 
				        :page-size='pageSize'
				        @current-change='pageIndexChange'>
				      </el-pagination>
			    </div>

			  	</div>
		  </el-col>
   </el-row>      
     <el-dialog
		  title="添加分区"
		  :visible.sync="AddDialogVisible"
		  width="30%"
		  >
	    <el-form :model="Rulepartition" status-icon :rules="ruleszone" ref="Rulespartition" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="分区名称" prop="name">
			     <el-input  v-model="Rulepartition.name" auto-complete="off"></el-input>
			  </el-form-item>
		</el-form>           
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="AddDialogVisible = false" size="mini">取 消</el-button>
		    <el-button type="primary" size="mini" @click="Addsend">确 定</el-button>
		  </span>
	</el-dialog>
		<el-dialog
		  title="设备参数"
		  :visible.sync="AddEquipmentDialog"
		  width="55%"
		  size="small"
		  center
		   @close='AddEquipmentDialogClose'
		  >
		   <el-form :inline="true" :model="formInline" class="IntrumentType" label-width="130px" size="small" status-icon  :rules="AddEquipmentrules" ref="AddEquipmentForm">
				  <el-form-item label="设备ID"  prop="LoggerSn">
				    <el-input v-model="formInline.LoggerSn"></el-input>
				  </el-form-item>
				  <el-form-item label="分区名称">
                        <el-select v-model="formInline.GroupId">
							    <el-option
							      v-for="item in PositionList"
							      :key="item.Id"
							      :label="item.GroupName"
							      :value="item.Id">
							     </el-option>
						</el-select>
				  </el-form-item>
                  <el-form-item label="设备名称"  prop="LoggerName">
                     <el-input v-model="formInline.LoggerName"></el-input>
				  </el-form-item>
                  <el-form-item label="仪器类型">
                       <el-select v-model="formInline.VerId"  placeholder="请选择">
							    <el-option
							      v-for="item in IntrumentType"
							      :key="item.LoggerTypeCode"
							      :label="item.LoggerTypeName"
							      :value="item.LoggerTypeCode">
							     </el-option>
						</el-select>
				  </el-form-item>
                  <el-form-item label="设备类型">
                     <el-select v-model="formInline.PosPageno" >
					    <el-option
						       v-for="item in MediaType"
						      :key="item.WarehouseTypeCode"
						      :label="item.WarehouseTypeName"
						      :value="item.WarehouseTypeCode">
					     </el-option>
					  </el-select>
				  </el-form-item>
                  <el-form-item label="采样间隔时间(秒)" prop="samplingInt">
                     <el-input v-model="formInline.samplingInt"></el-input>
				  </el-form-item>
                  <el-form-item label="记录间隔" prop="IntervalOfRecords">
                     <el-input v-model="formInline.IntervalOfRecords" ></el-input>
				  </el-form-item>
                  <el-form-item label="传感器数量">
		         <el-select v-model="formInline.LoggerChnum" @change="Sensorquantity">
                     <el-option label="通道一" value="1"></el-option>
                     <el-option label="通道二" value="2"></el-option>
                     <el-option label="通道三" value="3"></el-option>
                     <el-option label="通道四" value="4"></el-option>
                  </el-select>
				  </el-form-item>
			</el-form>
			 <div  class="InstrumentIndication">
			 	  <el-checkbox  v-model="Gps" @change="GPSSelect">GPS</el-checkbox>
			 </div>
			 <div class="SensorParameter" >
			 	<table  cellpadding="0" cellspacing="0" border='1'>
			 		<tr>
			 			 <th class="lineSensing">传感器</th>
                         <th>上限</th>
                         <th>下限</th>
                         <th>类型</th>
                         <th>小数点</th>
			 		</tr>
                     <tr>
                    	 <td>传感器一</td>
                    	 <td><el-input v-model="ChoneHigh"></el-input></td>
                     	 <td><el-input v-model="ChoneLow"></el-input></td>
                    	 <td>
	                    	 <el-select v-model="ChoneType">
							      <el-option
							         v-for="item in  SensorOptions"  
							         :key='item.value'
							         :label='item.label'  
							         :value="item.value">
							        </el-option> 
							   </el-select>
						      <el-input class="UserDefined" placeholder="自定义" v-model="ChoneUs"></el-input>
                    	 </td>
                     	 <td>
	                     	  <el-select v-model="ChoneDot" placeholder="小数点位">
							      <el-option label="0.0" value="1"></el-option>
							      <el-option label="0.00" value="2"></el-option>
							      <el-option label="0.000" value="3"></el-option>
							      <el-option label="0.0000" value="4"></el-option>
							   </el-select>
                     	 </td>                	                         
                    </tr>
                    <tr>
                    	 <td>传感器二</td>
                    	 <td><el-input :disabled="twoaisle" v-model="ChtwoHigh"></el-input></td>
                     	 <td><el-input :disabled="twoaisle" v-model="ChtwoLow"></el-input></td>
                    	 <td>
	                    	 <el-select v-model="ChtwoType" :disabled="twoaisle">
							      <el-option
							        :disabled="twoaisle"
							         v-for="item in  SensorOptions"  
							         :key='item.value'
							         :label='item.label'  
							         :value="item.value">
							        </el-option> 
							   </el-select>
						     <el-input class="UserDefined" placeholder="自定义" v-model="ChtwoUs" :disabled="twoaisle"></el-input>
                    	 </td>
                     	 <td>
	                     	  <el-select v-model="ChtwoDot" placeholder="小数点位" :disabled="twoaisle">
							      <el-option label="0.0" value="1"></el-option>
							      <el-option label="0.00" value="2"></el-option>
							      <el-option label="0.000" value="3"></el-option>
							      <el-option label="0.0000" value="4"></el-option>
							   </el-select>
                     	 </td>                	                         
                    </tr>
                    <tr>
                    	 <td>传感器三</td>
                    	 <td><el-input :disabled="threeaisle" v-model="ChthrHigh"></el-input></td>
                     	 <td><el-input :disabled="threeaisle" v-model="ChthrLow"></el-input></td>
                    	 <td>
	                    	 <el-select v-model="ChthrType" :disabled="threeaisle">
							      <el-option
							       	 v-for="item in  SensorOptions"  
							         :key='item.value'
							         :label='item.label'  
							         :value="item.value">
							        </el-option> 
							   </el-select>
						       <el-input class="UserDefined" placeholder="自定义" v-model="ChthrUs" :disabled="threeaisle"></el-input>
                    	 </td>
                     	 <td>
	                     	  <el-select v-model="ChthrDot" placeholder="小数点位" :disabled="threeaisle">
							      <el-option label="0.0" value="1"></el-option>
							      <el-option label="0.00" value="2"></el-option>
							      <el-option label="0.000" value="3"></el-option>
							      <el-option label="0.0000" value="4"></el-option>
							   </el-select>
                     	 </td>                	                         
                    </tr>
                     <tr>
                    	 <td>传感器四</td>
                    	 <td><el-input :disabled="fouraisle" v-model="ChforHigh"></el-input></td>
                     	 <td><el-input :disabled="fouraisle" v-model="ChforLow"></el-input></td>
                    	 <td>
	                    	 <el-select v-model="ChforType" :disabled="fouraisle">
							      <el-option
							          v-for="item in  SensorOptions"  
							         :key='item.value'
							         :label='item.label'  
							         :value="item.value">
							        </el-option> 
							   </el-select>
							   <el-input class="UserDefined" placeholder="自定义" v-model="ChforUs" :disabled="fouraisle"></el-input>
                    	 </td>
                     	 <td>
	                     	  <el-select v-model="ChforDot" placeholder="小数点位" :disabled="fouraisle">
							      <el-option label="0.0" value="1"></el-option>
							      <el-option label="0.00" value="2"></el-option>
							      <el-option label="0.000" value="3"></el-option>
							      <el-option label="0.0000" value="4"></el-option>
							   </el-select>
                     	 </td>                	                         
                    </tr>
			 	</table>
	
			</div>
             <div class="AlarmTypeTime">
             	 <table cellpadding="0" cellspacing="0" border="1">
             	 	<tr>
			 			 <th class="lineSensing">报警类型</th>
                         <th>上班延时(分)</th>
                         <th>下班延时(分)</th>
                         <th>报警方式</th>
                         <th>报警连发(次)</th>
			 		</tr> 
			 		<tr>
			 			<td>超限报警</td>
			 			<td>
			 				<el-input v-model="LimitAlarmWorkDelay"></el-input>
			 			</td>
			 			<td>
			 				<el-input v-model="LimitAlarmOffDelay" ></el-input>
			 			</td>
			 			<td>
			 			 <el-select v-model="LimitAlarmType">
			 			 	      <el-option label="无报警" value="0"></el-option>
							      <el-option label="微信报警" value="1"></el-option>
							      <el-option label="邮箱报警" value="2"></el-option>
							      <el-option label="邮箱与微信" value="3"></el-option>
						 </el-select>
			 			</td>
			 			<td>
                            <el-input v-model="OverrunSendTheNumber"></el-input>
			 			</td>
			 		</tr>
			 		<tr>
			 			<td>掉线报警</td>
			 			<td>
			 				<el-input v-model="DisAlarmWorkDelay"></el-input>
			 			</td>
			 			<td>
			 				<el-input v-model="DisAlarmOffDelay" ></el-input>
			 			</td>
			 			<td>
			 			 <el-select v-model="DisAlarmType" >
			 			 	      <el-option label="无报警" value="0"></el-option>
							      <el-option label="微信报警" value="1"></el-option>
							      <el-option label="邮箱报警" value="2"></el-option>
							      <el-option label="邮箱与微信" value="3"></el-option>
						 </el-select>
			 			</td>
			 			<td>
                          <el-input v-model="LostConnectionSendTheNumber"></el-input>	
			 			</td>
			 		</tr>
             	 </table>
             </div>

		  <span slot="footer" class="dialog-footer">
		    <el-button @click="AddEquipmentDialog = false" size='mini'>取 消</el-button>
		    <el-button type="primary" @click="AddEquipmentSend" size='mini'>确 定</el-button>
		  </span>
		</el-dialog>
  </el-row>
</template>
<script>
	import{GetGroupData,UpdateGroupManage,InsertGroupManage,DeleteGroupManage,GetInstrumentData,DeleteLoggerInfo,GetLoggerInfoType,GetLoggerInfoWarehouseType,InsertLoggerInfo,GetInstrumentDataTop1,UpdateLoggerInfo,UpdateLoggerInfoState}from'@/api/api'
export default {
     data(){
         var checkLoggerSn =(rule, value,callback) =>{
         	if(value===''){
                 callback(new Error('请输入设备ID'));
         	  }
               callback();
            };
          var checkLoggerName =(rule, value,callback) =>{
         	if(value===''){
                 callback(new Error('请输入设名称'));
         	  }
               callback();
            };         
          var checksamplingInt =(rule, value,callback) =>{
         	if(value===''){
                 callback(new Error('请输入采样间隔时间'));
         	  }
               callback();
            };         
          var checkIntervalOfRecords =(rule, value,callback) =>{
         	if(value===''){
                 callback(new Error('请输入记录时间'));
         	  }
               callback();
            };         
          
      return{  
           //验证添加仪表提交的时候的表单
             AddEquipmentrules:{
             	LoggerSn:[{
             		  validator: checkLoggerSn, trigger: 'blur'
             	}],
             	LoggerName:[{
             		  validator: checkLoggerName, trigger: 'blur'
             		}],
             	samplingInt:[{
             		 validator: checksamplingInt, trigger: 'blur'
             	}],
             	IntervalOfRecords:[{
             		validator: checkIntervalOfRecords, trigger: 'blur'
             	}]
             },
              Gps:0,
      	      ChoneUs:'',//为8的时候用户自定义1
      	      ChtwoUs:'',//用户自定义2
      	      ChthrUs:'',//用户自定义3
      	      ChforUs:'',//用户自定义4
              LostConnectionSendTheNumber:0,//掉线报警次数
              OverrunSendTheNumber:0,//超限报警次数
              DisAlarmOffDelay:0,//掉线下班报警时间
      	      DisAlarmWorkDelay:0,//掉线上班报警时间
      	      LimitAlarmWorkDelay:0,//超线上班报警
      	      LimitAlarmOffDelay:0,//超线下班报警
      	      DisAlarmType:'0',//掉线报警类型
      	      LimitAlarmType:'0',//超线报警类型
      	      ChoneHigh:0,//通道一上下线.
      	      ChoneLow:0,
              ChtwoHigh:0,//通道2上下线.
              ChtwoLow:0,
              ChthrHigh:0,//通道3上下线.
              ChthrLow:0,
              ChforHigh:0,//通道4上下线.
              ChforLow:0,
      	      ChoneDot:'1',//通道1默认小数点
              ChtwoDot:'1',//通道2默认小数点
      	      ChforDot:'1',//通道四小数点
              ChthrDot:'1',//通道三小数点
      	      ChoneType:'0',//通道1默认下拉传值
      	      ChtwoType:'0',//通道2默认下拉传值
      	      ChthrType:'0',//通道3下拉传值
      	      ChforType:'0',//通道4
      	      twoaisle:false,//2通道
              fouraisle:true,//4通道
      	      threeaisle:true,//3通道
              MediaType:[],//设备类型
              IntrumentType:[],//仪器类型接受数组
               isAdd:true,
               SensorOptions:[
                   {
                   	value:'0',
                   	label:'温度(°C)'
                   },
                   {
                   	value:'1',
                   	label:'湿度(%RH)'
                   },
                    {
                   	value:'2',
                   	label:'CO2(PPM)'
                   },
                   {
                   	value:'3',
                   	label:'大气压力(MPa)'
                   },
                   {
                   	value:'4',
                   	label:'光照强度单位(Lux)'
                   },
                   {
                   	value:'5',
                   	label:'华氏温度(°F)'
                   },
                   {
                   	value:'6',
                   	label:'开关量(I/O)'
                   },
                   {
                   	value:'7',
                   	label:'差压(Pa)'
                   },
                   {
                   	value:'8',
                   	label:'用户定义'
                   },
                   {
                   	value:'9',
                   	label:'VOC(mg/m³)'
                   },
                   {
                   	value:'10',
                   	label:'甲醛(mg/m³)'
                   },
                   {
                   	value:'11',
                   	label:'PM2.5(ug/m³)'
                   },
                   {
                   	value:'12',
                   	label:'PM10(ug/m³)'
                   },
                   {
                   	value:'13',
                   	label:'UV(uw/m²)'
                   },
               ],
      	        formInline: {
                    LoggerSn:'',//设备Id
                    LoggerName:'',//设备名称
                    GroupId:100,//分区名称ID
                    samplingInt:'60',//采样间隔
                    IntervalOfRecords:'60',//记录间隔
                    PosPageno:'1', //设备类型的值
                    VerId:'1',//仪器类型
                    LoggerChnum:'2',//通道数.
					        },
			     groupNameSeach:'',
      	         AddEquipmentDialog:false,//添加设备显示,
      	         SeachPartation:'',//搜索分区值
                 Switchvalue:null,//设备显示开关
      	         DataChannel:[],//显示多个通道的数据显示;
                 pageIndex:1,
                 pageSize:6,
                 totalNumber:null,
                 groupName:'',
                 loggerInfoState:'',//
      	         EquipmentList:[],//表格显示存放数据 
      	         Id:'',
      	         SelectDelete:null,//选中删除
                 ruleszone:{
                 name:[
                    { required: true, message: '请填写分区名称', trigger: 'blur' }
                    ]
                },
                Rulepartition:{//分区名称
                 	name:''
                 }, 
                 AddDialogVisible: false,
      	         EditIcon:true,//编辑的图标
                 EditSend:false,//编辑时候发送显示按钮
	      	     readtrue:true,//刚进入页面的时候不能修改.需要点击修改的图标,
	             PositionList:[],//分区显示.
                 radio2:[],
              }  
     	   },
     	  methods:{
	          PartitionRequest(){//用户分区列表显示
	          	 var params={
	          	 	groupName:this.groupNameSeach
	          	 }
	        	GetGroupData(params).then(res=>{
	        		 if(res.State==1){
                          for(let item of res.Data){
                          	 this.PositionList.push(item)
                          	  item.EditIcon=true;
                          	  item.readtrue=true;
                            }
		        		 }
	        	})         
              },
              EditPartion(index){//编辑修改分区名称,
                  this.PositionList[index].readtrue=false;//可以编辑
                  this.PositionList[index].EditSend=true;//编辑时候的按钮显示*/
                   this.PositionList[index].EditIcon=false;//编辑的图标隐藏*/
              },
           
             Addsend(){
                  var group={
                  	   GroupName:this.Rulepartition.name
                  }
                this.$refs["Rulespartition"].validate((valid) =>{
                     if(valid){
                    InsertGroupManage(group).then(res=>{
	                	 console.log(res)
                         if(res.State==1){
                             this.AddDialogVisible=false;
                             this.$message({
                             	type:'success',
                             	message:'添加成功'
                             })
                              this.$refs["Rulespartition"].resetFields()//清除验证格式
                              this.GetEquipmentList()//刷新列表.
                         }else{
                         	this.$message({
                         		type:'error',
                         		message:'添加失败'
                         	})
                         }
                       })
                    }
                })
             },
             DeletePartition(val){//左侧选中
             	 console.log("仪器ID")
             	console.log(val)
             	console.log(this.SelectDelete)
             },
            DelectZone(){
            	var group={
            		Id:this.SelectDelete
            	}
            	DeleteGroupManage(group).then(res=>{
                             if(res.State==1){
                             	this.$message({
                             		type:'success',
                             		message:'删除成功'
                             	})
                             	this.PartitionRequest()//刷新一次列表下显示.
                             }else{
                             	this.$message({
                             		type:'error',
                             		message:'删除失败'

                             	})
                             }
            	})
            }, 
            handleSelectionChange(val) {//设备删除的全选
		        this.multipleSelection = val;
		         console.log(this.multipleSelection)
		      },
             GetEquipmentList(){//设备列表请求
             	  this.EquipmentList=[]//调用前清空
                  var params={
                  	 condition:this.SeachPartation,
                  	 groupId:this.SelectDelete,
                  	 pageIndex:this.pageIndex,
                  	 pageSize:this.pageSize,
                  }
               GetInstrumentData(params).then(res=>{
	                for(let item of res.Data){
	                    this.totalNumber=res.Data.length;//总条数.
	                    /*item.LoggerState = item.LoggerState == 1 ? true : false;*/
	                    if(item.LoggerState == 1){
	                    	item.LoggerState=true
	                    }else{
	                    	item.LoggerState=false
	                    }
                        this.EquipmentList.push(item) 
	                 } 
                  }) 
             },
             EditZoning(index){//分区编辑,
             	 var  group={
             	 	Id:this.SelectDelete,//
             	 	GroupName:this.PositionList[index].GroupName
             	 }
               UpdateGroupManage(group).then(res=>{
                           if(res.State==1){
                                this.$message({
                                	type:'success',
                                	message:'修改成功'
                                })
                               this.PartitionRequest()//刷新列表
                           }else{
                           	  this.$message({
                           	  	type:'error',
                           	  	message:'修改失败'
                           	  })
                           }
                })   
             },
             swicthFacility(index,val){//设置仪器开关按钮
             	 if (val==false) {
             	        this.loggerInfoState=2
             	 }else{
             	 	  this.loggerInfoState=1 
             	 }
              console.log(this.loggerInfoState)
              var params =  {
                     loggerInfoState:this.loggerInfoState,
                     loggerInfoSn:this.EquipmentList[index].LoggerSn
              }
                UpdateLoggerInfoState(params).then(res=>{
                        if(res.State){
                        	this.$message({
                        		type:'success',
                        		message:'设置成功'

                        	})
                        }else{
                        	this.$message({
                        		type:'error',
                        		message:'设置失败'
                        	})
                        }
                })
             },
             pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
             	console.log("页码")
             	console.log(pageIndex)
	             this.pageIndex = pageIndex;//传当前页面   
	             this.GetEquipmentList()// 列表刷新.
	           },
             BatchRemove(){//批量删除
             	var  listlLoggerInfos={
                      listlLoggerInfos:this.multipleSelection
             	};
                 
               DeleteLoggerInfo(listlLoggerInfos).then(res=>{
               	console.log("批量删除")
                         console.log(listlLoggerInfos)
                         if(res.State==1){
                         	 this.$message({
                         	 	type:'success',
                         	 	message:'删除成功'
                         	 })
                             this.EquipmentList=[];
                            this.GetEquipmentList()//刷新
                         }else{
                            this.$message({
                         	 	type:'error',
                         	 	message:'删除失败'
                         	 })
                         }
               }) 
             },
             AddDevice(){//添加设备
                   this.AddEquipmentDialog=true;
                    this.isAdd=true;
                   console.log("添加")
             },
             GetInstrumentType(){//仪器类型列表显示.
             	GetLoggerInfoType().then(res=>{
                     this.IntrumentType=res.Data
                     console.log("仪器类型列表显示")
                     console.log(this.IntrumentType)
             	})
             },
             GPSSelect(val){//有没有选中GPs
                   console.log(Number(val))
                 console.log(this.Gps)
                 this.Gps=val
             },
             DeviceType(){//设备类型下拉
                  GetLoggerInfoWarehouseType().then(res=>{
                  	   this.MediaType=res.Data
                  })  
             },
           AddEquipmentSend(){//点击的新增仪器仪器
                   var loggerInfo={
		                   LoggerSn:this.formInline.LoggerSn,//设备Id
		                   LoggerName:this.formInline.LoggerName,//设备名称
		                   GroupId:this.formInline.GroupId,//分区名称ID
		                   samplingInt:this.formInline.samplingInt,//采样间隔
		                   IntervalOfRecords:this.formInline.IntervalOfRecords,//记录间隔
		                   PosPageno:this.formInline.PosPageno, //设备类型的值
		                   VerId:this.formInline.VerId,//仪器类型
		                   LoggerChnum:this.formInline.LoggerChnum,//通道数.
			               Gps:Number(this.Gps),
			      	      ChoneUs:this.ChoneUs,//为8的时候用户自定义1
			      	      ChtwoUs:this.ChtwoUs,//用户自定义2
			      	      ChthrUs:this.ChthrUs,//用户自定义3
			      	      ChforUs:this.ChforUs,//用户自定义4
			              LostConnectionSendTheNumber:this.LostConnectionSendTheNumber,//掉线报警次数
			              OverrunSendTheNumber:this.OverrunSendTheNumber,//超限报警次数
			              DisAlarmOffDelay:this.DisAlarmOffDelay,//掉线下班报警时间
			      	      DisAlarmWorkDelay:this.DisAlarmWorkDelay,//掉线上班报警时间
			      	      LimitAlarmWorkDelay:this.LimitAlarmWorkDelay,//超线上班报警
			      	      LimitAlarmOffDelay:this.LimitAlarmOffDelay,//超线下班报警
			      	      DisAlarmType:this.DisAlarmType,//掉线报警类型
			      	      LimitAlarmType:this.LimitAlarmType,//超线报警类型
			      	      ChoneHigh:this.ChoneHigh,//通道一上下线.
			      	      ChoneLow:this.ChoneLow,
			              ChtwoHigh:this.ChtwoHigh,//通道2上下线.
			              ChtwoLow:this.ChtwoLow,
			              ChthrHigh:this.ChthrHigh,//通道3上下线.
			              ChthrLow:this.ChthrLow,
			              ChforHigh:this.ChforHigh,//通道4上下线.
			              ChforLow:this.ChforLow,
			      	      ChoneDot:this.ChoneDot,//通道1默认小数点
			              ChtwoDot:this.ChtwoDot,//通道2默认小数点
			      	      ChforDot:this.ChforDot,//通道四小数点
			              ChthrDot:this.ChthrDot,//通道三小数点
			      	      ChoneType:this.ChoneType,//通道1默认下拉传值
			      	      ChtwoType:this.ChtwoType,//通道2默认下拉传值
			      	      ChthrType:this.ChthrType,//通道3下拉传值
			      	      ChforType:this.ChforType,//通道4
                   }
      if(this.isAdd){
            this.EquipmentList=[];
           this.$refs['AddEquipmentForm'].validate((valid) => {
               if (valid) {
               	   InsertLoggerInfo(loggerInfo).then(res=>{
               	   	       console.log(res)
               	   	       console.log(loggerInfo)
                       if(res.State==1){
                        	this.$message({
                        		type:'success',
                        		message:'仪器创建成功'
                        	})
                          this.$refs['AddEquipmentForm'].resetFields();
                          this.AddEquipmentDialog=false;
                          this.GetEquipmentList()//刷新
                        }else if(res.State==0) {
                             this.$message({
                        		type:'error',
                        		message:'仪器序列号重复'
                        	})
                        }
           	     }) 
               }
           })
           }else{
           	      this.EquipmentList=[];
            this.$refs['AddEquipmentForm'].validate((valid) => {
               if (valid) {
               	   UpdateLoggerInfo(loggerInfo).then(res=>{
               	   	       console.log("编辑")
               	   	       console.log(res)
               	   	       console.log(loggerInfo)
                       if(res.State==1){
                        	this.$message({
                        		type:'success',
                        		message:'仪器编辑成功'
                        	})
                          this.$refs['AddEquipmentForm'].resetFields();
                          this.AddEquipmentDialog=false;
                          this.GetEquipmentList()//刷新
                        }
           	     }) 
               }
           })
           }
          },
          AddEquipmentDialogClose(val){//关闭清空原来的值,
          	console.log("关闭")
          	console.log(val)
                this.formInline={
                    LoggerSn:'',//设备Id
                    LoggerName:'',//设备名称
                    GroupId:100,//分区名称ID
                    samplingInt:'60',//采样间隔
                    IntervalOfRecords:'60',//记录间隔
                    PosPageno:'1', //设备类型的值
                    VerId:'1',//仪器类型
                    LoggerChnum:'2',//通道数.
					        }
              this.Gps=0,
      	      this.ChoneUs='',//为8的时候用户自定义1
      	      this.ChtwoUs='',//用户自定义2
      	      this.ChthrUs='',//用户自定义3
      	      this.ChforUs='',//用户自定义4
              this.LostConnectionSendTheNumber=0,//掉线报警次数
              this.OverrunSendTheNumber=0,//超限报警次数
              this.DisAlarmOffDelay=0,//掉线下班报警时间
      	      this.DisAlarmWorkDelay=0,//掉线上班报警时间
      	      this.LimitAlarmWorkDelay=0,//超线上班报警
      	      this.LimitAlarmOffDelay=0,//超线下班报警
      	      this.DisAlarmType='0',//掉线报警类型
      	      this.LimitAlarmType='0',//超线报警类型
      	      this.ChoneHigh=0,//通道一上下线.
      	      this.ChoneLow=0,
              this.ChtwoHigh=0,//通道2上下线.
              this.ChtwoLow=0,
              this.ChthrHigh=0,//通道3上下线.
              this.ChthrLow=0,
              this.ChforHigh=0,//通道4上下线.
              this.ChforLow=0,
      	      this.ChoneDot='1',//通道1默认小数点
              this.ChtwoDot='1',//通道2默认小数点
      	      this.ChforDot='1',//通道四小数点
              this.ChthrDot='1',//通道三小数点
      	      this.ChoneType='0',//通道1默认下拉传值
      	      this.ChtwoType='0',//通道2默认下拉传值
      	      this.ChthrType='0',//通道3下拉传值
      	      this.ChforType='0',//通道4
      	      this.twoaisle=false,//2通道
              this.fouraisle=true,//4通道
      	      this.threeaisle=true//3通道
          },
	     EditFacility(index){//点击编辑的时候.找到对应的饿编辑参数
	     	          this.AddEquipmentDialog=true;
	     	          this.isAdd=false;
	     	          console.log(this.isAdd)
	     	          console.log("bianji")
                     var params={
                     	  loggerSn:this.EquipmentList[index].LoggerSn
                     }
               GetInstrumentDataTop1(params).then(res=>{
               	           console.log(res)
                      switch(res.Data[0].LoggerChnum.toString()){
		                    case '1':
		                        this.twoaisle=true,
		      	                this.threeaisle=true,
		                        this.fouraisle=true
		      	                break;
		      	            case '2':
		      	                this.twoaisle=false,
		                        this.fouraisle=true,
		      	                this.threeaisle=true
		      	                break;	
		      	            case '3':
			      	              this.twoaisle=false,
			      	              this.threeaisle=false,
			                      this.fouraisle=true
		                      break;
		                      case '4':
			                      this.twoaisle=false,
			                      this.threeaisle=false,
			                      this.fouraisle=false
		                      break;
                      }
                  		  this.formInline.LoggerSn=res.Data[0].LoggerSn;//设备Id
		                  this.formInline.LoggerName=res.Data[0].LoggerName;//设备名称
		                  this.formInline.GroupId=res.Data[0].GroupId;//分区名称ID
		                  this.formInline.samplingInt=res.Data[0].SamplingInt;//采样间隔 samplingInt
		                  this.formInline.IntervalOfRecords=res.Data[0].IntervalOfRecords;//记录间隔
		                  this.formInline.PosPageno=String(res.Data[0].PosPageno); //设备类型的值
		                  this.formInline.VerId=String(res.Data[0].VerId);//仪器类型
		                  this.formInline.LoggerChnum=String(res.Data[0].LoggerChnum);//通道数.
			              this.Gps=Boolean(res.Data[0].Gps);
			      	      this.ChoneUs=res.Data[0].ChoneUs;//为8的时候用户自定义1
			      	      this.ChtwoUs=res.Data[0].ChtwoUs;//用户自定义2
			      	      this.ChthrUs=res.Data[0].ChthrUs;//用户自定义3
			      	      this.ChforUs=res.Data[0].ChforUs;//用户自定义4
			              this.LostConnectionSendTheNumber=res.Data[0].LostConnectionSendTheNumber;//掉线报警次数
			              this.OverrunSendTheNumber=res.Data[0].OverrunSendTheNumber;//超限报警次数
			              this.DisAlarmOffDelay=res.Data[0].DisAlarmOffDelay;//掉线下班报警时间
			      	      this.DisAlarmWorkDelay=res.Data[0].DisAlarmWorkDelay;//掉线上班报警时间
			      	      this.LimitAlarmWorkDelay=res.Data[0].LimitAlarmWorkDelay;//超线上班报警
			      	      this.LimitAlarmOffDelay=res.Data[0].LimitAlarmOffDelay;//超线下班报警
			      	      this.DisAlarmType=res.Data[0].DisAlarmType;//掉线报警类型
			      	      this.LimitAlarmType=res.Data[0].LimitAlarmType;//超线报警类型
			      	      this.ChoneHigh=res.Data[0].ChoneHigh;//通道一上下线.
			      	      this.ChoneLow=res.Data[0].ChoneLow;
			              this.ChtwoHigh=res.Data[0].ChtwoHigh;//通道2上下线.
			              this.ChtwoLow=res.Data[0].ChtwoLow;
			              this.ChthrHigh=res.Data[0].ChthrHigh;//通道3上下线.
			              this.ChthrLow=res.Data[0].ChthrLow;
			              this.ChforHigh=res.Data[0].ChforHigh;//通道4上下线.
			              this.ChforLow=res.Data[0].ChforLow;
			      	      this.ChoneDot=String(res.Data[0].ChoneDot);//通道1默认小数点
			              this.ChtwoDot=String(res.Data[0].ChtwoDot);//通道2默认小数点
			      	      this.ChforDot=String(res.Data[0].ChforDot);//通道四小数点
			              this.ChthrDot=String(res.Data[0].ChthrDot);//通道三小数点
			      	      this.ChoneType=String(res.Data[0].ChoneType);//通道1默认下拉传值
			      	      this.ChtwoType=String(res.Data[0].ChtwoType);//通道2默认下拉传值
			      	      this.ChthrType=String(res.Data[0].ChthrType);//通道3下拉传值
			      	      this.ChforType=String(res.Data[0].ChforType);//通道4 */     
                })
	       },
         DelectFacility(index){//仪器删除
          var  LoggerInfos={
                      LoggerSn:this.EquipmentList[index].LoggerSn,
                      LoggerName:this.EquipmentList[index].LoggerName
                    };
             var listlLoggerInfos={
                      listlLoggerInfos:[LoggerInfos]
             }
         DeleteLoggerInfo(listlLoggerInfos).then(res=>{
                       if(res.State==1){
                         	 this.$message({
                         	 	type:'success',
                         	 	message:'删除成功'
                         	 })
                             this.EquipmentList=[];
                            this.GetEquipmentList()//刷新
                         }else{
                            this.$message({
                         	 	type:'error',
                         	 	message:'删除失败'
                         	 })
                         }
               }) 
          },
          Sensorquantity(val){//传感器数量选择显示
                switch(val){
                	case '1':
                        this.twoaisle=true,
      	                this.threeaisle=true,
                        this.fouraisle=true
      	                break;
      	            case '2':
      	                this.twoaisle=false,
                        this.fouraisle=true,
      	                this.threeaisle=true
      	                break;	
      	            case '3':
	      	              this.twoaisle=false,
	      	              this.threeaisle=false,
	                      this.fouraisle=true
                      break;
                     case '4':
	                      this.twoaisle=false,
	                      this.threeaisle=false,
	                      this.fouraisle=false
                     break;
                }     
             },
     	   },
          mounted(){
          	    var _this=this;
                this.PartitionRequest()///钩子函数
                this.GetEquipmentList()//列表请求.
                this.GetInstrumentType()//仪器类型接口请求
                this.DeviceType()//设备类型下拉列表,
/*                  $(window).keyup(function(ev){//enetr键快捷搜
                         if(ev.keyCode == 13){
                         	 _this.EquipmentList=[];
                            _this.GetEquipmentList()//列表请求.
                        }
                     })*/
          }
    }
</script>
<style lang="scss" scoped>
  .SystemManagement{
         height: calc(100% - 40px);
         background: #eaedf1;
    .CurrentPosition{
    		height: 40px;
    		background:#f7f7f7; 
    		.NowPositon{
              line-height: 40px;
              margin-left: 15px;
    		}
    	}
      .SystemManagementCoent{
      	     height: calc(100% - 60px);
              padding: 20px;
              margin: 20px;
              background: #fff;
		     .lightZone {
				    height: calc(100% - 60px);
				    background:#eeeeee;
				    overflow-y: scroll;
				    .AreaSearch{
                            padding: 20px;
				    }
				    .AddPartition{
                        padding: 0px 20px;
                        margin-bottom: 20px;
				    } 
				    .Selectpatation{
				    	margin-left: 20px;
				    	.el-form-item {
							     margin-bottom: 0px; 
							}
				    	i{
				    		color: #0890e6;
				    		margin-left: 50px;
				    	}
				    }
				  }
				}
      .fa-pencil-square-o{
      	vertical-align: middle;
      }	 
      .AddEquipments{
      	padding: 20px;
      } 
      .SearchAreaSearch{
      	display: inline-block;
      	margin-left:50%;
      }
      .myPagination{
      	text-align: center;
      	 margin-top: 20px;
      }
      .lineSensing{
      	width: 100px;
      }
      table{
      	text-align: center;
      }
      .AlarmTypeTime{
      	margin-top: 20px;
      }
     .InstrumentIndication{
            margin-bottom: 20px;
     }
     	 .fa {
	     	cursor: pointer;
	     	margin-right: 9px;
	     }
	  .EquipmentsTable{
      	  i{
      	  	color: #0890e6;
      	  }  
      }
      .bg-purple-right{
      	margin-left: 40px;
      }
      .hr{
      	height:1px;
      	border:none;
      	border-top:1px solid #d7d7d7;
      	margin-top: 8px;
      	margin-bottom: 8px;
      }
      .el-radio__label{
      	 .el-input{
      	 	width: 222px;
      	 }
      }

   }
</style>
<style type="text/css" >
     .el-icon-search{
        	color:#0890e6;
        }
    .EquipmentsTable .cell{
		      	text-align: center;

		      }
   .el-checkbox .el-checkbox__label{
     	vertical-align: middle;
     }
     .AreaSearch  .el-input__inner{
        	border-radius: 20px;  
        }

     .IntrumentType  .el-input__inner{
      	width: 200px;
      }
      .SensorParameter  .el-input__inner{
      	width: 200px;
      }
    .UserDefined{
      	display: inline;
      	width: 60px;
      }
       .UserDefined .el-input__inner{
      	 	width: 60px;
      	 	display: inline;
      }
      .SearchAreaSearch .el-input__inner{
      	  border-radius: 20px;
      }
</style>