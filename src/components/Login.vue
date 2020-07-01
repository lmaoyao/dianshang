<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form  ref="login_form_ref" label-width="0px" class="login_form" :model="from" :rules="rules">
        <el-form-item prop='username'>
          <el-input prefix-icon="el-icon-user" v-model="from.username" placeholder='用输入用户名' @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input prefix-icon="el-icon-tickets" v-model="from.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
           <el-button type="primary" @click="login" >登录</el-button>
           <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>
<script>
export default {
    data(){
      return{
        from:{
          username:"毛旺旺",
          password:"123456"
        },
        rules:{
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      //重置登录表单
      reset(){
        this.$refs.login_form_ref.resetFields();
      },
      //表单预验证
      login(){
        this.$refs.login_form_ref.validate(async islogin=>{
          if(!islogin){
             this.$message.error('账户或者密码输入有误');
          }else{    
            let {data:result} = await this.$http.post('login/login',this.from)  
            if(result.mate==400){
              this.$message.error(result.message)
              this.$router.push('/login')
              return
          }
          window.sessionStorage.setItem('name',result.token);
    

          this.$router.push('/home')
                  
          this.$message.success('登录成功')
          /* var arr = []
          this.$router.options.routes.forEach(element => {
              if(element.children){
                element.children.forEach(item=>{
                arr.push(item.path)
                return arr
                })
              }
          });
          let sss = arr.findIndex(function(value){
           return value == '/list' 
          })
          let aa = sss==-1?"meiyou":"you"
          console.log(aa); */
          
          
          }
        })
      }
    }
}
</script>
<style lang="less" scoped>
    .login{
      width: 100%;
      height: 100%;
      background:#2b4b6b;
      .login_box{
        width: 450px;
        height: 300px;
        background: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);

        .avatar_box{
          height: 130px;
          width: 130px;
          background: #eee;
          border: 1px solid #eee;
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 0 10px #eee;
          position: absolute;
          left: 50%;

          transform: translate(-50%,-50%);
          img{
            width: 100%;
            height: 100%;
             border-radius: 50%;
             background-color: #eee;
          }
        }
      }
    }
    .login_form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .btns{
      display: flex;
      justify-content: flex-end;
    }
    }
    
</style>