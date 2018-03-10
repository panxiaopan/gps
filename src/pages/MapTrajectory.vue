<template>
  <el-row class="MapTrajectory">
           <el-row>
		    <el-col :span='24'>
			    <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon">
			        	<i class="el-icon-location"></i>
			        	<span>当前位置:</span>
			        	<i class="el-icon-arrow-right">实时监控</i>
			        	<i class="el-icon-arrow-right"> <span class="currentcolor">地图轨迹</span></i>
			        </div> 
			      </el-col>
			   </el-row>
		   </el-col>
	  </el-row> 
     <el-row>
     	<el-col :span='24'>
     		   <div class="MapTrajectorySecrch">
     		        <el-form :inline="true"  class="demo-form-inline" size="small">
						  <el-form-item label="设备:">
  						     <el-select v-model="AllEquipmentName" placeholder="选择设备"> 
                      <el-option
                        v-for="item in AllEquipment"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                       >
                     </el-option>
                  </el-select>
						  </el-form-item>
						  <el-form-item label="时间段:">
                 <div class="block">
								    <el-date-picker
								         value-format="yyyy-MM-dd HH:hh:mm"
								          @change="TrajectoryInquire"
									      v-model="valueTime"
									      type="datetimerange"
									      range-separator="至"
									      start-placeholder="开始日期"
									      end-placeholder="结束日期">
								    </el-date-picker>
								</div>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" size="small" @click="Demand">查询</el-button>
						  </el-form-item>
<!--                <el-form-item>
                <el-button type="primary" size="small" class="DataExport" @click="reset">播放行程</el-button>
              </el-form-item> -->
						   <el-form-item>
						    <el-button type="primary" size="small" class="DataExport" @click="DerivedData">导出数据</el-button>
						  </el-form-item>

					</el-form> 
     		   </div>
     	</el-col>
     </el-row>
     <el-row class="MapFind">
     	<el-col :span="24" class="mapcontent">
                  <baidu-map class="map" center="北京" :zoom="15" :scroll-wheel-zoom="true">
                    <bm-driving :start="TourStart" :end="Tourend" :panel="false" :autoViewport="true">
                    </bm-driving>
                       <bml-lushu
                          @stop="reset"
                          :speed=4000
                          :path="path"
                          :icon="icon"
                          :play="play"
                          :rotation="true">
                      </bml-lushu>
                     

                  </baidu-map>   
     	</el-col>
     </el-row>
  </el-row>
</template>
<script>
  import{GetMapShowsGroupLoggerInfoData,GetMapTrackData,ExportMapTrackDataPdf}from'@/api/api'
	import {BmlMarkerClusterer} from 'vue-baidu-map'
  import {BmlLushu} from 'vue-baidu-map'
export default {
      components: {
        BmlLushu
      },
      data(){
      	 return{
                AllEquipment:[],//所有设备
    	          AllEquipmentName:'',//设备名称ID
                TrajectoryTime:[],
                valueTime:'',//时间默认是空值;
                play: true,
                path: [],//形成线路
                icon: {
                  url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
                  size: {width: 52, height: 26},
                  opts: {anchor: {width: 27, height:13}}
                },
                TourStart:{
                  lng:"",
                  lat:""
                },
                Tourend:{
                  lng:"",
                  lat:""
                },
             
      	 }
      },
      methods:{
             reset () {
                this.play = false
              },
             AllEquipmentList(){
                this.EquipmentList=[]//调用前清空
                 var params={
                     condition:'',
                  }
                 GetMapShowsGroupLoggerInfoData(params).then(res=>{
                      for(let item of res.Data){
                           this.AllEquipment.push({
                               label:item.LoggerInfoName,
                               value:item.LoggerInfoSn
                           })
                      }

                 })
            },  
          TrajectoryInquire(val){
                   console.log(val)
  	              if (val==null) {
  	                  this.TrajectoryTime[0]=undefined;
  	                  this.TrajectoryTime[1]=undefined;
    	          	   }else{
    	                   this.TrajectoryTime=val;
    	                 }
            },
         GetTravelpath(){
            var params={
                   loggerInfoSn:this.AllEquipmentName,
                   staDate:this.TrajectoryTime[0],
                   endDate:this.TrajectoryTime[1]
              }
            GetMapTrackData(params).then(res=>{
                         console.log("坐标")
                         console.log(res)
                       if(res.State==1){
                            for(let item of res.Data){
                                 this.path.push({
                                      lng:item.Longitudel,
                                      lat:item.LatiTudeE
                                 })
                            }
                       }
                   this.TourStart.lng=Number(this.path[0].lng)//第一个点
                   this.TourStart.lat=Number(this.path[0].lat)
                   this.Tourend.lng=Number(this.path[this.path.length-1].lng)//最后一个点
                   this.Tourend.lat=Number(this.path[this.path.length-1].lat)
                  })
                 console.log(this.path)
               },
         Demand(){//查询轨迹
               this.GetTravelpath() 
            },
            DerivedData(){
              var params={
                     loggerInfoSn:this.AllEquipmentName,
                     staDate:this.TrajectoryTime[0],
                     endDate:this.TrajectoryTime[1]
                   }

                 ExportMapTrackDataPdf(params).then(res=>{
                     console.log(params)
                      console.log(res)
                      if(res.State==1){
                         window.open("res.Url")
                      }else{
                        this.$message({
                           type:'error',
                           message:'导出数据失败'
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
     .CurrentPosition{
		    		height: 40px;
		    		background:#f7f7f7; 
		    .NowPositon{
		              line-height: 40px;
		              margin-left: 15px;
		    		}
		     } 
        .MapTrajectorySecrch{
        	height: 35px;

        }
        .demo-form-inline{
               margin: 15px 0px 0px 15px;
        }
        .DataExport{
        	margin-left: 20px;
        }
       .MapFind{
       	  height:  calc(100% - 100px);
       	  margin: 15px;
       }
       .map{
       	height: 100%;
       	width: 100%;
       }
       .mapcontent{
       	height:  calc(100% - 20px);
       	width: 100%;
       }

     }

</style>

