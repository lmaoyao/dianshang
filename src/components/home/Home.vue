<template>

      <el-container class="home-container">
        <!-- 头部 -->
      <el-header>
        <div>
            <span>后台管理系统</span>
        </div>
        用户：{{name}}
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 中部 -->
      <el-container>
        <!-- 侧边栏 -->
          <Aside></Aside>
        <!-- 中间内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>
<script>
import Aside from '../access/Aside'
export default {
  components:{
    Aside
  },
  data(){
    return{
      //左侧菜单数据
      menulist:{},
    
      //是否折叠
      isCollapse:false,
      name:window.sessionStorage.getItem('name')
    }
  },
  created(){
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //点击实现菜单的折叠和展开
    toogleClick(){
      this.isCollapse =! this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
 
    .home-container{
      height:100%;
    }
    .el-header{
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      align-items: center;
      color:white;
    }
    .el-aside{
      background-color: #333744;
    }
    .el-main{
      background-color: #eaedf1;
    }
</style>