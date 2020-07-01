<template>
    <div>
    <Info shouye='首页' guanli='数据统计' liebiao='数据列表'>
        <el-table :data="statisics" border>
            <el-table-column label='公司名称' prop='name'></el-table-column>
            <el-table-column label='投诉个数' prop='num'></el-table-column>
        </el-table>
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
          statisics:[]
        }    
    },
    created(){
        this.getList()
    },
    methods:{
        async getList(){
            let {data:res} = await this.$http.get('statistics/index'); 
            this.statisics = res.data
        }
    }
}
</script>