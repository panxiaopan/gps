<template>
    <el-row class="Homepage">
      <el-row class="HomepageTOP">
	    	<el-col :span="20" class="HomepageTOPleft">
           <el-col :span="24">
	    	   <div class="HomepageTOPback">{{$t('m.HowToUse')}}</div>
            </el-col>
               <el-col :span="24" class="HomepageTOPIcon">
                    	<div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon  NetworkEquipmentIconWIFI"></i>
                    		 	   <div class="Cloudconfiguration">{{$t('m.LNCloud')}}</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	{{$t('m.Rj45')}}
                    		 	    </span>
                    		 </div>
                    	</div>
                      <div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon NetworkEquipmentIconTomonitor"></i>
                    		 	   <div class="Cloudconfiguration">{{$t('m.SNCloud')}}</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	{{$t('m.Tomonitor')}}
                    		 	    </span>
                    		 </div>
                    	</div>
                        <div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon NetworkEquipmentIconalarm"></i>
                    		 	   <div class="Cloudconfiguration">{{$t('m.SSLM')}}</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	   {{$t('m.monitoring')}}
                    		 	    </span>
                    		 </div>
                    	</div>
               </el-col>
	    	 </el-col>
	    	 <el-col :span="4" class="HomepageTOPright">
                   <el-col :span="24" class="HomepageTOPrightTop">
                   	    <div class="FocusPlatform">{{$t('m.Forusonwechat')}}</div>
                   	    <el-col :span='24' class="Wechatlocation" >
                            <el-col :span="12" style='position: relative;height:100%' >
                           	    	<div class="WechatICon vmiddle Accounts" >
                           	    	</div>
                            </el-col>
                            <el-col :span="12" style='height: 100%' >
                   	    	 <div class="Description" style='position: relative;width: 100%; height: 100%' >
                   	    	 	<div class='vmiddle' style='width: 100%; height: 40px' >
	                   	    	 	<div class="Wechatfontsize">{{$t('m.GetWechat')}}</div>
	                   	    	 	<!-- <div class="Wechatfontsize">微信报警信息推送</div> -->
                   	    	 	</div>
                   	    	 </div>
                            </el-col>
                   	    </el-col>
                   </el-col>
                   <el-col :span="24" class="HomepageTOPrightbottom Wechatlocation">
                            <div class="FocusPlatform">{{$t('m.AppDownload')}}</div>
                            <el-col :span="12"  class="Appheight" >
                                  <div class="WechatICon vmiddle IOS" >
                                  </div>
                                  <div class="Download"><span class="fontDescribe">{{$t('m.ForIOS')}}</span></div>
                            </el-col>
                           <el-col :span="12" class="Appheight" >
                                  <div class="WechatICon vmiddle Android" >
                                  </div>
                                   <div class="Download"><span class="fontDescribe">{{$t('m.ForAndroid')}}</span></div>
                            </el-col> 
                          <div class="Presentation">{{$t('m.HoATOCold')}}</div>
                   </el-col>
	    	 </el-col>
        </el-row>
        <el-row  class="Homepagebuttom">
                    <el-col :span='24'>
                       <el-col :span="20"  class="Homepagebuttomleft">
                         <el-col :span="24" class="DivisonalStatistics">
                           <div class="HomepageTOPback">{{$t('m.SiteMonitoring')}}</div>
                              <div class="Partitiontable">
                                <el-table
                                    :data="PartitiontableData"
                                    border
                                    height='300'
                                    style="width: 100%"
                                    >
                                    <el-table-column
                                      prop="Name"
                                      :label="$t('m.Site')"
                                      width="170">
                                    </el-table-column>
                                    <el-table-column
                                      prop="NormalNumber"
                                      :label="$t('m.Normal')"
                                      >
                                    </el-table-column>
                                    <el-table-column
                                      :label="$t('m.Offline')"
                                      >
                                   <template slot-scope="scope">
                                      <span :class='{"off-line":PartitiontableData[scope.$index].OfflineNumber>0}'>{{PartitiontableData[scope.$index].OfflineNumber}}</span>
                                   </template>
                                    </el-table-column>
                                    <el-table-column
                                       :label="$t('m.ExceedsRange')"
                                       width="125">
                                     <template slot-scope="scope">
                                      <span :class='{"overproof":PartitiontableData[scope.$index].ExcessNumber>0}'>{{PartitiontableData[scope.$index].ExcessNumber}}</span>
                                     </template>
                                    </el-table-column>
                                    <el-table-column
                                       :label="$t('m.Maintenance')"
                                       width="120">
                                     <template slot-scope="scope">
                                      <span :class='{"vindicate":PartitiontableData[scope.$index].MaintenanceNumber>0}'>{{PartitiontableData[scope.$index].MaintenanceNumber}}</span>
                                     </template>

                                    </el-table-column>
                                     <el-table-column
                                       :label="$t('m.Unsolved')"
                                       width="100">
                                     <template slot-scope="scope">
                                      <span :class='{"earlywarning":PartitiontableData[scope.$index].EarlyWarningNumber>0}'>{{PartitiontableData[scope.$index].EarlyWarningNumber}}</span>
                                     </template>
                                    </el-table-column>
                                </el-table>
                              </div>
                              <div class="histogramchart">
                                    <ve-histogram
                                       height="366px"
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
                           <div class="HomepageTOPback">{{$t('m.MonitoringEnvironmental')}}</div>
                              <div class="Partitiontable">
                                <el-table
                                    :data="classifydata"
                                    border
                                    height='300'
                                    style="width: 100%"
                                    >
                                    <el-table-column
                                      prop="Name"
                                      :label="$t('m.Deviceenvironment')"
                                      width="170">
                                    </el-table-column>
                                    <el-table-column
                                      prop="NormalNumber"
                                      :label="$t('m.Normal')"
                                      >
                                    </el-table-column>
                                    <el-table-column
                                      :label="$t('m.Offline')"
                                     >
                                   <template slot-scope="scope">
                                      <span :class='{"off-line":classifydata[scope.$index].OfflineNumber>0}'>{{classifydata[scope.$index].OfflineNumber}}</span>
                                   </template>
                                    </el-table-column>
                                    <el-table-column
                                       :label="$t('m.ExceedsRange')"
                                       width="125">
                                     <template slot-scope="scope">
                                      <span :class='{"overproof":classifydata[scope.$index].ExcessNumber>0}'>{{classifydata[scope.$index].ExcessNumber}}</span>
                                     </template>
                                    </el-table-column>
                                    <el-table-column
                                       width='120'
                                      :label="$t('m.Maintenance')"
                                      >
                                      <template slot-scope="scope">
                                      <span :class='{"vindicate":classifydata[scope.$index].MaintenanceNumber>0}'>{{classifydata[scope.$index].MaintenanceNumber}}</span>
                                     </template>
                                    </el-table-column>
                                     <el-table-column
                                       width='100'
                                      :label="$t('m.Unsolved')"
                                       >
                                     <template slot-scope="scope">
                                      <span :class='{"earlywarning":classifydata[scope.$index].EarlyWarningNumber>0}'>{{classifydata[scope.$index].EarlyWarningNumber}}</span>
                                     </template>  
                                    </el-table-column>
                                </el-table>
                              </div>
                              <div class="histogramchart">
                                    <ve-histogram
                                       height="366px"
                                      :data="LogicalPartition"
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
                                  <div class="Product">
                                    <span class="program">{{$t('m.NewSolutions')}}</span><span class="Seemore"><a href="http://www.huatos.com/home" target="_Blank">{{$t('m.Findmore')}}</a></span>
                                  </div>
                                   <el-row>
                                   <el-col :span="10" style="border-top: 1px solid #d7d7d7; height: 190px">
                                        <i class="layout Environmental"></i>
                                   </el-col>
                                   <el-col :span="14" style="border-top :1px solid #d7d7d7 ;height: 190px">
                                        <div style="font-size: 16px; color: #333333;margin-top: 14px">HT-HUM045-ZGB</div>
                                        <span style="margin-right: 20px; color: #666666;font-size:12px; ">{{$t('m.HTHUM045')}}</span>
                                   </el-col>
                                  </el-row>
                                 <el-row>
                                   <el-col :span="10" style="border-top: 1px solid #d7d7d7; height: 190px">
                                        <i class="layout Temperature"></i>
                                   </el-col>
                                   <el-col :span="14" style="border-top :1px solid #d7d7d7 ;height: 190px">
                                        <div style="font-size: 16px; color: #333333;margin-top: 14px">S500-TH</div>
                                        <span style="margin-right: 20px; color: #666666;font-size:12px; ">{{$t('m.S500TH')}}
                                        </span>
                                   </el-col>
                                  </el-row>
                                 <el-row>
                                   <el-col :span="10" style="border-top: 1px solid #d7d7d7; height: 190px">
                                        <i class="layout WTHR"></i>
                                   </el-col>
                                   <el-col :span="14" style="border-top :1px solid #d7d7d7 ;height: 190px">
                                        <div style="font-size: 16px; color: #333333;margin-top: 14px">S400</div>
                                        <span style="margin-right: 20px; color: #666666;font-size:12px; ">
                                         {{$t('m.S400')}}
                                      </span>
                                   </el-col>
                                 </el-row>
                                <el-row>
                                   <el-col :span="10" style="border-top: 1px solid #d7d7d7; height: 180px">
                                        <i class="layout Printingtemperature"></i>
                                   </el-col>
                                   <el-col :span="14" style="border-top :1px solid #d7d7d7 ;height: 180px">
                                        <div style="font-size: 16px; color: #333333;margin-top: 14px">S620GPRS-GSM</div>
                                        <span style="margin-right: 20px; color: #666666;font-size:12px; ">
                                           {{$t('m.S620GPRS')}}
                                      </span>
                                   </el-col>
                                 </el-row>

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
                LogicalPartition:{
                        rows: [],
                        columns:['nameshow'],  
                },
                Subarea:[],//分类
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
          props: ['changeLang'],
          watch: {
            changeLang () {
              console.log('change')
/*               this.GetDivisional()//分区
               this.Getclassify()//分类数据*/
              /* this.GetDivisional()//分区 */
            }
          },
          methods:{
              GetDivisional(){//分区同级数据显示表格
                  this.PartitiontableData=[]
                  GetGroupStatisticsData().then(res => {
                      console.log(res)
                      for(let item of res.Data.ListTable){
                           this.PartitiontableData.push(item);
                      }
                      var RRRows = [
                              {CountNumber:res.Data.CountNumber,nameshow: this.$t('m.total')  },//总台数
                              {CountNumber:res.Data.NormalNumber,nameshow:this.$t('m.Normal')},//正常数
                              {CountNumber:res.Data.OfflineNumber,nameshow:this.$t('m.Offline')},//离线数
                              {CountNumber:res.Data.ExcessNumber,nameshow:this.$t('m.ExceedsRange')},//超标数
                              {CountNumber:res.Data.MaintenanceNumber,nameshow:this.$t('m.Maintenance')},//维护数
                              {CountNumber:res.Data.EarlyWarningNumber,nameshow:this.$t('m.Unsolved')}//报警未处理
                      ]
                        this.RRRows = RRRows;
                        this.chartDataPartition.rows= this.RRRows
                    }) 
               },
              Getclassify(){//分区分类数据显示接口
                      this.classifydata=[]
                    GetloggerInfoTypeStatisticsData().then(res=>{
                          for(let item of res.Data.ListTable){
                              this.classifydata.push(item)
                          }
                     var Subarea = [
                          {CountNumber:res.Data.CountNumber,nameshow:this.$t('m.total')},//总台数
                          {CountNumber:res.Data.NormalNumber,nameshow:this.$t('m.Normal')},//正常数
                          {CountNumber:res.Data.OfflineNumber,nameshow:this.$t('m.Offline')},//离线数
                          {CountNumber:res.Data.ExcessNumber,nameshow:this.$t('m.ExceedsRange')},//超标数
                          {CountNumber:res.Data.MaintenanceNumber,nameshow:this.$t('m.Maintenance')},//维护数
                          {CountNumber:res.Data.EarlyWarningNumber,nameshow:this.$t('m.Unsolved')}//报警未处理
                     ]  
                      this.Subarea=Subarea
                      this.LogicalPartition.rows =this.Subarea
                    })
              },
          },
          mounted(){
               this.GetDivisional()//分区
               this.Getclassify()//分类数据*/
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
                   vertical-align: top;
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
                 	background: url(../assets/img/pic_1.png) no-repeat 64px 29px ;
                 	margin-right: 18px;
                 }
                .NetworkEquipmentIconTomonitor{
                	background: url(../assets/img/pic_2.png) no-repeat 49px 29px ;
                	margin-right: 18px;
                 }
                .NetworkEquipmentIconalarm{
                	background: url(../assets/img/pic_3.png) no-repeat 39px 25px;
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
                background: #fff;
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
                   
                  }
               }
                 .HomepageTOPrightbottom{
                  margin-top: 20px;
                   border: 1px solid #c8c8c8;
                    border-radius: 5px;
                    height: 322px;
                    background: #fff;
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
               vertical-align: top;
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
                  height: 795px;
                  border-radius: 5px;
                  background: #fff;
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
         .Homepagebuttomrightlayout{
                .layout{
                   display: inline-block;
                    width: 107px;
                    height:116px;
                    border: 1px solid #d7d7d7;  
                    margin: 35px 0px 0px 20px;
                }
               .Environmental{
                    background: url(../assets/img/HT-HUM045-ZGB.png) no-repeat;
               }
               .Temperature{
                     background: url(../assets/img/S500-TH.png) no-repeat;
               }
               .WTHR{
                    background: url(../assets/img/S400.png) no-repeat;
               }
               .Printingtemperature{
                    background: url(../assets/img/S620GPRS-GSM.png) no-repeat;
               }

         }
         .Product{
            height: 45px;
            .program{
                width: 150px;
                height: 45px;
                line-height: 45px;
                display:inline-block; 
                font-size: 16px;
                font-family: "Microsoft YaHei" !important;
                color: #333333;
                padding-left: 20px;
            }
            .Seemore{
              display: inline-block;
              height: 45px;
              width:80px;
              line-height: 45px;
              float: right;
              font-size: 14px;
              color: #888888;
              font-family: "Microsoft YaHei" !important;
              cursor: pointer;
            }
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


