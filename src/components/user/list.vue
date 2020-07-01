<template>
  <div>
    <Info shouye='首页' guanli='管理员' liebiao='管理员列表'>
      <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      <el-table :data='userlist' style="width:100%" border stripe>
          <el-table-column label='#' type='index'></el-table-column>
          <el-table-column label='姓名' prop='name'></el-table-column>
          <el-table-column label='职位' prop='region'></el-table-column>
          <el-table-column label='邮箱' prop='email'></el-table-column>
          <el-table-column label='年龄' prop='age'></el-table-column>
          <el-table-column label='工作性质' prop='resource'></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="Edit(scope.row.id)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="open2(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
    </Info>
        <el-dialog
        title="修改用户"
        :visible.sync="dialogVisible"
        width="30%"
        >
          <el-form ref="editFormRef" :model="editForm" :rules="editFromRules" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="editForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="region">
              <el-input v-model="editForm.region"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="editForm.age"></el-input>
            </el-form-item>
            <el-form-item label="工作性质" prop="resource">
              <el-input v-model="editForm.resource"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editClick">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="30%"
        center
        @close="addFromClose"
        >
          <el-form ref="addFromRef" :model="addFrom" :rules="addFromRules" label-width="80px" label="left">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addFrom.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addFrom.password"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="region">
              <el-input v-model="addFrom.region"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addFrom.email"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="addFrom.age"></el-input>
            </el-form-item>
            <el-form-item label="工作性质" prop="resource">
              <el-input v-model="addFrom.resource"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetField">重置</el-button>
          <el-button type="primary" @click="addClick">确 定</el-button>
        </span>
      </el-dialog>
      <el-popover
        ref="popover5"
        placement="top"
        width="160"
        v-model="visible2">
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
        </div>
      </el-popover>
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
      userlist:[],
      dialogVisible:false,
      editForm:{},
      editFromRules:{
        region:[
          { required: true, message: '请输入职位', trigger: 'blur' },
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        age:[
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        resource:[
          { required: true, message: '请输入工作性质', trigger: 'blur' },
        ]
      },
       addFromRules:{
         name:[
          { required: true, message: '请输入职位', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        region:[
          { required: true, message: '请输入职位', trigger: 'blur' },
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        age:[
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        resource:[
          { required: true, message: '请输入工作性质', trigger: 'blur' },
        ]
      },
      addFrom:{},
      addDialogVisible:false,
      visible2:false
    }
  },
  created(){
    this.getList()
  },
  methods:{
    async getList(){
      let result =await this.$http.get('admin/list')
      let data = result.data.data;
      console.log(data);
      
      this.userlist = data; 
    },
    //修改
   async Edit(ids){
     let {data:res}=await this.$http.get('/admin/listid/',{params:{
        id:ids
      }})
      if(res.mate!==200){
        return this.$message.error("获取个人数据失败")
      }
      this.editForm = res.data[0]
      this.dialogVisible = true;
    },
    editClick(){
       this.$refs.editFormRef.validate( async valid=>{
        if(!valid){
          return this.$message.error('请输入相关内容');
        }
        let result = await this.$http.post('admin/edit',this.editForm)
          if(result.data.mate!==200){
            return this.$message.error('更改信息失败')
          }
          this.$message.success('更改信息成功');
          this.getList();
          this.dialogVisible = false
      })
    },
    //重置
    resetField(){
      this.$refs.addFromRef.resetFields()
    },
    //添加用户
   async addClick(){
      console.log(this.addFrom);
      let {data:res} = await this.$http.post('admin/add',this.addFrom);
      if(res.mate!==200){
        return this.$message.error("用户添加失败")
      }
      this.$message.success("用户添加成功")
      this.addDialogVisible = false;
      this.getList()
      
      
    },
    open2(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           let {data:res} =await this.$http.get('admin/delete',{params:{id}})
            if(res.mate!==200){
                  return this.$message.error('删除信息失败')
                }
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addFromClose(){
        this.$refs.addFromRef.resetFields()
      }
  }
}
</script>