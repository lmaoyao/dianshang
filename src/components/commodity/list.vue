<template>
  <div>
      <Info shouye="首页" guanli='投诉管理' liebiao='订单查询' flag='true'>
          <el-input placeholder="请输入手机号" v-model="query.mobile" style="width:300px" clearable>
                <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
         </el-input>
         <el-table :data='datalist' border>
           <el-table-column type="index" label="#"></el-table-column>  
           <el-table-column prop="partnerName" label="公司名称"></el-table-column>
           <el-table-column prop="mobile" label="受理号码"></el-table-column>
           <el-table-column prop="goodName" label="商品"></el-table-column>
           <el-table-column prop="ordOrpTime" label="下单时间"></el-table-column>
           <el-table-column prop="goodId" label="SKU编码"></el-table-column>
           <el-table-column prop="orderId" label="主订单号"></el-table-column>
           <el-table-column prop="subOrderId" label="子单号"></el-table-column>
           <el-table-column prop="subOrderPoints" label="积分"></el-table-column>
           <el-table-column prop="subOrderStatus" label="状态">
             <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.subOrderStatus==='00'" >撤销</el-tag>
                <el-tag type="danger" v-else-if="scope.row.subOrderStatus==='013'" >已撤单</el-tag>
                <el-tag v-else-if="scope.row.subOrderStatus==='006'" >已发货</el-tag>
                <el-tag type="success" v-else-if="scope.row.subOrderStatus==='007'" >已完结</el-tag>
                <el-tag type="warning" v-else-if="scope.row.subOrderStatus==='002'" >代发货</el-tag>
                <el-tag type="info" v-else>{{scope.row.subOrderStatus}}</el-tag>
             </template>
           </el-table-column>
         </el-table>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[10, 20, 50, 80]"
            :page-size="query.rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </Info>
  </div>
</template>
<script>
import Info from '../Info'
export default {
  components:{
    Info
  },
  data(){
    return{
      datalist:[],
      total:1000,
      query:{
        rows:10,
        page:1,
        mobile:"",
        startTime:"20190101",
        endTime:"20200801"
      }
    }
  },
  created(){
    this.getList()
  },
  methods:{
    async getList(){
      let {data:res} = await this.$http.post('order/all',this.query);
      this.datalist = res.data;
      this.total = res.total;
    },
    handleSizeChange(newSize){
     this.query.rows =newSize;
      this.getList()
    },
    handleCurrentChange(newPage){
      this.query.page = newPage;
      this.getList()
    }
    
  }
}
</script>