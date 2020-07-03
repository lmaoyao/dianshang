<template>
    <div>
        <Info shouye='首页' guanli="订单管理" liebiao="上传列表" flag='true'>
           
        <el-row>
            <el-alert
            title="请按真确的xlsx格式上传数据"
            type="warning"
            center
            show-icon>
             </el-alert> 
            <el-col :span="8">
                <el-upload
                    class="upload-demo"
                    action
                    accept='.xlsx,.xls'
                    :auto-upload='false'
                    :on-change='handle'
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <el-button @click="del" size="small" type='info'>清除内容</el-button>
                    </el-upload>
                    <el-button type="success" @click="uploadClick">上传服务器</el-button>
                   
            </el-col>
        </el-row>
       <!--  <el-table style="width: 100%" :data="outputs">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="公司名称" prop="relatePartnerName"></el-table-column>
            <el-table-column label="礼品名称" prop="wareName"></el-table-column>
            <el-table-column label="受理号码" prop="mobilePhoneNo"></el-table-column>
            <el-table-column label="受理时间" prop="acceptDate"></el-table-column>
            <el-table-column label="订单号" prop="oldOrderId"></el-table-column>
            <el-table-column label="子订单号" prop="oldSuborderId"></el-table-column>
            <el-table-column label="订单金额" prop="money"></el-table-column>
            <el-table-column label="积分值" prop="integral"></el-table-column>
            <el-table-column label="处理结果" prop="result"></el-table-column>
            <el-table-column label="退费金额" prop="Refund"></el-table-column>
        </el-table> -->
        <el-table style="width: 100%" :data="outputs" border>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="客服处理时间" prop="timer"></el-table-column>
                <el-table-column label="公司名称" prop="relatePartnerName"></el-table-column>
                <el-table-column label="礼品名称" prop="wareName"></el-table-column>
                <el-table-column label="受理号码" prop="mobilePhoneNo"></el-table-column>
                <el-table-column label="投诉时间" prop="acceptDate"></el-table-column>
                <el-table-column label="订单号" prop="oldOrderId"></el-table-column>
                <el-table-column label="子订单号" prop="oldSuborderId"></el-table-column>
                <el-table-column label="是否超时" prop="overtime"></el-table-column>
                <el-table-column label="订单金额" prop="money"></el-table-column>
                <el-table-column label="积分值" prop="integral"></el-table-column>
                <el-table-column label="处理结果" prop="result"></el-table-column>
                <el-table-column label="退费金额" prop="Refund"></el-table-column>
        </el-table>
        </Info>
    </div>
</template>
<script>
import Info from '../Info'
import {readFile,character} from "@/assets/js/utils.js"
import xlsx from 'xlsx'
export default {
    data(){
        return{
             outputs: []
        }
    },
    components:{
        Info
    },
    methods:{
      async  handle(e){
            //e:上传文件的信息
            let file = e.raw;
            if(!file) return;
            //读取file中的数据
            let data = await readFile(file);
            let workbook = xlsx.read(data,{type:"binary"});
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let result = xlsx.utils.sheet_to_json(worksheet);//将表格的数据变为json格式
            //把读取出来的数据替换成给以传递给服务器的数据
            result.forEach(item=>{
                let obj ={};
                //{姓名: "毛旺旺" 年龄: 18},{姓名: "仙女" 年龄: 18}
                for(let key in character){
                    let v = character[key];
                   //{text: "姓名",type: "string"}
                     let text = v.text,
                        type = v.type;
                        v=item[text] || "";
                        type==='string' ?(v=String(v)):null;
                        type==='number'?(v=Number(v)):null;
                        obj[key] = v
                }
                this.outputs.push(obj);  
            })       
        },
        async uploadClick(){
           let {data:res}=await this.$http.post('order/upload',this.outputs);
           if(res.mate!==200){
               return this.$message.error('添加数据失败');
           }
           this.$message.success('添加数据成功，一共添加'+res.num+'条数据')
        },
        del(){
            this.outputs=[]
        },
        
    }
}
</script>