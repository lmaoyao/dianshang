<template>
  <div class="export-excel-bg">
        <el-input placeholder="请输入公司cookie" v-model="inputPhone" style="width:300px" clearable>
                <el-button slot="append" icon="el-icon-search" @click="getList" type="success"></el-button>
        </el-input>
        <el-button @click="export2Excel">导出Excel</el-button> 
        <el-table border :data="tousuList">
          <el-table-column  label="公司名称" prop="relatePartnerName"></el-table-column>
          <el-table-column  label="受理号码" prop="mobilePhoneNo"></el-table-column>
          <el-table-column  label="受理时间" prop="acceptDate"></el-table-column>
          <el-table-column  label="客诉类型" prop="allegeParentKindName"></el-table-column>
          <el-table-column  label="主订单号" prop="oldOrderId"></el-table-column>
          <el-table-column  label="子订单" prop="oldSuborderId"></el-table-column>
          <el-table-column  label="投诉内容" prop="acceptDesc"></el-table-column>
          <el-table-column  label="二次投诉内容" prop="sendNote">
            <template slot-scope="scope">
                <span v-if="scope.row.sendNote===''">没有二次投诉</span>
                <span v-else>{{scope.row.sendNote}}</span>
            </template>
          </el-table-column>

        </el-table>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  data(){
    return{
      inputPhone:"",
      tousuList:[],
    }
  },
  methods: {
   async  getList(){
     let {data:res} =await this.$http.get('order/list',{
       params:{cookie:this.inputPhone}
     });
     this.tousuList = res.data; 
    },
    formatJson(filterVal, jsonData) {
    　　　return jsonData.map(v => filterVal.map(j => v[j]))
    　　},
    export2Excel() {
              //require的路径因个人项目结构不同可能需要单独调整，请自行修改路径
              if(this.tousuList.overTimeName===null){
                this.tousuList.overTimeName='未超时';
              }
    　　　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
    　　　　　　const tHeader = ['客服处理时间','公司名称','礼品名称','受理号码','投诉时间','客诉类型','客诉原因','投诉单状态','订单号','子订单号','是否超时','订单金额','积分值','处理结果','退费金额'];
    　　　　　　const filterVal = ['statusTime','relatePartnerName', 'wareName', 'mobilePhoneNo', 'acceptDate', 'allegeParentKindName', 'allegeKindName','allegeStatusName','oldOrderId','oldSuborderId','overTimeFlag','','','',''];
    　　　　　　const list = this.tousuList;
    　　　　　　const data = this.formatJson(filterVal, list);
                 var date = new Date();
                // var year = date.getFullYear(); //获取当前年份
                var mon=date.getMonth()+1; //获取当前月份
                var da=date.getDate(); //获取当前日
                // var day=date.getDay(); //获取当前星期几
                var h=date.getHours(); //获取小时
                var m=date.getMinutes(); //获取分钟
                let timer =mon+"-"+da+' '+h+"."+m
                console.log(timer);
    　　　　　　export_json_to_excel(tHeader, data, timer);

    　 }
  }
}
</script>
