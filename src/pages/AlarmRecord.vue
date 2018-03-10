<template>
  <el-row  class="AlarmRecord">
     <el-row>
		    <el-col :span='24'>
			    <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon">
			        	<i class="el-icon-location"></i>
			        	<span>当前位置:</span>
			        	<i class="el-icon-arrow-right">实时监控</i>
			        	<i class="el-icon-arrow-right"> <span class="currentcolor">报警记录</span></i>
			        </div> 
			      </el-col>
			   </el-row>
		   </el-col>
	  </el-row> 
       <el-row>
       	  <el-col :span='24'>
       	    <div class="Search">
             <el-form :inline="true"  class="demo-form-inline" size="small">
						  <el-form-item label="分区:">
						    <el-select v-model="AllZoneName" placeholder="选择分区" @change="SelectedPartition">
                     <el-option
                      v-for="item in AllZone"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                     </el-option>
						    </el-select> 
						  </el-form-item>
						  <el-form-item label="设备:">
						    <el-select v-model="AllEquipmentName" placeholder="选择设备"> 
                    <el-option
                      v-for="item in AllEquipment"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                     >
                     </el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item label="报警方式:">
						    <el-select v-model="alarmType" placeholder="选择报警方式">
                      <el-option label="微信" value="1"></el-option>
     								  <el-option label="邮箱" value="2"></el-option>
						    </el-select>
						  </el-form-item>
                  <el-form-item label="时间段:">
                     <div class="Alarmblock">
    								    <el-date-picker
    								          value-format="yyyy-MM-dd HH:hh:mm"
    								          @change="AlarmInquireval"
    									        type="datetimerange"
    									        v-model="valuetime"
    									        range-separator="至"
    									        start-placeholder="开始日期"
    									        end-placeholder="结束日期">
    								    </el-date-picker>
    								</div>
                  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="queryData" >查询</el-button>
    					</el-form-item>
              <el-form-item>
    						    <el-button type="primary" size="small" class="ExportData" @click="ExportDataAlarm">导出数据</el-button>
    					</el-form-item>
    					</el-form>
       	    	</div>
       	    </el-col>
       </el-row>
       <el-row class="FwAlarmTable"> 
              <el-row class="Pagination">
                 <el-col :span='24'>
                     <el-table
        					     :data="AlarmtableData"
        					      border
        					    style="width: 100%">
                      <el-table-column
                        label="序号"
        					      type="index"
        					      width="50">
        					    </el-table-column>
        					    <el-table-column
        					      prop="LoggerName"
        					      label="仪器名称"
        					      width="280">
        					    </el-table-column>
                      <el-table-column
                        prop="GroupName"
                        label="分区名称"
                       >
                      </el-table-column>
        					    <el-table-column
        					      prop="AlarmDescrIption"
        					      label="预警内容"
        					     >
        					    </el-table-column>
        					    <el-table-column
        					      width="200"
        					      label="状态">
                       <template  slot-scope="scope">
                         <span class="untreated" v-if='AlarmtableData[scope.$index].AlarmState == 1'>未处理</span>
                         <span class="processed" v-else-if='AlarmtableData[scope.$index].AlarmState == 2'>已处理</span>
                       </template>
        					    </el-table-column>
        					    <el-table-column
        					      prop="AlarmAction"
        					      label="处理措施">
        					    </el-table-column>
                      <el-table-column
        					      width="200"
        					      label="操作" >
                      <template slot-scope="scope">
                       <el-button type="primary" size="small" @click="Handle(scope.$index)">处理</el-button>
                      </template>
        					    </el-table-column>
        				  </el-table>
                 </el-col>   
              </el-row>
             <el-col :span="24">
                  <div class="myPagination">
                      <el-pagination
                        background
                        layout="prev, pager, next,  total"
                        :total="totalNumber" 
                        :current-page='pageIndex'
                        :page-size='pageSize'
                        @current-change='pageIndexChange'>
                      </el-pagination>
                 </div>
             </el-col>
       </el-row>
  <el-row>
     <el-col :span='24' class="ProcessedDialog">
         <el-dialog
            title="处理"
            :visible.sync="ProcessedDialogVisible"
            width="30%"
            center>
             <el-form :model="DisposeValidateForm"  ref="DisposeValidateForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item
                     label='处理措施'
                     prop='Method'
                     :rules="[
                        {required: true, message: '处理方法不能为空'}
                        ]"
                      >
                    <el-input type="textarea" v-model='DisposeValidateForm.Method'  auto-complete="off"  size="medium"></el-input>
                  </el-form-item>
             </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="ProcessedDialogVisible = false" size="small">取 消</el-button>
              <el-button type="primary" size="small" @click="SubmitForm('DisposeValidateForm')">确 定</el-button>
            </span>
          </el-dialog>
     </el-col>
   </el-row> 
  </el-row>
</template>
<script>
     import{GetGroupAndLogger,GetAlarmRecordData,UpdateAlarmState,ExportAlarmRecordDataPdf}from'@/api/api'
     import qs from 'qs';
export default {
        data(){
        	return{
             DisposeValidateForm:{//验证方法
                  Method:''
               },
			       AllZoneName:'',
			       AllZone:[],//所有分区显示
			       AllEquipment:[],//所有设备显示
			       AllEquipmentName:'',
			       AlarmTime:[],
			       valuetime:'',
			       AlarmtableData:[],//报警数据
             pageIndex:1,//当前页码
             pageSize:10,// 每页显示的条数
             totalNumber:null,//总条数 
             ProcessedDialogVisible:false,
             alarmAction:'',//处理方法
             alarmCode:'',//处理报警的编码
             alarmType:'',
        	}
        },
        methods:{
              
           PartitionDisplay(){
                  GetGroupAndLogger().then(res=>{
                        for(let i=0;i<res.length;i++){
			                      	 this.AllZone.push({
			                      	 	 label:res[i].GroupName,
			                      	 	 value:res[i].Id,
                                 ListLoggerInfo:res[i].ListLoggerInfo
			                      	 })
                     	    for(let k=0;k<res[i].ListLoggerInfo.length;k++){
                                 this.AllEquipment.push({
                                 	   label:res[i].ListLoggerInfo[k].LoggerName,
                                 	   value:res[i].ListLoggerInfo[k].LoggerSn
                                   })   
                      	      }
                          }
                     }) 
            },
            SelectedPartition(val){
                 for(var i=0;i<this.AllZone.length;i++){
                      if(val==this.AllZone[i].value){
                          this.AllEquipmentName="";//清空设备页面显示的值
                          this.AllEquipment=[];//选择分区的时候,清空设备
                            for(var k=0;k<this.AllZone[i].ListLoggerInfo.length;k++){
                               this.AllEquipment.push({
                                       label:this.AllZone[i].ListLoggerInfo[k].LoggerName,
                                       value:this.AllZone[i].ListLoggerInfo[k].LoggerSn
                                })   
                             }
                        } 
                 }
            },
            GetAlarmRecordDataList(){
              this.AlarmtableData=[];
                  var params={
                         pageIndex:this.pageIndex,
                         pageSize:this.pageSize,
                         groupId:this.AllZoneName,
            						 loggerInfoSn:this.AllEquipmentName,
            						 alarmType:this.alarmType,
            						 staDate:this.AlarmTime[0],
            						 endDate:this.AlarmTime[1],    
                  }
               GetAlarmRecordData(params).then(res=>{
                     this.totalNumber=res.TotalNumber
                    for(let item of res.Data ){
                         this.AlarmtableData.push(item) 
                       }
                })
             },
           queryData(){//点击查询
                this.GetAlarmRecordDataList()   
            },
           SubmitForm(formName){
                var params={
                    alarmAction:this.DisposeValidateForm.Method,
                    alarmCode:this.alarmCode
                }
                 this.$refs[formName].validate((valid) => {
               if (valid) {
                    UpdateAlarmState(qs.stringify(params)).then(res=>{
                              if(res.State==1){
                                   this.$message({
                                       type:'success',
                                       message:"提交成功"
                                   })
                                   this.ProcessedDialogVisible=false;//弹框显示 
                                   this.GetAlarmRecordDataList()//刷新列表
                                  }else{
                                      this.$message({
                                         type:'error',
                                         message:"提交失败"
                                      })
                                  } 
                          })                           
                      } 
                  });
             },
            Handle(index){
                  this.ProcessedDialogVisible=true;//弹框显示
                  this.alarmCode=this.AlarmtableData[index].AlarmId;
                },
            pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
               this.pageIndex = pageIndex;//传当前页面   
               this.GetAlarmRecordDataList()//刷新列表
             },


           AlarmInquireval(val){//登录时候查询的
               console.log(val)
          	 if (val==null) {
                  this.AlarmTime[0]=undefined;
                  this.AlarmTime[1]=undefined;
          	 }else{
               this.AlarmTime=val;
               }
          },
          ExportDataAlarm(){//导出报警数据
               var params={
                     staDate:this.AlarmTime[0],
                     endDate:this.AlarmTime[1],
                     loggerInfoSn:this.AllEquipmentName
               }

             ExportAlarmRecordDataPdf(params).then(res => {
                      if(res.State==1){
                         console.log(res)
                        /* window.open(res.State)*/
                      }else{
                         this.$message({
                             type:'error',
                             message:'导出数据失败'
                         })
                      }
                         
              })

          },



        },
        mounted(){
              this.PartitionDisplay()//分区联动请求显示,
              this.GetAlarmRecordDataList()//列表显示
        },

}
</script>
<style lang="scss" scoped>
       .AlarmRecord{
            height: calc(100% - 10px);
            background: #eaedf1;
         .CurrentPosition{
		    		height: 40px;
		    		background:#f7f7f7; 
		    .NowPositon{
		              line-height: 40px;
		              margin-left: 15px;
		    		}
		     } 
       .Pagination{
          height: calc(100% - 40px);
              background: #fff;
         }
        .Search{
        	 height: 35px;
        }
        .demo-form-inline{
        	margin-top: 15px;
            padding-left: 15px;
        }
        .ExportData{
           margin-left: 20px;
        }
        .has-gutter{
            background: red ! important;
        }
        .FwAlarmTable{
        	  height: calc(100% - 124px);
              padding: 20px;
              margin: 20px;
              background: #fff;
        }
       .untreated{
           color: red;
        }
        .processed{
           color: #008ce5;
        }
         .myPagination{
            text-align: center;
          }

 
       }
</style>
<style type="text/css">
	 .Search  .el-input__inner{
	 	  width: 150px;
	 }
     .Alarmblock .el-input__inner{
     	width: 347px;
     }
   .ProcessedDialog .el-dialog__body{
               text-align: initial;
              padding: 7px 27px 2px;
   }
    .Pagination .cell{
       text-align: center;
    }

</style>
