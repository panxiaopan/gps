<template>
  <el-row class="MapTrajectory">
           <el-row>
		    <el-col :span='24'>
			    <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon">
			        	<i class="el-icon-location"></i>
			        	<span>{{$t('m.Location')}}:</span>
			        	<i class="el-icon-arrow-right">{{$t('m.DataCentre')}}</i>
			        	<i class="el-icon-arrow-right"> <span class="currentcolor">{{$t('m.LocusFree')}}</span></i>
			        </div> 
			      </el-col>
			   </el-row>
		   </el-col>
	  </el-row> 
     <el-row>
     	<el-col :span='24'>
     		   <div class="MapTrajectorySecrch">
     		        <el-form :inline="true"  class="demo-form-inline" size="small">
						  <el-form-item :label="$t('m.Device')">
  						     <el-select v-model="AllEquipmentName" :placeholder="$t('m.SelectDevice')"> 
                      <el-option
                        v-for="item in AllEquipment"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                       >
                     </el-option>
                  </el-select>
						  </el-form-item>
						  <el-form-item :label="$t('m.TimePeriod')">
                 <div class="block">
								    <el-date-picker
								       value-format="yyyy-MM-dd HH:mm:ss"
                        @change='changeHistoryDate'
									      v-model="valueTime"
									      type="datetimerange"
                        :picker-options="pickerOptions2"
									      range-separator="至"
									      :start-placeholder="$t('m.StartTime')"
									      :end-placeholder="$t('m.EndTime')">
								    </el-date-picker>
								</div>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="Demand">{{$t('m.Search')}}</el-button>
						  </el-form-item>
						   <el-form-item>
						    <el-button type="primary" size="small" class="DataExport" @click="DerivedData">{{$t('m.ExportPDF')}}</el-button>
						  </el-form-item>
               <el-form-item>
                <el-button type="primary" size="small" class="DataExport" @click="DerivedDataExecl">{{$t('m.ExportExcel')}}</el-button>
              </el-form-item>
					    </el-form> 
     		   </div>
     	</el-col>
     </el-row>
     <el-row class="MapFind">
     	<el-col :span="24" class="mapcontent"  >
                  <baidu-map class="map" center="河南" :zoom="6" :scroll-wheel-zoom="true">
                   <bm-polyline :path="pathxianlu" stroke-color="blue"  :stroke-weight="3"  ></bm-polyline>
                      <bm-marker v-for="(marker,index) of impetus"
                               :position="{lng:Number(marker.LogsLongitudel),lat:Number(marker.LogsLatitude)}" 
                                :icon="{url: marker.icons,
                                 size: {width: 38, height: 38}}"
                                :dragging="false"
                                 :key="marker.index"
                                @click='infoWindowOpen(index)'>
                                  <bm-info-window :position="{lng:Number(marker.LogsLongitudel) , lat: Number(marker.LogsLatitude)}" :show="marker.show"   @close="infoWindowClose(index)" @open="infoWindowOpenMarker(index, {lng: marker.LogsLongitudel, lat: marker.LogsLatitude})">
                                      <!-- <span>5d46546546</span> -->
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
                                                         <div class="fourchumthree fourchumthreeline"  :class='{"Overheat":marker.LogsChfor>Number(marker.ChforHigh)||marker.LogsChfor<Number(marker.ChforLow)}'>
                                                           <div class="threevalue">{{marker.LogsChfor}}</div>
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
                  </baidu-map>   
     	</el-col>
     </el-row>
  </el-row>
</template>
<script>
  import{GetMapShowsGroupLoggerInfoDatass,GetMapTrackData,ExportMapTrackDataPdf}from'@/api/api'
	import {BmlMarkerClusterer} from 'vue-baidu-map'
  import{SevenDay,timeFormatter}from'@/assets/js/common';//时间的转换
  import {BmlLushu} from 'vue-baidu-map'
  import qs from 'qs';
export default {
      components: {
        BmlLushu
      },
      data(){
      	 return{
              LoggerChnum:null,
              Bounddata:[],//对比的数组
              CarPosition:'',
              labelPosition:'left',//左边靠齐
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
                pathxianluData:[],//qingqiushuju
                AllEquipment:[],//所有设备
    	          AllEquipmentName:'',//设备名称ID
               /* valueTime:[],*/
                valueTime: [ timeFormatter(new Date(SevenDay(new Date()) )), timeFormatter(new Date())],//时间默认是空值;
                impetus:[
                 ],
                pathxianlu: [],//形成线路
                play: false,
                iconsarry:['../static/img/start.png','../static/img/end.png'],
             pickerOptions2: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }],
             disabledDate(time) {
              return time.getTime() > Date.now();//到当前时间
              }
            },
      	 }
      },
      methods:{
       changeHistoryDate (date) {  // 选择时间
            if (date == null) {
                  return false
              }
              let newDate = new Date();
              let chooseDate = new Date(date[1])
              let stopEndDate = new Date(date[1])
              stopEndDate.setHours(23)
              stopEndDate.setMinutes(59)
              stopEndDate.setSeconds(59)
               if(chooseDate.setHours(0,0,0,0) == newDate.setHours(0,0,0,0)) {
                            this.valueTime[1] =  timeFormatter(new Date())
                        } else {
                            this.valueTime[1] = timeFormatter(stopEndDate)
                        }

               }, 
             AllEquipmentList(){
                this.EquipmentList=[]//调用前清空
                 var params={
                     condition:'',
                  }
                 GetMapShowsGroupLoggerInfoDatass(qs.stringify(params)).then(res=>{ 
                       if(res.Data.length !==0){
                      for(let item of res.Data){
                           this.AllEquipment.push({
                                   label:item.LoggerInfoName,
                                   value:item.LoggerInfoSn
                                 })
                           }
                           this.AllEquipmentName=this.AllEquipment[0].value//默认的第一个
                        }
                 })
            },  
            reset () {
              this.play = false
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


         GetTravelpath(){
            var params={
                   loggerInfoSn:this.AllEquipmentName,
                   staDate:this.valueTime == null ? undefined : this.valueTime[0],
                   endDate:this.valueTime == null ? undefined : this.valueTime[1]
              }
            if(this.AllEquipmentName==''){
                    this.$message({
                       type:'error',
                       message:'选择设备'
                    })

             }else{
            GetMapTrackData(qs.stringify(params)).then(res=>{
                         this.pathxianlu=[];
                         this.pathxianluData=[];
                         this.impetus=[];
                         var _this=this
                       if(res.State == 1){
                                this.Bounddata.push({
                                      ChforHigh:res.Data.ChforHigh,
                                      ChforLow:res.Data.ChforLow,
                                      ChforType:res.Data.ChforType,
                                      ChforUs:res.Data.ChforUs,
                                      ChoneHigh:res.Data.ChoneHigh,
                                      ChoneLow:res.Data.ChoneLow,
                                      ChoneType:res.Data.ChoneType,
                                      ChoneUs:res.Data.ChoneUs,
                                      ChthrHigh:res.Data.ChthrHigh,
                                      ChthrLow:res.Data.ChthrLow,
                                      ChthrType:res.Data.ChthrType,
                                      ChthrUs:res.Data.ChthrUs,
                                      ChtwoHigh:res.Data.ChtwoHigh,
                                      ChtwoLow:res.Data.ChtwoLow,
                                      ChtwoType:res.Data.ChtwoType,
                                      ChtwoUs:res.Data.ChtwoUs,
                                      GroupId:res.Data.GroupId,
                                      LoggerChnum:res.Data.LoggerChnum,
                                      LoggerName:res.Data.LoggerName,
                                      LoggerSn:res.Data.LoggerSn,
                                      LoggerState:res.Data.LoggerState,
                                      LogsChfour:res.Data.LogsChfour,
                                      LogsChone:res.Data.LogsChone,
                                      LogsChtwo:res.Data.LogsChtwo,
                                })

                               
                                console.log( _this.Bounddata)
                            for(let item of res.Data.ListLoggerInfoAll){
                                 this.pathxianlu.push({
                                      lng:Number(item.LogsLongitudel),
                                      lat:Number(item.LogsLatitude)
                                 })
                                 this.pathxianluData.push({
                                     LogsChone:item.LogsChone,
                                     LogsChtwo:item.LogsChtwo,
                                     LogsChthree:item.LogsChthree,
                                     LogsChfor:item.LogsChfor,
                                     LogsLatitude:item.LogsLatitude,
                                     LogsLongitudel:item.LogsLongitudel,
                                     LogsTime:item.LogsTime,
                                     show:false,
                                     icons:null,
                                     CarPosition: null,
                                     ChforHigh: _this.Bounddata[0].ChforHigh,
                                     ChforLow:_this.Bounddata[0].ChforLow,
                                    ChforType:_this.Bounddata[0].ChforType,
                                    ChforUs:_this.Bounddata[0].ChforUs,
                                    ChoneHigh:_this.Bounddata[0].ChoneHigh,
                                    ChoneLow:_this.Bounddata[0].ChoneLow,
                                    ChoneType:_this.Bounddata[0].ChoneType,
                                    ChoneUs:_this.Bounddata[0].ChoneUs,
                                    ChthrHigh:_this.Bounddata[0].ChthrHigh,
                                    ChthrLow:_this.Bounddata[0].ChthrLow,
                                    ChthrType:_this.Bounddata[0].ChthrType,
                                    ChthrUs:_this.Bounddata[0].ChthrUs,
                                    ChtwoHigh:_this.Bounddata[0].ChtwoHigh,
                                    ChtwoLow:_this.Bounddata[0].ChtwoLow,
                                    ChtwoType:_this.Bounddata[0].ChtwoType,
                                    ChtwoUs:_this.Bounddata[0].ChtwoUs,
                                    GroupId:_this.Bounddata[0].GroupId,
                                    LoggerChnum:_this.Bounddata[0].LoggerChnum,
                                    LoggerName:_this.Bounddata[0].LoggerName,
                                    LoggerSn:_this.Bounddata[0].LoggerSn,
                                    LoggerState:_this.Bounddata[0].LoggerState,
                                  })
                                 
                                }
                                this.impetus.push(
                                        this.pathxianluData[0], 
                                        this.pathxianluData[this.pathxianluData.length-1]         
                                    )
                            for(var i=0;i<this.impetus.length;i++){
                                 this.impetus[i].icons=this.iconsarry[i];
                            }
                    
                         }
                     })
                 }
                
               },
          infoWindowOpenMarker (e, p) {//点击打开地图下显示
            let _this = this
            console.log(e)
              // this.show[e] = true;
           $.ajax({//经纬度转换显示位置,
                 type:'get',
                 url:`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${p.lat},${p.lng}&output=json&pois=1&ak=UiGHNfWON4wXTdWrou8Ada28mNnEPFcB&callback=initialize`,
                 dataType:'jsonp',
                 success:function(res){
                   _this.CarPosition=res.result.formatted_address
                 
                 }  
             })
          },
          infoWindowOpen(e) {
            console.log(e)
            this.impetus[e].show= true;
          },
          infoWindowClose (e) {
           this.impetus[e].show= false;
            },
         Demand(){//查询轨迹
          var _this = this;
               this.GetTravelpath()  

            },
       DerivedDataExecl(){
            var params={
                   loggerInfoSn:this.AllEquipmentName,
                   staDate:this.valueTime == null ? undefined : this.valueTime[0],
                   endDate:this.valueTime == null ? undefined : this.valueTime[1]
                }  
               if(this.AllEquipmentName ==''||this.AllEquipmentName==undefined){
                          this.$message({
                              type:'error',
                               message:'选择设备'
                            })
                    }else{
                    window.location.href="DataCentreManage/ExportMapTrackDataExecl?loggerInfoSn="+this.AllEquipmentName+"&staDate="
                                          +params.staDate+"&endDate="+params.endDate+"";
                      }
                },
            DerivedData(){
              var params={
                     loggerInfoSn:this.AllEquipmentName,
                     staDate:this.valueTime == null ? undefined : this.valueTime[0],
                     endDate:this.valueTime == null ? undefined : this.valueTime[1]
                   }
                 ExportMapTrackDataPdf(qs.stringify(params)).then(res=>{
                      if(res.State==1){
                         window.open(res.Url)
                      }else if(res.State == 0){
                        this.$message({
                           type:'error',
                           message:'该仪器无有效数据'
                        })
                      }

                 })
            },

         },
          mounted(){
              this.AllEquipmentList()//下拉显示
            },
  }

</script>

<style lang="scss" scoped>
     .MapTrajectory{
         height:  calc(100% - 10px);
         background: #eaedf1;  
        .MapTrajectorySecrch{
        	height: 35px;

        }
        .demo-form-inline{
               margin: 15px 0px 0px 15px;
        }
        .DataExport{
        	margin-left: 20px;
        }
     .DevicesDisplay{
          height: 56px;
          line-height: 56px;
          width:230px;
         }
       .MapFind{
       	  height:  calc(100% - 100px);
       	  margin: 15px;
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
       .map{
       	height: 100%;
       	width: 100%;
       }
       .mapcontent{
       	height:  calc(100% - 20px);
       	width: 100%;
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
       .StatusOpen{
          background:url(../assets/img/icon.png) no-repeat -20px -483px;
        }
        .StatusClose{
          background:url(../assets/img/icon.png) no-repeat -20px -518px;
        }
       .Overload{
           background: url(../assets/img/overheight.png);
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
       .Name{
          height:18px;
          line-height: 18px;
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
