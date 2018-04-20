<template>
  <el-row class="GraphPresentation">
	  <el-row>
		    <el-col :span='24'>
			    <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon"><i class="el-icon-location"></i><span>{{$t('m.Location')}}</span><i class="el-icon-arrow-right">{{$t('m.RealTimeMonitoring')}}</i><i class="el-icon-arrow-right"><span class="currentcolor">{{$t('m.GraphResentation')}}</span></i></div> 
			      </el-col>
			   </el-row>
		   </el-col>
	  </el-row>
     <el-row class="GraphPresentationCoent">
		  <el-col :span="4" class="lightZone">
			  	<div class="grid-content bg-purple">
			  		 <div class="AreaSearch AreaSearchshow">
				  		   <el-input
                    class="actualtime"
    						    :placeholder="$t('m.DeviceNumber')"
    						    v-model='SeachPartation'
                    @keyup.enter.native='GetEquipmentList()'

						     >
						  </el-input> 
            <i class="SystemManaSearch" @click="Realtimesearch"></i>
					  </div>　
                <div class="PartitionList" v-for='item in PositionList' :key='item.Id' size="small" >
                       <el-radio-group v-model="SelectDelete">
                         <el-radio :label="item.Id"  @change="DeletePartition"> 	
                           {{item.GroupName}}
                          </el-radio>
                        </el-radio-group>   
                </div> 
			  	</div>
		  </el-col>  
          <el-col :span="20" class="InstrumentsDisplay">
              <div class="Apparatus" v-for="item in EquipmentList"  :item='item.LoggerSn'>
              	<div class="Apparatustop">
              		<span class="EquipmentIcon"></span>
              		 <div class="Equipmentmodel">
                    <el-tooltip :content="item.LoggerName" placement="top" >
              		 	<div class="EquipmentName">{{item.LoggerName}}</div>
                    </el-tooltip>
              		 	<div class="EquipmentNumber">({{item.LoggerSn}})</div>
              		 </div>
              		<div class="EquipmentState">
              			<div class="EquipmentElectric">
              				<span  class="battry" :class='{
                                  "Batterythree":item.BatteryStatus==3||item.BatteryStatus==17||item.BatteryStatus==11||item.BatteryStatus==7||item.BatteryStatus==1,
                                  "Nopower":item.BatteryStatus==8||item.BatteryStatus==4,
                                   "Batteryone":item.BatteryStatus==5||item.BatteryStatus==9,
                                   "Batterytwo":item.BatteryStatus==6||item.BatteryStatus==10,
                                    }'></span>
              				<span class="battry noplugIn" :class='{
                      "plugIn":item.BatteryStatus==3||item.BatteryStatus==2||item.BatteryStatus==8||item.BatteryStatus==9||item.BatteryStatus==10||item.BatteryStatus==11
                    }'></span>
                    </div>
              				<div class="Updatatimes">{{item.LogsTime}}</div>
              			
              		</div> 
              	</div>
              <div class="Oneaisle" v-if='item.LoggerChnum==1' >
                     <div class="Oneleft" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>{{item.LogsChone}}</div>
                       <div class="Oneright">
                          <span class="onechum">{{item.ChoneType ===8 ? item.ChoneUs : SensorOptions[item.ChoneType].label}}</span>
                          <span class="onechum onechummiddle">{{item.ChoneHigh}}</span>
                          <span class="onechum">{{item.ChoneLow}}</span>
                       </div>
                </div> 
              <div class="Twoaisle"  v-if='item.LoggerChnum==2'>
                     <div class="Twochum  Twotopchum ">
                        <div  class="Twotopleftchum" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>{{item.LogsChone}}</div>
                           <div class="Twotoprightchum">
                              <span class="twochumvue">{{item.ChoneType ===8 ? item.ChoneUs : SensorOptions[item.ChoneType].label}}</span>
                              <span class="twochumvue twochumvuemiddle">{{item.ChoneHigh}}</span>
                              <span class="twochumvue">{{item.ChoneLow}}</span>
                           </div>
                     </div>
                     <div class="Twochum  Twobuttomchum">
                         <div  class="Twotopleftchum" :class='{"Overheat":item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)}'>{{item.LogsChtwo}}</div>
                          <div class="Twotoprightchum">
                              <span class="twochumvue">{{item.ChtwoType ===8 ? item.ChtwoUs : SensorOptions[item.ChtwoType].label}}</span>
                              <span class="twochumvue twochumvuemiddle">{{item.ChtwoHigh}}</span>
                              <span class="twochumvue">{{item.ChtwoLow}}</span>
                           </div>
                     </div>
               </div> 
               <div class="threeaisle"  v-if='item.LoggerChnum==3'>
                      <div class="threechum" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>
                           <div class="threechumvue" >{{item.LogsChone}}</div>
                           <div class="threechumvue">{{item.ChoneType ===8 ? item.ChoneUs : SensorOptions[item.ChoneType].label}}</div>
                      </div> 
                      <div class="threebottomchum">
                          <div class="threebottomchumvue" :class='{"Overheat":item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)}'>
                               <div class="threevalue" >{{item.LogsChtwo}}</div>
                               <div class="threevalue">{{item.ChtwoType ===8 ? item.ChtwoUs : SensorOptions[item.ChtwoType].label}}</div>
                          </div> 
                        <div class="threebottomchumvue threebottomchumline" :class='{"Overheat":item.LogsChthree>Number(item.ChthrHigh)||item.LogsChthree<Number(item.ChthrLow)}'>
                               <div class="threevalue" >{{item.LogsChthree}}</div>
                               <div class="threevalue">{{item.ChthrType ===8 ? item.ChthrUs : SensorOptions[item.ChthrType].label}}</div>
                          </div>  
                      </div>
                 </div>  
                <div class="fouraisle"  v-if='item.LoggerChnum==4'>
                     <div class="fourchum" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>
                        <div class="fourchumone" >{{item.LogsChone}}</div>
                        <div class="fourchumone ">{{item.ChoneType ===8 ? item.ChoneUs : SensorOptions[item.ChoneType].label}}</div>
                     </div>
                     <div class="fourchum fourchummiddle" :class='{"Overheat":item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)}'>
                           <div class="fourchumone" >{{item.LogsChtwo}}</div>
                           <div class="fourchumone ">{{item.ChtwoType ===8 ? item.ChtwoUs : SensorOptions[item.ChtwoType].label}}</div>
                     </div>
                     <div class="fourchum">
                           <div class="fourchumthree" :class='{"Overheat":item.LogsChthree>Number(item.ChthrHigh)||item.LogsChthree<Number(item.ChthrLow)}'>
                               <div class="threevalue">{{item.LogsChthree}}</div>
                               <div class="threevalue">{{item.ChthrType ===8 ? item.ChthrUs : SensorOptions[item.ChthrType].label}}</div>
                           </div>
                           <div class="fourchumthree fourchumthreeline" :class='{"Overheat":item.LogsChfour>Number(item.ChforHigh)||item.LogsChfour<Number(item.ChforLow)}'>
                             <div class="threevalue" >{{item.LogsChfour}}</div>
                             <div class="threevalue">{{ item.ChforType ===8 ? item.ChforUs :SensorOptions[item.ChforType].label}}</div>
                           </div>
                     </div>
                   </div>
              </div>
             <el-col :span="24">
                   <div class="myPagination"><!-- 组件翻页 -->
                        <el-pagination
                          background
                          layout="prev, pager, next,  total"
                          :total="totalNumber" 
                          :page-size='pageSize'
                          @current-change='pageIndexChange'>
                        </el-pagination>
                   </div>
             </el-col>
          </el-col>
	</el-row>  

  </el-row>
</template>
<script>
	import{GetGroupData,GetGraphicPresentation}from'@/api/api'
export default {
  data(){
      return{
        	EquipmentList:[],
          PositionList:[],//左侧分区显示
          SelectDelete:null,//选中删除
          SeachPartation:'',
          groupId:'',//分区ID
          pageIndex:1,//显示第一页
          pageSize:20,//每页6条
          totalNumber:null,
          ChannewFour:false,
          ChannewThree:false,
          ChannelTwo:false,
          ChannelOne:false,
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
     	  }

      },
   methods:{
         PartitionRequest(){//用户分区列表显示
	        	GetGroupData().then(res=>{
	        		 if(res.State==1){
		        		 this.PositionList=res.Data;
		        		 }
	        	})         
              },      
           DeletePartition(val){//左侧选中
               this.EquipmentList=[]//调用前清空
               this.GetEquipmentList()//点击请求一次
             },
        GetEquipmentList(){//设备列表请求
                  var params={
                  	 condition:this.SeachPartation,
                  	 groupId:this.SelectDelete,
                  	 pageIndex:this.pageIndex,
                  	 pageSize:this.pageSize,
                  }
               this.EquipmentList=[]//调用前清空
               GetGraphicPresentation(params).then(res=>{
                        console.log("-------------------")
                        console.log(res)


                     this.totalNumber=null;
	                for(let item of res.Data){
	                     this.totalNumber=res.TotalNumber;//总条数.
                       this.EquipmentList.push(
                            {
                               LoggerName:item.LoggerName,
                               LoggerSn:item.LoggerSn,
                               BatteryStatus:item.BatteryStatus,
                               ChforHigh:item.ChforHigh,
                               ChforLow:item.ChforLow,
                               ChforType:item.ChforType,
                               ChforUs:item.ChforUs,
                               ChoneHigh:item.ChoneHigh,
                               ChoneLow:item.ChoneLow,
                               ChoneType:item.ChoneType,
                               ChoneUs:item.ChoneUs,
                               ChthrHigh:item.ChthrHigh,
                               ChthrLow:item.ChthrLow,
                               ChthrType:item.ChthrType,
                               ChthrUs:item.ChthrUs,
                               ChtwoHigh:item.ChtwoHigh,
                               ChtwoLow:item.ChtwoLow,
                               ChtwoType:item.ChtwoType,
                               ChtwoUs:item.ChtwoUs,
                               LoggerChnum:item.LoggerChnum,
                               LoggerSn:item.LoggerSn,
                               LogsTime:item.LogsTime.slice(5,16),
                               LogsChone:item.LogsChone,
                               LogsChtwo:item.LogsChtwo,
                               LogsChthree:item.LogsChthree,
                               LogsChfour:item.LogsChfour,
                          }
                       ) 
	                 } 
                }) 
             },
        Realtimesearch(){//点击图标的时候查询
          this.GetEquipmentList()
        },
         pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
	             this.pageIndex = pageIndex;//传当前页面   
	              this.GetEquipmentList()// 列表刷新.
	           },
     	 },
   mounted(){
            this.PartitionRequest()//分区请求,
            this.GetEquipmentList()//展示数据.
            let _this = this;
            setInterval(() => {
              if('/GraphPresentation' === _this.$route.path){
                 _this.GetEquipmentList()//展示数据.一分钟刷新一次
              }
             
             },60000)  
     	 },
}
</script>
<style lang="scss" scoped>
    .GraphPresentation{
		   height:calc(100% - 20px);
		         background: #fefefe; 
            .GraphPresentationCoent{
            	  height:calc(100% - 20px);
                padding: 20px;
                background: #eaedf1;
            	  .lightZone {
				    height: calc(100% - 20px);
				    overflow-y: scroll;
				    .AreaSearch{
				    	    background: #fff;
                  display: inline-block;
                  text-align: center;
                  width: 240px;
                  border: 1px solid #d7d7d7;
                  margin: 20px 0px 20px 0px;
                  border-radius: 20px;
                  .el-input__inner{
                    border:none;
                  }
				    }
				    .PartitionList{
				    	padding: 10px;
              border-bottom: 1px solid #d7d7d7;
				    }
				  }
				  .InstrumentsDisplay{
				    padding-left: 20px;
            background: #fff;
            min-height:100%;
				          }
               }
           .myPagination{
				  	text-align: center;
             margin-top: 60px;
				  }
          .FlipFixed{
             height: calc(100% - 50px); 
             width: 100%;
             border:1px solid red;
          }
            .Apparatus{
            	display: inline-block;
            	height: 144px;
            	width: 240px;
            	border:1px solid #d7d7d7;
            	margin:20px 0px 0px 20px;
              float: left;
              border-radius: 4px;
            }
	           .Apparatustop{
	           	   height: 48px;
                 border-bottom: 1px solid  #d7d7d7;
                 overflow: hidden;   
                 background: #f4f4f4;
	           }
	          .EquipmentIcon{
	          	display: inline-block;
	          	height: 45px;
	          	width: 48px;
	          	background: url(../assets/img/icon.png) no-repeat -16px -320px ;
	          }
	         .Equipmentmodel{
	          	display: inline-block;
	          	width: 85px;
	            height: 100%;
	            vertical-align: top;
	         }
	         .EquipmentName {
	         	height: 30px;
	         	text-align: left;
	         	font-size: 16px;
	         	 font-family:"微软雅黑";
	         	 font-weight:bold;
             line-height: 31px;
              width: 90px;
              overflow: hidden;
	         }
	         .EquipmentNumber{
	         	text-align: left;
            font-size: 6px !important; 
            font-family: "Microsoft YaHei";
            color: #999999;
            width: 90px;
	         }
	         .EquipmentState{
	         	display: inline-block;
	            width:96px;
              height: 47px;
	            vertical-align: top;
	         }
	         .EquipmentElectric{
                height: 28px;
                display: inline-block;
                width: 94px;
	              text-align: right;
	         }
	         .Updatatimes{
	         	display: inline-block;
	         	height: 22px;
            font-size: 10px;
            color: #999999;
            width: 94px;
            text-align: right;
            line-height: 22px;
            padding-right: 5px;
	         }
	         .battry{
             display: inline-block;
              width: 31px;
              height: 18px;
              vertical-align: -webkit-baseline-middle;
	         }
	        .ExternalElectric{
	        	display: inline-block;
	        	width: 26px;
	        	height: 22px;
         
           
	        }
	        .hr{
			      height:1px;
		      	border:none;
		      	border-top:1px solid #f4f4f4;
		      	margin-top: 2px;
		      	margin-bottom: 0px;
	        }
          .Overheat{
            color: red;
          }
         .Oneaisle{
                height: 96px;
           }
          .Oneleft{
             width: 150px;
             font-family: "Microsoft YaHei" !important;
             font-size: 38px;
             height: 100%;
             display: inline-block;
             line-height: 96px;
             text-align: center;
          }
          .Oneright{
              display: inline-block;
               border-left: 1px solid #d7d7d7;
              height: 100%;
              width: 57px;
              vertical-align: top;
          }
         .onechum{
            display: inline-block;
            height: 30px;
            width: 85px;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
          }
          .onechummiddle{
            border-bottom: 1px solid  #d7d7d7;
            border-top: 1px solid  #d7d7d7;
            }
          .Twochum{
           height: 48px;
          }
       .Twotopleftchum{
          width: 150px;
          vertical-align: top;
          display: inline-block;
          height: 100%;
          text-align: center;
          line-height: 48px;
          font-size: 26px;
          font-family: "Microsoft YaHei" !important;
        }
          .Twotopchum{
            border-bottom: 1px solid  #d7d7d7;
          }
          .Twotoprightchum{
              display: inline-block;
              border-left: 1px solid #d7d7d7;
              height: 100%;
              width: 57px;
              vertical-align: top;
          }
          .twochumvue{
             display: inline-block;
             width: 85px;
             height: 13px;
             line-height: 13px;
             text-align: center;
             font-size: 12px;
             font-family: "Microsoft YaHei"
          }
          .twochumvuemiddle{
                border-bottom: 1px solid #d7d7d7;
                border-top: 1px solid #d7d7d7;
          } 
         .threeaisle{
          height:144px;
        }
        .threechum{
          height: 64px;
          border-bottom: 1px solid #d7d7d7; 
        }
        .threebottomchum{
          height: 32px;
        }
        .threechumvue{
          display: inline-block;
          width: 115px;
          height: 64px;
          float: left;
          line-height: 64px;
          text-align: center;
          font-size: 35px;
        }
       .threebottomchumvue{
        display: inline-block;
        width: 117px;
        height: 32px;
        float: left;
       } 
       .threevalue{
         display: inline-block;
         width: 57px;
         float: left;
         height: 32px;
         text-align: center;
         line-height: 32px;
       }
       .threebottomchumline{
           border-left: 1px solid #d7d7d7;
        }
        .fouraisle{
           height:96px;
        }
       .fourchum{
         height: 32px;
       }
       .fourchummiddle{
          border-bottom: 1px solid #d7d7d7;
          border-top: 1px solid #d7d7d7;
        }
        .fourchumone{
           display: inline-block;
           width: 118px;
           float: left;
           height: 32px;
           text-align: center;
           line-height: 32px;
           font-size: 18px;
        }
        .fourchumthree{
            display: inline-block;
            width: 118px;
            float: left;
            height: 30px;
         }
         .fourchumthreeline{
              border-left: 1px solid #d7d7d7;
         }
        .Nopower{
        	background: url(../assets/img/icon.png) no-repeat  -267px -53px ;
        }
       .Batteryone{
            background: url(../assets/img/icon.png) no-repeat  -268px -34px ;
       } 
       .Batterytwo{
           background: url(../assets/img/icon.png) no-repeat  -267px -18px ;
       }
      .Batterythree{
               background: url(../assets/img/icon.png) no-repeat -12px -364px ;
       }
       .noplugIn{
            background: url(../assets/img/icon.png) no-repeat  -268px -71px ;
          
       }
      .plugIn{
           background: url(../assets/img/icon.png) no-repeat -12px -381px ;
      }

     .hr{
        height:1px;
        border:none;
        border-top:1px solid #d7d7d7;
        margin-top: 0px;
        margin-bottom: 0px;
      }
      .unusual{
        color:red;
      }
      .buttomfourlineLight{
            border-left: 1px solid #999999;
      }
       .actualtime{
          .actualtime{
             border:none;
             width: 190px !important;
          }
       }  
     .SystemManaSearch{
          display: inline-block;
          width: 30px;
          height: 30px;
          border-left: 1px solid #d7d7d7;
          background: url(../assets/img/icon.png) no-repeat -16px -445px;
          vertical-align: middle;
          cursor: pointer;
      }

    }
</style>
<style type="text/css">
        .el-input--suffix  .el-input__inner{
          border-radius: 20px;  
        }
        .actualtime{
          border:none;
          width: 180px;
        }
         .actualtime .el-input__inner{
           border:none;
         }
        .actualtime .actualtime{
          width: 190px;
        }
        .AreaSearchshow  .el-input{
            width: 180px;
        }
</style>

