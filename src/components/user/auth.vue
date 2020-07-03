<template>
  <div>
    <Info shouye='首页' guanli='人员管理' liebiao='权限列表' flag='false'>
      <el-row>
        <el-col>
          <el-button @click="addRole">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="authList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="rolename"></el-table-column>
        <el-table-column label="权限介绍" prop="roletext"></el-table-column>
      </el-table>
    </Info>  
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="50%"
     >
      <span>
        <el-input v-model="addRoles.roleName" placeholder="请输入角色名称" clearable style="width:500px;margin-bottom:30px"></el-input>
        <el-input v-model="addRoles.text" placeholder="请输入角色描述" clearable style="width:500px;margin-bottom:30px"></el-input>
        <!-- 添加路径 -->
          <el-transfer
            v-model="addRoles.value"
            :props="{
              key: 'value',
              label: 'desc'
            }"
            :data="data"
            ref="transferRef"
            :left-default-checked='dd'
            >
      </el-transfer>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queryRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Info from '../Info'
export default {
  components:{
    Info
  },
  created(){
    this.getAuth();
    
    
  },
  data(){
    const generateData = _ => {
        const data = [];
        this.$router.options.routes.forEach(item => {
          if(item.children){
            item.children.forEach(name=>{
             data.push({
               desc:name.name,
               value:name.path
             })  
            })
          }
        });
        return data;
      }
    return{
      data: generateData(), 
      authList:[],
      dialogVisible:false,
      addRoles:{
        roleName:"",
        value: [],//已添加的数据
        text:""
      },
      dd:[]
    }
  },
  methods:{
   async getAuth(){
      let {data:res} = await this.$http.get('auth/auth');
      if(res.mate!==200){
        this.$message.error('获取权限数据失败')
      }
      this.authList =res.data;
      this.$message.success('获取权限数据成功');
    },
    addRole(){
      this.dialogVisible =  true;
    },
    async queryRole(){
      // console.log(this.addRoles.value);
      console.log(this.dd);
      
      // let {data:res} = await this.$http.post('auth/queryrole',this.addRoles);
    
      
      
    },

  }
}
</script>