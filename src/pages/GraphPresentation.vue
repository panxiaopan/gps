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
		                         <el-radio :label="item.Id" @change="DeletePartition"> 	
		                           {{item.GroupName}}
		                          </el-radio>
		                        </el-radio-group>
                       <hr  class="hr"/>    
                    </div> 
			  	</div>
		  </el-col>  
          <el-col :span="20" class="InstrumentsDisplay">
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
                    <hr noshade="noshade" class="hr" />
                  <div class="ChannelOne" v-if='item.LoggerChnum==1'>
                    	<span class="ChannelOnevalue" v-if='item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)' style='color: red'>{{item.LogsChone}}</span>
                         <span class="ChannelOnevalue" v-else style='color: #000'>{{item.LogsChone}}</span>
                          <span class="ChannelOneright ">
	                          <div class="units fromline"></div>
	                          <hr noshade="noshade" class="hr" />
 	                          <div class="upperlimit fromline">{{item.ChoneHigh}}</div>
 	                          <hr noshade="noshade" class="hr" />
	                          <div class="Downline fromline">{{item.ChoneLow}}</div> 
                          </span>
                    </div> 
                      <div class="ChannelTwo" v-if='item.LoggerChnum==2'>
                    	  <div class="ChannewTwo ChannelTwoup">
                   	        <span class="ChannewTwovalue" v-if='item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)' style="color: red">{{item.LogsChone}}</span>
                            <span class="ChannewTwovalue" v-else style="color: #000">{{item.LogsChone}}</span>
                               <div class="ChannewTworight">
		                   	        <div class="Twofromline"></div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChoneHigh}}</div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChoneLow}}</div>
                              </div>
                          </div>
                          <div  class="ChannewTwo">
                               <span class="ChannewTwovalue" v-if='item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)' style="color: red" >{{item.LogsChtwo}}</span>
                          	   <span class="ChannewTwovalue" v-else style="color: #000">{{item.LogsChtwo}}</span>
                               <div class="ChannewTworight">
		                   	        <div class="Twofromline"></div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChtwoHigh}}</div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChtwoLow}}</div>
                              </div>  
                          </div>
                   </div> 
                    <div class="ChannewThree" v-if='item.LoggerChnum==3'>
                    	 <div class="ChannewThreevalue">
                        <span class="Threevalue" v-if="item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)">{{item.LogsChone}}</span>
                    	 	<span class="Threevalue" v-else style="color: #000">{{item.LogsChone}}</span>

                    	 	<span class="Threevalue ">C</span>
                    	 </div>
                    	 <div class="Threebuttom">
                    	 	<div class="buttomline ThreebuttomlineRight ">
                           <span class="buttomvalue" v-if="item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)">{{item.LogsChtwo}}</span>
	                    	 	<span class="buttomvalue" v-else style="color: #000">{{item.LogsChtwo}}</span>
	                    	 	<span class="buttomvalue">C</span>
                    	 	</div>
                           <div class="buttomline">
                              <span class="buttomvalue" v-if="item.LogsChthree>Number(item.ChthrHigh)||item.LogsChthree<Number(item.ChthrLow)">{{item.LogsChthree}}</span>
                          	 	<span class="buttomvalue" v-else style="color: #000">{{item.LogsChthree}}</span>
                          	 	<span class="buttomvalue"></span>
                          </div>
                    	 </div>
                    </div> 
                    <div class="ChannewFour"  v-if='item.LoggerChnum==4'>
                    	<div class="ChannewFourvalue">
                        <span class="Channewvalue" v-if="item.LogsChone>Number(item.ChoneHigh)||item.LogsChone<Number(item.ChoneLow)" >{{item.LogsChone}}</span>
                    		<span class="Channewvalue " v-else style="color: #000">{{item.LogsChone}}</span>
                    		<span class="Channewvalue buttomlineLight"></span>

                    	</div>
                    	 <hr noshade="noshade" class="hr" />
                    	 <div class="ChannewFourvalue">
                          <span class="Channewvalue" v-if="item.LogsChtwo>Number(item.ChtwoHigh)||item.LogsChtwo<Number(item.ChtwoLow)">{{item.LogsChtwo}}</span>
                    	 	<span class="Channewvalue" v-else style="color: #000">{{item.LogsChtwo}}</span>
                    	 	<span class="Channewvalue buttomlineLight"></span>
                    	 </div>
                    	  <hr noshade="noshade" class="hr" />
                      <div class="ChannewFourvalue">
                    	 	<div class="fourbuttomline  ">
                          <span class="buttomvalue"  v-if="item.LogsChthree>Number(item.ChthrHigh)||item.LogsChthree<Number(item.ChthrLow)" >{{item.LogsChthree}}</span>
	                    	 	<span class="buttomvalue" v-else style="color: #000">{{item.LogsChthree}}</span>
	                    	 	<span class="buttomvalue"></span>
                    	 	</div>
                           <div class="fourbuttomline buttomlineLight">
                    	 	<span class="buttomvalue" v-if="item.LogsChfour>Number(item.ChforHigh)||item.LogsChfour<Number(item.ChforLow)">{{item.LogsChfour}}</span>
                        <span class="buttomvalue" v-else  style="color: #000">{{item.LogsChfour}}</span>
                    	 	<span class="buttomvalue"></span>
                          </div>
                    	 </div>
                    </div>
              	</div>
              </div>
          </el-col>
	</el-row>  
              <div class="myPagination">
				      <el-pagination
				        background
				        layout="prev, pager, next,  total"
				        :total="totalNumber" 
				        :page-size='pageSize'
				        @current-change='pageIndexChange'>
				      </el-pagination>
			   </div>
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
     	  }
      },
   methods:{
         PartitionRequest(){//用户分区列表显示
	        	GetGroupData().then(res=>{
	        		console.log("左面显示")
	        		 console.log(res)
	        		 if(res.State==1){
		        		 this.PositionList=res.Data;
		        		 }
	        	})         
              },      
           DeletePartition(val){//左侧选中
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
                this.totalNumber=null
               GetInstrumentData(params).then(res=>{
	               	console.log("liebiao")
	               	console.log(params)
	               	console.log(res)
	                for(let item of res.Data){
	                     this.totalNumber=res.Data.length;//总条数.
                       this.EquipmentList.push(item) 
 /*                    switch(String(item.LoggerChnum)){
                       case '1':
                           this.ChannelOne=true; 
                           break;
                       case '2':
                          this.ChannelTwo=true
                         break;
                       case '3':
                         this.ChannewThree=true
                         break;
                       case '4':
                         this.ChannewFour=true
                         break;                         
                        }*/
	                 } 
                }) 
             },          
         pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
	             this.pageIndex = pageIndex;//传当前页面   
	             this.GetEquipmentList()// 列表刷新.
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
		         border: 1px solid red;
		    .CurrentPosition{
		    		height: 40px;
		    		background:#f7f7f7; 
		    		.NowPositon{
		              line-height: 40px;
		              margin-left: 15px;
		    		}
		    	}  
            .GraphPresentationCoent{
            	  height:calc(100% - 120px);
            	  border: 1px solid blue;
                padding: 20px;
                background: #eaedf1;
            	  .lightZone {
		        	border:1px solid ;

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
				    border:1px solid ;
				    height: calc(100% - 20px); 
				    padding-left: 20px;
            background: #fff;
				      }

                }
           .myPagination{
				  	text-align: center;
				  }
            .Apparatus{
            	display: inline-block;
            	height: 192px;
            	width: 23%;
            	border:1px solid #999999;
            	margin:20px 0px 0px 20px;
            }
	           .Apparatustop{
	           	   height: 48px;
	           }
	          .EquipmentIcon{
	          	display: inline-block;
	          	height: 40px;
	          	width: 40px;
	          	background: url(../assets/img/icon.png) no-repeat -20px -320px ;
	          }
	         .Equipmentmodel{
	          	display: inline-block;
	          	width: 40%;
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
	            width: 40%;
	            vertical-align: top;
	         }
	         .EquipmentElectric{
              text-align: right;
	           	height: 100%;
	         }
	         .Updatatime{
	         	display: inline-block;
	         	height: 20px;

	         }
	         .battry{
             display: inline-block;
              width: 30%;
              height: 22px;
	         }
	        .ExternalElectric{
	        	display: inline-block;
	        	width: 28%;
	        	height: 22px;
	        }
	        .hr{
			    height:1px;
		      	border:none;
		      	border-top:1px solid #f4f4f4;
		      	margin-top: 2px;
		      	margin-bottom: 0px;
	        }
	      .ChannelOnevalue{
	      	display: inline-block;
	         height: 136px;
	      	border-right: 1px solid #999999;
	      	width: 70%;
	      	font-size: 20px;

	      	text-align: center;
	      	line-height: 136px;
	      }   
	      .fromline{
	      	display: inline-block;
	      	height: 40px;
	      	vertical-align: top;
	      	width: 100%;
	      	text-align: center;
	      	line-height: 40px;
	      } 
	      .ChannelOneright{
	      	display: inline-block;
	      	vertical-align:top;
	      	width: 27%;
	      }
        .ChannewTwo{
        	height: 68px;
        }
        .ChannewTwovalue{
        	display: inline-block;
        	height: 68px;
        	width: 70%;
        	border-right: 1px solid #999999;
        	vertical-align: top;
          text-align: center;
          line-height: 68px;
        }
        .ChannelTwoup{
        	border-bottom: 1px solid #999999;
        }
        .Twofromline{
        	 display: inline-block;
        	 height: 22px;
        	 vertical-align: top;
        	 width: 100%;
        	 font-size: 12px;
        	 color: #333333;
           line-height: 24px;
           text-align: center;

        }
        .ChannewTworight{
        	width: 27%;
        	display: inline-block;
        	vertical-align: top;

        }
        .ChannewThreevalue{
        	border-bottom: 1px solid #999999;
        	height: 100px;
        }
        .Threevalue{
        	display: inline-block;
        	color: red;
        	width: 48%;
        	font-size: 20px;
        	text-align: center;
        	line-height: 100px;
        }
        .Channewvalue{
        	display: inline-block;
        	color: red;
        	width: 48%;
        	font-size: 20px;
          height: 46px;
        	text-align: center;
          vertical-align: top;
          line-height: 46px;
        }
        .buttomline{
        	display: inline-block;
        	width: 48%;
        	height: 35px;
        	text-align: center;
          vertical-align: top;
        }
        .fourbuttomline{
           display: inline-block;
        	width: 48%;
        	text-align: center;
          height:44px;
        	vertical-align: top; 
        }
        .ThreebuttomlineRight{
        	border-right: 1px solid #999999;
        }
        .buttomvalue{
        	display: inline-block;
        	width: 20%;
        	height: 100%;
          vertical-align: top;
          line-height: 35px;
        }
        .ChannewFourvalue{
        	
        }
        .Nopower{

        	background: url(../assets/img/icon.png) no-repeat  -268px -52px ;
        }
       .Batteryone{
            background: url(../assets/img/icon.png) no-repeat  -268px -33px ;
       } 
       .Batterytwo{
           background: url(../assets/img/icon.png) no-repeat  -268px -15px ;
       }
       .Batterythree{
               background: url(../assets/img/icon.png) no-repeat -13px -361px ;
       }
       .plugIn{
            background: url(../assets/img/icon.png) no-repeat  -268px -68px ;
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
      .buttomlineLight{
            border-left: 1px solid #999999;
      }
    }
</style>
<style type="text/css">
        .el-input--suffix  .el-input__inner{
          border-radius: 20px;  
        }
</style>

