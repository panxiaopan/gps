<template>
    <el-row class="Homepage">
      <el-row class="HomepageTOP">
	    	<el-col :span="20" class="HomepageTOPleft">
           <el-col :span="24">
	    	   <div class="HomepageTOPback">云平台使用方式</div>
            </el-col>
               <el-col :span="24" class="HomepageTOPIcon">
                    	<div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon  NetworkEquipmentIconWIFI"></i>
                    		 	   <div class="Cloudconfiguration">物联网云组态</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	网络设备(支持RJ45、WIFI、GPRS等网络组网设备)直接上传云平台
                    		 	    </span>
                    		 </div>
                    	</div>
                      <div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon NetworkEquipmentIconTomonitor"></i>
                    		 	   <div class="Cloudconfiguration">物联网云组态</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	Tomonitor数据上报云平台实现云平台报警,APP检测,微信监控
                    		 	    </span>
                    		 </div>
                    	</div>
                        <div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon NetworkEquipmentIconalarm"></i>
                    		 	   <div class="Cloudconfiguration">物联网云组态</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	 Tomonitor系统运行预警管理,实现微信报警,邮件报警.保障数据的实时
                    		 	    	 监控,出现问题及时发现
                    		 	    </span>
                    		 </div>
                    	</div>
               </el-col>
	    	 </el-col>
	    	 <el-col :span="4" class="HomepageTOPright">
                   <el-col :span="24" class="HomepageTOPrightTop">
                   	    <div class="FocusPlatform">关注微信公众平台</div>
                   	    <el-col :span='24' class="Wechatlocation" >
                            <el-col :span="12" style='position: relative;height:100%' >
                           	    	<div class="WechatICon vmiddle Accounts" >
                           	    	</div>
                            </el-col>
                            <el-col :span="12" style='height: 100%' >
                   	    	 <div class="Description" style='position: relative;width: 100%; height: 100%' >
                   	    	 	<div class='vmiddle' style='width: 100%; height: 40px' >
	                   	    	 	<div class="Wechatfontsize">关注微信公众号平台</div>
	                   	    	 	<div class="Wechatfontsize">微信报警信息推送</div>
                   	    	 	</div>
                   	    	 </div>
                            </el-col>
                   	    </el-col>
                   </el-col>
                   <el-col :span="24" class="HomepageTOPrightbottom Wechatlocation">
                            <div class="FocusPlatform">APP下载指导</div>
                            <el-col :span="12"  class="Appheight" >
                                  <div class="WechatICon vmiddle IOS" >
                                  </div>
                                  <div class="Download"><span class="fontDescribe">iOS下载</span></div>
                            </el-col>
                           <el-col :span="12" class="Appheight" >
                                  <div class="WechatICon vmiddle Android" >
                                  </div>
                                   <div class="Download"><span class="fontDescribe">Android下载</span></div>
                            </el-col> 
                          <div class="Presentation">华图测控有限公司诚邀您使用"冷链宝" APP定位监测系统,让监测更便捷,更直观.</div>
                   </el-col>

	    	 </el-col>
        </el-row>
        <el-row  class="Homepagebuttom">
                    <el-col :span='24'>
                       <el-col :span="20"  class="Homepagebuttomleft">
                         <el-col :span="24" class="DivisonalStatistics">
                           <div class="HomepageTOPback">设备分区监测统计</div>
                              <div class="Partitiontable">
                                <el-table
                                    :data="PartitiontableData"
                                    border
                                    stripe
                                    height='300'
                                    >
                                    <el-table-column
                                      prop="Name"
                                      label="区域"
                                      width="177">
                                    </el-table-column>
                                    <el-table-column
                                      prop="NormalNumber"
                                      label="正常"
                                      width="100">
                                    </el-table-column>
                                    <el-table-column
                                      label="离线"
                                      width="100">
                                   <template slot-scope="scope">
                                      <span :class='{"off-line":PartitiontableData[scope.$index].OfflineNumber>0}'>{{PartitiontableData[scope.$index].OfflineNumber}}</span>
                                   </template>
                                    </el-table-column>
                                    <el-table-column
                                      label="超标"
                                       width="100">
                                     <template slot-scope="scope">
                                      <span :class='{"overproof":PartitiontableData[scope.$index].ExcessNumber>0}'>{{PartitiontableData[scope.$index].ExcessNumber}}</span>
                                     </template>
                                    </el-table-column>
                                    <el-table-column
                                      label="维护"
                                       width="100">
                                     <template slot-scope="scope">
                                      <span :class='{"vindicate":PartitiontableData[scope.$index].MaintenanceNumber>0}'>{{PartitiontableData[scope.$index].MaintenanceNumber}}</span>
                                     </template>

                                    </el-table-column>
                                     <el-table-column
                                      label="预警未处理"
                                       width="100">
                                     <template slot-scope="scope">
                                      <span :class='{"earlywarning":PartitiontableData[scope.$index].EarlyWarningNumber>0}'>{{PartitiontableData[scope.$index].EarlyWarningNumber}}</span>
                                     </template>



                                    </el-table-column>
                                </el-table>
                              </div>
                              <div class="histogramchart">
                                    <ve-histogram
                                       height="300px"
                                      :data="chartDataPartition"
                                      :settings="chartSettingsPartition"
                                      :yAxis='yAxisOption'
                                      :legend-visible="false"
                                      :tooltip-visible="false"
                                      :extend="chartExtend"
                                      > 
                                      </ve-histogram>
                              </div>
                         </el-col>
                      <el-col :span="24" class="DivisonalStatistics">
                           <div class="HomepageTOPback">设备分区监测统计</div>
                              <div class="Partitiontable">
                                <el-table
                                    :data="classifydata"
                                    border
                                    stripe
                                    height='300'
                                    >
                                    <el-table-column
                                      prop="Name"
                                      label="区域"
                                      width="177">
                                    </el-table-column>
                                    <el-table-column
                                      prop="NormalNumber"
                                      label="正常"
                                      width="100">
                                    </el-table-column>
                                    <el-table-column
                                      label="离线"
                                      width="100">
                                   <template slot-scope="scope">
                                      <span :class='{"off-line":classifydata[scope.$index].OfflineNumber>0}'>{{classifydata[scope.$index].OfflineNumber}}</span>
                                   </template>
                                    </el-table-column>
                                    <el-table-column
                                      label="超标"
                                       width="100">
                                     <template slot-scope="scope">
                                      <span :class='{"overproof":classifydata[scope.$index].ExcessNumber>0}'>{{classifydata[scope.$index].ExcessNumber}}</span>
                                     </template>
                                    </el-table-column>
                                    <el-table-column
                                      label="维护"
                                       width="100">
                                      <template slot-scope="scope">
                                      <span :class='{"vindicate":classifydata[scope.$index].MaintenanceNumber>0}'>{{classifydata[scope.$index].MaintenanceNumber}}</span>
                                     </template>
                                    </el-table-column>
                                     <el-table-column
                                      label="预警未处理"
                                       width="100">
                                     <template slot-scope="scope">
                                      <span :class='{"earlywarning":classifydata[scope.$index].EarlyWarningNumber>0}'>{{classifydata[scope.$index].EarlyWarningNumber}}</span>
                                     </template>  
                                    </el-table-column>
                                </el-table>
                              </div>
                              <div class="histogramchart">
                                    <ve-histogram
                                       height="300px"
                                      :data="chartDataPartition"
                                      :settings="chartSettingsPartition"
                                      :legend-visible="false"
                                      :yAxis='yAxisOption'
                                      :tooltip-visible="false"
                                      :extend="chartExtend"
                                      > 
                                    </ve-histogram>
                              </div>
                         </el-col>
                       </el-col>
                        <el-col :span="4"  class="Homepagebuttomright">
                               <el-col  :span="24" class="Homepagebuttomrightlayout">
                                 
                               </el-col>
                        </el-col>
                      </el-col>
        </el-row>
    </el-row>
</template>
<script>
   import{GetGroupStatisticsData,GetloggerInfoTypeStatisticsData}from'@/api/api'
export default {
          data(){
            return{
                   PartitiontableData:[],//分区数据
                   classifydata:[],
                   chartDataPartition :{ 
                        rows: [],
                        columns:['nameshow'],     
                  },
                  RRRows:[],
                  chartSettingsPartition :{
                       metrics:['CountNumber'],
                       label: {
                          normal: { show: true, position: "top" }
                        },
                     itemStyle:{
                        normal:{
                          color:function(item){
                            var colorList = ['#7cb9f0','#51b56b','#ffb400','#ff6c00','#07acd0','#e50005'];
                            return colorList[item.dataIndex];
                          }
                        }
                      },
                  },

                chartExtend:{
                      barWidth: '35px'
                },    
                yAxisOption:{
                    axisLine: {
                      show: true,
                      lineStyle:{color:'#b1b1b1'},//y轴坐标的显示颜色
                    },
                    name:'数量(台)',
                },
              }
          },
          methods:{
               GetDivisional(){//分区同级数据显示表格
                  GetGroupStatisticsData().then(res => {
                    console.log("分区列表显示")
                      console.log(res)
                      console.log(res.Data.CountNumber)
                      for(let item of res.Data.ListTable){
                           this.PartitiontableData.push(item);
                      }
                      var RRRows = [
                          {CountNumber:res.Data.CountNumber,nameshow:'总数'},//总台数
                          {CountNumber:res.Data.NormalNumber,nameshow:'正常数'},//正常数
                          {CountNumber:res.Data.OfflineNumber,nameshow:'离线'},//离线数
                          {CountNumber:res.Data.ExcessNumber,nameshow:'超标'},//超标数
                          {CountNumber:res.Data.MaintenanceNumber,nameshow:'维护'},//维护数
                          {CountNumber:res.Data.EarlyWarningNumber,nameshow:'预警未处理'}//报警未处理
                      ]
                        this.RRRows = RRRows;
                        this.chartDataPartition.rows= this.RRRows
                       console.log(this.chartDataPartition.rows)
                    }) 
               },
              Getclassify(){//分区分类数据显示接口
                    GetloggerInfoTypeStatisticsData().then(res=>{
                         console.log("分类数据")
                          console.log(res)
                          for(let item of res.Data.ListTable){
                              this.classifydata.push(item)
                          }

                    })
              },
          },
          mounted(){
               this.GetDivisional()//分区
               this.Getclassify()//分类数据
          },
}
</script>
<style lang="scss" scoped>
     .Homepage{
           background: #eaedf1;
           margin: 20px;
           height: 100%;
         .HomepageTOP{
         	 height: 574px;
         	 min-width: 1680px;
             .HomepageTOPleft{
             	 border: 1px solid #d7d7d7;
             	 background: #ffffff;
             	 height: 574px;
             	 width: 1300px;

             	 .HomepageTOPIcon{
             	 	padding: 30px 20px;
             	 	.HomepageTOPPicture{
             	 		display: inline-block;
             	 	}
             	 }
                 .NetworkEquipment{
                 	display: inline-block;
                 	text-align: center;
                 	 height:450px;
                 	 width: 390px;
                 	 margin-left: 10px;
                 	 border: 1px solid  #e8e8e8; 
                 	 .NetworkEquipmentIcon{
                 	 	display: inline-block;
                 	 	width: 390px;
                 	 	height: 330px;	
                 	 }
                     .Cloudconfiguration{
                     	font-size: 16px;
                     	font-family: "Microsoft YaHei" !important;
                     	text-align: center;

                     }
                    .CloudconfigurationIntroduction{
                    	margin-top: 15px;
                    	display: inline-block;
                    	width: 300px;
                    }
                 }
                 .NetworkEquipmentIconWIFI{
                 	background: url(../assets/img/pic_1.png);
                 	margin-right: 18px;
                 }
                .NetworkEquipmentIconTomonitor{
                	background: url(../assets/img/pic_2.png);
                	margin-right: 18px;
                 }
                .NetworkEquipmentIconalarm{
                	background: url(../assets/img/pic_3.png)
                }
             }
             .HomepageTOPright{
             	padding-left: 25px;
             	height: 574px;
                width: 373px;
             	.HomepageTOPrightTop{
             		height: 229px;
             		border: 1px solid #d7d7d7;
             		border-radius: 5px;
             	}
               .Wechatlocation{
               	  height: 179px;
               	  position: relative;
               	  .vmiddle {
               	  	height: 100%;
               	  	position: absolute;
               	  	top: 0;
               	  	right: 0;
               	  	bottom: 0;
               	  	left: 0;
               	  	margin: auto;
               	  }
                  .WechatICon{
                  	margin: 24px 0px 0px 20px;
                  	border: 1px solid #c8c8c8;
                  	width: 125px;
                  	height: 125px;
                  	border-radius: 10px;
                  	display: inline-block;
                    position: relative;
                    background: #ffffff;
                  }
                  .Accounts{
                    background: url(../assets/img/WeChat.png)  no-repeat 1px 1px;
                  }
                  .Description{
                  	display: inline-block;
                  }
                  .Wechatfontsize{
                  	 font-family: "Microsoft YaHei" !important;
                  	 font-size: 14px;
                  	 color: #444444;
                     height: 20px;
                     padding-left: 10px;
                  }
               }
                 .HomepageTOPrightbottom{
                  margin-top: 20px;
                   border: 1px solid #c8c8c8;
                    border-radius: 5px;
                    height: 322px;
                    .Appheight{
                      position: relative;
                      height: 212px;
                    }
                    .IOS{
                      background: url(../assets/img/ios.png)  no-repeat 7px 6px;
                    } 
                    .Android{
                       background: url(../assets/img/android.png)  no-repeat 10px 11px;
                    }
                    .Download{
                      text-align: center;
                      margin-top: 12px;
                      .fontDescribe{
                        display: inline-block;
                        height: 26px;
                        border: 1px solid #c8c8c8;
                        border-radius: 13px;
                        width: 100px;
                        font-family: "Microsoft YaHei" !important;
                        font-size: 14px;
                        color: #888888;
                        line-height: 26px;
                      }
                    }
                    .Presentation{
                      padding: 20px;
                      font-size: 14px;
                      color: #888888;
                    }
                 }
             }  
         }
          .FocusPlatform{
          	 height: 45px;
          	 font-family: "Microsoft YaHei" !important;
          	 font-size: 16px;
          	 line-height:45px;
          	 padding-left: 20px;
          	 border-bottom: 1px solid #d7d7d7;
          }
         .Homepagebuttom{
              margin: 20px 0px 20px 0px;
                 min-width: 1680px;
              .DivisonalStatistics{
                 height: 385px;
                 border: 1px solid  #d7d7d7;
                 border-radius: 5px;
                 background: #ffffff;
                 width: 1300px;
                 margin-bottom: 24px;
              }
            
         }
        .HomepageTOPback{
            height: 45px;
            background: #f4f4f4;
            padding-left: 20px;
            font-size: 16px;
            font-family: "Microsoft YaHei" !important;
            line-height: 45px;
            border-bottom: 1px solid  #d7d7d7;
           }
         .Partitiontable{
               width: 678px;
               text-align: center;
               margin: 20px;
               display: inline-block;
           }
          .histogramchart{
               width: 500px;
               height: 300px;
               display: inline-block;
          }
          .Homepagebuttomleft{
            width: 1300px;
          }

          .Homepagebuttomright{
             padding-left: 25px;
              .Homepagebuttomrightlayout{
                 border:1px solid #d7d7d7;
                  width: 346px;
                  height: 600px;
                  border-radius: 5px;
              }

          }
          .off-line{
              color: #ffb400;
           }
           .overproof{
              color: #ff6c00;
           }
           .vindicate{
             color: #07acd0;
           }
           .earlywarning{
             color: #e50005;
           }

     }
</style>
<style type="text/css">
   .Partitiontable .cell{
      text-align: center;
   }
      .DivisonalStatistics .el-table .is-leaf{
               background: #7cb9f0;
               color: #ffffff;
       }
    .Partitiontable .el-table__body{
      height: 251px;
     width: 100%;
    }



</style>


