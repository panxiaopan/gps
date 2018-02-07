<template>
   <el-row class="Mapshow">
   	 <el-row>
             <el-col :span='24'>
		   	 	   <el-col :span='24' class="CurrentPosition">
				        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">地图展示</i></div> 
				    </el-col>
             </el-col>
   	 </el-row>  
     <el-row class="MapshowContent">
     	  <el-col :span='6' class="lightZone">
     	    <div class="grid-content bg-purple-light">
               		 <div class="AreaSearch">
				  		   <el-input
				  		    class="Seach"
						    placeholder="请输入设备名称或型号"
						    suffix-icon="el-icon-search"
						    v-model="SeachEquipment"
						     @keyup.enter.native="GetEquipmentList"
						     >
						  </el-input> 
					  </div>
					  <div class="DevicesDisplay" v-for="item in EquipmentList" :key="item.LoggerInfoSn">
                        <div class="EquipmentName">
					  	 <i :class='{"Status StatusClose":item.LoggerInfoState==2,"Status StatusOpen":item.LoggerInfoState==1}'></i>
                          <span class="DevicesName">
                          	 <div class="Name namefont">{{item.LoggerInfoName}}</div>
                          	 <div class="Name typefont">{{item.LoggerInfoSn}}</div>
                          </span>
                         </div>
					  </div>
     	     </div>
     	  </el-col>
           <el-col :span="18">
           	   <div class="grid-content bg-purple-right">
                    <div class="Mapexhibition">
                    	
                    </div> 
           	   </div>
           </el-col>

     </el-row>
   </el-row>
</template>
<script>
	import{GetMapShowsGroupLoggerInfoData}from'@/api/api'
export default {
      data(){
      	  return{
              SeachEquipment:'',
              EquipmentList:[],
      	  }
      },
      methods:{
            GetEquipmentList(){//设备列表请求
             	  this.EquipmentList=[]//调用前清空
                  var params={
                  	 condition:this.SeachEquipment,
                  }
               GetMapShowsGroupLoggerInfoData(params).then(res=>{
	                for(let item of res.Data){
	                    /*item.LoggerState = item.LoggerState == 1 ? true : false;*/
                          this.EquipmentList.push(item)
                          console.log("xianshizuoce")
                         console.log(res)
                       
	                 } 
                  }) 
             },
      },
      mounted(){
            this.GetEquipmentList()//列表左
      }

}
</script>
<style lang="scss" scoped>
      .Mapshow{
          height: calc(100% - 20px);
          background: #eaedf1; 
          border: 1px solid red;    
       .CurrentPosition{
       	    height: 40px;
    		    background:#f7f7f7;
    		.NowPositon{
    		       line-height: 40px;
                margin-left: 15px;
    		}
        }
        .MapshowContent{
        	  height: calc(100% - 80px);
              padding: 20px;
              margin: 20px;
              background: #fff;
            .lightZone{
        	    height: calc(100% - 60px);
			    background:#eeeeee;
			    overflow-y: scroll;
			    .AreaSearch{
			    	padding: 20px;

			    }  
            }
           .Mapexhibition{
            border:1px solid ;
            height: calc(100% - 20px); 
            padding-left: 20px;
            background: #fff;
           }
         }
         .DevicesDisplay{
         	height: 56px;
         	line-height: 56px;
         }
        .Status{
        	display: inline-block;
        	height: 25px;
        	width: 25px;
        	vertical-align: middle;
            margin:0px 10px 0px 20px; 
        }
       .DevicesName{
       	  display: inline-block;
       	  height: 56px;
       	  width:150px;
       	  vertical-align: middle;

        } 
        .Name{
        	height: 25px;
        	line-height: 23px;
        }
        .StatusOpen{
        	background:url(../assets/img/icon.png) no-repeat -20px -483px;
        }
        .StatusClose{
        	background:url(../assets/img/icon.png) no-repeat -20px -517px;
        }
        .namefont{
        	font-size: 14px;
        	color: #333333;
        	font-family:"Microsoft YaHei" ! important;
        }
        .typefont{
        	font-family: "Microsoft YaHei" !important;
        	color: #999999;
        	font-size: 12px;
        }
      } 
</style>
<style type="text/css">
	    .Seach .el-input__inner{
    		border-radius: 20px;
    		}
</style>
