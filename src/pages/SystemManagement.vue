<template>
  <el-row class="SystemManagement">
    <el-row>
	    <el-col :span='24'>
		    <el-row>
		      <el-col :span='24' class="CurrentPosition">
		        <div class="NowPositon"><i class="el-icon-location"></i><span>当前位置:</span><i class="el-icon-arrow-right">系统管理</i></div> 
		      </el-col>
		   </el-row>
	   </el-col>
  </el-row>
   <el-row class="SystemManagementCoent">
		  <el-col :span="8" class="lightZone">
			  	<div class="grid-content bg-purple">
			  		
			  	</div>
		  </el-col>
		  <el-col :span="16">
			  	<div class="grid-content bg-purple">
			  		
			  	</div>
		  </el-col>
   </el-row>      
  




  </el-row>
</template>
<script>
export default {
         data(){
         	 
         }
}
</script>
<style lang="scss" scoped>
 
  .SystemManagement{
         height: calc(100% - 40px);
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
      .SystemManagementCoent{
      	     height: 100%;
             border: 1px solid blue;
              padding: 20px;
            
		     .lightZone {
		        	border:1px solid ;
				    height: calc(100% - 60px);
				  }
				}  
   }
</style>
<style type="text/css">
	.el-main{
		
	}
</style>