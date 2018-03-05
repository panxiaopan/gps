<template>
  <el-row class="GraphPresentation">
	  <el-row>
		    <el-col :span='24'>
			    <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">实时监控</i><i class="el-icon-arrow-right">图形展示</i></div> 
			      </el-col>
			   </el-row>
		   </el-col>
	  </el-row>
     <el-row class="GraphPresentationCoent">
		  <el-col :span="4" class="lightZone">
			  	<div class="grid-content bg-purple">
			  		 <div class="AreaSearch">
				  		   <el-input
						    placeholder="设备编号或名称"
						    suffix-icon="el-icon-search"
						    v-model='SeachPartation'
                 @keyup.enter.native='GetEquipmentList()'
						     >
						  </el-input> 
					  </div>　
                <div class="PartitionList" v-for='item in PositionList' :key='item.Id' size="small" >
                       <el-radio-group v-model="SelectDelete">
                         <el-radio :label="item.Id"  @change="DeletePartition"> 	
                           {{item.GroupName}}
                          </el-radio>
                        </el-radio-group>
                   <hr  class="hr"/>    
                </div> 
			  	</div>
		  </el-col>  
          <el-col :span="20" class="InstrumentsDisplay">
            <el-col :span="20" class="FlipFixed">

              <div class="Apparatus" v-for="item in EquipmentList"  :item='item.LoggerSn'>
              	<div class="Apparatustop">
              		<span class="EquipmentIcon"></span>
              		 <div class="Equipmentmodel">
              		 	<div class="EquipmentName">{{item.LoggerName}}</div>
              		 	<div class="EquipmentNumber">{{item.LoggerSn}}</div>
              		 </div>
              		<div class="EquipmentState">
              			<div class="EquipmentElectric">
              				<span :class='{
                                  "battry Batterythree":item.BatteryStatus==3||item.BatteryStatus==17||item.BatteryStatus==11||item.BatteryStatus==7||item.BatteryStatus==1,
                                  "battry Nopower":item.BatteryStatus==8||item.BatteryStatus==4,
                                  "battry Batteryone":item.BatteryStatus==5||item.BatteryStatus==9,
                                  "battry Batterytwo":item.BatteryStatus==6||item.BatteryStatus==10,
                                  "battry":item.BatteryStatus==0,
                                    }' ></span>
              				<span :class='{
                      "ExternalElectric plugIn":item.BatteryStatus==3||item.BatteryStatus==2||item.BatteryStatus==8||item.BatteryStatus==9||item.BatteryStatus==10||item.BatteryStatus==11
                    }'></span>
              				<div class="Updatatime">{{item.LogsTime}}</div>
              			</div>
              		</div> 
              	</div>
              <div class="Oneaisle" v-if='item.LoggerChnum==1' >
                     <div class="Oneleft" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>{{item.LogsChone}}</div>
                       <div class="Oneright">
                          <span class="onechum">{{SensorOptions[item.ChoneType].label}}</span>
                          <span class="onechum onechummiddle">{{item.ChoneHigh}}</span>
                          <span class="onechum">{{item.ChoneLow}}</span>
                       </div>
                </div> 
              <div class="Twoaisle"  v-if='item.LoggerChnum==2'>
                     <div class="Twochum  Twotopchum ">
                        <div  class="Twotopleftchum" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>{{item.LogsChone}}</div>
                           <div class="Twotoprightchum">
                              <span class="twochumvue">{{SensorOptions[item.ChoneType].label}}</span>
                              <span class="twochumvue twochumvuemiddle">{{item.ChoneHigh}}</span>
                              <span class="twochumvue">{{item.ChoneLow}}</span>
                           </div>
                     </div>
                     <div class="Twochum  Twobuttomchum">
                         <div  class="Twotopleftchum" :class='{"Overheat":item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)}'>{{item.LogsChtwo}}</div>
                          <div class="Twotoprightchum">
                              <span class="twochumvue">{{SensorOptions[item.ChtwoType].label}}</span>
                              <span class="twochumvue twochumvuemiddle">{{item.ChtwoHigh}}</span>
                              <span class="twochumvue">{{item.ChtwoLow}}</span>
                           </div>
                     </div>
               </div> 
               <div class="threeaisle"  v-if='item.LoggerChnum==3'>
                      <div class="threechum" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>
                           <div class="threechumvue" >{{item.LogsChone}}</div>
                           <div class="threechumvue">{{SensorOptions[item.ChoneType].label}}</div>
                      </div> 
                      <div class="threebottomchum">
                          <div class="threebottomchumvue" :class='{"Overheat":item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)}'>
                               <div class="threevalue" >{{item.LogsChtwo}}</div>
                               <div class="threevalue">{{SensorOptions[item.ChtwoType].label}}</div>
                          </div> 
                        <div class="threebottomchumvue threebottomchumline" :class='{"Overheat":item.LogsChthree>Number(item.ChthrHigh)||item.LogsChthree<Number(item.ChthrLow)}'>
                               <div class="threevalue" >{{item.LogsChthree}}</div>
                               <div class="threevalue">{{SensorOptions[item.ChthrType].label}}</div>
                          </div>  
                      </div>
                 </div>  
                <div class="fouraisle"  v-if='item.LoggerChnum==4'>
                     <div class="fourchum" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>
                        <div class="fourchumone" >{{item.LogsChone}}</div>
                        <div class="fourchumone ">{{SensorOptions[item.ChoneType].label}}</div>
                     </div>
                     <div class="fourchum fourchummiddle" :class='{"Overheat":item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)}'>
                           <div class="fourchumone" >{{item.LogsChtwo}}</div>
                           <div class="fourchumone ">{{SensorOptions[item.ChtwoType].label}}</div>
                     </div>
                     <div class="fourchum">
                           <div class="fourchumthree" :class='{"Overheat":item.LogsChthree>Number(item.ChthrHigh)||item.LogsChthree<Number(item.ChthrLow)}'>
                               <div class="threevalue">{{item.LogsChthree}}</div>
                               <div class="threevalue">{{SensorOptions[item.ChthrType].label}}</div>
                           </div>
                           <div class="fourchumthree fourchumthreeline" :class='{"Overheat":item.LogsChfour>Number(item.ChforHigh)||item.LogsChfour<Number(item.ChforLow)}'>
                             <div class="threevalue" >{{item.LogsChfour}}</div>
                             <div class="threevalue">{{SensorOptions[item.ChforType].label}}</div>
                           </div>
                     </div>
                   </div>
              </div>
            </el-col>
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

          </el-col>
	</el-row>  

  </el-row>
</template>
<script>
	import{GetGroupData,GetInstrumentData}from'@/api/api'
export default {
  data(){
      return{
        	EquipmentList:[],
          PositionList:[],//左侧分区显示
          SelectDelete:null,//选中删除
          SeachPartation:'',
          groupId:'',//分区ID
          pageIndex:1,//显示第一页
          pageSize:6,//每页6条
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
              this.totalNumber=null;
               GetInstrumentData(params).then(res=>{
	                for(let item of res.Data){
	                     this.totalNumber=res.Data.length;//总条数.
                       this.EquipmentList.push(item) 
	                 } 
                }) 
             },          
         pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
	             this.pageIndex = pageIndex;//传当前页面   
	             /*this.GetEquipmentList()// 列表刷新.*/
	           },

     	 },
   mounted(){
            this.PartitionRequest()//分区请求,
            this.GetEquipmentList()//展示数据.
     	 },

}
</script>
<style lang="scss" scoped>
    .GraphPresentation{
    	
		   height: calc(100% - 20px);
		         background: #fefefe;
		    .CurrentPosition{
		    		height: 40px;
		    		background:#f7f7f7; 
		    		.NowPositon{
		              line-height: 40px;
		              margin-left: 15px;
		    		}
		    	}  
            .GraphPresentationCoent{
            	  height:calc(100% - 20px);
                padding: 20px;
                background: #eaedf1;
            	  .lightZone {
				    height: calc(100% - 20px);
				    overflow-y: scroll;
				    .AreaSearch{
				    	padding: 20px;
				    }
				    .PartitionList{
				    	margin-left: 11%;
				    	padding: 10px;
				    }
				  }
				  .InstrumentsDisplay{
				    height: calc(100% - 10px); 
				    padding-left: 20px;
            background: #fff;
            overflow: hidden;
				          }
               }
           .myPagination{
				  	text-align: center;
				  }
          .FlipFixed{
             height: calc(100% - 50px); 
             width: 100%;
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
	          	height: 40px;
	          	width: 40px;
	          	background: url(../assets/img/icon.png) no-repeat -20px -320px ;
	          }
	         .Equipmentmodel{
	          	display: inline-block;
	          	width: 85px;
	            height: 100%;
	            vertical-align: top;
	         }
	         .EquipmentName {
	         	height: 24px;
	         	text-align: center;
	         	font-size: 14px;
	         	 font-family:"微软雅黑";
	         	 font-weight:bold;
	         }
	         .EquipmentNumber{
	         	text-align: center;
	         }
	         .EquipmentState{
	         	display: inline-block;
	            height: 100%;
	            width: 103px;
	            vertical-align: top;
	         }
	         .EquipmentElectric{
             
	           	height: 100%;
	         }
	         .Updatatime{
	         	display: inline-block;
	         	height: 20px;
            font-size: 10px;
            color: #999999;
            width: 102px;

	         }
	         .battry{
             display: inline-block;
              width: 60px;
              height: 22px;
	         }
	        .ExternalElectric{
	        	display: inline-block;
	        	width: 36px;
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
             font-size: 18px;
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
            height: 32px;
            width: 85px;
            line-height: 32px;
            text-align: center;
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
          font-size: 20px;
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
             height: 16px;
             line-height: 16px;
             text-align: center;
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
          font-size: 20px;
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

        	background: url(../assets/img/icon.png) no-repeat  -237px -52px ;
        }
       .Batteryone{
            background: url(../assets/img/icon.png) no-repeat  -236px -33px ;
       } 
       .Batterytwo{
           background: url(../assets/img/icon.png) no-repeat  -235px -15px ;
       }
      .Batterythree{
               background: url(../assets/img/icon.png) no-repeat 20px -361px ;
       }
       .plugIn{
            background: url(../assets/img/icon.png) no-repeat  -13px -380px  ;
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
             
    }
</style>
<style type="text/css">
        .el-input--suffix  .el-input__inner{
          border-radius: 20px;  
        }
</style>

