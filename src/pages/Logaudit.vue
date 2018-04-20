<template>
     <el-row class="Logaudit">
        <el-row>
        		    <el-col :span='24'>
        			      <el-col :span='24' class="CurrentPosition">
        			        <div class="NowPositon">
        			        	<i class="el-icon-location"></i>
        			        	<span>{{$t('m.Location')}}</span>
        			        	<i class="el-icon-arrow-right"><span class="currentcolor">{{$t('m.LOG')}}</span></i>
        			        </div> 
        			      </el-col>
        		   </el-col>
       </el-row>
       <el-row>
        	<el-col :span='24'>
       		   <div class="MapTrajectorySecrch">
           		  <el-form :inline="true"  class="demo-form-inline" size="small">
        						  <el-form-item :label="$t('m.UserName')">
          						     <el-select v-model="AllEquipmentName" :placeholder="$t('m.SelectUsername')"> 
                              <el-option
          	                        v-for="item in options "
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
          									            value-format="yyyy-MM-dd"
          										          v-model="valueTime"
          										          type="daterange"
          	                            :picker-options="disabledDate"
          										          range-separator="至"
          										          :start-placeholder="$t('m.StartTime')"
          										          :end-placeholder="$t('m.EndTime')">
          									    </el-date-picker>
          							 </div>
          						  </el-form-item>
          						  <el-form-item>
          						    <el-button type="primary" size="small" @click="Demand">{{$t('m.Search')}}</el-button>
          						  </el-form-item>
      					    </el-form> 
       		   </div>
       	</el-col>
        </el-row>
        <el-row class="Logauditlable">
                  <el-col :span='24'>
                      <el-table
                       :data="LogtableData"
                        border
                        >
                      <el-table-column
                        :label="$t('m.Number')"
                        type="index"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="UserName"
                        width='120'
                        :label="$t('m.operator')"
                       >
                      </el-table-column>
                    <el-table-column
                        prop="OpTime"
                        width='160'
                        :label="$t('m.Recording')"
                       >
                      </el-table-column>
                      <el-table-column
                        prop="OpText"
                        :label="$t('m.OperatingContent')"
                       >
                      </el-table-column>
                      <el-table-column
                        prop="OpType"
                        :label="$t('m.OperationType')"
                        width='140'>
                         <template slot-scope="scope">
                                  <span  v-if='LogtableData[scope.$index].OpType==0' >{{$t('m.Delect')}}</span>
                                  <span  v-if='LogtableData[scope.$index].OpType==1' >{{$t('m.Modify')}}</span>
                                  <span  v-if='LogtableData[scope.$index].OpType==2' >{{$t('m.ADD')}}</span>
                           </template>
                      </el-table-column>
                  </el-table> 
              </el-col> 
        </el-row>
         <div class="myPagination" style=" background: #fff ; height: 60px; line-height: 60px; text-align: center;"><!-- 组件翻页 -->
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
<script >
  import qs from 'qs';
  import {GetUserManageComboBoxData,GetUserNameOplogData}  from'@/api/api'; 
  import{SevenDay,timeFormattershow}from'@/assets/js/common';//时间的转换
export default{
       data(){
          return{
             totalNumber:null,
              LogtableData:[],
              pageIndex:1,
              pageSize:10,
          	  AllEquipmentName:'',
          	  valueTime: [timeFormattershow(new Date(SevenDay(new Date()))),timeFormattershow(new Date()) ],
              options:[], 
              disabledDate: {
		          disabledDate(time) {
		              return time.getTime() > Date.now();
		          }
		      },  
          }
     },
     methods:{

    
     SelectTable(){
          	   GetUserManageComboBoxData().then(res=>{
                /* this.AllEquipmentName=res.Data[0].UserName*/
                      let options=[]
                      options=this.options
                    if(res.Data!==0){
                          for(let i=0;i<res.Data.length;i++){
                          	options.push({
                          		value:res.Data[i].UserName,
                          		label:res.Data[i].UserName
                          	 })
                            
                          }
                       }
                   this.AllEquipmentName=this.options[0].value
                   this.getLogaudit()
          	     })
            },
          getLogaudit(){
                     this.LogtableData=[];
                       var parms = {
                             pageIndex:this.pageIndex,
                             pageSize:this.pageSize,
                             userName:this.AllEquipmentName,
                             staDate: this.valueTime == null ? undefined : this.valueTime[0],
                             endDate:this.valueTime == null ? undefined : this.valueTime[1]
                      }
                GetUserNameOplogData(parms).then(res=>{
                    /* this.LogtableData.push(res.Data)*/
                    console.log("------")
                    console.log(res)
                    this.totalNumber=res.TotalNumber//总条数
                    for(let item of res.Data){
                       this.LogtableData.push(item)
                     }
                 })
           },
          Demand(){//点击查询的搜索
                   this.getLogaudit()
          },
         pageIndexChange(pageIndex){//翻页监控当前页面发生变化没有! 重新获取列表的页面!~
               this.pageIndex = pageIndex;//传当前页面   
               this.getLogaudit()
             },

     },
     mounted(){
            this.SelectTable()//下拉选中
     }	
 }
</script>
<style lang="scss" scoped>
      .Logaudit{
        height: 100%;
        background: #eaedf1;
         .MapTrajectorySecrch{
             margin: 20px;
         }
        .Logauditlable{
          padding: 20px;
          min-height: calc(100% - 191px);
          background: #fff;
        }

       }
</style>
<style type="text/css">
  
           .Logaudit .cell{
          text-align: center;
        }
</style>