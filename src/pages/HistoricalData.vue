<template>
   <el-row class="HistoricalData">
   	    <el-row>
   	    	<el-col :span='24'>
   	    	 <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">实时监控</i><i class="el-icon-arrow-right"><span class="currentcolor">历史记录</span></i></div> 
			      </el-col>
			   </el-row>
   	    	</el-col>
   	    </el-row>
	        <el-row>
	        <el-col :span='24'>
	     		   <div class="HistoricalSecrch">
	     		        <el-form :inline="true"  class="demo-form-inline" size="small">
                        	  <el-form-item label="分区:">
							           <el-select v-model="AllZoneName"  placeholder="请选择分区"  @change="SelectedPartition">
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
							         <el-select  v-model="AllEquipmentName" placeholder="请选择设备">
					                    <el-option
					                       v-for="item in AllEquipment"
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
									          value-format="yyyy-MM-dd HH:hh:mm"
									          @change="HistoricalInquire"
      										      v-model="valueTime"
      										      type="datetimerange"
      										      range-separator="至"
      										      start-placeholder="开始日期"
      										      end-placeholder="结束日期">
									    </el-date-picker>
									</div>
							  </el-form-item>
							  <el-form-item>
							   <el-button type="primary" size="small" @click="HistroyMemory" >查询</el-button>
							  </el-form-item>
							   <el-form-item>
							    <el-button type="primary" size="small" class="DataExport" @click="Exportimage">导出图片</el-button>
							  </el-form-item>
							   <el-form-item>
							    <el-button type="primary" size="small" class="DataExport" @click="Exporthistorydata">导出数据</el-button>
							  </el-form-item>
                <div class="historydatashow">
                <el-form-item>
                  <el-button  size="small" @click="Curveshow" >曲线展示</el-button>
                </el-form-item>
                 <el-form-item>
                  <el-button  size="small" @click="historydatashow" >数据展示</el-button>
                </el-form-item>
                </div>
						</el-form> 
	     		   </div>
	     	</el-col>
        </el-row>

       <el-row class="chart" id='ExportImage'>
          <div class="cahrtbackground">{{AllEquipmentName}}</div>
        <el-col :span='clickWidth'>
	         <el-row class="tablelayout">
	             <table class='multiTable' border='0' width="100%" cellpadding="0" cellspacing="0">
	              <thead class="thd_bg">
	                <tr>
	                  <th width="10%">{{ this.HistorTable.length }}个测量通道</th>
	                  <th width="10%">{{ Branches }}条记录</th>
	                  <th width="10%">开始时间</th>
	                  <th colspan="3">{{  this.HistoricalTime[0] }}</th>
	                  <th width="10%">结束时间</th>
	                  <th colspan="3">{{ this.HistoricalTime[1] }}</th>
	                </tr>
	              </thead>
	              <tbody  class="tbd_bg">
		           <tr v-for='(item, index) in HistorTable' :key='index'>
		                  <td> 通道{{index+1 }}</td>
		                  <td>{{SensorOptions[item.LoggerChnumType].label}}</td>
		                  <td> 最大值 </td>
		                  <td>{{ item.MaximumValue }}</td>
		                  <td>最小值</td>
		                  <td>{{ item.MinimumValue }}</td>
		                  <td>平均值</td>
		                  <td>{{ item.AverageValue }}</td>
		                  <td>波动值</td>
		                  <td>{{ item.FloatingValue }}</td>
		                </tr> 
	              </tbody>
	            </table>
	         </el-row>
	        <el-row v-if="TexNull == true" style="text-align:center;color:#999;line-height:290px;">该段时间暂无数据,请重新选择时间
	        </el-row>
	         <el-row  class="Channellayout" :class="['chartStyle'+chartsInfo.chartsNum]">
		         	<template v-for="(item, index) in chartsInfo.chartsArray">
		         		<el-col :class="['chartNumStyle'+index]" style='margin-bottom: 20px' >
		             		<ve-line height='220px'
		             		    :data="item"
		             		    :settings="chartsInfo.chartSettingsArray[index]"
		                        :xAxis='xAxisOption'
		                        :yAxis='yAxisOption[index]'
		                        :grid='grid'
		                        :colors='["#7bc3f1"]'
		                         :extend='chartsExtend'
		             		      ></ve-line>
		         		</el-col>
		         	</template>
	         </el-row>
         </el-col> 
        <el-col :span='12' v-if='showData' style="padding-right: 20px;">
             <table class='multiTable dataform' border='0' width="100%" cellpadding="0" cellspacing="0">
                <thead class="thd_bg">
                  <tr>
                    <th width="100px">序号</th>
                    <th width="20%">时间</th>
                    <th v-for='(item, index) in HistorTable'>{{SensorOptions[item.LoggerChnumType].label}}</th>
                  </tr>
                </thead>
                <tbody  class="tbd_bg">
               <tr v-for='(item, index) in DBTable' :key='index'>
                  <td>{{index+1 }}</td>
                  <td>{{item.LogsTime}}</td>
                  <td :class='{"hyperthermia":item.LogsChone>Number(ChoneHigh)||item.LogsChone<Number(ChoneLow)}'>{{item.LogsChone}}</td>
                  <td :class='{"hyperthermia":item.LogsChtwo>Number(ChtwoHigh)||item.LogsChtwo<Number(ChtwoLow)}' v-show="logstwochu">{{item.LogsChtwo}}</td>
                  <td :class='{"hyperthermia":item.LogsChthree>Number(ChthreeHigh)||item.LogsChthree<Number(ChthreeLow)}' v-show="logsthreechu">{{item.LogsChthree}}</td>
                  <td :class='{"hyperthermia":item.LogsChfour>Number(ChfouHigh)||item.LogsChfour<Number(ChfouLow)}'  v-show="logsfourchu">{{item.LogsChfour}}</td>
               </tr> 
                </tbody>
              </table>
     	 </el-col>
      </el-row>
   </el-row>
</template>
<script>
	  import{GetGroupAndLogger,GetHistoryData,ExportHistoryDataPdf}from'@/api/api';
	  import qs from 'qs';
    import{saveImg}from'@/assets/js/common';
    import html2canvas from 'html2canvas'
export default {
     data(){
     	 return{
        logstwochu:false,
        logsthreechu:false,
        logsfourchu:false,
        DBTable:[],//数据展示的表格
        TexNull:false,
			   valueTime:"",
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
			        axisLine: {
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
			          }
			        },
			        
			      },
                 grid: {
				        top: '50',
				        bottom: '0'
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
                   	label:'PM2.5(ug/m³)'
                   },
                   {
                   	value:'12',
                   	label:'PM10(ug/m³)'
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
 	 	}
 	},
 	methods:{       
 			 historydatashow(e) {
 				this.clickWidth = 12;
 				this.showData= true;
 			},  
      Curveshow(e){
         this.clickWidth = 24;
         this.showData= false;   
      },
           	PartitionDisplay(){
                  GetGroupAndLogger().then(res=>{
                  	      console.log(res)
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
           Exportimage(){//导出图片
                 $('#ExportImage').css({'opacity': '1'}) 
                html2canvas(document.querySelector('#ExportImage')).then( (canvas) => {
                saveImg(canvas);
               $('#ExportImage').css({'opacity':'0'});
             })
           },
            HistroyMemory(){
              	var params={
      					loggerInfoSn:this.AllEquipmentName,
      					staDate:this.HistoricalTime[0],
      					endDate:this.HistoricalTime[1]
      				  }
           		GetHistoryData(params).then(res=>{
        					console.log("历史记录")
        					console.log(params)
        					console.log(res)
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
                   this.logstwochu=false;
                    this.logsfourchu=false;
                    this.logsthreechu=false;
                    break;
                    case 2:
                    this.logstwochu=true;
                    this.logsfourchu=false;
                    this.logsthreechu=false;
                    break;
                    case 3:
                    this.logstwochu=true;
                    this.logsthreechu=true;
                    this.logsfourchu=false;
                    break;
                    case 4:
                    this.logstwochu=true;
                    this.logsfourchu=true;
                    this.logsthreechu=true;
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
                   	 console.log("shuzu")
                    console.log(this.chartsInfo)
                   	let array = new Array();
                   	this.xAxisOption.data = [];
                   	res.Data.ListAnalysisOfData.forEach((item, index) => {
                   		this.yAxisOption.splice(index, 1, {
                   			name: '('+ this.SensorOptions[item.LoggerChnumType].label +')'
                   		})
                   	})
                   	console.log(this.yAxisOption);
                   	res.Data.ListLoggerInfoChnumData.forEach((item, index) => {
                   		console.log(item);
                   		this.xAxisOption.data.push(item.LogsTime)
                   		for (var i = 0; i < this.chartsInfo.chartsNum; i++) {
                   			this.chartsInfo.chartsArray[i].columns = [];
                   			this.chartsInfo.chartSettingsArray[i].metrics = [];
                   			this.chartsInfo.chartSettingsArray[i].labelMap = {};
                   			this.chartsInfo.chartsArray[i].columns.push(this.chartsInfo.chartListNames[i]);
                   			this.chartsInfo.chartSettingsArray[i].metrics.push(this.chartsInfo.chartListNames[i]);
                   			this.chartsInfo.chartSettingsArray[i].labelMap[this.chartsInfo.chartListNames[i]] = this.chartsInfo.chartChunName[i];
               				this.chartsInfo.chartsArray[i].rows.push(
               					JSON.parse(`{"${this.chartsInfo.chartListNames[i]}": "${item[this.chartsInfo.chartListNames[i]]}", "LogsTime": "${item.LogsTime}"}`)
               					);
                   		}
                   	})
                   	console.log(this.chartsInfo.chartsArray)
               	})     
            },
           HistoricalInquire(val){
               	  if (val==null) {
	                  this.HistoricalTime[0]=undefined;
	                  this.HistoricalTime[1]=undefined;
	          	 }else{
	               this.HistoricalTime=val;
	               }

           },
            Exporthistorydata(){
                  var params={
                      loggerInfoSn:this.AllEquipmentName,
                      staDate:this.HistoricalTime[0],
                      endDate:this.HistoricalTime[1]
                      }
                ExportHistoryDataPdf(params).then(res=>{
                        if(res.State==1){
                           window.open(res.Url)
                        }else{
                           this.$message({
                              type:'error',
                               message:'导出数据失败'
                           })
                        }
                 })
                 console.log(params)
            },
     },
     mounted(){
          this.PartitionDisplay()//分区联动显示   
     },
}
</script>
<style lang="scss" scoped>
    .HistoricalData{

    	 	 height: calc(100% - 10px);
		         background: #fefefe;
		    .CurrentPosition{
		    		height: 40px;
		    		background:#f7f7f7; 
		    		.NowPositon{
		              line-height: 40px;
		              margin-left: 15px;
		    		}
		    	} 
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
		    height: 26px;
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
        }
        .chartStyle2 .chartNumStyle0,
        .chartStyle2 .chartNumStyle1{
        	width: 100%;
        }
         .chartStyle3 .chartNumStyle0{
                width: 100%;
         }
        .chartStyle3 .chartNumStyle1{
        	width: 50%;
        }
        .chartStyle3 .chartNumStyle2{
             width: 50%;
        }
        .chartStyle4 .chartNumStyle0{
        	width: 50%;
        }
        .chartStyle4 .chartNumStyle1{
        	width: 50%;
        }
         .chartStyle4 .chartNumStyle2{
         	width: 50%;
         }
        .chartStyle4 .chartNumStyle3{
        	width: 50%;
        }
         .chartStyle4 .chartNumStyle4{
         	width: 50%;
         }
         .chart{
         	border:1px solid #d7d7d7;
         	height: calc(100% - 160px);
         	margin: 20px;
         	border-radius: 5px;
         }
         .cahrtbackground{
         	height: 60px;
         	background: #f4f4f4;
         	border-bottom: 1px solid #d7d7d7;
         	text-align: center;
         	font-size: 18px;
         	color:#333333; 
         	line-height: 60px;
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
        }
</style>


