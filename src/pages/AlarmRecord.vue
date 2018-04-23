<template>
  <el-row  class="AlarmRecord">
     <el-row>
		    <el-col :span='24'>
			    <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon">
			        	<i class="el-icon-location"></i>
			        	<span>{{$t('m.Location')}}</span>
			        	<i class="el-icon-arrow-right">{{$t('m.DataCentre')}}</i>
			        	<i class="el-icon-arrow-right"> <span class="currentcolor">{{$t('m.AlarmRecord')}}</span></i>
			        </div> 
			      </el-col>
			   </el-row>
		   </el-col>
	  </el-row> 
       <el-row>
       	  <el-col :span='24'>
       	    <div class="Search">
             <el-form :inline="true"  class="demo-form-inline" size="small" label-width="100px" >
						  <el-form-item :label="$t('m.SiteName')">
						    <el-select v-model="AllZoneName"  :placeholder="$t('m.Selectarea')" @change="SelectedPartition">
                     <el-option
                      v-for="item in AllZone"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                     </el-option>
						    </el-select> 
						  </el-form-item>
						  <el-form-item :label="$t('m.Device')">
						    <el-select v-model="AllEquipmentName" :placeholder="$t('m.SelectDevice')"> 
                    <el-option
                      v-for="item in AllEquipment"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                     >
                     </el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item :label="$t('m.alarmmeans')">
						    <el-select v-model="alarmType" :placeholder="$t('m.alarmmeans')">
                      <el-option :label="$t('m.ALL')" value=""></el-option>
                      <el-option :label="$t('m.WeChat')" value="1"></el-option>
     								  <el-option :label="$t('m.Emaial')" value="2"></el-option>

						    </el-select>
						  </el-form-item>
                  <el-form-item :label="$t('m.TimePeriod')">
                     <div class="Alarmblock">
    								    <el-date-picker
    								         value-format="yyyy-MM-dd HH:mm:ss"
    									        type="datetimerange"
                               @change='changeHistoryDate'
    									         v-model="valueTime"
    									        range-separator="至"
                              :picker-options="pickerOptions2"
    									        :start-placeholder="$t('m.StartTime')"
    									        :end-placeholder="$t('m.EndTime')">
    								    </el-date-picker>
    								</div>
                  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="queryData" >{{$t('m.Search')}}</el-button>
    					</el-form-item>
              <el-form-item>
    						    <el-button type="primary" size="small" class="ExportData" @click="ExportDataAlarm">{{$t('m.ExportPDF')}}</el-button>
    					</el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" class="ExportData" @click="ExportExecl">{{$t('m.ExportExcel')}}</el-button>
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
                        v-loading="loading"
                        element-loading-text="Loading"
                        element-loading-spinner="el-icon-loading"
        					      style="width: 100%">
                      <el-table-column
                        :label="$t('m.Number')"
        					      type="index"
        					      width="50">
        					    </el-table-column>
        					    <el-table-column
        					      prop="LoggerName"
        					      :label="$t('m.DeviceName')"
        					       width="180">
        					    </el-table-column>
                      <el-table-column
                        prop="GroupName"
                        width='180'
                        :label="$t('m.SiteName')"
                       >
                      </el-table-column>
                    <el-table-column
                        prop="AlarmUser"
                        width='180'
                        :label="$t('m.AlarmUser')"
                       >
                      </el-table-column>
        					    <el-table-column
        					      prop="AlarmDescrIption"
        					      :label="$t('m.AlarmText')"
        					     >
        					    </el-table-column>
        					    <el-table-column
        					      width="80"
        					      :label="$t('m.Status')">
                       <template  slot-scope="scope">
                         <span class="untreated" v-if='AlarmtableData[scope.$index].AlarmState == 1'>{{$t('m.untreated')}}</span>
                         <span class="processed" v-else-if='AlarmtableData[scope.$index].AlarmState == 2'>{{$t('m.processed')}}</span>
                       </template>
        					    </el-table-column>
        					    <el-table-column
        					      prop="AlarmAction"
        					      :label="$t('m.TakeAction')">
        					    </el-table-column>
                      <el-table-column
        					      width="100"
        					      :label="$t('m.Operate')" >
                      <template slot-scope="scope">
                       <el-button type="primary" size="mini" @click="Handle(scope.$index)">{{$t('m.Dispose')}}</el-button>
                      </template>
        					    </el-table-column>
        				  </el-table>
                 </el-col>   
              </el-row>
             <el-col :span="24">
                  <div class="myPagination" style="margin-top: 30px;">
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
            :title="$t('m.Dispose')"
            :visible.sync="ProcessedDialogVisible"
            width="30%"
            center>
             <el-form :model="DisposeValidateForm"  ref="DisposeValidateForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item
                     :label="$t('m.TakeAction')"
                     prop='Method'
                     :rules="[
                        {required: true, message: '处理方法不能为空'}
                        ]"
                      >
                    <el-input type="textarea" v-model='DisposeValidateForm.Method'  auto-complete="off"  size="medium"></el-input>
                  </el-form-item>
             </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="ProcessedDialogVisible = false" size="small">{{$t('m.NO')}}</el-button>
              <el-button type="primary" size="small" @click="SubmitForm('DisposeValidateForm')">{{$t('m.YES')}}</el-button>
            </span>
          </el-dialog>
     </el-col>
   </el-row> 
  </el-row>
</template>
<script>
     import{GetGroupAndLogger,GetAlarmRecordData,UpdateAlarmState,ExportAlarmRecordDataPdf,ExportAlarmRecordDataExecl,GetGroupAndLoggerAlarm}from'@/api/api'
     import{SevenDay,timeFormatter}from'@/assets/js/common'
     import qs from 'qs';
export default {
        data(){
        	return{
             loading:false,//正在加载的修饰
             DisposeValidateForm:{//验证方法
                  Method:''
               },
             AllEquipmentName:'',
			       AllZoneName:'',
			       AllZone:[],//所有分区显示
			       AllEquipment:[],//所有设备显示
			       AlarmtableData:[],//报警数据
             pageIndex:1,//当前页码
             pageSize:10,// 每页显示的条数
             totalNumber:null,//总条数 
             ProcessedDialogVisible:false,
             alarmAction:'',//处理方法
             alarmCode:'',//处理报警的编码
             alarmType:"",
             valueTime: [ timeFormatter(new Date(SevenDay(new Date()))), timeFormatter(new Date())],
        	}
        },
     computed:{      
       pickerOptions2() {
          return{
              shortcuts: [{
                text: this.$t('m.LastWeek'),
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text:this.$t('m.LateMonth'),
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: this.$t('m.LastThreemonths'),
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }],
             disabledDate(time) {
              return time.getTime() > Date.now();//到当前时间
               }
              }

            },

      },

        methods:{
        changeHistoryDate (date) {  // 选择时间当天时间的59:59秒
            if (date == null) {
                  return false
              }
              let newDate = new Date();
              let chooseDate = new Date(date[1])
              let stopEndDate = new Date(date[1])
              stopEndDate.setHours(23)
              stopEndDate.setMinutes(59)
              stopEndDate.setSeconds(59)
              if(chooseDate.setHours(0,0,0,0) == newDate.setHours(0,0,0,0)) {
                            this.valueTime[1] =  timeFormatter(new Date())
                        } else {
                            this.valueTime[1] = timeFormatter(stopEndDate)
                        }
               }, 
           PartitionDisplay(){
                  GetGroupAndLoggerAlarm().then(res=>{
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

                       if(this.AllEquipment !==0){
                               this.AllEquipmentName= this.$route.params.id|| this.AllEquipment[0].value
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
           //导出ExportExecl数据
            ExportExecl(){
                         var params={
                                 groupId:this.AllZoneName,
                                 loggerInfoSn:this.AllEquipmentName,
                                 alarmType:this.alarmType,
                                 staDate:this.valueTime == null ? undefined : this.valueTime[0],
                                 endDate:this.valueTime == null ? undefined : this.valueTime[1],
                          }
                    window.location.href=" DataCentreManage/ExportAlarmRecordDataExecl?loggerInfoSn="+this.AllEquipmentName+"&staDate="
                                          +params.staDate+"&endDate="+params.endDate+"&groupId="+this.AllZoneName+"&alarmType="+this.alarmType+" ";      
            },
            GetAlarmRecordDataList(){
               this.loading = true;
              this.AlarmtableData=[];
                  var params={
                         pageIndex:this.pageIndex,
                         pageSize:this.pageSize,
                         groupId:this.AllZoneName,
            						 loggerInfoSn:this.AllEquipmentName,
            						 alarmType:this.alarmType,
            						 staDate:this.valueTime == null ? undefined : this.valueTime[0],
            						 endDate:this.valueTime == null ? undefined : this.valueTime[1],    
                  }
               GetAlarmRecordData(params).then(res=>{
                     this.totalNumber=res.TotalNumber
                    if(res.Data.length == 0||res.Data == []){
                            this.loading=false;  
                     }else{
                      for(let item of res.Data ){
                             this.AlarmtableData.push(item) 
                              this.loading=false; 
                           }
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
          ExportDataAlarm(){//导出报警数据
               var params={
                      groupId:this.AllZoneName,
                     staDate:this.valueTime == null ? undefined : this.valueTime[0],
                     endDate:this.valueTime == null ? undefined : this.valueTime[1],
                     loggerInfoSn:this.AllEquipmentName
               }
             ExportAlarmRecordDataPdf(qs.stringify(params)).then(res => {
                      if(res.State==1){
                         window.open(res.Url)
                      }else if(res.State == 0)  {
                         this.$message({
                             type:'error',
                             message:'该仪器无有效数据'
                         })
                      }        
              })
          },
        },
        mounted(){
                this.PartitionDisplay()
        },
}
</script>
<style lang="scss" scoped>
       .AlarmRecord{
            height: calc(100% - 10px);
            background: #eaedf1;
            min-width: 1700px;
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
        	    min-height: calc(100% - 124px);
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
