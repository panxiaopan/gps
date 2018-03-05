<template>
    <el-row class="Homepage">
        <el-row class="HomepageTOP">
	    	<el-col :span="20" class="HomepageTOPleft">
               <el-col :span="24">
	    	   <div class="HomepageTOPback">云平台使用方式</div>
               </el-col>
               <el-col :span="24" class="HomepageTOPIcon">
                    
                    	<div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon  NetworkEquipmentIconWIFI"></i>
                    		 	   <div class="Cloudconfiguration">物联网云组态</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	网络设备(支持RJ45、WIFI、GPRS等网络组网设备)直接上传云平台
                    		 	    </span>
                    		 </div>
                    	</div>
                      <div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon NetworkEquipmentIconTomonitor"></i>
                    		 	   <div class="Cloudconfiguration">物联网云组态</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	Tomonitor数据上报云平台实现云平台报警,APP检测,微信监控
                    		 	    </span>
                    		 </div>
                    	</div>
                        <div class="HomepageTOPPicture">
                    		 <div class="NetworkEquipment">
                    		 	   <i class="NetworkEquipmentIcon NetworkEquipmentIconalarm"></i>
                    		 	   <div class="Cloudconfiguration">物联网云组态</div>
                    		 	    <span class="CloudconfigurationIntroduction">
                    		 	    	 Tomonitor系统运行预警管理,实现微信报警,邮件报警.保障数据的实时
                    		 	    	 监控,出现问题及时发现
                    		 	    </span>
                    		 </div>
                    	</div>
               </el-col>
	    	 </el-col>
	    	 <el-col :span="4" class="HomepageTOPright">
                   <el-col :span="24" class="HomepageTOPrightTop">
                   	    <div class="FocusPlatform">关注微信公众平台</div>
                   	    <el-col :span='24' class="Wechatlocation" >
                            <el-col :span="12" style='position: relative;height:100%' >
                           	    	<div class="WechatICon vmiddle Accounts" >
                           	    	</div>
                            </el-col>
                            <el-col :span="12" style='height: 100%' >
                   	    	 <div class="Description" style='position: relative;width: 100%; height: 100%' >
                   	    	 	<div class='vmiddle' style='width: 100%; height: 40px' >
	                   	    	 	<div class="Wechatfontsize">关注微信公众号平台</div>
	                   	    	 	<div class="Wechatfontsize">微信报警信息推送</div>
                   	    	 	</div>
                   	    	 </div>
                            </el-col>
                   	    </el-col>
                   </el-col>
                   <el-col :span="24" class="HomepageTOPrightbottom Wechatlocation">
                            <div class="FocusPlatform">APP下载指导</div>
                            <el-col :span="12"  class="Appheight" >
                                  <div class="WechatICon vmiddle IOS" >
                                  </div>
                                  <div class="Download"><span class="fontDescribe">iOS下载</span></div>
                            </el-col>
                           <el-col :span="12" class="Appheight" >
                                  <div class="WechatICon vmiddle Android" >
                                  </div>
                                   <div class="Download"><span class="fontDescribe">Android下载</span></div>
                            </el-col> 
                          <div class="Presentation">华图测控有限公司诚邀您使用"冷链宝" APP定位监测系统,让监测更便捷,更直观.</div>
                   </el-col>

	    	 </el-col>
        </el-row>

    </el-row>
</template>
<script>
export default {
     
}
</script>
<style lang="scss" scoped>
     .Homepage{
           background: #eaedf1;
           margin: 20px;
         .HomepageTOP{
         	 height: 574px;
         	 min-width: 1665px;
             .HomepageTOPleft{
             	 border: 1px solid #d7d7d7;
             	 background: #ffffff;
             	 height: 574px;
             	 width: 1300px;
             	 .HomepageTOPback{
             	 	height: 45px;
             	 	background: #f4f4f4;
             	 	padding-left: 20px;
             	 	font-size: 16px;
             	 	font-family: "Microsoft YaHei" !important;
             	 	line-height: 45px;
             	 }
             	 .HomepageTOPIcon{
             	 	padding: 30px 20px;
             	 	.HomepageTOPPicture{
             	 		display: inline-block;
             	 	}
             	 }
                 .NetworkEquipment{
                 	display: inline-block;
                 	text-align: center;
                 	 height:450px;
                 	 width: 390px;
                 	 margin-left: 10px;
                 	 border: 1px solid  #e8e8e8; 
                 	 .NetworkEquipmentIcon{
                 	 	display: inline-block;
                 	 	width: 390px;
                 	 	height: 330px;	
                 	 }
                     .Cloudconfiguration{
                     	font-size: 16px;
                     	font-family: "Microsoft YaHei" !important;
                     	text-align: center;

                     }
                    .CloudconfigurationIntroduction{
                    	margin-top: 15px;
                    	display: inline-block;
                    	width: 300px;
                    }
                 }
                 .NetworkEquipmentIconWIFI{
                 	background: url(../assets/img/pic_1.png);
                 	margin-right: 18px;
                 }
                .NetworkEquipmentIconTomonitor{
                	background: url(../assets/img/pic_2.png);
                	margin-right: 18px;
                 }
                .NetworkEquipmentIconalarm{
                	background: url(../assets/img/pic_3.png)
                }
             }
             .HomepageTOPright{
             	padding-left: 30px;
             	height: 574px;
                width: 373px;
             	.HomepageTOPrightTop{
             		height: 229px;
             		border: 1px solid #d7d7d7;
             		border-radius: 5px;
             	}
               .Wechatlocation{
               	  height: 179px;
               	  position: relative;
               	  .vmiddle {
               	  	height: 100%;
               	  	position: absolute;
               	  	top: 0;
               	  	right: 0;
               	  	bottom: 0;
               	  	left: 0;
               	  	margin: auto;
               	  }
                  .WechatICon{
                  	margin: 24px 0px 0px 20px;
                  	border: 1px solid #c8c8c8;
                  	width: 125px;
                  	height: 125px;
                  	border-radius: 10px;
                  	display: inline-block;
                    position: relative;
                    background: #ffffff;
                  }
                  .Accounts{
                    background: url(../assets/img/WeChat.png)  no-repeat 1px 1px;
                  }
                  .Description{
                  	display: inline-block;

                  }
                  .Wechatfontsize{
                  	 font-family: "Microsoft YaHei" !important;
                  	 font-size: 14px;
                  	 color: #444444;
                     height: 20px;
                     padding-left: 10px;
                  }

               }
                 .HomepageTOPrightbottom{
                  margin-top: 20px;
                   border: 1px solid #c8c8c8;
                    border-radius: 5px;
                    height: 322px;
                    .Appheight{
                      position: relative;
                      height: 212px;
                    }
                    .IOS{
                      background: url(../assets/img/ios.png)  no-repeat 7px 6px;
                    } 
                    .Android{
                       background: url(../assets/img/android.png)  no-repeat 10px 11px;
                    }
                    .Download{
                      text-align: center;
                      margin-top: 12px;
                      .fontDescribe{
                        display: inline-block;
                        height: 26px;
                        border: 1px solid #c8c8c8;
                        border-radius: 13px;
                        width: 100px;
                        font-family: "Microsoft YaHei" !important;
                        font-size: 14px;
                        color: #888888;
                        line-height: 26px;
                      }
                    }
                    .Presentation{
                      padding: 20px;
                      font-size: 14px;
                      color: #888888;
                    }

                 }


             }
           
         }
          .FocusPlatform{
          	 height: 45px;
          	 font-family: "Microsoft YaHei" !important;
          	 font-size: 16px;
          	 line-height:45px;
          	 padding-left: 20px;
          	 border-bottom: 1px solid #d7d7d7;
          }



     }
</style>


