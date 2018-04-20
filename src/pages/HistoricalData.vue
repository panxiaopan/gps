<template>
   <el-row class="HistoricalData">
   	    <el-row>
   	    	<el-col :span='24'>
   	    	 <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon">
                  <i class="el-icon-location"></i>
                  <span>{{$t('m.Location')}}:</span>
                  <i class="el-icon-arrow-right">{{$t('m.DataCentre')}}</i>
                  <i class="el-icon-arrow-right">
                    <span class="currentcolor">{{$t('m.HistoryMemory')}}</span>
                  </i>
              </div> 
			      </el-col>
			   </el-row>
   	    	</el-col>
   	    </el-row>
	        <el-row>
	        <el-col :span='24'>
	     		   <div class="HistoricalSecrch">
	     		        <el-form :inline="true"  class="demo-form-inline" size="small">
                        	  <el-form-item :label="$t('m.Site')">
							           <el-select v-model="AllZoneName"  :placeholder="$t('m.Selectarea')"  @change="SelectedPartition">
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
							         <el-select  v-model="AllEquipmentName" :placeholder="$t('m.SelectDevice')" >
					                    <el-option
					                       v-for="item in AllEquipment"
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
									          value-format="yyyy-MM-dd HH:mm:ss"
      										      v-model="valueTime"
                                 @change='changeHistoryDate'
      										      type="datetimerange"
                                :picker-options="pickerOptions2"
      										      range-separator="--"
      										      :start-placeholder="$t('m.StartTime')"
      										      :end-placeholder="$t('m.EndTime')">
									    </el-date-picker>
									</div>
							  </el-form-item>
							  <el-form-item>
							   <el-button type="primary" size="small" @click="SeachHistroyMemory">{{$t('m.Search')}}</el-button>
							  </el-form-item>
							   <el-form-item>
							    <el-button type="primary" size="small" class="DataExport" @click="Exportimage">{{$t('m.ExportPicture')}}</el-button>
							  </el-form-item>
							   <el-form-item>
							    <el-button type="primary" size="small" class="DataExport" @click="Exporthistorydata">{{$t('m.ExportPDF')}}</el-button>
							  </el-form-item>
              <el-form-item>
              <el-button type="primary" size="small" class="DataExport" @click="DeriveExecl">{{$t('m.ExportExcel')}}</el-button>
              </el-form-item>
                <div class="historydatashow">
                <el-form-item>
                  <el-button  size="small" @click="Curveshow" >{{$t('m.CurveGraphDisplay')}}</el-button>
                </el-form-item>
                 <el-form-item>
                  <el-button  size="small" @click="historydatashow" >{{$t('m.DisplayInDigit')}}</el-button>
                </el-form-item>
                </div>
						</el-form> 
	     		   </div>
	     	</el-col>
        </el-row>
       <el-row class="chart" id='ExportImage' v-show="Exportshow" >
          <div class="cahrtbackground">{{LoggerNamechecked}}</div>
        <el-col :span='clickWidth'>
	         <el-row class="tablelayout">
	             <table class='multiTable' border='0' width="100%" cellpadding="0" cellspacing="0">
	              <thead class="thd_bg">
	                <tr>
	                  <th width="10%">{{ this.HistorTable.length }}个测量通道</th>
	                  <th width="10%">{{ Branches }}条记录</th>
	                  <th width="10%">{{$t('m.StartTime')}}</th>
	                  <th colspan="3">{{  this.valueTime == null ? undefined : this.valueTime[0] }}</th>
	                  <th width="10%">{{$t('m.EndTime')}}</th>
	                  <th colspan="3">{{ this.valueTime == null ? undefined : this.valueTime[1] }}</th>
	                </tr>
	              </thead>
	              <tbody  class="tbd_bg">
		               <tr v-for='(item, index) in HistorTable' :key='index'>
		                  <td> 通道{{index+1 }}</td>
		                  <td>{{item.LoggerChnumType===8 ? item.LoggerChnumUs :  SensorOptions[item.LoggerChnumType].label}}</td>
		                  <td> {{$t('m.maximum')}} </td>
		                  <td>{{ item.MaximumValue }}</td>
		                  <td>{{$t('m.Minimum')}}</td>
		                  <td>{{ item.MinimumValue }}</td>
		                  <td>{{$t('m.AVERAGE')}}</td>
		                  <td>{{ item.AverageValue }}</td>
		                  <td>{{$t('m.Variance')}}</td>
		                  <td>{{ item.FloatingValue }}</td>
		                </tr> 
	              </tbody>
	            </table>
	         </el-row>

	         <el-row  class="Channellayout" :class="['chartStyle'+chartsInfo.chartsNum]">
		         	<template v-for="(item, index) in chartsInfo.chartsArray">
		         		<el-col :class="['chartNumStyle'+index]" style='margin-bottom: 20px' >
             <!-- <components  v-if="hackReset">   -->
		             		<ve-line 
                        :height="chartNumwidth"
		             		    :data="item"
		             		    :settings="chartsInfo.chartSettingsArray[index]"
                        :xAxis='xAxisOption'
                        :yAxis='yAxisOption[index]'
                        :grid='grid'
                        :colors='["#7bc3f1"]'
                        :extend='chartsExtend'
                        :ref='"charts"+index'
		             		 ></ve-line>
                  <!-- </components>   -->
		         		</el-col>
		         	</template>
	         </el-row>
         </el-col> 
        <el-col :span="DataSize" v-if='showData' style="padding-right: 20px;">
             <table class='multiTable dataform alldataload ' border='0'  cellpadding="0" cellspacing="0" style="display: inline-block; " >
                <thead class="thd_bg">
                  <tr>
                    <th width="50px">{{$t('m.Number')}}</th>
                    <th width="180px">{{$t('m.Date')}}</th>
                    <th width="100px" v-for='(item, index) in HistorTable'>{{item.LoggerChnumType===8 ? item.LoggerChnumUs : SensorOptions[item.LoggerChnumType].label}}</th>
                  </tr>
                </thead>
                <tbody  class="tbd_bg" style="display: inline-block;height: 580px; overflow: auto;">
               <tr v-for='(item, index) in DBTable' :key='index'>
                  <td width="50px">{{index+1 }}</td>
                  <td width="180px">{{item.LogsTime}}</td>
                  <td width="100px" :class='{"hyperthermia":item.LogsChone>Number(ChoneHigh)||item.LogsChone<Number(ChoneLow)}'>{{item.LogsChone}}</td>
                  <td width="100px" :class='{"hyperthermia":item.LogsChtwo>Number(ChtwoHigh)||item.LogsChtwo<Number(ChtwoLow)}' v-show="logstwochu">{{item.LogsChtwo}}</td>
                  <td width="100px" :class='{"hyperthermia":item.LogsChthree>Number(ChthreeHigh)||item.LogsChthree<Number(ChthreeLow)}' v-show="logsthreechu">{{item.LogsChthree}}</td>
                  <td width="100px" :class='{"hyperthermia":item.LogsChfour>Number(ChfouHigh)||item.LogsChfour<Number(ChfouLow)}'  v-show="logsfourchu">{{item.LogsChfour}}</td>
               </tr> 
                </tbody>
              </table>
     	 </el-col>
      </el-row>
         <el-row :span='24'  ></el-row>
         <el-row v-show="TexNull" style="text-align:center;color:#999;line-height:290px;"  v-loading="loadingData" element-loading-text="loading"  element-loading-spinner="el-icon-loading">{{$t('m.TemporarilyUnavailable')}}
          </el-row>
   </el-row>
</template>
<script>
	  import{GetGroupAndLogger,GetHistoryData,ExportHistoryDataPdf,ExeclHistoryData} from'@/api/api';
	  import qs from 'qs';
    import{saveImg,SevenDay,timeFormatter}from'@/assets/js/common';
    import html2canvas from 'html2canvas'
export default {
     data(){
     	 return{
        loadingData:false,
        wenjianliu:null,
        hackReset:false,
        Exportshow:false,
        logstwochu:false,
        logsthreechu:false,
        logsfourchu:false,
        DBTable:[],//数据展示的表格
         TexNull:false,
			   HistoricalTime:[],
			   AllZone:[],//分区显示
			   AllEquipment:[],//设备显示
			   AllZoneName:"",//分区名称
			   AllEquipmentName:"",//设备名称
			   tableData:[],
			   HistorTable:[],//历史表格显示
			   Branches:'',//记录条数
         Polylinearry:[],//折线数组.
         ChannelNumber:null,//通道数量.
         Channelvalue:[],//通道一/定义四个,等于rows
         ChnumType:null,//类型单位值,
         LoggerNamechecked:'',//选中的名字显示
		        //
		        chartsInfo: {
		        	chartsNum: null, // 折线统计图的个数
		        	chartsArray: new Array(),  // 统计图的数据
		        	chartSettingsArray: new Array(),
		        	chartListNames: ['LogsChone', 'LogsChtwo', 'LogsChthree', 'LogsChfour'],
		        	chartChunName: ['通道一', '通道二', '通道三', '通道四']
		        },
                xAxisOption:{
                	type: 'category',
            	    splitLine: {
			              show: true
			        },
			        axisTick: {
			          show: true
			        }, 
			        data: [],
			        axisLabel: {
			          formatter: function(value) {
			            // console.log(value)
			            var str_before = value.split(' ')[0];
			            var str_after = value.split(' ')[1];
			            return str_after + '\n' + str_before;
			          }
			        },
                },
                yAxisOption: [],
           chartsExtend: {
			        series: {
			          connectNulls: true,
			          type: 'line',
			          symbol: 'none',
			          lineStyle: {
			          	normal: { width: '1.5'}
			          },
/*                markLine: {
                  data: [ {
                        // 起点和终点的项会共用一个 name
                        name: '最小值到最大值',
                        type: 'min'
                    },
                     {
                            type: 'max'
                        }  
                                    


                    ]
                }*/
			        },
			        
			      },
              grid: {
				        top: '50',
				        bottom: '0',
                right:'25'
				      },
               SensorOptions:[
                   {
                   	value:'0',
                   	label:'°C'
                   },
                   {
                   	value:'1',
                   	label:'%RH'
                   },
                    {
                   	value:'2',
                   	label:'PPM'
                   },
                   {
                   	value:'3',
                   	label:'MPa'
                   },
                   {
                   	value:'4',
                   	label:'Lux'
                   },
                   {
                   	value:'5',
                   	label:'°F'
                   },
                   {
                   	value:'6',
                   	label:'I/O'
                   },
                   {
                   	value:'7',
                   	label:'Pa'
                   },
                   {
                   	value:'8',
                   	label:'用户定义'
                   },
                   {
                   	value:'9',
                   	label:'mg/m³'
                   },
                   {
                   	value:'10',
                   	label:'mg/m³'
                   },
                   {
                   	value:'11',
                   	label:'ug/m³'
                   },
                   {
                   	value:'12',
                   	label:'ug/m³'
                   },
                   {
                   	value:'13',
                   	label:'uw/m²'
                   },
               ],
               clickWidth: 24,
               showData: false,
               ChoneHigh:'',
               ChoneLow:'',
               ChtwoHigh:'',
               ChtwoLow:'',
               ChthreeLow:'',
               ChthreeHigh:'',
               ChfouLow:'',
               ChfouHigh:'',
               LoggerNamechecked:'',
               pickerOptions2: {
              shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }],
             disabledDate(time) {
              return time.getTime() > Date.now();
                }
              },
              valueTime: [ timeFormatter(new Date(SevenDay(new Date()))), timeFormatter(new Date()) ],
 	  	}
 	},
 	methods:{ 
        //选择时间的时候的bug结束时间23:59:59;
       changeHistoryDate (date) {  // 选择时间
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
 			 historydatashow(e) {
 			  this.clickWidth=24-this.DataSize;
 				this.showData= true;
 			},  
      Curveshow(e){
         this.clickWidth = 24;
         this.showData= false;   
      },
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
                                 	   value:res[i].ListLoggerInfo[k].LoggerSn,
                                     LoggerNamechecked:res[i].ListLoggerInfo[k].LoggerName,
                                   })   
                      	      }
                          }
                          if (this.AllEquipment !==0) {
                              this.AllEquipmentName = this.$route.params.id || this.AllEquipment[0].value
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
                                       value:this.AllZone[i].ListLoggerInfo[k].LoggerSn,
                                       LoggerNamechecked:this.AllZone[i].ListLoggerInfo[k].LoggerName,
                                })   
                             }
                        } 
                 }
            },
           //历史导出Execl文件
             DeriveExecl(){
                   var params={
                                 loggerInfoSn:this.AllEquipmentName,
                                 staDate:this.valueTime == null ? undefined : this.valueTime[0],
                                 endDate:this.valueTime == null ? undefined : this.valueTime[1]
                          }
                /*       console.log(params)*/

                  if(this.AllEquipmentName ==''||this.AllEquipmentName==undefined){
                          this.$message({
                              type:'error',
                               message:'选择设备'
                            })
                    }else{
                    window.location.href="DataCentreManage/ExeclHistoryData?loggerInfoSn="+this.AllEquipmentName+"&staDate="
                                          +params.staDate+"&endDate="+params.endDate+"";
                      }
            },
           Exportimage(){//导出图片
                    if(this.AllEquipmentName ==''||this.AllEquipmentName==undefined){
                          this.$message({
                              type:'error',
                               message:'选择设备'
                            })
                    }else{
                 $('#ExportImage').css({'opacity': '1'}) 
                   html2canvas(document.querySelector('#ExportImage')).then( (canvas) => {
                    　　　　　//我要获取当前的日期
                              var newDate = new Date(); 
                    let fileName = this.LoggerNamechecked+'历史记录' + newDate.toLocaleDateString()+'png'
                   saveImg(canvas,fileName);
                  // $('#ExportImage').css({'opacity':'0'});
                   })
               }
           },
           SeachHistroyMemory(){
                     this.loadingData = true;
                     this.hackReset=false;
                  if(this.AllEquipmentName ==''||this.AllEquipmentName==undefined){
                         this.$message({
                              type:'error',
                               message:'选择设备'
                            })
                  }else{
                      this.HistroyMemory()//搜索
                  }
           },
            HistroyMemory(){
                 
              	var params={
        					loggerInfoSn: this.AllEquipmentName,
        					staDate:this.valueTime == null ? undefined : this.valueTime[0],
        					endDate:this.valueTime == null ? undefined : this.valueTime[1]
      				  }
           		GetHistoryData(params).then(res=>{
                this.LoggerNamechecked=res.Data.LoggerName;//选中的名字显示出来
               if(res.TotalNumber==0){
                     this.loadingData = false;
                     this.Exportshow=false;
                     this.TexNull=true;
               }else{
                    this.Exportshow=true; 
                    this.TexNull=false;
                    this.loadingData = false;
               }
              //通道赋值.判断超标的显示红色
              this.ChoneHigh=res.Data.ChoneHigh;
              this.ChoneLow=res.Data.ChoneLow
              this.ChtwoHigh=res.Data.ChtwoHigh
              this.ChtwoLow=res.Data.ChtwoLow
              this.ChthreeHigh=res.Data.ChthreeHigh
              this.ChthreeLow=res.Data.ChthreeLow
              this.ChfouLow=res.Data.ChfouLow
              this.ChfouHigh=res.Data.ChfouHigh
           //table的表格数字    
              this.HistorTable=[]//清空数据,
              this.DBTable=[]//数控数据显示
              this.Branches=null;
              this.ChannelNumber=res.Data.LoggerChnum    //通道数量赋值                                                                                      
              switch(res.Data.LoggerChnum){//控制表格头部
                    case 1:
                    this.chartNumwidth=500+'px';
                    this.logstwochu=false;
                    this.logsfourchu=false;
                    this.logsthreechu=false;
                    this.DataSize=6;
 
                    break;
                    case 2:
                   this.chartNumwidth=220+'px';
                    this.logstwochu=true;
                    this.logsfourchu=false;
                    this.logsthreechu=false;
                    this.DataSize=7;
                    break;
                    case 3:
                   this.chartNumwidth=220+'px';
                    this.logstwochu=true;
                    this.logsthreechu=true;
                    this.logsfourchu=false;
                    this.DataSize=9;
                    break;
                    case 4:
                    this.chartNumwidth=220+'px';
                    this.logstwochu=true;
                    this.logsfourchu=true;
                    this.logsthreechu=true;
                    this.DataSize=10;
                    break;
              }
             for(let item of res.Data.ListAnalysisOfData){
                   this.HistorTable.push(item)  
                   this.Branches=res.Data.CountNumber//记录总条数
             }
              for( let item of res.Data.ListLoggerInfoChnumData){
                       this.DBTable.push(item)//数据展示表格的值
               }
					// 解析数据
                   	this.chartsInfo.chartsNum = res.Data.LoggerChnum;
                   	// 通过通道数量初始化数据
                   	if(this.chartsInfo.chartsNum === 0 || this.chartsInfo.chartsNum === null){ return; }
                   	// 清空数据
                   	this.chartsInfo.chartsArray = [];
                   	for (let i = 0; i < this.chartsInfo.chartsNum; i++) {
	                   	this.chartsInfo.chartsArray.push({
	                   		 columns: new Array(),
					               rows: new Array()
	                   	})
	                   	this.chartsInfo.chartSettingsArray.push({
	                   		metrics: new Array(), // 纵坐标参数 (线条名称)
							           dimension: new Array('LogsTime')	// 横坐标参数
	                   	})
                   	}

                   	let array = new Array();
                   	this.xAxisOption.data = [];
                   	res.Data.ListAnalysisOfData.forEach((item, index) => {
                   		this.yAxisOption.splice(index, 1, {
                   			name: '('+ this.SensorOptions[item.LoggerChnumType].label +')'
                   		})
                   	})
                   	res.Data.ListLoggerInfoChnumData.forEach((item, index) => {
                   
                   		this.xAxisOption.data.push(item.LogsTime)
                   		for (var i = 0; i < this.chartsInfo.chartsNum; i++) {
                   			this.chartsInfo.chartsArray[i].columns = [];
                   			this.chartsInfo.chartSettingsArray[i].metrics = [];
                   			this.chartsInfo.chartSettingsArray[i].labelMap = {};
                   			this.chartsInfo.chartsArray[i].columns.push(this.chartsInfo.chartListNames[i]);
                   			this.chartsInfo.chartSettingsArray[i].metrics.push(this.chartsInfo.chartListNames[i]);
                   			this.chartsInfo.chartSettingsArray[i].labelMap[this.chartsInfo.chartListNames[i]] = this.chartsInfo.chartChunName[i];
               				 this.chartsInfo.chartsArray[i].rows.push(
               					JSON.parse(
                          `{"${this.chartsInfo.chartListNames[i]}": "${item[this.chartsInfo.chartListNames[i]]}",
                           "LogsTime": "${item.LogsTime}"}`

                           )
               					);
                        this.hackReset=true; 
                   		}
                   	})
                    for(let i = 0; i < this.chartsInfo.chartsNum; i++) {
                      this.$nextTick(_ => {
                        console.log(this.chartsInfo.chartsNum)
                        console.log(this.$refs)
                        console.log(`charts${i}`)
                        if(this.$refs[`charts${i}`] !== undefined ) {
                          this.$refs[`charts${i}`][0].echarts.resize()
                        }
                      })
                    } 
               	})
                
                  
            },
            Exporthistorydata(){
                  var params={
                        loggerInfoSn:this.AllEquipmentName,
                        staDate:this.valueTime == null ? undefined : this.valueTime[0],
                        endDate:this.valueTime == null ? undefined : this.valueTime[1]
                      }
             if(this.AllEquipmentName ==''||this.AllEquipmentName==undefined){
                     this.$message({
                              type:'error',
                               message:'选择设备'
                            })
                   }else{
                      ExportHistoryDataPdf(qs.stringify(params)).then(res=>{
                          console.log("=====")
                          console.log(res)
                              if(res.State==1){
                                 window.open(res.Url)
                              }else if(res.State==0) {
                                 this.$message({
                                    type:'error',
                                     message:'该仪器无有效数'
                                  })
                               }else{
                                   this.$message({
                                     type:'error',
                                     message:'导出数据失败'

                                   })
                               }
                           })
                       }
            
            },
     },
     mounted(){
            this.PartitionDisplay()//分区联动显示*/   
          /*  this.AllEquipmentName=this.$route.params.id*/

             
     },
}
</script>
<style lang="scss" scoped>
    .HistoricalData{
       min-height: 100%;
		     background: #fefefe;
         min-width: 1540px; 
         .HistoricalSecrch{
               height: 50px;
               margin: 15px;
               .el-select{
                width: 150px;
               }
              .historydatashow{
                display: inline-block;
                 float: right;
                 margin-right: 25px;
              }
          }
        .multiTable{
        	border-left: 1px solid #dcdfe6;
			    border-top: 1px solid #dcdfe6;     
			    border-radius: 2px;
			    margin-top: 10px;
        }
        .thd_bg{
			    height: 32px;
			    tr{
			      height: 32px;
			      background: #f4f4f4;
			      th{
			        border-right: 1px solid #dcdfe6;
			        border-bottom: 1px solid #dcdfe6;
			        font-family: Microsoft YaHei;
			        font-weight: 500;
			        font-size: 14px;
			        color: #666;
			      }
			    }
		  }
	 .tbd_bg{
		    tr{
		      height: 26px;
		      text-align: center;
		      td{
		        border-right: 1px solid #dcdfe6;
		        border-bottom: 1px solid #dcdfe6;
		        font-family: Microsoft YaHei;
		        font-weight: 500;
		        font-size: 14px;
		        color: #666;
		      }
		    }
	  }
     .dataform{
      margin-top: 30px;
      overflow-y: auto;
     }

        .tablelayout{
        	padding: 20px;
        }
        .Channellayout{
           padding: 0px 20px 0px 20px;
        	height: calc(100% - 346px);
        }
        .chartStyle1 .chartNumStyle0{
        	width: 100%;
          height: 500px;
       
        }
        .chartStyle2 .chartNumStyle0,
        .chartStyle2 .chartNumStyle1{
        	width: 100%;
          height: 220px;
         
        }
         .chartStyle3 .chartNumStyle0{
                width: 100%;
                height: 220px;
                
         }
        .chartStyle3 .chartNumStyle1{
        	width: 50%;
          height: 220px;
         
        }
        .chartStyle3 .chartNumStyle2{
             width: 50%;
             height: 220px;
             
        }
        .chartStyle4 .chartNumStyle0{
        	width:50%;
          height: 220px;
         
        }
        .chartStyle4 .chartNumStyle1{
        	width:50%;
          height: 220px;
         
        }
         .chartStyle4 .chartNumStyle2{
         	width: 50%;
          height: 220px;
         }
        .chartStyle4 .chartNumStyle3{
        	width: 50%;
          height: 220px;
        }

         .chart{
         	border:1px solid #d7d7d7;
         	height: calc(100% - 160px);
         	margin: 20px;
         	border-radius: 5px;
         }
         .cahrtbackground{
         	height: 50px;
         	background: #f4f4f4;
         	border-bottom: 1px solid #d7d7d7;
         	text-align: center;
         	font-size: 18px;
         	color:#333333; 
         	line-height:50px;
         }
         .historydatatable{
            width: 100%;
            height: calc(100% - 160px);
            margin-top: 30px;
         }
          .hyperthermia{
             background: red;
             color: #FFFFFF !important;
          }
        .alldataload{
          border-right: 1px solid #dcdfe6;
          border-bottom: 1px solid #dcdfe6;
         }
        }
</style>


