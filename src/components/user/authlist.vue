<template>
  <div>
    <Info shouye='首页' guanli='人员管理' liebiao='权限列表' flag='true'>
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialog">添加权限</el-button>
        </el-col>
      </el-row>
      <el-table :data="pathList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="管理员" prop="rolename"></el-table-column>
        <el-table-column label="路径描述" prop="authname"></el-table-column>
        <el-table-column label="权限路径" prop="path"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </Info>
    <el-dialog
        title="添加权限"
        :visible.sync="dialogVisible"
        width="30%"
        @close="dialogClose"
        center
        >
        <span>
          <el-form ref="addFrom" :model="form" label-width="80px">
            <el-form-item label="权限路径">
              <el-input v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="路径描述">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="权限管理">
              <el-select  placeholder="请选择权限管理" v-model="form.auth">
                <el-option label="超级管理员" value="1"></el-option>
                <el-option label="管理员" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-alert
              title="添加完权限需重新登录才可生效"
              type="warning"
              show-icon>
            </el-alert>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAuth">确 定</el-button>
        </span>
  </el-dialog>
  </div>
</template>
<script>
import Info from '../Info'
export default {
    components:{
      Info,
    },
    data(){
      
      return{
        pathList:[],
        dialogVisible:false,
        form:{
          auth:"",
          path:"",
          title:""
        }
      }
    },
    created(){
      this.getList();
      
    },
    methods:{
     async getList(){
       let {data:res} = await this.$http.get('admin/auth');
       if(res.mate!==200){
         return this.$message.error('获取权限路径失败')
       }
       this.pathList = res.data
      },
      dialog(){
        this.dialogVisible = true;
      },
     async addAuth(){
          let {data:res}  = await this.$http.post('auth/addauth',this.form);
          if(res.meta!==200){
            this.$message.error('添加权限失败');
          }
            this.$message.success(res.message);
            this.getList();
            this.dialogVisible = false; 
      },
      dialogClose(){
           this.getList();
           this.$refs.addFrom.resetFields();
      },
     async del(id){
        let {data:res} = await this.$http.get('auth/del',{params:{path:id.path,rolename:id.rolename}})
        if(res.mate!==200){
          return this.$message.error('删除权限失败')
        }
        this.$message.success(res.message);
        this.getList()
      }
    }
}
</script>