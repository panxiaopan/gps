<template>
   <el-row class="Mapshow">
   	 <el-row>
             <el-col :span='24'>
		   	 	   <el-col :span='24' class="CurrentPosition">
				        <div class="NowPositon">
                  <i class="el-icon-location"></i>
                  <span>{{$t('m.Location')}}:</span>
                  <i class="el-icon-arrow-right">{{$t('m.RealTimeMonitoring')}}</i>
                  <i class="el-icon-arrow-right">
                   <span class="currentcolor">{{$t('m.MapShow')}}</span>
                 </i>

                </div> 
				    </el-col>
             </el-col>
   	 </el-row>  
     <el-row class="MapshowContent">
     	  <el-col :span='4' class="lightZone">
     	    <div class="grid-content bg-purple-light">
                <div style=" text-align: center;">
               		 <div class="AreaSearch">
    				  		   <el-input
        				  		  class="SeachEquipment"
        						    :placeholder="$t('m.DeviceNumber')"
        						    v-model="SeachEquipment"
        						     @keyup.enter.native="GetEquipmentList"
    						     >
    						    </el-input> 
                     <i class="SystemManaSearch" @click="mapseachDevice"></i>
					        </div>
            </div>
					  <div class="DevicesDisplay" v-for="(item,index) in EquipmentList" :key="item.LoggerInfoSn">
                  <div class="EquipmentName" 
                    :class='{"active":activeName == item.LoggerInfoSn}'
                  @click="exactsearch(item.LoggerInfoSn)">
    					      <span class="EquipmentState">	
                      <i :class='{"Status StatusClose":item.LoggerInfoState==2,"Status StatusOpen":item.LoggerInfoState==1}'></i>
                    </span>
                          <span class="DevicesName" @click="InstrumentFind(index,item.LoggerInfoSn)">
                            <el-tooltip :content="item.LoggerInfoName" placement="right">
                          	 <div class="Name namefont">{{item.LoggerInfoName}}</div>
                             </el-tooltip>
                          	 <div class="Name typefont">{{item.LoggerInfoSn}}</div>
                          </span>
                   </div>
					  </div>
     	     </div>
     	  </el-col>
           <el-col :span="20" class="Mapexhibition">
           	   <div class="grid-content bg-purple-right">
                     <baidu-map 
                     :center="Equipmentcenter"
                      class = "map " 
                      style='width: 100%;
                       height:100%' 
                      :scroll-wheel-zoom="true"
                      :zoom="Enlargemenzomo"
                        >   
                       <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                       <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                        <bml-marker-clusterer :averageCenter="true" >
                            <bm-marker v-for="(marker, index) of MapPoints" :position="{lng: Number(marker.Longitudel), lat: Number(marker.LatiTudeE)}" 
                                     :key="marker.LoggerSn"
                                     :icon="{url: marker.icons,
                                     size: {width: 60, height: 60}}"
                                     :dragging="false"
                                      class='mapmaker'
                                     :top='true'
                                     @click='infoWindowOpen(index)'
                                      >
                                   <bm-info-window   :position="{lng: Number(marker.Longitudel), lat: Number(marker.LatiTudeE)}"   :show="marker.show"  @open="infoWindowOpenMarker(index, {lng: marker.Longitudel, lat: marker.LatiTudeE})"  @close="infoWindowClose(index)">
                                       <div class="boxShow" >
                                          <div class="ChannelDisplay" >
                                                 <div class="Turnovertime">{{marker.LogsTime}}</div>                    
                                                <div class="Oneaisle" v-if='marker.LoggerChnum==1' >
                                                     <div class="Oneleft" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>{{marker.LogsChone}}</div>
                                                       <div class="Oneright">
                                                          <span class="onechum">{{marker.ChoneType ===8? marker.ChoneUs : SensorOptions[marker.ChoneType].label}}</span>
                                                          <span class="onechum onechummiddle">{{marker.ChoneHigh}}</span>
                                                          <span class="onechum">{{marker.ChoneLow}}</span>
                                                       </div>
                                                </div> 
                                               <div class="Twoaisle"  v-if='marker.LoggerChnum==2'>
                                                       <div class="Twochum  Twotopchum ">
                                                          <div  class="Twotopleftchum" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>{{marker.LogsChone}}</div>
                                                             <div class="Twotoprightchum">
                                                                <span class="twochumvue">{{marker.ChoneType ===8 ? marker.ChoneUs : SensorOptions[marker.ChoneType].label}}</span>
                                                                <span class="twochumvue twochumvuemiddle">{{marker.ChoneHigh}}</span>
                                                                <span class="twochumvue">{{marker.ChoneLow}}</span>
                                                             </div>
                                                       </div>
                                                       <div class="Twochum  Twobuttomchum">
                                                           <div  class="Twotopleftchum" :class='{"Overheat":marker.LogsChtwo>Number(marker.ChtwoHigh)||marker.LogsChtwo<Number(marker.ChtwoLow)}'>{{marker.LogsChtwo}}</div>
                                                            <div class="Twotoprightchum">
                                                                <span class="twochumvue">{{marker.ChtwoType===8 ? marker.ChtwoUs : SensorOptions[marker.ChtwoType].label}}</span>
                                                                <span class="twochumvue twochumvuemiddle">{{marker.ChtwoHigh}}</span>
                                                                <span class="twochumvue">{{marker.ChtwoLow}}</span>
                                                             </div>
                                                       </div>
                                                 </div>  
                                                 <div class="threeaisle"  v-if='marker.LoggerChnum==3'>
                                                      <div class="threechum" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>
                                                           <div class="threechumvue">{{marker.LogsChone}}</div>
                                                           <div class="threechumvue">{{marker.ChoneType ===8 ? marker.ChoneUs : SensorOptions[marker.ChoneType].label}}</div>
                                                      </div> 
                                                      <div class="threebottomchum">
                                                          <div class="threebottomchumvue"  :class='{"Overheat":marker.LogsChtwo>Number(marker.ChtwoHigh)||marker.LogsChtwo<Number(marker.ChtwoLow)}'>
                                                               <div class="threevalue">{{marker.LogsChtwo}}</div>
                                                               <div class="threevalue">{{marker.ChtwoType===8 ? marker.ChtwoUs : SensorOptions[marker.ChtwoType].label}}</div>
                                                          </div> 
                                                        <div class="threebottomchumvue threebottomchumline" :class='{"Overheat":marker.LogsChthree>Number(marker.ChthrHigh)||marker.LogsChthree<Number(marker.ChthrLow)}'>
                                                               <div class="threevalue">{{marker.LogsChthree}}</div>
                                                               <div class="threevalue">{{marker.ChthrType===8 ? marker.ChthrUs : SensorOptions[marker.ChthrType].label}}</div>
                                                          </div>  
                                                      </div>
                                                 </div> 
                                                 <div class="fouraisle"  v-if='marker.LoggerChnum==4'>
                                                   <div class="fourchum" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>
                                                      <div class="fourchumone">{{marker.LogsChone}}</div>
                                                      <div class="fourchumone ">{{marker.ChoneType ===8 ? marker.ChoneUs : SensorOptions[marker.ChoneType].label}}</div>
                                                   </div>
                                                   <div class="fourchum fourchummiddle" :class='{"Overheat":marker.LogsChone>Number(marker.ChoneHigh)||marker.LogsChone<Number(marker.ChoneLow)}'>
                                                         <div class="fourchumone">{{marker.LogsChtwo}}</div>
                                                         <div class="fourchumone ">{{marker.ChtwoType===8 ? marker.ChtwoUs : SensorOptions[marker.ChtwoType].label}}</div>
                                                   </div>
                                                   <div class="fourchum">
                                                         <div class="fourchumthree" :class='{"Overheat":marker.LogsChthree>Number(marker.ChthrHigh)||marker.LogsChthree<Number(marker.ChthrLow)}'>
                                                             <div class="threevalue">{{marker.LogsChthree}}</div>
                                                             <div class="threevalue">{{marker.ChthrType===8 ? marker.ChthrUs : SensorOptions[marker.ChthrType].label}}</div>
                                                         </div>
                                                         <div class="fourchumthree fourchumthreeline"  :class='{"Overheat":marker.LogsChfour>Number(marker.ChforHigh)||marker.LogsChfour<Number(marker.ChforLow)}'>
                                                           <div class="threevalue">{{marker.LogsChfour}}</div>
                                                           <div class="threevalue">{{marker.ChforType===8 ? marker.ChthrUs : SensorOptions[marker.ChforType].label}}</div>
                                                         </div>
                                                   </div>
                                                 </div>  
                                            </div> 
                                            <div class="ChannelInformation">
                                               <el-form :label-position="labelPosition" label-width="65px"  class="formessage">
                                                        <el-form-item :label="$t('m.Status')">
                                                           <i :class='{"Status StatusClose":marker.LoggerState==2,"Status StatusOpen":marker.LoggerState==1,"Status Overload":marker.LoggerState==3}'></i>
                                                        </el-form-item>
                                                        <el-form-item :label="$t('m.Name')">
                                                          {{marker.LoggerName}}
                                                        </el-form-item>
                                                        <el-form-item :label="$t('m.DeviceID')">
                                                          {{marker.LoggerSn}}
                                                        </el-form-item>
                                                         <el-form-item :label="$t('m.Address')">
                                                           {{CarPosition}}
                                                        </el-form-item>  
                                              </el-form> 
                                            </div>
                                            <div  class="Equipmentoperation">
                                               <div class="Equipmentskip">
                                                 <el-button type="primary" size='small' @click="EquipmentManagement(marker.LoggerSn)">{{$t('m.EquipmentManagement')}}</el-button>
                                                 <el-button type="primary" size='small' @click="HistoryMemory(marker.LoggerSn)" >{{$t('m.HistoryMemory')}}</el-button>
                                                 <el-button type="primary" size='small' @click="Alarmreporting(marker.LoggerSn)">{{$t('m.AlarmRecord')}}</el-button>
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
              Equipmentcenter:{lng: 104.06, lat: 30.67},
              Enlargemenzomo:5,
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
     components: {
        BmlMarkerClusterer
      },
      methods:{
/*               handler ({BMap, map}) {
                  console.log(BMap, map)
                  this.center.lng = 116.404
                  this.center.lat = 39.915
                  this.zoom = 15
                },*/
            GetEquipmentList(){//设备列表请求
             	  this.EquipmentList=[]//调用前清空
                  var params={
                  	 condition:this.SeachEquipment,
                  }
               GetMapShowsGroupLoggerInfoData(params).then(res=>{
                           console.log("zuo")
                           console.log(res)

	                for(let item of res.Data){
                          this.EquipmentList.push(item)
	                     }     
                    }) 
             },
           mapseachDevice(){//点击搜索设备的图标
                this.GetEquipmentList();
                this.GetMapShows();
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
                       this.MapPoints.push(
                          {
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
                              Gps:item.Gps,
                              GroupId:item.GroupId,
                              LatiTudeE:item.LatiTudeE,
                              LoggerChnum:item.LoggerChnum,
                              LoggerName:item.LoggerName,
                              LoggerSn:item.LoggerSn,
                              LoggerState:item.LoggerState,
                              LogsChfour:item.LogsChfour,
                              LogsChone:item.LogsChone,
                              LogsChthree:item.LogsChthree,
                              LogsChtwo:item.LogsChtwo,
                              LogsTime:item.LogsTime.slice(5,16),
                              Longitudel:item.Longitudel,
                              icons:item.icons,
                              CarPosition: null,
                              show:false,

                         })
                        } 
                        console.log("---==========---")
                        console.log(this.MapPoints)
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
              case 3: 
                iconIndex = this.iconsArray[2];
            }
            return iconIndex;
           },
/*           infoWindowClose () {//点击关闭地图显示
            this.show = false
          },*/
         infoWindowOpenMarker (e, p) {//点击打开地图下显示
            console.log("jieshou")
            console.log(p)
            console.log(this.Equipmentcenter)
            console.log(e)
            let _this = this
            $.ajax({//经纬度转换显示位置,
                 type:'get',
                 url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${p.lat},${p.lng}&output=json&pois=1&ak=UiGHNfWON4wXTdWrou8Ada28mNnEPFcB&callback=initialize`,
                 dataType:'jsonp',
                 success:function(res){
                   _this.CarPosition=res.result.formatted_address
                 
                 }  
             })
          },
          infoWindowOpen(e){
               this.MapPoints[e].show = true;
          },

/*         infoWindowOpen(){
             this.show = true;
         },*/
         infoWindowClose (e) {
               this.MapPoints[e].show = false;
            },
          EquipmentManagement(LoggerSnTIAO){//设备跳转页面,
                 this.$router.push({name:'SystemManagement',params:{id:LoggerSnTIAO}})
                 
          },
          HistoryMemory(LoggerSnTIAO){//历史记录
                  this.$router.push({name:'HistoricalData',params:{id:LoggerSnTIAO}}) 
          },
          Alarmreporting(LoggerSnTIAO){//报警记录
                  this.$router.push({name:'AlarmRecord',params:{id:LoggerSnTIAO}}) 
          },
         InstrumentFind(e,val){//点击单个精确查找发请求
          console.log(e)
             this.ExactSearch=val;
             this.MapPoints=[];
               var params={
                      loggerInfoSn:this.ExactSearch//搜索显示右边坐标的位置,
                   }
                GetMapShowsLoggerInfoData(params).then(res=>{
              if(res.State==1){
                 for(let item of res.Data){
                      item.icons = this.callback(item.LoggerState);
                              this.MapPoints.push({
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
                                      Gps:item.Gps,
                                      GroupId:item.GroupId,
                                      LatiTudeE:item.LatiTudeE,
                                      LoggerChnum:item.LoggerChnum,
                                      LoggerName:item.LoggerName,
                                      LoggerSn:item.LoggerSn,
                                      LoggerState:item.LoggerState,
                                      LogsChfour:item.LogsChfour,
                                      LogsChone:item.LogsChone,
                                      LogsChthree:item.LogsChthree,
                                      LogsChtwo:item.LogsChtwo,
                                      LogsTime:item.LogsTime.slice(5,16),
                                      Longitudel:item.Longitudel,
                                      icons:item.icons,
                                      CarPosition: null,
                                      show:false,
                              })
                             this.Equipmentcenter.lng=Number(item.Longitudel);
                             this.Equipmentcenter.lat=Number(item.LatiTudeE);
                             this.Enlargemenzomo=15;
                              } 
                     
                         }
                   })          
          },
         exactsearch(gameName){//如果点击的时候的名字相等,就背景变色
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
  	                background: #fff;
                    display: inline-block;
                    width: 220px;
                    border: 1px solid #d7d7d7;
                    margin: 20px 0px 20px 0px;
                    border-radius: 20px;
                    text-align: center;
                
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
          width:230px;
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
        .Overload{
           background: url(../assets/img/overheight.png);
        }
        .namefont{
          margin-top: 10px;
        	font-size: 14px;
        	color: #333333;
        	font-family:"Microsoft YaHei" ! important;
          overflow: hidden;
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
        text-align: right;
        padding-right: 10px;
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
           font-size: 30px;
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
          line-height: 59px;
          text-align: center;
          font-size: 30px;
          font-family: "Microsoft YaHei";
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
           height: 20px;
           line-height: 20px;
           text-align: center;
          font-size: 10px;
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
            font-size: 20px;
            font-family: "Microsoft YaHei";
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
         font-size: 16px;
         font-family: "Microsoft YaHei"
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
            margin-top: 0px;
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
       .SystemManaSearch{
              display: inline-block;
              width: 30px;
              height: 30px;
              border-left: 1px solid #d7d7d7;
              background: url(../assets/img/icon.png) no-repeat -16px -448px;
              vertical-align: middle;
              cursor: pointer;
         }
        .SeachEquipment {
             display: inline-block;
             width: 175px;
             border:none;
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
       .SeachEquipment .el-input__inner{
         border:none;
       }

</style>
