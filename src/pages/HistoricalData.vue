<template>
   <el-row class="HistoricalData">
   	    <el-row>
   	    	<el-col :span='24'>
   	    	 <el-row>
			      <el-col :span='24' class="CurrentPosition">
			        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">实时监控</i><i class="el-icon-arrow-right">历史记录</i></div> 
			      </el-col>
			   </el-row>
   	    	</el-col>
   	    </el-row>
	        <el-row>
	        <el-col :span='24'>
	     		   <div class="HistoricalSecrch">
	     		        <el-form :inline="true"  class="demo-form-inline" size="small">
                        	  <el-form-item label="分区:">
							           <el-select v-model="AllZoneName"  placeholder="请选择分区"  @change="SelectedPartition">
								            <el-option
						                      v-for="item in AllZone"
						                      :key="item.value"
						                      :label="item.label"
						                      :value="item.value"
						                      >
						                     </el-option>					           	
									    </el-select>
							  </el-form-item>
							  <el-form-item label="设备:">
							         <el-select  v-model="AllEquipmentName" placeholder="请选择设备">
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
									          @change="HistoricalInquire"
										      v-model="valueTime"
										      type="datetimerange"
										      range-separator="至"
										      start-placeholder="开始日期"
										      end-placeholder="结束日期">
									    </el-date-picker>
									</div>
							  </el-form-item>
							  <el-form-item>
							   <el-button type="primary" size="small" @click="HistroyMemory" >查询</el-button>
							  </el-form-item>
							   <el-form-item>
							    <el-button type="primary" size="small" class="DataExport">导出图片</el-button>
							  </el-form-item>
							   <el-form-item>
							    <el-button type="primary" size="small" class="DataExport">导出数据</el-button>
							  </el-form-item>
						</el-form> 
	     		   </div>
	     	</el-col>
        </el-row>
         <el-row class="tablelayout">
         	<el-col :span="24">
             <table class='multiTable' border='0' width="100%" cellpadding="0" cellspacing="0">
              <thead class="thd_bg">
                <tr>
                  <th width="10%">{{ this.HistorTable.length }}个测量通道</th>
                  <th width="10%">{{ Branches }}条记录</th>
                  <th width="10%">开始时间</th>
                  <th colspan="3">{{  this.HistoricalTime[0] }}</th>
                  <th width="10%">结束时间</th>
                  <th colspan="3">{{ this.HistoricalTime[1] }}</th>
                </tr>
              </thead>
              <tbody  class="tbd_bg">
	           <tr v-for='(item, index) in HistorTable' :key='index'>
	                  <td> 通道{{index+1 }}</td>
	                  <td>{{ item.record }}</td>
	                  <td> 最大值 </td>
	                  <td>{{ item.MaximumValue }}</td>
	                  <td>最小值</td>
	                  <td>{{ item.MinimumValue }}</td>
	                  <td>平均值</td>
	                  <td>{{ item.AverageValue }}</td>
	                  <td>波动值</td>
	                  <td>{{ item.FloatingValue }}</td>
	                </tr> 
              </tbody>
            </table>
         	</el-col>
         </el-row>
        <el-row v-if="TexNull == true" style="text-align:center;color:#999;line-height:290px;">该段时间暂无数据,请重新选择时间
        </el-row>

             <el-row  class="Channellayout" >
	         	  <el-col  v-if="ChannelNumber==1">
                        <el-col :span="24">
	         	  	          <ve-line :data="chartData" :settings="chartSettings" ></ve-line>
                        </el-col>
	         	  </el-col>
                  <el-col v-if="ChannelNumber==2">
	                  	  <el-col :span="24" >
	                  	  </el-col>
	                  	  <el-col :span="24" >
	                  	  </el-col>
                  </el-col> 
                  <el-col v-if="ChannelNumber==3">
                  	      <el-col :span="24">
                  	      </el-col>
                  	      <el-col :span="24">
                  	      	   <el-col :span="12">
                  	      	   	
                  	      	   </el-col>
                               <el-col :span="12">
                               </el-col>
                  	      </el-col>
                  </el-col>
                  <el-col v-if="ChannelNumber==4">
                  	    <el-col :span="24">
	                  	    	<el-col :span="12">
	                  	    		<ve-line :data="chartData" :settings="chartSettings" ></ve-line>
	                  	    	 </el-col>
	                  	    	 <el-col :span="12">
	                  	    	 	<ve-line :data="chartData" :settings="chartSettings" ></ve-line>
	                  	    	 </el-col>
                  	    </el-col>
                         <el-col :span="24">
	                  	    	 <el-col :span="12">
	                  	    	 	<ve-line :data="chartData" :settings="chartSettings" ></ve-line>
	                  	    	 </el-col>
	                  	    	 <el-col :span="12">
	                  	    	 	<ve-line :data="chartData" :settings="chartSettings" ></ve-line>
	                  	    	 </el-col>
                  	    </el-col>
                  </el-col>

             </el-row>
      
   </el-row>
</template>
<script>
	  import{GetGroupAndLogger,GetHistoryData}from'@/api/api'
	  import qs from 'qs';
export default {
     data(){
     	 return{
               TexNull:false,
			   valueTime:"",
			   HistoricalTime:[],
			   AllZone:[],//分区显示
			   AllEquipment:[],//设备显示
			   AllZoneName:"",//分区名称
			   AllEquipmentName:"",//设备名称
			   tableData:[],
			   HistorTable:[],//历史表格显示
			   Branches:'',//记录条数
               Polylinearry:[],//折线数组.
               ChannelNumber:"",//通道数量.根据通道数量判断布局.
               Channelvalue:[],//通道一/定义四个,等于rows
               chartData:{
			        columns: ['LogsTime', 'LogsChone','LogsChtwo','LogsChthree','LogsChfour'],
				        rows: [
	/*				          { 'data': '1月1日', 'balance': 123  },
					          { 'data': '1月2日', 'balance': 1223 },
					          { 'data': '1月3日', 'balance': 2123 },
					          { 'data': '1月4日', 'balance': 4123 },
					          { 'data': '1月5日', 'balance': 3123 },
					          { 'data': '1月6日', 'balance': 7123 }*/
				         ]
		      },
              chartSettings:{
                   labelMap:{
					          balance: '通道',
					        },
					lineStyle:{color:'red'},
				
		        },
     	 }
     },
     methods:{           
           PartitionDisplay(){
                  GetGroupAndLogger().then(res=>{
                  	      console.log(res)
                        for(let i=0;i<res.length;i++){
			                      	 this.AllZone.push({
			                      	 	 label:res[i].GroupName,
			                      	 	 value:res[i].Id,
                                         ListLoggerInfo:res[i].ListLoggerInfo
			                      	 })
                     	    for(let k=0;k<res[i].ListLoggerInfo.length;k++){
                                 this.AllEquipment.push({
                                 	   label:res[i].ListLoggerInfo[k].LoggerName,
                                 	   value:res[i].ListLoggerInfo[k].LoggerSn
                                   })   
                      	      }
                          }
                     }) 
            },
             SelectedPartition(val){
                 for(var i=0;i<this.AllZone.length;i++){
                      if(val==this.AllZone[i].value){
                          this.AllEquipmentName="";//清空设备页面显示的值
                          this.AllEquipment=[];//选择分区的时候,清空设备
                            for(var k=0;k<this.AllZone[i].ListLoggerInfo.length;k++){
                               this.AllEquipment.push({
                                       label:this.AllZone[i].ListLoggerInfo[k].LoggerName,
                                       value:this.AllZone[i].ListLoggerInfo[k].LoggerSn
                                })   
                             }
                        } 
                 }
            },
            HistroyMemory(){
                      var params={
	                      	  loggerInfoSn:this.AllEquipmentName,
							  staDate:this.HistoricalTime[0],
							  endDate:this.HistoricalTime[1]
                      }
                   GetHistoryData(params).then(res=>{
                   	       console.log("历史记录")
                   	       console.log(params)
                           console.log(res)
                           if(res.Data.ListLoggerInfoChnumData.length==0){
                                    this.TexNull=true;//显示没有数据
                                    this.chartData.rows=[];
                           }
                           this.ChannelNumber=res.Data.LoggerChnum;//根据通道数量显示不同的布局
                           this.HistorTable=[];
                          for(let item of res.Data.ListAnalysisOfData){
                          	     this.HistorTable.push(item)//历史表格显示的数据,
                                 this.Branches=res.Data.CountNumber

                            }
	                         for(let item of res.Data.ListLoggerInfoChnumData){//折线显示图.
                                         this.chartData.rows.push(item)
		                         	   }
                   })     
            },
           HistoricalInquire(val){
               	  if (val==null) {
	                  this.HistoricalTime[0]=undefined;
	                  this.HistoricalTime[1]=undefined;
	          	 }else{
	               this.HistoricalTime=val;
	               }

           },
     },
     mounted(){
          this. PartitionDisplay()//分区联动显示   
     },

}
</script>
<style lang="scss" scoped>
    .HistoricalData{
    	 	 height: calc(100% - 10px);
		         background: #fefefe;
		         border: 1px solid blue;
		    .CurrentPosition{
		    		height: 40px;
		    		background:#f7f7f7; 
		    		.NowPositon{
		              line-height: 40px;
		              margin-left: 15px;
		    		}
		    	} 
         .HistoricalSecrch{
               height: 50px;
               margin: 15px;
          }
        .multiTable{
        	    border-left: 1px solid #dcdfe6;
			    border-top: 1px solid #dcdfe6;     
			    border-radius: 2px;
			    margin-top: 10px;
        }
        .thd_bg{
			    height: 32px;
			    tr{
			      height: 32px;
			      background: #f4f4f4;
			      th{
			        border-right: 1px solid #dcdfe6;
			        border-bottom: 1px solid #dcdfe6;
			        font-family: Microsoft YaHei;
			        font-weight: 500;
			        font-size: 14px;
			        color: #666;
			      }
			    }
		  }
	 .tbd_bg{
		    height: 26px;
		    tr{
		      height: 26px;
		      text-align: center;
		      td{
		        border-right: 1px solid #dcdfe6;
		        border-bottom: 1px solid #dcdfe6;
		        font-family: Microsoft YaHei;
		        font-weight: 500;
		        font-size: 14px;
		        color: #666;
		      }
		    }
	  }


        .tablelayout{
        	padding: 20px;
        }
        .Channellayout{
            padding: 20px;
        	border: 1px solid blue;
        	margin-top: 40px;
        	height: calc(100% - 300px);
        }

    }
</style>


