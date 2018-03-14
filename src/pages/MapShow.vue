<template>
   <el-row class="Mapshow">
   	 <el-row>
             <el-col :span='24'>
		   	 	   <el-col :span='24' class="CurrentPosition">
				        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right"> <span class="currentcolor">地图展示</span></i></div> 
				    </el-col>
             </el-col>
   	 </el-row>  
     <el-row class="MapshowContent">
     	  <el-col :span='4' class="lightZone">
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
                 
                  <div class="EquipmentName" 
                    :class='{"active":activeName == item.LoggerInfoSn}'
                  @click="exactsearch(item.LoggerInfoSn)">
    					      <span class="EquipmentState">	
                      <i :class='{"Status StatusClose":item.LoggerInfoState==2,"Status StatusOpen":item.LoggerInfoState==1}'></i>
                    </span>
                          <span class="DevicesName" @click="InstrumentFind(item.LoggerInfoSn)">
                          	 <div class="Name namefont">{{item.LoggerInfoName}}</div>
                          	 <div class="Name typefont">{{item.LoggerInfoSn}}</div>
                          </span>
                   </div>

					  </div>
     	     </div>
     	  </el-col>
           <el-col :span="20" class="Mapexhibition">
           	   <div class="grid-content bg-purple-right">
                     <baidu-map  center="中国" class = "map " style='width: 100%; height:100%'  :scroll-wheel-zoom="true">
                             <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                             <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                        <bml-marker-clusterer :averageCenter="true">
                            <bm-marker v-for="marker of MapPoints" :position="{lng: Number(marker.Longitudel), lat: Number(marker.LatiTudeE)}" 
                                     :key="marker.LoggerSn"
                                     :icon="{url: marker.icons,
                                      size: {width: 200, height: 157}}"
                                      @click="infoWindowOpen($event)"
                                      >
                                   <bm-info-window :show="show" @close="infoWindowClose">
                                       <div class="boxShow" >
                                          <div class="ChannelDisplay" >
                                                 <div class="Turnovertime">{{marker.LogsTime}}</div>                    
                                                <div class="Oneaisle" v-if='marker.LoggerChnum==1' >
                                                     <div class="Oneleft" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>{{marker.LogsChone}}</div>
                                                       <div class="Oneright">
                                                          <span class="onechum">{{SensorOptions[marker.ChoneType].label}}</span>
                                                          <span class="onechum onechummiddle">{{marker.ChoneHigh}}</span>
                                                          <span class="onechum">{{marker.ChoneLow}}</span>
                                                       </div>
                                                </div> 
                                               <div class="Twoaisle"  v-if='marker.LoggerChnum==2'>
                                                       <div class="Twochum  Twotopchum ">
                                                          <div  class="Twotopleftchum" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>{{marker.LogsChone}}</div>
                                                             <div class="Twotoprightchum">
                                                                <span class="twochumvue">{{SensorOptions[marker.ChoneType].label}}</span>
                                                                <span class="twochumvue twochumvuemiddle">{{marker.ChoneHigh}}</span>
                                                                <span class="twochumvue">{{marker.ChoneLow}}</span>
                                                             </div>
                                                       </div>
                                                       <div class="Twochum  Twobuttomchum">
                                                           <div  class="Twotopleftchum" :class='{"Overheat":marker.LogsChtwo>Number(marker.ChtwoHigh)||marker.LogsChtwo<Number(marker.ChtwoLow)}'>{{marker.LogsChtwo}}</div>
                                                            <div class="Twotoprightchum">
                                                                <span class="twochumvue">{{SensorOptions[marker.ChtwoType].label}}</span>
                                                                <span class="twochumvue twochumvuemiddle">{{marker.ChtwoHigh}}</span>
                                                                <span class="twochumvue">{{marker.ChtwoLow}}</span>
                                                             </div>
                                                       </div>
                                                 </div>  
                                                 <div class="threeaisle"  v-if='marker.LoggerChnum==3'>
                                                      <div class="threechum" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>
                                                           <div class="threechumvue">{{marker.LogsChone}}</div>
                                                           <div class="threechumvue">{{SensorOptions[marker.ChoneType].label}}</div>
                                                      </div> 
                                                      <div class="threebottomchum">
                                                          <div class="threebottomchumvue"  :class='{"Overheat":marker.LogsChtwo>Number(marker.ChtwoHigh)||marker.LogsChtwo<Number(marker.ChtwoLow)}'>
                                                               <div class="threevalue">{{marker.LogsChtwo}}</div>
                                                               <div class="threevalue">{{SensorOptions[marker.ChtwoType].label}}</div>
                                                          </div> 
                                                        <div class="threebottomchumvue threebottomchumline" :class='{"Overheat":marker.LogsChthree>Number(marker.ChthrHigh)||marker.LogsChthree<Number(marker.ChthrLow)}'>
                                                               <div class="threevalue">{{marker.LogsChthree}}</div>
                                                               <div class="threevalue">{{SensorOptions[marker.ChthrType].label}}</div>
                                                          </div>  
                                                      </div>
                                                 </div> 
                                                 <div class="fouraisle"  v-if='marker.LoggerChnum==4'>
                                                   <div class="fourchum" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>
                                                      <div class="fourchumone">{{marker.LogsChone}}</div>
                                                      <div class="fourchumone ">{{SensorOptions[marker.ChoneType].label}}</div>
                                                   </div>
                                                   <div class="fourchum fourchummiddle" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>
                                                         <div class="fourchumone">{{marker.LogsChtwo}}</div>
                                                         <div class="fourchumone ">{{SensorOptions[marker.ChtwoType].label}}</div>
                                                   </div>
                                                   <div class="fourchum">
                                                         <div class="fourchumthree" :class='{"Overheat":marker.LogsChthree>Number(marker.ChthrHigh)||marker.LogsChthree<Number(marker.ChthrLow)}'>
                                                             <div class="threevalue">{{marker.LogsChthree}}</div>
                                                             <div class="threevalue">{{SensorOptions[marker.ChthrType].label}}</div>
                                                         </div>
                                                         <div class="fourchumthree fourchumthreeline"  :class='{"Overheat":marker.LogsChfour>Number(marker.ChforHigh)||marker.LogsChfour<Number(marker.ChforLow)}'>
                                                           <div class="threevalue">{{marker.LogsChfour}}</div>
                                                           <div class="threevalue">{{SensorOptions[marker.ChforType].label}}</div>
                                                         </div>
                                                   </div>
                                                 </div>  
                                            </div> 
                                            <div class="ChannelInformation">
                                               <el-form :label-position="labelPosition" label-width="65px"  class="formessage">
                                                        <el-form-item label="状态:">
                                                           <i :class='{"Status StatusClose":marker.LoggerState==2,"Status StatusOpen":marker.LoggerState==1}'></i>
                                                        </el-form-item>
                                                        <el-form-item label="名称:">
                                                          {{marker.LoggerName}}
                                                        </el-form-item>
                                                        <el-form-item label="设备ID:">
                                                          {{marker.LoggerSn}}
                                                        </el-form-item>
                                                         <el-form-item label="地址:">
                                                           {{CarPosition}}
                                                        </el-form-item>  
                                              </el-form> 
                                            </div>
                                            <div  class="Equipmentoperation">
                                               <div class="Equipmentskip">
                                                 <el-button type="primary" size='small' @click="EquipmentManagement">设备管理</el-button>
                                                 <el-button type="primary" size='small' @click="HistoryMemory" >历史记录</el-button>
                                                 <el-button type="primary" size='small' @click="Alarmreporting">报警记录</el-button>
                                              </div>
                                            </div>
                                        </div>
                                 </bm-info-window>     
                            </bm-marker>
                          </bml-marker-clusterer>    
                    </baidu-map>
               	   </div>
           </el-col>
     </el-row>
   </el-row>
</template>
<script>
	import{GetMapShowsGroupLoggerInfoData,GetMapShowsLoggerInfoData}from'@/api/api'
  import {BmlMarkerClusterer} from 'vue-baidu-map'
export default {
      data(){
      	  return{
              activeName: '',
              labelPosition:'left',//左边靠齐
              SeachEquipment:'',
              EquipmentList:[],
              CarPosition:'',//车辆位置,
              /*loggerInfoSn:'',*/
              MapPoints:[],//地图定位经纬度.
              show:false,
              ExactSearch:'',//点击单个查找
              iconsArray: ['../static/img/car_2.png','../static/img/car_3.png','../static/img/car_1.png'],
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
     components: {
        BmlMarkerClusterer
      },
      methods:{
            GetEquipmentList(){//设备列表请求
             	  this.EquipmentList=[]//调用前清空
                  var params={
                  	 condition:this.SeachEquipment,
                  }
               GetMapShowsGroupLoggerInfoData(params).then(res=>{
	                for(let item of res.Data){
                          this.EquipmentList.push(item)
	                     }     
                    }) 
             },
           GetMapShows(){
               this.MapPoints=[];
               var _this =this;
                 var params={
                      loggerInfoSn:this.SeachEquipment//搜索显示右边坐标的位置,
                   }
                GetMapShowsLoggerInfoData(params).then(res=>{
                 for(let item of res.Data){
                      item.icons = this.callback(item.LoggerState);
                       this.MapPoints.push(item)
                        } 
                  })
            },
           callback(params){
            let iconIndex = null;
            switch (params) {
              case 1: 
                iconIndex = this.iconsArray[0];
                break;
              case 2: 
                iconIndex = this.iconsArray[1];
                break;
              default: 
                iconIndex = this.iconsArray[2];
            }
            return iconIndex;
           },
           infoWindowClose () {//点击关闭地图显示
            this.show = false
          },
          infoWindowOpen (e) {//点击打开地图下显示
            this.show = true
            let _this = this
            $.ajax({//经纬度转换显示位置,
                 type:'get',
                 url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${e.point.lat},${e.point.lng}&output=json&pois=1&ak=UiGHNfWON4wXTdWrou8Ada28mNnEPFcB&callback=initialize`,
                 dataType:'jsonp',
                 success:function(res){
                   _this.CarPosition=res.result.formatted_address
                 }  
             })
          },
          EquipmentManagement(){//设备跳转页面,
                 this.$router.push({name:'SystemManagement'})
          },
          HistoryMemory(){//历史记录
                  this.$router.push({name:'HistoricalData'}) 
          },
          Alarmreporting(){//报警记录
                  this.$router.push({name:'AlarmRecord'}) 
          },
         InstrumentFind(val){//点击单个精确查找发请求
             this.ExactSearch=val;
             this.MapPoints=[];
               var params={
                      loggerInfoSn:this.ExactSearch//搜索显示右边坐标的位置,
                   }
                GetMapShowsLoggerInfoData(params).then(res=>{
                 for(let item of res.Data){
                      item.icons = this.callback(item.LoggerState);
                            this.MapPoints.push(item)
                        } 
                  })          
         },
         exactsearch(gameName){
                this.activeName = gameName
         },
      },
      mounted(){
            var _this =this;
             this.GetEquipmentList()//列表左
             this.GetMapShows()//地图请求
       $(window).keyup(function(ev){
        // console.log(ev);
         if(ev.keyCode == 13){
             _this.GetMapShows();
          }
        })
      }
}
</script>
<style lang="scss" scoped>
      .Mapshow{
          height: calc(100% - 20px);
          background: #eaedf1;    
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
        	    height: 100%;
			    background:#eeeeee;
			    overflow-y: scroll;
			    .AreaSearch{
			    	padding: 20px;

			       }  
            }
           .Mapexhibition{
            height: 100%; 
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
        }
       .DevicesName{
       	  display: inline-block;
       	  height: 56px;
       	  width:150px;
       	  vertical-align: middle;
          cursor: pointer;
        } 
        .Name{
        	height:18px;
        	line-height: 18px;
        }
        .StatusOpen{
        	background:url(../assets/img/icon.png) no-repeat -20px -483px;
        }
        .StatusClose{
        	background:url(../assets/img/icon.png) no-repeat -20px -518px;
        }
        .namefont{
          margin-top: 10px;
        	font-size: 14px;
        	color: #333333;
        	font-family:"Microsoft YaHei" ! important;
        }
        .typefont{
        	font-family: "Microsoft YaHei" !important;
        	color: #999999;
        	font-size: 12px;
        }
        .bg-purple-right{
                width: 100%;   
                height: 100%;   
                overflow:hidden;
        }
       .normalcar{
           background: url(../assets/img/car_2.png) ;
       }
       .unnormalcar{
          background:url(../assets/img/car_1.png) ;
       }
       .boxShow{
          width: 400px;
          height: 240px;
       }
       .EquipmentState{
            display: inline-block;
            width: 34px;
            padding-left: 20px;
       }
       .ChannelDisplay{
         width: 194px;
         height: 143px;
         border: 1px solid #d7d7d7;
         display: inline-block;
       }
       .Turnovertime{
        height: 24px;
        background: #f4f4f4;
        border-bottom: 1px #e8e8e8;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
       }
       .Overheat{
         color: red;
       }
       .Oneaisle{
              border-top:1px solid #d7d7d7;
              height: 119px;
              width: 100%;
         }
        .Oneleft{
           width: 130px;
           font-family: "Microsoft YaHei" !important;
           font-size: 18px;
           height: 100%;
           display: inline-block;
           line-height: 130px;
           text-align: center;
        }
        .Oneright{
            display: inline-block;
             border-left: 1px solid #d7d7d7;
            height: 100%;
            width: 57px;
            vertical-align: top;
        }
        .Twotopleftchum{
          width: 130px;
          vertical-align: top;
          display: inline-block;
          height: 100%;

        }
        .onechum{
          display: inline-block;
          height: 38px;
          width: 100%;
          line-height: 38px;
          text-align: center;
        }
        .onechummiddle{
          border-bottom: 1px solid  #d7d7d7;
          border-top: 1px solid  #d7d7d7;
          }
        .Twochum{
          height: 59px;
        }
        .Twotopchum{
          border-bottom: 1px solid  #d7d7d7;
          border-top: 1px solid  #d7d7d7;
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
           width: 100%;
           height: 16px;
           line-height: 16px;
           text-align: center;
        }
        .twochumvuemiddle{
              border-bottom: 1px solid #d7d7d7;
              border-top: 1px solid #d7d7d7;
        }
        .threeaisle{
          height:119px;
        }
        .threechum{
          border-bottom: 1px solid #d7d7d7;
          border-top: 1px solid #d7d7d7;
          height: 80px;
        }
        .threebottomchum{
          height: 37px;
        }
        .threechumvue{
            display: inline-block;
            width: 93px;
            height: 80px;
            line-height: 80px;
            text-align: center;
        }
       .threebottomchumvue{
        display: inline-block;
        width: 95px;
        height: 37px;
        float: left;
       } 
       .threevalue{
         display: inline-block;
         width: 45px;
         float: left;
         height: 38px;
         text-align: center;
         line-height: 38px;
       }
       .threebottomchumline{
           border-left: 1px solid #d7d7d7;
        }
        .fouraisle{
           height:119px;
            border-top: 1px solid #d7d7d7;
        }
       .fourchum{
         height: 38px;
       }
       .fourchummiddle{
          border-bottom: 1px solid #d7d7d7;
          border-top: 1px solid #d7d7d7;
        }
        .fourchumone{
           display: inline-block;
           width: 95px;
           float: left;
           height: 37px;
           text-align: center;
           line-height: 37px;
        }
        .fourchumthree{
            display: inline-block;
            width: 95px;
            float: left;
            height: 40px;
         }
         .fourchumthreeline{
              border-left: 1px solid #d7d7d7;
         }
         .ChannelInformation{
              display: inline-block;
              width: 190px;
              height: 143px;
              float: right;
         }
        .formessage{
            margin-top: 17px;
        }
        .Equipmentoperation{
           height: 80px;
           width: 395px;
           line-height: 80px;
        }
        .Equipmentskip{
          margin-left: 40px;
        }
        .EquipmentName{
           border-bottom: 1px solid #999999;
        }
        .active{
           background: #fff;
        }
      } 
</style>
<style type="text/css">
	    .AreaSearch .el-input__inner{
    		border-radius: 20px;
    		}
       .formessage .el-form-item{
             margin-bottom: 0px;
       }
       .formessage .el-form-item__content{
            line-height: 30px;
       }
       .formessage .el-form-item__label{
            line-height: 30px;
            font-size: 16px;
       }


</style>
