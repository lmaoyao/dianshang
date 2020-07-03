<template>
    <div>
       
        <Info shouye='首页' guanli="订单管理" liebiao="查询列表" flag='true'>
             <el-input placeholder="请输入手机号或者公司名称" v-model="querys.inputPhone" style="width:300px" clearable>
                <el-button slot="append" icon="el-icon-search" @click="getLimit"></el-button>
            </el-input>
            <!-- <el-input style="width:300px" v-model="querys.timer1" clearable></el-input>
            <el-input style="width:300px" v-model="querys.timer2" clearable></el-input>
            <el-button type="primary" @click="getLimit">查询</el-button> -->
            <!-- <el-button type="success" @click="exportr">导出</el-button> -->
            <el-table style="width: 100% height:800px" :data="queryList" border>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="客服处理时间" prop="timer">
                    <template slot-scope="scope">
                        {{scope.row.timer}} 
                    </template>
                </el-table-column>
                <el-table-column label="公司名称" prop="relatePartnerName"></el-table-column>
                <el-table-column label="礼品名称" prop="wareName"></el-table-column>
                <el-table-column label="受理号码" prop="mobilePhoneNo"></el-table-column>
                <el-table-column label="投诉时间" prop="acceptDate"></el-table-column>
                <el-table-column label="订单号"   prop="oldOrderId"></el-table-column>
                <el-table-column label="子订单号" prop="oldSuborderId"></el-table-column>
                <el-table-column label="是否超时" prop="overtime"></el-table-column>
                <el-table-column label="订单金额" prop="money"></el-table-column>
                <el-table-column label="积分值"   prop="integral"></el-table-column>
                <el-table-column label="处理结果" prop="result"></el-table-column>
                <el-table-column label="退费金额" prop="Refund"></el-table-column>
            </el-table>
        </Info>
        <el-pagination v-if='flge===1'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.page"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="query.rows"
                layout="total, sizes, prev, pager, next, jumper"
                :total='this.total'>
        </el-pagination>
         <el-pagination v-else
                @size-change="handleSizeChanges"
                @current-change="handleCurrentChanges"
                :current-page="querys.page"
                :page-sizes="[50, 100, 150, 200]"
                :page-size="querys.rows"
                layout="total, sizes, prev, pager, next, jumper"
                :total='this.total'>
        </el-pagination>
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
            queryList:[],
            total:0,
            flge:0,
            query:{
                rows:100,
                page:1,  
            }, 
            querys:{
                inputPhone:"",
                rows:50,
                page:1, 
                timer1:"",
                timer2:""
            },
        }
    },
    created(){
        this.getQueryList()
    },
    methods:{
        async getQueryList(){
            // let {data:res} = await this.$http.get('order/query',{params:this.query})
            this.flge = 1
            let {data:res} = await this.$http.get('order/query',{params:this.query})
            if(res.mate!==200){
                return this.$message.error('获取投诉信息失败');
            }
            this.total = Number(res.total);
            this.queryList = res.data; 
            this.$message.success(res.message+"，共"+this.total+"条数据")
        },
        async getLimit(){
            this.flge = 2
            let {data:res} = await this.$http.get('order/querys',{params:this.querys})
            if(res.mate!==200){
                return this.$message.error('获取投诉信息失败');
            }
            this.total = Number(res.aa);
            this.queryList = res.data; 
            this.$message.success(res.message+"，共"+this.total+"条数据")
        },
        //个数发生改变
        handleSizeChange(newSize){
            this.query.rows = newSize;
              this.getQueryList() 
        },
        //页码发生改变
        handleCurrentChange(newPage){
            this.query.page = newPage;
            this.getQueryList()
        },
         handleSizeChanges(newSize){
            this.querys.rows = newSize;
              this.getLimit() 
        },
        //页码发生改变
        handleCurrentChanges(newPage){
            this.querys.page = newPage;
            this.getLimit()
        },
    }
}
</script>