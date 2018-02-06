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
						     >
						  </el-input> 
					  </div>　
                    <div class="PartitionList" v-for='item in PositionList' :key='item.Id' size="small" >
                           <el-radio-group v-model="SelectDelete">
		                         <el-radio :label="item.Id" @change="DeletePartition"> 	
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
              		 	<div class="EquipmentName">{{item.LoggerName}}</div>
              		 	<div class="EquipmentNumber">{{item.LoggerSn}}</div>
              		 </div>
              		<div class="EquipmentState">
              			<div class="EquipmentElectric">
              				<span class="battry"></span>
              				<span class="ExternalElectric"></span>
              				<div class="Updatatime">{{item.LogsTime}}</div>
              			</div>
              		</div> 
                    <hr noshade="noshade" class="hr" />
                  <div class="ChannelOne" v-show="ChannelOne">
                    	<span class="ChannelOnevalue">{{item.LogsChone}}</span>
                          <span class="ChannelOneright ">
	                          <div class="units fromline"></div>
	                          <hr noshade="noshade" class="hr" />
 	                          <div class="upperlimit fromline">{{item.ChoneHigh}}</div>
 	                          <hr noshade="noshade" class="hr" />
	                          <div class="Downline fromline">{{item.ChoneLow}}</div> 
                          </span>
                    </div> 
                         <div class="ChannelTwo" v-show="ChannelTwo">
                    	  <div class="ChannewTwo ChannelTwoup">
                   	        <span class="ChannewTwovalue">{{item.LogsChone}}</span>
                               <div class="ChannewTworight">
		                   	        <div class="Twofromline"></div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChoneHigh}}</div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChoneLow}}</div>
                              </div>
                          </div>
                          <div  class="ChannewTwo">
                          	   <span class="ChannewTwovalue">{{item.LogsChtwo}}</span>
                               <div class="ChannewTworight">
		                   	        <div class="Twofromline"></div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChtwoHigh}}</div>
		                   	         <hr noshade="noshade" class="hr" />
		                   	        <div class="Twofromline">{{item.ChtwoLow}}</div>
                              </div>  
                          </div>
                   </div> 
                    <div class="ChannewThree" v-show="ChannewThree">
                    	 <div class="ChannewThreevalue">
                    	 	<span class="Threevalue">{{item.LogsChone}}</span>
                    	 	<span class="Threevalue ">C</span>
                    	 </div>
                    	 <div class="Threebuttom">
                    	 	<div class="buttomline ThreebuttomlineRight ">
	                    	 	<span class="buttomvalue">{{item.LogsChtwo}}</span>
	                    	 	<span class="buttomvalue">C</span>
                    	 	</div>
                           <div class="buttomline">
                    	 	<span class="buttomvalue">{{item.LogsChthree}}</span>
                    	 	<span class="buttomvalue"></span>
                          </div>
                    	 </div>
                    </div> 
                    <div class="ChannewFour" v-show="ChannewFour">
                    	<div class="ChannewFourvalue">
                    		<span class="Channewvalue">{{item.LogsChone}}</span>
                    		<span class="Channewvalue"></span>

                    	</div>
                    	 <hr noshade="noshade" class="hr" />
                    	 <div class="ChannewFourvalue">
                    	 	<span class="Channewvalue">{{item.LogsChtwo}}</span>
                    	 	<span class="Channewvalue"></span>
                    	 </div>
                    	  <hr noshade="noshade" class="hr" />
                      <div class="ChannewFourvalue">
                    	 	<div class="fourbuttomline ThreebuttomlineRight ">
	                    	 	<span class="buttomvalue">{{item.LogsChthree}}</span>
	                    	 	<span class="buttomvalue"></span>
                    	 	</div>
                           <div class="fourbuttomline">
                    	 	<span class="buttomvalue">{{item.LogsChfour}}</span>
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
               this.groupId=val
               this.GetEquipmentList()//点击请求一次
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
	               	console.log("liebiao")
	               	console.log(params)
	               	console.log(res)
	                for(let item of res.Data){
	                    this.totalNumber=res.Data.length;//总条数.
                        this.EquipmentList.push(item) 
                      switch(String(item.LoggerChnum)){
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
                        }


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
    	*{margin:0;padding:0}
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
            	  .lightZone {
		        	border:1px solid ;
				    height: calc(100% - 20px);
				    overflow-y: scroll;
				    .AreaSearch{
				    	padding: 20px;
				    }
				    .PartitionList{
				    	margin-left: 30%;
				    	padding: 10px;
				    }
				  }
				  .InstrumentsDisplay{
				    border:1px solid ;
				    height: calc(100% - 20px); 
				    padding-left: 20px;
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
	           	   border:1px solid blue;
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
	            border: 1px solid red;
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
                border: 1px solid red;
                height: 22px;
	         }
	        .ExternalElectric{
	        	display: inline-block;
	        	width: 28%;
	        	border: 1px solid red;
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
	      	color: red;
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
        }
        .ChannelTwoup{
        	border-bottom: 1px solid #999999;
        }
        .Twofromline{
        	 display: inline-block;
        	 height: 20px;
        	 vertical-align: top;
        	 width: 100%;
        	 font-size: 12px;
        	 color: #333333;

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
        	height: 42px;
        	font-size: 20px;
        	text-align: center;
        	line-height: 100px;
        }
        .Channewvalue{
        	display: inline-block;
        	color: red;
        	width: 48%;
        	font-size: 20px;
        	text-align: center;
        	line-height: 100px;
        	border:1px solid blue;
        	height: 100%;
        	text-align: center;
        }
        .buttomline{
        	display: inline-block;
        	width: 48%;
        	height: 35px;
        	text-align: center;
        }
        .fourbuttomline{
           display: inline-block;
        	width: 48%;
        	text-align: center;
        	border:1px solid blue;
        	height: 100%;
        	vertical-align: top; 
        }
        .ThreebuttomlineRight{
        	border-right: 1px solid #999999;
        }
        .buttomvalue{
        	display: inline-block;
        	width: 20%;
        	height: 100%;
        }
        .ChannewFourvalue{
        	height: 41px;
        	border:1px solid red;
        }
        .Nopower{
        	background: url(../assets/img/icon.png) no-repeat 10px 10px ;
        }
        

    }
 


</style>


